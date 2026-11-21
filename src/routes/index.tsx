import { useState, useEffect, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
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
  MessageCircle,
  MapPin,
  ShieldCheck,
  Star,
  BookOpen,
  Instagram,
  Phone,
  ArrowRight,
  Gift,
  Truck,
  Camera,
  LayoutDashboard,
} from "lucide-react";
import { useStore } from "@/lib/store";
import {
  ADDONS,
  CITIES,
  SHIPPING_FEE,
  addonsTotal,
  formatIDR,
  waLink,
  type CartItem,
  type Order,
  type Product,
  type RibbonColor,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalandra — Hampers, Parsel & Seserahan Eksklusif" },
      {
        name: "description",
        content:
          "Rangkaian kasih & keanggunan di setiap momen berharga. 100% Halal, free kartu ucapan personal, kirim foto sebelum diantar.",
      },
    ],
  }),
  component: HomePage,
});

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

const RIBBON_OPTIONS: { id: RibbonColor; name: string; hex: string }[] = [
  { id: "emerald", name: "Emerald Green", hex: "#14452F" },
  { id: "gold", name: "Champagne Gold", hex: "#D4AF37" },
  { id: "terracotta", name: "Soft Terracotta", hex: "#C87A5B" },
  { id: "burgundy", name: "Burgundy", hex: "#6E1E2A" },
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

function HomePage() {
  const navigate = useNavigate();
  const {
    products,
    categories,
    settings,
    city,
    setCity,
    cartCount,
    setCartOpen,
    addToCart,
    recordOrder,
    isAdmin,
    loginAdmin,
    user,
    logout,
  } = useStore();

  // --- STATE UI ---
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedMoment, setSelectedMoment] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown Flash Sale
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 42 * 60 + 19);

  // Modal Pemesanan Lengkap
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [cardTo, setCardTo] = useState("");
  const [cardFrom, setCardFrom] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [ribbonColor, setRibbonColor] = useState<RibbonColor>("emerald");
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [orderQty, setOrderQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Modal Login Admin Kecil
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const heroSlides = useMemo(
    () => [
      {
        tag: "KALANDRA • HAMPERS & SESERAHAN",
        title:
          settings.heroHeadline ||
          "Rangkaian Kasih & Keanggunan di Setiap Momen Berharga",
        subtitle:
          settings.heroSubheadline ||
          "Dirangkai tangan, lengkap dengan kartu ucapan personal, dan dikirim fotonya sebelum sampai ke orang tersayang.",
        image:
          settings.heroImage ||
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
    ],
    [settings.heroHeadline, settings.heroSubheadline, settings.heroImage]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const activeProducts = useMemo(
    () => (Array.isArray(products) ? products.filter((p) => p.active !== false) : []),
    [products]
  );

  const flashSaleProducts = useMemo(
    () => activeProducts.slice(0, 4),
    [activeProducts]
  );

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((p) => {
      const matchCat =
        selectedCategory === "Semua" || p.category === selectedCategory;
      const matchMom =
        selectedMoment === "Semua" ||
        (p.category + " " + p.name + " " + p.description)
          .toLowerCase()
          .includes(selectedMoment.split(" ")[0].toLowerCase());
      const q = activeSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchMom && matchSearch;
    });
  }, [activeProducts, selectedCategory, selectedMoment, activeSearch]);

  const openOrderModal = (product: Product) => {
    setOrderProduct(product);
    setCardTo("");
    setCardFrom(user?.name || "");
    setCardMessage("");
    setRibbonColor("emerald");
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
    return orderProduct.price + addonsTotal(selectedAddons);
  }, [orderProduct, selectedAddons]);

  const buildCartItem = (product: Product): CartItem => ({
    key: `${product.id}-${Date.now()}`,
    productId: product.id,
    name: product.name,
    image: product.image,
    basePrice: product.price,
    qty: orderQty,
    addons: selectedAddons,
    ribbon: ribbonColor,
    cardTemplate: "classic",
    to: cardTo.trim() || "Penerima",
    from: cardFrom.trim() || customerName.trim() || "Pengirim",
    message: cardMessage.trim() || "Semoga berkenan dan membawa kebahagiaan.",
    deliveryDate: new Date(deliveryDate).toISOString(),
  });

  const handleAddToCart = () => {
    if (!orderProduct) return;
    if (isAdmin) {
      toast.info("Mode Admin aktif: gunakan tombol Pesan via WA atau keluar dari mode Admin untuk tes keranjang pembeli.");
      return;
    }

    const item = buildCartItem(orderProduct);
    const err = addToCart(item);
    if (err) {
      toast.error(err);
      return;
    }

    setOrderProduct(null);
    setCartOpen(true);
    toast.success(`${orderProduct.name} ditambahkan ke keranjang`);
  };

  const handleDirectWhatsApp = () => {
    if (!orderProduct) return;
    const item = buildCartItem(orderProduct);
    const addonLabels = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean);
    const subtotal = currentModalUnitPrice * orderQty;
    const shipping = SHIPPING_FEE[city] ?? 30000;
    const grandTotal = subtotal + shipping;
    const ribbonName =
      RIBBON_OPTIONS.find((r) => r.id === ribbonColor)?.name || ribbonColor;

    // Catat langsung ke daftar pesanan Admin
    const newOrder: Order = {
      id: "KLD-" + Math.floor(100000 + Math.random() * 900000),
      customerName: customerName.trim() || cardFrom.trim() || "Pelanggan Web",
      customerEmail: user?.email || "guest@kalandra.id",
      phone: customerPhone.trim() || "-",
      city,
      address: customerAddress.trim() || "-",
      items: [item],
      subtotal,
      shipping,
      total: grandTotal,
      status: "Menunggu Pembayaran",
      createdAt: new Date().toISOString(),
      deliveryDate: new Date(deliveryDate).toISOString(),
    };
    recordOrder(newOrder);

    const text = [
      `Halo ${settings.storeName}! Saya mau pesan:`,
      `• No. Order: *${newOrder.id}*`,
      `• Produk: *${orderProduct.name}* (${orderQty}x)`,
      `• Kota Tujuan: ${city}`,
      customerAddress ? `• Alamat: ${customerAddress}` : null,
      `• Tgl Kirim: ${deliveryDate}`,
      `• Warna Pita: ${ribbonName}`,
      `• Add-ons: ${addonLabels.length ? addonLabels.join(", ") : "-"}`,
      `• Kartu Ucapan -> Untuk: ${cardTo || "-"} | Dari: ${cardFrom || "-"}`,
      `• Pesan: "${cardMessage || "-"}"`,
      `• Subtotal: ${formatIDR(subtotal)}`,
      `• Ongkir (${city}): ${formatIDR(shipping)}`,
      `• Total Estimasi: *${formatIDR(grandTotal)}*`,
    ]
      .filter(Boolean)
      .join("\n");

    setOrderProduct(null);
    toast.success(`Pesanan ${newOrder.id} tercatat! Mengarahkan ke WhatsApp...`);
    window.open(waLink(settings.whatsappNumber, text), "_blank", "noreferrer");
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = loginAdmin(adminEmail.trim(), adminPass);
    if (err) {
      toast.error(err);
      return;
    }
    setIsAdminModalOpen(false);
    setAdminEmail("");
    setAdminPass("");
    toast.success("Berhasil masuk ke Admin Panel");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C2B22] font-sans relative overflow-x-hidden">
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

      {/* KELOPAK BUNGA JATUH */}
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
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
            <path d="M12 2C8 6 4 10 4 15a8 8 0 0016 0c0-5-4-9-8-13z" />
          </svg>
        </div>
      ))}

      {!settings.storeOpen && (
        <div className="bg-[#C87A5B] text-white text-center text-xs font-semibold py-2 px-4">
          Slot Pre-Order Hari Raya sedang penuh sementara. Hubungi WhatsApp kami untuk jadwal pengiriman terdekat.
        </div>
      )}

      {/* 1. HEADER BERJALAN */}
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
              {CITIES.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
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
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#14452F] text-[#FAF6F0] flex items-center justify-center shadow-sm">
              <Gift className="w-5 h-5 text-[#E5C158]" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#14452F] block leading-none">
                {settings.storeName}
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#6B705C] uppercase font-medium">
                {settings.storeTagline || "Hampers & Seserahan"}
              </span>
            </div>
          </button>

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

            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate({ to: "/admin" })}
                  className="flex items-center gap-1 text-[11px] font-semibold text-white bg-[#14452F] hover:bg-[#1D5B3F] px-3 py-1.5 rounded-full transition cursor-pointer"
                >
                  <LayoutDashboard className="w-3 h-3" />
                  <span>Panel Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast.success("Keluar dari mode Admin");
                  }}
                  title="Keluar Mode Admin"
                  className="text-[11px] text-[#5C665E] hover:text-red-600 bg-white border border-[#DDD4C7] px-2 py-1.5 rounded-full cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                title="Login Admin"
                className="flex items-center gap-1 text-[11px] font-medium text-[#5C665E] hover:text-[#14452F] bg-white border border-[#DDD4C7] px-2.5 py-1.5 rounded-full transition cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (isAdmin) {
                  toast.info("Admin tidak memiliki keranjang belanja.");
                  return;
                }
                setCartOpen(true);
              }}
              className="relative p-2.5 rounded-full bg-[#14452F] text-white hover:bg-[#1C593D] transition cursor-pointer shadow-xs"
              title="Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C87A5B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF6F0]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SLIDER */}
      <section className="relative h-[470px] md:h-[530px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
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

              <div className="flex flex-wrap gap-2.5">
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    type="button"
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

        <button
          type="button"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? "w-7 bg-[#E5C158]" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE */}
      {flashSaleProducts.length > 0 && (
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
                        PROMO HARI INI
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-base mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#14452F] text-base">
                          {formatIDR(item.price)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatIDR(Math.round(item.price * 1.15))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
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
      )}

      {/* 5. BELANJA PER MOMEN */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F]">
            Belanja per Momen
          </h2>
          {selectedMoment !== "Semua" && (
            <button
              type="button"
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
                type="button"
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

          <div className="flex flex-wrap gap-2">
            {["Semua", ...categories].map((cat) => (
              <button
                type="button"
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
              type="button"
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
            {filteredProducts.map((product) => {
              const badgeLabel =
                product.badge ??
                (product.tags?.includes("express")
                  ? "Same-Day"
                  : product.stock <= 5
                  ? "Slot Terbatas"
                  : "Ready Stock");

              return (
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
                          badgeLabel === "Slot Terbatas"
                            ? "bg-[#C87A5B]"
                            : "bg-[#14452F]"
                        }`}
                      >
                        {badgeLabel}
                      </span>
                      {product.foodStatus !== "non-halal" && (
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
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-[#14452F]">
                          {formatIDR(product.price)}
                        </span>
                        <span className="text-[11px] text-[#6B705C]">
                          Stok: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <button
                      type="button"
                      disabled={product.stock <= 0}
                      onClick={() => openOrderModal(product)}
                      className="w-full bg-[#14452F] hover:bg-[#1D5B3F] disabled:bg-gray-300 text-white text-xs font-semibold py-3 rounded-xl transition cursor-pointer"
                    >
                      {product.stock > 0 ? "Kustomisasi & Pesan" : "Stok Habis"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 7. LAYANAN SPESIAL SESERAHAN */}
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
              href={waLink(
                settings.whatsappNumber,
                `Halo ${settings.storeName}, saya mau konsultasi paket Seserahan Pernikahan`
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold px-6 py-3.5 rounded-xl transition self-start"
            >
              <MessageCircle className="w-4 h-4" /> Konsultasi Seserahan via WA
            </a>
          </div>
        </div>
      </section>

      {/* 8. TUTORIAL PEMESANAN */}
      <section id="cara-pesan" className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#C87A5B] font-bold">
            Panduan Praktis
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F] mt-1">
            4 Langkah Mudah Memesan di {settings.storeName}
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

        <div className="bg-[#F3ECE0] border border-[#DFD4C0] rounded-3xl p-8 text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#14452F] text-[#E5C158] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#14452F] mb-2">
            Jaminan 100% Halal & Tanpa Alkohol
          </h3>
          <p className="text-xs md:text-sm text-[#4A554E] leading-relaxed">
            Semua parsel & makanan dari {settings.storeName} terkurasi aman,
            tanpa produk non-halal — bebas liquor, wine, dan bahan terlarang —
            demi kenyamanan & berkah ibadah Anda.
          </p>
        </div>
      </section>

      {/* 10. ARTIKEL */}
      <section id="artikel" className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-[#C87A5B] font-bold">
            Jurnal {settings.storeName}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14452F]">
            Artikel & Tips Merangkai Momen
          </h2>
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
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#E5C158]" />
              </div>
              <span className="font-serif text-xl font-bold">
                {settings.storeName}
              </span>
            </div>
            <p className="text-xs text-white/75 leading-relaxed mb-4">
              {settings.footerDescription ||
                "Spesialis hampers eksklusif, parsel hari raya 100% halal, dan seserahan pernikahan dengan sentuhan personal."}
            </p>
            <div className="flex gap-3">
              <a
                href={settings.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={waLink(settings.whatsappNumber, "Halo Kalandra!")}
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
              {categories.slice(0, 4).map((c) => (
                <li key={c}>
                  <a
                    href="#katalog"
                    onClick={() => setSelectedCategory(c)}
                    className="hover:text-white"
                  >
                    {c}
                  </a>
                </li>
              ))}
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
                  type="button"
                  onClick={() =>
                    isAdmin
                      ? navigate({ to: "/admin" })
                      : setIsAdminModalOpen(true)
                  }
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
              {settings.operatingHours || "Buka Setiap Hari: 08.00 – 20.00 WIB"}
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              Same-Day Delivery untuk area {CITIES.join(", ")}.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-2">
          <span>
            © 2026 {settings.storeName}. All rights reserved.
          </span>
          <span>100% Halal Curated Gifts</span>
        </div>
      </footer>

      <a
        href={waLink(
          settings.whatsappNumber,
          `Halo ${settings.storeName}, saya mau tanya stok dan ongkir`
        )}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-30 bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 border border-white/20"
      >
        <MessageCircle className="w-4 h-4 text-[#E5C158]" />
        Tanya Stok & Ongkir
      </a>

      {/* POP-UP PEMESANAN LENGKAP + PRATINJAU KARTU */}
      {orderProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF6F0] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#DFD4C0] my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5DDD0]">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#14452F]">
                  {orderProduct.name}
                </h3>
                <p className="text-xs text-[#6B705C]">
                  {orderProduct.category} • {formatIDR(orderProduct.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOrderProduct(null)}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
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
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
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
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
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
                    className="w-full bg-white border border-[#D8CFC0] rounded-xl p-3 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Warna Pita
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RIBBON_OPTIONS.map((r) => (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setRibbonColor(r.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer ${
                          ribbonColor === r.id
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Tanggal Pengiriman
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
                    />
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Nama Pemesan
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      No. WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0812xxxxxxxx"
                      className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Alamat Pengiriman
                  </label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Jalan, nomor rumah/gedung, patokan..."
                    className="w-full bg-white border border-[#D8CFC0] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Add-ons Tambahan
                  </label>
                  <div className="space-y-2">
                    {ADDONS.map((addon) => {
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
                            {addon.label}
                          </span>
                          <span className="text-[#14452F] font-semibold">
                            +{formatIDR(addon.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

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
                          RIBBON_OPTIONS.find((r) => r.id === ribbonColor)
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
                      {settings.storeName.toUpperCase()} • PITA{" "}
                      {(
                        RIBBON_OPTIONS.find((r) => r.id === ribbonColor)?.name ||
                        ribbonColor
                      ).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E5DDD0] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B705C]">
                      Total ({orderQty}x)
                    </span>
                    <span className="font-serif text-xl font-bold text-[#14452F]">
                      {formatIDR(currentModalUnitPrice * orderQty)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-[#14452F] hover:bg-[#1D5B3F] text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Tambah ke Keranjang
                  </button>

                  <button
                    type="button"
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

      {/* MODAL LOGIN ADMIN KECIL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-6 shadow-xl border border-[#E5DDD0]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-[#14452F]">
                Portal Admin
              </h3>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">
                  Email Admin
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@kalandra.id"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#14452F] text-white text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
              >
                Masuk ke Admin Panel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
