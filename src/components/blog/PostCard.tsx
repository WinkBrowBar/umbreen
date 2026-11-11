import { Link } from "@tanstack/react-router";
import { formatDate, type BlogPostSummary } from "@/lib/blog";

export function PostCard({ post, headingLevel = 2, featured = false }: { post: BlogPostSummary; headingLevel?: 2 | 3; featured?: boolean }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return <article className={`blog-card${featured ? " blog-card--feature" : ""}`}>
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="blog-card-media" tabIndex={-1} aria-hidden="true">
      {post.coverImage.url ? <img src={post.coverImage.url} alt="" loading={featured ? "eager" : "lazy"} /> : <span className="blog-card-ph">Umbreen Journal</span>}
    </Link>
    <div className="blog-card-text">
    <div className="blog-card-meta">
      {post.category && <span>{post.category}</span>}
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span>{post.readingMinutes} min read</span>
    </div>
    <H><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></H>
    {post.excerpt && <p>{post.excerpt}</p>}
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="v2-link" aria-label={`Read: ${post.title}`}>Read article <span aria-hidden="true">→</span></Link>
    </div>
  </article>;
}
