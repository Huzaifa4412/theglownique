import type { MetadataRoute } from "next";

import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";

// Derived from PRODUCT_PAGES so the sitemap can never drift from the catalog.
// Add new routes here as content pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...PRODUCT_PAGES.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
