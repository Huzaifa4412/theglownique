# Current Route and Schema Inventory

Observed/source-checked 2026-08-11. Intended sitemap URLs: 12. The production build succeeded across 18 framework routes including metadata, studio and not-found routes.

## Route inventory

| Route | Type | Sitemap | Current index intent | Metadata state | Page-specific schema | Finding |
|---|---|---:|---|---|---|---|
| `/` | HTML page | Yes | Index | Unique canonical, OG and Twitter verified rendered | Visible/source `FAQPage`; root `Organization`, `WebSite` | Strong base; claims and FAQ maintenance need review. |
| `/products` | HTML page | Yes | Index | Unique title/description/canonical/OG; inherits homepage Twitter | Root only | Add page-specific Twitter; hub remains broad catalog. |
| `/products/custom-neon-signs` | Static dynamic HTML | Yes | Index | Unique fields verified | `Product`, `BreadcrumbList`, `FAQPage` + root | Breadcrumb missing `/products`; Product rich-result eligibility not established. |
| `/products/3d-metal-neon-signs` | Static dynamic HTML | Yes | Index | Unique fields verified | Same graph types | Same repair; standard channel-letter terminology opportunity. |
| `/products/ultra-thin-lightbox` | Static dynamic HTML | Yes | Index | Unique fields verified | Same graph types | Same repair; clarify scope versus other lightbox types. |
| `/products/uv-print-acrylic-signs` | Static dynamic HTML | Yes | Index | Unique fields verified | Same graph types | Same repair; only product observed in `site:` snapshot. |
| `/contact` | HTML page | Yes | Index | Unique title/description/canonical; inherited homepage social fields | Root only | Add route social fields; legal contact data largely blank. |
| `/shipping` | HTML page | Yes | Index | Unique title/description/canonical; inherited homepage social fields | Root only | Promotion and lead-time conflicts. |
| `/returns` | HTML page | Yes | Index | Unique title/description/canonical; inherited homepage social fields | Root only | Warranty/legal claims require owner/counsel review. |
| `/terms` | HTML page | Yes | Index | Unique title/description/canonical; inherited homepage social fields | Root only | Entity/governing-law fields incomplete. |
| `/privacy` | HTML page | Yes | Index | Unique title/description/canonical; homepage `og:url`/social fields observed | Root only | Conflicts with Vercel Analytics and undisclosed Tawk.to source code. |
| `/accessibility` | HTML page | Yes | Index | Unique title/description/canonical; inherited homepage social fields | Root only | Lighthouse 100 claim needs reproducible/current evidence. |
| `/studio` | Sanity Studio route | No | Non-public | next-sanity-owned metadata; live check returned 500 | None intended | Remove/separate/authenticate; stable noindex handling. |
| `/llms.txt` | Plain-text route | No | Supporting resource | `text/plain` route | None | Correct claims/Etsy URL; Google Search does not use it specially. |
| `/robots.txt` | Next.js metadata route | N/A | Crawl control | Live | N/A | Correct crawler taxonomy/comments. |
| `/sitemap.xml` | Next.js metadata route | N/A | Discovery hint | Live | N/A | All URLs shared one runtime timestamp. |
| `/favicon.ico` | Metadata asset | N/A | Asset | Live | N/A | No issue identified. |
| `/_not-found` | Framework route | No | Noindex/error | Framework | Global root graph rendered | Global commercial catalog data leaks into built not-found HTML; remove that leakage and verify the error response remains non-indexable. |

## Root schema

Source: `app/layout.tsx`.

- `Organization`: name, alternateName, URL, `sameAs`, image, description, slogan, `knowsAbout`, and an `OfferCatalog` containing descriptive Products inside Offers. Because it is in the root layout, the nested `OfferCatalog`, `Offer` and `Product` types render on every generated HTML page, including not-found HTML.
- `WebSite`: URL, name, description, publisher reference and `en-US`.

Repairs:

- safe JSON serialization;
- canonical shop profile instead of listing for `sameAs`;
- verified logo and truthful identity/contact fields;
- reconsider `OfferCatalog`/Offer semantics if no direct commercial offer facts are visible.

## Product schema

Source: `app/products/[slug]/page.tsx`.

- `Product`: name, description, image, category, Brand and URL; no `offers`, `review` or `aggregateRating`.
- `BreadcrumbList`: Home → Product; missing Products hub.
- `FAQPage`: page-visible questions/answers.

This inventory does not claim a Google rich result. The 2026-08-11 build check parsed every JSON-LD script successfully in 13 generated HTML files. Validate representative pages with Schema.org Validator and Rich Results Test after implementation.

## Rendered metadata verification note

TinyFish rendered-head fetch verified canonical, description, robots, OG/Twitter and H1 on home, products and all four products. It also showed homepage social inheritance on `/privacy`. A broader automation run failed to expose head/schema fields and is not used as evidence for their absence.
