/**
 * Backlit Signage vs Light Box Signs: Architectural Engineering & Placement Guide
 *
 * Comprehensive workshop guide comparing halo-backlit 3D metal letters vs.
 * ultra-thin edge-lit acrylic light guide plate (LGP) light box signs.
 * Covers optical reflection paths, standoff distances, wall finish dependencies,
 * ADA §307.2 protrusion limits, Class 2 12V driver placement, and commercial
 * hybrid fit-out floor plans.
 *
 * Published with
 * `node scripts/publish-blog-post.mjs scripts/blog-posts/backlit-signage-vs-light-box-signs.mjs`.
 */

import { loadEditorialPost } from "../blog-seed/load-editorial-post.mjs";

/** Real workshop photographs and custom branded infographic from public/blog directory. */
export const imageFiles = {
  "backlit-signage-salon-reception": "public/blog/backlit-signage-vs-light-box-signs/backlit-signage-salon-reception.webp",
  "backlit-signage-vs-lightbox-engineering-diagram": "public/blog/backlit-signage-vs-light-box-signs/backlit-signage-vs-lightbox-engineering-diagram.webp",
  "round-lightbox-sign-interior": "public/blog/backlit-signage-vs-light-box-signs/round-lightbox-sign-interior.webp",
  "restaurant-menu-lightbox-display": "public/blog/backlit-signage-vs-light-box-signs/restaurant-menu-lightbox-display.webp",
};

const slug = "backlit-signage-vs-light-box-signs";

const basePost = loadEditorialPost({
  slug,
  id: `post-${slug}`,
  publishedAt: "2026-10-27T10:00:00Z",
  readingMinutes: 13,
  imageFiles,
});

export const post = {
  ...basePost,
  authorSlug: "workshop-lead",
  relatedPosts: [
    "post-types-of-channel-letter-signs",
    "custom-acrylic-signs-office-wall-guide",
    "post-can-you-put-a-neon-sign-outside",
  ],
};

export default post;
