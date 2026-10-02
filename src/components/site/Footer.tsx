import { Link } from "@tanstack/react-router";
import { BOOKING_URL, ADDRESS } from "@/lib/links";
import { SocialIcon, socials } from "./SocialIcons";

const logo = { url: "/images/umbreen-00.png" };

const explore = [
  { label: "Umbreen", to: "/about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Services", to: "/services" },
  { label: "Embrowerment®", href: "/#method" },
  { label: "Ventures", href: "/#ventures" },
  { label: "Press", href: "/#press" },
  { label: "EZPA", href: "/#ezpa" },
] as const;


export function Footer() {
  return <footer><img src={logo.url} alt="" className="foot-sig" />
    <div className="foot-grid foot-grid--v2">
      <div>
        <h4>UMBREEN</h4>
        <p className="foot-tag">Brow Artist · Founder · Eye-Zone Authority</p>
        <p className="foot-note">Umbreen Sheikh is a New York City brow artist, founder of Wink Brow Bar and creator of the Embrowerment® Method — a proprietary approach to personalized brow artistry and eye-zone design.</p>
      </div>
      <div>
        <h4>EXPLORE</h4>
        <ul className="foot-links">
          {explore.map(l => <li key={l.label}>{"to" in l ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}</li>)}
          <li><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book</a></li>
        </ul>
      </div>
      <div>
        <h4>CONCIERGE</h4>
        <a href="tel:+16468465041">646.846.5041</a>
        <p className="foot-note">Monday–Sunday · 2:00 PM–7:00 PM ET</p>
        <p className="foot-note">Messages received outside concierge hours will be answered during the next available concierge hours.</p>
        <p className="foot-note foot-address">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
      </div>
      <div>
        <h4>PRESS &amp; INQUIRIES</h4>
        <p className="foot-note">For press, media, general and appointment-related inquiries:</p>
        <a href="mailto:hello@umbreen.com">hello@umbreen.com</a>
        <div className="foot-social">
          {socials.map(s => <a key={s.key} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><SocialIcon name={s.key} /></a>)}
        </div>
      </div>
    </div>
    <div className="foot-bottom"><span>© 2026 Umbreen. All Rights Reserved.</span><span className="foot-legal"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-of-service">Terms of Service</Link></span></div>
  </footer>;
}