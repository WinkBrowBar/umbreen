import { BOOKING_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const outlets = ["Vogue", "Allure", "Harper's Bazaar", "W Magazine", "The Hollywood Reporter"];

export function HomeHero() {
  return <section className="v2-hero">
    <div className="v2-hero-text">
      <span className="v2-kicker">Founder · Entrepreneur · Eye-Zone Authority</span>
      <p className="v2-hero-name" aria-hidden="true">Umbreen</p>
   
      <p className="v2-lead">New York City brow artist, founder of Wink Brow Bar and creator of the Embrowerment® Method.</p>
      <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn v2-btn--light">Book with Umbreen <span aria-hidden="true">→</span></a>
    </div>
    <div className="v2-hero-photo"><Img src={homeImages.heroFull} alt="Umbreen Sheikh, New York City brow artist" label="Full-length editorial image of Umbreen" /></div>
    <div className="v2-hero-featured">
      {/* <span>As featured in</span>
      <ul>{outlets.map(o => <li key={o}>{o}</li>)}</ul> */}
         <h1>The Authority in Modern Brow Threading</h1>
    </div>
    
  </section>;
}