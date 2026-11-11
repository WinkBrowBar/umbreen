import { createFileRoute } from "@tanstack/react-router";
import { proxyXml } from "@/lib/feedProxy";

/** https://www.umbreen.com/sitemap.xml — pages + blog posts + categories (built by the blog API). */
export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: () => proxyXml("/sitemap.xml", "application/xml") } },
});
