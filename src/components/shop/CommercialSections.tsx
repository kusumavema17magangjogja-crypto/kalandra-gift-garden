import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Banknote, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ARTICLES, BUDGETS, FLASH_SALES, FAQ, OCCASIONS, PAYMENTS, dailyCountdown, matchesOccasion, saleValues } from '@/data/floristData';
import { useStore } from '@/lib/store';
import { formatIDR, isHalalProduct, type Product } from '@/lib/data';

export function FlashSale({ onPick }: { onPick: (p: Product) => void }) {
  const { products, isAdmin, settings } = useStore();
  const [clock, setClock] = useState('--:--:--');
  useEffect(() => { const tick = () => setClock(dailyCountdown(new Date())); tick(); const t = window.setInterval(tick, 1000); return () => window.clearInterval(t); }, []);
  const deals = FLASH_SALES.flatMap(sale => { const p = products.find(p => p.id === sale.productId && p.active && p.price < sale.originalPrice); return p ? [{ ...sale, product: p }] : []; });
  if (!deals.length) return null;
  return <section id="promo" className="border-b bg-card py-10">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 font-serif text-3xl text-primary"><Zap className="h-6 w-6 text-destructive" />Promo Kilat Hari Ini</h2><div className="flex items-center gap-3 text-sm"><span className="text-muted-foreground">Berakhir dalam</span><time className="rounded-md bg-destructive px-3 py-2 font-mono text-lg tabular-nums text-destructive-foreground">{clock}</time></div></div>
      <div className="grid gap-4 md:grid-cols-3">{deals.map(({ product: p, originalPrice }) => { const sale = saleValues(p.price, originalPrice); return <article key={p.id} className="grid grid-cols-[100px_minmax(0,1fr)] gap-3 rounded-lg border p-3 md:grid-cols-1 xl:grid-cols-[140px_minmax(0,1fr)]">
        <div className="relative self-start"><img src={p.image} alt={p.name} width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-md object-cover" /><span className="absolute left-1 top-1 rounded bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">-{sale.discount}%</span>{isHalalProduct(p) && <span lang="ar" aria-label="Halal" className="absolute bottom-1 left-1 rounded bg-halal-badge px-2 text-primary-foreground">حلال</span>}</div>
        <div className="min-w-0"><h3 className="min-h-10 text-sm font-semibold">{p.name}</h3><del className="text-xs text-muted-foreground">{formatIDR(originalPrice)}</del><p className="font-semibold text-destructive">{formatIDR(p.price)}</p><p className="mt-1 text-xs text-success">Hemat {formatIDR(sale.saving)}</p><Progress value={Math.min(100, p.stock / 10 * 100)} className="mt-3 h-1.5" /><p className="mt-1 text-xs text-muted-foreground">Sisa {p.stock} pcs</p>{!isAdmin && <Button size="sm" className="mt-3 w-full" disabled={!p.stock || !settings.storeOpen} onClick={() => onPick(p)}>Beli Sekarang</Button>}</div>
      </article>; })}</div>
    </div>
  </section>;
}
export function ShoppingSelectors({ occasion, budget, onOccasion, onBudget }: { occasion: string | null; budget: string | null; onOccasion: (id: string) => void; onBudget: (id: string) => void }) {
  const { products } = useStore();
  return <section className="mx-auto max-w-7xl px-4 pt-12">
    <h2 className="font-serif text-3xl text-primary">Belanja per Momen</h2>
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{OCCASIONS.map(o => <Button key={o.id} variant="outline" aria-pressed={occasion === o.id} onClick={() => onOccasion(o.id)} className={`h-auto flex-col overflow-hidden p-0 ${occasion === o.id ? 'border-primary ring-2 ring-primary/20' : ''}`}><img src={o.image} alt="" width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="w-full px-1 pb-3 pt-1 text-center"><span className="block whitespace-normal text-xs font-semibold">{o.label}</span><span className="mt-1 block text-[11px] font-normal text-muted-foreground">{products.filter(p => p.active && matchesOccasion(p, o.id)).length} produk</span></span></Button>)}</div>
    <div className="mt-8 flex flex-wrap items-center gap-3 border-y py-5"><h3 className="mr-3 font-serif text-2xl text-primary">Belanja per Budget</h3>{BUDGETS.map(b => <Button key={b.id} variant={budget === b.id ? 'default' : 'outline'} aria-pressed={budget === b.id} onClick={() => onBudget(b.id)}><Banknote className="h-4 w-4" />{b.label}</Button>)}</div>
  </section>;
}
export function InspirationAndHelp() {
  return <>
    <section id="inspirasi" className="mx-auto max-w-7xl scroll-mt-40 px-4 py-16"><p className="flex items-center gap-2 text-sm text-accent"><BookOpen className="h-4 w-4" />Jurnal Kalandra</p><h2 className="mt-1 font-serif text-4xl text-primary">Panduan & Inspirasi</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{ARTICLES.map(a => <Link key={a.slug} to="/artikel/$slug" params={{ slug: a.slug }} className="group overflow-hidden rounded-lg border bg-card"><img src={a.image} alt={a.title} width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover" /><div className="p-4"><h3 className="font-serif text-xl text-primary">{a.title}</h3><p className="mt-2 text-sm text-muted-foreground">{a.summary}</p><span className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">Baca artikel<ArrowUpRight className="h-3 w-3" /></span></div></Link>)}</div></section>
    <section id="faq" className="scroll-mt-40 border-y bg-secondary py-14"><div className="mx-auto max-w-3xl px-4"><h2 className="font-serif text-4xl text-primary">Pertanyaan yang Sering Ditanya</h2><Accordion type="single" collapsible className="mt-5">{FAQ.map((f, i) => <AccordionItem key={f.q} value={String(i)}><AccordionTrigger className="text-left">{f.q}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <section id="pembayaran" className="mx-auto max-w-7xl scroll-mt-40 px-4 py-12"><h2 className="font-serif text-3xl text-primary">Metode Pembayaran</h2><p className="mt-2 text-sm text-muted-foreground">Konfirmasikan ketersediaan metode dan instruksi pembayaran dengan CS melalui WhatsApp.</p><div className="mt-6 grid gap-6 md:grid-cols-3">{PAYMENTS.map(group => <div key={group.label}><h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{group.label}</h3><ul className="mt-3 flex flex-wrap gap-2">{group.methods.map(m => <li key={m} className="rounded border bg-card px-4 py-3 text-sm font-semibold text-primary">{m}</li>)}</ul></div>)}</div></section>
  </>;
}
