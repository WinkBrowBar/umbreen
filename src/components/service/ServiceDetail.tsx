import { seo } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site";
import { Img } from "@/components/home/Placeholder";
import { BOOKING_URL } from "@/lib/links";
import type { ServiceContent } from "./types";

export function serviceHead(c: ServiceContent, path: string) {
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: c.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return {
    meta: [
      { title: c.meta.title },
      { name: "description", content: c.meta.description },
      { name: "keywords", content: c.meta.keyword },
      { property: "og:title", content: c.meta.title },
      { property: "og:description", content: c.meta.description },
      { property: "og:type", content: "website" },
      ...seo(path).meta,
    ],
    links: seo(path).links,
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  };
}

const n = (i: number) => String(i + 1).padStart(2, "0");

export function ServiceDetail({ c }: { c: ServiceContent }) {
  return <main className="v2 sd">
    <Nav />

    <section className="sd-hero">
      <div className="sd-hero-text">
        <div className="sd-crumbs" role="navigation" aria-label="Breadcrumb"><Link to="/services">Services</Link><span>/</span><span>{c.hero.title.replace(/ in NYC$/, "")}</span></div>
        <span className="v2-kicker">{c.hero.kicker}</span>
        <h1>{c.hero.title}</h1>
        <p className="sd-lead">{c.hero.lead}</p>
        <p className="sd-note">{c.hero.note}</p>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn v2-btn--light">Book an Appointment <span aria-hidden="true">→</span></a>
      </div>
      <div className="sd-hero-media"><Img src={c.hero.image} alt={c.hero.title} label={c.hero.imageLabel} /></div>
    </section>

    <section className="sd-intro">
      {c.intro.map((b) => <article key={b.title}>
        <h2>{b.title}</h2>
        {b.body.map((p, i) => <p key={i}>{p}</p>)}
      </article>)}
    </section>

    <section className="sd-steps">
      <div className="v2-head"><span className="v2-kicker">{c.steps.kicker}</span><h2>{c.steps.title}</h2></div>
      <ol>{c.steps.items.map(([t, d], i) => <li key={t}><span className="v2-num">{n(i)}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
    </section>

    <section className="sd-pricing">
      <div className="v2-head"><span className="v2-kicker">Pricing</span><h2>{c.pricing.title}</h2>{c.pricing.intro && <p>{c.pricing.intro}</p>}</div>
      <div className="sd-price-grid">
        {c.pricing.items.map((p) => <article key={p.name} className={`sd-price${p.tag ? " sd-offer" : ""}`}>
          {p.tag && <span className="sd-tag">{p.tag}</span>}
          <h3>{p.name}</h3>
          <p className="sd-amount">{p.price}</p>
          <p>{p.desc}</p>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-link">Book this service <span aria-hidden="true">→</span></a>
        </article>)}
        {c.pricing.offer && <article className="sd-price sd-offer">
          <span className="sd-tag">{c.pricing.offer.kicker}</span>
          <h3>{c.pricing.offer.title}</h3>
          {c.pricing.offer.lines.map((l, i) => <p key={i}>{l}</p>)}
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-link">Claim the offer <span aria-hidden="true">→</span></a>
        </article>}
      </div>
    </section>

    <section className="sd-lists">
      <article>
        <span className="v2-kicker">Is it for you?</span>
        <h2>{c.who.title}</h2>
        <p>{c.who.intro}</p>
        <ul className="sd-check">{c.who.items.map((it) => <li key={it}>{it}</li>)}</ul>
      </article>
      <article>
        <span className="v2-kicker">Aftercare</span>
        <h2>{c.aftercare.title}</h2>
        <ol className="sd-care">{c.aftercare.items.map((it, i) => <li key={i}><span className="v2-num">{n(i)}</span><p>{it}</p></li>)}</ol>
      </article>
    </section>

    <aside className="sd-cross"><p>{c.crossLink.text} <Link to={c.crossLink.to}>{c.crossLink.label}</Link>.</p></aside>

    <section className="sd-cta">
      <span className="v2-kicker">Book with Umbreen</span>
      <h2>{c.cta.title}</h2>
      <p>{c.cta.body}</p>
      <div className="v2-actions">
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="v2-btn v2-btn--light">Book an Appointment <span aria-hidden="true">→</span></a>
        <Link to="/services" className="v2-link">See Full Menu <span aria-hidden="true">→</span></Link>
      </div>
    </section>

    <section className="svc-faq v2-faq sd-faq">
      <span className="v2-kicker">FAQ</span>
      <h2>Frequently Asked Questions</h2>
      <div className="svc-faq-list">{c.faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </section>

    <Footer />
  </main>;
}