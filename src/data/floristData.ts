import type { Product } from '@/lib/data';
import board from '@/assets/flower-board.jpg';
import acrylic from '@/assets/acrylic-tripod.jpg';
import bouquet from '@/assets/rose-lily-bouquet.jpg';
import standing from '@/assets/standing-flower.jpg';
import fruits from '@/assets/fruits.jpg';
import eid from '@/assets/lebaran.jpg';
import blush from '@/assets/blush-seserahan.jpg';
import newborn from '@/assets/newborn.jpg';

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const RIBBONS = [
  { id: 'emerald', label: 'Emerald Green', hex: '#1B3B2B' },
  { id: 'baby-blue', label: 'Baby Blue', hex: '#A0C4E2' },
  { id: 'midnight-navy', label: 'Midnight Navy', hex: '#1B263B' },
  { id: 'gold', label: 'Champagne Gold', hex: '#D4AF37' },
  { id: 'terracotta', label: 'Soft Terracotta', hex: '#C87A5B' },
  { id: 'burgundy', label: 'Burgundy', hex: '#800020' },
  { id: 'sage', label: 'Sage', hex: '#8A9A86' },
  { id: 'rose-gold', label: 'Rose Gold', hex: '#B76E79' },
  { id: 'ivory', label: 'Ivory White', hex: '#FFFFF0' },
] as const;
export const ADDONS = [
  { id: 'topper', label: 'Wooden/Acrylic Topper', price: 25000 },
  { id: 'chocolate', label: 'Artisan Chocolate Box', price: 45000 },
  { id: 'bag', label: 'Spunbond Bag Premium', price: 15000 },
  { id: 'led', label: 'Fairy LED Lights', price: 20000 },
  { id: 'teddy', label: 'Mini Teddy Bear Graduation/Occasion', price: 35000 },
  { id: 'graduation', label: 'Boneka Wisuda Mini', price: 35000 },
] as const;
export const CARD_TEMPLATES = [
  { id: 'classic', label: 'Classic Floral', className: 'greeting-classic' },
  { id: 'gold', label: 'Gold Border', className: 'greeting-gold' },
  { id: 'minimal', label: 'Modern Minimalist', className: 'greeting-minimal' },
  { id: 'festive', label: 'Festive', className: 'greeting-festive' },
  { id: 'islamic', label: 'Islamic Eid', className: 'greeting-islamic' },
  { id: 'romance', label: 'Sweet Romance', className: 'greeting-romance' },
] as const;
export const cardTemplateLabel = (id = 'classic') => CARD_TEMPLATES.find(t => t.id === id)?.label ?? CARD_TEMPLATES[0].label;
export const CUSTOM_NOTE = 'Bisa Request Warna/Nuansa Bunga & Tulisan';
export const COMMERCIAL_CATEGORIES = ["Papan Bunga & Papan Acrylic", "Hand Bouquet & Bloom Box", "Fresh & Healthy / Parsel Buah", "Birthday, Anniv & Luxury Hampers", "Lebaran, Seserahan, Baby Born & Corporate"] as const;
export const COMMERCIAL_CATALOG_VERSION = 4;
function product(id: string, name: string, category: string, price: number, image: string, description: string, occasions: string[], foodStatus: Product["foodStatus"] = "non-food"): Product {
  return { id, name, category, price, image, description: `${description}. ${CUSTOM_NOTE}.`, occasions, foodStatus, stock: 10, active: true, tags: ["express"], rating: 5, reviews: 0 };
}
export const COMMERCIAL_PRODUCTS: Product[] = [
  product("catalog-01", "Bunga Papan Duka Cita (2x1.25m)", COMMERCIAL_CATEGORIES[0], 600000, unsplash("photo-1561181286-d3fee7d55364"), "Rangka kayu dengan ucapan printing rapi, bunga krisan & aster segar bernuansa putih hijau", ["duka"], "non-food"),
  product("catalog-02", "Papan Grand Opening Mulia", COMMERCIAL_CATEGORIES[0], 650000, unsplash("photo-1549465220-1a8b9238cd48"), "Rangkaian bunga segar keliling dengan ucapan selamat cerah, bisa custom logo perusahaan", ["opening", "corporate"], "non-food"),
  product("catalog-03", "Papan Acrylic Wedding Tripod Kayu", COMMERCIAL_CATEGORIES[0], 850000, unsplash("photo-1519741497674-611481863552"), "Akrilik bening tebal 3mm di tripod kayu natural dengan dekorasi mawar & daun eucalyptus segar", ["wedding"], "non-food"),
  product("catalog-04", "Papan Acrylic Opening Gold Foil", COMMERCIAL_CATEGORIES[0], 950000, unsplash("photo-1511285560929-80b456fea0bc"), "Cetak UV gold mirror pada akrilik tripod besi dengan bunga artificial & fresh premium", ["opening", "corporate"], "non-food"),
  product("catalog-05", "Standing Flower Krisan & Lily", COMMERCIAL_CATEGORIES[0], 780000, unsplash("photo-1582794543139-8ac9cb0f7b11"), "Standing besi elegan berisi krisan putih, lily casablanca, dan greenery segar", ["opening", "duka"], "non-food"),
  product("catalog-06", "Blush Rose & Lily Sage Wrap", COMMERCIAL_CATEGORIES[1], 625000, unsplash("photo-1563241527-3004b7be0ffd"), "Mawar blush pink dan lily casablanca putih wangi dibungkus wrap sage green", ["romantic"], "non-food"),
  product("catalog-07", "Everlasting 50 Red Roses Korean", COMMERCIAL_CATEGORIES[1], 750000, unsplash("photo-1518709268805-4e9042af9f23"), "50 tangkai mawar merah segar dibungkus gaya Korea matte hitam", ["romantic"], "non-food"),
  product("catalog-08", "Sunflower & Cotton Graduation", COMMERCIAL_CATEGORIES[1], 350000, unsplash("photo-1597848212624-a19eb35e2651"), "3 tangkai bunga matahari mekar, dried cotton, dan wrap navy", ["wisuda"], "non-food"),
  product("catalog-09", "Pastel Hydrangea Dream", COMMERCIAL_CATEGORIES[1], 480000, unsplash("photo-1526047932273-341f2a7631f9"), "Bunga hortensia biru lembut berpadu baby breath dan gomphrena", ["romantic"], "non-food"),
  product("catalog-10", "White Casablanca Table Vase", COMMERCIAL_CATEGORIES[1], 520000, unsplash("photo-1508610048659-a06b669e3321"), "Rangkaian casablanca putih dalam vas keramik minimalis siap pajang", ["romantic"], "non-food"),
  product("catalog-11", "Royal Fruit & Bird's Nest Hamper", COMMERCIAL_CATEGORIES[2], 980000, unsplash("photo-1619566636858-adf3ef46400b"), "Apel fuji, anggur autumn royal, jeruk sunkist, dan 3 botol sarang burung walet. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-12", "Japanese Muskmelon & Muscat Elite", COMMERCIAL_CATEGORIES[2], 1450000, unsplash("photo-1587314168485-3236d6710814"), "Melon jepang hidroponik aroma manis dan anggur shine muscat premium. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-13", "Vitality Cold-Pressed Juice", COMMERCIAL_CATEGORIES[2], 480000, unsplash("photo-1613478223719-2ab802602423"), "Jus dingin alami tanpa gula dengan campuran buah berry segar. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-14", "Organic Berry & Manuka Honey", COMMERCIAL_CATEGORIES[2], 750000, unsplash("photo-1464965911861-746a04b4bca6"), "Strawberry korea, blueberry organik, dan madu manuka asli. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-15", "Gourmet Fruit & Wine Wooden Crate", COMMERCIAL_CATEGORIES[2], 1250000, unsplash("photo-1510812431401-41d2bd2722f3"), "Buah pir, anggur red globe, dan sebotol red wine impor dalam krat kayu. Tanpa label halal", ["well"], "non-halal"),
  product("catalog-16", "Sage Celebration Sparkling Juice", COMMERCIAL_CATEGORIES[3], 785000, unsplash("photo-1546171753-97d7676e4602"), "Sparkling juice buah non-alkohol, cokelat artisan, dan bunga kering dalam keranjang sage. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-17", "Sweet Blossom Macaron Tower", COMMERCIAL_CATEGORIES[3], 420000, unsplash("photo-1558326567-98ae2405596b"), "Menara 15 pcs macaron aneka rasa dipadukan bunga mawar segar di alasnya. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-18", "Pastel Lilac Botanical Spa", COMMERCIAL_CATEGORIES[3], 385000, unsplash("photo-1513519245088-0e12902e5a38"), "Sabun organik botani, teh chamomile bunga, dan reed diffuser lavender. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-19", "Chandon Sparkling & Luxury Truffles", COMMERCIAL_CATEGORIES[3], 1150000, unsplash("photo-1569919659476-f0852f6834b7"), "Sparkling wine premium, truffle cokelat eropa, dan hiasan pita sage. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-20", "Vintage Bordeaux Wine & Cheese", COMMERCIAL_CATEGORIES[3], 1450000, unsplash("photo-1506377247377-2a5b3b417ebb"), "Cabernet sauvignon vintage, keju gouda artisan, dan crackers asin. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-21", "Parsel Fitri Zamrud Cookies", COMMERCIAL_CATEGORIES[4], 925000, unsplash("photo-1618160702438-9b02ab6515c9"), "Kurma safawi, nastar wijsman, kastengel, dan putri salju dalam hardbox hijau emas. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-22", "Hampers Lebaran Mini Berkah", COMMERCIAL_CATEGORIES[4], 450000, unsplash("photo-1509440159596-0249088772ff"), "3 toples kue kering tradisional dan kurma pilihan untuk silaturahmi kerabat. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-23", "Seserahan Akrilik Gold 7 Box", COMMERCIAL_CATEGORIES[4], 3500000, unsplash("photo-1513201099705-a9746e1e201f"), "Set 7 kotak akrilik lis emas lengkap dekorasi bunga dan pita. Tanpa label halal", ["wedding"], "non-food"),
  product("catalog-24", "Hantaran Mahar Al-Qur'an Kristal", COMMERCIAL_CATEGORIES[4], 1250000, unsplash("photo-1609599006353-e629aaabfeae"), "Box kayu akrilik isi Al-Qur'an mushaf cover cantik dan tasbih kristal. Tanpa label halal", ["wedding"], "non-food"),
  product("catalog-25", "Little Bunny Newborn Cotton Set", COMMERCIAL_CATEGORIES[4], 595000, unsplash("photo-1515488042361-ee00e0ddd4e4"), "Pakaian bayi katun organik, boneka rajut kelinci, teether kayu, dan selimut lembut. Tanpa label halal", ["baby"], "non-food"),
];
// Legacy showcase seed ids from src/lib/data.ts; the v4 total catalog replacement retires them.
const RETIRED_PRODUCT_IDS = new Set([
  "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16",
  "florist-wine", "florist-dates", "florist-sparkling", "florist-board", "florist-bouquet", "florist-coffee", "florist-cheese",
]);
export function migrateCommercialCatalog(products: Product[], version = 0) {
  if (version >= COMMERCIAL_CATALOG_VERSION) return products;
  // v4: total replacement with the 25-item catalog. Admin-added custom products survive;
  // catalog items deleted before the migration are never resurrected.
  const keptCustoms = products.filter(p => !p.id.startsWith("catalog-") && !RETIRED_PRODUCT_IDS.has(p.id));
  const replaced = COMMERCIAL_PRODUCTS
    .map(fresh => {
      const old = products.find(p => p.id === fresh.id);
      if (old) return { ...fresh, stock: old.stock, active: old.active };
      return version < 2 ? fresh : null;
    })
    .filter((p): p is Product => p !== null);
  return [...keptCustoms, ...replaced];
}
export const FLASH_SALES = [
  { productId: 'catalog-08', originalPrice: 420000 },
  { productId: 'catalog-13', originalPrice: 685000 },
  { productId: 'catalog-22', originalPrice: 560000 },
];
export function saleValues(price: number, originalPrice: number) {
  return { saving: Math.max(0, originalPrice - price), discount: Math.max(0, Math.round((1 - price / originalPrice) * 100)) };
}
export function dailyCountdown(now: Date) {
  const jakartaTime = now.getTime() + 7 * 3600000;
  const seconds = 86400 - Math.floor(((jakartaTime % 86400000) + 86400000) % 86400000 / 1000);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(v => String(v).padStart(2, '0')).join(':');
}
export const OCCASIONS = [
  { id: 'duka', label: 'Duka Cita', image: standing }, { id: 'opening', label: 'Grand Opening', image: board },
  { id: 'wedding', label: 'Wedding', image: blush }, { id: 'wisuda', label: 'Wisuda', image: bouquet },
  { id: 'romantic', label: 'Romantis & Anniv', image: bouquet }, { id: 'baby', label: 'Baby Born', image: newborn },
  { id: 'well', label: 'Get Well Soon', image: fruits }, { id: 'corporate', label: 'Corporate Care', image: eid },
];
export function matchesOccasion(p: Product, id: string) {
  if (p.occasions?.includes(id)) return true;
  return ({ baby: /Baby Born/, romantic: /Birthday & Anniv/, corporate: /Corporate Parcel/, wedding: /Seserahan & Hantaran/, well: /Fresh & Healthy/ } as Record<string, RegExp>)[id]?.test(p.category) ?? false;
}
export const BUDGETS = [
  { id: 'low', label: '< Rp 300rb', min: 0, max: 300000 },
  { id: 'mid', label: 'Rp 300rb–600rb', min: 300000, max: 600001 },
  { id: 'high', label: 'Rp 600rb–1jt', min: 600001, max: 1000001 },
  { id: 'luxury', label: '> Rp 1jt', min: 1000001, max: Infinity },
];
export const ARTICLES = [
  { slug: 'arti-warna-bunga', title: 'Arti Warna Bunga dan Kapan Sebaiknya Dipakai', image: bouquet, summary: 'Pilih warna yang menyampaikan perasaan Anda.', paragraphs: ['Mawar merah umum dipilih untuk cinta dan perayaan romantis. Pink menyampaikan apresiasi, sedangkan kuning membawa kesan hangat dan persahabatan.', 'Putih sering digunakan untuk belasungkawa maupun pernikahan. Makna warna bergantung pada budaya dan penerima; pertimbangkan preferensi pribadi mereka.', 'Padukan dua atau tiga warna agar rangkaian seimbang. Sampaikan momen, warna favorit dan pesan kepada florist sebelum pemesanan.'] },
  { slug: 'etika-bunga-duka', title: 'Etika Mengirim Bunga Duka Cita di Indonesia', image: standing, summary: 'Ucapan tulus dengan penghormatan yang tepat.', paragraphs: ['Gunakan ucapan singkat, tulus dan sopan. Pastikan ejaan nama almarhum serta nama keluarga benar sebelum rangkaian dibuat.', 'Tanyakan lokasi rumah duka, jadwal pelayanan dan aturan penerimaan bunga. Hindari mengirim rangkaian setelah acara berakhir tanpa konfirmasi keluarga.', 'Pilih simbol keagamaan hanya jika sesuai keyakinan keluarga. Rangkaian putih dan hijau tanpa simbol khusus bisa menjadi pilihan netral.'] },
  { slug: 'ukuran-papan-bunga', title: 'Ukuran Papan Bunga: Standar, Jumbo, atau Acrylic Minimalis?', image: acrylic, summary: 'Sesuaikan ukuran dengan tempat dan acara.', paragraphs: ['Papan standar sekitar 2 × 1,25 meter cocok untuk ucapan pernikahan dan belasungkawa. Ukuran 2 × 1,5 meter memberi ruang lebih untuk nama perusahaan.', 'Papan jumbo membutuhkan ruang lebih luas dan akses pengiriman yang memadai. Konfirmasikan area penempatan kepada penyelenggara.', 'Akrilik 60 × 90cm di tripod sesuai untuk welcome sign di ruang acara. Pilih tulisan singkat agar mudah dibaca dari jarak beberapa meter.'] },
  { slug: 'merawat-buket', title: 'Cara Merawat Buket Bunga Segar agar Bertahan Lebih Lama', image: bouquet, summary: 'Perawatan sederhana untuk bunga tetap segar.', paragraphs: ['Potong ujung batang secara miring dengan alat bersih, lalu masukkan ke vas berisi air bersih. Buang daun yang terendam agar air tidak cepat kotor.', 'Ganti air setiap hari dan jauhkan bunga dari sinar matahari langsung, sumber panas serta buah matang. Gunakan nutrisi bunga sesuai instruksi bila tersedia.', 'Ketahanan berbeda menurut jenis bunga dan kondisi ruangan. Lily dan mawar umumnya dapat dinikmati beberapa hari dengan perawatan yang baik.'] },
];
export const FAQ = [
  { q: 'Apakah bisa dikirim Same-Day?', a: 'Produk bertanda Same-Day dapat diajukan untuk pengiriman hari yang sama. Ketersediaan slot, stok dan waktu tiba dikonfirmasi CS melalui WhatsApp.' },
  { q: 'Apakah ada foto sebelum rangkaian dikirim?', a: 'Foto rangkaian disampaikan untuk konfirmasi sebelum pengiriman. Pastikan nomor WhatsApp penerima konfirmasi aktif.' },
  { q: 'Kota mana saja yang dijangkau?', a: 'Jabodetabek, Bandung, Surabaya, Semarang, Yogyakarta, Medan dan Bali. Biaya serta jangkauan alamat akhir dikonfirmasi CS.' },
  { q: 'Bisa custom tulisan dan warna bunga?', a: 'Bisa. Isi pesan kartu saat pemesanan dan sampaikan warna pilihan melalui WhatsApp. Jenis bunga mengikuti ketersediaan.' },
  { q: 'Bagaimana cara memesan tanpa akun?', a: 'Pesanan dapat dilanjutkan melalui keranjang atau WhatsApp tanpa akun. Detail pesanan dan pembayaran dikonfirmasi bersama CS.' },
  { q: 'Bagaimana jika bunga pilihan tidak tersedia?', a: 'CS akan meminta persetujuan untuk alternatif warna atau bunga sebelum rangkaian dibuat. Jangan lakukan pembayaran sebelum detail disepakati.' },
];
export const PAYMENTS = [ { label: 'Transfer Bank', methods: ['BCA', 'Mandiri', 'BNI', 'BRI'] }, { label: 'E-Wallet', methods: ['GoPay', 'OVO', 'DANA', 'ShopeePay'] }, { label: 'Lainnya', methods: ['QRIS', 'Kartu Kredit'] } ];
