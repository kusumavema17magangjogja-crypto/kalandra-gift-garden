import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ShoppingBag,
  Lock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Star,
  Calendar,
  BookOpen,
  Instagram,
  Phone,
  ArrowRight,
  Gift,
  Truck,
  Camera,
} from "lucide-react";

// --- DATA PRODUK ---
interface Product {
  id: string;
  name: string;
  category: string;
  moment: string;
  price: number;
  originalPrice?: number;
  badge: string;
  halal: boolean;
  isFlashSale?: boolean;
  description: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Sage Celebration Basket",
    category: "Birthday & Anniv",
    moment: "Romantis & Anniv",
    price: 785000,
    originalPrice: 920000,
    badge: "Same-Day",
    halal: true,
    isFlashSale: true,
    description:
      "Keranjang rotan berisi sparkling juice non-alkohol, cokelat artisan, dan bunga kering premium.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p2",
    name: "Peach Rose Anniversary Box",
    category: "Birthday & Anniv",
    moment: "Romantis & Anniv",
    price: 650000,
    originalPrice: 750000,
    badge: "Slot Terbatas",
    halal: true,
    isFlashSale: true,
    description:
      "Buket mawar peach segar, macaron Prancis, dan lilin aromaterapi santal dalam hardbox eksklusif.",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p3",
    name: "Parsel Fitri Zamrud",
    category: "Lebaran & Hari Raya",
    moment: "Corporate Care",
    price: 925000,
    badge: "Ready Stock",
    halal: true,
    description:
      "Kurma Ajwa pilihan, kue nastar wisman, putri salju, kastengel dalam box hijau zamrud aksen emas.",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p4",
    name: "Hampers Lebaran Mini Berkah",
    category: "Lebaran & Hari Raya",
    moment: "Get Well Soon",
    price: 450000,
    originalPrice: 525000,
    badge: "Same-Day",
    halal: true,
    isFlashSale: true,
    description:
      "Paket hemat 3 toples kue kering premium & kurma Tunisia untuk kerabat dan kolega.",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p5",
    name: "Seserahan Akrilik Gold 7 Box",
    category: "Seserahan & Hantaran",
    moment: "Wedding",
    price: 3500000,
    badge: "Slot Terbatas",
    halal: true,
    description:
      "Set 7 kotak akrilik bingkai emas elegan, dekor bunga artifisial & pita terracotta-sage.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p6",
    name: "Hantaran Mahar Al-Qur'an",
    category: "Seserahan & Hantaran",
    moment: "Wedding",
    price: 1250000,
    badge: "Slot Terbatas",
    halal: true,
    description:
      "Box mahar eksklusif dengan Al-Qur'an cover beludru, tasbih mutiara, dan rangkaian bunga cantik.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p7",
    name: "Little Bunny Newborn Set",
    category: "Baby Born",
    moment: "Baby Born",
    price: 595000,
    originalPrice: 680000,
    badge: "Same-Day",
    halal: true,
    isFlashSale: true,
    description:
      "Baju bayi katun organik, boneka kelinci rajut, teether kayu aman, dan selimut muslin lembut.",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p8",
    name: "Executive Green Gift Box",
    category: "Corporate Parcel",
    moment: "Grand Opening",
    price: 1150000,
    badge: "Same-Day",
    halal: true,
    description:
      "Kopi signature nusantara, teh hijau artisan, notebook kulit vegan, dan pulpen logam emas.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
];

const HERO_SLIDES = [
  {
    tag: "KALANDRA • HAMPERS & SESERAHAN",
    title: "Rangkaian Kasih & Keanggunan di Setiap Momen Berharga",
    subtitle:
      "Dirangkai tangan, lengkap dengan kartu ucapan personal, dan dikirim fotonya sebelum sampai ke orang tersayang.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "SPESIAL PERNIKAHAN • SEWA & BELI PUTUS",
    title: "Seserahan Akrilik & Hantaran Mahar Mewah",
    subtitle:
      "Bebas request palet warna tema pernikahanmu. Terima beres mulai dari penataan hingga serah terima.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "CORPORATE & HARI RAYA • 100% HALAL",
    title: "Kirim Apresiasi Berkelas untuk Klien & Keluarga",
    subtitle:
      "Custom logo perusahaan, pengiriman instan Jabodetabek, serta packing kayu aman antar kota.",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1600&q=80",
  },
];

const MOMENTS = [
  { name: "Duka Cita", count: "3 produk", emoji: "🤍" },
  { name: "Grand Opening", count: "4 produk", emoji: "🎊" },
  { name: "Wedding", count: "6 produk", emoji: "💍" },
  { name: "Wisuda", count: "2 produk", emoji: "🎓" },
  { name: "Romantis & Anniv", count: "18 produk", emoji: "💐" },
  { name: "Baby Born", count: "8 produk", emoji: "🧸" },
  { name: "Get Well Soon", count: "12 produk", emoji: "🍊" },
  { name: "Corporate Care", count: "12 produk", emoji: "💼" },
];

const RIBBON_COLORS = [
  { name: "Emerald Green", hex: "#14452F" },
  { name: "Champagne Gold", hex: "#D4AF37" },
  { name: "Soft Terracotta", hex: "#C87A5B" },
  { name: "Burgundy", hex: "#6E1E2A" },
];

const ADD_ONS = [
  { id: "a1", name: "Wooden Acrylic Topper", price: 25000 },
  { id: "a2", name: "Artisan Chocolate Box", price: 45000 },
  { id: "a3", name: "Spunbond Bag Premium", price: 15000 },
];

const ARTICLES = [
  {
    title: "5 Tips Memilih Warna Pita & Tema Seserahan Agar Senada dengan Dekorasi",
    date: "18 Nov 2026",
    readTime: "3 mnt baca",
    excerpt:
      "Perpaduan sage green dan terracotta masih menjadi favorit pengantin tahun ini karena memberi kesan hangat sekaligus mewah.",
  },
  {
    title: "Etika Mengirim Hampers Korporat & Klien VIP Saat Momen Spesial",
    date: "12 Nov 2026",
    readTime: "4 mnt baca",
    excerpt:
      "Pastikan produk 100% halal tanpa alkohol serta sertakan kartu ucapan personal yang ditulis dengan sopan.",
  },
  {
    title: "Ide Isi Hampers Baby Born yang Pasti Terpakai oleh Ibu Baru",
    date: "05 Nov 2026",
    readTime: "3 mnt baca",
    excerpt:
      "Pilih bahan katun organik bersertifikat dan perlengkapan kayu natural yang aman untuk kulit sensitif bayi.",
  },
];

interface CartItem {
  key: string;
  product: Product;
  to: string;
  from: string;
  message: string;
  ribbon: string;
  deliveryDate: string;
  qty: number;
  selectedAddons: string[];
  unitTotal: number;
}

const formatRupiah = (num: number) =>
  "Rp " + num.toLocaleString("id-ID");

export default function Index() {
  // --- STATE ---
  const [city, setCity] = useState("Jabodetabek");
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedMoment, setSelectedMoment] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Flash Sale Timer (detik)
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 42 * 60 + 19);

  // Modal Pemesanan
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [cardTo, setCardTo] = useState("");
  const [cardFrom, setCardFrom] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [ribbonColor, setRibbonColor] = useState("Emerald Green");
  const [deliveryDate, setDeliveryDate] = useState("2026-11-22");
  const [orderQty, setOrderQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Keranjang
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Admin Login Mini Modal (supaya tidak ganggu halaman utama)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Countdown Flash Sale
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  // Filter Produk
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        selectedCategory === "Semua" || p.category === selectedCategory;
      const matchMom =
        selectedMoment === "Semua" || p.moment === selectedMoment;
      const q = activeSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchMom && matchSearch;
    });
  }, [selectedCategory, selectedMoment, activeSearch]);

  const flashSaleProducts = PRODUCTS.filter((p) => p.isFlashSale);

  // Buka Pop-up Pemesanan
  const openOrderModal = (product: Product) => {
    setOrderProduct(product);
    setCardTo("");
    setCardFrom("");
    setCardMessage("");
    setRibbonColor("Emerald Green");
    setOrderQty(1);
    setSelectedAddons([]);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentModalUnitPrice = useMemo(() => {
    if (!orderProduct) return 0;
    const addonsSum = ADD_ONS.filter((a) =>
      selectedAddons.includes(a.id)
    ).reduce((acc, cur) => acc + cur.price, 0);
    return orderProduct.price + addonsSum;
  }, [orderProduct, selectedAddons]);

  const handleAddToCart = () => {
    if (!orderProduct) return;
    const addonNames = ADD_ONS.filter((a) =>
      selectedAddons.includes(a.id)
    ).map((a) => a.name);

    const newItem: CartItem = {
      key: `${orderProduct.id}-${Date.now()}`,
      product: orderProduct,
      to: cardTo || "Penerima",
      from: cardFrom || "Pengirim",
      message: cardMessage || "Semoga berkenan dan membawa kebahagiaan.",
      ribbon: ribbonColor,
      deliveryDate,
      qty: orderQty,
      selectedAddons: addonNames,
      unitTotal: currentModalUnitPrice,
    };

    setCart((prev) => [...prev, newItem]);
    setOrderProduct(null);
    setIsCartOpen(true);
  };

  const handleDirectWhatsApp = () => {
    if (!orderProduct) return;
    const addonNames = ADD_ONS.filter((a) =>
      selectedAddons.includes(a.id)
    ).map((a) => a.name);
    const total = currentModalUnitPrice * orderQty;
    const text = `Halo Kalandra Hampers! Saya mau pesan:\n• Produk: *${orderProduct.name}* (${orderQty}x)\n• Area: ${city}\n• Tgl Kirim: ${deliveryDate}\n• Warna Pita: ${ribbonColor}\n• Add-ons: ${addonNames.length ? addonNames.join(", ") : "-"}\n• Kartu Ucapan -> Untuk: ${cardTo || "-"} | Dari: ${cardFrom || "-"}\n• Pesan: "${cardMessage || "-"}"\n• Total Estimasi: *${formatRupiah(total)}*`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleCartCheckoutWA = () => {
    if (cart.length === 0) return;
    const lines = cart.map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.qty}x) - Pita: ${item.ribbon}, Tgl: ${item.deliveryDate}, Untuk: ${item.to} (${formatRupiah(item.unitTotal * item.qty)})`
    );
    const grandTotal = cart.reduce(
      (sum, item) => sum + item.unitTotal * item.qty,
      0
    );
    const text = `Halo Kalandra Hampers! Saya ingin checkout keranjang:\n\n${lines.join("\n")}\n\nTotal: *${formatRupiah(grandTotal)}*\nArea Pengiriman: ${city}`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "kalandra123") {
      setAdminError("");
      setIsAdminModalOpen(false);
      window.location.href = "/admin";
    } else {
      setAdminError("Username atau password admin salah.");
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.unitTotal * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C2B22] font-sans relative overflow-x-hidden">
      {/* STYLE ANIMASI KELOPAK BUNGA & MARQUEE */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes fallPetal {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          15% { opacity: 0.75; }
          85% { opacity: 0.6; }
          100% {
            transform: translateY(105vh) translateX(45px) rotate(360deg);
            opacity: 0;
          }
        }
        .petal {
          position: fixed;
          top: -5%;
          pointer-events: none;
          z-index: 40;
          animation: fallPetal linear infinite;
        }
      `}</style>

      {/* EFEK KELOPAK BUNGA BERJATUHAN */}
      {[
        { left: "6%", dur: "14s", delay: "0s", size: 16, color: "#E8B4B8" },
        { left: "22%", dur: "18s", delay: "3s", size: 13, color: "#D4A373" },
        { left: "41%", dur: "15s", delay: "6s", size: 18, color: "#F2C6C2" },
        { left: "63%", dur: "20s", delay: "1s", size: 14, color: "#E6CCB2" },
        { left: "81%", dur: "16s", delay: "4s", size: 17, color: "#E8B4B8" },
        { left: "93%", dur: "19s", delay: "7s", size: 12, color: "#DDB892" },
      ].map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill={p.color}
          >
            <path d="M12 2C8 6 4 10 4 15a8 8 0 0016 0c0-5-4-9-8-13z" />
          </svg>
        </div>
      ))}

      {/* 1. HEADER BERJALAN (RUNNING TEXT TOP BAR) */}
      <div className="bg-[#14452F] text-[#FAF6F0] text-xs py-2 px-4 flex items-center justify-between gap-4 border-b border-[#225C41]">
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee gap-10 whitespace-nowrap">
            <span>🎁 Free Custom Greeting Card & Pita Eksklusif</span>
            <span>🚚 Pengiriman Instan & Antar Kota (Packing Kayu Aman)</span>
            <span>📸 Kirim Foto Rangkaian Sebelum Diantar</span>
            <span>🕌 Jaminan 100% Produk Halal & Tanpa Alkohol</span>
            <span>🎁 Free Custom Greeting Card & Pita Eksklusif</span>
            <span>🚚 Pengiriman Instan & Antar Kota (Packing Kayu Aman)</span>
            <span>📸 Kirim Foto Rangkaian Sebelum Diantar</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px]">
          <div className="flex items-center gap-1 bg-[#1D593E] px-2.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="Jabodetabek" className="text-black">
                Jabodetabek
              </option>
              <option value="Bandung" className="text-black">
                Bandung
              </option>
              <option value="Surabaya" className="text-black">
                Surabaya
              </option>
              <option value="Luar Pulau" className="text-black">
                Luar Pulau
              </option>
            </select>
          </div>
          <a
            href="#cara-pesan"
            className="hover:text-[#E5C158] transition flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" /> Cara Pesan
          </a>
        </div>
      </div>

      {/* 2. NAVBAR UTAMA */}
      <header className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DDD0] px-4 md:px-10 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#14452F] text-[#FAF6F0] flex items-center justify-center shadow-sm">
              <Gift className="w-5 h-5 text-[#E5C158]" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#14452F] block leading-none">
                Kalandra
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#6B705C] uppercase font-medium">
                Hampers & Seserahan
              </span>
            </div>
          </a>

          {/* Menu Tengah */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#2F3E35]">
            <a href="#flash-sale" className="hover:text-[#14452F] transition">
              Flash Sale
            </a>
            <a href="#katalog" className="hover:text-[#14452F] transition">
              Koleksi Hampers
            </a>
            <a href="#seserahan" className="hover:text-[#14452F] transition">
              Seserahan & Mahar
            </a>
            <a href="#galeri" className="hover:text-[#14452F] transition">
              Galeri Bukti Jadi
            </a>
            <a href="#artikel" className="hover:text-[#14452F] transition">
              Artikel
            </a>
          </nav>

          {/* Pencarian + Tombol Kaca Pembesar + Login Admin Kecil + Keranjang */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Box dengan Tombol Kaca Pembesar di sampingnya */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveSearch(searchInput);
                document
                  .getElementById("katalog")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center bg-white border border-[#D8CFC0] rounded-full pl-3.5 pr-1 py-1 shadow-2xs focus-within:border-[#14452F]"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setActiveSearch(e.target.value);
                }}
                placeholder="Cari hampers..."
                className="text-xs md:text-sm bg-transparent focus:outline-none w-28 sm:w-44 md:w-52 text-[#1C2B22]"
              />
              <button
                type="submit"
                title="Cari Produk"
                className="w-7 h-7 rounded-full bg-[#14452F] text-white flex items-center justify-center hover:bg-[#1D5B3F] transition cursor-pointer shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Tombol Login Admin Kecil */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title="Login Admin Toko"
              className="flex items-center gap-1 text-[11px] font-medium text-[#5C665E] hover:text-[#14452F] bg-white border border-[#DDD4C7] px-2.5 py-1.5 rounded-full transition cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Tombol Keranjang */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#14452F] text-white hover:bg-[#1C593D] transition cursor-pointer shadow-xs"
              title="Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C87A5B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF6F0]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SLIDER */}
      <section className="relative h-[470px] md:h-[530px] overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === currentSlide
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102A1E]/85 via-[#102A1E]/60 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-10 flex flex-col justify-center">
              <span className="text-[11px] md:text-xs tracking-[0.22em] text-[#E5C158] font-semibold uppercase mb-3">
                {slide.tag}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold max-w-2xl leading-tight mb-4">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base text-[#E8ECE9] max-w-xl mb-7 leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Pill Filter Cepat di Hero */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Birthday & Anniv",
                  "Lebaran & Hari Raya",
                  "Seserahan & Hantaran",
                  "Baby Born",
                  "Corporate Parcel",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      document
                        .getElementById("katalog")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-white/15 hover:bg-[#14452F] backdrop-blur-md text-white border border-white/25 text-xs px-4 py-2 rounded-full transition cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Tombol Navigasi Slider */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? "w-7 bg-[#E5C158]" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE SECTION */}
      <section
        id="flash-sale"
        className="max-w-7xl mx-auto px-4 md:px-10 pt-12 pb-6"
      >
        <div className="bg-gradient-to-r from-[#14452F] to-[#1E5C40] rounded-3xl p-6 md:p-8 text-white shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" /> Penawaran Terbatas Hari Ini
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                Flash Sale Rangkaian Pilihan
              </h2>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-2.5 bg-black/25 px-4 py-2.5 rounded-2xl border border-white/15 self-start">
              <Clock className="w-4 h-4 text-[#E5C158]" />
              <span className="text-xs text-white/80">Berakhir dalam:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-sm">
                <span className="bg-[#C87A5B] px-2 py-0.5 rounded">{hours}</span>
                <span>:</span>
                <span className="bg-[#C87A5B] px-2 py-0.5 rounded">
                  {minutes}
                </span>
                <span>:</span>
                <span className="bg-[#C87A5B] px-2 py-0.5 rounded">
                  {seconds}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flashSaleProducts.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF6F0] text-[#1C2B22] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#C87A5B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      HEMAT{" "}
                      {item.originalPrice
                        ? Math.round(
                            ((item.originalPrice - item.price) /
                              item.originalPrice) *
                              100
                          )
                        : 15}
                      %
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-base mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-[#14452F] text-base">
                        {formatRupiah(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => openOrderModal(item)}
                    className="w-full bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-medium py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Ambil Promo & Kustomisasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BELANJA PER MOMEN */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F]">
            Belanja per Momen
          </h2>
          {selectedMoment !== "Semua" && (
            <button
              onClick={() => setSelectedMoment("Semua")}
              className="text-xs text-[#C87A5B] font-semibold underline cursor-pointer"
            >
              Reset Momen ({selectedMoment})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {MOMENTS.map((m) => {
            const active = selectedMoment === m.name;
            return (
              <button
                key={m.name}
                onClick={() => {
                  setSelectedMoment(active ? "Semua" : m.name);
                  document
                    .getElementById("katalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                  active
                    ? "bg-[#14452F] text-white border-[#14452F] shadow-sm"
                    : "bg-white hover:border-[#14452F] border-[#E5DDD0]"
                }`}
              >
                <div className="text-2xl mb-1.5">{m.emoji}</div>
                <div className="text-xs font-semibold leading-snug">
                  {m.name}
                </div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    active ? "text-white/75" : "text-gray-400"
                  }`}
                >
                  {m.count}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. KATALOG LANGSUNG & FILTER */}
      <section id="katalog" className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C87A5B] font-semibold">
              Koleksi Terkurasi
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F]">
              Katalog Hampers & Seserahan
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              "Semua",
              "Birthday & Anniv",
              "Lebaran & Hari Raya",
              "Seserahan & Hantaran",
              "Baby Born",
              "Corporate Parcel",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-full border transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#14452F] text-white border-[#14452F]"
                    : "bg-white text-[#2F3E35] border-[#DCD3C6] hover:border-[#14452F]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DDD0]">
            <p className="text-gray-500 mb-3">
              Produk tidak ditemukan untuk filter/pencarian saat ini.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Semua");
                setSelectedMoment("Semua");
                setSearchInput("");
                setActiveSearch("");
              }}
              className="bg-[#14452F] text-white text-xs px-5 py-2.5 rounded-full cursor-pointer"
            >
              Tampilkan Semua Produk
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#E6DEC8] overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-[#F2ECE1]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1C2B22] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        product.badge === "Slot Terbatas"
                          ? "bg-[#C87A5B]"
                          : "bg-[#14452F]"
                      }`}
                    >
                      {product.badge}
                    </span>
                    {product.halal && (
                      <span className="absolute bottom-3 left-3 bg-[#14452F]/90 text-[#E5C158] text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        حلال • 100% Halal
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-[#1C2B22] mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#5C665E] leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="font-bold text-lg text-[#14452F]">
                      {formatRupiah(product.price)}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    onClick={() => openOrderModal(product)}
                    className="w-full bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold py-3 rounded-xl transition cursor-pointer"
                  >
                    Kustomisasi & Pesan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. LAYANAN SPESIAL SESERAHAN & HANTARAN */}
      <section
        id="seserahan"
        className="max-w-7xl mx-auto px-4 md:px-10 py-10"
      >
        <div className="bg-white rounded-3xl border border-[#E5DDD0] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80"
              alt="Seserahan Pernikahan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <span className="text-xs tracking-[0.2em] text-[#C87A5B] font-bold uppercase mb-2">
              Layanan Spesial
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#14452F] mb-6">
              Seserahan & Hantaran Pernikahan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl border border-[#E5DDD0] bg-[#FAF6F0]">
                <h3 className="font-serif font-semibold text-base mb-1">
                  Sewa Baki & Kotak Akrilik
                </h3>
                <p className="text-xs text-[#C87A5B] font-semibold mb-3">
                  Mulai Rp 1.500.000
                </p>
                <ul className="text-xs space-y-1.5 text-[#3D4A42]">
                  <li>✓ 7–11 kotak akrilik gold</li>
                  <li>✓ Dekor bunga & pita</li>
                  <li>✓ Dikembalikan H+3</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#14452F] text-white">
                <h3 className="font-serif font-semibold text-base mb-1">
                  Full Package Beli Putus
                </h3>
                <p className="text-xs text-[#E5C158] font-semibold mb-3">
                  Mulai Rp 3.500.000
                </p>
                <ul className="text-xs space-y-1.5 text-white/90">
                  <li>✓ Kotak jadi milik Anda</li>
                  <li>✓ Isi barang + dekor</li>
                  <li>✓ Free konsultasi tema</li>
                </ul>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Kalandra,%20saya%20mau%20konsultasi%20paket%20Seserahan%20Pernikahan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold px-6 py-3.5 rounded-xl transition self-start"
            >
              <MessageCircle className="w-4 h-4" /> Konsultasi Seserahan via WA
            </a>
          </div>
        </div>
      </section>

      {/* 8. TUTORIAL CARA PEMESANAN */}
      <section id="cara-pesan" className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#C87A5B] font-bold">
            Panduan Praktis
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F] mt-1">
            4 Langkah Mudah Memesan di Kalandra
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: "01",
              title: "Pilih Produk & Momen",
              desc: "Tanpa perlu login! Langsung pilih hampers atau seserahan sesuai acara Anda.",
              icon: Gift,
            },
            {
              step: "02",
              title: "Kustomisasi Kartu & Pita",
              desc: "Tulis nama penerima, pengirim, ucapan personal, serta pilih warna pita favorit.",
              icon: Sparkles,
            },
            {
              step: "03",
              title: "Foto Bukti Sebelum Kirim",
              desc: "Tim kami merangkai pesanan dan mengirimkan foto hasil jadi ke WhatsApp Anda.",
              icon: Camera,
            },
            {
              step: "04",
              title: "Pengiriman Aman Terjadwal",
              desc: "Diantar kurir instan khusus atau packing kayu bergaransi sampai ke tujuan.",
              icon: Truck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 rounded-3xl border border-[#E5DDD0] relative"
              >
                <span className="text-3xl font-serif font-bold text-[#E5DDD0] absolute top-5 right-6">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#14452F]/10 text-[#14452F] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-base mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C665E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. GALERI BUKTI JADI, TESTIMONI & JAMINAN HALAL */}
      <section id="galeri" className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="text-center mb-8">
          <span className="text-xs tracking-widest text-[#C87A5B] font-bold uppercase">
            Galeri Bukti Jadi
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F] mt-1">
            Dikirim dengan Cinta, Didokumentasikan
          </h2>
          <p className="text-xs text-[#5C665E] mt-1.5 flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <strong>4.9/5</strong> dari 1.200+ ulasan Google & Instagram
          </p>
        </div>

        {/* Testimoni Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            {
              quote:
                "Rangkaiannya cantik banget, dikirim foto dulu sebelum diantar. Ibu saya terharu!",
              author: "Maya R. via Google",
            },
            {
              quote:
                "Seserahan sesuai tema warna sage-terracotta. Rapi & tepat waktu.",
              author: "Andre K. via Instagram",
            },
            {
              quote:
                "Parsel Lebaran untuk 50 klien, semua sampai mulus antar kota. Recommended.",
              author: "Lina S. via Google",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-[#E5DDD0] shadow-2xs"
            >
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="font-serif italic text-sm text-[#1C2B22] mb-3">
                "{t.quote}"
              </p>
              <span className="text-xs text-[#6B705C] font-medium">
                — {t.author}
              </span>
            </div>
          ))}
        </div>

        {/* Banner Jaminan 100% Halal */}
        <div className="bg-[#F3ECE0] border border-[#DFD4C0] rounded-3xl p-8 text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#14452F] text-[#E5C158] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#14452F] mb-2">
            Jaminan 100% Halal & Tanpa Alkohol
          </h3>
          <p className="text-xs md:text-sm text-[#4A554E] leading-relaxed">
            Semua parsel & makanan dari Kalandra terkurasi aman, tanpa produk
            non-halal — bebas liquor, wine, dan bahan terlarang — demi
            kenyamanan & berkah ibadah Anda.
          </p>
        </div>
      </section>

      {/* 10. ARTIKEL & INSPIRASI */}
      <section id="artikel" className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C87A5B] font-bold">
              Jurnal Kalandra
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F]">
              Artikel & Tips Merangkai Momen
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art, idx) => (
            <article
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E5DDD0] flex flex-col justify-between hover:border-[#14452F] transition"
            >
              <div>
                <div className="flex items-center gap-3 text-[11px] text-[#6B705C] mb-2.5">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C2B22] mb-2.5 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#5C665E] leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#14452F]">
                Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* 11. FOOTER LENGKAP */}
      <footer className="bg-[#14452F] text-[#FAF6F0] mt-12 pt-14 pb-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/15">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#E5C158]" />
              </div>
              <span className="font-serif text-xl font-bold">Kalandra</span>
            </div>
            <p className="text-xs text-white/75 leading-relaxed mb-4">
              Spesialis hampers eksklusif, parsel hari raya 100% halal, dan
              seserahan pernikahan dengan sentuhan personal.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm text-[#E5C158] mb-3">
              Kategori Populer
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <a href="#katalog" className="hover:text-white">
                  Birthday & Anniversary
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white">
                  Parsel Lebaran & Hari Raya
                </a>
              </li>
              <li>
                <a href="#seserahan" className="hover:text-white">
                  Seserahan Akrilik & Mahar
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white">
                  Corporate & VIP Gift
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm text-[#E5C158] mb-3">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <a href="#cara-pesan" className="hover:text-white">
                  Cara Pemesanan
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white">
                  Galeri Bukti Pengiriman
                </a>
              </li>
              <li>
                <a href="#artikel" className="hover:text-white">
                  Tips & Artikel
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="hover:text-white cursor-pointer"
                >
                  Portal Admin
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm text-[#E5C158] mb-3">
              Workshop & Pengiriman
            </h4>
            <p className="text-xs text-white/80 leading-relaxed mb-2">
              Buka Setiap Hari: 08.00 – 20.00 WIB
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              Same-Day Delivery untuk area Jabodetabek, Bandung & Surabaya.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-2">
          <span>© 2026 Kalandra Hampers & Seserahan. All rights reserved.</span>
          <span>100% Halal Curated Gifts</span>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Kalandra,%20saya%20mau%20tanya%20stok%20dan%20ongkir"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-30 bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 border border-white/20"
      >
        <MessageCircle className="w-4 h-4 text-[#E5C158]" />
        Tanya Stok & Ongkir
      </a>

      {/* =========================================================
          POP-UP PEMESANAN LENGKAP + LIVE PREVIEW KARTU UCAPAN
         ========================================================= */}
      {orderProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF6F0] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#DFD4C0] my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5DDD0]">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#14452F]">
                  {orderProduct.name}
                </h3>
                <p className="text-xs text-[#6B705C]">
                  {orderProduct.category} • {formatRupiah(orderProduct.price)}
                </p>
              </div>
              <button
                onClick={() => setOrderProduct(null)}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
              {/* Kolom Kiri: Form Kustomisasi */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Untuk (To)
                    </label>
                    <input
                      type="text"
                      value={cardTo}
                      onChange={(e) => setCardTo(e.target.value)}
                      placeholder="Ibu Ratna"
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Dari (From)
                    </label>
                    <input
                      type="text"
                      value={cardFrom}
                      onChange={(e) => setCardFrom(e.target.value)}
                      placeholder="Sari & Keluarga"
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14452F]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="font-semibold">Pesan Kartu Ucapan</label>
                    <span className="text-gray-400">
                      {cardMessage.length}/200
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Selamat ulang tahun, semoga sehat dan bahagia selalu..."
                    className="w-full bg-white border border-[#D8CFC0] rounded-xl p-3 text-xs focus:outline-none focus:border-[#14452F]"
                  />
                </div>

                {/* Warna Pita */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Warna Pita
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RIBBON_COLORS.map((r) => (
                      <button
                        type="button"
                        key={r.name}
                        onClick={() => setRibbonColor(r.name)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer ${
                          ribbonColor === r.name
                            ? "border-[#14452F] bg-white font-semibold shadow-2xs"
                            : "border-[#E0D7C8] bg-white/60"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: r.hex }}
                        />
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tanggal & Jumlah */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Tanggal Pengiriman
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Jumlah
                    </label>
                    <div className="flex items-center bg-white border border-[#D8CFC0] rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOrderQty((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="flex-1 text-center text-xs font-bold">
                        {orderQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setOrderQty((q) => q + 1)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Add-ons Tambahan
                  </label>
                  <div className="space-y-2">
                    {ADD_ONS.map((addon) => {
                      const checked = selectedAddons.includes(addon.id);
                      return (
                        <button
                          type="button"
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs cursor-pointer ${
                            checked
                              ? "border-[#14452F] bg-[#14452F]/5 font-medium"
                              : "border-[#E0D7C8] bg-white"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                checked ? "text-[#14452F]" : "text-gray-300"
                              }`}
                            />
                            {addon.name}
                          </span>
                          <span className="text-[#14452F] font-semibold">
                            +{formatRupiah(addon.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Pratinjau Kartu Ucapan + Checkout */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-[#6B705C] mb-2">
                    Pratinjau Kartu Ucapan
                  </span>
                  <div className="bg-white rounded-2xl p-6 border border-[#E5DDD0] shadow-sm text-center relative overflow-hidden">
                    <div
                      className="h-2.5 w-full absolute top-0 left-0"
                      style={{
                        backgroundColor:
                          RIBBON_COLORS.find((r) => r.name === ribbonColor)
                            ?.hex || "#14452F",
                      }}
                    />
                    <p className="text-[10px] tracking-[0.2em] text-[#6B705C] uppercase mt-2">
                      Untuk
                    </p>
                    <h4 className="font-serif text-xl font-semibold text-[#14452F] mt-0.5 mb-4">
                      {cardTo || "Nama Penerima"}
                    </h4>
                    <p className="font-serif italic text-xs text-[#3D4A42] min-h-[54px] px-3 leading-relaxed">
                      "{cardMessage || "Tulis pesan hangat Anda di sini..."}"
                    </p>
                    <p className="text-[10px] tracking-[0.2em] text-[#6B705C] uppercase mt-4">
                      Dengan Cinta,
                    </p>
                    <p className="font-serif text-sm font-semibold text-[#C87A5B] mt-0.5">
                      {cardFrom || "Nama Pengirim"}
                    </p>
                    <p className="text-[9px] tracking-[0.18em] text-gray-400 uppercase mt-5">
                      KALANDRA • PITA {ribbonColor.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E5DDD0] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B705C]">
                      Total ({orderQty}x)
                    </span>
                    <span className="font-serif text-xl font-bold text-[#14452F]">
                      {formatRupiah(currentModalUnitPrice * orderQty)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Tambah ke Keranjang
                  </button>

                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full border border-[#14452F] text-[#14452F] hover:bg-[#14452F]/5 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> Pesan via WhatsApp
                    Langsung
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          DRAWER KERANJANG BELANJA
         ========================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FAF6F0] w-full max-w-md h-full flex flex-col justify-between shadow-2xl">
            <div className="p-5 bg-white border-b border-[#E5DDD0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#14452F]" />
                <h3 className="font-serif text-lg font-semibold text-[#14452F]">
                  Keranjang Belanja ({totalCartItems})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-xs">
                  Keranjang masih kosong. Yuk pilih hampers favoritmu!
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.key}
                    className="bg-white p-4 rounded-2xl border border-[#E5DDD0] flex gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-semibold text-sm truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            setCart((prev) =>
                              prev.filter((c) => c.key !== item.key)
                            )
                          }
                          className="text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#6B705C]">
                        Pita: {item.ribbon} • Kirim: {item.deliveryDate}
                      </p>
                      <p className="text-[11px] text-[#6B705C]">
                        Untuk: {item.to}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#14452F]">
                          {formatRupiah(item.unitTotal * item.qty)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Qty: {item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-[#E5DDD0] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6B705C]">Total Belanja</span>
                  <span className="font-serif text-xl font-bold text-[#14452F]">
                    {formatRupiah(totalCartPrice)}
                  </span>
                </div>
                <button
                  onClick={handleCartCheckoutWA}
                  className="w-full bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Checkout via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL LOGIN ADMIN KECIL (TIDAK MENGGANGGU PEMBELI)
         ========================================================= */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-6 shadow-xl border border-[#E5DDD0]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-[#14452F]">
                Login Admin
              </h3>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAdminSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="admin"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs"
                  required
                />
              </div>
              {adminError && (
                <p className="text-[11px] text-red-600">{adminError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-[#14452F] text-white text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
              >
                Masuk Dashboard Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
