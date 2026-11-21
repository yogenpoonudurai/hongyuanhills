import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { halls } from "../content/halls";
import { SITE_URL } from "../lib/metadata";

type Route = { path: string; priority: string };

// Extend this list as interior pages ship.
const routes: Route[] = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/services/feng-shui-grounds", priority: "0.9" },
  { path: "/services/columbarium", priority: "0.9" },
  { path: "/services/funeral-services", priority: "0.8" },
  { path: "/services/ancestral-tablets", priority: "0.7" },
  { path: "/pre-planning", priority: "0.9" },
  { path: "/contact", priority: "0.8" },
  { path: "/privacy-policy", priority: "0.3" },
  { path: "/terms", priority: "0.3" },
  ...halls.map((hall) => ({
    path: `/services/columbarium/${hall.slug}`,
    priority: "0.8",
  })),
];

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .flatMap(({ path: routePath, priority }) => {
    const clean = routePath === "/" ? "" : routePath.replace(/\/$/, "");
    const zh = `${SITE_URL}${clean ? `${clean}/` : "/"}`;
    const en = `${SITE_URL}${clean ? `/en${clean}/` : "/en/"}`;

    return [zh, en].map(
      (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${zh}" />
  </url>`,
    );
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

const outputDir = path.join(process.cwd(), "public");
mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap with ${routes.length * 2} URLs.`);
