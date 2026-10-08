import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Nav, Footer, Motion } from "@/components/site";
import { HomeHero, Featured, About, Method, Services, GoodCompany, PressLogos, Founder, Ventures, Instagram, FindUmbreen, Faq, FinalCta, faqs } from "@/components/home";

const TITLE = "Umbreen Sheikh | Brow Artist & Eyebrow Specialist in NYC";
const DESCRIPTION = "Umbreen Sheikh is a NYC brow artist and eye-zone expert specializing in personalized brow shaping, threading and lamination. Book an appointment in New York City.";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "Brow Artist" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...seo("/").meta,
    ],
    links: seo("/").links,
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  }),
  component: Index,
});

function Index() {
  return <main className="v2">
    <Nav />
    <HomeHero />
    <Featured />
    <About />
    <Method />
    <Motion />
    <Services />
    {/* <GoodCompany /> */}
    <PressLogos />
    <Founder />
    <Ventures />
    <Instagram />
    <FindUmbreen />
    <Faq />
    <FinalCta />
    <Footer />
  </main>;
}
