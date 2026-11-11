import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site";
import { PostCard } from "@/components/blog/PostCard";
import { api, ApiError, absoluteUrl, formatDate, shareImage, withHeadingIds, wordCount, type BlogPost, type BlogPostSummary } from "@/lib/blog";
import { AuthorBox, ReadingProgress, ShareLinks, TableOfContents } from "@/components/blog/ArticleExtras";
import { INSTAGRAM_URL } from "@/lib/links";
import { BOOKING_URL } from "@/lib/links";
import { SITE_URL } from "@/lib/seo";

type Data = { post: BlogPost; related: BlogPostSummary[] };

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    let data: Data | { redirect: string };
    try {
      data = await api<Data | { redirect: string }>(`/api/posts/${encodeURIComponent(params.slug)}`);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) throw notFound();
      throw e;
    }
    // Renamed post: send visitors and search engines to the new address for good.
    if ("redirect" in data) throw redirect({ to: "/blog/$slug", params: { slug: data.redirect }, statusCode: 301 });
    const { html, toc } = withHeadingIds(data.post.content);
    return { ...data, html, toc, words: wordCount(data.post.content) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found | Umbreen" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    const url = `${SITE_URL}/blog/${p.slug}`;
    const canonical = p.seo.canonicalUrl ? absoluteUrl(p.seo.canonicalUrl) : url;
    const title = `${p.seo.metaTitle} | Umbreen`;
    const image = shareImage(p);
    const article = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.seo.metaDescription,
      image: [image],
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      author: { "@type": "Person", name: p.authorName, url: `${SITE_URL}/about`, jobTitle: "Brow Artist & Founder", sameAs: [INSTAGRAM_URL] },
      wordCount: loaderData.words,
      inLanguage: "en-US",
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: "Umbreen", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/umbreen-00.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      ...(p.tags.length ? { keywords: p.tags.join(", ") } : {}),
      ...(p.category ? { articleSection: p.category } : {}),
    };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    };
    return {
      meta: [
        { title },
        { name: "description", content: p.seo.metaDescription },
        ...(p.seo.noindex ? [{ name: "robots", content: "noindex, follow" }] : [{ name: "robots", content: "index, follow, max-image-preview:large" }]),
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "Umbreen" },
        { property: "og:title", content: p.seo.metaTitle },
        { property: "og:description", content: p.seo.metaDescription },
        { property: "og:url", content: canonical },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: p.coverImage.alt || p.title },
        { property: "article:published_time", content: p.publishedAt },
        { property: "article:modified_time", content: p.updatedAt },
        { property: "article:author", content: p.authorName },
        ...(p.category ? [{ property: "article:section", content: p.category }] : []),
        ...p.tags.map((t) => ({ property: "article:tag", content: t })),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.seo.metaTitle },
        { name: "twitter:description", content: p.seo.metaDescription },
        { name: "twitter:image", content: image },
        { name: "twitter:label1", content: "Reading time" },
        { name: "twitter:data1", content: `${p.readingMinutes} min read` },
      ],
      links: [
        { rel: "canonical", href: canonical },
        ...(p.coverImage.url ? [{ rel: "preload", as: "image", href: p.coverImage.url }] : []),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(article) },
        { type: "application/ld+json", children: JSON.stringify(crumbs) },
      ],
    };
  },
  notFoundComponent: () => <main className="v2 blog">
    <Nav />
    <header className="blog-head"><span className="v2-kicker">The Journal</span><h1>Article not found</h1><p>It may have moved. Browse the latest articles instead.</p>
      <Link to="/blog" className="v2-link">Back to the Journal <span aria-hidden="true">→</span></Link></header>
    <Footer />
  </main>,
  component: Article,
});

function Article() {
  const { post: p, related, html, toc } = Route.useLoaderData();
  const url = `${SITE_URL}/blog/${p.slug}`;
  const updated = new Date(p.updatedAt).getTime() - new Date(p.publishedAt).getTime() > 86_400_000;
  return <main className="v2 blog">
    <ReadingProgress />
    <Nav />
    <article className="blog-article">
      <header className={`blog-hero${p.coverImage.url ? "" : " no-image"}`}>
        <div className="blog-hero-text">
          <div className="blog-crumbs" role="navigation" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/blog">Journal</Link>
            {p.category && <><span aria-hidden="true">/</span><span>{p.category}</span></>}
          </div>
          <h1>{p.title}</h1>
          {p.excerpt && <p className="blog-dek">{p.excerpt}</p>}
          <div className="blog-byline">
            <img src="/images/umbreen-02.webp" alt="" width={44} height={44} />
            <div>
              <span className="blog-byline-name">By <Link to="/about">{p.authorName}</Link></span>
              <span className="blog-byline-meta">
                <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                {updated && <> · Updated <time dateTime={p.updatedAt}>{formatDate(p.updatedAt)}</time></>}
                {" · "}{p.readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
        {p.coverImage.url && <figure className="blog-hero-media"><img src={p.coverImage.url} alt={p.coverImage.alt || p.title} fetchPriority="high" /></figure>}
      </header>

      <div className="blog-layout">
        <aside className="blog-rail">
          <TableOfContents items={toc} />
          <ShareLinks url={url} title={p.title} image={shareImage(p)} />
        </aside>
        <div className="blog-content">
          {toc.length > 1 && <details className="blog-toc-mobile"><summary>In this article</summary>
            <ol>{toc.filter((t) => t.level === 2).map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}</ol></details>}
          {/* Content is sanitised by the API before it is stored. */}
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: html }} />
          {p.tags.length > 0 && <ul className="blog-article-tags" aria-label="Topics">{p.tags.map((t) => <li key={t}><Link to="/blog" search={{ tag: t }}>{t}</Link></li>)}</ul>}
          <div className="blog-share-mobile"><ShareLinks url={url} title={p.title} image={shareImage(p)} /></div>
          <AuthorBox name={p.authorName} />
          <aside className="blog-cta">
            <span className="v2-kicker">Book with Umbreen</span>
            <h2>Ready for brows designed around you?</h2>
            <p>Every appointment begins with a consultation and brow mapping at the Embrowerment® Atelier, West Village.</p>
            <div className="blog-cta-actions">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn">Book an appointment <span aria-hidden="true">→</span></a>
              <Link to="/services" hash="pricing" className="v2-link">See full menu &amp; pricing <span aria-hidden="true">→</span></Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
    {related.length > 0 && <section className="blog-related" aria-labelledby="related-title">
      <span className="v2-kicker">The Journal</span>
      <h2 id="related-title">Keep reading</h2>
      <div className="blog-grid">{related.map((r) => <PostCard key={r.id} post={r} headingLevel={3} />)}</div>
    </section>}
    <Footer />
  </main>;
}
