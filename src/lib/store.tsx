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
  users: User[];
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
  users: SEED_USERS,
  currentEmail: null,
  city: "Jabodetabek",
  settings: DEFAULT_SETTINGS,
});

const KEY = "kalandra-state-v1";
export const ORDERS_KEY = "kalandra_orders";
const CART_PREFIX = "kalandra-cart-";
const GUEST_KEY = "kalandra-guest-id";
const ORDERS_EVENT = "kalandra:orders";

// ---------- Orders: central list shared by storefront & admin ----------

function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) return JSON.parse(raw) as Order[];
  } catch {}
  const seeded = makeSeedOrders();
  try { localStorage.setItem(ORDERS_KEY, JSON.stringify(seeded)); } catch {}
  return seeded;
}

function writeOrders(orders: Order[]) {
  try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch {}
  window.dispatchEvent(new CustomEvent(ORDERS_EVENT));
}

// ---------- Cart: isolated per user / guest session ----------

function guestId(): string {
  try {
    let id = localStorage.getItem(GUEST_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(GUEST_KEY, id); }
    return id;
  } catch { return "guest"; }
}

const cartKeyFor = (owner: string | null) => (owner ? CART_PREFIX + owner : null);

function readCart(owner: string | null): CartItem[] {
  const key = cartKeyFor(owner);
  if (!key) return [];
  try { return JSON.parse(localStorage.getItem(key) ?? "[]") as CartItem[]; } catch { return []; }
}

function writeCart(owner: string | null, cart: CartItem[]) {
  const key = cartKeyFor(owner);
  if (!key) return;
  try { localStorage.setItem(key, JSON.stringify(cart)); } catch {}
}

// ---------- Store ----------

function useStoreValue() {
  const [s, setS] = useState<State>(makeInitial);
  const [orders, setOrders] = useState<Order[]>(makeSeedOrders);
  const [cartOwner, setCartOwner] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState<null | "login" | "register" | "forgot">(null);
  const [adminOpen, setAdminOpen] = useState(false);

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
      setOrders(readOrders());
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }
  }, [s, loaded]);

  // Keep orders in sync with other tabs / admin writes.
  useEffect(() => {
    const sync = () => setOrders(readOrders());
    window.addEventListener(ORDERS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(ORDERS_EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);

  const user = s.users.find((u) => u.email === s.currentEmail) ?? null;
  const isAdmin = user?.role === "admin";

  // Cart owner: admin has none; customers use their email; guests use a session id.
  useEffect(() => {
    const owner = user ? (user.role === "admin" ? null : user.email) : guestId();
    setCartOwner(owner);
    setCart(readCart(owner));
  }, [user?.email, user?.role]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (cartOwner !== null || cart.length === 0) writeCart(cartOwner, cart);
  }, [cart, cartOwner]);

  const mutateOrders = (fn: (prev: Order[]) => Order[]) => setOrders((prev) => { const next = fn(prev); writeOrders(next); return next; });

  const recordOrder = (order: Order) => {
    mutateOrders((prev) => [order, ...prev]);
    return order;
  };

  const api = {
    ...s,
    user,
    isAdmin,
    orders,
    cart,
    cartOpen, setCartOpen, authOpen, setAuthOpen, adminOpen, setAdminOpen,
    setCity: (city: string) => setS((p) => ({ ...p, city })),
    shippingFee: SHIPPING_FEE[s.city] ?? 30000,
    cartSubtotal: cart.reduce((t, i) => t + itemTotal(i), 0),
    cartCount: cart.reduce((t, i) => t + i.qty, 0),

    login(email: string, password: string) {
      const u = s.users.find((x) => x.email.toLowerCase() === email.toLowerCase());
      if (!u || u.password !== password) return "Email atau password salah";
      setS((p) => ({ ...p, currentEmail: u.email }));
      return null;
    },
    loginAdmin(email: string, password: string) {
      const err = api.login(email, password);
      if (err) return err;
      const u = s.users.find((x) => x.email.toLowerCase() === email.toLowerCase());
      if (u?.role !== "admin") { setS((p) => ({ ...p, currentEmail: null })); return "Akun ini bukan admin Kalandra"; }
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

    addToCart(item: CartItem) {
      if (isAdmin) return "Admin tidak memiliki keranjang belanja";
      setCart((p) => [...p, item]);
      return null;
    },
    updateQty: (key: string, qty: number) =>
      setCart((p) => p.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))),
    removeFromCart: (key: string) => setCart((p) => p.filter((i) => i.key !== key)),

    checkout(): Order | null {
      const firstItem = cart[0];
      if (isAdmin || !firstItem) return null;
      const subtotal = cart.reduce((t, i) => t + itemTotal(i), 0);
      const shipping = SHIPPING_FEE[s.city] ?? 30000;
      const order: Order = {
        id: "KLD-" + (24052 + orders.length + Math.floor(Math.random() * 9)),
        customerName: user?.name ?? firstItem.from ?? "Pelanggan",
        customerEmail: user?.email ?? "guest@kalandra.id",
        phone: user?.phone ?? "-", city: s.city,
        address: user?.address || "-", items: cart, subtotal, shipping, total: subtotal + shipping,
        status: "Menunggu Pembayaran", createdAt: new Date().toISOString(),
        deliveryDate: firstItem.deliveryDate,
      };
      recordOrder(order);
      setCart([]);
      setS((p) => ({
        ...p,
        products: p.products.map((pr) => {
          const q = cart.filter((c) => c.productId === pr.id).reduce((t, c) => t + c.qty, 0);
          return q ? { ...pr, stock: Math.max(0, pr.stock - q) } : pr;
        }),
      }));
      return order;
    },
    recordOrder,
    setOrderStatus: (id: string, status: OrderStatus) =>
      mutateOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))),

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
    resetDemo() {
      setS(makeInitial());
      const seeded = makeSeedOrders();
      writeOrders(seeded);
      setOrders(seeded);
    },
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
