import { BOOKING_URL } from "@/lib/links";

export function FinalCta() {
  return <section className="v2-cta">
    <span className="v2-kicker">Book your brow appointment</span>
    <h2>Your brows should belong to your face — not a trend.</h2>
    <p>Start with Umbreen's individualized approach to your brows and eye zone, built on more than two decades of experience and delivered through the Embrowerment® Method.</p>
    <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn v2-btn--light">Book with Umbreen <span aria-hidden="true">→</span></a>
  </section>;
}
