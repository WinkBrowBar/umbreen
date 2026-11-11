import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryBar } from "@/components/blog/CategoryBar";
import { api, type BlogCategory, type BlogList } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

const TITLE = "The Journal | Brow Care & Beauty Insight from Umbreen, NYC";
const DESCRIPTION = "Brow threading, lamination and eye-zone advice from NYC brow artist Umbreen Sheikh, creator of the Embrowerment® Method.";

type Search = { page?: number; tag?: string; category?: string };

const clean = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().toLowerCase().slice(0, max) : undefined);

export const Route = createFileRoute("/blog/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const page = Number(s["page"]);
    const tag = clean(s["tag"], 40);
    const category = clean(s["category"], 70);
    return { ...(category ? { category } : {}), ...(tag ? { tag } : {}), ...(page > 1 ? { page: Math.floor(page) } : {}) };
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const qs = new URLSearchParams({ page: String(deps.page ?? 1), limit: "9", ...(deps.tag ? { tag: deps.tag } : {}), ...(deps.category ? { category: deps.category } : {}) });
    const base = { tag: deps.tag ?? null, categorySlug: deps.category ?? null };
    try {
      const [list, cats] = await Promise.all([api<BlogList>(`/api/posts?${qs}`), api<{ categories: BlogCategory[] }>("/api/categories")]);
      const category = deps.category ? cats.categories.find((c) => c.slug === deps.category) ?? null : null;
      return { ...list, ...base, categories: cats.categories, category, failed: false };
    } catch {
      return { items: [], page: 1, pages: 1, total: 0, ...base, categories: [] as BlogCategory[], category: null as BlogCategory | null, failed: true };
    }
  },
  head: ({ loaderData: d }) => {
    const page = d?.page ?? 1;
    const tag = d?.tag;
    const cat = d?.category;
    const qs = (p: number) => {
      const q = new URLSearchParams({ ...(cat ? { category: cat.slug } : {}), ...(tag ? { tag } : {}), ...(p > 1 ? { page: String(p) } : {}) }).toString();
      return `/blog${q ? `?${q}` : ""}`;
    };
    const name = cat?.name ?? (tag ? tag.replace(/\b\w/g, (c) => c.toUpperCase()) : null);
    const title = name ? `${name}${page > 1 ? `, Page ${page}` : ""} | The Journal | Umbreen` : page > 1 ? `The Journal, Page ${page} | Umbreen` : TITLE;
    const description = cat?.description || (cat ? `${cat.name} articles from NYC brow artist Umbreen Sheikh, creator of the Embrowerment® Method.` : DESCRIPTION);
    // Empty / unknown category pages and tag listings stay out of the index (links still followed).
    const noindex = !!tag || (!!d?.categorySlug && !cat) || (d ? d.items.length === 0 && page > 1 : false);
    const links: Array<{ rel: string; href: string; type?: string; title?: string }> = [
      { rel: "canonical", href: `${SITE_URL}${qs(page)}` },
      { rel: "alternate", type: "application/rss+xml", title: "Umbreen Journal", href: `${SITE_URL}/rss.xml` },
    ];
    if (d && page > 1) links.push({ rel: "prev", href: `${SITE_URL}${qs(page - 1)}` });
    if (d && page < d.pages) links.push({ rel: "next", href: `${SITE_URL}${qs(page + 1)}` });
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}${qs(page)}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(cat ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${cat.name} | The Umbreen Journal`,
          url: `${SITE_URL}${qs(1)}`,
          description,
          isPartOf: { "@type": "Blog", name: "The Umbreen Journal", url: `${SITE_URL}/blog` },
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: cat.name, item: `${SITE_URL}${qs(1)}` },
          ] },
        } : {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Umbreen Journal",
          url: `${SITE_URL}/blog`,
          description: DESCRIPTION,
          publisher: { "@type": "Organization", name: "Umbreen", url: SITE_URL },
        }),
      }],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const d = Route.useLoaderData();
  const filtered = !!(d.tag || d.categorySlug);
  const keep = { ...(d.categorySlug ? { category: d.categorySlug } : {}), ...(d.tag ? { tag: d.tag } : {}) };
  return <main className="v2 blog">
    <Nav />
    <header className="blog-head">
      <span className="v2-kicker">The Journal</span>
      <h1>{d.category ? d.category.name : d.tag ? `Articles on ${d.tag}` : "Brow care, technique & beauty insight"}</h1>
      <p>{d.category?.description || "Notes from Umbreen Sheikh on brow artistry, the Embrowerment® Method and caring for the eye zone."}</p>
    </header>

    <CategoryBar categories={d.categories} active={d.category?.slug ?? null} />

    <section className="blog-grid" aria-label="Articles">
      {d.items.map((p, i) => <PostCard key={p.id} post={p} featured={i === 0 && d.page === 1 && !filtered} />)}
      {d.items.length === 0 && <p className="blog-empty">
        {d.failed ? "The journal is unavailable right now. Please try again shortly."
          : filtered ? <>No articles here yet. <Link to="/blog">See all articles</Link></> : "New articles are coming soon."}
      </p>}
    </section>

    {d.pages > 1 && <div className="blog-pager" role="navigation" aria-label="Pagination">
      {d.page > 1 ? <Link to="/blog" search={{ ...keep, ...(d.page > 2 ? { page: d.page - 1 } : {}) }} rel="prev">← Newer</Link> : <span />}
      <span>Page {d.page} of {d.pages}</span>
      {d.page < d.pages ? <Link to="/blog" search={{ ...keep, page: d.page + 1 }} rel="next">Older →</Link> : <span />}
    </div>}
    <Footer />
  </main>;
}
