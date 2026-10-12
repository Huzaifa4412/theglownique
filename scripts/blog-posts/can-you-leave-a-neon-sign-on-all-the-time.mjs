/**
 * Can You Leave a Neon Sign On All the Time? Power, Safety & 24/7 Running Costs
 *
 * Pillar care & setup guide addressing real customer anxieties around 24/7
 * operation, overnight bedroom usage, fire safety, and energy costs.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/can-you-leave-a-neon-sign-on-all-the-time.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real workshop photographs from public/blog directory. */
export const imageFiles = {
  "neon-sign-bedroom-night": "public/blog/can-you-leave-a-neon-sign-on-all-the-time/neon-sign-bedroom-night.webp",
  "safe-touch-neon-sign": "public/blog/can-you-leave-a-neon-sign-on-all-the-time/safe-touch-neon-sign.webp",
  "commercial-neon-24-7-bar": "public/blog/can-you-leave-a-neon-sign-on-all-the-time/commercial-neon-24-7-bar.webp",
};

const slug = "can-you-leave-a-neon-sign-on-all-the-time";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-12T12:00:00Z",
  readingMinutes: 7,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "workshop-lead",
  relatedPosts: [
    "post-how-long-do-led-neon-signs-last",
    "post-how-to-clean-led-neon-signs",
    "post-how-to-hang-a-neon-sign",
  ],
};

export default post;
