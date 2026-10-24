import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BarChart3, Package, Tag, Users, Settings, Bell, Store, ChevronLeft, Menu, TrendingUp, TrendingDown,
  Plus, Download, AlertTriangle, Search, MessageCircle, Eye, Pencil, Trash2, Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shop/StatusBadge";
import { GreetingCard } from "@/components/shop/GreetingCard";
import { useStore } from "@/lib/store";
import { CATEGORIES, CITIES, IMAGES, ORDER_STATUSES, formatDate, formatIDR, ribbonLabel, waLink, type Order, type OrderStatus, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Kalandra Hampers" },
      { name: "description", content: "Dashboard pengelolaan pesanan, produk, pelanggan, dan pengaturan toko Kalandra." },
      { property: "og:title", content: "Admin Panel — Kalandra Hampers" },
      { property: "og:description", content: "Dashboard admin Kalandra Hampers & Seserahan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type View = "overview" | "orders" | "products" | "customers" | "settings";
const MENU: { id: View; label: string; icon: typeof BarChart3 }[] = [
  { id: "overview", label: "Ringkasan", icon: BarChart3 },
  { id: "orders", label: "Kelola Pesanan", icon: Package },
  { id: "products", label: "Kelola Katalog & Kategori", icon: Tag },
  { id: "customers", label: "Data Pelanggan", icon: Users },
  { id: "settings", label: "Pengaturan Toko", icon: Settings },
];

function Admin() {
  const [view, setView] = useState<View>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { orders, settings } = useStore();
  const unread = orders.filter((o) => o.status === "Menunggu Pembayaran").length;

  const Nav = ({ compact }: { compact?: boolean }) => (
    <nav className="flex flex-col gap-1 p-3">
      {MENU.map((m) => (
        <button key={m.id} onClick={() => { setView(m.id); setMobile(false); }} title={m.label}
          className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition", view === m.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60")}>
          <m.icon className="h-4 w-4 shrink-0" />{!compact && m.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-all md:flex", collapsed ? "w-16" : "w-60")}>
        <div className="flex items-center gap-2 border-b border-sidebar-border p-4">
          <Gift className="h-6 w-6 shrink-0 text-sidebar-primary" />{!collapsed && <span className="font-serif text-xl">{settings.storeName} Admin</span>}
        </div>
        <Nav compact={collapsed} />
        <button onClick={() => setCollapsed(!collapsed)} className="mt-auto flex items-center justify-center gap-2 border-t border-sidebar-border p-3 text-xs text-sidebar-foreground/70" aria-label="Ciutkan sidebar">
          <ChevronLeft className={cn("h-4 w-4 transition", collapsed && "rotate-180")} />{!collapsed && "Ciutkan"}
        </button>
      </aside>
      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="w-64 border-0 bg-sidebar p-0 text-sidebar-foreground">
          <div className="flex items-center gap-2 border-b border-sidebar-border p-4"><Gift className="h-6 w-6 text-sidebar-primary" /><span className="font-serif text-xl">{settings.storeName} Admin</span></div>
          <Nav />
        </SheetContent>
      </Sheet>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobile(true)} aria-label="Menu"><Menu /></Button>
          <h1 className="font-serif text-2xl text-primary">{MENU.find((m) => m.id === view)?.label}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi" onClick={() => setView("orders")}>
              <Bell />{unread > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{unread}</span>}
            </Button>
            <div className="hidden items-center gap-2 sm:flex"><span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-primary-foreground">AK</span><span className="text-sm font-medium">Admin {settings.storeName}</span></div>
            <Button asChild variant="outline" size="sm"><Link to="/"><Store className="mr-1 h-4 w-4" />Kembali ke Toko</Link></Button>
          </div>
        </header>
        <main className="p-4 md:p-6">
          {view === "overview" && <Overview go={setView} />}
          {view === "orders" && <Orders />}
          {view === "products" && <Products />}
          {view === "customers" && <Customers />}
          {view === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border bg-card p-5 shadow-soft", className)}>{children}</div>;
}

function downloadCSV(orders: Order[]) {
  const rows = [["Order ID", "Pelanggan", "Produk", "Kota", "Tanggal Kirim", "Total", "Status"], ...orders.map((o) => [o.id, o.customerName, o.items.map((i) => i.name).join(" / "), o.city, formatDate(o.deliveryDate), o.total, o.status])];
  const blob = new Blob([rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "laporan-kalandra.csv"; a.click();
}

function Overview({ go }: { go: (v: View) => void }) {
  const { orders } = useStore();
  const revenue = 48750000 + orders.filter((o) => o.status !== "Menunggu Pembayaran").reduce((t, o) => t + o.total, 0) - 9_000_000;
  const active = orders.filter((o) => o.status === "Sedang Dirangkai").length;
  const kpis = [
    { label: "Total Pendapatan Bulan Ini", value: formatIDR(revenue), trend: 12.4 },
    { label: "Total Pesanan Masuk", value: `${134 + orders.length} Pesanan`, trend: 8.1 },
    { label: "Antrean Rangkaian Hari Ini", value: `${active + 6} Rangkaian Aktif`, trend: -3.2 },
    { label: "Kuota Slot Hari Raya", value: "85% Terisi", trend: 15.0, progress: 85 },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Panel key={k.label}>
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="mt-2 font-serif text-2xl font-semibold text-primary">{k.value}</p>
            {k.progress && <Progress value={k.progress} className="mt-2 h-1.5" />}
            <p className={cn("mt-2 flex items-center gap-1 text-xs font-semibold", k.trend > 0 ? "text-success" : "text-destructive")}>
              {k.trend > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}{k.trend > 0 ? "+" : ""}{k.trend}% vs bulan lalu
            </p>
          </Panel>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <h2 className="font-serif text-xl text-primary">Aktivitas Terbaru</h2>
          <ul className="mt-4 divide-y">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                <img src={o.items[0]?.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1"><p className="font-medium">{o.customerName} <span className="text-muted-foreground">· {o.id}</span></p><p className="truncate text-xs text-muted-foreground">{o.items[0]?.name} · {o.city}</p></div>
                <span className="font-semibold">{formatIDR(o.total)}</span><StatusBadge status={o.status} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="space-y-3">
          <h2 className="font-serif text-xl text-primary">Aksi Cepat</h2>
          <Button className="w-full justify-start" onClick={() => go("products")}><Plus className="mr-2 h-4 w-4" />Tambah Produk Baru</Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => downloadCSV(orders)}><Download className="mr-2 h-4 w-4" />Download Laporan CSV</Button>
          <Button variant="outline" className="w-full justify-start border-accent text-accent hover:bg-accent/10 hover:text-accent" onClick={() => go("orders")}><AlertTriangle className="mr-2 h-4 w-4" />Cek Pesanan Mendesak</Button>
        </Panel>
      </div>
    </div>
  );
}

function Orders() {
  const { orders, setOrderStatus } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [card, setCard] = useState<Order | null>(null);
  const list = orders.filter((o) =>
    (status === "all" || o.status === status) && (city === "all" || o.city === city) &&
    (o.customerName + o.id).toLowerCase().includes(q.toLowerCase()));
  return (
    <Panel>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Cari nama pelanggan / Order ID" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <Select value={status} onValueChange={setStatus}><SelectTrigger className="md:w-56"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">Semua Status</SelectItem>{ORDER_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
        <Select value={city} onValueChange={setCity}><SelectTrigger className="md:w-44"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">Semua Kota</SelectItem>{CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">{["Order ID", "Pelanggan", "Produk", "Tgl Kirim", "Kota", "Total", "Status", "Aksi"].map((h) => <th key={h} className="px-2 py-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-secondary/50">
                <td className="px-2 py-3 font-semibold">{o.id}</td>
                <td className="px-2 py-3">{o.customerName}</td>
                <td className="max-w-48 truncate px-2 py-3">{o.items.map((i) => i.name).join(", ")}</td>
                <td className="px-2 py-3">{formatDate(o.deliveryDate)}</td>
                <td className="px-2 py-3">{o.city}</td>
                <td className="px-2 py-3 font-medium">{formatIDR(o.total)}</td>
                <td className="px-2 py-3">
                  <Select value={o.status} onValueChange={(v) => { setOrderStatus(o.id, v as OrderStatus); toast.success(`${o.id} → ${v}`); }}>
                    <SelectTrigger className="h-8 w-48 border-0 bg-transparent p-0 shadow-none"><StatusBadge status={o.status} /></SelectTrigger>
                    <SelectContent>{ORDER_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => setCard(o)}><Eye className="mr-1 h-3.5 w-3.5" />Kartu</Button>
                    <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success"><a href={waLink(o.phone, `Halo ${o.customerName}, update pesanan ${o.id}: ${o.status}.`)} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle className="h-4 w-4" /></a></Button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={8} className="py-10 text-center text-muted-foreground">Tidak ada pesanan.</td></tr>}
          </tbody>
        </table>
      </div>
      <Dialog open={!!card} onOpenChange={(o) => !o && setCard(null)}>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
          <DialogHeader><DialogTitle className="font-serif text-2xl text-primary">Kartu Ucapan · {card?.id}</DialogTitle></DialogHeader>
          {card?.items.map((i) => (
            <div key={i.key} className="space-y-2">
              <p className="text-sm text-muted-foreground">{i.name} · Pita <b>{ribbonLabel(i.ribbon)}</b></p>
              <GreetingCard to={i.to} from={i.from} message={i.message} ribbon={i.ribbon} />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </Panel>
  );
}

const emptyProduct = (): Product => ({ id: "p" + Date.now(), name: "", category: CATEGORIES[0], price: 0, stock: 10, image: IMAGES.hero, description: "", active: true, tags: [], rating: 5, reviews: 0 });

function Products() {
  const { products, categories, addCategory, renameCategory, deleteCategory, saveProduct, deleteProduct } = useStore();
  const [categoryName, setCategoryName] = useState("");
  const [categoryEdit, setCategoryEdit] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [edit, setEdit] = useState<Product | null>(null);
  const [del, setDel] = useState<Product | null>(null);
  const list = useMemo(() => products.filter((p) => (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())), [products, q, cat]);

  const save = () => {
    if (!edit) return;
    if (!edit.name.trim() || !edit.category.trim() || !edit.image.trim() || !Number.isFinite(edit.price) || edit.price <= 0 || edit.stock < 0) return void toast.error("Nama dan harga wajib diisi");
    saveProduct(edit); toast.success("Produk disimpan"); setEdit(null);
  };

  return (
    <Panel>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Cari produk" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <Select value={cat} onValueChange={setCat}><SelectTrigger className="md:w-56"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">Semua Kategori</SelectItem>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
        <Button onClick={() => setEdit(emptyProduct())}><Plus className="mr-1 h-4 w-4" />Tambah Produk Baru</Button>
      </div>
      <div className="mt-5 space-y-3 border-y py-4">
        <h2 className="font-serif text-xl text-primary">Kategori</h2>
        <div className="flex flex-wrap gap-2">{categories.map((c) => <div key={c} className="flex items-center gap-1 border px-2 py-1 text-sm"><span>{c}</span><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Ubah kategori ${c}`} onClick={() => { setCategoryEdit(c); setCategoryName(c); }}><Pencil className="h-3 w-3" /></Button><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Hapus kategori ${c}`} onClick={() => { const error = deleteCategory(c); if (error) toast.error(error); else toast.success("Kategori dihapus"); }}><Trash2 className="h-3 w-3" /></Button></div>)}</div>
        <div className="flex gap-2"><Input aria-label="Nama kategori" placeholder="Nama kategori baru" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /><Button onClick={() => { if (!categoryName.trim()) return; if (categoryEdit) renameCategory(categoryEdit, categoryName); else addCategory(categoryName); setCategoryName(""); setCategoryEdit(null); toast.success("Kategori disimpan"); }}>{categoryEdit ? "Simpan Kategori" : "Tambah Kategori"}</Button>{categoryEdit && <Button variant="outline" onClick={() => { setCategoryEdit(null); setCategoryName(""); }}>Batal</Button>}</div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className={cn("flex gap-3 rounded-xl border p-3", !p.active && "opacity-60")}>
            <img src={p.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
            <div className="min-w-0 flex-1 text-sm">
              <p className="truncate font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.category}</p>
              <p className="mt-1 font-medium text-primary">{formatIDR(p.price)}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", p.stock <= 5 ? "bg-accent/15 text-accent" : "bg-success/15 text-success")}>Stok {p.stock}</span>
                <Switch checked={p.active} onCheckedChange={(c) => { saveProduct({ ...p, active: c }); toast.success(c ? "Produk diaktifkan" : "Produk dinonaktifkan"); }} aria-label="Status aktif" />
                <div className="ml-auto flex">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEdit(p)} aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDel(p)} aria-label="Hapus"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-serif text-2xl text-primary">{products.some((p) => p.id === edit?.id) ? "Edit Produk" : "Tambah Produk"}</DialogTitle></DialogHeader>
          {edit && (
            <div className="grid gap-3">
              <div className="space-y-1.5"><Label htmlFor="product-name">Nama Produk</Label><Input id="product-name" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Kategori</Label>
                <Input aria-label="Kategori produk" list="product-categories" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })} /><datalist id="product-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist></div>
              <div className="space-y-1.5"><Label>Status Badge</Label><Select value={edit.badge ?? (edit.tags.includes("express") ? "Same-Day" : edit.stock <= 5 ? "Slot Terbatas" : "Ready Stock")} onValueChange={(v) => setEdit({ ...edit, badge: v as Product["badge"], tags: v === "Same-Day" ? [...new Set([...edit.tags, "express" as const])] : edit.tags.filter((t) => t !== "express") })}><SelectTrigger aria-label="Status Badge"><SelectValue /></SelectTrigger><SelectContent>{["Ready Stock", "Slot Terbatas", "Same-Day"].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label htmlFor="product-price">Harga (Rp)</Label><Input id="product-price" type="number" value={edit.price || ""} onChange={(e) => setEdit({ ...edit, price: +e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Stok / Slot</Label><Input type="number" value={edit.stock} onChange={(e) => setEdit({ ...edit, stock: +e.target.value })} /></div>
              </div>
              <div className="space-y-1.5"><Label htmlFor="product-image">URL Gambar</Label><Input id="product-image" value={edit.image} onChange={(e) => setEdit({ ...edit, image: e.target.value })} /></div>
              <div className="space-y-1.5"><Label htmlFor="product-description">Deskripsi Singkat</Label><Textarea id="product-description" value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} /></div>
              <label className="flex items-center justify-between rounded-lg border p-3 text-sm">Status Aktif<Switch checked={edit.active} onCheckedChange={(c) => setEdit({ ...edit, active: c })} /></label>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setEdit(null)}>Batal</Button><Button onClick={save}>Simpan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!del} onOpenChange={(o) => !o && setDel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Hapus "{del?.name}"?</AlertDialogTitle><AlertDialogDescription>Produk akan dihapus dari katalog toko. Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (del) { deleteProduct(del.id); toast.success("Produk dihapus"); } }}>Hapus</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Panel>
  );
}

function Customers() {
  const { users, orders } = useStore();
  const rows = users.filter((u) => u.role === "customer").map((u) => {
    const mine = orders.filter((o) => o.customerEmail === u.email);
    return { ...u, count: mine.length, ltv: mine.reduce((t, o) => t + o.total, 0) };
  });
  return (
    <Panel>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">{["Nama", "Email", "WhatsApp", "Kota", "Pesanan", "Total Belanja", ""].map((h) => <th key={h} className="px-2 py-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{rows.map((u) => (
            <tr key={u.email} className="border-b last:border-0">
              <td className="px-2 py-3 font-medium">{u.name}</td><td className="px-2 py-3">{u.email}</td><td className="px-2 py-3">+{u.phone}</td>
              <td className="px-2 py-3">{u.city}</td><td className="px-2 py-3">{u.count}</td><td className="px-2 py-3 font-semibold text-primary">{formatIDR(u.ltv)}</td>
              <td className="px-2 py-3"><Button asChild size="sm" variant="outline" className="text-success hover:text-success"><a href={waLink(u.phone, `Halo ${u.name}, salam hangat dari Kalandra!`)} target="_blank" rel="noreferrer"><MessageCircle className="mr-1 h-3.5 w-3.5" />Chat</a></Button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Panel>
  );
}

function SettingsView() {
  const { settings, updateSettings, resetDemo } = useStore();
  const [draft, setDraft] = useState(settings);
  const fields = [
    ["storeName", "Nama Toko"], ["storeTagline", "Tagline"], ["whatsappNumber", "Nomor WhatsApp (format 628xxx)"],
    ["instagramUrl", "Link Instagram"], ["tiktokUrl", "Link TikTok"], ["heroHeadline", "Judul Hero Banner"],
    ["heroSubheadline", "Subtitle Hero Banner"], ["heroImage", "URL Gambar Hero Banner"],
    ["footerDescription", "Deskripsi Footer"], ["operatingHours", "Jam Operasional"],
  ] as const;
  const save = () => {
    const number = draft.whatsappNumber.replace(/\D/g, "");
    if (!/^628\d{7,12}$/.test(number)) return void toast.error("Gunakan nomor WhatsApp dengan format 628xxx");
    if (!draft.storeName.trim()) return void toast.error("Nama toko wajib diisi");
    for (const key of ["instagramUrl", "tiktokUrl", "heroImage"] as const) {
      if (draft[key] === settings[key]) continue;
      try { const url = new URL(draft[key]); if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error(); }
      catch { return void toast.error("Gunakan URL lengkap http:// atau https://"); }
    }
    updateSettings({ ...draft, whatsappNumber: number, storeOpen: settings.storeOpen, citySlots: settings.citySlots });
    toast.success("Pengaturan toko disimpan");
  };
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel className="space-y-4">
        <h2 className="font-serif text-xl text-primary">Identitas & Kontak Toko</h2>
        {fields.map(([key, label]) => <div key={key} className="space-y-1.5"><Label htmlFor={key}>{label}</Label>{key === "heroSubheadline" || key === "footerDescription" ? <Textarea id={key} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} /> : <Input id={key} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />}</div>)}
        <Button onClick={save}>Simpan Pengaturan</Button>
        <label className="flex items-center justify-between rounded-lg border p-4">
          <span><span className="block font-medium">Status PO Hari Raya</span><span className="text-sm text-muted-foreground">{settings.storeOpen ? "Buka — pelanggan bisa checkout" : "Tutup — banner tampil di toko"}</span></span>
          <Switch checked={settings.storeOpen} onCheckedChange={(c) => updateSettings({ storeOpen: c })} />
        </label>
        <Button variant="outline" onClick={() => { resetDemo(); toast.success("Data demo direset"); }}>Reset Data Demo</Button>
      </Panel>
      <Panel>
        <h2 className="font-serif text-xl text-primary">Slot Pengiriman per Kota (harian)</h2>
        <div className="mt-4 space-y-3">
          {CITIES.map((c) => (
            <div key={c} className="flex items-center justify-between gap-3">
              <span className="text-sm">{c}</span>
              <Input type="number" className="w-24" value={settings.citySlots[c] ?? 0} onChange={(e) => updateSettings({ citySlots: { ...settings.citySlots, [c]: +e.target.value } })} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
