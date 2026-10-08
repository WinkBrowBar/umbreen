import { INSTAGRAM_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

const people = [
  ["Alyssa Milano", "Actor & Activist", homeImages.alyssaMilano],
  ["Gloria Steinem", "Writer & Activist", homeImages.gloriaSteinem],
  ["Elaine Welteroth", "Journalist & Author", homeImages.elaineWelteroth],
  ["April Long", "Town & Country", homeImages.aprilLong],
  ["Christene Barberich", "Co-founder, Refinery29", homeImages.christeneBarberich],
  ["Diane von Furstenberg", "Designer", homeImages.dianeVonFurstenberg],
] as const;

export function GoodCompany() {
  return <section className="v2-company" id="in-good-company">
    <div className="v2-company-intro">
      <span className="v2-kicker">Trusted by celebrities, CEOs &amp; media</span>
      <h2>In Good Company</h2>
      <blockquote>Beauty has always been the beginning of a much bigger conversation.</blockquote>
      <p>For more than two decades, Umbreen has shaped brows and exchanged ideas with some of the most recognizable voices across beauty, media, business and culture.</p>
      <p>Across her career, Umbreen has found herself in conversation with influential people shaping beauty, media, culture, entrepreneurship and women's leadership.</p>
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="v2-link">And more <span aria-hidden="true">→</span></a>
    </div>
    <ul className="v2-people">
      {people.map(([name, role, img]) => <li key={name}>
        <figure>
          <Img src={img} alt={`Umbreen with ${name}`} label={`Image — ${name}`} />
          <figcaption><strong>{name}</strong><span>{role}</span></figcaption>
        </figure>
      </li>)}
    </ul>
  </section>;
}