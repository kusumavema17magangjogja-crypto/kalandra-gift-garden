import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { ARTICLES } from '@/data/floristData';
import { SiteHeader, SiteFooter } from '@/components/shop/SiteHeader';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/artikel/$slug')({
  beforeLoad: ({ params }) => { if (!ARTICLES.some(a => a.slug === params.slug)) throw notFound(); },
  notFoundComponent: () => <main className="mx-auto max-w-3xl px-4 py-20"><h1 className="font-serif text-3xl text-primary">Artikel tidak ditemukan</h1><Link to="/">Kembali ke toko</Link></main>,
  head: ({ params }) => { const loaderData = ARTICLES.find(a => a.slug === params.slug); return { meta: [
    { title: `${loaderData?.title ?? 'Artikel'} — Kalandra Florist & Gift` },
    { name: 'description', content: loaderData?.summary ?? 'Panduan bunga dari Kalandra Florist & Gift.' },
    { property: 'og:title', content: `${loaderData?.title ?? 'Artikel'} — Kalandra` },
    { property: 'og:description', content: loaderData?.summary ?? 'Panduan florist Kalandra.' },
    { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }; },
  component: Article,
});
function Article() {
  const { slug } = Route.useParams();
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return null;
  return <><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-10"><Button asChild variant="link" className="mb-6 px-0"><Link to="/" hash="inspirasi"><ArrowLeft className="h-4 w-4" />Panduan & Inspirasi</Link></Button><p className="text-sm text-accent">Jurnal Kalandra</p><h1 className="mt-3 font-serif text-4xl leading-tight text-primary md:text-5xl">{article.title}</h1><p className="mt-4 text-muted-foreground">{article.summary}</p><img src={article.image} alt={article.title} width={1024} height={1024} className="mt-8 aspect-[16/9] w-full rounded-lg object-cover" /><div className="mt-8 space-y-6 text-base leading-8">{article.paragraphs.map(p => <p key={p}>{p}</p>)}</div></main><SiteFooter /></>;
}
