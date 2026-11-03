import hero from "@/assets/hero.jpg";
import seserahan from "@/assets/seserahan.jpg";
import lebaran from "@/assets/lebaran.jpg";
import newborn from "@/assets/newborn.jpg";
import birthday from "@/assets/birthday.jpg";
import corporate from "@/assets/corporate.jpg";
import lilac from "@/assets/lilac.jpg";
import fruits from "@/assets/fruits.jpg";
import ruby from "@/assets/ruby.jpg";
import eidRoyal from "@/assets/eid-royal.jpg";
import blushSeserahan from "@/assets/blush-seserahan.jpg";
import skyNewborn from "@/assets/sky-newborn.jpg";
import macaron from "@/assets/macaron.jpg";
import coffee from "@/assets/coffee.jpg";
import flowerBoard from "@/assets/flower-board.jpg";
import roseLily from "@/assets/rose-lily-bouquet.jpg";
import wineGourmet from "@/assets/wine-gourmet.jpg";

export const IMAGES = { hero, seserahan, lebaran, newborn, birthday, corporate, lilac, fruits, ruby, eidRoyal, blushSeserahan, skyNewborn, macaron, coffee };

export const CATEGORIES = [
  "Birthday & Anniv",
  "Lebaran & Hari Raya",
  "Seserahan & Hantaran",
  "Baby Born",
  "Corporate Parcel",
  "Fresh & Healthy",
  "Bunga Papan",
  "Buket Mawar & Lily",
] as const;
export type Category = string;

export const CATEGORY_EMOJI: Record<Category, string> = {
  "Birthday & Anniv": "🎂",
  "Lebaran & Hari Raya": "🌙",
  "Seserahan & Hantaran": "💍",
  "Baby Born": "👶",
  "Corporate Parcel": "💼",
  "Fresh & Healthy": "🍊",
  "Bunga Papan": "🌸",
  "Buket Mawar & Lily": "💐",
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
  rating: number;
  reviews: number;
  badge?: "Ready Stock" | "Slot Terbatas" | "Same-Day";
  foodStatus?: "halal" | "non-halal" | "non-food" | undefined;
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

const ORIGINAL_PRODUCTS: Product[] = [
  { id: "p1", name: "Sage Celebration Basket", category: "Birthday & Anniv", price: 785000, stock: 12, image: hero, description: "Keranjang rotan berisi sparkling juice, cokelat artisan, dan bunga kering.", active: true, tags: ["popular", "express"], rating: 4.9, reviews: 86 },
  { id: "p2", name: "Peach Rose Anniversary Box", category: "Birthday & Anniv", price: 650000, stock: 4, image: birthday, description: "Buket mawar peach, macaron, dan lilin aromaterapi santal.", active: true, tags: ["popular"], rating: 4.8, reviews: 64 },
  { id: "p3", name: "Parsel Fitri Zamrud", category: "Lebaran & Hari Raya", price: 925000, stock: 20, image: lebaran, description: "Kurma pilihan, kue nastar, putri salju, kastengel dalam box hijau emas.", active: true, tags: ["idulfitri", "popular"], rating: 4.9, reviews: 132 },
  { id: "p4", name: "Hampers Lebaran Mini Berkah", category: "Lebaran & Hari Raya", price: 450000, stock: 3, image: lebaran, description: "Paket hemat 3 toples kue kering & kurma untuk kerabat.", active: true, tags: ["idulfitri", "express"], rating: 4.8, reviews: 98 },
  { id: "p5", name: "Seserahan Akrilik Gold 7 Box", category: "Seserahan & Hantaran", price: 3500000, stock: 5, image: seserahan, description: "Set 7 kotak akrilik bingkai emas, dekor bunga & pita terracotta-sage.", active: true, tags: ["hantaran", "popular"], rating: 5.0, reviews: 41 },
  { id: "p6", name: "Hantaran Mahar Al-Qur'an", category: "Seserahan & Hantaran", price: 1250000, stock: 2, image: seserahan, description: "Box mahar dengan Al-Qur'an, tasbih, dan rangkaian bunga cantik.", active: true, tags: ["hantaran"], rating: 4.9, reviews: 37 },
  { id: "p7", name: "Little Bunny Newborn Set", category: "Baby Born", price: 595000, stock: 9, image: newborn, description: "Baju bayi katun, boneka kelinci, teether kayu, dan selimut muslin.", active: true, tags: ["express", "popular"], rating: 4.9, reviews: 73 },
  { id: "p8", name: "Executive Green Gift Box", category: "Corporate Parcel", price: 1150000, stock: 30, image: corporate, description: "Kopi signature, teh hijau, notebook kulit, dan pulpen emas.", active: true, tags: ["express"], rating: 4.8, reviews: 55 },
  { id: "p9", name: "Pastel Lilac Self-Care Box", category: "Birthday & Anniv", price: 385000, stock: 15, image: lilac, description: "Box lilac berisi sabun lavender artisan, lilin kedelai, eye mask sutra, dan teh chamomile organik.", active: true, tags: ["popular"], rating: 4.9, reviews: 112 },
  { id: "p10", name: "Golden Sunset Fruit & Gourmet Basket", category: "Fresh & Healthy", price: 520000, stock: 8, image: fruits, description: "Keranjang rotan buah premium: anggur shine muscat, sunkist, apel fuji, dan sparkling apple cider.", active: true, tags: ["express", "popular"], rating: 4.9, reviews: 94 },
  { id: "p11", name: "Ruby Romance Velvet Gift Box", category: "Birthday & Anniv", price: 740000, stock: 6, image: ruby, description: "Box beludru merah dengan mawar segar, truffle dark chocolate, dan mini tumbler emas.", active: true, tags: ["popular"], rating: 4.9, reviews: 78 },
  { id: "p12", name: "Emerald Eid Royal Feast", category: "Lebaran & Hari Raya", price: 1150000, stock: 4, image: eidRoyal, description: "Box geometris zamrud-emas, 4 toples kristal kue premium, sajadah bludru, dan tasbih emas.", active: true, tags: ["idulfitri", "popular"], rating: 5.0, reviews: 61 },
  { id: "p13", name: "Blush Floral Acrylic Seserahan Set (5 Trays)", category: "Seserahan & Hantaran", price: 2450000, stock: 3, image: blushSeserahan, description: "5 baki akrilik bening, rangkaian bunga blush-champagne, fairy lights, dan ukiran emas nama mempelai.", active: true, tags: ["hantaran", "popular"], rating: 5.0, reviews: 29 },
  { id: "p14", name: "Pastel Sky Newborn Milestone Hamper", category: "Baby Born", price: 475000, stock: 10, image: skyNewborn, description: "Box kayu biru-putih: romper katun organik, bib silikon, boneka, dan kartu milestone kayu.", active: true, tags: ["express"], rating: 4.9, reviews: 67 },
  { id: "p15", name: "Sweet Blossom Macaron & Tea Tower", category: "Birthday & Anniv", price: 320000, stock: 14, image: macaron, description: "Tower pastel berisi 12 macaron Prancis, buket bunga kering mini, dan teh stroberi Twinings.", active: true, tags: ["express", "popular"], rating: 4.8, reviews: 121 },
  { id: "p16", name: "Artisan Coffee & Walnut Wood Executive Set", category: "Corporate Parcel", price: 890000, stock: 18, image: coffee, description: "Krat kayu walnut: drip bag kopi single-origin, mug keramik matte, dan coaster kulit.", active: true, tags: ["express"], rating: 4.9, reviews: 48 },
];


// Unknown products are not labelled; contradictory contents always override classification.
export function isHalalProduct(p: Product): boolean {
  return p.foodStatus === "halal" && !/wine|bir\b|beer|champagne|sampanye|non[- ]?halal|pork|babi|bacon|ham\b|seserahan|hantaran|standing flower|bunga papan|buket (?:bunga|mawar|lily)/i.test(`${p.name} ${p.category} ${p.description}`);
}

export const FLORIST_ADDITIONS: Product[] = [
  { id: "florist-wine", name: "Luxury Wine & Truffles Crate", category: "Birthday & Anniv", price: 1450000, stock: 6, image: wineGourmet, description: "Hampers perayaan dengan wine impor dan truffle cokelat premium. Mengandung alkohol.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "non-halal" },
  { id: "florist-dates", name: "Buah Lokal & Kurma Berkah", category: "Fresh & Healthy", price: 425000, stock: 12, image: fruits, description: "Buah segar lokal pilihan dan kurma dalam keranjang hadiah.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "halal" },
  { id: "florist-sparkling", name: "Imported Fruit & Sparkling Wine Basket", category: "Fresh & Healthy", price: 1350000, stock: 5, image: wineGourmet, description: "Buah impor dan sparkling wine untuk perayaan. Mengandung alkohol.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "non-halal" },
  { id: "florist-board", name: "Bunga Papan Celebration", category: "Bunga Papan", price: 850000, stock: 10, image: flowerBoard, description: "Karangan bunga papan segar untuk ucapan selamat dan momen istimewa.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "non-food" },
  { id: "florist-bouquet", name: "Blush Rose & Lily Hand Bouquet", category: "Buket Mawar & Lily", price: 625000, stock: 8, image: roseLily, description: "Buket mawar blush dan lily putih segar dengan wrapping sage dan pita personal.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "non-food" },
  { id: "florist-coffee", name: "Executive Coffee Set", category: "Corporate Parcel", price: 795000, stock: 20, image: coffee, description: "Kopi single-origin, mug keramik, dan coaster dalam kemasan hadiah eksekutif.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "halal" },
  { id: "florist-cheese", name: "Gourmet Wine & Fine Cheese Box", category: "Corporate Parcel", price: 1650000, stock: 6, image: wineGourmet, description: "Wine premium dan keju gourmet untuk hadiah korporat. Mengandung alkohol.", active: true, tags: [], rating: 5, reviews: 0, foodStatus: "non-halal" },
 ];
const HALAL_SEED_IDS = new Set(["p1", "p3", "p4", "p8", "p12", "p15", "p16"]);
const NON_FOOD_SEED_IDS = new Set(["p5", "p6", "p7", "p13", "p14"]);
export const SEED_PRODUCTS: Product[] = [
  ...ORIGINAL_PRODUCTS.map((p): Product => ({ ...p, foodStatus: HALAL_SEED_IDS.has(p.id) ? "halal" : NON_FOOD_SEED_IDS.has(p.id) ? "non-food" : undefined })),
  ...FLORIST_ADDITIONS,
];
export function migrateFloristCatalog(products: Product[], version = 0): Product[] {
  if (version >= 1) return products;
  const existing = products.map((p) => {
    const seed = SEED_PRODUCTS.find((s) => s.id === p.id && s.name === p.name && s.description === p.description && s.category === p.category);
    return p.foodStatus || !seed ? p : { ...p, foodStatus: seed.foodStatus };
  });
  return [...existing, ...FLORIST_ADDITIONS.filter((p) => !existing.some((s) => s.id === p.id))];
}

const mk = (
  id: string, name: string, email: string, phone: string, city: string, p: Product, status: OrderStatus, daysAgo: number, msg: string, to: string, ribbon = "emerald",
): Order => {
  const created = new Date(Date.now() - daysAgo * 864e5);
  const delivery = new Date(created.getTime() + 2 * 864e5);
  const item: CartItem = {
    key: id + "-1", productId: p.id, name: p.name, image: p.image, basePrice: p.price, qty: 1,
    to, from: name.split(" ")[0] ?? name, message: msg, ribbon, deliveryDate: delivery.toISOString(), addons: ["bag"],
  };
  const subtotal = itemTotal(item);
  const shipping = SHIPPING_FEE[city] ?? 0;
  return { id, customerName: name, customerEmail: email, phone, city, address: "Jl. Melati No. 12, " + city, items: [item], subtotal, shipping, total: subtotal + shipping, status, createdAt: created.toISOString(), deliveryDate: delivery.toISOString() };
};

export const makeSeedOrders = (): Order[] => [
  mk("KLD-24051", "Sari Wulandari", "sari@email.com", "6281234567890", "Jabodetabek", (SEED_PRODUCTS[0] ?? SEED_PRODUCTS[0]) as Product, "Dalam Pengiriman", 1, "Selamat ulang tahun, Ibu tersayang! Semoga sehat selalu.", "Ibu Ratna"),
  mk("KLD-24050", "Budi Santoso", "budi.s@email.com", "6281298765432", "Bandung", (SEED_PRODUCTS[2] ?? SEED_PRODUCTS[0]) as Product, "Sedang Dirangkai", 1, "Mohon maaf lahir dan batin, keluarga besar Hartono.", "Kel. Hartono", "gold"),
  mk("KLD-24049", "Anisa Putri", "anisa.p@email.com", "6285711122233", "Surabaya", (SEED_PRODUCTS[4] ?? SEED_PRODUCTS[0]) as Product, "Menunggu Pembayaran", 2, "Untuk calon istriku, dengan segenap cinta.", "Dinda Ayu", "terracotta"),
  mk("KLD-24048", "Reza Pratama", "reza.p@email.com", "6281355566677", "Bali", (SEED_PRODUCTS[6] ?? SEED_PRODUCTS[0]) as Product, "Selesai", 4, "Selamat datang di dunia, si kecil!", "Baby Arka"),
  mk("KLD-24047", "PT Nusantara Jaya", "hrd@nusantarajaya.co.id", "6282144455566", "Jabodetabek", (SEED_PRODUCTS[7] ?? SEED_PRODUCTS[0]) as Product, "Selesai", 6, "Terima kasih atas kerja samanya sepanjang tahun.", "Bpk. Hendra", "burgundy"),
  mk("KLD-24046", "Sari Wulandari", "sari@email.com", "6281234567890", "Jabodetabek", (SEED_PRODUCTS[1] ?? SEED_PRODUCTS[0]) as Product, "Selesai", 20, "Happy anniversary, sayang. 5 tahun bersama!", "Mas Dimas", "terracotta"),
  mk("KLD-24045", "Dewi Lestari", "dewi.l@email.com", "6287812341234", "Yogyakarta", (SEED_PRODUCTS[3] ?? SEED_PRODUCTS[0]) as Product, "Sedang Dirangkai", 0, "Selamat Idul Fitri, Pakde & Bude.", "Pakde Joko", "gold"),
  mk("KLD-24044", "Fajar Nugroho", "fajar.n@email.com", "6281977788899", "Medan", (SEED_PRODUCTS[5] ?? SEED_PRODUCTS[0]) as Product, "Menunggu Pembayaran", 0, "Mahar untuk Siti, bismillah.", "Siti Rahma"),
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

export function buildCartWaMessage(items: CartItem[], city: string, shipping: number) {
  const subtotal = items.reduce((total, item) => total + itemTotal(item), 0);
  return [
    "Halo Kalandra, saya ingin checkout keranjang:",
    ...items.map((item, index) => `${index + 1}. ${buildWaMessage({ name: item.name, price: item.basePrice }, item, city)}`),
    `Subtotal: ${formatIDR(subtotal)}`,
    `Ongkir (${city}): ${formatIDR(shipping)}`,
    `Total pesanan: ${formatIDR(subtotal + shipping)}`,
  ].join("\n\n");
}

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
