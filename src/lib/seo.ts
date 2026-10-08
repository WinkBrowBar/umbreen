/** Site-wide SEO helpers: canonical URL + social share image. */
export const SITE_URL = "https://www.umbreen.com"; // live domain (no trailing slash)
export const OG_IMAGE = `${SITE_URL}/images/og-umbreen.jpg`; // 1200×630

/** Canonical link + og:url for a page path, e.g. seo("/services"). */
export function seo(path: string) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    meta: [{ property: "og:url", content: url }],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Default share image tags (used in the root head, so every page has them). */
export const ogImageMeta = [
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Umbreen Sheikh, NYC brow artist" },
  { name: "twitter:image", content: OG_IMAGE },
];
