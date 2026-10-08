export const faqs = [
  ["Who is Umbreen Sheikh?", "Umbreen Sheikh is a New York City brow artist, entrepreneur and eye-zone expert. She is the founder of Wink Brow Bar, creator of the Embrowerment® Method and founder of the Eye Zone Professional Association and Embrowerment Foundation. She is a licensed cosmetologist and holds a degree in Biomedical Science from King's College London."],
  ["What is a brow artist?", "A brow artist specializes in shaping and enhancing eyebrows using techniques such as threading, waxing, tinting, lamination and semi-permanent brow artistry. Umbreen's approach considers the brow in relation to the individual's facial structure and wider eye zone."],
  ["What is Umbreen Sheikh known for?", "Umbreen is known for her work in precision brow threading and shaping and for creating the Embrowerment® Method, her proprietary approach to individualized brow artistry."],
  ["What is the Embrowerment® Method?", "The Embrowerment® Method is Umbreen Sheikh's proprietary approach to brows, based on precision, facial harmony, natural-looking results and progressive long-term brow management."],
  ["Which brow service is right for me?", "The appropriate service depends on your existing brow growth, facial structure, desired result, maintenance preferences and longer-term goals. A consultation allows Umbreen to assess these factors before recommending an approach."],
  ["Where can I book with Umbreen in NYC?", "Umbreen sees clients in New York City. Appointments and consultations can be booked directly through Umbreen.com."],
] as const;

export function Faq() {
  return <section className="svc-faq v2-faq" id="faq">
    <span className="v2-kicker">FAQ</span>
    <h2>Frequently Asked Questions</h2>
    <div className="svc-faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
  </section>;
}
