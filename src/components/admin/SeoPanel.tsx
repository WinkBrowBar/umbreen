import { SITE_URL } from "@/lib/seo";
import type { PostForm } from "./PostEditor";

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

/** Live Google preview + an on-page SEO checklist, updated as the post is written. */
export function SeoPanel({ form, set }: { form: PostForm; set: (patch: Partial<PostForm["seo"]>) => void }) {
  const title = form.seo.metaTitle || form.title;
  const desc = form.seo.metaDescription || form.excerpt || text(form.content).slice(0, 160);
  const kw = form.seo.focusKeyword.trim().toLowerCase();
  const body = text(form.content).toLowerCase();
  const words = body ? body.split(" ").length : 0;
  const firstPara = text((form.content.match(/<p[^>]*>[\s\S]*?<\/p>/) ?? [""])[0]).toLowerCase();
  const imgs = [...form.content.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const imgsMissingAlt = imgs.filter((t) => !/alt="[^"]+"/.test(t)).length;
  const internalLinks = (form.content.match(/href="\/(?!\/)/g) ?? []).length + (form.content.match(/href="https?:\/\/(www\.)?umbreen\.com/g) ?? []).length;

  const checks: Array<[boolean, string]> = [
    [title.length >= 30 && title.length <= 60, `SEO title is ${title.length} characters (aim for 30–60)`],
    [desc.length >= 120 && desc.length <= 160, `Meta description is ${desc.length} characters (aim for 120–160)`],
    [!!kw, "A focus keyword is set"],
    [!!kw && title.toLowerCase().includes(kw), "Focus keyword appears in the SEO title"],
    [!!kw && desc.toLowerCase().includes(kw), "Focus keyword appears in the meta description"],
    [!!kw && form.slug.includes(kw.replace(/\s+/g, "-")), "Focus keyword appears in the URL"],
    [!!kw && firstPara.includes(kw), "Focus keyword appears in the first paragraph"],
    [words >= 600, `Article length: ${words} words (600+ ranks better for guides)`],
    [/<h2[\s>]/.test(form.content), "Uses H2 section headings"],
    [!!form.coverImage.url && !!form.coverImage.alt, "Cover image has alt text"],
    [imgsMissingAlt === 0, imgs.length ? `${imgs.length - imgsMissingAlt}/${imgs.length} images in the article have alt text` : "No images missing alt text"],
    [internalLinks > 0, `${internalLinks} link(s) to other umbreen.com pages (link to a service page)`],
  ];
  const score = Math.round((checks.filter(([ok]) => ok).length / checks.length) * 100);

  return <section className="adm-card">
    <div className="adm-card-head"><h2>SEO</h2><span className={`adm-score ${score >= 80 ? "good" : score >= 50 ? "ok" : "bad"}`}>{score}/100</span></div>

    <div className="adm-serp" aria-label="Google search preview">
      <span className="adm-serp-url">umbreen.com › blog › {form.slug || "your-post"}</span>
      <span className="adm-serp-title">{title.length > 60 ? `${title.slice(0, 58)}…` : title || "Your SEO title"} | Umbreen</span>
      <span className="adm-serp-desc">{desc.length > 160 ? `${desc.slice(0, 157)}…` : desc || "Your meta description will appear here."}</span>
    </div>

    <label className="adm-field">Focus keyword<input value={form.seo.focusKeyword} maxLength={80} placeholder="e.g. eyebrow lamination nyc" onChange={(e) => set({ focusKeyword: e.target.value })} /></label>
    <label className="adm-field">SEO title <Count n={form.seo.metaTitle.length} max={60} />
      <input value={form.seo.metaTitle} maxLength={70} placeholder={form.title || "Defaults to the post title"} onChange={(e) => set({ metaTitle: e.target.value })} /></label>
    <label className="adm-field">Meta description <Count n={form.seo.metaDescription.length} max={160} />
      <textarea rows={3} value={form.seo.metaDescription} maxLength={170} placeholder="Defaults to the excerpt. Summarise the post and why to click." onChange={(e) => set({ metaDescription: e.target.value })} /></label>

    <ul className="adm-checks">{checks.map(([ok, label]) => <li key={label} className={ok ? "ok" : "todo"}>{label}</li>)}</ul>

    <details className="adm-advanced">
      <summary>Advanced</summary>
      <label className="adm-field">Canonical URL<input value={form.seo.canonicalUrl} placeholder={`${SITE_URL}/blog/${form.slug || "…"}`} onChange={(e) => set({ canonicalUrl: e.target.value })} />
        <small className="adm-hint">Only fill this if the article was first published on another site.</small></label>
      <label className="adm-check"><input type="checkbox" checked={form.seo.noindex} onChange={(e) => set({ noindex: e.target.checked })} /> Hide from search engines (noindex)</label>
    </details>
  </section>;
}

const Count = ({ n, max }: { n: number; max: number }) => <span className={`adm-count ${n > max ? "over" : ""}`}>{n}/{max}</span>;
