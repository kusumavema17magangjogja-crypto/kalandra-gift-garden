import type { Product } from '@/lib/data';

// 1. Papan & Standing (Foto Karangan Jadi)
import boardDuka from '@/assets/standing-flower.jpg';
import boardOpening from '@/assets/board-grand-opening.jpg';
import boardWeddingTripod from '@/assets/acrylic-tripod.jpg';
import boardAcrylicGold from '@/assets/acrylic-gold-opening.jpg';
import boardRustic from '@/assets/board-rustic-paper.jpg';

// 2. Buket & Vas (Foto Buket Jadi)
import bouquetSage from '@/assets/rose-lily-bouquet.jpg';
import bouquetRosesKorean from '@/assets/red-roses-korean.jpg';
import bouquetHydrangea from '@/assets/hydrangea-pastel.jpg';
import tableVase from '@/assets/casablanca-vase.jpg';
import bloomBoxChoc from '@/assets/chocolate-bloom-box.jpg';

// 3. Parsel Buah (Foto Keranjang Parsel Rapi)
import fruitRoyal from '@/assets/citrus-basket.jpg';
import fruitMuscat from '@/assets/orchard-cider-crate.jpg';
import fruitJuiceBasket from '@/assets/berry-juice-basket.jpg';
import fruitRubyBasket from '@/assets/ruby-fruit-basket.jpg';
import fruitBamboo from '@/assets/citrus-bamboo.jpg';

// 4. Hampers Ultah & Mewah (Foto Box Tertata)
import hamperPretzel from '@/assets/beer-pretzel-tub.jpg';
import hamperMacaron from '@/assets/macaron.jpg';
import hamperLilacSpa from '@/assets/lilac.jpg';
import hamperRoseBath from '@/assets/rose-bathrobe.jpg';
import hamperPraline from '@/assets/praline-liqueur.jpg';

// 5. Lebaran, Seserahan & Corporate (Foto Box Hantaran Rapi)
import hamperEidRoyal from '@/assets/eid-royal.jpg';
import hamperEidMini from '@/assets/eid-mini.jpg';
import seserahanGold from '@/assets/blush-seserahan.jpg';
import maharQuran from '@/assets/mahar-quran.jpg';
import babyNewborn from '@/assets/newborn.jpg';

// Foto tambahan untuk momen
import boardThumb from '@/assets/flower-board.jpg';
import fruitThumb from '@/assets/fruits.jpg';
import eidThumb from '@/assets/lebaran.jpg';

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

export const cardTemplateLabel = (id = 'classic') => 
  CARD_TEMPLATES.find(t => t.id === id)?.label ?? CARD_TEMPLATES[0].label;

export const CUSTOM_NOTE = 'Bisa Request Warna/Nuansa Bunga & Tulisan';

export const COMMERCIAL_CATEGORIES = [
  "Papan Bunga & Papan Acrylic", 
  "Hand Bouquet & Bloom Box", 
  "Fresh & Healthy / Parsel Buah", 
  "Birthday, Anniv & Luxury Hampers", 
  "Lebaran, Seserahan, Baby Born & Corporate"
] as const;

// Naikkan versi ke 6 agar cache browser langsung me-refresh foto produk asli
export const COMMERCIAL_CATALOG_VERSION = 6;

function product(
  id: string, 
  name: string, 
  category: string, 
  price: number, 
  image: string, 
  description: string, 
  occasions: string[], 
  foodStatus: Product["foodStatus"] = "non-food"
): Product {
  return { 
    id, 
    name, 
    category, 
    price, 
    image, 
    description: `${description}. ${CUSTOM_NOTE}.`, 
    occasions, 
    foodStatus, 
    stock: 10, 
    active: true, 
    tags: ["express"], 
    rating: 5, 
    reviews: 0 
  };
}

export const COMMERCIAL_PRODUCTS: Product[] = [
  // 1. Papan Bunga & Papan Acrylic (Karangan Jadi)
  product("catalog-01", "Standing Flower Krisan & Lily Duka Cita", COMMERCIAL_CATEGORIES[0], 600000, boardDuka, "Rangkaian standing flower besi bunga krisan & aster segar bernuansa putih hijau", ["duka"], "non-food"),
  product("catalog-02", "Bunga Papan Grand Opening Mulia (2x1.25m)", COMMERCIAL_CATEGORIES[0], 650000, boardOpening, "Karangan bunga papan segar keliling ucapan selamat grand opening, bisa custom logo perusahaan", ["opening", "corporate"], "non-food"),
  product("catalog-03", "Papan Acrylic Wedding Tripod Kayu", COMMERCIAL_CATEGORIES[0], 850000, boardWeddingTripod, "Akrilik bening di tripod kayu natural lengkap dengan dekorasi mawar & daun eucalyptus", ["wedding"], "non-food"),
  product("catalog-04", "Papan Acrylic Opening Gold Foil", COMMERCIAL_CATEGORIES[0], 950000, boardAcrylicGold, "Akrilik tripod besi dengan cetak gold mirror dan dekorasi bunga hiasan mewah", ["opening", "corporate"], "non-food"),
  product("catalog-05", "Bunga Papan Kertas Ramah Lingkungan", COMMERCIAL_CATEGORIES[0], 550000, boardRustic, "Karangan papan bunga kertas bernuansa rustic modern dan ramah lingkungan", ["opening", "corporate"], "non-food"),

  // 2. Hand Bouquet & Bloom Box (Buket Jadi)
  product("catalog-06", "Blush Rose & Lily Sage Wrap", COMMERCIAL_CATEGORIES[1], 625000, bouquetSage, "Buket bunga mawar blush pink dan lily putih dibungkus wrap sage green elegan", ["romantic"], "non-food"),
  product("catalog-07", "Everlasting 50 Red Roses Korean", COMMERCIAL_CATEGORIES[1], 750000, bouquetRosesKorean, "Buket 50 tangkai mawar merah segar dibungkus gaya Korea matte hitam", ["romantic"], "non-food"),
  product("catalog-08", "Pastel Hydrangea Dream Bouquet", COMMERCIAL_CATEGORIES[1], 480000, bouquetHydrangea, "Buket bunga hortensia biru lembut berpadu baby breath dan gomphrena", ["romantic", "wisuda"], "non-food"),
  product("catalog-09", "Surprise Bloom Box Drawer with Chocolate", COMMERCIAL_CATEGORIES[1], 550000, bloomBoxChoc, "Bloom box bulat beludru warna pink dengan laci bawah berisi cokelat praline", ["romantic"], "halal"),
  product("catalog-10", "White Casablanca Table Vase", COMMERCIAL_CATEGORIES[1], 520000, tableVase, "Rangkaian bunga casablanca putih segar dalam vas meja keramik siap pajang", ["romantic"], "non-food"),

  // 3. Fresh & Healthy / Parsel Buah (Parsel Keranjang Jadi)
  product("catalog-11", "Royal Fruit & Bird's Nest Hamper", COMMERCIAL_CATEGORIES[2], 980000, fruitRoyal, "Keranjang rotan anyam berisi aneka buah segar pilihan dan botol sarang burung walet. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-12", "Imported Orchard Crate with Sparkling Cider", COMMERCIAL_CATEGORIES[2], 620000, fruitMuscat, "Peti kayu berisi aneka buah pir, apel, dan botol jus sari buah berkarbonasi. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-13", "Vitality Cold-Pressed Juice & Berry Basket", COMMERCIAL_CATEGORIES[2], 480000, fruitJuiceBasket, "Parsel keranjang buah berry segar lengkap dengan botol jus dingin sehat. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-14", "Red Ruby Deluxe Fruit Basket", COMMERCIAL_CATEGORIES[2], 620000, fruitRubyBasket, "Parsel keranjang buah delima merah, apel washington, dan plum berhias pita satin. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-15", "Fresh Citrus Boost & Wellness Herbal Tonic", COMMERCIAL_CATEGORIES[2], 390000, fruitBamboo, "Aneka jeruk segar manis dalam wadah anyaman bambu rapi dan higienis. Makanan/minuman halal", ["well"], "halal"),

  // 4. Birthday, Anniv & Luxury Hampers (Hampers Box Jadi)
  product("catalog-16", "Craft Beer & Savory Pretzels Celebration Tub", COMMERCIAL_CATEGORIES[3], 550000, hamperPretzel, "Ember es dekoratif berisi bir kaleng impor dan camilan pretzel renyah. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-17", "Sweet Blossom Macaron Tower & Roses", COMMERCIAL_CATEGORIES[3], 420000, hamperMacaron, "Menara 15 pcs macaron aneka rasa warna-warni dipadu bunga mawar di alasnya. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-18", "Pastel Lilac Botanical Spa Hamper", COMMERCIAL_CATEGORIES[3], 385000, hamperLilacSpa, "Gift box lilac isi sabun organik botani, teh chamomile, dan aroma lavender. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-19", "Moët Rosé & Silk Bathrobe Pamper Box", COMMERCIAL_CATEGORIES[3], 1850000, hamperRoseBath, "Boks mewah berisi sampanye Moët Rosé, jubah sutra tidur, dan bath salt mawar. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-20", "Artisan Belgian Praline & Liqueur Selection", COMMERCIAL_CATEGORIES[3], 680000, hamperPraline, "Koleksi cokelat praline truffle Belgia pilihan isi liqueur khas. Tanpa label halal", ["romantic"], "non-halal"),

  // 5. Lebaran, Seserahan, Baby Born & Corporate (Hantaran Jadi)
  product("catalog-21", "Emerald Eid Royal Feast", COMMERCIAL_CATEGORIES[4], 1150000, hamperEidRoyal, "Hardbox hijau zamrud isi 4 toples toples kaca kue kering premium, kurma, dan sajadah beludru. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-22", "Hampers Lebaran Mini Berkah", COMMERCIAL_CATEGORIES[4], 450000, hamperEidMini, "Paket hemat toples kue kering nastar, kastengel, dan kurma pilihan. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-23", "Seserahan Akrilik Gold 7 Box", COMMERCIAL_CATEGORIES[4], 3500000, seserahanGold, "Set 7 kotak seserahan akrilik bingkai emas dengan hiasan bunga dan pita terracotta. Tanpa label halal", ["wedding"], "non-food"),
  product("catalog-24", "Hantaran Mahar Al-Qur'an & Tasbih Kristal", COMMERCIAL_CATEGORIES[4], 1250000, maharQuran, "Box mahar kayu akrilik isi Al-Qur'an mushaf cover cantik dan tasbih kristal. Tanpa label halal", ["wedding"], "non-food"),
  product("catalog-25", "Little Bunny Newborn Organic Cotton Set", COMMERCIAL_CATEGORIES[4], 595000, babyNewborn, "Gift box bayi berisi pakaian katun organik, boneka rajut kelinci, dan teether kayu. Tanpa label halal", ["baby"], "non-food"),
];

export function migrateCommercialCatalog(products: Product[], version = 0) {
  if (version >= COMMERCIAL_CATALOG_VERSION && products.length === COMMERCIAL_PRODUCTS.length) {
    return products;
  }
  
  return COMMERCIAL_PRODUCTS.map(fresh => {
    const existing = products.find(p => p.id === fresh.id);
    return existing ? { ...fresh, stock: existing.stock, active: existing.active } : fresh;
  });
}

export const FLASH_SALES = [
  { productId: 'catalog-08', originalPrice: 520000 },
  { productId: 'catalog-13', originalPrice: 650000 },
  { productId: 'catalog-22', originalPrice: 560000 },
];

export function saleValues(price: number, originalPrice: number) {
  return { 
    saving: Math.max(0, originalPrice - price), 
    discount: Math.max(0, Math.round((1 - price / originalPrice) * 100)) 
  };
}

export function dailyCountdown(now: Date) {
  const jakartaTime = now.getTime() + 7 * 3600000;
  const seconds = 86400 - Math.floor(((jakartaTime % 86400000) + 86400000) % 86400000 / 1000);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map(v => String(v).padStart(2, '0'))
    .join(':');
}

export const OCCASIONS = [
  { id: 'duka', label: 'Duka Cita', image: boardDuka },
  { id: 'opening', label: 'Grand Opening', image: boardOpening },
  { id: 'wedding', label: 'Wedding', image: seserahanGold },
  { id: 'wisuda', label: 'Wisuda', image: bouquetHydrangea },
  { id: 'romantic', label: 'Romantis & Anniv', image: bouquetSage },
  { id: 'baby', label: 'Baby Born', image: babyNewborn },
  { id: 'well', label: 'Get Well Soon', image: fruitRoyal },
  { id: 'corporate', label: 'Corporate Care', image: hamperEidRoyal },
];

export function matchesOccasion(p: Product, id: string) {
  if (p.occasions?.includes(id)) return true;
  return ({ 
    baby: /Baby Born/, 
    romantic: /Birthday & Anniv/, 
    corporate: /Corporate Parcel/, 
    wedding: /Seserahan & Hantaran/, 
    well: /Fresh & Healthy/ 
  } as Record<string, RegExp>)[id]?.test(p.category) ?? false;
}

export const BUDGETS = [
  { id: 'low', label: '< Rp 300rb', min: 0, max: 300000 },
  { id: 'mid', label: 'Rp 300rb–600rb', min: 300000, max: 600001 },
  { id: 'high', label: 'Rp 600rb–1jt', min: 600001, max: 1000001 },
  { id: 'luxury', label: '> Rp 1jt', min: 1000001, max: Infinity },
];

export const ARTICLES = [
  { 
    slug: 'arti-warna-bunga', 
    title: 'Arti Warna Bunga dan Kapan Sebaiknya Dipakai', 
    image: bouquetSage, 
    summary: 'Pilih warna yang menyampaikan perasaan Anda.', 
    paragraphs: [
      'Mawar merah umum dipilih untuk cinta dan perayaan romantis. Pink menyampaikan apresiasi, sedangkan kuning membawa kesan hangat dan persahabatan.',
      'Putih sering digunakan untuk belasungkawa maupun pernikahan. Makna warna bergantung pada budaya dan penerima; pertimbangkan preferensi pribadi mereka.',
      'Padukan dua atau tiga warna agar rangkaian seimbang. Sampaikan momen, warna favorit dan pesan kepada florist sebelum pemesanan.'
    ] 
  },
  { 
    slug: 'etika-bunga-duka', 
    title: 'Etika Mengirim Bunga Duka Cita di Indonesia', 
    image: boardDuka, 
    summary: 'Ucapan tulus dengan penghormatan yang tepat.', 
    paragraphs: [
      'Gunakan ucapan singkat, tulus dan sopan. Pastikan ejaan nama almarhum serta nama keluarga benar sebelum rangkaian dibuat.',
      'Tanyakan lokasi rumah duka, jadwal pelayanan dan aturan penerimaan bunga. Hindari mengirim rangkaian setelah acara berakhir tanpa konfirmasi keluarga.',
      'Pilih simbol keagamaan hanya jika sesuai keyakinan keluarga. Rangkaian putih dan hijau tanpa simbol khusus bisa menjadi pilihan netral.'
    ] 
  },
  { 
    slug: 'ukuran-papan-bunga', 
    title: 'Ukuran Papan Bunga: Standar, Jumbo, atau Acrylic Minimalis?', 
    image: boardWeddingTripod, 
    summary: 'Sesuaikan ukuran dengan tempat dan acara.', 
    paragraphs: [
      'Papan standar sekitar 2 × 1,25 meter cocok untuk ucapan pernikahan dan belasungkawa. Ukuran 2 × 1,5 meter memberi ruang lebih untuk nama perusahaan.',
      'Papan jumbo membutuhkan ruang lebih luas dan akses pengiriman yang memadai. Konfirmasikan area penempatan kepada penyelenggara.',
      'Akrilik 60 × 90cm di tripod sesuai untuk welcome sign di ruang acara. Pilih tulisan singkat agar mudah dibaca dari jarak beberapa meter.'
    ] 
  },
  { 
    slug: 'merawat-buket', 
    title: 'Cara Merawat Buket Bunga Segar agar Bertahan Lebih Lama', 
    image: bouquetRosesKorean, 
    summary: 'Perawatan sederhana untuk bunga tetap segar.', 
    paragraphs: [
      'Potong ujung batang secara miring dengan alat bersih, lalu masukkan ke vas berisi air bersih. Buang daun yang terendam agar air tidak cepat kotor.',
      'Ganti air setiap hari dan jauhkan bunga dari sinar matahari langsung, sumber panas serta buah matang. Gunakan nutrisi bunga sesuai instruksi bila tersedia.',
      'Ketahanan berbeda menurut jenis bunga dan kondisi ruangan. Lily dan mawar umumnya dapat dinikmati beberapa hari dengan perawatan yang baik.'
    ] 
  },
];

export const FAQ = [
  { q: 'Apakah bisa dikirim Same-Day?', a: 'Produk bertanda Same-Day dapat diajukan untuk pengiriman hari yang sama. Ketersediaan slot, stok dan waktu tiba dikonfirmasi CS melalui WhatsApp.' },
  { q: 'Apakah ada foto sebelum rangkaian dikirim?', a: 'Foto rangkaian disampaikan untuk konfirmasi sebelum pengiriman. Pastikan nomor WhatsApp penerima konfirmasi aktif.' },
  { q: 'Kota mana saja yang dijangkau?', a: 'Jabodetabek, Bandung, Surabaya, Semarang, Yogyakarta, Medan dan Bali. Biaya serta jangkauan alamat akhir dikonfirmasi CS.' },
  { q: 'Bisa custom tulisan dan warna bunga?', a: 'Bisa. Isi pesan kartu saat pemesanan dan sampaikan warna pilihan melalui WhatsApp. Jenis bunga mengikuti ketersediaan.' },
  { q: 'Bagaimana cara memesan tanpa akun?', a: 'Pesanan dapat dilanjutkan melalui keranjang atau WhatsApp tanpa akun. Detail pesanan dan pembayaran dikonfirmasi bersama CS.' },
  { q: 'Bagaimana jika bunga pilihan tidak tersedia?', a: 'CS akan meminta persetujuan untuk alternatif warna atau bunga sebelum rangkaian dibuat. Jangan lakukan pembayaran sebelum detail disepakati.' },
];

export const PAYMENTS = [
  { label: 'Transfer Bank', methods: ['BCA', 'Mandiri', 'BNI', 'BRI'] },
  { label: 'E-Wallet', methods: ['GoPay', 'OVO', 'DANA', 'ShopeePay'] },
  { label: 'Lainnya', methods: ['QRIS', 'Kartu Kredit'] }
];
