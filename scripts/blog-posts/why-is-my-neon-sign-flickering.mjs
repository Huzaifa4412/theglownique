/**
 * Why Is My Neon Sign Flickering? How to Diagnose Drivers, Dimmers & Wiring
 *
 * Comprehensive workshop troubleshooting guide addressing customer and technical queries
 * around flickering neon signs, power supply failures, inline PWM dimmer issues,
 * loose DC barrel connectors, and camera shutter rolling banding.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/why-is-my-neon-sign-flickering.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real workshop photographs and custom branded infographic from public/blog directory. */
export const imageFiles = {
  "flickering-neon-sign-troubleshooting-cover": "public/blog/why-is-my-neon-sign-flickering/flickering-neon-sign-troubleshooting-cover.webp",
  "neon-sign-flickering-diagnostic-flowchart": "public/blog/why-is-my-neon-sign-flickering/neon-sign-flickering-diagnostic-flowchart.webp",
  "neon-sign-power-supply-and-dimmer-connection": "public/blog/why-is-my-neon-sign-flickering/neon-sign-power-supply-and-dimmer-connection.webp",
  "commercial-neon-sign-stable-illumination": "public/blog/why-is-my-neon-sign-flickering/commercial-neon-sign-stable-illumination.webp",
};

const slug = "why-is-my-neon-sign-flickering";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-28T10:00:00Z",
  readingMinutes: 14,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "workshop-lead",
  relatedPosts: [
    "post-can-you-leave-a-neon-sign-on-all-the-time",
    "post-how-long-do-led-neon-signs-last",
    "post-can-you-put-a-neon-sign-outside",
  ],
};

export default post;
