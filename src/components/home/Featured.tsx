const stats = [
  ["20", "+", "Years of expertise"],
  ["30,000", "+", "Client appointments"],
  ["3", "", "NYC locations founded"],
  ["25", "+", "Editorial & press features"],
  ["100", "+", "Beauty professionals trained"],
  ["1", "", "Proprietary method", "Embrowerment®"],
] as const;

export function Featured() {
  return <section className="v2-featured" aria-label="Umbreen in numbers">
    <div className="v2-stats-head">
      <span className="v2-kicker">By the numbers</span>
      <p>Two decades behind the chair, one method that changed how New York does brows.</p>
    </div>
    <dl className="v2-stats">
      {stats.map(([n, suffix, label, sub]) => <div key={label}>
        <dt>{n}{suffix && <sup>{suffix}</sup>}</dt>
        <dd>{label}{sub && <em>{sub}</em>}</dd>
      </div>)}
    </dl>
  </section>;
}