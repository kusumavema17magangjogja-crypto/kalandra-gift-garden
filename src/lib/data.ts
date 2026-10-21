import hero from "@/assets/hero.jpg";
import seserahan from "@/assets/seserahan.jpg";
import lebaran from "@/assets/lebaran.jpg";
import newborn from "@/assets/newborn.jpg";
import birthday from "@/assets/birthday.jpg";
import corporate from "@/assets/corporate.jpg";

export const IMAGES = { hero, seserahan, lebaran, newborn, birthday, corporate };

export const CATEGORIES = [
  "Birthday & Anniv",
  "Lebaran & Hari Raya",
  "Seserahan & Hantaran",
  "Baby Born",
  "Corporate Parcel",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_EMOJI: Record<Category, string> = {
  "Birthday & Anniv": "🎂",
  "Lebaran & Hari Raya": "🌙",
  "Seserahan & Hantaran": "💍",
  "Baby Born": "👶",
  "Corporate Parcel": "💼",
};

export const CITIES = ["Jabodetabek", "Bandung", "Surabaya", "Semarang", "Yogyakarta", "Medan", "Bali"];

export const SHIPPING_FEE: Record<string, number> = {
  Jabodetabek: 25000,
  Bandung: 35000,
  Surabaya: 45000,
  Semarang: 40000,
  Yogyakarta: 40000,
  Medan: 65000,
  Bali: 60000,
};

export const RIBBONS = [
  { id: "emerald", label: "Emerald Green", className: "bg-ribbon-emerald" },
  { id: "gold", label: "Champagne Gold", className: "bg-ribbon-gold" },
  { id: "terracotta", label: "Soft Terracotta", className: "bg-ribbon-terracotta" },
  { id: "burgundy", label: "Burgundy", className: "bg-ribbon-burgundy" },
] as const;

export const ADDONS = [
  { id: "topper", label: "Wooden Acrylic Topper", price: 25000 },
  { id: "chocolate", label: "Artisan Chocolate Box", price: 45000 },
  { id: "bag", label: "Spunbond Bag Premium", price: 15000 },
] as const;

export const ORDER_STATUSES = ["Menunggu Pembayaran", "Sedang Dirangkai", "Dalam Pengiriman", "Selesai"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type ProductTag = "popular" | "idulfitri" | "hantaran" | "express";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  image: string;
  description: string;
  active: boolean;
  tags: ProductTag[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  qty: number;
  to: string;
  from: string;
  message: string;
  ribbon: string;
  deliveryDate: string;
  addons: string[];
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  city: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryDate: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  password: string;
  role: "customer" | "admin";
}

export const formatIDR = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");

export const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-";

export const addonsTotal = (ids: string[]) =>
  ADDONS.filter((a) => ids.includes(a.id)).reduce((s, a) => s + a.price, 0);

export const itemTotal = (i: CartItem) => (i.basePrice + addonsTotal(i.addons)) * i.qty;

export const ribbonLabel = (id: string) => RIBBONS.find((r) => r.id === id)?.label ?? id;

export const SEED_PRODUCTS: Product[] = [
  { id: "p1", name: "Sage Celebration Basket", category: "Birthday & Anniv", price: 785000, stock: 12, image: hero, description: "Keranjang rotan berisi sparkling juice, cokelat artisan, dan bunga kering.", active: true, tags: ["popular", "express"] },
  { id: "p2", name: "Peach Rose Anniversary Box", category: "Birthday & Anniv", price: 650000, stock: 4, image: birthday, description: "Buket mawar peach, macaron, dan lilin aromaterapi santal.", active: true, tags: ["popular"] },
  { id: "p3", name: "Parsel Fitri Zamrud", category: "Lebaran & Hari Raya", price: 925000, stock: 20, image: lebaran, description: "Kurma pilihan, kue nastar, putri salju, kastengel dalam box hijau emas.", active: true, tags: ["idulfitri", "popular"] },
  { id: "p4", name: "Hampers Lebaran Mini Berkah", category: "Lebaran & Hari Raya", price: 450000, stock: 3, image: lebaran, description: "Paket hemat 3 toples kue kering & kurma untuk kerabat.", active: true, tags: ["idulfitri", "express"] },
  { id: "p5", name: "Seserahan Akrilik Gold 7 Box", category: "Seserahan & Hantaran", price: 3500000, stock: 5, image: seserahan, description: "Set 7 kotak akrilik bingkai emas, dekor bunga & pita terracotta-sage.", active: true, tags: ["hantaran", "popular"] },
  { id: "p6", name: "Hantaran Mahar Al-Qur'an", category: "Seserahan & Hantaran", price: 1250000, stock: 2, image: seserahan, description: "Box mahar dengan Al-Qur'an, tasbih, dan rangkaian bunga cantik.", active: true, tags: ["hantaran"] },
  { id: "p7", name: "Little Bunny Newborn Set", category: "Baby Born", price: 595000, stock: 9, image: newborn, description: "Baju bayi katun, boneka kelinci, teether kayu, dan selimut muslin.", active: true, tags: ["express", "popular"] },
  { id: "p8", name: "Executive Green Gift Box", category: "Corporate Parcel", price: 1150000, stock: 30, image: corporate, description: "Kopi signature, teh hijau, notebook kulit, dan pulpen emas.", active: true, tags: ["express"] },
];

const mk = (
  id: string, name: string, email: string, phone: string, city: string, p: Product, status: OrderStatus, daysAgo: number, msg: string, to: string, ribbon = "emerald",
): Order => {
  const created = new Date(Date.now() - daysAgo * 864e5);
  const delivery = new Date(created.getTime() + 2 * 864e5);
  const item: CartItem = {
    key: id + "-1", productId: p.id, name: p.name, image: p.image, basePrice: p.price, qty: 1,
    to, from: name.split(" ")[0], message: msg, ribbon, deliveryDate: delivery.toISOString(), addons: ["bag"],
  };
  const subtotal = itemTotal(item);
  const shipping = SHIPPING_FEE[city];
  return { id, customerName: name, customerEmail: email, phone, city, address: "Jl. Melati No. 12, " + city, items: [item], subtotal, shipping, total: subtotal + shipping, status, createdAt: created.toISOString(), deliveryDate: delivery.toISOString() };
};

export const SEED_ORDERS: Order[] = [
  mk("KLD-24051", "Sari Wulandari", "sari@email.com", "6281234567890", "Jabodetabek", SEED_PRODUCTS[0], "Dalam Pengiriman", 1, "Selamat ulang tahun, Ibu tersayang! Semoga sehat selalu.", "Ibu Ratna"),
  mk("KLD-24050", "Budi Santoso", "budi.s@email.com", "6281298765432", "Bandung", SEED_PRODUCTS[2], "Sedang Dirangkai", 1, "Mohon maaf lahir dan batin, keluarga besar Hartono.", "Kel. Hartono", "gold"),
  mk("KLD-24049", "Anisa Putri", "anisa.p@email.com", "6285711122233", "Surabaya", SEED_PRODUCTS[4], "Menunggu Pembayaran", 2, "Untuk calon istriku, dengan segenap cinta.", "Dinda Ayu", "terracotta"),
  mk("KLD-24048", "Reza Pratama", "reza.p@email.com", "6281355566677", "Bali", SEED_PRODUCTS[6], "Selesai", 4, "Selamat datang di dunia, si kecil!", "Baby Arka"),
  mk("KLD-24047", "PT Nusantara Jaya", "hrd@nusantarajaya.co.id", "6282144455566", "Jabodetabek", SEED_PRODUCTS[7], "Selesai", 6, "Terima kasih atas kerja samanya sepanjang tahun.", "Bpk. Hendra", "burgundy"),
  mk("KLD-24046", "Sari Wulandari", "sari@email.com", "6281234567890", "Jabodetabek", SEED_PRODUCTS[1], "Selesai", 20, "Happy anniversary, sayang. 5 tahun bersama!", "Mas Dimas", "terracotta"),
  mk("KLD-24045", "Dewi Lestari", "dewi.l@email.com", "6287812341234", "Yogyakarta", SEED_PRODUCTS[3], "Sedang Dirangkai", 0, "Selamat Idul Fitri, Pakde & Bude.", "Pakde Joko", "gold"),
  mk("KLD-24044", "Fajar Nugroho", "fajar.n@email.com", "6281977788899", "Medan", SEED_PRODUCTS[5], "Menunggu Pembayaran", 0, "Mahar untuk Siti, bismillah.", "Siti Rahma"),
];

export const SEED_USERS: User[] = [
  { name: "Sari Wulandari", email: "sari@email.com", phone: "6281234567890", address: "Jl. Kemang Raya No. 8, Jakarta Selatan", city: "Jabodetabek", password: "kalandra123", role: "customer" },
  { name: "Admin Kalandra", email: "admin@kalandra.id", phone: "6281100001111", address: "Studio Kalandra, Jakarta", city: "Jabodetabek", password: "admin123", role: "admin" },
  { name: "Budi Santoso", email: "budi.s@email.com", phone: "6281298765432", address: "Jl. Dago No. 45, Bandung", city: "Bandung", password: "x", role: "customer" },
  { name: "Anisa Putri", email: "anisa.p@email.com", phone: "6285711122233", address: "Jl. Darmo No. 3, Surabaya", city: "Surabaya", password: "x", role: "customer" },
  { name: "Reza Pratama", email: "reza.p@email.com", phone: "6281355566677", address: "Jl. Sunset Road, Kuta", city: "Bali", password: "x", role: "customer" },
  { name: "Dewi Lestari", email: "dewi.l@email.com", phone: "6287812341234", address: "Jl. Kaliurang Km 5, Sleman", city: "Yogyakarta", password: "x", role: "customer" },
  { name: "Fajar Nugroho", email: "fajar.n@email.com", phone: "6281977788899", address: "Jl. Gatot Subroto, Medan", city: "Medan", password: "x", role: "customer" },
];

export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export function buildWaMessage(p: { name: string; price: number }, c: Omit<CartItem, "key" | "productId" | "name" | "image" | "basePrice">, city: string) {
  const addons = ADDONS.filter((a) => c.addons.includes(a.id)).map((a) => a.label).join(", ") || "-";
  return [
    "Halo Kalandra, saya ingin memesan:",
    `• Produk: ${p.name} (${formatIDR(p.price)}) x${c.qty}`,
    `• Kota: ${city}`,
    `• Tanggal kirim: ${formatDate(c.deliveryDate)}`,
    `• Pita: ${ribbonLabel(c.ribbon)}`,
    `• Add-on: ${addons}`,
    `• Kartu ucapan — To: ${c.to || "-"} | From: ${c.from || "-"}`,
    `  "${c.message || "-"}"`,
    `Total: ${formatIDR((p.price + addonsTotal(c.addons)) * c.qty)}`,
  ].join("\n");
}
