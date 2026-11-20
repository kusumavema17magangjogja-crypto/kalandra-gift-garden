import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Truck, Camera, ShieldCheck, Star, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader, SiteFooter } from "@/components/shop/SiteHeader";
import { CustomizeDialog } from "@/components/shop/CustomizeDialog";
import { FlashSale, ShoppingSelectors, InspirationAndHelp } from "@/components/shop/CommercialSections";
import { useStore } from "@/lib/store";
import {
  CITIES,
  SHIPPING_FEE,
  isHalalProduct,
  type Product,
  type ProductTag,
} from "@/lib/data";
import {
  BUDGETS,
  COMMERCIAL_CATEGORIES,
  formatIDR,
  matchProductCategory,
  matchesOccasion,
} from "@/data/floristData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalandra Florist & Gift — Bunga, Parsel & Seserahan" },
      {
        name: "description",
        content:
          "Toko karangan bunga papan, hand bouquet, parsel buah, hampers, dan seserahan dengan kartu ucapan personal.",
      },
      { property: "og:title", content: "Kalandra Florist & Gift" },
      {
        property: "og:description",
        content: "Karangan bunga, hand bouquet, parsel & seserahan dengan kartu ucapan personal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const TAG_FILTERS: { id: "all" | ProductTag; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "popular", label: "Terlaris" },
  { id: "express", label: "Same-Day" },
  { id: "idulfitri", label: "Hari Raya" },
  { id: "hantaran", label: "Hantaran" },
];

const GALLERY_ITEMS = [
  {
    title: "Bukti Kirim Karangan Papan & Akrilik",
    caption: "Foto hasil rangkaian & titik lokasi terpasang dikirim sebelum tim meninggalkan lokasi.",
    badge: "Pre-Delivery Photo",
  },
  {
    title: "Hand Bouquet & Bloom Box Terbungkus Rapi",
    caption: "Setiap tangkai dipilih segar, pita disesuaikan warna pilihan, dan kartu ucapan dicek ejaannya.",
    badge: "Custom Card & Ribbon",
  },
  {
    title: "Parsel Buah & Hampers Tersegel Aman",
    caption: "Dikemas rapi untuk pengiriman instan maupun luar kota ke 7 wilayah layanan Kalandra.",
    badge: "7 Kota Layanan",
  },
  {
    title: "Seserahan & Mahar Bernuansa Elegan",
    caption: "Disusun detail sesuai request nuansa warna dan jadwal acara akad atau resepsi.",
    badge: "Bespoke Arrangement",
  },
];

function Storefront() {
  const { products, categories, settings, city, setCity, isAdmin } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<"all" | ProductTag>("all");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [pickedProduct, setPickedProduct] = useState<Product | null>(null);

  const safeProducts = useMemo(() => products ?? [], [products]);
  const safeCategories = useMemo(() => categories ?? [], [categories]);

  useEffect(() => {
    const onCustomize = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = safeProducts.find((p) => p.id === id && p.active);
      if (found) setPickedProduct(found);
    };
    const onCategory = (e: Event) => {
      const cat = (e as CustomEvent<string>).detail;
      if (cat) {
        setSelectedCategory(cat);
        setOccasion(null);
      }
    };
    window.addEventListener("kalandra:customize", onCustomize);
    window.addEventListener("kalandra:category", onCategory);
    return () => {
      window.removeEventListener("kalandra:customize", onCustomize);
      window.removeEventListener("kalandra:category", onCategory);
    };
  }, [safeProducts]);

  const allCategories = useMemo(() => {
    const merged = [
      ...COMMERCIAL_CATEGORIES,
      ...safeCategories.filter(
        (c) => !COMMERCIAL_CATEGORIES.includes(c as (typeof COMMERCIAL_CATEGORIES)[number]),
      ),
    ];
    return Array.from(new Set(merged));
  }, [safeCategories]);

  const filteredProducts = useMemo(() => {
    const activeOnly = safeProducts.filter((p) => p.active);
    const budgetRange = BUDGETS.find((b) => b.id === budget);

    const list = activeOnly.filter((p) => {
      if (!matchProductCategory(p.category, selectedCategory)) return false;
      if (selectedTag !== "all" && !p.tags.includes(selectedTag)) return false;
      if (occasion && !matchesOccasion(p, occasion)) return false;
      if (budgetRange && (p.price < budgetRange.min || p.price >= budgetRange.max)) return false;
      return true;
    });

    if (sortBy === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [safeProducts, selectedCategory, selectedTag, occasion, budget, sortBy]);

  const seserahanProducts = useMemo(
    () =>
      safeProducts
        .filter(
          (p) =>
            p.active &&
            (matchesOccasion(p, "wedding") || p.category.toLowerCase().includes("seserahan")),
        )
        .slice(0, 4),
    [safeProducts],
  );

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTag("all");
    setOccasion(null);
    setBudget(null);
    setSortBy("featured");
  };

  const hasActiveFilter =
    selectedCategory !== "all" || selectedTag !== "all" || !!occasion || !!budget;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-12 lg:py-16">
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-rose" />
              <span>
                {settings.storeName} · {settings.operatingHours}
              </span>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {settings.heroHeadline}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              {settings.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <a href="#katalog">Jelajahi Katalog</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="#seserahan">Seserahan & Mahar</a>
              </Button>
            </div>

            <div className="grid gap-3 pt-3 text-xs sm:grid-cols-3 sm:text-sm">
              <div className="flex items-center gap-2.5 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-3">
                <Camera className="h-4 w-4 shrink-0 text-rose" />
                <span>Foto hasil jadi dikirim sebelum kurir berangkat</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-3">
                <Truck className="h-4 w-4 shrink-0 text-rose" />
                <span>
                  Layanan 7 kota · Ongkir {city} {formatIDR(SHIPPING_FEE[city] ?? 30000)}
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-rose" />
                <span>Gratis kartu ucapan & pilihan 25 warna pita</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-primary-foreground/20 shadow-lift">
              <img
                src={settings.heroImage}
                alt={settings.storeName}
                className="aspect-[4/3] w-full object-cover animate-kenburns"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
                <p className="text-xs uppercase tracking-wider text-white/80">Kota Pengiriman Aktif</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-serif text-xl">{city}</span>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-8 w-40 border-white/30 bg-black/35 text-xs text-white backdrop-blur-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Kilat */}
      <FlashSale onPick={(p) => setPickedProduct(p)} />

      {/* Belanja per Momen & Budget */}
      <ShoppingSelectors
        occasion={occasion}
        budget={budget}
        onOccasion={(id) => setOccasion((prev) => (prev === id ? null : id))}
        onBudget={(id) => setBudget((prev) => (prev === id ? null : id))}
      />

      {/* Katalog Utama */}
      <section id="katalog" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-12">
        <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Koleksi Pilihan</p>
            <h2 className="mt-1 font-serif text-4xl text-primary">Katalog Produk</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Urutkan:</span>
            </div>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="h-9 w-44 bg-card text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Rekomendasi Utama</SelectItem>
                <SelectItem value="price-asc">Harga Terendah</SelectItem>
                <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 gap-1.5 text-xs text-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filter
              </Button>
            )}
          </div>
        </div>

        {/* Filter Kategori & Tag */}
        <div className="mt-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              Semua Kategori
            </Button>
            {allCategories.map((cat) => (
              <Button
                key={cat}
                type="button"
                size="sm"
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {TAG_FILTERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTag(t.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    selectedTag === t.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Menampilkan <strong className="text-foreground">{filteredProducts.length}</strong> produk aktif
            </p>
          </div>
        </div>

        {/* Grid Produk */}
        {filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
            <p className="font-serif text-2xl text-primary">Produk tidak ditemukan</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Coba ubah atau reset filter kategori, momen, atau rentang harga.
            </p>
            <Button className="mt-4" onClick={resetFilters}>
              Tampilkan Semua Produk
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div>
                  <div className="relative overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    {p.badge && (
                      <Badge className="absolute left-2.5 top-2.5 bg-primary/90 text-primary-foreground">
                        {p.badge}
                      </Badge>
                    )}
                    {isHalalProduct(p) && (
                      <span
                        lang="ar"
                        aria-label="Halal"
                        className="absolute bottom-2.5 left-2.5 rounded bg-emerald-700/90 px-2 py-0.5 text-xs text-white"
                      >
                        حلال
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="truncate">{p.category}</span>
                      <span className="inline-flex shrink-0 items-center gap-1 font-medium text-foreground">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {p.rating.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-primary line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="border-t bg-muted/20 px-4 py-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-base font-bold text-primary">{formatIDR(p.price)}</span>
                    <span className="text-[11px] text-muted-foreground">Stok {p.stock}</span>
                  </div>
                  {!isAdmin ? (
                    <Button
                      className="mt-3 w-full"
                      disabled={!p.stock || !settings.storeOpen}
                      onClick={() => setPickedProduct(p)}
                    >
                      {!settings.storeOpen
                        ? "PO Ditutup"
                        : p.stock > 0
                          ? "Custom & Pesan"
                          : "Stok Habis"}
                    </Button>
                  ) : (
                    <p className="mt-3 text-center text-xs text-muted-foreground">Mode Admin Aktif</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Section Seserahan & Mahar */}
      <section id="seserahan" className="scroll-mt-36 border-y bg-secondary/70 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Momen Sakral</p>
              <h2 className="mt-1 font-serif text-4xl text-primary">Seserahan, Mahar & Hantaran</h2>
              <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
                Rangkaian seserahan akrilik, kotak mahar, dan hantaran pilihan yang dapat disesuaikan warna pita serta kartu ucapannya.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("Seserahan & Hantaran Pernikahan");
                document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Lihat Semua Koleksi
            </Button>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seserahanProducts.map((p) => (
              <article
                key={p.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-soft"
              >
                <div>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-serif text-xl font-semibold text-primary line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t px-4 py-3">
                  <span className="text-sm font-bold text-primary">{formatIDR(p.price)}</span>
                  {!isAdmin && (
                    <Button
                      size="sm"
                      disabled={!p.stock || !settings.storeOpen}
                      onClick={() => setPickedProduct(p)}
                    >
                      Pesan
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Bukti Jadi */}
      <section id="galeri" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Jaminan Kualitas</p>
        <h2 className="mt-1 font-serif text-4xl text-primary">Galeri Bukti Jadi & Pengiriman</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, idx) => {
            const sampleProduct = safeProducts[idx % Math.max(1, safeProducts.length)];
            return (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl border bg-card shadow-soft"
              >
                {sampleProduct && (
                  <img
                    src={sampleProduct.image}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {item.badge}
                  </span>
                  <h3 className="mt-2 font-serif text-xl text-primary">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Panduan, FAQ & Pembayaran */}
      <InspirationAndHelp />

      <SiteFooter />

      <CustomizeDialog
        product={pickedProduct}
        onOpenChange={(open) => {
          if (!open) setPickedProduct(null);
        }}
      />
    </div>
  );
}
