import { createFileRoute } from "@tanstack/react-router";
import { seo, SITE_URL } from "@/lib/seo";
import { Nav, Footer, Motion } from "@/components/site";
import { HomeHero, Featured, About, Method, Services, GoodCompany, PressLogos, Founder, Ventures, Instagram, FindUmbreen, Faq, FinalCta, Shop, faqs } from "@/components/home";

const TITLE = "Umbreen Sheikh | Brow Artist & Eyebrow Specialist in NYC";
const DESCRIPTION = "Umbreen Sheikh is a NYC brow artist and eye-zone expert specializing in personalized brow shaping, threading and lamination. Book an appointment in New York City.";

/* Homepage structured data (from the SEO schema doc). The FAQ part is built from the visible FAQ list so the two always match. */
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Umbreen Sheikh",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/umbreen-00.png`,
      jobTitle: ["Brow Artist", "Entrepreneur", "Eye-Zone Expert"],
      description: "Umbreen Sheikh is a New York City brow artist, entrepreneur and eye-zone expert. She is the founder of Wink Brow Bar, creator of the Embrowerment® Method, and founder of the Eye Zone Professional Association and Embrowerment Foundation.",
      email: "hello@umbreen.com",
      alumniOf: { "@type": "CollegeOrUniversity", name: "King's College London" },
      hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Licensed Cosmetologist" },
      sameAs: [
        "https://www.instagram.com/thisisumbreen",
        "https://www.youtube.com/@thisisumbreen",
        "https://www.facebook.com/share/1EwqjLEpA4/",
        "http://linkedin.com/in/thisisumbreen",
      ],
      worksFor: { "@id": `${SITE_URL}/#wink-brow-bar` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#wink-brow-bar`,
      name: "Wink Brow Bar",
      url: `${SITE_URL}/`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "418 Broadway, STE N",
        addressLocality: "Albany",
        addressRegion: "NY",
        postalCode: "12207",
        addressCountry: "US",
      },
      founder: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Umbreen",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Umbreen Sheikh | Brow Artist & Eye-Zone Expert",
      description: "Discover Umbreen Sheikh's individualized approach to brow artistry and the eye zone, developed through the Embrowerment® Method.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      url: `${SITE_URL}/`,
      isPartOf: { "@id": `${SITE_URL}/#webpage` },
      mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
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
    scripts: [{ type: "application/ld+json", children: JSON.stringify(homeSchema) }],
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
    <Shop />
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
