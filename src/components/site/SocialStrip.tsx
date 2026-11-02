import { BOOKING_URL } from "@/lib/links";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/thisisumbreen", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" /></> },
  { label: "YouTube", href: "https://www.youtube.com/@thisisumbreen", icon: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></> },
  { label: "Facebook", href: "https://www.facebook.com/thisisumbreen", icon: <path d="M14 8.5h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.4h2.5V21h3.4v-6.6h2.5l.5-3.4h-3V9.2c0-.5.3-.7.6-.7z" fill="currentColor" stroke="none" /> },
];

export function SocialStrip() {
  return <div className="strip">
    <div className="strip-social">
      <span className="strip-label">@THISISUMBREEN</span>
      {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{s.icon}</svg>
        <span>{s.label.toUpperCase()}</span>
      </a>)}
    </div>
    <a href={BOOKING_URL} target="_blank" rel="noreferrer" id="book" className="strip-book">BOOK A SESSION <span aria-hidden="true">→</span></a>
  </div>;
}