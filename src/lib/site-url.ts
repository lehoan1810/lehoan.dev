/**
 * Absolute origin of the deployed site, used for canonical URLs, Open Graph,
 * sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL in production.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const siteUrl = resolveSiteUrl();

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();
