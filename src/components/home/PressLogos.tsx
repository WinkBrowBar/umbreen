import { PRESS_URL } from "@/lib/links";

const press = [
  ["Vogue", "vogue"], ["Allure", "allure"], ["Harper's Bazaar", "harpers-bazaar"], ["W Magazine", null], ["The Hollywood Reporter", "hollywood-reporter"],
  ["Cosmopolitan", "cosmopolitan"], ["Glamour", "glamour"], ["Refinery29", "refinery29"], ["Condé Nast Traveler", "conde-nast-traveler"], ["Town & Country", "town-country"], ["New York", "new-york"], ["Vogue", "vogue"],
] as const;

export function PressLogos() {
  return <section className="svc-press v2-press" id="press">
    <span className="v2-kicker">Press</span>
    <h2>Widely Featured for Expertise &amp; Industry Innovation</h2>
    <p className="v2-press-copy">Umbreen's work and perspective on brows, threading and beauty have been featured across international fashion, beauty and lifestyle media.</p>
    <ul className="svc-logos v2-logos">
      {press.map(([name, file], i) => <li key={`${name}-${i}`}>{file ? <img src={`/images/press/${file}.png`} alt={name} loading="lazy" /> : <span className="v2-logo-text">{name}</span>}</li>)}
    </ul>
    <a href={PRESS_URL} className="v2-link">Explore press <span aria-hidden="true">→</span></a>
  </section>;
}