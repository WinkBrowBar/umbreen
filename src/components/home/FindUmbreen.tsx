import { Link } from "@tanstack/react-router";
import { BOOKING_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

export function FindUmbreen() {
  return <section className="v2-split v2-split--flip" id="book">
    <figure className="v2-split-media"><Img src={homeImages.nycStudio} alt="Umbreen in her New York City studio" label="Umbreen in her NYC studio" /></figure>
    <div className="v2-split-text">
      <span className="v2-kicker">Find Umbreen in New York City</span>
      <h2>Personal brow artistry. Twenty years of expertise.</h2>
      <p>Umbreen sees clients in New York City for personalized brow services and consultations using the Embrowerment® Method.</p>
      <p>Whether you are maintaining your brows, rebuilding their shape or considering a more permanent treatment, the process begins by understanding your natural structure and where you want your brows to go.</p>
      <div className="v2-actions">
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn">Book with Umbreen <span aria-hidden="true">→</span></a>
        <Link to="/services" className="v2-link">View services <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  </section>;
}
