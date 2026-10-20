import { Link } from "@tanstack/react-router";
import { BOOKING_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const credentials = [
  ["Biomedical Science", "King's College London"],
  ["Licensed", "Cosmetologist"],
  ["2014", "Founded Wink Brow Bar"],
  ["Creator", "Embrowerment® Method"],
] as const;

export function About() {
  return <section className="v2-about" id="expertise">
    <figure className="v2-about-media">
      <Img src={homeImages.about} alt="Umbreen Sheikh at work" label="Portrait of Umbreen" />
      <figcaption>Umbreen Sheikh · New York City</figcaption>
    </figure>
    <div className="v2-about-text">
      <span className="v2-kicker">Expertise</span>
      <h2>Umbreen, Brow Artist &amp; Eye-Zone Expert in New York City</h2>
      <p className="v2-about-lead">Umbreen Sheikh is a licensed New York City brow artist and eye-zone expert known for an individualized approach to brow shaping.</p>
      <div className="v2-about-cols">
        <p>Rather than designing brows around a template or trend, Umbreen works from the natural architecture of the face — considering bone structure, existing growth, proportion and the relationship between the brows and the wider eye zone.</p>
        <p>She holds a degree in Biomedical Science from King's College London and is a licensed cosmetologist. Her scientific background informs an approach to beauty built around anatomy, precision and long-term management rather than quick transformation.</p>
      </div>
      <p className="v2-about-note">In 2014, she founded Wink Brow Bar in New York City and went on to develop the Embrowerment® Method, her proprietary framework for personalized brow artistry.</p>
      <dl className="v2-creds">
        {credentials.map(([t, d]) => <div key={d}><dt>{t}</dt><dd>{d}</dd></div>)}
      </dl>
      <div className="v2-actions">
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn">Book a Consultation <span aria-hidden="true">→</span></a>
        <Link to="/about" className="v2-link">Explore her expertise <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  </section>;
}