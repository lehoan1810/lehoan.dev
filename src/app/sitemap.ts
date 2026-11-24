import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Bump when the home page content changes. A constant (not `new Date()`) keeps the
 * sitemap fully static under Cache Components and stops `lastmod` changing on every build.
 */
const CONTENT_UPDATED_AT = "2026-11-25";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/opengraph-image")],
    },
  ];
}
