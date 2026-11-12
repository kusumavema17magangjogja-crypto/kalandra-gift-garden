import { Leaf, Sparkles, Heart, MapPin, ExternalLink, Printer } from "lucide-react";
import { RIBBONS, CARD_TEMPLATES } from "@/data/floristData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Penyesuaian kontras teks untuk warna pita sangat terang
const readable = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const luminance = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luminance > 0.8 ? "#7A7568" : hex;
};

export function GreetingCard({
  to,
  from,
  senderAddress,
  message,
  ribbon,
  cardTemplate = "classic",
  className,
}: {
  to: string;
  from: string;
  senderAddress?: string;
  message: string;
  ribbon: string;
  cardTemplate?: string | undefined;
  className?: string;
}) {
  const r = RIBBONS.find((x) => x.id === ribbon) ?? RIBBONS[0];
  const template = CARD_TEMPLATES.find((t) => t.id === cardTemplate) ?? CARD_TEMPLATES[0];

  // URL Google Maps search otomatis dari alamat yang diinput
  const mapsUrl = senderAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(senderAddress)}`
    : "#";

  const handlePrintCard = () => {
    const cardEl = document.getElementById("printable-greeting-card");
    if (!cardEl) return void window.print();

    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) return void window.print();

    // Menyalin stylesheet aktif agar desain Tailwind & font kartu tetap utuh saat dicetak
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((el) => el.outerHTML)
      .join("\n");

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Kartu Ucapan - Kalandra Gift Garden</title>
          ${styles}
          <style>
            @page { margin: 12mm; }
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #ffffff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #printable-greeting-card {
              width: 100%;
              max-width: 440px;
              box-shadow: none !important;
            }
            .no-print { display: none !important; }
          </style>
        </head>
        <body>
          ${cardEl.outerHTML}
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-2.5">
      <div
        id="printable-greeting-card"
        className={cn(
          "greeting-card relative overflow-hidden rounded-2xl border-2 border-[#e7dec8] bg-[#fbf9f4] p-7 pt-12 shadow-2xl transition-all duration-300",
          template?.className,
          className
        )}
        style={{
          boxShadow: "0 20px 35px -10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* Garis Pita Atas Bertingkat */}
        <div
          className="absolute inset-x-0 top-0 h-4 shadow-sm"
          style={{ backgroundColor: r.hex }}
        />
        <div
          className="absolute inset-x-0 top-4 h-1 opacity-40"
          style={{ backgroundColor: r.hex }}
        />

        {/* Ornamen Wax Seal / Segel Pita Tengah */}
        <div
          className="absolute left-1/2 top-1.5 flex h-11 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/40 shadow-md backdrop-blur-sm"
          style={{ backgroundColor: r.hex }}
        >
          <Sparkles className="h-4 w-4 text-white/90 drop-shadow animate-pulse" />
        </div>

        {/* Bingkai Ganda Dekoratif */}
        <div className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-primary/25" />
        <div className="pointer-events-none absolute inset-4 rounded-lg border border-primary/10" />

        {/* Ornamen Bunga Sudut */}
        <div className="pointer-events-none absolute left-5 top-7 select-none font-serif text-xs text-primary/30">
          ❀ ───
        </div>
        <div className="pointer-events-none absolute right-5 top-7 select-none font-serif text-xs text-primary/30">
          ─── ❀
        </div>
        <div className="pointer-events-none absolute bottom-4 left-5 select-none font-serif text-xs text-primary/30">
          ❀ ───
        </div>
        <div className="pointer-events-none absolute bottom-4 right-5 select-none font-serif text-xs text-primary/30">
          ─── ❀
        </div>

        {/* Watermark Daun Transparan */}
        <Leaf className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 select-none text-primary/[0.03]" />

        {/* Konten Kartu */}
        <div className="relative z-10 mt-2 text-center">
          {/* Header Icon */}
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner">
            <Leaf className="h-4 w-4" />
          </div>

          {/* Penerima */}
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
            Special Delivery For
          </p>
          <p className="mt-1 font-serif text-2xl font-bold tracking-wide text-primary drop-shadow-sm">
            {to || "Nama Penerima"}
          </p>

          {/* Divider Hati Lembut */}
          <div className="mx-auto my-3 flex items-center justify-center gap-2 text-primary/30">
            <span className="h-px w-10 bg-primary/20" />
            <Heart className="h-3 w-3 fill-primary/30 text-transparent" />
            <span className="h-px w-10 bg-primary/20" />
          </div>

          {/* Pesan Hangat */}
          <div className="mx-auto my-4 max-w-sm rounded-lg border border-black/[0.03] bg-white/70 p-4 shadow-sm backdrop-blur-[1px]">
            <p className="min-h-20 whitespace-pre-wrap font-serif text-base italic leading-relaxed text-foreground/90">
              "{message || "Tulis doa atau pesan hangat Anda di sini…"}"
              <span
                className="ml-1 inline-block h-4 w-0.5 animate-pulse align-middle"
                style={{ backgroundColor: r.hex }}
              />
            </p>
          </div>

          {/* Pengirim & Alamat Lengkap */}
          <div className="mt-3 pt-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/75">
              Warmest Regards From
            </p>
            <p className="mt-0.5 font-serif text-xl font-bold text-accent">
              {from || "Nama Pengirim"}
            </p>

            {/* Alamat Lengkap: Tanpa Truncate, Multi-line Rapi, dan Dapat Diklik ke Maps */}
            {senderAddress && (
              <div className="mx-auto mt-2 w-full max-w-sm px-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Buka rute pengiriman di Google Maps"
                  className="group flex items-start justify-center gap-1.5 rounded-xl border border-primary/20 bg-white/90 p-2 text-left text-xs text-foreground/85 shadow-xs transition-all duration-150 hover:border-primary/50 hover:bg-white hover:text-primary hover:shadow-sm"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:scale-110" />
                  <span className="flex-1 whitespace-normal break-words leading-snug">
                    {senderAddress}
                  </span>
                  <ExternalLink className="no-print mt-0.5 h-3 w-3 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer Branding & Pita */}
        <div className="relative z-10 mt-6 border-t border-primary/10 pt-3 text-center">
          <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">
            Kalandra Gift Garden · Ribbon{" "}
            <span
              className="font-bold underline decoration-wavy underline-offset-2"
              style={{ color: readable(r.hex) }}
            >
              {r.label}
            </span>
          </p>
        </div>
      </div>

      {/* Tombol Cetak / Simpan PDF Khusus Area Kartu */}
      <div className="no-print flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handlePrintCard}
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary"
        >
          <Printer className="h-3.5 w-3.5" />
          Cetak / Simpan Kartu (PDF)
        </Button>
      </div>
    </div>
  );
}
