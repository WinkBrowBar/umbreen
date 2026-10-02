export type ServiceContent = {
  slug: string;
  meta: { title: string; description: string; keyword: string };
  hero: { kicker: string; title: string; lead: string; note: string; image: string | null; imageLabel: string };
  intro: { title: string; body: string[] }[];
  steps: { kicker: string; title: string; items: [string, string][] };
  pricing: { title: string; intro?: string; items: { name: string; price: string; desc: string; tag?: string }[]; offer?: { kicker: string; title: string; lines: string[] } };
  who: { title: string; intro: string; items: string[] };
  aftercare: { title: string; items: string[] };
  crossLink: { text: string; label: string; to: string };
  cta: { title: string; body: string };
  faqs: [string, string][];
};