/**
 * How to choose a custom neon sign: the buyer's-guide pillar for the
 * sign-basics cluster.
 *
 * It summarises each decision (purpose, sign type, size, font, colour,
 * backboard, mounting) and links to the page that owns the detail, so it
 * supports those pages rather than competing with them. Research, keyword
 * ownership and the link-building plan are in
 * SEO-Optimization/blog-drafts/how-to-choose-a-custom-neon-sign/.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/how-to-choose-a-custom-neon-sign.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real 600 × 600 order photographs, not renders. */
export const imageFiles = {
  "living-room-family-name-sign": "public/blog/how-to-choose-a-custom-neon-sign/living-room-family-name-sign.webp",
  "handheld-name-sign-scale": "public/blog/how-to-choose-a-custom-neon-sign/handheld-name-sign-scale.webp",
  "wedding-backdrop-name-sign": "public/blog/how-to-choose-a-custom-neon-sign/wedding-backdrop-name-sign.webp",
  "home-bar-neon-sign": "public/blog/how-to-choose-a-custom-neon-sign/home-bar-neon-sign.webp",
};

const slug = "how-to-choose-a-custom-neon-sign";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-09-26T09:00:00Z",
  readingMinutes: 10,
  imageFiles,
});

export const post = {
  ...basePost,
  // Own author record, so the byline does not change every post that uses
  // the shared workshop-lead document. Created with the post (2026-09-26).
  authorSlug: "john",
  relatedPosts: [
    "post.how-to-hang-a-neon-sign", // seeded with a dotted id
    "post-how-to-choose-the-right-neon-color-for-your-sign", // neon colour guide
    "post.how-long-do-led-neon-signs-last", // seeded with a dotted id
  ],
};

export default post;
