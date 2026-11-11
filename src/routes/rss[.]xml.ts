import { createFileRoute } from "@tanstack/react-router";
import { proxyXml } from "@/lib/feedProxy";

/** https://www.umbreen.com/rss.xml — journal feed (built by the blog API). */
export const Route = createFileRoute("/rss.xml")({
  server: { handlers: { GET: () => proxyXml("/rss.xml", "application/rss+xml") } },
});
