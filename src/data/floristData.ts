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
export const COMMERCIAL_CATEGORIES = ['Papan Bunga & Papan Acrylic', 'Hand Bouquet & Standing Flower', 'Parsel & Hampers', 'Seserahan & Hantaran Pernikahan'];
function product(id: string, name: string, category: string, price: number, image: string, description: string, occasions: string[], foodStatus: Product['foodStatus'] = 'non-food'): Product {
  return { id: `commercial-${id}`, name, category, price, image, description: `${description} ${CUSTOM_NOTE}.`, occasions, foodStatus, stock: 10, active: true, tags: ['express'], rating: 5, reviews: 0 };
}
export const COMMERCIAL_PRODUCTS: Product[] = [
  product('board-duka', 'Bunga Papan Duka Cita New Printing', COMMERCIAL_CATEGORIES[0], 750000, board, 'Papan 2m × 1,25m, cetak ucapan, krisan putih dan daun segar. Rangka kayu dengan penyangga; bunga tampil prima 1–2 hari.', ['duka']),
  product('board-opening', 'Bunga Papan Congratulations & Grand Opening', COMMERCIAL_CATEGORIES[0], 950000, board, 'Papan 2m × 1,5m, mawar, krisan dan lettering ucapan pembukaan usaha. Termasuk kaki penyangga.', ['opening','corporate']),
  product('board-wedding', 'Bunga Papan Happy Wedding Romansa Pastel', COMMERCIAL_CATEGORIES[0], 850000, board, 'Papan 2m × 1,25m, bunga pastel, nama mempelai dan ucapan pernikahan; rangka kayu.', ['wedding']),
  product('acrylic-wedding', 'Papan Acrylic Modern Tripod Wedding', COMMERCIAL_CATEGORIES[0], 625000, acrylic, 'Akrilik transparan 60 × 90cm, tripod kayu dan dekor bunga blush. Tulisan nama mempelai personal.', ['wedding']),
  product('acrylic-opening', 'Papan Acrylic Grand Opening Gold Foil', COMMERCIAL_CATEGORIES[0], 695000, acrylic, 'Akrilik 60 × 90cm dengan lettering gold foil, tripod kayu natural dan dekor bunga.', ['opening','corporate']),
  product('board-paper', 'Papan Bunga Kertas Ramah Lingkungan', COMMERCIAL_CATEGORIES[0], 475000, board, 'Papan 1,5 × 1m, bunga kertas dan tulisan personal, rangka kayu; dekor dapat disimpan di ruang kering.', ['opening','wedding']),
  product('sunflower', 'Buket Wisuda Sunflower & Cotton', COMMERCIAL_CATEGORIES[1], 285000, bouquet, '3 sunflower, 5 cotton stems, eucalyptus, wrapping Korea dan pita; tinggi sekitar 45cm, bunga segar 3–5 hari dengan perawatan.', ['wisuda']),
  product('roses', 'Buket Mawar Merah Korea Style (50 tangkai)', COMMERCIAL_CATEGORIES[1], 1250000, bouquet, '50 mawar merah segar dengan wrapping berlapis dan pita burgundy; tinggi sekitar 60cm. Ketahanan 3–5 hari dengan perawatan.', ['romantic']),
  product('lily', 'Buket Lily Casablanca & Hydrangea', COMMERCIAL_CATEGORIES[1], 675000, bouquet, '3 batang lily Casablanca, 2 hydrangea dan eucalyptus, wrapping premium; tinggi sekitar 50cm.', ['romantic','well']),
  product('standing-duka', 'Standing Flower Duka Cita Krisan & Salib', COMMERCIAL_CATEGORIES[1], 1100000, standing, 'Krisan putih, lily dan daun hijau dengan dekor salib sesuai permintaan; standing sekitar 170cm termasuk kaki.', ['duka']),
  product('standing-gold', 'Standing Flower Tripod Besi Elegan Gold', COMMERCIAL_CATEGORIES[1], 950000, standing, 'Lily putih, krisan dan daun segar di tripod besi emas; tinggi total sekitar 160cm, kartu ucapan termasuk.', ['opening','wedding','corporate']),
  product('fruit', 'Parsel Buah Segar Premium', COMMERCIAL_CATEGORIES[2], 425000, fruits, 'Apel, jeruk, pir dan anggur pilihan sekitar 3kg, keranjang rotan dan pita; simpan buah di lemari pendingin.', ['well','corporate'], 'halal'),
  product('eid-mini', 'Hampers Lebaran Mini Berkah', COMMERCIAL_CATEGORIES[2], 450000, eid, '3 toples 250g nastar, putri salju dan kastengel, kurma 200g serta box berpita; ikuti tanggal kedaluwarsa kemasan.', ['corporate'], 'halal'),
  product('eid-crystal', 'Parsel Fitri Zamrud Toples Kristal', COMMERCIAL_CATEGORIES[2], 925000, eid, '4 toples kristal kue kering masing-masing 250g, kurma 250g, kemasan zamrud dan pita emas.', ['corporate'], 'halal'),
  product('juice', 'Celebration Basket Sparkling Juice', COMMERCIAL_CATEGORIES[2], 625000, fruits, 'Sparkling grape juice non-alkohol 750ml, buah pilihan 2kg dan biskuit halal 200g dalam keranjang rotan.', ['romantic','well'], 'halal'),
  product('wine', 'Vintage Wine & European Cheese Selection', COMMERCIAL_CATEGORIES[2], 1650000, wine, 'Wine impor 750ml, keju Eropa 200g dan crackers 150g dalam gift box; mengandung alkohol, non-halal/gourmet.', ['corporate','romantic'], 'non-halal'),
  product('chandon', 'Chandon Sparkling Champagne & Truffles', COMMERCIAL_CATEGORIES[2], 1850000, wine, 'Chandon sparkling wine 750ml dan truffles 200g dalam box premium; mengandung alkohol, non-halal/gourmet.', ['corporate','romantic'], 'non-halal'),
  product('seven-box', 'Set 7 Box Akrilik Bunga Terracotta', COMMERCIAL_CATEGORIES[3], 3500000, wedding, '7 kotak akrilik sekitar 30 × 40cm, bunga terracotta dan pita; isi barang pribadi disediakan pelanggan.', ['wedding']),
  product('five-box', 'Set 5 Box Akrilik Bunga Blush Pink', COMMERCIAL_CATEGORIES[3], 2450000, blush, '5 kotak akrilik sekitar 30 × 40cm, dekor blush pink dan label nama; isi barang pribadi disediakan pelanggan.', ['wedding']),
  product('mahar', "Kotak Mahar Al-Qur'an & Tasbih Kristal", COMMERCIAL_CATEGORIES[3], 1250000, wedding, "Kotak akrilik 30 × 40cm, Al-Qur'an, tasbih kristal dan bunga dekoratif dengan nama mempelai.", ['wedding']),
  product('sage-box', 'Set 5 Box Hantaran Sage & Ivory', COMMERCIAL_CATEGORIES[3], 2250000, blush, '5 baki akrilik 30 × 40cm, bunga ivory, pita sage dan label nama; barang hantaran tidak termasuk.', ['wedding']),
  product('ring', 'Kotak Cincin Akrilik Floral', COMMERCIAL_CATEGORIES[3], 375000, wedding, 'Kotak akrilik 15 × 15cm, bantalan cincin dan dekor bunga mini; cincin tidak termasuk.', ['wedding']),
];
export function migrateCommercialCatalog(products: Product[], version = 0) {
  return version >= 1 ? products : [...products, ...COMMERCIAL_PRODUCTS.filter(p => !products.some(old => old.id === p.id))];
}
export const FLASH_SALES = [
  { productId: 'commercial-sunflower', originalPrice: 339000 },
  { productId: 'commercial-board-paper', originalPrice: 679000 },
  { productId: 'commercial-fruit', originalPrice: 644000 },
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
  { id: 'romantic', label: 'Romantis & Anniv', image: bouquet }, { id: 'baby', label: 'Baby Born', image: blush },
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
