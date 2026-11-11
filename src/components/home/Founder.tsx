const steps = [
  "Umbreen's career began behind the chair, but her work has grown beyond the individual appointment.",
  "After thousands of client transformations, she saw an opportunity to rethink how brow artistry was taught, delivered and understood — and ultimately how the entire eye zone could be approached as a professional category.",
  "That idea has developed into a growing ecosystem spanning beauty services, professional education, technology, industry standards and social impact.",
];

const ecosystem = ["Wink Brow Bar", "Embrowerment®", "Embrowerment Foundation", "EZPA", "Orivis"];

export function Founder() {
  return <section className="v2-founder">
    <div className="v2-founder-head">
      <span className="v2-kicker">From Brow Artist to Founder</span>
      <h2>One idea became an ecosystem.</h2>
      <ul className="v2-eco" aria-label="The Umbreen ecosystem">
        {ecosystem.map(e => <li key={e}><a href="#ventures">{e}</a></li>)}
      </ul>
    </div>
    <ol className="v2-founder-steps">
      {steps.map((s, i) => <li key={i}><span className="v2-num">{String(i + 1).padStart(2, "0")}</span><p>{s}</p></li>)}
    </ol>
  </section>;
}