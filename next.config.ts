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
  async headers() {
    return [
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
    ];
  },
};

export default nextConfig;
