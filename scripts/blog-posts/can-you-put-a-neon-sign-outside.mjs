/**
 * Can You Put a Neon Sign Outside? IP Ratings, Weatherproofing & Setup Guide
 *
 * Comprehensive engineering care & setup guide addressing real customer questions
 * and commercial anxieties around outdoor weatherproofing, IP65 vs IP67 ingress ratings,
 * moisture protection, exterior power supply wiring, and wind-load mounting.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/can-you-put-a-neon-sign-outside.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real workshop photographs from public/blog directory. */
export const imageFiles = {
  "outdoor-led-neon-sign-patio": "public/blog/can-you-put-a-neon-sign-outside/outdoor-led-neon-sign-patio.webp",
  "ip65-vs-ip67-neon-waterproof-seal": "public/blog/can-you-put-a-neon-sign-outside/ip65-vs-ip67-neon-waterproof-seal.webp",
};

const slug = "can-you-put-a-neon-sign-outside";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-24T10:00:00Z",
  readingMinutes: 7,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "workshop-lead",
  relatedPosts: [
    "post-can-you-leave-a-neon-sign-on-all-the-time",
    "post-how-long-do-led-neon-signs-last",
    "post-how-to-hang-a-neon-sign",
  ],
};

export default post;
