import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BOOKING_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/links";
import { SocialIcon } from "./SocialIcons";

const logo = { url: "/images/umbreen-00.png" };

const links = [
  { label: "About", to: "/about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Services", to: "/services" },
  { label: "Embrowerment®", href: "/#method" },
  { label: "Ventures", href: "/#ventures" },
  { label: "Press", href: "/#press" },
  { label: "EZPA", href: "/#ezpa" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/" || pathname === "/draft-home";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const cls = [isHome && !scrolled && !open ? "nav--over" : "", open ? "nav--open" : ""].filter(Boolean).join(" ") || undefined;
  const close = () => setOpen(false);

  return <nav className={cls}>
    <Link to="/" className="wordmark" onClick={close}><img src={logo.url} alt="Umbreen" /></Link>
    <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(o => !o)}>
      {open ? "Close" : "Menu"}
    </button>
    <div className="navlinks" id="site-menu">
      {links.map(l => "to" in l
        ? <Link key={l.label} to={l.to} onClick={close}>{l.label.toUpperCase()}</Link>
        : <a key={l.label} href={l.href} onClick={close}>{l.label.toUpperCase()}</a>)}
      <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="nav-book" onClick={close}>BOOK</a>
      <span className="nav-social">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" onClick={close}><SocialIcon name="instagram" /></a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={close}><SocialIcon name="linkedin" /></a>
      </span>
    </div>
  </nav>;
}