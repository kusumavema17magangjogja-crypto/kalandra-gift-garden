import { useEffect, useState } from "react";
import { CalendarIcon, MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GreetingCard } from "./GreetingCard";
import { ADDONS, RIBBONS, addonsTotal, buildWaMessage, formatDate, formatIDR, waLink, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const MAX = 200;

export function CustomizeDialog({ product, onOpenChange }: { product: Product | null; onOpenChange: (o: boolean) => void }) {
  const { addToCart, setCartOpen, city, settings, user } = useStore();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [ribbon, setRibbon] = useState("emerald");
  const [date, setDate] = useState<Date | undefined>();
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setTo(""); setFrom(user?.name.split(" ")[0] ?? ""); setMessage(""); setRibbon("emerald");
      setDate(new Date(Date.now() + 864e5)); setAddons([]); setQty(1);
    }
  }, [product, user]);

  if (!product) return null;
  const total = (product.price + addonsTotal(addons)) * qty;
  const custom = { to, from, message, ribbon, deliveryDate: date?.toISOString() ?? "", addons, qty };

  const add = () => {
    if (!to || !from || !date) return void toast.error("Lengkapi nama penerima, pengirim, dan tanggal kirim");
    addToCart({ key: crypto.randomUUID(), productId: product.id, name: product.name, image: product.image, basePrice: product.price, ...custom });
    toast.success("Ditambahkan ke keranjang");
    onOpenChange(false);
    setCartOpen(true);
  };

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto p-0">
        <div className="grid md:grid-cols-2">
          <div className="space-y-5 p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl text-primary">{product.name}</DialogTitle>
              <DialogDescription>{product.category} · {formatIDR(product.price)}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Untuk (To)</Label><Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Ibu Ratna" /></div>
              <div className="space-y-1.5"><Label>Dari (From)</Label><Input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Sari" /></div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between"><Label>Pesan Kartu Ucapan</Label><span className="text-xs text-muted-foreground">{message.length}/{MAX}</span></div>
              <Textarea rows={4} maxLength={MAX} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Selamat ulang tahun…" />
            </div>
            <div className="space-y-2">
              <Label>Warna Pita</Label>
              <div className="grid grid-cols-2 gap-2">
                {RIBBONS.map((r) => (
                  <button key={r.id} type="button" onClick={() => setRibbon(r.id)}
                    className={cn("flex items-center gap-2 rounded-lg border p-2 text-sm transition", ribbon === r.id ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40")}>
                    <span className={cn("h-5 w-5 rounded-full", r.className)} />{r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div className="space-y-1.5">
                <Label>Tanggal Pengiriman</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{date ? formatDate(date.toISOString()) : "Pilih tanggal"}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date(new Date().toDateString())} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5"><Label>Jumlah</Label><Input type="number" min={1} className="w-20" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value))} /></div>
            </div>
            <div className="space-y-2">
              <Label>Add-ons</Label>
              {ADDONS.map((a) => (
                <label key={a.id} className="flex cursor-pointer items-center justify-between rounded-lg border p-2.5 text-sm hover:bg-secondary">
                  <span className="flex items-center gap-2">
                    <Checkbox checked={addons.includes(a.id)} onCheckedChange={(c) => setAddons((p) => (c ? [...p, a.id] : p.filter((x) => x !== a.id)))} />
                    {a.label}
                  </span>
                  <span className="text-muted-foreground">+{formatIDR(a.price)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 bg-secondary p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pratinjau Kartu Ucapan</p>
            <GreetingCard to={to} from={from} message={message} ribbon={ribbon} />
            <div className="mt-auto space-y-3 rounded-xl bg-card p-4 shadow-soft">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total ({qty}x)</span><span className="font-serif text-2xl font-semibold text-primary">{formatIDR(total)}</span></div>
              <Button className="w-full" size="lg" onClick={add} disabled={!settings.storeOpen}><ShoppingBag className="mr-2 h-4 w-4" />Tambah ke Keranjang</Button>
              <Button asChild variant="outline" size="lg" className="w-full border-success text-success hover:bg-success/10 hover:text-success">
                <a href={waLink(settings.waNumber, buildWaMessage(product, custom, city))} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Pesan via WhatsApp Langsung</a>
              </Button>
              {!settings.storeOpen && <p className="text-center text-xs text-destructive">PO sedang ditutup sementara.</p>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
