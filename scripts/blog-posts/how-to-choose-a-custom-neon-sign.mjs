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
  // Only publicly readable ids. A dotted id resolves to null for anonymous
  // reads, and a null in this list crashed the post route in production
  // (2026-09-27). The eight dotted launch posts stay out until
  // scripts/migrate-doc-ids.mjs runs.
  relatedPosts: [
    "post-how-to-choose-the-right-neon-color-for-your-sign", // colour guide
    "53a1de04-8eec-4731-a6c4-257845c41225", // custom-neon-signs-for-bedroom-and-home-decor
    "0878952d-1694-473b-a816-ee8be504cf0c", // custom-wedding-neon-signs-backdrop-guide
  ],
};

export default post;
