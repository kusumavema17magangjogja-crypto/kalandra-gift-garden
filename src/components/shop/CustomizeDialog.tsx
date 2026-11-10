import { useEffect, useState } from "react";
import { CalendarIcon, MessageCircle, ShoppingBag, Check, MapPin } from "lucide-react";
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
import { ADDONS, SHIPPING_FEE, addonsTotal, buildWaMessage, formatDate, formatIDR, waLink, type Order, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CARD_TEMPLATES, RIBBONS } from "@/data/floristData";

const MAX = 200;

// 4 Desain kartu unggulan siap pilih langsung di pratinjau
const FEATURED_CARDS = [
  { id: "classic", label: "Classic", desc: "Floral Serif", border: "border-primary/40 bg-[#FDFBF7]" },
  { id: "gold", label: "Gold", desc: "Luxury Border", border: "border-[#D4AF37] bg-[#FFFDF9]" },
  { id: "minimal", label: "Minimal", desc: "Clean Sans", border: "border-neutral-400 bg-white" },
  { id: "romance", label: "Romance", desc: "Blush Rose", border: "border-[#B76E79]/50 bg-[#FFF9F9]" },
];

export function CustomizeDialog({ product, onOpenChange }: { product: Product | null; onOpenChange: (o: boolean) => void }) {
  const { addToCart, setCartOpen, city, settings, user, recordOrder, isAdmin } = useStore();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [message, setMessage] = useState("");
  const [ribbon, setRibbon] = useState("emerald");
  const [cardTemplate, setCardTemplate] = useState("classic");
  const [date, setDate] = useState<Date | undefined>();
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setTo("");
      setFrom(user?.name.split(" ")[0] ?? "");
      setSenderAddress(user?.address ?? "");
      setMessage("");
      setRibbon("emerald");
      setCardTemplate("classic");
      setDate(new Date(Date.now() + 864e5));
      setAddons([]);
      setQty(1);
    }
  }, [product, user]);

  if (!product) return null;
  const total = (product.price + addonsTotal(addons)) * qty;
  const custom = {
    to,
    from,
    senderAddress,
    message,
    ribbon,
    cardTemplate,
    deliveryDate: date?.toISOString() ?? "",
    addons,
    qty,
  };

  const add = () => {
    if (isAdmin) return;
    if (!to.trim() || !from.trim() || !date) {
      return void toast.error("Lengkapi nama penerima, pengirim, dan tanggal kirim");
    }
    const error = addToCart({
      key: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      image: product.image,
      basePrice: product.price,
      ...custom,
    });
    if (error) return void toast.error(error);
    toast.success("Ditambahkan ke keranjang");
    onOpenChange(false);
    setCartOpen(true);
  };

  const instantOrder = () => {
    if (isAdmin) return;
    if (!to.trim() || !from.trim() || !date) {
      return void toast.error("Lengkapi nama penerima, pengirim, dan tanggal kirim");
    }
    const subtotal = total;
    const shipping = SHIPPING_FEE[city] ?? 30000;
    const order: Order = {
      id: "KLD-" + crypto.randomUUID(),
      customerName: user?.name ?? from ?? "Pelanggan",
      customerEmail: user?.email ?? "guest@kalandra.id",
      phone: user?.phone ?? "-",
      city,
      address: senderAddress.trim() || user?.address || "-",
      items: [
        {
          key: crypto.randomUUID(),
          productId: product.id,
          name: product.name,
          image: product.image,
          basePrice: product.price,
          ...custom,
        },
      ],
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "Menunggu Pembayaran",
      createdAt: new Date().toISOString(),
      deliveryDate: custom.deliveryDate,
    };
    recordOrder(order);
    toast.success(`Pesanan ${order.id} tercatat — lanjutkan konfirmasi via WhatsApp`);
    window.open(waLink(settings.whatsappNumber, buildWaMessage(product, custom, city)), "_blank", "noreferrer");
  };

  const activeRibbon = RIBBONS.find((r) => r.id === ribbon) ?? RIBBONS[0];

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] max-w-5xl overflow-y-auto p-0">
        <div className="grid md:grid-cols-2">
          {/* KOLOM KIRI: FORM DATA */}
          <div className="space-y-4 p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl text-primary">{product.name}</DialogTitle>
              <DialogDescription>{product.category} · {formatIDR(product.price)}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="gift-to">Untuk (To)</Label>
                <Input id="gift-to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Ibu Ratna" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gift-from">Dari (From)</Label>
                <Input id="gift-from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Sari" />
              </div>
            </div>

            {/* INPUT ALAMAT PENGIRIM */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <Label htmlFor="sender-address">Alamat Pengirim</Label>
                <span className="text-[11px] text-muted-foreground">(Ditampilkan di kartu)</span>
              </div>
              <Input
                id="sender-address"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                placeholder="Contoh: Jl. Kaliurang Km 5, Sleman, Yogyakarta"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label>Pesan Kartu Ucapan</Label>
                <span className="text-xs text-muted-foreground">{message.length}/{MAX}</span>
              </div>
              <Textarea rows={3} maxLength={MAX} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Selamat ulang tahun…" />
            </div>

            {/* PALET BULAT 25 WARNA PITA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pilihan Warna Pita</Label>
                <span className="text-xs font-medium text-muted-foreground">
                  {activeRibbon.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 rounded-xl border border-border/60 bg-muted/20 p-2.5">
                {RIBBONS.map((r) => {
                  const isSelected = ribbon === r.id;
                  const isLight = ["ivory", "peach", "baby-blue", "silver"].includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      title={r.label}
                      onClick={() => setRibbon(r.id)}
                      className={cn(
                        "relative flex h-7 w-7 items-center justify-center rounded-full border border-black/10 shadow-sm transition-all duration-150",
                        isSelected
                          ? "scale-115 ring-2 ring-primary ring-offset-2 shadow-md"
                          : "opacity-85 hover:scale-105 hover:opacity-100"
                      )}
                      style={{ backgroundColor: r.hex }}
                    >
                      {isSelected && (
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            isLight ? "bg-black/80" : "bg-white"
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div className="space-y-1.5">
                <Label>Tanggal Pengiriman</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? formatDate(date.toISOString()) : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date(new Date().toDateString())}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5">
                <Label>Jumlah</Label>
                <Input
                  type="number"
                  min={1}
                  className="w-20"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, +e.target.value))}
                />
              </div>
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

          {/* KOLOM KANAN: 4 PILIHAN DESAIN KARTU + PREVIEW INTERAKTIF */}
          <div className="flex flex-col gap-4 bg-secondary/60 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pilih Desain Kartu Ucapan
                </p>
                <span className="text-[11px] font-medium text-primary">
                  {CARD_TEMPLATES.find((t) => t.id === cardTemplate)?.label}
                </span>
              </div>

              {/* 4 MODEL KARTU INTERAKTIF */}
              <div className="grid grid-cols-4 gap-2">
                {FEATURED_CARDS.map((card) => {
                  const isChosen = cardTemplate === card.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setCardTemplate(card.id)}
                      className={cn(
                        "relative flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-all duration-200",
                        card.border,
                        isChosen
                          ? "ring-2 ring-primary ring-offset-1 shadow-sm font-semibold scale-[1.03]"
                          : "opacity-75 hover:opacity-100 hover:border-primary/50"
                      )}
                    >
                      {isChosen && (
                        <div className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-white">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                      )}
                      <span className="text-xs text-foreground font-serif">{card.label}</span>
                      <span className="text-[10px] text-muted-foreground">{card.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PREVIEW KARTU UTAMA LENGKAP DENGAN PROPS ALAMAT */}
            <GreetingCard
              to={to}
              from={from}
              senderAddress={senderAddress}
              message={message}
              ribbon={ribbon}
              cardTemplate={cardTemplate}
            />

            {!isAdmin && (
              <div className="mt-auto space-y-3 rounded-xl bg-card p-4 shadow-soft">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total ({qty}x)</span>
                  <span className="font-serif text-2xl font-semibold text-primary">{formatIDR(total)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={add} disabled={!settings.storeOpen}>
                  <ShoppingBag className="mr-2 h-4 w-4" />Tambah ke Keranjang
                </Button>
                <Button variant="outline" size="lg" className="w-full border-success text-success hover:bg-success/10 hover:text-success" onClick={instantOrder}>
                  <MessageCircle className="mr-2 h-4 w-4" />Pesan via WhatsApp Langsung
                </Button>
                {!settings.storeOpen && <p className="text-center text-xs text-destructive">PO sedang ditutup sementara.</p>}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
