import type { MetadataRoute } from "next";

import { getCategoryRoutes, getPostRoutes } from "@/lib/blog";
import { INDEXABLE_ROUTES, ROUTE_IMAGES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap.
 *
 * Two sources, one file, and they are separate on purpose.
 *
 * STATIC routes come from the manifest in lib/routes.ts (TECH-05). Two
 * properties that file exists to guarantee:
 *
 * - `lastModified` is a real material modification date, not the build clock.
 *   An unchanged rebuild must not advance any date, and editing one page must
 *   move only that page's date. Both are asserted by scripts/seo-audit.mjs.
 * - Only indexable canonical URLs appear. Anything the manifest marks
 *   non-indexable cannot leak in, because the filter happens at the source.
 *
 * BLOG routes cannot come from a hand-maintained manifest — the whole point of
 * putting posts in Sanity is that publishing one is not a code change. They
 * carry the same two guarantees by other means: the date is the post's own
 * `updatedAt`/`publishedAt`, which an editor only bumps for a material change
 * (the schema says so at the field), and a post with `indexable: false` is
 * filtered out here exactly as a non-indexable static route is. That flag also
 * drives the `noindex` on the page itself, so the two cannot disagree.
 *
 * `changeFrequency` and `priority` are carried for other consumers; Google
 * ignores both, so neither is worth spending attention on.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Image entries: the photographs each page renders (lib/routes.ts
  // ROUTE_IMAGES), so image search can find them — several filenames contain
  // spaces, hence the encoding.
  const staticEntries: MetadataRoute.Sitemap = INDEXABLE_ROUTES.map((route) => {
    const images = ROUTE_IMAGES.get(route.path);
    return {
      url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
      lastModified: new Date(route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(images && images.length > 0 ? { images: images.map((src) => encodeURI(`${SITE_URL}${src}`)) } : {}),
    };
  });

  const [posts, categories] = await Promise.all([getPostRoutes(), getCategoryRoutes()]);

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.indexable !== false)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  /**
   * Archives get the date of the newest post they contain. A category page's
   * content genuinely is its post list, so "changed when a post was added" is
   * the honest answer — and it means an archive nobody has published into for
   * a year stops claiming to be fresh.
   */
  const newestByCategory = new Date(
    posts.length > 0
      ? Math.max(...posts.map((post) => new Date(post.updatedAt ?? post.publishedAt).getTime()))
      : Date.now(),
  );

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/blog/category/${category.slug}`,
    lastModified: newestByCategory,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
