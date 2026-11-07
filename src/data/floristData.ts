import type { Product } from '@/lib/data';

// 1. Papan Bunga & Standing Flower (Aset Karangan Jadi)
import boardOpening from '@/assets/board-grand-opening.jpg';
import boardWeddingTripod from '@/assets/acrylic-tripod.jpg';
import boardAcrylicGold from '@/assets/acrylic-gold-opening.jpg';
import boardRustic from '@/assets/board-rustic-paper.jpg';
import boardFlower from '@/assets/flower-board.jpg';
import boardWeddingPastel from '@/assets/board-wedding-pastel.jpg';
import boardDuka from '@/assets/standing-flower.jpg';

// 2. Hand Bouquet & Standing Flower
import bouquetSage from '@/assets/rose-lily-bouquet.jpg';
import bouquetRosesKorean from '@/assets/red-roses-korean.jpg';
import bouquetHydrangea from '@/assets/hydrangea-pastel.jpg';
import tableVase from '@/assets/casablanca-vase.jpg';
import bloomBoxChoc from '@/assets/chocolate-bloom-box.jpg';
import bloomBoxPurple from '@/assets/purple-rose-box.jpg';
import peonyRanunculus from '@/assets/peony-ranunculus.jpg';

// 3. Parsel & Hampers Buah & Makanan Sehat
import fruitRoyal from '@/assets/citrus-basket.jpg';
import fruitMuscat from '@/assets/orchard-cider-crate.jpg';
import fruitJuiceBasket from '@/assets/berry-juice-basket.jpg';
import fruitRubyBasket from '@/assets/ruby-fruit-basket.jpg';
import fruitBamboo from '@/assets/citrus-bamboo.jpg';
import fruitBerryHoney from '@/assets/berry-honey.jpg';
import fruitGeneral from '@/assets/fruits.jpg';

// 4. Birthday, Anniv & Luxury Hampers
import hamperPretzel from '@/assets/beer-pretzel-tub.jpg';
import hamperMacaron from '@/assets/macaron.jpg';
import hamperLilacSpa from '@/assets/lilac.jpg';
import hamperRoseBath from '@/assets/rose-bathrobe.jpg';
import hamperPraline from '@/assets/praline-liqueur.jpg';
import hamperCoffee from '@/assets/coffee.jpg';
import hamperBirthdayBox from '@/assets/birthday.jpg';

// 5. Seserahan, Hantaran, Baby Born & Corporate
import seserahanGold from '@/assets/blush-seserahan.jpg';
import maharQuran from '@/assets/mahar-quran.jpg';
import babyNewborn from '@/assets/newborn.jpg';
import hamperEidRoyal from '@/assets/eid-royal.jpg';
import hamperEidMini from '@/assets/eid-mini.jpg';
import datesHoneyTea from '@/assets/dates-honey-tea.jpg';

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
  { id: 'crimson-red', label: 'Crimson Red', hex: '#990000' },
  { id: 'dusty-pink', label: 'Dusty Pink', hex: '#DCAE96' },
  { id: 'lavender', label: 'Soft Lavender', hex: '#B57EDC' },
  { id: 'lilac', label: 'Pastel Lilac', hex: '#C8A2C8' },
  { id: 'peach', label: 'Warm Peach', hex: '#FFE5B4' },
  { id: 'coral', label: 'Living Coral', hex: '#FF6F61' },
  { id: 'olive', label: 'Olive Green', hex: '#556B2F' },
  { id: 'forest-green', label: 'Deep Forest', hex: '#228B22' },
  { id: 'sky-blue', label: 'Sky Blue', hex: '#87CEEB' },
  { id: 'royal-blue', label: 'Royal Blue', hex: '#4169E1' },
  { id: 'teal', label: 'Deep Teal', hex: '#008080' },
  { id: 'mocha', label: 'Mocha Coffee', hex: '#795548' },
  { id: 'chocolate-brown', label: 'Dark Brown', hex: '#3E2723' },
  { id: 'silver', label: 'Metallic Silver', hex: '#C0C0C0' },
  { id: 'charcoal', label: 'Charcoal Grey', hex: '#36454F' },
  { id: 'pure-black', label: 'Jet Black', hex: '#111111' },
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
  { id: 'gold', label: 'Gold Luxury Border', className: 'greeting-gold' },
  { id: 'minimal', label: 'Modern Minimalist', className: 'greeting-minimal' },
  { id: 'festive', label: 'Festive Celebration', className: 'greeting-festive' },
  { id: 'islamic', label: 'Islamic Eid Arabesque', className: 'greeting-islamic' },
  { id: 'romance', label: 'Sweet Romance Petals', className: 'greeting-romance' },
  { id: 'botanical', label: 'Eucalyptus Botanical', className: 'greeting-botanical' },
  { id: 'luxury', label: 'Black & Gold Royale', className: 'greeting-luxury' },
  { id: 'watercolor', label: 'Soft Watercolor Splash', className: 'greeting-watercolor' },
  { id: 'vintage', label: 'Vintage Kraft Paper', className: 'greeting-vintage' },
] as const;

export const cardTemplateLabel = (id = 'classic') => 
  CARD_TEMPLATES.find(t => t.id === id)?.label ?? CARD_TEMPLATES[0].label;

export const CUSTOM_NOTE = 'Bisa Request Warna/Nuansa Bunga & Tulisan';

export const COMMERCIAL_CATEGORIES = [
  "Papan Bunga & Papan Acrylic", 
  "Hand Bouquet & Standing Flower", 
  "Parsel & Hampers", 
  "Birthday, Anniv & Luxury Hampers", 
  "Seserahan & Hantaran Pernikahan"
] as const;

export const COMMERCIAL_CATALOG_VERSION = 300;

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
  // ==========================================
  // 1. Papan Bunga & Papan Acrylic (10 Produk)
  // ==========================================
  product("catalog-01", "Bunga Papan Duka Cita Printing (2x1.25m)", "Papan Bunga & Papan Acrylic", 650000, boardOpening, "Karangan bunga papan ucapan belasungkawa resmi bernuansa formal dan rapi", ["duka"], "non-food"),
  product("catalog-02", "Papan Grand Opening Mulia Sukses", "Papan Bunga & Papan Acrylic", 650000, boardFlower, "Rangkaian bunga segar keliling dengan ucapan selamat cerah untuk peresmian kantor", ["opening", "corporate"], "non-food"),
  product("catalog-03", "Papan Acrylic Wedding Tripod Kayu", "Papan Bunga & Papan Acrylic", 850000, boardWeddingTripod, "Akrilik bening di tripod kayu natural lengkap dengan dekorasi mawar & daun eucalyptus", ["wedding"], "non-food"),
  product("catalog-04", "Papan Acrylic Opening Gold Foil", "Papan Bunga & Papan Acrylic", 950000, boardAcrylicGold, "Akrilik tripod besi dengan cetak gold mirror dan dekorasi bunga hiasan mewah", ["opening", "corporate"], "non-food"),
  product("catalog-05", "Bunga Papan Kertas Ramah Lingkungan Duka Cita", "Papan Bunga & Papan Acrylic", 550000, boardRustic, "Karangan papan bunga kertas bernuansa putih sage hening untuk ungkapan belasungkawa", ["duka", "corporate"], "non-food"),
  product("catalog-06", "Bunga Papan Ucapan Selamat & Wisuda", "Papan Bunga & Papan Acrylic", 700000, "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80", "Karangan bunga papan warna semarak cerah untuk wisuda dan peresmian kantor", ["opening", "wisuda"], "non-food"),
  product("catalog-07", "Bunga Papan Happy Wedding Romansa Pastel", "Papan Bunga & Papan Acrylic", 750000, boardWeddingPastel, "Karangan bunga papan pernikahan warna pastel mewah dengan hiasan suyok keliling", ["wedding"], "non-food"),
  product("catalog-08", "Standing Flower Besi Minimalis Wedding", "Papan Bunga & Papan Acrylic", 850000, "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80", "Standing flower dua susun mawar avalanche peach dan lili casablanca untuk ucapan pernikahan", ["wedding", "opening"], "non-food"),
  product("catalog-09", "Papan Acrylic Duka Cita Minimalis Putih", "Papan Bunga & Papan Acrylic", 780000, "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80", "Akrilik semi-frosted tripod kayu dengan rangkaian mawar putih dan baby breath lembut", ["duka"], "non-food"),
  product("catalog-10", "Standing Flower Krisan Penghormatan Duka Cita", "Papan Bunga & Papan Acrylic", 600000, boardDuka, "Rangkaian standing flower besi bunga krisan & aster segar bernuansa putih hijau penghormatan", ["duka"], "non-food"),

  // ==========================================
  // 2. Hand Bouquet & Standing Flower (10 Produk)
  // ==========================================
  product("catalog-11", "Circle Floral Hoop Bridal Bouquet Trend", "Hand Bouquet & Standing Flower", 580000, "https://images.unsplash.com/photo-1519225438183-4700d7fb4734?w=800&auto=format&fit=crop&q=80", "Buket pengantin melingkar (hoop wedding bouquet) dengan susunan lili putih, mawar pastel, dan juntaian wisteria elegan", ["wedding", "romantic"], "non-food"),
  product("catalog-12", "Jasminum Cascade Maroon Handbag Bouquet", "Hand Bouquet & Standing Flower", 650000, "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=800&auto=format&fit=crop&q=80", "Buket pengantin tas jinjing bulat mawar merah maroon dengan ronce melati menggantung wangi khas tradisi modern", ["wedding", "romantic"], "non-food"),
  product("catalog-13", "White Lily Cascade Wedding Hoop Bouquet", "Hand Bouquet & Standing Flower", 590000, "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop&q=80", "Buket hoop lingkaran anyam putih bersih dengan juntaian anggrek bulan dan pita sutra", ["wedding", "romantic"], "non-food"),
  product("catalog-14", "Lavender Wisteria Hanging Hoop Flower", "Hand Bouquet & Standing Flower", 550000, "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80", "Buket lingkaran jinjing dengan kombinasi bunga mawar lilac ungu dan juntaian wisteria anggun", ["wedding", "romantic"], "non-food"),
  product("catalog-15", "Blush Rose & Lily Sage Wrap", "Hand Bouquet & Standing Flower", 625000, bouquetSage, "Buket bunga mawar blush pink dan lily putih dibungkus wrap sage green elegan", ["romantic"], "non-food"),
  product("catalog-16", "Everlasting 50 Red Roses Korean Style", "Hand Bouquet & Standing Flower", 750000, bouquetRosesKorean, "Buket 50 tangkai mawar merah segar dibungkus gaya Korea matte hitam", ["romantic"], "non-food"),
  product("catalog-17", "Pastel Hydrangea Dream Bouquet", "Hand Bouquet & Standing Flower", 480000, bouquetHydrangea, "Buket bunga hortensia biru lembut berpadu baby breath dan gomphrena", ["romantic", "wisuda"], "non-food"),
  product("catalog-18", "White Casablanca Condolence Table Vase", "Hand Bouquet & Standing Flower", 520000, tableVase, "Rangkaian bunga casablanca putih murni dalam vas keramik untuk simpati duka cita & rumah duka", ["duka", "well"], "non-food"),
  product("catalog-19", "Blushing Peony & Ranunculus Luxe", "Hand Bouquet & Standing Flower", 680000, peonyRanunculus, "Koleksi bunga peony premium bernuansa pink lembut dengan sentuhan pita satin champagne", ["romantic", "wedding"], "non-food"),
  product("catalog-20", "Sunflower & Cotton Graduation Special", "Hand Bouquet & Standing Flower", 350000, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80", "3 tangkai bunga matahari mekar dipadu dried cotton dan wrapping biru navy elegan", ["wisuda"], "non-food"),

  // ==========================================
  // 3. Parsel & Hampers (10 Produk - Sehat & Nutrisi)
  // ==========================================
  product("catalog-21", "Healthy Fitness & Whey Protein Snack Bouquet", "Parsel & Hampers", 520000, "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80", "Buket nutrisi berisi whey protein isolate sachet, rolled oat kaleng, selai kacang murni, dan protein bar", ["well"], "halal"),
  product("catalog-22", "Sunnah Wellness Herbal Hamper (Madu & Habbatussauda)", "Parsel & Hampers", 480000, "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80", "Keranjang rotan berisi madu randu mentah murni, minyak zaitun extra virgin, habbatussauda, dan sari kurma", ["well", "corporate"], "halal"),
  product("catalog-23", "Immune Recovery Oat & Vitamin Crate", "Parsel & Hampers", 430000, "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80", "Paket pemulihan kesehatan berisi oat kaleng quaker, susu steril, sari lemon murni, dan madu jahe", ["well", "duka"], "halal"),
  product("catalog-24", "Superfood Chia & Granola Health Basket", "Parsel & Hampers", 475000, "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80", "Parsel sarapan sehat berisi rolled oat, organic chia seed, almond panggang, granola artisan, dan madu murni", ["well"], "halal"),
  product("catalog-25", "Royal Fruit & Bird's Nest Hamper", "Parsel & Hampers", 980000, fruitRoyal, "Keranjang rotan anyam berisi aneka buah segar pilihan dan 3 botol sarang burung walet", ["well", "duka"], "halal"),
  product("catalog-26", "Imported Orchard Crate with Sparkling Cider", "Parsel & Hampers", 620000, fruitMuscat, "Peti kayu berisi aneka buah pir, apel, dan botol jus sari buah berkarbonasi", ["well"], "halal"),
  product("catalog-27", "Vitality Cold-Pressed Juice & Fresh Fruit Basket", "Parsel & Hampers", 480000, fruitJuiceBasket, "Parsel keranjang buah segar lengkap dengan botol jus dingin sehat tanpa gula", ["well"], "halal"),
  product("catalog-28", "Red Ruby Deluxe Fruit Basket", "Parsel & Hampers", 620000, fruitRubyBasket, "Parsel keranjang buah delima merah, apel washington, dan plum berhias pita satin", ["well"], "halal"),
  product("catalog-29", "Fresh Citrus Boost & Wellness Herbal Tonic", "Parsel & Hampers", 390000, fruitBamboo, "Aneka jeruk segar manis dalam wadah anyaman bambu rapi dan higienis", ["well"], "halal"),
  product("catalog-30", "Organic Berry Medley & Manuka Honey Pot", "Parsel & Hampers", 750000, fruitBerryHoney, "Keranjang berisi aneka buah berry segar dan jar madu manuka asli berkhasiat", ["well"], "halal"),

  // ==========================================
  // 4. Birthday, Anniv & Luxury Hampers (10 Produk)
  // ==========================================
  product("catalog-31", "Surprise Bloom Box Drawer with Chocolate", "Birthday, Anniv & Luxury Hampers", 550000, bloomBoxChoc, "Bloom box bulat beludru warna pink dengan laci bawah berisi cokelat praline", ["romantic"], "halal"),
  product("catalog-32", "Sweet Blossom Macaron Tower & Roses", "Birthday, Anniv & Luxury Hampers", 420000, hamperMacaron, "Menara 15 pcs macaron aneka rasa warna-warni dipadu bunga mawar di alasnya", ["romantic"], "halal"),
  product("catalog-33", "Pastel Lilac Botanical Spa Hamper", "Birthday, Anniv & Luxury Hampers", 385000, hamperLilacSpa, "Gift box lilac isi sabun organik botani, teh chamomile, dan aroma lavender", ["romantic"], "halal"),
  product("catalog-34", "Moët Rosé & Silk Bathrobe Pamper Box", "Birthday, Anniv & Luxury Hampers", 1850000, hamperRoseBath, "Boks mewah berisi sampanye Moët Rosé, jubah sutra tidur, dan bath salt mawar", ["romantic"], "non-halal"),
  product("catalog-35", "Craft Beer & Savory Pretzels Celebration Tub", "Birthday, Anniv & Luxury Hampers", 550000, hamperPretzel, "Ember es dekoratif berisi bir kaleng impor dan camilan pretzel renyah", ["romantic"], "non-halal"),
  product("catalog-36", "Artisan Belgian Praline & Liqueur Selection", "Birthday, Anniv & Luxury Hampers", 680000, hamperPraline, "Koleksi cokelat praline truffle Belgia pilihan isi liqueur khas", ["romantic"], "non-halal"),
  product("catalog-37", "Executive Coffee Drip & Ceramic Set", "Birthday, Anniv & Luxury Hampers", 795000, hamperCoffee, "Kemasan box kayu eksklusif kopi single-origin, mug keramik, dan coaster", ["corporate"], "halal"),
  product("catalog-38", "Peach Rose Anniversary Flower & Candle Box", "Birthday, Anniv & Luxury Hampers", 650000, hamperBirthdayBox, "Buket mawar peach, lilin aromaterapi wangi santal, dan macaron renyah", ["romantic"], "halal"),
  product("catalog-39", "Ecuadorian Dark Purple Rose Velvet Box", "Birthday, Anniv & Luxury Hampers", 690000, bloomBoxPurple, "Mawar ungu tua Ekuador dalam kotak silinder suede hitam eksklusif", ["romantic"], "non-food"),
  product("catalog-40", "Luxury Chandon Sparkling & Belgian Truffle Crate", "Birthday, Anniv & Luxury Hampers", 1250000, "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=800&auto=format&fit=crop&q=80", "Peti kayu vintage isi sparkling wine premium, cokelat artisan, dan bunga mawar", ["romantic"], "non-halal"),

  // ==========================================
  // 5. Seserahan, Hantaran & Baby Born (10 Produk)
  // ==========================================
  product("catalog-41", "Little Bunny Newborn Organic Cotton Set", "Seserahan & Hantaran Pernikahan", 595000, babyNewborn, "Gift box bayi berisi pakaian katun organik, boneka rajut kelinci, dan teether kayu", ["baby"], "non-food"),
  product("catalog-42", "Deluxe Baby Spa & Care Basket Hamper", "Seserahan & Hantaran Pernikahan", 480000, "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80", "Keranjang anyam berisi sabun mandi bayi organik, lotion pelindung, handuk mikrofiber lembut, dan mainan", ["baby"], "non-food"),
  product("catalog-43", "Welcome Little Prince Diaper & Balloon Cake", "Seserahan & Hantaran Pernikahan", 420000, "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80", "Rangkaian cake popok bertingkat nuansa baby blue dengan balon ucapan transparan dan kaos kaki rajut", ["baby"], "non-food"),
  product("catalog-44", "Newborn Vintage Suitcase Gift Box", "Seserahan & Hantaran Pernikahan", 680000, "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80", "Koper mini elegan berisi jumper rajut, selimut bedong katun, bandana, dan kartu pengingat milestone", ["baby"], "non-food"),
  product("catalog-45", "Baby Girl Pastel Pink Elephant Basket", "Seserahan & Hantaran Pernikahan", 495000, "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80", "Keranjang rotan pink pastel lengkap dengan boneka gajah lembut, slabber makan, dan booties bayi", ["baby"], "non-food"),
  product("catalog-46", "Seserahan Akrilik Gold 7 Box Set", "Seserahan & Hantaran Pernikahan", 3500000, seserahanGold, "Set 7 kotak seserahan akrilik bingkai emas dengan hiasan bunga dan pita terracotta", ["wedding"], "non-food"),
  product("catalog-47", "Hantaran Mahar Al-Qur'an & Tasbih Kristal", "Seserahan & Hantaran Pernikahan", 1250000, maharQuran, "Box mahar kayu akrilik isi Al-Qur'an mushaf cover cantik dan tasbih kristal", ["wedding"], "non-food"),
  product("catalog-48", "Emerald Eid Royal Feast Box", "Seserahan & Hantaran Pernikahan", 1150000, hamperEidRoyal, "Hardbox hijau zamrud isi 4 toples kaca kue kering premium, kurma, dan sajadah", ["corporate"], "halal"),
  product("catalog-49", "Hampers Lebaran Mini Berkah", "Seserahan & Hantaran Pernikahan", 450000, hamperEidMini, "Paket hemat toples kue kering nastar, kastengel, dan kurma pilihan", ["corporate"], "halal"),
  product("catalog-50", "Safawi Dates, Raw Honey & Spiced Tea Box", "Seserahan & Hantaran Pernikahan", 620000, datesHoneyTea, "Paket kurma safawi kualitas super, madu randu mentah, dan teh rempah alami", ["corporate"], "halal"),
];

export function matchProductCategory(productCategory: string, selectedFilter: string): boolean {
  if (!selectedFilter || selectedFilter === "all" || selectedFilter === "Semua Koleksi") return true;
  if (productCategory.toLowerCase().trim() === selectedFilter.toLowerCase().trim()) return true;

  const f = selectedFilter.toLowerCase();
  const c = productCategory.toLowerCase();

  if (f.includes("hand bouquet") || f.includes("standing") || f.includes("bloom box")) {
    return c.includes("hand bouquet") || c.includes("standing");
  }
  if (f.includes("parsel") || f.includes("fresh") || (f.includes("hampers") && !f.includes("birthday"))) {
    return c.includes("parsel");
  }
  if (f.includes("seserahan") || f.includes("hantaran") || f.includes("lebaran") || f.includes("corporate")) {
    return c.includes("seserahan") || c.includes("hantaran");
  }
  if (f.includes("papan bunga") || f.includes("acrylic")) {
    return c.includes("papan bunga");
  }
  if (f.includes("birthday") || f.includes("luxury")) {
    return c.includes("birthday");
  }

  return false;
}

export function migrateCommercialCatalog(products: Product[], version = 0) {
  if (version >= COMMERCIAL_CATALOG_VERSION && products.length === COMMERCIAL_PRODUCTS.length) {
    return products;
  }
  return COMMERCIAL_PRODUCTS;
}

export const FLASH_SALES = [
  { productId: 'catalog-11', originalPrice: 650000 },
  { productId: 'catalog-21', originalPrice: 590000 },
  { productId: 'catalog-41', originalPrice: 690000 },
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
    baby: /Baby Born|baby/, 
    romantic: /Birthday|Romantis/, 
    corporate: /Corporate|Lebaran/, 
    wedding: /Seserahan|Wedding/, 
    well: /Fresh|Parsel|well/ 
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
