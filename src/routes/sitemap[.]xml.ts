import { createFileRoute } from "@tanstack/react-router";
import { caseStudies } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

const staticPaths = [
  "/",
  "/work",
  "/case-studies",
  "/approach",
  "/example",
  "/trust",
  "/insights",
  "/contact",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...staticPaths,
          ...caseStudies.map((study) => `/case-studies/${study.slug}`),
        ];
        const urls = paths
          .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
