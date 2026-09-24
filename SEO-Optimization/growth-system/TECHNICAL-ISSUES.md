# Technical SEO Issues

Crawl and tests run 2026-09-24 against `https://www.theglownique.com` (production, pre-change) and a local production build of branch `seo/growth-system-2026-09`. Evidence files live in the session scratchpad; the reproducible crawler is described at the end.

## Stack (inspected, not assumed)

| Area | Finding |
|---|---|
| Framework | Next.js 16.2.12, App Router, React 19.2, Turbopack builds |
| Rendering | Static prerender (SSG) for every page; `/blog/*` ISR at 5 min from Sanity; content is in the HTML, not injected client-side |
| Routing/data | Route manifest `lib/routes.ts` → `app/sitemap.ts` and `scripts/seo-audit.mjs`; product data `lib/product-catalog.ts`; industry `lib/industry-pages.ts`; occasions `lib/collection-pages.ts` |
| CMS | Sanity (journal only); Studio at `/studio` (noindex header + meta) |
| Metadata | Next metadata API; `metadataBase` = `https://www.theglownique.com`; title template `%s \| The Glownique` |
| Schema | Root Organization + WebSite graph; per-template JSON-LD serialised with `<` escaping |
| Images | `next/image` with AVIF/WebP, 31-day optimizer cache; banner slider bypassed it until this branch |
| Hosting/CDN | Vercel (`x-vercel-cache: HIT`, static assets `immutable`) |
| Analytics | PostHog (proxied via `/ingest`, session recording, surveys, web vitals), GA4 (lazy), Vercel Analytics, Meta Pixel, Tawk.to chat |
| Forms | Quote configurator and contact form → WhatsApp handoff; leads archived to Sanity via `/api/leads` |
| Crawl files | `app/robots.ts` (explicit allow for search, AI search, training and user-triggered agents); `app/llms.txt/route.ts` |
| IndexNow | Key file published in `public/`; `scripts/indexnow-submit.mjs` |

## Crawling and indexing

| Check | Result (Measured) | Status |
|---|---|---|
| robots.txt | 200; allows all; disallows `/api/`; references sitemap | OK |
| Sitemap | 49 URLs, all 200, real `lastmod` per route; no image entries | OK (image sitemap: P2-7) |
| `https://theglownique.com/` | 308 → www (1 hop) | OK |
| `http://theglownique.com/` | 308 → https apex → 308 → www (2 hops) | P3-1: set one redirect in Vercel |
| `http://www…` | 308 → https www | OK |
| `theglownique.vercel.app` | 200, `index, follow`, canonical → www | **Fixed**: `X-Robots-Tag: noindex` on `*.vercel.app` |
| Trailing slash `/business-signs/` | 200 duplicate (canonical → slashless) | **Fixed**: 301 → slashless, excluding `/ingest/*`, `/api/*` |
| Uppercase `/Business-Signs` | 404 | OK |
| Query strings `/?utm_…` | 200, canonical → clean URL | OK |
| Unknown paths | 404 (no soft 404s) | OK |
| `/studio` | 200 + `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`; canonical inherited "/" | OK (the inherited root canonical is removed on this branch) |
| Root-layout `alternates.canonical: "/"` | Inherited by any route without its own (Next merges metadata shallowly) | **Fixed** (kept from the WIP snapshot) |
| Legacy product URLs | — | **Added**: 3 × 301 (`statusCode: 301`, since Bing's guidelines name 301); asserted on every audit run |

### Redirect rule notes

The trailing-slash rule is `/:first((?!ingest(?:/|$)|api(?:/|$))[^/]+)/:rest*/` → `/:first/:rest*`. Next compiles custom routes with `strict: true`, so the trailing `/` in the source is mandatory and the rule cannot loop. The lookahead ends at `/` or end-of-path; a bare `$` would have matched `/ingest/e/` and broken PostHog. Verified locally: `/business-signs/` → 301; `/ingest/e/` → proxied (400 from PostHog for a bare GET); `/api/leads/` → route handler.

## JavaScript and rendering

Titles, descriptions, H1s, body copy, internal links, breadcrumbs and JSON-LD are all in the server HTML (Measured: text-only fetch of every page). Motion wrappers render content at `opacity: 0` until hydration; text crawlers still receive it, and Google renders it.

## Crawler access (spoofed user-agents; real bots are verified by IP, so a pass is necessary, not sufficient)

All of Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot and CCBot received HTTP 200 and full content. No challenge pages. Robots policy is explicit and documented in `app/robots.ts`; no change recommended. Bing treats `noarchive` as "exclude from Copilot answers" — the site does not set it on public pages; keep it that way.

## Core Web Vitals and performance

| Measure | Value | Source |
|---|---|---|
| Mobile LCP p75 | 3,327 ms (n=12) | PostHog field, production |
| Mobile INP p75 | 1,084 ms (n=7) | PostHog field |
| Mobile CLS p75 | 0.203 (n=8) | PostHog field |
| Desktop LCP / INP / CLS p75 | 3,413 ms / 200 ms / 0.025 | PostHog field |
| Cold lab LCP (Slow 4G, 4× CPU) | 43.4 s — TTFB 162 ms, image load 42.4 s | Chrome trace |
| Wasted image bytes | ~5 MB (two 2.3 MB PNG banners at 887×1774 for a 412×824 slot) | Chrome ImageDelivery insight |
| Legacy JS | ~74 KB of polyfills | Chrome insight |
| CrUX | No data (traffic below threshold) | Chrome |

Field LCP elements were `/banner/mobile.png` and `/banner/laptop.png` (up to 10.8 s on desktop). Worst INP targets: header Etsy button (1.3 s), Swiper slide (1.3 s), Tawk chat container (0.9 s).

**Fixed:** banner served through the image optimizer with art direction, per-source width/height, high priority only on slide 1, lazy loading for the rest.

**Next (P1-12):** INP is JavaScript, not images. Candidates, in order: gate PostHog session recording, surveys and dead-click capture to desktop or sample them; lazy-mount the sparkles (tsparticles), lamp, wobble-card and 3D-card sections introduced on 2026-09-24; check that Tawk loads on interaction rather than `lazyOnload`. Measure each against the PostHog web-vitals baseline, one change at a time.

## Lighthouse (homepage, mobile)

SEO 100 · Accessibility 97 (colour contrast on small text in one section) · Best practices 73 (Meta third-party cookies; `/noise.webp` 404 — **fixed**; Meta CAPI gateway `capig.datah04.com` 422 on every page — Events Manager) · Agentic browsing 67 (the llms.txt check timed out; the file itself returns 200).

## Structured data

See `SCHEMA-MAP.md`. The audit script now fails on `price`, `lowPrice`, `highPrice`, `aggregateRating`, `ratingValue` or `reviewCount` anywhere in JSON-LD.

## Concurrency and change control (process risk)

- The audit began with 10 uncommitted modified files, a new unregistered guide and an automated audit guide in the working tree; one more file (`lib/industry-pages.ts`) was edited at 20:41, three minutes into the session. An OpenAI Codex process and a separate set of MCP servers (including Ubersuggest) were running.
- At 21:37–21:38 four new banner PNGs appeared and the banner slider was edited on top of this branch's new structure; at 21:41 a separate `next build` rewrote `.next` under the running test server (the resulting 500/404s were not caused by the branch).
- **Recommendation:** run `npm run seo:audit` in CI on every pull request so a claim pattern or structural regression fails before deploy. A ready workflow (needs `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `NEXT_PUBLIC_WHATSAPP_NUMBER` as repository secrets):

```yaml
# .github/workflows/seo-audit.yml
name: seo-audit
on: pull_request
jobs:
  audit:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
      NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
      NEXT_PUBLIC_WHATSAPP_NUMBER: ${{ secrets.NEXT_PUBLIC_WHATSAPP_NUMBER }}
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - run: |
          npx next start -p 3100 &
          npx wait-on http://localhost:3100 --timeout 60000
          node scripts/seo-audit.mjs --base http://localhost:3100
```

## Reproducing the crawl

The crawler used for this audit (Node, `node-html-parser` from the project's dependencies) fetched robots, sitemap and llms.txt, tested 19 host/normalisation variants and 10 crawler user-agents, crawled every sitemap URL plus discovered internal links, and recorded per page: status chain, canonical, robots directives, title/description, headings, word counts, internal/external links split by header/footer/body, image alt and dimension coverage, JSON-LD types, OG tags and 5-shingle text similarity. Output: `URL-INVENTORY.csv`.
