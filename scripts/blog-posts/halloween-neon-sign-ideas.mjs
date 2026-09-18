/**
 * Halloween neon sign ideas: seasonal styling and practical inspiration.
 *
 * Published with `node scripts/publish-blog-post.mjs scripts/blog-posts/halloween-neon-sign-ideas.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Images the runner uploads before writing the document. */
export const imageFiles = {
  "pumpkin-coffee-corner": "public/blog/halloween-neon-sign-ideas/pumpkin-coffee-corner.webp",
  "ghost-photo-backdrop": "public/blog/halloween-neon-sign-ideas/ghost-photo-backdrop.webp",
};

const slug = "halloween-neon-sign-ideas";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-09-15T09:00:00Z",
  readingMinutes: 7,
  imageFiles,
});

export const post = {
  ...basePost,
  relatedPosts: [
    "deb00bb2-d36b-4710-ac02-76e06543e53c", // custom-neon-signs-for-bars-and-cafes
    "post-how-to-choose-the-right-neon-color-for-your-sign", // neon color guide
  ],
};

export default post;
