import { useEffect, useState } from "react";
import { CalendarIcon, MessageCircle, ShoppingBag, Check, Truck, Clock } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GreetingCard } from "./GreetingCard";
import { ADDONS, CITIES, SHIPPING_FEE, addonsTotal, buildWaMessage, formatDate, formatIDR, waLink, type Order, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CARD_TEMPLATES, RIBBONS } from "@/data/floristData";

const MAX = 200;

const FEATURED_CARDS = [
  { id: "classic", label: "Classic", desc: "Floral Serif", border: "border-primary/40 bg-[#FDFBF7]" },
  { id: "gold", label: "Gold", desc: "Luxury Border", border: "border-[#D4AF37] bg-[#FFFDF9]" },
  { id: "minimal", label: "Minimal", desc: "Clean Sans", border: "border-neutral-400 bg-white" },
  { id: "romance", label: "Romance", desc: "Blush Rose", border: "border-[#B76E79]/50 bg-[#FFF9F9]" },
];

const DELIVERY_SLOTS = [
  "Pagi (08:00 – 11:00)",
  "Siang (11:00 – 15:00)",
  "Sore (15:00 – 19:00)",
];

export function CustomizeDialog({ product, onOpenChange }: { product: Product | null; onOpenChange: (o: boolean) => void }) {
  const { addToCart, setCartOpen, city, setCity, settings, user, recordOrder } = useStore();
  const [to, setTo] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [ribbon, setRibbon] = useState("emerald");
  const [cardTemplate, setCardTemplate] = useState("classic");
  const [date, setDate] = useState<Date | undefined>();
  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[0]);
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setTo("");
      setRecipientPhone("");
      setRecipientAddress("");
      setFrom(user?.name.split(" ")[0] ?? "");
      setMessage("");
      setRibbon("emerald");
      setCardTemplate("classic");
      setDate(new Date(Date.now() + 864e5));
      setDeliverySlot(DELIVERY_SLOTS[0]);
      setAddons([]);
      setQty(1);
    }
  }, [product, user]);

  if (!product) return null;
  const total = (product.price + addonsTotal(addons)) * qty;
  const currentShipping = SHIPPING_FEE[city] ?? 30000;

  const custom = {
    to,
    recipientPhone,
    recipientAddress,
    recipientCity: city,
    from,
    message,
    ribbon,
    cardTemplate,
    deliveryDate: date?.toISOString() ?? "",
    deliverySlot,
    addons,
    qty,
  };

  const validateForm = () => {
    if (!to.trim() || !from.trim() || !date) {
      toast.error("Lengkapi nama penerima, nama pengirim, dan tanggal kirim");
      return false;
    }
    if (!recipientAddress.trim()) {
      toast.error("Lengkapi alamat lengkap tujuan pengiriman (penerima)");
      return false;
    }
    return true;
  };

  const add = () => {
    if (!validateForm()) return;
    const error = addToCart({
      key: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      image: product.image,
      basePrice: product.price,
      ...custom,
    });
    if (error) return void toast.error(error);
    toast.success(`Ditambahkan ke keranjang (Tujuan: ${city})`);
    onOpenChange(false);
    setCartOpen(true);
  };

  const instantOrder = () => {
    if (!validateForm()) return;
    const subtotal = total;
    const shipping = currentShipping;
    const fullAddressWithCity = `${recipientAddress.trim()} (${city})`;

    const order: Order = {
      id: "KLD-" + crypto.randomUUID(),
      customerName: user?.name ?? from ?? "Pelanggan",
      customerEmail: user?.email ?? "guest@kalandra.id",
      phone: recipientPhone.trim() || user?.phone || "-",
      city,
      address: fullAddressWithCity,
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

    const baseWaText = buildWaMessage(product, custom, city);
    const extraDetails = [
      ``,
      `*Detail Pengiriman & Kartu:*`,
      `• Penerima: ${to.trim()}${recipientPhone.trim() ? ` (${recipientPhone.trim()})` : ""}`,
      `• Kota Tujuan: ${city} (Ongkir: ${formatIDR(shipping)})`,
      `• Alamat Tujuan: ${recipientAddress.trim()}`,
      `• Sesi Waktu: ${deliverySlot}`,
      `• Pengirim: ${from.trim()}`,
      `• Desain Kartu: ${CARD_TEMPLATES.find((t) => t.id === cardTemplate)?.label ?? cardTemplate}`,
    ].join("\n");

    window.open(waLink(settings.whatsappNumber, `${baseWaText}\n${extraDetails}`), "_blank", "noreferrer");
  };

  const activeRibbon = RIBBONS.find((r) => r.id === ribbon) ?? RIBBONS[0];

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto p-0">
        <div className="grid md:grid-cols-2">
          {/* KOLOM KIRI: FORM DATA */}
          <div className="space-y-4 p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl text-primary">{product.name}</DialogTitle>
              <DialogDescription>{product.category} · {formatIDR(product.price)}</DialogDescription>
            </DialogHeader>

            {/* DATA PENERIMA, KOTA & ALAMAT TUJUAN (TERINTEGRASI ONGKIR) */}
            <div className="space-y-3 rounded-xl border border-primary/20 bg-primary/[0.03] p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Truck className="h-3.5 w-3.5" /> Tujuan Pengiriman (Penerima)
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="gift-to">Nama Penerima *</Label>
                  <Input id="gift-to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Ibu Ratna" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="recipient-phone">No. WA Penerima</Label>
                  <Input
                    id="recipient-phone"
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                  />
                </div>
              </div>

              {/* DROPDOWN KOTA TUJUAN YANG SINKRON DENGAN ONGKIR */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recipient-city">Kota Tujuan Pengiriman *</Label>
                  <span className="text-[11px] font-medium text-primary">
                    Ongkir: {formatIDR(currentShipping)}
                  </span>
                </div>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="recipient-city" className="bg-background">
                    <SelectValue placeholder="Pilih kota tujuan" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c} — Ongkir {formatIDR(SHIPPING_FEE[c] ?? 30000)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="recipient-address">Alamat Lengkap Penerima *</Label>
                <Textarea
                  id="recipient-address"
                  rows={2}
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah/gedung, patokan, kecamatan..."
                />
              </div>
            </div>

            {/* DATA PENGIRIM (HANYA NAMA) */}
            <div className="space-y-1.5">
              <Label htmlFor="gift-from">Nama Pengirim (From) *</Label>
              <Input id="gift-from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Sari" />
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

            {/* TANGGAL, SESI JAM & JUMLAH */}
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div className="space-y-1.5">
                <Label>Tanggal Pengiriman *</Label>
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

            {/* PILIHAN SESI JAM PENGIRIMAN */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" /> Sesi Jam Pengiriman
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {DELIVERY_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setDeliverySlot(slot)}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-[11px] font-medium transition-all",
                      deliverySlot === slot
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "bg-card text-foreground hover:border-primary/50"
                    )}
                  >
                    {slot}
                  </button>
                ))}
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

          {/* KOLOM KANAN: PREVIEW & TOMBOL BELANJA */}
          <div className="flex flex-col justify-between gap-4 bg-secondary/60 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Pilih Desain Kartu Ucapan
                  </p>
                  <span className="text-[11px] font-medium text-primary">
                    {CARD_TEMPLATES.find((t) => t.id === cardTemplate)?.label}
                  </span>
                </div>

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

              {/* PREVIEW KARTU DENGAN ALAMAT & KOTA PENERIMA */}
              <GreetingCard
                to={to}
                recipientAddress={recipientAddress ? `${recipientAddress}, ${city}` : ""}
                from={from}
                message={message}
                ribbon={ribbon}
                cardTemplate={cardTemplate}
              />
            </div>

            {/* CONTAINER TOMBOL */}
            <div className="mt-4 space-y-3 rounded-xl border bg-card p-4 shadow-soft">
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal ({qty}x)</span>
                  <span className="font-semibold text-foreground">{formatIDR(total)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Estimasi Ongkir ({city})</span>
                  <span>+{formatIDR(currentShipping)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={add} disabled={!settings.storeOpen}>
                <ShoppingBag className="mr-2 h-4 w-4" />Tambah ke Keranjang
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-success text-success hover:bg-success/10 hover:text-success"
                onClick={instantOrder}
              >
                <MessageCircle className="mr-2 h-4 w-4" />Pesan via WhatsApp Langsung
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Foto hasil jadi rangkaian & kartu akan dikirim via WA sebelum kurir berangkat.
              </p>
              {!settings.storeOpen && (
                <p className="text-center text-xs text-destructive">PO sedang ditutup sementara.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
