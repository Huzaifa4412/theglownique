import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // AVIF first, WebP fallback. Order matters: the first format matching the
    // request's Accept header wins.
    formats: ["image/avif", "image/webp"],
    // Product photography doesn't change once shipped — cache optimized
    // variants for 31 days instead of the 4-hour default.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
