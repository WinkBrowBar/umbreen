import { EMBROWERMENT_URL, FOUNDATION_URL, EZPA_URL, WINK_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const locations = [
  ["West Village", "7 Greenwich Avenue", "New York, NY 10014"],
  ["Cobble Hill", "216 Court Street", "Brooklyn, NY 11201"],
  ["Upper East Side", "244 East 60th Street", "New York, NY 10022"],
] as const;

export function Ventures() {
  return <section className="v2-ventures" id="ventures">
    <div className="v2-head"><span className="v2-kicker">Ventures</span><h2>The Umbreen ecosystem</h2></div>

    <article className="v2-venture">
      <div className="v2-venture-media"><Img src={homeImages.ventureWink} alt="Wink Brow Bar studio" label="Wink Brow Bar studio image" /></div>
      <div className="v2-venture-text">
        <span className="v2-num">01</span>
        <h3>Wink Brow Bar</h3>
        <p>Founded by Umbreen in New York City in 2014, Wink Brow Bar is her destination for elevated brow and eye-zone services.</p>
        <p>Every Wink brow technician is trained in the Embrowerment® Method.</p>
        <ul className="v2-locations">{locations.map(([n, a, c]) => <li key={n}><h4>{n}</h4><p>{a}<br />{c}</p></li>)}</ul>
        <a href={WINK_URL} target="_blank" rel="noreferrer" className="v2-link">Visit Wink Brow Bar <span aria-hidden="true">→</span></a>
      </div>
    </article>

    <article className="v2-venture v2-venture--flip">
      <div className="v2-venture-media"><Img src={homeImages.ventureEmbrowerment} alt="Embrowerment® education and products" label="Embrowerment® image" /></div>
      <div className="v2-venture-text">
        <span className="v2-num">02</span>
        <h3>Embrowerment®</h3>
        <p>Created by Umbreen, Embrowerment® transforms her methodology into a broader platform for professional education, methodology and products.</p>
        <p>At its center is the belief that technical excellence begins with understanding the individual — not following a template.</p>
        <a href={EMBROWERMENT_URL} target="_blank" rel="noreferrer" className="v2-link">Explore Embrowerment® <span aria-hidden="true">→</span></a>
      </div>
    </article>

    <div className="v2-venture-pair">
      <article className="v2-venture-card">
        <div className="v2-venture-media"><Img src={homeImages.ventureFoundation} alt="Embrowerment Foundation" label="Embrowerment Foundation image" /></div>
        <span className="v2-num">03</span>
        <h3>Embrowerment Foundation</h3>
        <p>The Embrowerment Foundation extends the principle of confidence through beauty into social impact, creating programs designed to make specialized beauty services and support accessible to people who may need them most.</p>
        <a href={FOUNDATION_URL} target="_blank" rel="noreferrer" className="v2-link">Visit the Foundation <span aria-hidden="true">→</span></a>
      </article>
      <article className="v2-venture-card" id="ezpa">
        <div className="v2-venture-media"><Img src={homeImages.ventureEzpa} alt="Eye Zone Professional Association" label="EZPA image" /></div>
        <span className="v2-num">04</span>
        <h3>EZPA</h3>
        <p className="v2-sub">Eye Zone Professional Association · Founded by Umbreen Sheikh</p>
        <p>The Eye Zone Professional Association is an emerging professional platform dedicated to advancing standards, education, professional development and informed conversation across the eye-zone industry.</p>
        <p>Bringing together brows, lashes, threading, permanent makeup and adjacent disciplines, EZPA is being built to strengthen the professional recognition and development of a rapidly evolving category of beauty.</p>
        <a href={EZPA_URL} target="_blank" rel="noreferrer" className="v2-link">Visit EZPA <span aria-hidden="true">→</span></a>
      </article>
    </div>
  </section>;
}
