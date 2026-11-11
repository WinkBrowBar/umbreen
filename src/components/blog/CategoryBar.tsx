import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { BlogCategory } from "@/lib/blog";

/**
 * Category filter for /blog. Wraps onto one scrollable row; arrow buttons appear
 * only when there are more categories than fit (swipe on touch devices).
 */
export function CategoryBar({ categories, active }: { categories: BlogCategory[]; active: string | null }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: false, right: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // Bring the selected category into view (e.g. when landing on a category URL).
    el.querySelector<HTMLElement>(".is-active")?.scrollIntoView({ block: "nearest", inline: "center" });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active, categories.length]);

  const scrollBy = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.7, behavior: "smooth" });

  if (categories.length === 0) return null;

  return <div className={`blog-cats${edge.left ? " has-left" : ""}${edge.right ? " has-right" : ""}`} role="navigation" aria-label="Categories">
    <button type="button" className="blog-cats-arrow is-prev" aria-label="Previous categories" tabIndex={edge.left ? 0 : -1} onClick={() => scrollBy(-1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
    </button>
    <div className="blog-cats-track" ref={track} onScroll={update}>
      <Link to="/blog" className={!active ? "is-active" : ""} aria-current={!active ? "page" : undefined}>All</Link>
      {categories.map((c) => <Link key={c.slug} to="/blog" search={{ category: c.slug }}
        className={active === c.slug ? "is-active" : ""} aria-current={active === c.slug ? "page" : undefined}>{c.name}</Link>)}
    </div>
    <button type="button" className="blog-cats-arrow is-next" aria-label="More categories" tabIndex={edge.right ? 0 : -1} onClick={() => scrollBy(1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>;
}
