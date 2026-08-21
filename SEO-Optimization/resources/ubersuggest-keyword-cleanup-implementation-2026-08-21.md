# Ubersuggest keyword cleanup implementation — 2026-08-21

Source: Ubersuggest project `1bce609cccdc4cb663a1947aac8e1e45c721ef4419033bf5afc976ea29d974f6`, domain `theglownique.com`, US English (`loc_id 2840`).

## Implemented selection rules

- Reduced the rank-tracking set from 300 to 150 terms.
- Kept 20 strategic market benchmarks, 90 terms mapped to live pages, and 40 terms mapped to approved 90-day page clusters.
- Limited active page maps to one primary plus no more than seven secondary terms.
- Removed unsupported local-intent, parking, fluorescent, and beer/licensed-product terms.
- Removed exact and normalized word-order/singular-plural duplicates.
- Limited sub-100-volume terms to 15, each retained for exact product/page intent and comparatively low difficulty.
- Search volume and SEO difficulty are Ubersuggest estimates, not guaranteed traffic.

## Evidence files

- `ubersuggest-keywords-before-cleanup-2026-08-21.csv`: the complete 300-term pre-change snapshot.
- `ubersuggest-keyword-decision-register-2026-08-21.csv`: keep/remove decision and rationale for every pre-change term.
- `ubersuggest-keyword-map-2026-08-21.csv`: the final 150-term page and cohort map.

## Planned page clusters

The `planned_90_day` cohort reserves keywords for wedding, events, bar/cafe, gaming, home decor, restaurant, salon, retail, and gym pages. These routes are planning targets and must not be presented as live until implemented and verified.

## Implemented title alignment

- `/`: `Custom LED Neon Signs & Business Signage | The Glownique` (56 characters)
- `/business-signs/acrylic-logo-signs`: `Acrylic Logo Signs for Offices & Stores | The Glownique` (55 characters)
- `/business-signs/lightbox-signs`: `Lightbox Signs for Retail & Restaurants | The Glownique` (55 characters)
- `/products/uv-print-acrylic-signs`: `Custom Acrylic Logo Signs with LED Neon | The Glownique` (55 characters)

These recommended values were already present as scoped working-tree edits when this cleanup was implemented, so they were verified and preserved without rewriting adjacent changes.

## Measurement baseline

At selection time, the Ubersuggest rank tracker reported no top-100 rankings for the tracked set. Google Search Console remains the authority for production query, impression, click, and indexing decisions once data is available.

## Validation completed 2026-08-22

- Ubersuggest project verification: exactly 150 expected keywords, 0 missing, 0 unexpected, and 150 of 300 tracker slots available.
- Decision artifacts: 300 pre-change rows, 300 keep/remove decisions, and 150 final mapped keywords.
- ESLint: 0 errors; 2 unrelated pre-existing unused-import warnings.
- Next.js production build: passed, including TypeScript and static generation for all 29 generated pages.
- Rendered SEO regression crawl: 21 routes checked, 0 failures, 0 warnings.
