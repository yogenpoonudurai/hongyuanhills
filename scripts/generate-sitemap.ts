import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "../lib/metadata";

type Route = { path: string; priority: string };

// Extend this list as interior pages ship.
const routes: Route[] = [{ path: "/", priority: "1.0" }];

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .flatMap(({ path: routePath, priority }) => {
    const clean = routePath === "/" ? "" : routePath.replace(/\/$/, "");
    const zh = `${SITE_URL}${clean || "/"}`;
    const en = `${SITE_URL}/en${clean}`;

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
