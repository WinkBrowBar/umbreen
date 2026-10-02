import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site";
import { BOOKING_URL } from "@/lib/links";

const heroImg = "/images/umbreen-01.jpeg";
const portrait = "/images/umbreen-19.png";
const session = "/images/umbreen-03.jpeg";
const timeOut = "/images/umbreen-06.webp";
const serum = "/images/umbreen-18.jpeg";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Umbreen | Brow Artist & Eyebrow Specialist in NYC" },
    { name: "description", content: "Umbreen is a NYC brow artist specializing in personalized brow shaping, threading, and lamination based on your natural features. Book a service here." },
    { name: "keywords", content: "Brow Artist" },
    { property: "og:title", content: "Umbreen | Brow Artist & Eyebrow Specialist in NYC" },
    { property: "og:description", content: "Umbreen is a NYC brow artist specializing in personalized brow shaping, threading, and lamination based on your natural features." },
  ] }),
  component: Services,
});

const press = [
  ["Vogue", "vogue"], ["Allure", "allure"], ["The Hollywood Reporter", "hollywood-reporter"], ["Cosmopolitan", "cosmopolitan"], ["Glamour", "glamour"],
  ["Refinery29", "refinery29"], ["Harper's Bazaar", "harpers-bazaar"], ["Condé Nast Traveler", "conde-nast-traveler"], ["Town & Country", "town-country"], ["New York", "new-york"],
] as const;

const method = [
  ["01", "Precision threading", "Hair is removed from the root with control, not guesswork."],
  ["02", "Facial harmony", "Every shape is read against your own bone structure."],
  ["03", "Natural-looking results", "The goal is a brow that looks like yours, only more defined."],
] as const;

const services = [
  ["Signature Service", "Signature Brow Threading", "Certified organic cotton thread removes hair gently from the root for precise shaping. Includes consultation, brow mapping, and a complimentary fill."],
  ["Brow Shaping", "Brow Wax", "All-natural chocolate wax removes hair from the root for sculpted arches that last three to six weeks. Includes consultation, brow mapping, and a complimentary fill."],
  ["Brow Treatment", "Brow Lamination", "A three-step keratin treatment that lifts and sets the brow hair for a fuller, bolder shape lasting six to eight weeks with proper aftercare."],
  ["Embrowerment® Semi-Permanent Makeup", "Microblading", "A semi-permanent pigment deposited into the skin with fine, hair-like strokes using a handheld tool. A follow-up at six weeks is included in the fee."],
  ["Embrowerment® Semi-Permanent Makeup", "Nanoblading", "A fine-needle technique within the Embrowerment® family, designed for precise, natural-looking hair-like strokes. A six-week follow-up is included."],
  ["Embrowerment® Semi-Permanent Makeup", "Ombre | Powder Brows", "Pigment is stippled into the brow with a tattoo machine for a soft, airy, makeup-filled effect. A six-week follow-up is included."],
] as const;

const studios = [
  ["West Village", "7 Greenwich Avenue", "New York, NY 10014"],
  ["Cobble Hill", "216 Court Street", "Brooklyn, NY 11201"],
] as const;

const faqs = [
  ["Who is Umbreen Sheikh?", "Umbreen Sheikh is a New York City professional brow artist and eye-zone expert. She founded Wink Brow Bar, created the Embrowerment® method, and founded and leads the Embrowerment Foundation. She is a licensed cosmetologist and holds a biomedical sciences degree from King's College London."],
  ["What is a brow artist?", "A brow artist is a specialist who shapes and enhances eyebrows using techniques like threading, waxing, tinting, lamination, and semi-permanent pigment, designing the brow to suit the individual's face."],
  ["What is Umbreen known for?", "Umbreen is known for developing the Embrowerment® Method and for her work in precision brow shaping, threading, and eye zone artistry."],
  ["Which brow service is right for me?", "The right brow service depends on your natural brow growth, desired shape, maintenance preferences, and long-term goals. Umbreen and the Wink Brow Bar team can recommend the appropriate service after assessing your brows, facial structure, and the overall eye zone."],
  ["Where can I book with Umbreen in NYC?", "Services are performed at Wink Brow Bar, with studios in the West Village, Cobble Hill, and the Upper East Side. Book online or call 917.352.3440."],
] as const;

function Services() {
  return <main className="svc brand-font">
    <Nav />

    {/* Hero */}
    <header className="svc-head">
      <div className="svc-head-top"><span className="pillars-kicker">Brow Artist · New York City</span><span className="svc-head-idx">Services · 06 Treatments</span></div>
      <h1 className="display">Umbreen, Brow Artist &amp; Eye Zone Expert in New York City</h1>
      <div className="svc-head-row">
        <p className="serif">Umbreen is a licensed brow artist in NYC who shapes brows around each client's natural bone structure, not a one-size-fits-all template. At her Atelier — her personal brow artist studio — she offers signature brow threading, waxing, and lamination, using her Embrowerment® Method across every service.</p>
        <div className="svc-actions">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="strip-book">BOOK A CONSULTATION <span aria-hidden="true">→</span></a>
          <a href="#services" className="svc-link">SEE SERVICES</a>
        </div>
      </div>
      <div className="svc-triptych">
        <figure className="is-light"><img src={heroImg} alt="Umbreen Sheikh, NYC brow artist" /><figcaption>The Artist</figcaption></figure>
        <figure className="is-cover"><img src={timeOut} alt="Time Out New York feature on Umbreen's West Village studio" /><figcaption>As Featured</figcaption></figure>
        <figure><img src={serum} alt="Umbreen Pure Hyaluronic Serum" /><figcaption>Eye Zone Care</figcaption></figure>
      </div>
    </header>

    {/* Expertise */}
    <section className="statement svc-flip">
      <figure><img src={portrait} alt="Umbreen Sheikh with brow tools" loading="lazy" /></figure>
      <div className="statement-text">
        <span className="pillars-kicker">Expertise</span>
        <h2 className="display">Umbreen's Brow Artistry &amp; Expertise</h2>
        <div className="body">
          <p>Umbreen holds a degree in Biomedical Sciences from King's College London and is a licensed cosmetologist. That scientific foundation shapes how she reads a face, not just what looks good in a single photo.</p>
          <p>In 2014, she founded Wink Brow Bar and created the Embrowerment® Method, a framework built on anatomy and long-term management rather than trends. Every Wink Brow Bar technician is certified in it, so results don't depend on which artist you see.</p>
        </div>
        <Link to="/about" className="svc-link">LEARN MORE ABOUT HER</Link>
      </div>
    </section>

    {/* As featured in */}
    <section className="svc-press">
      <span className="pillars-kicker">As Featured In</span>
      <h2 className="display">Widely featured for expertise and industry innovation.</h2>
      <ul className="svc-logos">{press.map(([name, file]) => <li key={file}><img src={`/images/press/${file}.png`} alt={name} loading="lazy" /></li>)}</ul>
      <a href="/#gallery" className="svc-link">READ THE COVERAGE</a>
    </section>

    {/* Method */}
    <section className="pillars">
      <span className="pillars-kicker">The Method</span>
      <h2 className="pillars-head display">The Embrowerment®<br />Method</h2>
      <p className="svc-intro">The Embrowerment® Method is Umbreen's proprietary approach to precision threading, facial harmony, and natural-looking results. It isn't about trends, extremes, or quick fixes. Every service, from threading to nanoblading, is delivered through this same framework by technicians who are certified in it.</p>
      <div className="pillar-grid">
        {method.map(([n, t, d]) => <div className="pillar" key={n}><span className="pillar-num">{n}</span><h3>{t}</h3><p>{d}</p></div>)}
      </div>
    </section>

    {/* Services */}
    <section className="svc-list" id="services">
      <span className="pillars-kicker">Services</span>
      <h2 className="display">Umbreen's Signature Brow Services</h2>
      <p className="svc-intro">As an eyebrow specialist in NYC, Umbreen applies the Embrowerment® Method across every service, including precision shaping and semi-permanent brow artistry.</p>
      <div className="svc-grid">
        {services.map(([cat, title, desc], i) => <article className="svc-card" key={title}>
          <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="svc-cat">{cat}</span>
          <h3>{title}</h3>
          <p>{desc}</p>
        </article>)}
      </div>
      <p className="svc-note">All Embrowerment® Semi-Permanent Makeup services begin with a complimentary consultation, personally conducted by Umbreen, to assess candidacy and long-term outcomes.</p>
    </section>

    {/* Studio */}
    <section className="motion svc-studio"><div className="motion-frame"><img src={session} alt="Umbreen at work in the studio" loading="lazy" />
      <div className="motion-tag">HER BROW ARTIST STUDIO</div>
      <div className="motion-caption svc-studio-caption">
        <div>
          <h3 className="serif">Find Umbreen in New York City</h3>
          <p className="svc-studio-text">Umbreen has established herself as a brow expert in NYC through her work at Wink Brow Bar, her destination for elevated brow artistry since 2014. Here, brows become beauty architecture, and every technician is certified in the Embrowerment® Method.</p>
          <div className="svc-studios">{studios.map(([n, a, c]) => <div key={n}><h4>{n}</h4><p>{a}<br />{c}</p></div>)}</div>
          <a href="https://www.winkbrowbar.com" target="_blank" rel="noreferrer" className="svc-link svc-link--light">VISIT WINK BROW BAR</a>
        </div>
      </div>
    </div></section>

    {/* Journey */}
    <section className="declare svc-journey">
      <span className="pillars-kicker">Umbreen's Journey in Brow Artistry</span>
      <p className="sub">Umbreen Sheikh built her career around a simple belief: brows are not one-size-fits-all. After thousands of transformations, she recognized the power of the entire Eye Zone to shape the face and developed the Embrowerment® Method, her signature approach to personalized brow artistry.</p>
      <blockquote className="svc-quote">“I couldn't find a single place in New York City that combined expert threading, high hygiene standards, and custom shaping suited to the person's face. I knew there had to be a better way, a place where brows are tailored, precision is key, and artistry meets self-care.”<cite>— Umbreen Sheikh</cite></blockquote>
    </section>

    {/* Journal */}
    <section className="svc-journal">
      <span className="pillars-kicker">The Eye Zone Journal</span>
      <h2 className="display">The Eye Zone Journal</h2>
      <p className="svc-intro">Evidence-based insights by Umbreen on brows, lashes, and the skin around the eyes, translating peer-reviewed scientific research into practical guidance for beauty professionals and consumers.</p>
      <div className="svc-journal-empty serif">New articles coming soon.</div>
    </section>

    {/* FAQ */}
    <section className="svc-faq">
      <span className="pillars-kicker">FAQ</span>
      <h2 className="display">Frequently Asked Questions</h2>
      <div className="svc-faq-list">
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>

    {/* CTA */}
    <section className="declare svc-cta">
      <h2 className="display">Book your brow<br /><em>transformation</em>.</h2>
      <p className="sub">Start with a consultation. Umbreen reads your structure and builds a plan for your brows and eye zone, delivered through the Embrowerment® Method.</p>
      <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="svc-cta-btn">BOOK NOW <span aria-hidden="true">→</span></a>
    </section>

    <Footer />
  </main>;
}