import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, CheckCircle2, CreditCard, MapPin, Copy, Check, Info, Landmark } from "lucide-react";
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
  senderPhone?: string;
  deliverySlot?: string;
};

const BANK_ACCOUNTS = [
  { bank: "BCA", number: "8465192044", holder: "CV Kalandra Florist Indonesia" },
  { bank: "Mandiri", number: "1370019284752", holder: "CV Kalandra Florist Indonesia" },
];

export function CartDrawer() {
  const s = useStore();
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (s.isAdmin) return null;

  const cartItems = s.cart as ExtendedCartItem[];

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

  const handleCopyText = (key: string, text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} disalin`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDirectCheckout = () => {
    const primaryItem = cartItems[0];

    const combinedAddress = isMultiDestination
      ? cartItems
          .map((item, idx) => {
            const c = item.recipientCity || s.city;
            const a = item.recipientAddress?.trim() || "-";
            const rPhone = item.recipientPhone?.trim() ? ` · WA Penerima: ${item.recipientPhone.trim()}` : "";
            return `${idx + 1}. [${item.name} -> ${item.to}] (${c}) ${a}${rPhone}`;
          })
          .join(" | ")
      : primaryItem?.recipientAddress?.trim()
      ? `${primaryItem.recipientAddress.trim()} (${primaryItem.recipientCity || s.city})${
          primaryItem.recipientPhone?.trim() ? ` · WA Penerima: ${primaryItem.recipientPhone.trim()}` : ""
        }`
      : s.user?.address || "-";

    const resolvedBuyerPhone = primaryItem?.senderPhone?.trim() || s.user?.phone || "-";

    // Snapshot item & qty sebelum keranjang dikosongkan oleh s.checkout()
    const purchasedSnapshot = cartItems.map((item) => ({
      productId: item.productId,
      qty: item.qty,
    }));

    const baseMessage = buildCartWaMessage(s.cart, s.city, calculatedShipping);
    const order = s.checkout();
    if (!order) return;

    // Step 4: Kurangi stok masing-masing produk secara otomatis sesuai jumlah pembelian
    const qtyByProduct = new Map<string, number>();
    for (const item of purchasedSnapshot) {
      qtyByProduct.set(item.productId, (qtyByProduct.get(item.productId) ?? 0) + item.qty);
    }
    qtyByProduct.forEach((boughtQty, productId) => {
      const targetProduct = s.products.find((p) => p.id === productId);
      if (targetProduct) {
        s.saveProduct({
          ...targetProduct,
          stock: Math.max(0, targetProduct.stock - boughtQty),
        });
      }
    });

    order.address = combinedAddress;
    order.phone = resolvedBuyerPhone;
    order.shipping = calculatedShipping;
    order.total = order.subtotal + calculatedShipping;

    const destinationLines = cartItems
      .map((item, idx) => {
        const c = item.recipientCity || s.city;
        const a = item.recipientAddress?.trim() || "-";
        const rPhone = item.recipientPhone?.trim() ? ` | WA Penerima: ${item.recipientPhone.trim()}` : "";
        const slot = item.deliverySlot ? ` | Sesi: ${item.deliverySlot}` : "";
        return `${idx + 1}. ${item.name} -> *${item.to}* (${c})\n   Alamat: ${a}${rPhone}${slot}`;
      })
      .join("\n");

    const fullWaMessage = [
      `*KONFIRMASI CHECKOUT — ${s.settings.storeName.toUpperCase()}*`,
      `No. Pesanan: *${order.id}*`,
      `Pemesan: ${order.customerName} (${resolvedBuyerPhone})`,
      `Status: *Menunggu Pembayaran*`,
      ``,
      baseMessage,
      ``,
      `*Rincian Tujuan Pengiriman (${uniqueDestinations.length || 1} Lokasi):*`,
      destinationLines,
      ``,
      `Saya akan segera melampirkan bukti transfer pembayaran. Terima kasih!`,
    ].join("\n");

    setCompletedOrder(order);
    toast.success(`Pesanan ${order.id} berhasil dibuat & stok diperbarui!`);
    sessionStorage.setItem(`wa_msg_${order.id}`, fullWaMessage);
  };

  return (
    <Sheet open={s.cartOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-primary">
            {completedOrder ? "Checkout & Pembayaran" : "Keranjang Anda"}
          </SheetTitle>
        </SheetHeader>

        {completedOrder ? (
          <div className="flex flex-1 flex-col justify-between space-y-4 overflow-y-auto pt-3">
            <div className="space-y-3.5">
              {/* STATUS PESANAN */}
              <div className="rounded-2xl border border-success/30 bg-success/5 p-3.5 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-success" />
                <p className="mt-1.5 font-serif text-lg font-semibold text-foreground">
                  Pesanan Berhasil Dicatat!
                </p>
                <p className="text-xs text-muted-foreground">
                  Status: <span className="font-semibold text-accent">Menunggu Pembayaran</span>
                </p>
                <div className="mt-2.5 flex items-center justify-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold">
                  <span>{completedOrder.id}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyText("orderId", completedOrder.id, "Nomor pesanan")}
                    className="text-muted-foreground hover:text-primary"
                    title="Salin Nomor Pesanan"
                  >
                    {copiedKey === "orderId" ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* STEP 5: INFORMASI REKENING PEMBAYARAN */}
              <div className="space-y-2.5 rounded-xl border border-primary/25 bg-primary/[0.03] p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-primary">
                    <Landmark className="h-3.5 w-3.5" /> Rekening Transfer Resmi
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyText("total", String(completedOrder.total), "Nominal tagihan")}
                    className="flex items-center gap-1 font-bold text-primary hover:underline"
                    title="Salin nominal transfer"
                  >
                    {formatIDR(completedOrder.total)}
                    {copiedKey === "total" ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>

                <div className="space-y-2">
                  {BANK_ACCOUNTS.map((acc) => (
                    <div key={acc.bank} className="flex items-center justify-between rounded-lg border bg-background p-2.5">
                      <div>
                        <p className="font-bold text-foreground">{acc.bank} · <span className="font-mono">{acc.number}</span></p>
                        <p className="text-[11px] text-muted-foreground">a.n. {acc.holder}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-primary"
                        onClick={() => handleCopyText(acc.bank, acc.number, `No. Rek ${acc.bank}`)}
                      >
                        {copiedKey === acc.bank ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* RINGKASAN TUJUAN */}
              <div className="space-y-1.5 rounded-xl border bg-card p-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WA Invoice Pemesan</span>
                  <span className="font-medium text-foreground">{completedOrder.phone}</span>
                </div>
                <Separator />
                <div className="flex items-start gap-1.5 pt-1 text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="whitespace-normal break-words leading-relaxed">
                    <strong className="text-foreground">Tujuan:</strong> {completedOrder.address}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground">Konfirmasi Pembayaran:</p>
                <p className="mt-0.5">
                  Setelah transfer sesuai nominal <strong>{formatIDR(completedOrder.total)}</strong>, klik tombol WhatsApp di bawah untuk mengirim bukti transfer. Admin akan segera memverifikasi dan mengirim <strong>Struk Lunas</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-2 border-t pt-3">
              <Button
                className="w-full bg-success text-success-foreground hover:bg-success/90"
                size="lg"
                onClick={() => {
                  const savedMsg =
                    sessionStorage.getItem(`wa_msg_${completedOrder.id}`) ||
                    `Halo ${s.settings.storeName}, saya sudah transfer untuk pesanan *${completedOrder.id}* sebesar *${formatIDR(completedOrder.total)}*. Berikut bukti transfernya.`;
                  window.open(waLink(s.settings.whatsappNumber, savedMsg), "_blank", "noreferrer");
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Kirim Bukti Transfer via WA
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
