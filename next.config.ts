import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // AVIF first, WebP fallback. Order matters: the first format matching the
    // request's Accept header wins.
    formats: ["image/avif", "image/webp"],
    // Blog imagery is uploaded to Sanity and served from its asset CDN. Scoped
    // to the asset host only — a wildcard here would let any Sanity project's
    // URL be proxied through, and paid for, by this deployment.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    // Product photography doesn't change once shipped — cache optimized
    // variants for 31 days instead of the 4-hour default.
    minimumCacheTTL: 2678400,
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required by the PostHog /ingest proxy above, whose API paths end in "/".
  // It also switches off Next's own trailing-slash normalisation for every
  // page, which left /business-signs/ and /business-signs both answering 200.
  // The first redirect below puts that normalisation back for everything
  // except the proxy and the API.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Sign-type consolidation (2026-09-24). Each of these products had a
      // second, thinner page under /business-signs aimed at the same query;
      // the two competed for one intent and split every signal. The
      // /business-signs URL — the one whose slug matches the head term — is
      // now the only page, and ProductPage.path in lib/product-catalog.ts is
      // the single source for it.
      {
        source: "/products/3d-metal-neon-signs",
        destination: "/business-signs/channel-letter-signs",
        statusCode: 301,
      },
      {
        source: "/products/ultra-thin-lightbox",
        destination: "/business-signs/lightbox-signs",
        statusCode: 301,
      },
      {
        source: "/products/uv-print-acrylic-signs",
        destination: "/business-signs/acrylic-logo-signs",
        statusCode: 301,
      },
      {
        // /business-signs/ -> /business-signs, one hop, query string kept.
        // The first segment is matched with a lookahead that ends at a "/"
        // or the end of the path, so /ingest/e/ and /api/leads/ never match
        // (a bare "$" would end at the end of the whole URL and let them in).
        // Custom routes compile in strict mode, so the trailing "/" in the
        // source is required and the redirect cannot loop.
        source: "/:first((?!ingest(?:/|$)|api(?:/|$))[^/]+)/:rest*/",
        destination: "/:first/:rest*",
        // 301 rather than Next's default 308: Google treats them the same,
        // Bing's webmaster guidelines only name 301.
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        // The production deployment also answers on theglownique.vercel.app
        // (HTTP 200, index,follow). Its canonical tags already point at www,
        // but the alias should not be indexable in its own right. A header
        // rather than a redirect, so anything that talks to the deployment
        // URL directly (webhooks, preview checks) keeps working.
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        // Sanity Studio is not public content (TECH-02).
        //
        // The header is what actually removes it from search results, and it
        // only works because robots.txt deliberately does NOT disallow /studio:
        // a crawler that is blocked from fetching the page never sees a noindex
        // and will happily keep a known URL in the index indefinitely. Allow the
        // fetch, serve the refusal.
        //
        // This is a mitigation, not access control. Anyone can still load the
        // Studio. Putting it behind authentication, or not deploying it on the
        // public frontend at all, is still the open product decision.
        source: "/studio/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, noimageindex",
          },
        ],
      },
      {
        source: "/studio",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, noimageindex",
          },
        ],
      },
      {
        // Cache static public media assets aggressively (1 year immutable)
        source: "/:path*.(ico|png|jpg|jpeg|webp|avif|svg|mp4|webm|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
