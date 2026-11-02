import { EMBROWERMENT_URL } from "@/lib/links";

const pillars = [
  ["Precision", "Threading and shaping are performed with deliberate control, respecting the natural growth pattern of the brow."],
  ["Facial Harmony", "Shape, proportion and placement are considered in relation to the individual's bone structure and wider eye zone."],
  ["Progress, Not Perfection", "Great brows are often built over time. The Method considers both the immediate result and the longer-term direction of the brow."],
  ["Natural-Looking Results", "The goal is simple: your brows — more considered, more balanced and more defined."],
] as const;

export function Method() {
  return <section className="v2-method" id="method">
    <div className="v2-head">
      <span className="v2-kicker">The Embrowerment® Method</span>
      <h2>Brows are architecture for the face.</h2>
    </div>
    <div className="v2-method-intro">
      <p>Created by Umbreen Sheikh, the Embrowerment® Method is a proprietary approach to brow artistry centered on precision, facial harmony and natural-looking results.</p>
      <p>Brows are treated as the structural anchor of the eye zone — never in isolation.</p>
      <p>The objective is not to impose a fashionable brow onto every face. It is to understand what already exists and progressively create greater balance, definition and harmony.</p>
    </div>
    <ol className="v2-pillars">
      {pillars.map(([t, d], i) => <li key={t}><span className="v2-num">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></li>)}
    </ol>
    <a href={EMBROWERMENT_URL} target="_blank" rel="noreferrer" className="v2-link">Discover the Embrowerment® Method <span aria-hidden="true">→</span></a>
  </section>;
}
