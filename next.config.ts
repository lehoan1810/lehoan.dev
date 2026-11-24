import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  /**
   * Cache Components: everything is prerendered into a static shell; data is cached
   * explicitly with "use cache" + cacheLife/cacheTag (see src/lib/queries).
   */
  cacheComponents: true,
  /** Prefetch only the parts of a route that can change, reusing the shared shell. */
  partialPrefetching: true,

  /** Auto-memoizes components/hooks, so no hand-written useMemo/useCallback is needed. */
  reactCompiler: true,

  poweredByHeader: false,

  images: {
    // AVIF first (~20% smaller), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Optimized images can't be purged on demand, so keep this moderate (7 days).
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  experimental: {
    // Tailwind CSS is small: inlining it removes the render-blocking stylesheet request.
    inlineCss: true,
    // Native Rust port of the React Compiler inside Turbopack (faster builds).
    turbopackRustReactCompiler: true,
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Unhashed files in /public: cache for a day, then serve stale while revalidating.
        source: "/:file(.+\\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
