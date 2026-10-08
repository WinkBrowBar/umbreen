import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, PageHead } from "@/components/site";

const portrait = { url: "/images/umbreen-02.png" };
const session = { url: "/images/umbreen-03.jpeg" };

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Umbreen Sheikh" },
    { name: "description", content: "A letter from Umbreen Sheikh, founder of Wink Brow Bar and creator of The Embrowerment® Method." },
    { property: "og:title", content: "About — Umbreen Sheikh" },
    { property: "og:description", content: "Brows are not one-size-fits-all. The story behind Wink Brow Bar and The Embrowerment® Method." },
    ...seo("/about").meta,
  ], links: seo("/about").links }),
  component: About,
});

function About() {
  return <main className="brand-font">
    <Nav />
    <PageHead kicker="About" title={<>Brows are not<br />one-size-fits-all.</>}>
      Founder of Wink Brow Bar and creator of The Embrowerment® Method — a practice built on anatomy, growth behavior, and long-term management.
    </PageHead>
    <section className="statement">
      <div className="statement-text"><h2 className="display">A letter<br />for you.</h2>
        <div className="body">
          <p>I began my career with a simple but foundational belief: brows are not one-size-fits-all.</p>
          <p>Starting out in New York City, I saw that brow services too often felt rushed and impersonal. That gap is what led me to create Wink Brow Bar — personalized, hygiene-focused brow threading, done with care.</p>
          <p>Over time, I began to see that brows alone don't define a face, the entire eye zone does. Structural balance, growth patterns, and long-term planning matter as much as the shape itself.</p>
          <p>That became The Embrowerment® Method: a strategic, method-based approach to brow and eye-zone refinement, rooted in anatomy, growth behavior, and long-term management.</p>
          <p>Today, I work with clients who value intention over impulse, expertise over volume, and results that feel like themselves, just more refined. My role is to guide, not override, and to empower clients with clarity, structure, and confidence in their brows.</p>
          <p className="signoff serif">— Umbreen</p>
        </div>
      </div>
      <figure><img src={portrait.url} alt="Umbreen Sheikh, close portrait" loading="lazy" /></figure>
    </section>
    <section className="pillars"><span className="pillars-kicker">My Approach</span><h2 className="pillars-head display">A passion project,<br />evolved.</h2>
      <div className="pillar-grid two">
        <div className="pillar"><span className="pillar-num">01</span><h3>Simple ideas</h3><p>Holding to my values and creating thoughtful, lasting work — at every step, with every client.</p></div>
        <div className="pillar"><span className="pillar-num">02</span><h3>Lasting impact</h3><p>Building with clarity, acting with integrity, and staying curious about what the eye zone can teach.</p></div>
      </div>
    </section>
    <section className="motion"><div className="motion-frame"><img src={session.url} alt="Umbreen Sheikh at work" loading="lazy" /><div className="motion-tag">WINK BROW BAR · NEW YORK</div><div className="motion-caption"><div><h3 className="serif">Intention over impulse.</h3><p>EXPERTISE OVER VOLUME</p></div></div></div></section>
    <section className="declare"><h2 className="display">To guide,<br />not <em>override</em>.</h2><p className="sub">Concierge 646.846.5041 · Monday–Sunday, 2:00–7:00 PM EST. For press, media and appointments: hello@umbreen.com</p></section>
    <Footer />
  </main>;
}