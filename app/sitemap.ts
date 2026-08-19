import type { MetadataRoute } from "next";

import { INDEXABLE_ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap, generated from the route manifest in lib/routes.ts (TECH-05).
 *
 * Two properties this file exists to guarantee:
 *
 * - `lastModified` is a real material modification date, not the build clock.
 *   An unchanged rebuild must not advance any date, and editing one page must
 *   move only that page's date. Both are asserted by scripts/seo-audit.mjs.
 * - Only indexable canonical URLs appear. Anything the manifest marks
 *   non-indexable cannot leak in, because the filter happens at the source.
 *
 * `changeFrequency` and `priority` are carried for other consumers; Google
 * ignores both, so neither is worth spending attention on.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
