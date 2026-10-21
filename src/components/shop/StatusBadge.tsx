import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/data";

const styles: Record<OrderStatus, string> = {
  "Menunggu Pembayaran": "bg-warning/15 text-warning border-warning/30",
  "Sedang Dirangkai": "bg-accent/10 text-accent border-accent/30",
  "Dalam Pengiriman": "bg-info/10 text-info border-info/30",
  Selesai: "bg-success/10 text-success border-success/30",
};

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", styles[status], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
