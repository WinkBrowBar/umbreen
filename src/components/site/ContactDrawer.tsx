import { useEffect, useRef, useState } from "react";
import { ADDRESS, BOOKING_URL, CONSULTATION_URL, FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL } from "@/lib/links";
import { SocialIcon } from "./SocialIcons";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("7 Greenwich Avenue, New York, NY 10014")}`;

/** Floating "Visit" button (every page) that opens a side drawer with address, contact and socials. */
export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("drawer-open");
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("drawer-open");
      triggerRef.current?.focus();
    };
  }, [open]);

  return <>
    <div className="cd-float" aria-label="Contact shortcuts">
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="cd-float-social" aria-label="Instagram" title="Instagram"><SocialIcon name="instagram" /></a>
      <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="cd-float-social" aria-label="Facebook" title="Facebook"><SocialIcon name="facebook" /></a>
      <button ref={triggerRef} type="button" className="cd-float-main" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        <SocialIcon name="pin" /><span>Visit Us</span>
      </button>
    </div>

    <div className={`cd-backdrop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
    <aside className={`cd-drawer${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="cd-title" aria-hidden={!open} {...(!open ? { inert: true } : {})}>
      <div className="cd-head">
        <span className="cd-kicker">Visit Umbreen</span>
        <button ref={closeRef} type="button" className="cd-close" onClick={() => setOpen(false)} aria-label="Close"><SocialIcon name="close" /></button>
      </div>

      <h2 id="cd-title">Embrowerment® Atelier</h2>
      <p className="cd-sub">West Village, New York City</p>

      <ul className="cd-list">
        <li>
          <span className="cd-ico"><SocialIcon name="pin" /></span>
          <div>
            <span className="cd-label">Address</span>
            <address>7 Greenwich Avenue<br />New York, NY 10014</address>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="cd-link">Get directions <SocialIcon name="arrow" /></a>
          </div>
        </li>
        <li>
          <span className="cd-ico"><SocialIcon name="phone" /></span>
          <div>
            <span className="cd-label">Concierge</span>
            <a href="tel:+16468465041" className="cd-strong">646.846.5041</a>
            <span className="cd-note">Monday–Sunday · 2:00 PM–7:00 PM ET</span>
          </div>
        </li>
        <li>
          <span className="cd-ico"><SocialIcon name="mail" /></span>
          <div>
            <span className="cd-label">Press &amp; inquiries</span>
            <a href="mailto:hello@umbreen.com" className="cd-strong">hello@umbreen.com</a>
          </div>
        </li>
      </ul>

      <div className="cd-actions">
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="cd-btn cd-btn--solid">Book an appointment</a>
        <a href={CONSULTATION_URL} target="_blank" rel="noreferrer" className="cd-btn">Book a virtual consultation</a>
      </div>

      <div className="cd-social">
        <span className="cd-label">Follow</span>
        <div>
          {[["instagram", "Instagram", INSTAGRAM_URL], ["facebook", "Facebook", FACEBOOK_URL], ["youtube", "YouTube", YOUTUBE_URL], ["linkedin", "LinkedIn", LINKEDIN_URL]].map(([k, l, h]) =>
            <a key={k} href={h} target="_blank" rel="noopener noreferrer" aria-label={l} title={l}><SocialIcon name={k as "instagram"} /></a>)}
        </div>
      </div>
      <p className="cd-foot">{ADDRESS.join(", ")}</p>
    </aside>
  </>;
}
