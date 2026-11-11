/** Blog API client — used by the public /blog pages and the /admin CMS. */
import { SITE_URL, OG_IMAGE } from "./seo";

export type BlogImage = { url: string; alt: string };
export type BlogSeo = { metaTitle: string; metaDescription: string; canonicalUrl: string; ogImage: string; noindex: boolean };
export type BlogPostSummary = {
  id: string; title: string; slug: string; excerpt: string; coverImage: BlogImage; category: string;
  tags: string[]; authorName: string; publishedAt: string; updatedAt: string; readingMinutes: number; seo: BlogSeo;
};
export type BlogPost = BlogPostSummary & { content: string };
export type BlogList = { items: BlogPostSummary[]; page: number; pages: number; total: number };
export type BlogCategory = { name: string; slug: string; description: string; count: number };

// API URL + fetch client live in ./api (re-exported so existing imports keep working).
export { API_URL, apiBase, api, ApiError } from "./api";

/** Turn "/uploads/…" into an absolute URL (needed for og:image, JSON-LD, sitemaps). */
export const absoluteUrl = (u: string) => (!u ? "" : /^https?:\/\//.test(u) ? u : `${SITE_URL}${u.startsWith("/") ? u : `/${u}`}`);

export const shareImage = (p: Pick<BlogPostSummary, "seo" | "coverImage">) => absoluteUrl(p.seo.ogImage || p.coverImage.url) || OG_IMAGE;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "America/New_York" });

export type TocItem = { id: string; text: string; level: 2 | 3 };

const stripTags = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

/**
 * Give every H2/H3 an id so the table of contents can jump to it
 * (also lets Google show "jump to" links in results).
 */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, inner: string) => {
    const text = stripTags(inner);
    let id = text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "section";
    let n = 2;
    while (used.has(id)) id = `${id.replace(/-\d+$/, "")}-${n++}`;
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

export const wordCount = (html: string) => stripTags(html.replace(/<\/(p|h\d|li|td|th|blockquote)>/g, " ")).split(/\s+/).filter(Boolean).length;
