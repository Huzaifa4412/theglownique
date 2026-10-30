/**
 * How Long Does a Custom Neon Sign Take? Production Times, Rush Orders & Delivery Guide
 *
 * Comprehensive workshop turnaround guide addressing customer anxieties around
 * design mockup approvals, CNC routing, silicone flex bending, 48-hour QC burn-in,
 * express air courier transit, and event planning deadlines.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/how-long-does-a-custom-neon-sign-take.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real workshop photographs and custom branded infographics from public/blog directory. */
export const imageFiles = {
  "custom-neon-sign-lead-time-production-cover": "public/blog/how-long-does-a-custom-neon-sign-take/custom-neon-sign-lead-time-production-cover.webp",
  "custom-neon-sign-production-timeline-flowchart": "public/blog/how-long-does-a-custom-neon-sign-take/custom-neon-sign-production-timeline-flowchart.webp",
  "custom-sign-event-planning-countdown-matrix": "public/blog/how-long-does-a-custom-neon-sign-take/custom-sign-event-planning-countdown-matrix.webp",
  "protective-packaging-and-crating-delivery": "public/blog/how-long-does-a-custom-neon-sign-take/protective-packaging-and-crating-delivery.webp",
};

const slug = "how-long-does-a-custom-neon-sign-take";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-31T10:00:00Z",
  readingMinutes: 9,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "workshop-lead",
  relatedPosts: [
    "post-how-much-do-custom-neon-signs-cost",
    "post-can-you-leave-a-neon-sign-on-all-the-time",
    "post-why-is-my-neon-sign-flickering",
  ],
};

export default post;
