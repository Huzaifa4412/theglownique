# 90-Day Roadmap (from 2026-09-24)

Built on the measured baseline, not a template. The site is seven weeks old with no authority, so the first month is about being indexed, being consistent and being citable; content scale comes after Search Console shows what Google already associates with the site.

## Days 1–30 — foundations (by 2026-10-24)

| Week | Work | Owner | Done when |
|---|---|---|---|
| 1 | Fix the two new banner slides (links → `/business-signs/…`, real dimensions 861×1827 / 1672×941); review and merge `seo/growth-system-2026-09`; deploy | Owner + dev | `npm run seo:audit -- --base https://www.theglownique.com` passes |
| 1 | Share GSC; verify Bing Webmaster Tools (import from GSC); submit the sitemap in both; `npm run indexnow -- --all` once after deploy | Owner | Both properties show the sitemap as processed |
| 1 | Resolve the warranty conflict (5 vs 3 years), lead time (production vs arrival), dimmer included vs optional, steel grade | Owner | `lib/claims.ts`, Etsy listings and site agree |
| 1 | Make the GitHub repository private (or accept that it ranks for the brand) | Owner | — |
| 2 | Update Instagram and Facebook bios to link the site; create Pinterest and LinkedIn pages with the same name, logo and description | Owner | `SOCIAL_LINKS` updated; `sameAs` grows |
| 2 | Etsy listing pass: titles and tags around the mapped terms, consistent warranty and lead time, first photo per listing | Owner | Listings match the site |
| 2 | Journal fixes in Sanity (two "insured" claims, one link to a retired URL) | Editor | Audit warnings drop to the banner-free set |
| 3 | Price bands and "what's included" (OWNER-QUESTIONS §3) → rebuild the cost guide into neon and channel-letter cost pages | Owner → dev | Pages publish dated ranges with their basis |
| 3–4 | Homepage INP: sample or defer PostHog session recording/surveys on mobile; lazy-mount the sparkles/lamp/wobble/3D-card sections; re-measure | Dev | Mobile INP p75 < 500 ms, then < 200 ms |
| 4 | About page and "How we make signs" page from owner answers (§2) and the parked, fact-checked draft | Owner → dev | Pages live; footer "About us" points to `/about` |
| 4 | First GSC read: indexed pages, queries with impressions, positions 4–20 | Analyst | Striking-distance list in SEO-EXPERIMENTS.md |

## Days 31–60 — clusters and proof (by 2026-11-23)

- Publish the indoor/outdoor & IP-rating guide, and channel letters vs lightbox (CONTENT-PLAN #4, #5).
- Publish "what your installer needs" once the owner confirms what ships with channel letters (#6).
- Three case studies on `/projects` with permission, real photos, dimensions, lighting type and lead time.
- Replace the two channel-letter visualisations and confirm provenance of every gallery image.
- Image SEO: descriptive filenames for new uploads; fix the `3d-arcylic` and `corporte` folders with redirects; add images to the sitemap for galleries.
- Add a "Before you order" block (lighting guide, cost guide, installer guide) to each sign-type page.
- Digital PR, first round: wedding directories and vendor listings (WeddingWire, The Knot vendor pages where eligible), "best custom neon sign" roundups, supplier/partner pages. Log every link and mention.
- Run the first monthly AI prompt panel (KPI-BASELINE.md) and record what assistants say about the brand.

## Days 61–90 — expansion and testing (by 2026-12-23)

- Expand pages ranking 4–20 in GSC first; write new pages only where GSC or the SERP study shows demand the site does not answer.
- Title/description tests on the three pages with the most impressions and lowest CTR; one change per page, logged with a four-week window.
- Size & viewing-distance guide (USSC data already sourced) and the LED vs glass neon comparison.
- Review the bar-sign pair and the backlit lobby page with GSC data; merge or differentiate.
- Second prompt panel; compare with the first.
- Digital PR, second round: one original-data piece from the owner's own orders (most-requested sizes, colours, fonts), pitched to wedding, interiors and small-business publications.

## Guard rails throughout

- No price, lead time, rating, customer count, certification or IP claim without evidence recorded in the claims register first.
- No city pages, no query-permutation pages, no bought links.
- Every material change is logged in SEO-EXPERIMENTS.md with its baseline and window.
