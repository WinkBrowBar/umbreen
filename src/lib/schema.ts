/** Shared schema.org (JSON-LD) entities, as specified in the "Schema Markup | Umbreen" doc. */
import { SITE_URL } from "./seo";

export const PERSON_ID = `${SITE_URL}/#person`;
export const SALON_ID = `${SITE_URL}/#albany-location`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const SAME_AS = [
  "https://www.instagram.com/thisisumbreen",
  "https://www.youtube.com/@thisisumbreen",
  "https://www.facebook.com/share/1EwqjLEpA4/",
  "http://linkedin.com/in/thisisumbreen",
];

/** Short Person entity used on service pages (the homepage has the full version). */
export const personShort = (withImage = false) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Umbreen Sheikh",
  url: `${SITE_URL}/`,
  ...(withImage ? { image: `${SITE_URL}/images/umbreen-00.png` } : {}),
  jobTitle: "Brow Artist, Entrepreneur and Eye-Zone Expert",
  email: "hello@umbreen.com",
  sameAs: SAME_AS,
});

export const salon = {
  "@type": "BeautySalon",
  "@id": SALON_ID,
  name: "Wink Brow Bar",
  url: `${SITE_URL}/`,
  founder: { "@id": PERSON_ID },
  address: {
    "@type": "PostalAddress",
    streetAddress: "418 Broadway, STE N",
    addressLocality: "Albany",
    addressRegion: "NY",
    postalCode: "12207",
    addressCountry: "US",
  },
};

export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "Umbreen",
  publisher: { "@id": PERSON_ID },
  inLanguage: "en-US",
};

export const ldScript = (graph: object[]) => ({ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) });
