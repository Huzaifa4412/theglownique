/**
 * How Much Do Custom Neon Signs Cost? (2026 Price & Sizing Breakdown)
 *
 * Pillar pricing guide targeting high-commercial-intent bottom-of-funnel queries
 * identified in Ubersuggest research and SEO-Optimization roadmap.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/how-much-do-custom-neon-signs-cost.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real 600 × 600 order and workshop photographs. */
export const imageFiles = {
  "custom-neon-sign-cost-tiers": "public/blog/how-much-do-custom-neon-signs-cost/custom-neon-sign-cost-tiers.webp",
  "small-bedroom-name-sign": "public/blog/how-much-do-custom-neon-signs-cost/small-bedroom-name-sign.webp",
  "backboard-cut-styles-cost": "public/blog/how-much-do-custom-neon-signs-cost/backboard-cut-styles-cost.webp",
  "wedding-event-neon-sign": "public/blog/how-much-do-custom-neon-signs-cost/wedding-event-neon-sign.webp",
};

const slug = "how-much-do-custom-neon-signs-cost";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-06T12:00:00Z",
  readingMinutes: 8,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "john",
  relatedPosts: [
    "post-how-to-choose-a-custom-neon-sign",
    "post-led-neon-vs-glass-neon",
    "53a1de04-8eec-4731-a6c4-257845c41225",
  ],
};

export default post;
