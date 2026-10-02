import { Link } from "@tanstack/react-router";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const services = [
  ["Signature Brow Threading", "Precision brow shaping using certified organic cotton thread, beginning with an assessment of the natural brow and facial structure.", homeImages.serviceThreading],
  ["Brow Wax", "Precision shaping using an all-natural chocolate wax for clients who prefer waxing as their method of hair removal.", homeImages.serviceWax],
  ["Brow Lamination", "A multi-step treatment designed to lift, redirect and set existing brow hair, creating greater fullness and definition.", homeImages.serviceLamination],
] as const;

export function Services() {
  return <section className="v2-services" id="services">
    <div className="v2-head">
      <span className="v2-kicker">Umbreen's Signature Brow Services</span>
      <h2>Brow artistry, individually considered.</h2>
      <p>Umbreen applies the Embrowerment® Method across her brow and eye-zone services in New York City.</p>
    </div>
    <div className="v2-cards">
      {services.map(([t, d, img]) => <article key={t} className="v2-card">
        <div className="v2-card-media"><Img src={img} alt={t} label={`${t} image`} /></div>
        <h3>{t}</h3><p>{d}</p>
      </article>)}
    </div>
    <Link to="/services" className="v2-link">View all services <span aria-hidden="true">→</span></Link>
  </section>;
}
