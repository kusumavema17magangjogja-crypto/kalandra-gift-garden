import type { Product } from '@/lib/data';
import board from '@/assets/flower-board.jpg';
import acrylic from '@/assets/acrylic-tripod.jpg';
import bouquet from '@/assets/rose-lily-bouquet.jpg';
import standing from '@/assets/standing-flower.jpg';
import fruits from '@/assets/fruits.jpg';
import eid from '@/assets/lebaran.jpg';
import wine from '@/assets/wine-gourmet.jpg';
import wedding from '@/assets/seserahan.jpg';
import blush from '@/assets/blush-seserahan.jpg';
import sunflower from '@/assets/sunflower-graduation.jpg';
import bloom from '@/assets/chocolate-bloom-box.jpg';
import birthday from '@/assets/birthday.jpg';
import lilac from '@/assets/lilac.jpg';
import ruby from '@/assets/ruby.jpg';
import newborn from '@/assets/newborn.jpg';
import coffee from '@/assets/coffee.jpg';
import macaron from '@/assets/macaron.jpg';
import boardOpening from '@/assets/board-grand-opening.jpg';
import boardWedding from '@/assets/board-wedding-pastel.jpg';
import boardEmerald from '@/assets/board-emerald-gold.jpg';
import acrylicGold from '@/assets/acrylic-gold-opening.jpg';
import boardRustic from '@/assets/board-rustic-paper.jpg';
import standingDuka from '@/assets/standing-acrylic-duka.jpg';
import wreath from '@/assets/wreath-duka.jpg';
import rosesKorean from '@/assets/red-roses-korean.jpg';
import hydrangea from '@/assets/hydrangea-pastel.jpg';
import peony from '@/assets/peony-ranunculus.jpg';
import tulip from '@/assets/tulip-pastel.jpg';
import sunflowerCone from '@/assets/sunflower-cone.jpg';
import purpleRoseBox from '@/assets/purple-rose-box.jpg';
import casablancaVase from '@/assets/casablanca-vase.jpg';
import citrusBasket from '@/assets/citrus-basket.jpg';
import melonCrate from '@/assets/melon-muscat-crate.jpg';
import berryJuice from '@/assets/berry-juice-basket.jpg';
import rubyFruit from '@/assets/ruby-fruit-basket.jpg';
import orchardCider from '@/assets/orchard-cider-crate.jpg';
import berryHoney from '@/assets/berry-honey.jpg';
import pomegranateTea from '@/assets/pomegranate-tea.jpg';
import citrusBamboo from '@/assets/citrus-bamboo.jpg';
import sageCelebration from '@/assets/sage-celebration.jpg';
import sparklingTruffles from '@/assets/sparkling-truffles.jpg';
import wineCheese from '@/assets/wine-cheese-crate.jpg';
import roseBathrobe from '@/assets/rose-bathrobe.jpg';
import praline from '@/assets/praline-liqueur.jpg';
import beerTub from '@/assets/beer-pretzel-tub.jpg';
import eidMini from '@/assets/eid-mini.jpg';
import eidRoyal from '@/assets/eid-royal.jpg';
import datesHoneyTea from '@/assets/dates-honey-tea.jpg';
import maharQuran from '@/assets/mahar-quran.jpg';
import wineLeather from '@/assets/wine-leather-desk.jpg';
import scotchCrystal from '@/assets/scotch-crystal.jpg';

export const RIBBONS = [
  { id: 'emerald', label: 'Emerald Green', className: 'bg-ribbon-emerald' },
  { id: 'gold', label: 'Champagne Gold', className: 'bg-ribbon-gold' },
  { id: 'terracotta', label: 'Soft Terracotta', className: 'bg-ribbon-terracotta' },
  { id: 'burgundy', label: 'Burgundy', className: 'bg-ribbon-burgundy' },
  { id: 'sage', label: 'Sage Green', className: 'bg-ribbon-sage' },
  { id: 'rose-gold', label: 'Rose Gold', className: 'bg-ribbon-rose-gold' },
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
  { id: 'gold', label: 'Elegant Gold Border', className: 'greeting-gold' },
  { id: 'minimal', label: 'Modern Minimalist', className: 'greeting-minimal' },
  { id: 'islamic', label: 'Islamic Geometric', className: 'greeting-islamic' },
] as const;
export const cardTemplateLabel = (id = 'classic') => CARD_TEMPLATES.find(t => t.id === id)?.label ?? CARD_TEMPLATES[0].label;
export const CUSTOM_NOTE = 'Bisa Request Warna/Nuansa Bunga & Tulisan';
export const COMMERCIAL_CATEGORIES = ["Papan Bunga & Papan Acrylic", "Hand Bouquet & Bloom Box", "Fresh & Healthy / Parsel Buah", "Birthday, Anniv & Luxury Hampers", "Lebaran, Seserahan, Baby Born & Corporate"] as const;
export const COMMERCIAL_CATALOG_VERSION = 2;
function product(id: string, name: string, category: string, price: number, image: string, description: string, occasions: string[], foodStatus: Product["foodStatus"] = "non-food"): Product {
  return { id, name, category, price, image, description: `${description}. ${CUSTOM_NOTE}.`, occasions, foodStatus, stock: 10, active: true, tags: ["express"], rating: 5, reviews: 0 };
}
export const COMMERCIAL_PRODUCTS: Product[] = [
  product("catalog-01", "Bunga Papan Duka Cita New Printing (2m x 1.25m)", COMMERCIAL_CATEGORIES[0], 600000, board, "Rangka kayu, ucapan printing rapi, bunga krisan & aster segar. Bisa request nama & warna", ["duka"], "non-food"),
  product("catalog-02", "Bunga Papan Grand Opening Sukses Mulia (2m x 1.25m)", COMMERCIAL_CATEGORIES[0], 650000, boardOpening, "Rangkaian bunga segar keliling dengan ucapan selamat cerah. Bisa custom logo", ["opening", "corporate"], "non-food"),
  product("catalog-03", "Bunga Papan Happy Wedding Romansa Pastel (2m x 1.25m)", COMMERCIAL_CATEGORIES[0], 750000, boardWedding, "Nuansa pastel pink, peach, dan putih dengan hiasan suyok keliling. Bisa request konsep", ["wedding"], "non-food"),
  product("catalog-04", "Bunga Papan Pelantikan Pejabat Emas Zamrud (2m x 1.5m)", COMMERCIAL_CATEGORIES[0], 850000, boardEmerald, "Ukuran jumbo elegan nuansa emas hijau botol dengan ronce melati sintesis", ["opening", "corporate"], "non-food"),
  product("catalog-05", "Papan Acrylic Modern Wedding 60x90cm", COMMERCIAL_CATEGORIES[0], 850000, acrylic, "Akrilik bening tebal 3mm, tripod kayu natural, dekorasi mawar & daun eucalyptus segar", ["wedding"], "non-food"),
  product("catalog-06", "Papan Acrylic Grand Opening Gold Foil", COMMERCIAL_CATEGORIES[0], 950000, acrylicGold, "Cetak UV gold mirror pada akrilik tripod besi dengan bunga artificial & fresh premium", ["opening", "corporate"], "non-food"),
  product("catalog-07", "Bunga Papan Kertas Ramah Lingkungan", COMMERCIAL_CATEGORIES[0], 550000, boardRustic, "Bahan papan daur ulang estetik bernuansa rustik minimalis", ["corporate"], "non-food"),
  product("catalog-08", "Double-Decker Congratulatory Flower Stand (2 Tingkat)", COMMERCIAL_CATEGORIES[0], 1150000, standing, "Standing flower besi 2 susun mawar, lily, dan gerbera", ["opening", "corporate"], "non-food"),
  product("catalog-09", "Standing Flower Modern Tripod Akrilik Duka Cita", COMMERCIAL_CATEGORIES[0], 780000, standingDuka, "Standing akrilik dengan krisan putih, mawar putih, dan pita hitam elegan", ["duka"], "non-food"),
  product("catalog-10", "Wreath Duka Cita Melingkar Anggrek & Lily", COMMERCIAL_CATEGORIES[0], 890000, wreath, "Karangan melingkar simbol keabadian dengan bunga casablanca putih", ["duka"], "non-food"),
  product("catalog-11", "Blush Rose & Lily Hand Bouquet", COMMERCIAL_CATEGORIES[1], 625000, bouquet, "Mawar blush pink, lily casablanca putih wangi, wrap sage green", ["romantic"], "non-food"),
  product("catalog-12", "Everlasting 50 Red Roses Korean Style", COMMERCIAL_CATEGORIES[1], 750000, rosesKorean, "50 tangkai mawar merah segar bungkus gaya Korea matte hitam", ["romantic"], "non-food"),
  product("catalog-13", "Pastel Hydrangea Dream Bouquet", COMMERCIAL_CATEGORIES[1], 480000, hydrangea, "Bunga hortensia biru lembut berpadu baby breath dan gomphrena", ["romantic"], "non-food"),
  product("catalog-14", "Sunflower & Cotton Graduation Special", COMMERCIAL_CATEGORIES[1], 350000, sunflower, "3 tangkai bunga matahari mekar, dried cotton, dan wrap navy", ["wisuda"], "non-food"),
  product("catalog-15", "Blushing Peony & Ranunculus Luxe", COMMERCIAL_CATEGORIES[1], 680000, peony, "Koleksi peony premium dengan sentuhan pita satin champagne", ["romantic"], "non-food"),
  product("catalog-16", "Holland Tulip Pastel Rainbow Wrap", COMMERCIAL_CATEGORIES[1], 820000, tulip, "10 tangkai tulip impor Belanda nuansa gradasi soft pastel", ["romantic"], "non-food"),
  product("catalog-17", "Surprise Bloom Box Drawer with Chocolate", COMMERCIAL_CATEGORIES[1], 550000, bloom, "Kotak bundar beludru bunga segar dengan laci bawah berisi cokelat. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-18", "Single Stem Sunflower Cone Wrap", COMMERCIAL_CATEGORIES[1], 120000, sunflowerCone, "1 tangkai bunga matahari cerah praktis untuk apresiasi kelulusan", ["wisuda"], "non-food"),
  product("catalog-19", "Ecuadorian Dark Purple Rose Velvet Box", COMMERCIAL_CATEGORIES[1], 690000, purpleRoseBox, "Mawar ungu tua Ekuador dalam kotak silinder suede hitam eksklusif", ["romantic"], "non-food"),
  product("catalog-20", "White Casablanca & Blue Hydrangea Table Vase", COMMERCIAL_CATEGORIES[1], 520000, casablancaVase, "Rangkaian bunga segar di dalam vas keramik minimalis siap pajang", ["romantic"], "non-food"),
  product("catalog-21", "Royal Fruit & Bird's Nest Wellness Hamper", COMMERCIAL_CATEGORIES[2], 980000, fruits, "Apel fuji, anggur autumn royal, jeruk sunkist, dan 3 botol sarang burung walet. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-22", "Lekas Sembuh Citrus & Tonic Basket", COMMERCIAL_CATEGORIES[2], 450000, citrusBasket, "Jeruk navel, apel envy, kiwi gold, dan madu murni dalam keranjang rotan. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-23", "Japanese Muskmelon & Shine Muscat Elite Crate", COMMERCIAL_CATEGORIES[2], 1450000, melonCrate, "Melon jepang hidroponik aroma manis dan anggur shine muscat jepang. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-24", "Vitality Cold-Pressed Juice & Berry Basket", COMMERCIAL_CATEGORIES[2], 480000, berryJuice, "Campuran buah berry segar dan jus dingin alami tanpa gula. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-25", "Red Ruby Deluxe Fruit Basket", COMMERCIAL_CATEGORIES[2], 620000, rubyFruit, "Delima merah impor, apel washington, plum hitam, dan buah pir packham. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-26", "Imported Orchard Crate with Sparkling Cider", COMMERCIAL_CATEGORIES[2], 620000, orchardCider, "Aneka buah pir & apel pilihan bersama jus apel berkarbonasi non-alkohol. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-27", "Organic Berry Medley & Manuka Honey Pot", COMMERCIAL_CATEGORIES[2], 750000, berryHoney, "Strawberry korea, blueberry organik, dan madu manuka asli. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-28", "Antioxidant Pomegranate & Pure Elixir", COMMERCIAL_CATEGORIES[2], 480000, pomegranateTea, "Delima segar, jeruk sunkist, dan seduhan teh herbal premium. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-29", "Gourmet Fruit & Wine Pairing Wooden Crate", COMMERCIAL_CATEGORIES[2], 1250000, wine, "Buah pir, anggur red globe, dan sebotol red wine impor. Tanpa label halal", ["well"], "non-halal"),
  product("catalog-30", "Fresh Citrus Boost & Wellness Herbal Tonic", COMMERCIAL_CATEGORIES[2], 390000, citrusBamboo, "Aneka ragam jeruk manis kaya vitamin C dalam wadah anyaman bambu rapi. Makanan/minuman halal", ["well"], "halal"),
  product("catalog-31", "Sage Celebration Basket", COMMERCIAL_CATEGORIES[3], 785000, sageCelebration, "Sparkling juice buah non-alkohol, cokelat artisan, dan bunga kering. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-32", "Peach Rose Anniversary Box", COMMERCIAL_CATEGORIES[3], 650000, birthday, "Buket mawar peach, toples macaron manis, dan lilin aromaterapi santal. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-33", "Pastel Lilac Self-Care Hamper", COMMERCIAL_CATEGORIES[3], 385000, lilac, "Sabun organik botani, teh chamomile bunga, dan reed diffuser lavender. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-34", "Ruby Romance Velvet Box & Chocolates", COMMERCIAL_CATEGORIES[3], 740000, ruby, "Kotak beludru merah isi praline cokelat Belgia dan mawar merah. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-35", "Chandon Sparkling Wine & Luxury Truffles", COMMERCIAL_CATEGORIES[3], 1150000, sparklingTruffles, "Sparkling wine premium, truffle cokelat eropa, dan hiasan pita sage. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-36", "Vintage Red Wine & European Artisan Cheese Crate", COMMERCIAL_CATEGORIES[3], 1450000, wineCheese, "Cabernet sauvignon vintage, keju gouda, dan crackers asin. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-37", "Moët Rosé & Silk Bathrobe Pamper Box", COMMERCIAL_CATEGORIES[3], 1850000, roseBathrobe, "Champagne Moët Rosé, jubah sutra tidur, dan bath salt mawar. Tanpa label halal", ["romantic"], "non-food"),
  product("catalog-38", "Artisan Belgian Praline & Liqueur Selection", COMMERCIAL_CATEGORIES[3], 680000, praline, "Koleksi cokelat truffle dengan isian liqueur khas Belgia. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-39", "Craft Beer & Savory Pretzels Celebration Tub", COMMERCIAL_CATEGORIES[3], 550000, beerTub, "Set beer kaleng impor dan camilan pretzel renyah dalam ember es dekoratif. Tanpa label halal", ["romantic"], "non-halal"),
  product("catalog-40", "Sweet Blossom Macaron Tower", COMMERCIAL_CATEGORIES[3], 420000, macaron, "Menara 15 pcs macaron aneka rasa dipadukan bunga mawar segar di alasnya. Makanan/minuman halal", ["romantic"], "halal"),
  product("catalog-41", "Parsel Fitri Zamrud", COMMERCIAL_CATEGORIES[4], 925000, eid, "Kurma safawi, nastar wijsman, kastengel, dan putri salju dalam hardbox hijau emas. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-42", "Hampers Lebaran Mini Berkah", COMMERCIAL_CATEGORIES[4], 450000, eidMini, "3 toples kue kering tradisional dan kurma pilihan untuk silaturahmi kerabat. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-43", "Emerald Eid Royal Feast", COMMERCIAL_CATEGORIES[4], 1150000, eidRoyal, "4 toples kaca kristal kue premium, sajadah beludru turki, dan kartu ucapan raya. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-44", "Safawi Date, Raw Honey & Spiced Tea Box", COMMERCIAL_CATEGORIES[4], 620000, datesHoneyTea, "Kurma kualitas super, madu randu mentah, dan racikan teh rempah alami. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-45", "Seserahan Akrilik Gold 7 Box (Bunga Terracotta)", COMMERCIAL_CATEGORIES[4], 3500000, wedding, "Set 7 kotak akrilik lis emas lengkap dekorasi bunga dan pita terracotta. Tanpa label halal", ["wedding"], "non-food"),
  product("catalog-46", "Hantaran Mahar Al-Qur'an & Tasbih Kristal", COMMERCIAL_CATEGORIES[4], 1250000, maharQuran, "Box kayu akrilik isi Al-Qur'an mushaf cover cantik dan tasbih kristal. Tanpa label halal", ["wedding"], "non-food"),
  product("catalog-47", "Little Bunny Newborn Organic Cotton Set", COMMERCIAL_CATEGORIES[4], 595000, newborn, "Pakaian bayi katun organik, boneka rajut kelinci, teether kayu, selimut lembut. Tanpa label halal", ["baby"], "non-food"),
  product("catalog-48", "Executive Coffee Set", COMMERCIAL_CATEGORIES[4], 795000, coffee, "Kopi single-origin arabika, mug keramik handmade, dan tatakan kayu jati. Makanan/minuman halal", ["corporate"], "halal"),
  product("catalog-49", "Executive Bordeaux Wine & Leather Desk Set", COMMERCIAL_CATEGORIES[4], 1650000, wineLeather, "Red wine Bordeaux Prancis, tempat kartu kulit asli, dan buku agenda eksekutif. Tanpa label halal", ["corporate"], "non-halal"),
  product("catalog-50", "Single Malt Scotch & Crystal Glass VIP Set", COMMERCIAL_CATEGORIES[4], 2400000, scotchCrystal, "Scotch whisky premium dalam kotak kayu eksklusif beserta 2 gelas kristal. Tanpa label halal", ["corporate"], "non-halal"),
];
export function migrateCommercialCatalog(products: Product[], version = 0) {
  if (version >= COMMERCIAL_CATALOG_VERSION) return products;
  // v3: refresh bundled (non-uploaded) photos of catalog items to their unique description-matched images.
  const refreshed = version < 3
    ? products.map(old => {
        const fresh = COMMERCIAL_PRODUCTS.find(p => p.id === old.id);
        if (!fresh || old.image?.startsWith("data:") || old.image?.startsWith("http")) return old;
        return { ...old, image: fresh.image };
      })
    : products;
  const additions = version < 2 ? COMMERCIAL_PRODUCTS.filter(p => !refreshed.some(old => old.id === p.id || old.name === p.name)) : [];
  return [...refreshed, ...additions];
}
export const FLASH_SALES = [
  { productId: 'catalog-14', originalPrice: 417000 },
  { productId: 'catalog-07', originalPrice: 786000 },
  { productId: 'catalog-22', originalPrice: 682000 },
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
