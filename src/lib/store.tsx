import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  makeSeedOrders, SEED_PRODUCTS, SEED_USERS, SHIPPING_FEE, CITIES, CATEGORIES, itemTotal,
  IMAGES, type CartItem, type Order, type OrderStatus, type Product, type User,
} from "./data";

export interface Settings {
  storeName: string;
  storeTagline: string;
  whatsappNumber: string;
  instagramUrl: string;
  tiktokUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  footerDescription: string;
  operatingHours: string;
  storeOpen: boolean;
  citySlots: Record<string, number>;
}

interface State {
  categories: string[];
  products: Product[];
  orders: Order[];
  users: User[];
  cart: CartItem[];
  currentEmail: string | null;
  city: string;
  settings: Settings;
}

export const DEFAULT_SETTINGS: Settings = {
  storeName: "Kalandra", storeTagline: "Hampers & Seserahan", whatsappNumber: "6281234567890",
  instagramUrl: "https://instagram.com", tiktokUrl: "https://tiktok.com",
  heroHeadline: "Rangkaian Kasih & Keanggunan di Setiap Momen Berharga",
  heroSubheadline: "Dirangkai tangan, lengkap dengan kartu ucapan personal, dan dikirim fotonya sebelum sampai ke orang tersayang.",
  heroImage: IMAGES.hero, footerDescription: "Rangkaian kasih yang dirangkai tangan, dikirim ke 7 kota di Indonesia.",
  operatingHours: "Senin–Minggu, 08.00–21.00 WIB", storeOpen: true,
  citySlots: Object.fromEntries(CITIES.map((c) => [c, 20])),
};

const makeInitial = (): State => ({
  categories: [...CATEGORIES],
  products: SEED_PRODUCTS,
  orders: makeSeedOrders,
  users: SEED_USERS,
  cart: [],
  currentEmail: null,
  city: "Jabodetabek",
  settings: DEFAULT_SETTINGS,
});

const KEY = "kalandra-state-v1";

function useStoreValue() {
  const [s, setS] = useState<State>(makeInitial);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState<null | "login" | "register" | "forgot">(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const defaults = makeInitial();
        const settings = saved.settings ?? {};
        setS({ ...defaults, ...saved,
          categories: [...new Set([...(saved.categories ?? CATEGORIES), ...(saved.products ?? []).map((p: Product) => p.category)])] as string[],
          settings: { ...DEFAULT_SETTINGS, ...settings,
            whatsappNumber: settings.whatsappNumber ?? settings.waNumber ?? DEFAULT_SETTINGS.whatsappNumber,
            citySlots: { ...DEFAULT_SETTINGS.citySlots, ...settings.citySlots },
          },
        });
      }
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }
  }, [s, loaded]);

  const user = s.users.find((u) => u.email === s.currentEmail) ?? null;

  const api = {
    ...s,
    user,
    cartOpen, setCartOpen, authOpen, setAuthOpen,
    setCity: (city: string) => setS((p) => ({ ...p, city })),
    shippingFee: SHIPPING_FEE[s.city] ?? 30000,
    cartSubtotal: s.cart.reduce((t, i) => t + itemTotal(i), 0),
    cartCount: s.cart.reduce((t, i) => t + i.qty, 0),

    login(email: string, password: string) {
      const u = s.users.find((x) => x.email.toLowerCase() === email.toLowerCase());
      if (!u || u.password !== password) return "Email atau password salah";
      setS((p) => ({ ...p, currentEmail: u.email }));
      return null;
    },
    register(u: Omit<User, "role" | "address" | "city">) {
      if (s.users.some((x) => x.email.toLowerCase() === u.email.toLowerCase())) return "Email sudah terdaftar";
      setS((p) => ({ ...p, users: [...p.users, { ...u, role: "customer", address: "", city: p.city }], currentEmail: u.email }));
      return null;
    },
    logout: () => setS((p) => ({ ...p, currentEmail: null })),
    userExists: (email: string) => s.users.some((x) => x.email.toLowerCase() === email.toLowerCase()),
    resetPassword(email: string, password: string) {
      setS((p) => ({ ...p, users: p.users.map((u) => (u.email.toLowerCase() === email.toLowerCase() ? { ...u, password } : u)) }));
    },
    updateProfile(patch: Partial<User>) {
      setS((p) => ({ ...p, users: p.users.map((u) => (u.email === p.currentEmail ? { ...u, ...patch } : u)), currentEmail: patch.email ?? p.currentEmail }));
    },

    addToCart: (item: CartItem) => setS((p) => ({ ...p, cart: [...p.cart, item] })),
    updateQty: (key: string, qty: number) =>
      setS((p) => ({ ...p, cart: p.cart.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)) })),
    removeFromCart: (key: string) => setS((p) => ({ ...p, cart: p.cart.filter((i) => i.key !== key) })),

    checkout(): Order | null {
      const firstItem = s.cart[0];
      if (!user || !firstItem) return null;
      const subtotal = s.cart.reduce((t, i) => t + itemTotal(i), 0);
      const shipping = SHIPPING_FEE[s.city] ?? 30000;
      const order: Order = {
        id: "KLD-" + (24052 + s.orders.length + Math.floor(Math.random() * 9)),
        customerName: user.name, customerEmail: user.email, phone: user.phone, city: s.city,
        address: user.address || "-", items: s.cart, subtotal, shipping, total: subtotal + shipping,
        status: "Menunggu Pembayaran", createdAt: new Date().toISOString(),
        deliveryDate: firstItem.deliveryDate,
      };
      setS((p) => ({
        ...p, orders: [order, ...p.orders], cart: [],
        products: p.products.map((pr) => {
          const q = p.cart.filter((c) => c.productId === pr.id).reduce((t, c) => t + c.qty, 0);
          return q ? { ...pr, stock: Math.max(0, pr.stock - q) } : pr;
        }),
      }));
      return order;
    },
    setOrderStatus: (id: string, status: OrderStatus) =>
      setS((p) => ({ ...p, orders: p.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),

    addCategory: (name: string) => setS((p) => ({ ...p, categories: [...new Set([...p.categories, name.trim()])].filter(Boolean) })),
    renameCategory: (name: string, next: string) => setS((p) => ({ ...p,
      categories: [...new Set(p.categories.map((c) => c === name ? next.trim() : c))].filter(Boolean),
      products: p.products.map((prod) => prod.category === name ? { ...prod, category: next.trim() } : prod),
    })),
    deleteCategory(name: string) {
      if (s.products.some((p) => p.category === name)) return "Kategori masih digunakan produk";
      setS((p) => ({ ...p, categories: p.categories.filter((c) => c !== name) }));
      return null;
    },
    saveProduct: (prod: Product) =>
      setS((p) => ({
        ...p,
        categories: [...new Set([...p.categories, prod.category.trim()])],
        products: p.products.some((x) => x.id === prod.id)
          ? p.products.map((x) => (x.id === prod.id ? prod : x))
          : [prod, ...p.products],
      })),
    deleteProduct: (id: string) => setS((p) => ({ ...p, products: p.products.filter((x) => x.id !== id) })),
    updateSettings: (patch: Partial<Settings>) => setS((p) => ({ ...p, settings: { ...p.settings, ...patch } })),
    resetDemo: () => setS(makeInitial()),
  };
  return api;
}

type Store = ReturnType<typeof useStoreValue>;
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const v = useStoreValue();
  const memo = useMemo(() => v, [v]);
  return <Ctx.Provider value={memo}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be inside StoreProvider");
  return c;
}
