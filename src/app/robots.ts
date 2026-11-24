import type { MetadataRoute } from "next";
import { allowIndexing } from "@/data/site";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/**
 * Static metadata route: prerendered to /robots.txt at build time.
 * Crawling is always allowed: blocking it would hide the page's noindex tag,
 * and the bare URL could still end up in search results.
 */
export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = [{ userAgent: "*", allow: "/" }];
  if (!allowIndexing) return { rules };
  return { rules, sitemap: absoluteUrl("/sitemap.xml"), host: siteUrl };
}
