import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SiteHeader, SiteFooter } from "@/components/shop/SiteHeader";
import { StatusBadge } from "@/components/shop/StatusBadge";
import { GreetingCard } from "@/components/shop/GreetingCard";
import { PasswordInput, StrengthBar } from "@/components/shop/AuthDialog";
import { useStore } from "@/lib/store";
import { formatDate, formatIDR, type CartItem } from "@/lib/data";

type Tab = "data" | "password" | "orders";

export const Route = createFileRoute("/profile")({
  validateSearch: (s: Record<string, unknown>): { tab?: Tab } => ({ tab: ["data", "password", "orders"].includes(s.tab as string) ? (s.tab as Tab) : undefined }),
  head: () => ({
    meta: [
      { title: "Profil Saya — Kalandra Hampers" },
      { name: "description", content: "Kelola data diri, password, dan riwayat pesanan hampers Anda." },
      { property: "og:title", content: "Profil Saya — Kalandra Hampers" },
      { property: "og:description", content: "Kelola akun dan lacak pesanan Kalandra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

function Profile() {
  const s = useStore();
  const { tab = "data" } = Route.useSearch();
  const navigate = useNavigate();
  const [card, setCard] = useState<CartItem | null>(null);
  const [f, setF] = useState({ name: "", email: "", phone: "", address: "" });
  const [pw, setPw] = useState({ cur: "", next: "", confirm: "" });

  useEffect(() => { if (s.user) setF({ name: s.user.name, email: s.user.email, phone: s.user.phone, address: s.user.address }); }, [s.user]);

  if (!s.user) {
    return (
      <div className="min-h-screen"><SiteHeader />
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="font-serif text-4xl text-primary">Masuk untuk melihat profil</h1>
          <Button className="mt-6" onClick={() => s.setAuthOpen("login")}>Masuk</Button>
        </div>
      </div>
    );
  }
  const myOrders = s.orders.filter((o) => o.customerEmail === s.user!.email);

  const savePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.cur !== s.user!.password) return toast.error("Password saat ini salah");
    if (pw.next.length < 8) return toast.error("Password baru minimal 8 karakter");
    if (pw.next !== pw.confirm) return toast.error("Konfirmasi tidak cocok");
    s.updateProfile({ password: pw.next }); setPw({ cur: "", next: "", confirm: "" }); toast.success("Password diperbarui");
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-serif text-5xl text-primary">Halo, {s.user.name.split(" ")[0]}</h1>
        <Tabs value={tab} onValueChange={(v) => navigate({ to: "/profile", search: { tab: v as Tab }, replace: true })} className="mt-8">
          <TabsList className="bg-secondary"><TabsTrigger value="data">Data Pribadi</TabsTrigger><TabsTrigger value="password">Ubah Password</TabsTrigger><TabsTrigger value="orders">Riwayat Pesanan</TabsTrigger></TabsList>
          <TabsContent value="data">
            <form onSubmit={(e) => { e.preventDefault(); s.updateProfile(f); toast.success("Profil disimpan"); }} className="mt-4 grid gap-4 rounded-2xl border bg-card p-6 shadow-soft sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Nama Lengkap</Label><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>WhatsApp</Label><Input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label>Alamat Pengiriman Default</Label><Textarea value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} /></div>
              <Button type="submit" className="sm:w-fit">Simpan Perubahan</Button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <form onSubmit={savePw} className="mt-4 max-w-md space-y-4 rounded-2xl border bg-card p-6 shadow-soft">
              <div className="space-y-1.5"><Label>Password Saat Ini</Label><PasswordInput value={pw.cur} onChange={(v) => setPw({ ...pw, cur: v })} /></div>
              <div className="space-y-1.5"><Label>Password Baru</Label><PasswordInput value={pw.next} onChange={(v) => setPw({ ...pw, next: v })} /></div>
              <StrengthBar value={pw.next} />
              <div className="space-y-1.5"><Label>Konfirmasi Password Baru</Label><PasswordInput value={pw.confirm} onChange={(v) => setPw({ ...pw, confirm: v })} /></div>
              <Button type="submit">Perbarui Password</Button>
            </form>
          </TabsContent>
          <TabsContent value="orders" className="mt-4 space-y-4">
            {myOrders.length === 0 && <p className="py-12 text-center text-muted-foreground">Belum ada pesanan.</p>}
            {myOrders.map((o) => (
              <div key={o.id} className="rounded-2xl border bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><p className="font-semibold">{o.id}</p><p className="text-xs text-muted-foreground">Dipesan {formatDate(o.createdAt)} · Kirim {formatDate(o.deliveryDate)} · {o.city}</p></div>
                  <StatusBadge status={o.status} />
                </div>
                <div className="mt-4 space-y-2">
                  {o.items.map((i) => (
                    <div key={i.key} className="flex items-center gap-3">
                      <img src={i.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <p className="flex-1 text-sm">{i.name} <span className="text-muted-foreground">x{i.qty}</span></p>
                      <Button size="sm" variant="outline" onClick={() => setCard(i)}><Eye className="mr-1 h-3.5 w-3.5" />Kartu Ucapan</Button>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-right font-serif text-xl text-primary">{formatIDR(o.total)}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
      <Dialog open={!!card} onOpenChange={(o) => !o && setCard(null)}>
        <DialogContent className="max-w-sm"><DialogHeader><DialogTitle className="font-serif text-2xl text-primary">Kartu Ucapan</DialogTitle></DialogHeader>
          {card && <GreetingCard to={card.to} from={card.from} message={card.message} ribbon={card.ribbon} />}</DialogContent>
      </Dialog>
    </div>
  );
}
