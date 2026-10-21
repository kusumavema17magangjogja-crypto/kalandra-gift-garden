import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { ADDONS, formatDate, formatIDR, itemTotal, ribbonLabel, RIBBONS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const s = useStore();
  const navigate = useNavigate();
  const checkout = () => {
    if (!s.user) { s.setCartOpen(false); s.setAuthOpen("login"); toast.info("Silakan masuk untuk checkout"); return; }
    const o = s.checkout();
    if (o) { toast.success(`Pesanan ${o.id} berhasil dibuat!`); s.setCartOpen(false); navigate({ to: "/profile", search: { tab: "orders" } }); }
  };
  return (
    <Sheet open={s.cartOpen} onOpenChange={s.setCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader><SheetTitle className="font-serif text-2xl text-primary">Keranjang Anda</SheetTitle></SheetHeader>
        {s.cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingBag className="h-10 w-10" />Keranjang masih kosong
          </div>
        ) : (
          <div className="-mx-6 flex-1 space-y-4 overflow-y-auto px-6">
            {s.cart.map((i) => (
              <div key={i.key} className="flex gap-3 rounded-xl border bg-card p-3">
                <img src={i.image} alt={i.name} className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0 flex-1 space-y-1 text-sm">
                  <div className="flex justify-between gap-2"><p className="font-semibold">{i.name}</p>
                    <button onClick={() => s.removeFromCart(i.key)} aria-label="Hapus" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button></div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className={cn("h-3 w-3 rounded-full", RIBBONS.find((r) => r.id === i.ribbon)?.className)} />Pita {ribbonLabel(i.ribbon)} · Kirim {formatDate(i.deliveryDate)}</p>
                  <p className="truncate text-xs italic text-muted-foreground">"{i.message || "—"}" — untuk {i.to}</p>
                  {i.addons.length > 0 && <p className="text-xs text-muted-foreground">+ {ADDONS.filter((a) => i.addons.includes(a.id)).map((a) => a.label).join(", ")}</p>}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center rounded-md border">
                      <button className="p-1" onClick={() => s.updateQty(i.key, i.qty - 1)} aria-label="Kurangi"><Minus className="h-3 w-3" /></button>
                      <span className="w-7 text-center text-xs">{i.qty}</span>
                      <button className="p-1" onClick={() => s.updateQty(i.key, i.qty + 1)} aria-label="Tambah"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-semibold text-primary">{formatIDR(itemTotal(i))}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {s.cart.length > 0 && (
          <div className="space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatIDR(s.cartSubtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Ongkir ({s.city})</span><span>{formatIDR(s.shippingFee)}</span></div>
            <Separator />
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span className="font-serif text-xl text-primary">{formatIDR(s.cartSubtotal + s.shippingFee)}</span></div>
            <Button className="w-full" size="lg" onClick={checkout}>Checkout Sekarang</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
