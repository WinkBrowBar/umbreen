import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { INSTAGRAM_URL } from "@/lib/links";
import type { TocItem } from "@/lib/blog";
import { SocialIcon } from "@/components/site/SocialIcons";

/** Thin bar at the top of the page showing how far through the article the reader is. */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const body = document.querySelector(".blog-body");
    const onScroll = () => {
      if (!body) return;
      const r = body.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div className="blog-progress" aria-hidden="true"><span style={{ transform: `scaleX(${p})` }} /></div>;
}

/** "In this article" list, highlighting the section currently on screen. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-90px 0px -65% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  if (items.length < 2) return null;
  return <div className="blog-toc" role="navigation" aria-label="In this article">
    <p className="blog-toc-title">In this article</p>
    <ol>{items.map((i) => <li key={i.id} className={`lvl-${i.level}${active === i.id ? " is-active" : ""}`}><a href={`#${i.id}`}>{i.text}</a></li>)}</ol>
  </div>;
}

export function ShareLinks({ url, title, image }: { url: string; title: string; image: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ } };
  const links = [
    { name: "facebook", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "pinterest", label: "Save to Pinterest", href: `https://pinterest.com/pin/create/button/?url=${u}&media=${encodeURIComponent(image)}&description=${t}` },
    { name: "mail", label: "Share by email", href: `mailto:?subject=${t}&body=${u}` },
  ] as const;
  return <div className="blog-share">
    <span className="blog-share-label">Share</span>
    <div className="blog-share-icons">
      {links.map((l) => <a key={l.name} href={l.href} target={l.name === "mail" ? undefined : "_blank"} rel="noopener noreferrer" aria-label={l.label} title={l.label}><SocialIcon name={l.name} /></a>)}
      <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} title={copied ? "Link copied" : "Copy link"} className={copied ? "is-done" : ""}><SocialIcon name={copied ? "check" : "link"} /></button>
    </div>
    <span className="blog-share-status" role="status">{copied ? "Link copied" : ""}</span>
  </div>;
}

/** Who wrote this — shows real expertise (helps readers and Google's E-E-A-T signals). */
export function AuthorBox({ name }: { name: string }) {
  return <aside className="blog-author" aria-label="About the author">
    <img src="/images/umbreen-02.webp" alt={name} loading="lazy" width={96} height={96} />
    <div>
      <span className="v2-kicker">Written by</span>
      <p className="blog-author-name">{name}</p>
      <p>NYC brow artist, founder of Wink Brow Bar and creator of the Embrowerment® Method, with 20+ years of experience and 30,000+ client appointments.</p>
      <div className="blog-author-links">
        <Link to="/about" className="v2-link">About Umbreen <span aria-hidden="true">→</span></Link>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="v2-link">Instagram <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </aside>;
}
