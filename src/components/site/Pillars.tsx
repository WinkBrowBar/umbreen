const pillars = [
  ["01", "Studio Practice", "Private, appointment-only sessions at Wink Brow Bar — threading, mapping, and tint built around your bone structure, not a template shape."],
  ["02", "Proprietary Method", "Embrowerment® is a repeatable system for reading the eye zone — angles, arch height, and tail length calculated before a single hair is touched."],
  ["03", "Education", "Training for beauty professionals who want the science behind the shape, translating peer-reviewed research into technique you can actually use."],
] as const;

export function Pillars() {
  return <section className="pillars"><span className="pillars-kicker">The Method</span><h2 className="pillars-head display">One method,<br />three disciplines.</h2>
    <div className="pillar-grid">
      {pillars.map(([num, title, text]) => <div className="pillar" key={num}><span className="pillar-num">{num}</span><h3>{title}</h3><p>{text}</p></div>)}
    </div>
  </section>;
}
