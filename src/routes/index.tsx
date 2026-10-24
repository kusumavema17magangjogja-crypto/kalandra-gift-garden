import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Star, Check, MessageCircle, Camera, Package, Palette, Hammer, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader, SiteFooter } from "@/components/shop/SiteHeader";
import { CustomizeDialog } from "@/components/shop/CustomizeDialog";
import { useStore } from "@/lib/store";
import { CATEGORY_EMOJI, IMAGES, formatIDR, waLink, type Category, type Product, type ProductTag } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalandra Hampers & Seserahan — Hampers Mewah & Hantaran Pernikahan" },
      { name: "description", content: "Hampers ulang tahun, parsel Lebaran, newborn, dan seserahan pernikahan dengan kartu ucapan custom & foto sebelum diantar." },
      { property: "og:title", content: "Kalandra Hampers & Seserahan" },
      { property: "og:description", content: "Rangkaian kasih & keanggunan di setiap momen berharga. Kirim ke 7 kota." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TABS: { id: "all" | ProductTag; label: string }[] = [
  { id: "all", label: "Semua Koleksi" },
  { id: "popular", label: "Paling Populer" },
  { id: "idulfitri", label: "Idul Fitri Series" },
  { id: "hantaran", label: "Hantaran & Mahar" },
  { id: "express", label: "Express Ready" },
];

const GALLERY = [
  { img: IMAGES.hero, cap: "Sage Basket untuk Ibu Ratna — Jakarta" },
  { img: IMAGES.seserahan, cap: "Seserahan 7 box Dinda & Raka — Surabaya" },
  { img: IMAGES.lebaran, cap: "Parsel korporat 120 pcs — Bandung" },
  { img: IMAGES.newborn, cap: "Welcome Baby Arka — Bali" },
  { img: IMAGES.birthday, cap: "Anniversary 5 tahun — Yogyakarta" },
  { img: IMAGES.corporate, cap: "Gift klien PT Nusantara — Jakarta" },
];

const REVIEWS = [
  { name: "Maya R.", src: "Google", text: "Rangkaiannya cantik banget, dikirim foto dulu sebelum diantar. Ibu saya terharu!" },
  { name: "Andre K.", src: "Instagram", text: "Seserahan sesuai tema warna sage-terracotta. Rapi & tepat waktu." },
  { name: "Lina S.", src: "Google", text: "Parsel Lebaran untuk 50 klien, semua sampai mulus antar kota. Recommended." },
];

function ProductCard({ p, onPick }: { p: Product; onPick: () => void }) {
  const { settings } = useStore();
  const limited = p.stock <= 5;
  const badge = p.badge ?? (p.tags.includes("express") ? "Same-Day" : limited ? "Slot Terbatas" : "Ready Stock");
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium">{CATEGORY_EMOJI[p.category]} {p.category}</span>
        <span className={cn("absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold", p.stock === 0 ? "bg-destructive text-destructive-foreground" : limited ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground")}>
          {p.stock === 0 ? "Habis" : badge}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="font-serif text-xl leading-tight text-primary">{p.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <p className="text-lg font-semibold">{formatIDR(p.price)}</p>
        <Button className="w-full" onClick={onPick} disabled={p.stock === 0}>Kustomisasi & Pesan</Button>
        {p.stock > 0 && <Button asChild variant="outline" className="w-full border-success text-success hover:bg-success/10 hover:text-success"><a href={waLink(settings.whatsappNumber, `Halo ${settings.storeName}, saya ingin memesan ${p.name} (${formatIDR(p.price)}).`)} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Order WA</a></Button>}
      </div>
    </article>
  );
}

function Index() {
  const { products, categories, settings } = useStore();
  const [tab, setTab] = useState<"all" | ProductTag>("all");
  const [cat, setCat] = useState<Category | null>(null);
  const [picked, setPicked] = useState<Product | null>(null);

  useEffect(() => {
    const h = (e: Event) => setPicked(products.find((p) => p.id === (e as CustomEvent).detail) ?? null);
    window.addEventListener("kalandra:customize", h);
    return () => window.removeEventListener("kalandra:customize", h);
  }, [products]);

  const list = useMemo(
    () => products.filter((p) => p.active && (tab === "all" || p.tags.includes(tab)) && (!cat || p.category === cat)),
    [products, tab, cat],
  );

  const pickCat = (c: Category) => {
    setCat(cat === c ? null : c);
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <img src={settings.heroImage} alt={`Hampers ${settings.storeName}`} width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36">
          <p className="text-sm uppercase tracking-[0.3em] text-rose">{settings.storeName} · {settings.storeTagline}</p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.05] text-primary-foreground md:text-7xl">{settings.heroHeadline}</h1>
          <p className="mt-5 max-w-lg text-primary-foreground/80">{settings.heroSubheadline}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => pickCat(c)} className={cn("rounded-full border px-4 py-2 text-sm backdrop-blur transition", cat === c ? "border-rose bg-rose text-accent-foreground" : "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20")}>
                {CATEGORY_EMOJI[c]} {c === "Lebaran & Hari Raya" ? "Lebaran & Hari Raya" : c === "Baby Born" ? "Baby Born" : c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="katalog" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-sm uppercase tracking-[0.25em] text-accent">Katalog</p><h2 className="font-serif text-4xl text-primary md:text-5xl">Koleksi Pilihan</h2>
            {cat && <button onClick={() => setCat(null)} className="mt-1 text-sm text-muted-foreground hover:underline">Filter: {cat} ✕</button>}</div>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="max-w-full overflow-x-auto">
            <TabsList className="bg-secondary">{TABS.map((t) => <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>)}</TabsList>
          </Tabs>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} onPick={() => setPicked(p)} />)}
          {list.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">Belum ada produk di kategori ini.</p>}
        </div>
      </section>

      <section id="seserahan" className="scroll-mt-32 bg-secondary py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <img src={IMAGES.seserahan} alt="Seserahan akrilik" loading="lazy" width={1024} height={1024} className="rounded-3xl shadow-lift" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent">Layanan Spesial</p>
            <h2 className="font-serif text-4xl text-primary md:text-5xl">Seserahan & Hantaran Pernikahan</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Sewa Baki & Kotak Akrilik", p: "Mulai Rp 1.500.000", f: ["7–11 kotak akrilik gold", "Dekor bunga & pita", "Dikembalikan H+3"] },
                { t: "Full Package Beli Putus", p: "Mulai Rp 3.500.000", f: ["Kotak jadi milik Anda", "Isi barang + dekor", "Free konsultasi tema"] },
              ].map((c, i) => (
                <div key={c.t} className={cn("rounded-2xl border p-5", i === 1 ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
                  <p className="font-serif text-xl">{c.t}</p><p className={cn("text-sm", i === 1 ? "text-rose" : "text-accent")}>{c.p}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">{c.f.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0" />{f}</li>)}</ul>
                </div>
              ))}
            </div>
            <ol className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[{ i: Package, t: "Antar barang" }, { i: Palette, t: "Desain tema warna" }, { i: Hammer, t: "Pengerjaan" }, { i: HandHeart, t: "Serah terima" }].map((s, n) => (
                <li key={s.t} className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-card text-primary shadow-soft"><s.i className="h-5 w-5" /></span><p className="mt-2 text-xs font-semibold">{n + 1}. {s.t}</p></li>
              ))}
            </ol>
            <Button asChild size="lg" className="mt-8"><a href={waLink(settings.whatsappNumber, `Halo ${settings.storeName}, saya ingin konsultasi seserahan.`)} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Konsultasi Seserahan</a></Button>
          </div>
        </div>
      </section>

      <section id="galeri" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-accent"><Camera className="mr-1 inline h-4 w-4" />Galeri Bukti Jadi</p>
          <h2 className="font-serif text-4xl text-primary md:text-5xl">Dikirim dengan Cinta, Didokumentasikan</h2>
          <p className="mt-3 flex items-center justify-center gap-1 text-sm"><span className="flex text-warning">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span><b>4.9/5</b> dari 1.200+ ulasan Google & Instagram</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <figure key={i} className={cn("group relative overflow-hidden rounded-2xl", i === 0 && "md:row-span-2")}>
              <img src={g.img} alt={g.cap} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-3 text-xs text-primary-foreground">{g.cap}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex text-warning">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-3 font-serif text-lg italic">"{r.text}"</p>
              <footer className="mt-3 text-sm text-muted-foreground">— {r.name} via {r.src}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <SiteFooter />
      <Button asChild size="lg" className="fixed bottom-5 right-5 z-30 rounded-full bg-success text-success-foreground shadow-lift hover:bg-success/90"><a href={waLink(settings.whatsappNumber, `Halo ${settings.storeName}, saya ingin tanya stok & ongkir.`)} target="_blank" rel="noreferrer" aria-label="Tanya Stok & Ongkir"><MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">Tanya Stok & Ongkir</span></a></Button>
      <CustomizeDialog product={picked} onOpenChange={(o) => !o && setPicked(null)} />
    </div>
  );
}
