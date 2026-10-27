/**
 * Channel Letter Signs: Types, Lighting & Mounting Guide
 *
 * Comprehensive engineering guide addressing storefront retail and commercial
 * queries around channel letter signs, front-lit vs halo-lit (reverse),
 * dual-lit combination illumination, low-voltage Class 2 electrical safety,
 * raceway vs flush mounting methods, and municipal UL 48 permits.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/types-of-channel-letter-signs.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real workshop photographs from public/blog directory. */
export const imageFiles = {
  "channel-letter-signs-storefront": "public/blog/types-of-channel-letter-signs/channel-letter-signs-storefront.webp",
  "front-lit-vs-halo-lit-channel-letters": "public/blog/types-of-channel-letter-signs/front-lit-vs-halo-lit-channel-letters.webp",
  "dual-lit-channel-letters-commercial": "public/blog/types-of-channel-letter-signs/dual-lit-channel-letters-commercial.webp",
  "halo-lit-reverse-channel-letters-office": "public/blog/types-of-channel-letter-signs/halo-lit-reverse-channel-letters-office.webp",
};

const slug = "types-of-channel-letter-signs";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-26T10:00:00Z",
  readingMinutes: 10,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "workshop-lead",
  relatedPosts: [
    "post-can-you-put-a-neon-sign-outside",
    "post-can-you-leave-a-neon-sign-on-all-the-time",
    "post-how-to-hang-a-neon-sign",
  ],
};

export default post;
