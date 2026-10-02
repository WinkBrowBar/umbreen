import { INSTAGRAM_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const pillars = [
  ["Expertise", "Brows, threading, lamination, tinting and eye-zone education."],
  ["Founder", "Building Wink Brow Bar, Embrowerment®, EZPA, Orivis and the Foundation."],
  ["Authority", "Press, interviews, speaking and industry commentary."],
  ["In Good Company", "Editors, founders, cultural figures, events and conversations."],
  ["Umbreen POV", "Observations on beauty, business, entrepreneurship and the industries around them."],
  ["Behind the Work", "Clients, transformations, technique and life behind the chair in New York."],
] as const;

const igIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" /></svg>;

export function Instagram() {
  return <section className="v2-insta" id="instagram">
    <div className="v2-insta-head">
      <div>
        <span className="v2-kicker">Follow @thisisumbreen</span>
        <h2>Expertise. Entrepreneurship. The Eye Zone.</h2>
      </div>
      <div className="v2-insta-cta">
        <p>Follow Umbreen for an inside view of her work, ideas and the businesses she is building.</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="v2-btn v2-btn--light">{igIcon} Follow @thisisumbreen <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <ol className="v2-insta-pillars">
      {pillars.map(([t, d], i) => <li key={t}><span className="v2-num">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></li>)}
    </ol>
    <ul className="v2-insta-feed">
      {homeImages.instagram.map((src, i) => <li key={i}><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label={`Instagram post ${i + 1}`}>
        <Img src={src} alt={`Instagram post ${i + 1}`} label={`Instagram post ${i + 1}`} />
        <span className="v2-insta-hover">{igIcon}</span>
      </a></li>)}
    </ul>
  </section>;
}