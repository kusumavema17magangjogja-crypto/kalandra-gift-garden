import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Gift, Leaf, Search, ShoppingBag, User as UserIcon, MessageCircle, PackageSearch, ShieldCheck, LogOut, Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { CITIES, formatDate, formatIDR, waLink } from "@/lib/data";
import { StatusBadge } from "./StatusBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NAV = [
  { label: "Koleksi Hampers", hash: "katalog" },
  { label: "Seserahan & Mahar", hash: "seserahan" },
  { label: "Parsel Hari Raya", hash: "katalog" },
  { label: "Galeri Bukti Jadi", hash: "galeri" },
];

function TrackDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { orders } = useStore();
  const [q, setQ] = useState("");
  const found = orders.find((o) => o.id.toLowerCase() === q.trim().toLowerCase());
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-serif text-2xl text-primary">Lacak Pesanan</DialogTitle><DialogDescription>Masukkan nomor invoice, contoh KLD-24051</DialogDescription></DialogHeader>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="KLD-xxxxx" />
        {q && (found ? (
          <div className="space-y-2 rounded-xl border bg-secondary p-4 text-sm">
            <div className="flex justify-between"><span className="font-semibold">{found.id}</span><StatusBadge status={found.status} /></div>
            <p>{found.items.map((i) => i.name).join(", ")}</p>
            <p className="text-muted-foreground">Kirim {formatDate(found.deliveryDate)} · {found.city} · {formatIDR(found.total)}</p>
          </div>
        ) : <p className="text-sm text-muted-foreground">Pesanan tidak ditemukan.</p>)}
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  const s = useStore();
  const navigate = useNavigate();
  const [track, setTrack] = useState(false);
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const results = useMemo(
    () => (q.length < 2 ? [] : s.products.filter((p) => p.active && (p.name + p.category).toLowerCase().includes(q.toLowerCase())).slice(0, 5)),
    [q, s.products],
  );
  const go = (hash: string) => navigate({ to: "/", hash });

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs">
          <div className="hidden gap-6 lg:flex">
            <span>🎁 Free Custom Greeting Card & Pita Eksklusif</span>
            <span>🚚 Pengiriman Instan & Antar Kota</span>
            <span>📸 Kirim Foto Rangkaian Sebelum Diantar</span>
          </div>
          <span className="lg:hidden">🎁 Free Greeting Card · 📸 Foto Sebelum Diantar</span>
          <div className="flex items-center gap-3">
            <Select value={s.city} onValueChange={s.setCity}>
              <SelectTrigger className="h-7 w-36 border-primary-foreground/30 bg-transparent text-xs text-primary-foreground"><MapPin className="h-3 w-3" /><SelectValue /></SelectTrigger>
              <SelectContent>{CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <a href={waLink(s.settings.whatsappNumber, `Halo ${s.settings.storeName}, saya ingin bertanya.`)} target="_blank" rel="noreferrer" className="hidden items-center gap-1 hover:underline sm:flex"><MessageCircle className="h-3.5 w-3.5" />CS WhatsApp</a>
            <button onClick={() => setTrack(true)} className="flex items-center gap-1 hover:underline"><PackageSearch className="h-3.5 w-3.5" />Lacak</button>
          </div>
        </div>
      </div>
      {!s.settings.storeOpen && <div className="bg-accent py-1.5 text-center text-xs font-medium text-accent-foreground">PO Hari Raya sedang ditutup — pemesanan via keranjang dinonaktifkan sementara.</div>}
      <div className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="left">
              <SheetHeader><SheetTitle className="font-serif text-xl text-primary">{s.settings.storeName}</SheetTitle></SheetHeader>
              <nav className="mt-4 flex flex-col gap-3">{NAV.map((n) => <button key={n.label} className="text-left" onClick={() => go(n.hash)}>{n.label}</button>)}
                 </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Gift className="h-5 w-5" /><Leaf className="absolute -right-1 -top-1 h-4 w-4 text-rose" /></span>
            <span className="min-w-0 break-words leading-tight"><span className="block font-serif text-xl font-semibold text-primary">{s.settings.storeName}</span><span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.settings.storeTagline}</span></span>
          </Link>
          <nav className="hidden flex-1 justify-center gap-6 text-sm font-medium lg:flex">
            {NAV.map((n) => <button key={n.label} onClick={() => go(n.hash)} className="text-foreground/80 hover:text-accent">{n.label}</button>)}
          </nav>
          <div className="relative ml-auto hidden w-56 md:block lg:ml-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Cari hampers…" value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)} />
            {focus && q.length >= 2 && (
              <div className="absolute inset-x-0 top-11 z-50 overflow-hidden rounded-lg border bg-popover shadow-lift">
                {results.length === 0 ? <p className="p-3 text-sm text-muted-foreground">Tidak ada hasil</p> : results.map((p) => (
                  <button key={p.id} className="flex w-full items-center gap-3 p-2 text-left hover:bg-secondary" onMouseDown={() => { setQ(""); window.dispatchEvent(new CustomEvent("kalandra:customize", { detail: p.id })); }}>
                    <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" /><span className="text-sm"><span className="block font-medium">{p.name}</span><span className="text-xs text-muted-foreground">{formatIDR(p.price)}</span></span>
                  </button>
                ))}
              </div>
            )}
          </div>
           <TooltipProvider delayDuration={250}><div className="ml-auto flex shrink-0 items-center gap-0 sm:gap-1 md:ml-0">
             <Tooltip><TooltipTrigger asChild><Button asChild variant="ghost" size="icon" className="text-muted-foreground" aria-label="Portal Admin"><Link to="/admin"><ShieldCheck className="h-[18px] w-[18px]" /></Link></Button></TooltipTrigger><TooltipContent>Portal Admin</TooltipContent></Tooltip>
            {s.user ? (
              <DropdownMenu>
                 <Tooltip><TooltipTrigger asChild><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Akun"><UserIcon className="h-5 w-5" /></Button></DropdownMenuTrigger></TooltipTrigger><TooltipContent>Akun</TooltipContent></Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{s.user.name}</DropdownMenuLabel><DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/profile"><UserIcon className="mr-2 h-4 w-4" />Profil Saya</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/profile" search={{ tab: "orders" }}><PackageSearch className="mr-2 h-4 w-4" />Riwayat Pesanan</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { s.logout(); navigate({ to: "/" }); }}><LogOut className="mr-2 h-4 w-4" />Keluar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
             ) : <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label="Akun" onClick={() => s.setAuthOpen("login")}><UserIcon className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent>Akun</TooltipContent></Tooltip>}
            <Button variant="ghost" size="icon" className="relative" onClick={() => s.setCartOpen(true)} aria-label="Keranjang">
              <ShoppingBag />
              {s.cartCount > 0 && <span key={s.cartCount} className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{s.cartCount}</span>}
            </Button>
           </div></TooltipProvider>
        </div>
      </div>
      <TrackDialog open={track} onOpenChange={setTrack} />
    </header>
  );
}

export function SiteFooter() {
  const { settings } = useStore();
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div><p className="font-serif text-2xl">{settings.storeName} {settings.storeTagline}</p><p className="mt-2 text-sm text-primary-foreground/70">{settings.footerDescription}</p></div>
        <div className="text-sm text-primary-foreground/80"><p className="font-semibold text-primary-foreground">Kota Layanan</p><p className="mt-2">{CITIES.join(" · ")}</p></div>
        <div className="text-sm text-primary-foreground/80"><p className="font-semibold text-primary-foreground">Jam Operasional</p><p className="mt-2">{settings.operatingHours}</p></div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap gap-5 px-4 pb-8 text-sm"><a href={waLink(settings.whatsappNumber, `Halo ${settings.storeName}, saya ingin bertanya.`)} target="_blank" rel="noreferrer">WhatsApp</a><a href={settings.instagramUrl} target="_blank" rel="noreferrer">Instagram</a><a href={settings.tiktokUrl} target="_blank" rel="noreferrer">TikTok</a></div>
      <p className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">© 2026 {settings.storeName}. All rights reserved.</p>
    </footer>
  );
}
