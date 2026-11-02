import { Link } from "@tanstack/react-router";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const services = [
  ["Signature Brow Threading", "Signature Embrowerment® Thread", "$88", "Precision brow shaping using certified organic cotton thread, beginning with an assessment of the natural brow and facial structure.", homeImages.serviceThreading],
  ["Brow Wax", "Signature Embrowerment® Wax", "$82", "Precision shaping using an all-natural chocolate wax for clients who prefer waxing as their method of hair removal.", homeImages.serviceWax],
  ["Brow Lamination", "Embrowerment® Lift", "$139", "A multi-step treatment designed to lift, redirect and set existing brow hair, creating greater fullness and definition.", homeImages.serviceLamination],
] as const;

export function Services() {
  return <section className="v2-services" id="services">
    <div className="v2-head">
      <span className="v2-kicker">Umbreen's Signature Brow Services</span>
      <h2>Brow artistry, individually considered.</h2>
      <p>Umbreen applies the Embrowerment® Method across her brow and eye-zone services in New York City.</p>
    </div>
    <div className="v2-cards">
      {services.map(([t, alias, price, d, img]) => <article key={t} className="v2-card">
        <div className="v2-card-media"><Img src={img} alt={t} label={`${t} image`} /></div>
        <h3>{t}<span className="v2-card-price">{price}</span></h3>
        <span className="v2-card-alias">{alias}</span><p>{d}</p>
      </article>)}
    </div>
    <Link to="/services" hash="services" className="v2-link">View all services <span aria-hidden="true">→</span></Link>  </section>;
}