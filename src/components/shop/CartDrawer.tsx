import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, CheckCircle2, CreditCard, MapPin, Copy, Check, Info } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { ADDONS, SHIPPING_FEE, buildCartWaMessage, formatDate, formatIDR, itemTotal, ribbonLabel, RIBBONS, waLink, type Order } from "@/lib/data";
import { cardTemplateLabel } from "@/data/floristData";

type ExtendedCartItem = ReturnType<typeof useStore>["cart"][number] & {
  recipientAddress?: string;
  recipientPhone?: string;
  recipientCity?: string;
  deliverySlot?: string;
};

export function CartDrawer() {
  const s = useStore();
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  if (s.isAdmin) return null;

  const cartItems = s.cart as ExtendedCartItem[];

  // Hitung ongkir: jika tiap item punya kota tujuan unik, jumlahkan ongkir per tujuan unik; jika sama, pakai ongkir kota aktif
  const uniqueDestinations = Array.from(
    new Set(
      cartItems
        .map((item) => {
          const itemCity = item.recipientCity || s.city;
          const itemAddr = item.recipientAddress?.trim() || "";
          return itemAddr ? `${itemCity}::${itemAddr}` : "";
        })
        .filter(Boolean)
    )
  );

  const isMultiDestination = uniqueDestinations.length > 1;

  const calculatedShipping = isMultiDestination
    ? uniqueDestinations.reduce((sum, dest) => {
        const destCity = dest.split("::")[0];
        return sum + (SHIPPING_FEE[destCity] ?? s.shippingFee);
      }, 0)
    : s.shippingFee;

  const handleOpenChange = (open: boolean) => {
    if (!open) setCompletedOrder(null);
    s.setCartOpen(open);
  };

  const handleDirectCheckout = () => {
    const primaryItem = cartItems[0];

    // Gabungkan seluruh alamat tujuan jika multi-alamat, atau 1 alamat jika tujuan tunggal
    const combinedAddress = isMultiDestination
      ? cartItems
          .map((item, idx) => {
            const c = item.recipientCity || s.city;
            const a = item.recipientAddress?.trim() || "-";
            return `${idx + 1}. [${item.name} -> ${item.to}] (${c}) ${a}`;
          })
          .join(" | ")
      : primaryItem?.recipientAddress?.trim()
      ? `${primaryItem.recipientAddress.trim()} (${primaryItem.recipientCity || s.city})`
      : s.user?.address || "-";

    const resolvedPhone = primaryItem?.recipientPhone?.trim() || s.user?.phone || "-";

    const baseMessage = buildCartWaMessage(s.cart, s.city, calculatedShipping);
    const order = s.checkout();
    if (!order) return;

    // Sinkronkan alamat gabungan, total ongkir multi-tujuan, dan nomor kontak
    order.address = combinedAddress;
    order.phone = resolvedPhone;
    order.shipping = calculatedShipping;
    order.total = order.subtotal + calculatedShipping;

    const destinationLines = cartItems
      .map((item, idx) => {
        const c = item.recipientCity || s.city;
        const a = item.recipientAddress?.trim() || "-";
        const slot = item.deliverySlot ? ` | Sesi: ${item.deliverySlot}` : "";
        return `${idx + 1}. ${item.name} -> *${item.to}* (${c})\n   Alamat: ${a}${slot}`;
      })
      .join("\n");

    const fullWaMessage = [
      `*KONFIRMASI CHECKOUT — ${s.settings.storeName.toUpperCase()}*`,
      `No. Pesanan: *${order.id}*`,
      `Status: *Menunggu Pembayaran*`,
      ``,
      baseMessage,
      ``,
      `*Rincian Tujuan Pengiriman (${uniqueDestinations.length || 1} Lokasi):*`,
      destinationLines,
      ``,
      `Mohon info nomor rekening/QRIS untuk penyelesaian pembayaran. Terima kasih!`,
    ].join("\n");

    setCompletedOrder(order);
    toast.success(`Pesanan ${order.id} berhasil dibuat!`);
    sessionStorage.setItem(`wa_msg_${order.id}`, fullWaMessage);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    toast.success("Nomor pesanan disalin");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet open={s.cartOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-primary">
            {completedOrder ? "Checkout Berhasil" : "Keranjang Anda"}
          </SheetTitle>
        </SheetHeader>

        {/* TAMPILAN KONFIRMASI SETELAH CHECKOUT */}
        {completedOrder ? (
          <div className="flex flex-1 flex-col justify-between space-y-5 overflow-y-auto pt-4">
            <div className="space-y-4">
              <div className="rounded-2xl border border-success/30 bg-success/5 p-4 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
                <p className="mt-2 font-serif text-xl font-semibold text-foreground">
                  Pesanan Tercatat!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Status saat ini: <span className="font-semibold text-accent">Menunggu Pembayaran</span>
                </p>
                <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold">
                  <span>{completedOrder.id}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyId(completedOrder.id)}
                    className="text-muted-foreground hover:text-primary"
                    title="Salin Nomor Pesanan"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border bg-card p-4 text-xs">
                <p className="font-semibold uppercase tracking-wider text-muted-foreground">Ringkasan Tagihan</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Pembayaran</span>
                  <span className="font-serif text-lg font-bold text-primary">{formatIDR(completedOrder.total)}</span>
                </div>
                <Separator />
                <div className="flex items-start gap-1.5 pt-1 text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="whitespace-normal break-words leading-relaxed">
                    <strong className="text-foreground">Tujuan Pengiriman:</strong> {completedOrder.address}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-3.5 text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground">Langkah Selanjutnya:</p>
                <ol className="mt-1 list-inside list-decimal space-y-1">
                  <li>Klik tombol WhatsApp di bawah untuk mengirim detail pesanan & meminta rekening/QRIS admin.</li>
                  <li>Kirim bukti transfer di chat WhatsApp.</li>
                  <li>Admin akan memverifikasi pembayaran dan mengirimkan <strong>Struk Lunas</strong> ke WhatsApp Anda.</li>
                </ol>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Button
                className="w-full bg-success text-success-foreground hover:bg-success/90"
                size="lg"
                onClick={() => {
                  const savedMsg =
                    sessionStorage.getItem(`wa_msg_${completedOrder.id}`) ||
                    `Halo ${s.settings.storeName}, saya sudah checkout pesanan *${completedOrder.id}* total *${formatIDR(completedOrder.total)}* (Menunggu Pembayaran). Mohon info pembayaran.`;
                  window.open(waLink(s.settings.whatsappNumber, savedMsg), "_blank", "noreferrer");
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Kirim Notifikasi & Bayar via WA
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCompletedOrder(null);
                  s.setCartOpen(false);
                }}
              >
                Selesai & Tutup
              </Button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingBag className="h-10 w-10" />Keranjang masih kosong
          </div>
        ) : (
          <>
            <div className="-mx-6 flex-1 space-y-3 overflow-y-auto px-6">
              {/* INFO MULTI-TUJUAN JIKA ADA LEBIH DARI 1 ALAMAT */}
              {isMultiDestination && (
                <div className="flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/5 p-3 text-xs text-primary">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="leading-snug">
                    Terdapat <strong>{uniqueDestinations.length} alamat tujuan berbeda</strong> dalam keranjang. Ongkir otomatis disesuaikan untuk masing-masing tujuan pengiriman.
                  </p>
                </div>
              )}

              {cartItems.map((i) => {
                const itemCity = i.recipientCity || s.city;
                return (
                  <div key={i.key} className="flex gap-3 rounded-xl border bg-card p-3">
                    <img src={i.image} alt={i.name} className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1 space-y-1 text-sm">
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold">{i.name}</p>
                        <button onClick={() => s.removeFromCart(i.key)} aria-label="Hapus" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border border-black/10"
                          style={{ backgroundColor: RIBBONS.find((r) => r.id === i.ribbon)?.hex ?? RIBBONS[0].hex }}
                        />
                        Pita {ribbonLabel(i.ribbon)} · Kirim {formatDate(i.deliveryDate)}
                        {i.deliverySlot ? ` (${i.deliverySlot})` : ""}
                      </p>
                      <p className="truncate text-xs italic text-muted-foreground">"{i.message || "—"}" — untuk {i.to}</p>
                      {i.recipientAddress && (
                        <p className="line-clamp-2 flex items-start gap-1 text-[11px] leading-snug text-primary">
                          <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                          <span>
                            <strong>{itemCity}:</strong> {i.recipientAddress}
                          </span>
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">Kartu: {cardTemplateLabel(i.cardTemplate)}</p>
                      {i.addons.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          + {ADDONS.filter((a) => i.addons.includes(a.id)).map((a) => a.label).join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center rounded-md border">
                          <button className="p-1" onClick={() => s.updateQty(i.key, i.qty - 1)} aria-label="Kurangi">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs">{i.qty}</span>
                          <button className="p-1" onClick={() => s.updateQty(i.key, i.qty + 1)} aria-label="Tambah">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-semibold text-primary">{formatIDR(itemTotal(i))}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2.5 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatIDR(s.cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {isMultiDestination ? `Ongkir (${uniqueDestinations.length} Tujuan)` : `Ongkir (${s.city})`}
                </span>
                <span>{formatIDR(calculatedShipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="font-serif text-xl text-primary">{formatIDR(s.cartSubtotal + calculatedShipping)}</span>
              </div>

              <Button className="w-full" size="lg" onClick={handleDirectCheckout} disabled={!s.settings.storeOpen}>
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout Sekarang
              </Button>

              <Button
                variant="outline"
                className="w-full border-success/40 text-success hover:bg-success/10 hover:text-success"
                onClick={() => {
                  const message = buildCartWaMessage(s.cart, s.city, calculatedShipping);
                  window.open(
                    waLink(s.settings.whatsappNumber, `Halo ${s.settings.storeName}, saya ingin tanya-tanya dulu mengenai pesanan ini:\n\n${message}`),
                    "_blank",
                    "noreferrer"
                  );
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Tanya Admin via WhatsApp
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
