import { createFileRoute } from "@tanstack/react-router";
import { Nav, Hero, SocialStrip, Statement, Pillars, Press, Motion, Gallery, Product, Declare, Footer } from "@/components/site";

export const Route = createFileRoute("/draft-home")({
  head: () => ({ meta: [
    { name: "robots", content: "noindex, nofollow" },
    { title: "Umbreen Sheikh — Founder, Embrowerment®" },
    { name: "description", content: "Umbreen Sheikh, founder of Wink Brow Bar and creator of Embrowerment®, brings science and precision to brow artistry." },
    { property: "og:title", content: "Umbreen Sheikh — Founder, Embrowerment®" },
    { property: "og:description", content: "An eye-zone authority redefining brow artistry through method, science, and precision." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DraftHome,
});

/* Previous homepage, kept as a draft for reference. Not linked anywhere. */
function DraftHome() {
  return <main>
    <Nav />
    <Hero />
    <SocialStrip />
    <Statement />
    <Pillars />
    <Press />
    <Motion />
    <Gallery />
    <Product />
    <Declare />
    <Footer />
  </main>;
}
