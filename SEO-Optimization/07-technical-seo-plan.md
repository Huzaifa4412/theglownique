# Technical SEO Implementation Plan

This is an implementation backlog, not a record of completed work. All production changes require a separate implementation phase and release QA.

## P0: eligibility, trust and measurement

| ID | Change | Implementation decision | Acceptance criteria | Owner | Dependency |
|---|---|---|---|---|---|
| TECH-01 | Establish index baseline | Export GSC Page Indexing, Sitemaps, URL Inspection samples, Performance and Generative AI reports. Classify every intended URL as indexed, discovered, crawled, canonicalized, blocked, soft-404 or unknown. | Twelve current intended URLs and every new URL have evidence, owner and next action; `site:` is not used as status. | Growth + engineering | GSC access |
| TECH-02 | Secure/remove Studio | Preferred: do not deploy Studio in the public frontend. If required, put it behind authentication on a separate admin host. During transition return stable noindex headers/metadata and fix the 500. Do not rely on robots disallow alone. | `/studio` is inaccessible to anonymous users or returns an intended stable response; absent from sitemap; `noindex` or `X-Robots-Tag` verified where applicable; no production 500. | Engineering | Product decision |
| TECH-03 | Resolve privacy/tooling | Choose: (A) keep Vercel Analytics/Tawk and disclose data handling, consent/retention/providers as required, or (B) remove them. Counsel/business owner approves wording. | Runtime network/script inventory matches policy; analytics/chat behavior and cookies tested; policy updated before deployment. | Business + legal + engineering | Approved privacy position |
| TECH-04 | Fix per-route metadata contract | Give every indexable page unique title, description, canonical, OG URL/title/description/image and Twitter equivalent. Remove global `keywords`. Avoid inherited homepage social URLs on policy/product hub pages. | Automated matrix passes for every public route; absolute URL and share image resolve 200; no duplicate/cross-route canonical or homepage `og:url` leakage. | Engineering + SEO | Approved copy/images |
| TECH-05 | Truthful sitemap dates | Replace sitemap-wide `new Date()` with material content timestamps from source/content records. Omit `lastModified` where no reliable value exists. Include canonical indexable URLs only. | Unchanged build does not advance dates; a material edit changes only relevant URLs; GSC accepts sitemap. | Engineering | Content date contract |
| TECH-06 | Claims reconciliation | Implement the claims register as release data: promotion state, price basis, production/transit, warranty, reviews and proof dates. Remove or correct unresolved high-risk claims. | One approved value per claim across visible pages, metadata, schema, Etsy references and `llms.txt`; expiry behavior tested. | Operations + SEO + engineering | Owner evidence |

## P1: structured data and crawler correctness

| ID | Change | Implementation decision | Acceptance criteria | Owner |
|---|---|---|---|---|
| TECH-07 | Sanitize JSON-LD | Create a shared serializer that at minimum uses `JSON.stringify(value).replace(/</g, "\\u003c")`, following local Next.js 16.2.12 guidance. Use native `<script>`, not `next/script`. | Unit test includes `</script><script>` input; output contains no literal `<`; every JSON-LD block parses. | Engineering |
| TECH-08 | Repair breadcrumbs | Existing products become Home → Products → Product. Future B2B pages follow the hierarchy in the IA. Visible breadcrumb and JSON-LD agree. | Schema.org validator passes; positions and absolute URLs are correct; every linked breadcrumb returns 200. | Engineering + SEO |
| TECH-09 | Decide Product/Service schema | For each route, document commercial model. Keep descriptive schema without Google rich-result expectations if no eligible `Offer`, `Review` or `AggregateRating`. Add `Offer` only for a visible purchasable configuration. | Schema matches visible page; Rich Results Test has no critical errors; no listing promo price is generalized to bespoke products. | SEO + engineering + operations |
| TECH-10 | Organization entity accuracy | Add a verified logo URL, canonical Etsy shop profile and truthful contact/legal identity fields. Keep only owned `sameAs` profiles. Remove listing URL from `sameAs`. | All URLs resolve; details match contact/policy/profile pages; owner sign-off logged. | Business + engineering |
| TECH-11 | Correct crawler documentation | Update comments/matrix: Googlebot controls Google Search; Google-Extended controls certain Gemini training/grounding uses and not Search inclusion/ranking; separate training, search-index and user-triggered OpenAI/Anthropic/Perplexity agents. Explicit allow rules are optional when `*` already allows. | Generated robots file is intentional, concise and verified against official docs; WAF/log policy documented separately. | Engineering + SEO |
| TECH-12 | Reassess FAQ markup | Keep visible FAQs where useful. Remove duplicate/low-value questions. Treat JSON-LD as optional because Google retired FAQ rich results in May 2026. | Visible answers are current and consistent; no KPI depends on FAQ rich results. | SEO + engineering |
| TECH-12A | Scope the root commercial graph | Keep organization/entity data global, but move or remove `OfferCatalog`/`Offer`/`Product` nodes unless their relevance and visible commercial facts are valid site-wide. Prevent commercial schema from leaking into not-found HTML. | Built HTML inventory shows only intended types per route; error pages contain no commercial graph; eligible properties match visible facts. | Engineering + SEO |
| TECH-13 | Keep `llms.txt` subordinate | Correct Etsy URL, ratings, timelines, promotion, analytics/privacy and unsupported claims. Do not add it to sitemap solely for Google. | File exactly matches approved claim data and links; generated test prevents drift; owner/date present for volatile facts. | SEO + engineering |

## P1: discoverability and freshness

| ID | Change | Implementation decision | Acceptance criteria | Owner |
|---|---|---|---|---|
| TECH-14 | IndexNow | Generate an 8–128 character key, host the UTF-8 key at the root, and send URLs only when added, materially updated or deleted. Batch up to 10,000 per official protocol. Log status without treating HTTP 200 as indexing. | Key fetch returns 200; test update is accepted; retry/backoff and secrets handling documented; delete notifications supported. | Engineering |
| TECH-15 | Bing tools | Verify Bing Webmaster Tools, submit sitemap, inspect index/crawl, enable AI Performance public preview and record baseline. | Ownership verified; cited pages/grounding-query baseline stored even if zero; responsible owner assigned. | Growth |
| TECH-16 | GSC releases | For each launch, submit sitemap and inspect representative URLs; do not request indexing repeatedly at scale. | Release checklist attaches inspection evidence and 7/14-day follow-up. | Growth |

## P2: performance, media and quality

| ID | Change | Implementation decision | Acceptance criteria | Owner |
|---|---|---|---|---|
| TECH-17 | Core Web Vitals baseline | Capture GSC field data and PSI lab data for home, hub and product template. Profile animation/hydration, chat, images and videos. | LCP/INP/CLS recorded by route/device; each failed threshold has an attributed cause and ticket. | Engineering |
| TECH-18 | Media SEO | Rename future media descriptively, retain stable URLs, write useful alt/captions, optimize dimensions/formats, lazy-load below fold and provide video thumbnails/transcripts where relevant. | No missing dimensions/alt on meaningful images; decorative media empty-alt; video does not block LCP; media sitemap considered only if evidence warrants. | Content + engineering |
| TECH-19 | Agent/accessibility readiness | Ensure specifications, policies, price basis and contact actions are present in server-rendered HTML; label controls and preserve keyboard/reduced-motion behavior. | Browser with JS constrained still receives primary facts; accessibility tree and keyboard walkthrough pass. | Engineering + QA |
| TECH-20 | Status/canonical regression suite | Build an automated route manifest checking status, title, canonical, robots, OG/Twitter, H1 and parseable JSON-LD. | CI fails on duplicates, missing fields, non-200 sitemap URLs, unexpected indexable routes or unsafe JSON-LD. | Engineering |

## Crawler policy matrix

Implementation must use [resources/crawler-and-indexing-matrix.md](resources/crawler-and-indexing-matrix.md), not comments embedded in code. Key choices:

- allow Googlebot and Bingbot for search;
- allow OAI-SearchBot, PerplexityBot and Claude-SearchBot if citation visibility is desired;
- decide GPTBot, ClaudeBot and Google-Extended separately as training/grounding policy choices;
- recognize that user-triggered agents may not behave like automatic crawlers or honor robots in the same way;
- verify legitimate bots by published IP/DNS methods in WAF/log analysis, not user-agent string alone.

## Release validation

For every implementation release:

1. `npm run lint` and `npm run build` succeed with no new warnings.
2. Enumerate routes from build output and compare with the approved indexability manifest.
3. Fetch all sitemap URLs and verify 200, self-canonical and indexability.
4. Verify `/studio` and any admin/preview paths are not anonymous indexable content.
5. Parse every JSON-LD script from rendered HTML; run representative pages through Schema.org Validator and Google Rich Results Test.
6. Verify OG/Twitter images and metadata for every route class.
7. Check mobile/desktop performance and accessibility for changed templates.
8. Confirm analytics events and privacy behavior.
9. Submit/confirm sitemap and schedule 7/14-day GSC review.
10. Record the release, changed URLs and truthful modification dates.

## Rollback rules

- If a claim loses evidence, remove it from visible content, metadata, schema and AI-readable files in the same release.
- If a schema change produces critical errors or mismatches visible facts, remove the ineligible property rather than hiding the fact.
- If a new template creates unexpected indexable URLs, noindex/disable the template and remove those URLs from sitemap until fixed.
- If analytics tooling changes before policy approval, roll back the tooling or block deployment.
