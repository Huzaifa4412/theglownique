# Current-State Audit

Audit date: 2026-08-11  
Scope: repository, live rendered metadata, live crawler files, US SERP snapshot and public Etsy evidence  
Excluded: authenticated GSC, GA/analytics, server logs, paid keyword tools and legal advice

## Executive assessment

The site has a sound Next.js metadata foundation and substantial product copy, but it is not ready for scaled organic publishing. The critical issues are measurement/index coverage, factual consistency, privacy disclosure, utility-route handling and schema eligibility. Content and authority gaps are more limiting than tags alone.

### Priority findings

| ID | Finding | Evidence and source | Impact | Priority | Confidence |
|---|---|---|---|---|---|
| AUD-01 | Search Console index coverage is unknown; a US `site:` observation returned four of twelve sitemap URLs. | `SERP-01`; live sitemap. `site:` is not an index report. | High | P0 | Medium |
| AUD-02 | `/studio` is a public route, omitted from sitemap, and returned HTTP 500 during the live check; there is no project-owned noindex/authorization policy. | Repository `app/studio/...`; rendered check. | High | P0 | High |
| AUD-03 | Privacy copy says “no analytics” while root layout includes Vercel Analytics; Tawk.to is also injected site-wide but not disclosed. | `app/layout.tsx`, `app/privacy/page.tsx`. | High trust/legal | P0 | High |
| AUD-04 | All sitemap URLs receive the build/request timestamp rather than their last significant modification. | `app/sitemap.ts`; live sitemap showed one identical 2026-08-11 timestamp. Google `G-SM-01`. | Medium/high | P0 | High |
| AUD-05 | Production, delivery, promotion, rating, price and warranty claims conflict or lack a proof owner. | Claims register. | High trust/rich-result | P0 | High |
| AUD-06 | JSON-LD uses raw `JSON.stringify`; current Next.js 16.2.12 guidance requires sanitizing potentially dangerous strings, at minimum escaping `<`. | Repository; `NX-01`. | Security/quality | P1 | High |
| AUD-07 | Product breadcrumbs omit `/products`; product pages mark up `Product` without `Offer`, `Review` or `AggregateRating`, so Google product-rich-result eligibility is not established. | `app/products/[slug]/page.tsx`; `G-PROD-01`, `G-BC-01`. | Medium | P1 | High |
| AUD-08 | Legal/information pages inherit homepage OG/Twitter fields; rendered `/privacy` had a correct canonical/title but homepage `og:url`, title, description and image. `/products` inherited homepage Twitter copy. | TinyFish rendered-head check. | Medium | P1 | High |
| AUD-09 | `Google-Extended` is described in code as controlling Gemini plus AI Overviews. It does not affect Google Search inclusion or ranking. | `app/robots.ts`; `G-CRAWL-01`. | Documentation/governance | P1 | High |
| AUD-10 | The Etsy constant and `sameAs` point to one listing, while the canonical shop/profile URL is available. `llms.txt` appends `/reviews` to the listing URL. | `lib/site.ts`, live `llms.txt`, public Etsy listing. | Entity/trust | P1 | High |
| AUD-11 | Google ignores the inherited `keywords` meta tag. | Rendered head; `G-META-01`. | Low | P2 | High |
| AUD-12 | FAQ markup exists, but Google removed the FAQ rich-result feature in May 2026. Visible FAQs can still help users; markup is not a Google rich-result growth lever. | Repository; `G-UPDATES-01`. | Low/strategy | P2 | High |
| AUD-13 | The root `Organization` graph contains `OfferCatalog`, `Offer` and `Product` nodes, so those commercial types render globally, including policy pages and framework not-found HTML. Eligibility and page relevance have not been established. | Production-built HTML parsed 2026-08-11; `app/layout.tsx`. | Medium/schema quality | P1 | High |

## Crawlability and indexation

### Confirmed strengths

- `robots.txt` is live, allows the site, and references the sitemap.
- The sitemap contains twelve absolute, canonical-looking URLs: home, product hub, four product detail pages, and six information/policy pages.
- Product dynamic parameters are restricted to four known slugs.
- Each intended HTML route observed has a self-referencing canonical.
- The live head includes `index, follow` and permissive snippet/image preview controls.

### Gaps

- GSC Page Indexing, Sitemaps and URL Inspection evidence is required before labeling any URL “indexed” or diagnosing exclusions.
- `/studio` needs authentication/removal from production, or a stable non-indexable response. Robots disallow alone is not enough to remove a URL already known to search engines; use route access control and `noindex`/`X-Robots-Tag` where appropriate.
- `llms.txt` is intentionally absent from the sitemap and should remain a supporting plain-text resource.
- `changefreq` and `priority` are currently present, but Google says it ignores both. They may remain for other consumers, but should not receive implementation attention (`G-SM-01`).

## Metadata and page signals

Rendered verification confirmed unique titles, descriptions and canonicals on home, `/products` and all four products. Root OG/Twitter data renders correctly. The inheritance model is incomplete:

- Information/policy routes define title, description and canonical only, so their social fields inherit homepage `og:url` and creative.
- `/products` defines Open Graph but not Twitter; it inherits homepage Twitter title/description.
- Global `keywords` metadata is emitted on every route and should be removed as unsupported Google metadata.
- Product OG images are absolute after `metadataBase`; this is correct.

Acceptance criteria are in `TECH-04` of [07-technical-seo-plan.md](07-technical-seo-plan.md).

## Structured data inventory

| Route class | Source-confirmed graph | Finding |
|---|---|---|
| All built HTML routes, including framework not-found HTML | `Organization`, `WebSite`, plus nested `OfferCatalog`, `Offer` and `Product` nodes from root layout | Keep organization identity global, but reassess whether commercial catalog nodes belong globally and whether visible facts support them. |
| Home | A second `FAQPage` block | Visible questions match markup, but FAQ rich results are retired; retain only if maintenance cost stays low. |
| Four products | `Product`, `BreadcrumbList`, `FAQPage` | Add `/products` breadcrumb level; decide `Product` versus `Service`; do not add offer/rating properties without eligible visible facts. |
| Product hub/policies | Root graph only | Appropriate unless page-specific schema is supported by visible content. |

The 2026-08-11 production build produced 18 routes. A parser found valid JSON in every JSON-LD script across 13 generated HTML files: the 12 intended HTML pages plus framework not-found HTML. This proves parseability and rendered presence, not Google rich-result eligibility. Future release QA must also run representative pages through Schema.org Validator and Google Rich Results Test. Do not report schema absence from a text fetch.

## Content and information architecture

### Strengths

- Four detailed product models with specifications, FAQs, visuals and quote CTAs.
- Prominent free-mockup path and consistent WhatsApp/Etsy handoff.
- Visible policies and verified-review excerpts rather than fabricated aggregate markup.
- Real product imagery/video inventory suitable for future proof-led pages.

### Gaps

- No `/business-signs` hub or B2B-specific product destinations.
- No industry pages for restaurants, retail, salons, offices, gyms or trade shows.
- No decision guides for pricing, lighting styles, comparisons, viewing distance, installation, electrical work or permits.
- No first-party case-study routes, expert profile, review methodology or manufacturing/process evidence page.
- No Sanity content types are configured (`sanity/schemaTypes/index.ts` contains an empty array), so the planned structured publishing contracts do not yet exist.

## Performance and experience risk

The 2026-08-11 validation build succeeded on Next.js 16.2.12 with 18 routes. ESLint completed with zero errors and two pre-existing unused-import warnings. Code-level risk areas include multiple animation libraries, client-side motion, large image/video assets, a live chat script and homepage visual effects. No Core Web Vitals claim is made without field or lab data.

Required evidence:

- GSC Core Web Vitals by route group;
- PageSpeed Insights mobile/desktop for home, product hub and one route per product template;
- asset transfer size and video-loading behavior;
- hydration/long-task profile and INP interaction sample;
- animation behavior under reduced motion.

## Claims and trust audit

The complete register is [resources/claims-and-proof-register.csv](resources/claims-and-proof-register.csv). Highest-risk items:

- “Free worldwide delivery” is described as a limited promotion but appears in evergreen metadata and many components. Its code expiry is 2026-08-11, so every persistent occurrence needs a fallback policy.
- “10–15 days” means arrival on `/shipping`, production in terms and production in `llms.txt`; define production and transit separately.
- `llms.txt` says the Etsy shop had 5.0 from 8 reviews as of 2026-08-05. The canonical shop pages returned 403 in this audit; the linked listing visibly showed 5.0 from 2 item reviews and 23 shop sales. Do not overwrite the shop-wide value with the item value, but do not republish “8” without current shop-wide evidence.
- The Etsy listing shows a $10.80 sale price from $36 for a made-to-order sign. That value must not be used as an across-site purchasable `Offer` or “starting price” unless the exact configuration and conditions are visible and truly obtainable.
- Performance/safety claims such as 100,000-hour life, 80% lower energy use, IP67 and color matching require supplier/test evidence.

## Authority and entity status

The brand-plus-category query currently leads with The Glownique, but unrelated “Glownique” cosmetics pages remain prominent. Current `sameAs` entries include Instagram, Facebook and an Etsy listing. The next entity step is the canonical Etsy shop profile, consistent organization identity, a verified logo/contact record, named expertise, and relevant earned mentions—not additional unsupported schema.

## Audit limits

- No authenticated GSC, Bing Webmaster Tools or analytics data was available.
- Search results were captured from TinyFish with US location on 2026-08-11 and will change.
- TinyFish's broad browser run failed to expose head/schema fields reliably; targeted rendered-head fetches corrected the metadata record. Schema findings are source-confirmed and must be revalidated from the production build/browser during implementation.
- Etsy shop/profile and review pages returned 403; only the listing and search result were visible.
- No legal conclusion is made about policies, warranties or consumer law.
