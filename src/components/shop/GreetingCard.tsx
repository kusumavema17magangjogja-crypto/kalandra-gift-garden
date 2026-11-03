import { Leaf } from "lucide-react";
import { RIBBONS } from "@/lib/data";
import { CARD_TEMPLATES } from "@/data/floristData";
import { cn } from "@/lib/utils";

export function GreetingCard({ to, from, message, ribbon, cardTemplate = "classic", className }: { to: string; from: string; message: string; ribbon: string; cardTemplate?: string; className?: string }) {
  const r = RIBBONS.find((x) => x.id === ribbon) ?? RIBBONS[0];
  const template = CARD_TEMPLATES.find((t) => t.id === cardTemplate) ?? CARD_TEMPLATES[0];
  return (
    <div className={cn("greeting-card relative overflow-hidden rounded-lg border bg-card-paper p-6 pt-10 shadow-lift", template.className, className)}>
      <div className={cn("absolute inset-x-0 top-5 h-3", r.className)} />
      <div className={cn("absolute left-1/2 top-2 h-9 w-14 -translate-x-1/2 rounded-full", r.className)} />
      <div className="mt-6 text-center">
        <Leaf className="mx-auto h-5 w-5 text-primary/60" />
        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Untuk</p>
        <p className="font-serif text-2xl text-primary">{to || "Nama Penerima"}</p>
        <p className="mx-auto mt-5 min-h-24 max-w-xs whitespace-pre-wrap font-serif text-lg italic leading-relaxed text-foreground/85">
          {message || "Tulis pesan hangat Anda di sini…"}
          <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-accent align-middle" />
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">Dengan cinta,</p>
        <p className="font-serif text-xl text-accent">{from || "Nama Pengirim"}</p>
      </div>
      <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Kalandra · Pita {r.label}</p>
    </div>
  );
}
