# The Glownique — SEO / AEO / GEO Master Plan

**Audit date:** 2026-08-05 · **Site:** https://www.theglownique.com (Vercel, Next.js 16.2.12)
**Status:** Live, prerendered, **not indexed by Google.**

---

## ✅ Implementation status — 2026-08-05

Phases 1, 2 (partial) and the §2 blockers are **built and verified against a production build**.

| Metric | Before | After |
|---|---|---|
| Lighthouse Accessibility (mobile) | 94 | **100** |
| Lighthouse Best Practices | 96 | **100** |
| Lighthouse SEO | 100 | **100** |
| Lighthouse Agentic Browsing | 100 | **100** |
| Failed audits | 4 | **0** |
| LCP (production build) | 1284 ms | **882 ms** |
| └ LCP load delay | 911 ms | **21 ms** |
| Hero + comparison image payload | **7.77 MB** PNG | **157 KB** AVIF (−98.0%) |
| Images preloaded on critical path | 3.44 MB of off-screen PNG | only the LCP hero |
| `robots.txt` / `sitemap.xml` / `llms.txt` | 404 / 404 / 404 | **all 200, prerendered static** |
| Fabricated star ratings / review counts in HTML | 16 products | **0** |

**Shipped:** `app/robots.ts` · `app/sitemap.ts` (6 URLs, derived from `PRODUCT_PAGES`) · `app/llms.txt/route.ts` (9.8 KB, generated from the catalog) · `next.config.ts` images config (AVIF/WebP, 31-day cache) · removed both `unoptimized` bypasses · `Compare` converted to lazy `next/image` · `priority` on the true LCP element · fabricated ratings/testimonials removed and gated behind `HAS_VERIFIED_REVIEWS` · WhatsApp number moved to `NEXT_PUBLIC_WHATSAPP_NUMBER` · invalid SVG path fixed · `--text-muted` token added (shadcn's `--muted` was rendering body text at 1.09:1) · brand pink split into decorative vs. AA-compliant text tones.

**Still outstanding — needs your input or is deliberately deferred:**

1. 🔴 **Set `NEXT_PUBLIC_WHATSAPP_NUMBER`** in `.env.local` and Vercel. Quote CTAs are disabled until you do (they now fail with a message instead of opening a dead `wa.me` link).
2. 🔴 **Register in Google Search Console + Bing, submit the sitemap, request indexing** (§3.3). Cannot be automated — this is the step that actually gets you indexed.
3. 🟠 **Render delay is now the LCP bottleneck (843 ms of the 882 ms)** — hydration cost from 28 client components plus GSAP + Lenis + Motion + Swiper. The original **INP 602 ms / 541 ms forced-reflow** issue (§4.3) is *not* fixed; it needs the read/write batching work, which is a behavioural change to the animation code rather than a config fix.
4. 🟠 **Re-encode source assets on disk.** The optimizer now handles delivery, but `public/3d-metallic-neon-sign/videos/4.mp4` is still **14.45 MB** and the source PNGs are still multi-megabyte in git.
5. ⚪ Phases 3–5 (content architecture, trust pages, comparison pages, city pages) — not started.

---

## 0. The headline

Your site is technically clean and **invisible**. Those are not contradictory — they're the whole diagnosis.

| Measurement | Result | Verdict |
|---|---|---|
| Lighthouse SEO score (mobile) | **100 / 100** | Misleading — see below |
| Pages in Google's index (`site:theglownique.com`) | **0** | 🔴 Critical |
| Brand search "The Glownique custom neon signs" | Returns **10 competitors, zero results for you** | 🔴 Critical |
| `robots.txt` | **404** | 🔴 Critical |
| `sitemap.xml` | **404** | 🔴 Critical |
| `llms.txt` | **404** (4 of 5 competitors have one) | 🔴 Critical |
| CrUX field data (real-user Core Web Vitals) | **"no data for this page"** | 🔴 Confirms ~zero traffic |
| Total indexable URLs | **6** | 🔴 vs 277–1,056 for competitors |
| Trust pages (about/contact/privacy/terms/shipping/returns) | **All 404** | 🔴 E-E-A-T + legal |
| INP (interaction responsiveness) | **602 ms** (target < 200 ms) | 🟠 Poor |
| CLS | 0.01 (target < 0.1) | 🟢 Good |
| Canonical host, 404 handling, HTTPS/HSTS | non-www → www 308, real 404s, HSTS on | 🟢 Good |
| Image `alt` coverage | 30/30 images have alt text | 🟢 Good |
| Existing JSON-LD | Organization, WebSite, Product, BreadcrumbList, FAQPage | 🟢 Good foundation |

### Why Lighthouse says 100 but Google shows nothing

Lighthouse's SEO category only checks **on-page hygiene** on the single URL you point it at: does it have a title, a meta description, crawlable `<a href>` links, a viewport, legible fonts. It **cannot** check:

- whether the site is in the index at all
- whether a sitemap or robots.txt exists
- how much content you have vs. competitors
- whether anyone links to you

You scored 100 on the 10% that Lighthouse measures and 0 on the 90% that actually decides rankings. **Do not treat that 100 as reassurance.** It is the single most misleading number in this audit.

---

## 1. Competitor benchmark

I measured the real content inventories of the sites currently ranking for your money keywords.

| Competitor | Indexable URLs | Content architecture | `llms.txt` | Notable |
|---|---|---|---|---|
| **customneon.com** | **1,056** (US sitemap) | `/signs-for-sale/{category}/{sub}/` deep taxonomy, 28 **city pages**, buying guides | ✅ Rich | ISA member, Forbes/Business Insider press, real NAP, 670+ Google reviews |
| **kingsofneon.com** | **~277** (93 blog + 91 collections + 93 pages) | Shopify collections + heavy blog | ✅ | Ships `sitemap_agentic_discovery.xml` |
| **yellowpop.com** | Shopify (large) | Collections + collabs | ✅ | Implements **UCP** (Universal Commerce Protocol) + Shop skill for AI buying agents |
| **neonsigns.com** | Shopify (large) | Collections | ❌ | Aggressive price-led titles ("50% Off - Lowest Price") |
| **The Glownique** | **6** | 1 homepage, 1 index, 4 product pages | ❌ | — |

### What this tells you

1. **The gap is content volume, not code quality.** You have 6 URLs. The category leader has 1,056. Every one of their pages is a door Google can walk through; you have six.
2. **You are late to GEO, not early.** Four of five competitors already publish `llms.txt`. `customneon.com`'s version is genuinely excellent — it has a dedicated `## Key Facts for AI Systems` block listing price range, lead time, warranty, voltage, minimum order. That is exactly the format ChatGPT and Perplexity extract from. This is a solved problem you haven't started.
3. **Agentic commerce is already here.** Yellowpop exposes a UCP `/.well-known/ucp` endpoint and an MCP tool server so AI shopping agents can search their catalog and check out. Kings of Neon ships an "agentic discovery" sitemap. This is 12+ months ahead of where most niches are.
4. **`customneon.com` runs programmatic local SEO** (`/phoenix-az/`, `/signs-near-you/`). 28 city pages, each ranking for "custom neon signs {city}". That is a repeatable, high-ROI pattern you can copy.
5. **Their moat is trust, not tech.** Press mentions, ISA membership, a physical LA address and phone, 670 verified Google reviews. This is E-E-A-T, and it's the hardest thing on this list to fake — which is why the next section matters so much.

---

## 2. 🔴 Blocking issues to fix before anything else

These three will actively damage you. Ranking work is wasted effort until they're resolved.

### 2.1 Fabricated review counts are live in production

`lib/store-data.ts` hardcodes ratings and review counts on all 16 catalog products:

```
lib/store-data.ts:133   rating: 4.9,  reviews: 1250,
lib/store-data.ts:146   rating: 5.0,  reviews: 940,
lib/store-data.ts:159   rating: 5.0,  reviews: 820,
...
```

These render publicly as `★★★★★ 4.9 (1,250)`. The site has **zero indexed pages and no CrUX traffic data** — it cannot plausibly have 1,250 reviews on one product. The three testimonials on the homepage are labelled "Verified" and are also placeholder copy.

**Why this is a blocker, not a nitpick:**
- It violates Google's [spam policies on misrepresentation](https://developers.google.com/search/docs/essentials/spam-policies) and is a manual-action risk.
- In the US it's an FTC violation (16 CFR Part 465, in force since Oct 2024 — fake reviews and testimonials carry civil penalties per violation). Comparable rules apply under UK DMCCA and EU UCPD.
- E-E-A-T is *the* ranking lever in this niche. Getting caught faking the exact signal you most need to build is the worst possible trade.

**One genuinely good decision already in the code:** `app/layout.tsx:109` deliberately omits `AggregateRating` from your JSON-LD with the comment *"Product ratings are intentionally omitted (no verified aggregate rating)."* I verified zero `AggregateRating` in the live HTML. That instinct was correct — apply the same standard to the visible UI.

**Fix:** Remove the numeric ratings and review counts from the UI until you have real, attributable reviews. Replace with honest signals you can actually defend: "5-year warranty", "Free design preview", "Made to order". Then pipe in real reviews from your Etsy shop (see §5.4) and only then add `AggregateRating` schema.

### 2.2 The WhatsApp number is a placeholder

`lib/site.ts:2` — `export const WHATSAPP_NUMBER = "15551234567";`

`555-01xx` is the reserved North American fictional-number range. Every quote CTA on a live site currently goes nowhere. This is a 100% conversion leak on your primary funnel. It also silently breaks the `whatsappQuoteUrl()` helper used across the storefront.

**Fix:** Set the real number. Move it to an env var (`NEXT_PUBLIC_WHATSAPP_NUMBER`) so it can't ship as a placeholder again.

### 2.3 No contact, about, or policy pages

`/about`, `/contact`, `/privacy`, `/terms`, `/shipping`, `/returns` — all return 404.

For a transactional site this is a triple problem: it's an E-E-A-T ceiling (Google's Quality Rater Guidelines treat missing contact/about info on YMYL-adjacent commerce as a low-quality signal), it's a legal requirement in most jurisdictions (GDPR/CCPA privacy notice, distance-selling terms), and it blocks trust-based conversion.

`customneon.com` publishes a street address, phone number, email, ISA membership, and press mentions. You publish none.

---

## 3. Phase 1 — Get indexed (Week 1, highest ROI in the entire plan)

Nothing else on this list produces a single visit until this ships.

### 3.1 `app/robots.ts`

Next.js 16 file convention (verified against `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`):

```ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
```

**Explicitly allow the AI crawlers** — each one you block is a platform that structurally cannot cite you: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI), `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended` (Gemini + AI Overviews), `Bingbot` (Copilot). A bare `User-agent: * / Allow: /` covers them, but naming them documents the intent so nobody "tidies it up" later.

### 3.2 `app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'
import { PRODUCT_PAGES } from '@/lib/product-catalog'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    ...PRODUCT_PAGES.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
```

Derive from `PRODUCT_PAGES` so it can never drift from the catalog. Grow this as Phase 3 pages land.

### 3.3 Register with the search engines

1. **Google Search Console** — add `www.theglownique.com`, verify via DNS TXT or the Vercel integration, submit the sitemap, then **URL Inspection → Request Indexing** on all 6 URLs manually. Don't wait for organic discovery on a zero-authority domain.
2. **Bing Webmaster Tools** — same. This also feeds **Copilot** and, importantly, **ChatGPT search**, which is Bing-backed.
3. **IndexNow** — Bing/Yandex accept instant push notifications. Fastest path off zero for the Bing-family engines.
4. **Google Business Profile** — if there's a real business address, this is the highest-leverage single action available for local intent ("neon signs near me").

### 3.4 Fix the fabricated-data blockers first

Do **not** request indexing while §2.1 is live. Getting crawled for the first time with fake review counts on every product is how you start your relationship with Google on a manual action.

**Sequence: fix §2 → ship §3.1–3.2 → then request indexing.**

---

## 4. Phase 2 — Performance (Week 1–2)

CLS is already good (0.01). Two real problems.

### 4.1 You preload a 1.71 MB below-the-fold PNG

Live HTML contains:

```html
<link rel="preload" as="image" href="/before-after/before.png"/>
```

That file is **1.71 MB**, and it belongs to the `ConceptToGlow` comparison section (`components/storefront/sections/concept-to-glow-section.tsx:45`) — **not** the hero. You are spending 1.7 MB of the critical path on an image the user cannot see, competing directly with your actual LCP element for bandwidth.

**Fix:** Remove `priority` from the `Compare` component's images so they lazy-load. Preload belongs to the LCP element only.

### 4.2 The hero bypasses image optimization entirely

`components/storefront/sections/hero-section.tsx:399` — `unoptimized={index === 3}`

Slide 4 points at `/ultra-thin-slim-lightbox/main-hero.png`, which is **2.59 MB**, served raw with no WebP/AVIF conversion and no responsive resizing. Slide 1's `/hero/neon-sign-hero.png` is another **1.75 MB**.

**Fix:** Remove `unoptimized`. If it was added to dodge a specific artifact, fix the artifact instead. Then add image config to `next.config.ts` — currently it has **no `images` block at all**:

```ts
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400, // 31 days
  },
}
```

⚠️ **Next.js 16 breaking change:** `images.qualities` now defaults to `[75]` only (it previously allowed all values). Any `quality` prop outside that array is coerced to the nearest allowed value. If you need other levels, declare them explicitly. Source: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md:788`.

Also re-encode the source assets — a 2.59 MB PNG of a photograph should be a ~200 KB WebP. Current worst offenders:

| Asset | Size |
|---|---|
| `public/3d-metallic-neon-sign/videos/4.mp4` | **14.45 MB** |
| `public/3d-arcylic/videos/25763cbb…mp4` | 3.21 MB |
| `public/ultra-thin-slim-lightbox/main-hero.png` | 2.59 MB |
| `public/3d-metallic-neon-sign/Resturants/generated/026ad950….png` | 2.49 MB |
| `public/hero/neon-sign-hero.png` | 1.75 MB |
| `public/before-after/{before,after}.png` | 1.73 / 1.71 MB |

### 4.3 INP 602 ms — the responsiveness problem

Chrome trace on the live site:

- **INP: 602 ms** (target < 200 ms)
- **Layout update: 541 ms, with 2,462 of 2,462 nodes needing layout** — a full-document relayout
- **Style recalculation: 136 ms across 1,686 elements**
- 1,828 DOM elements, 40 `<script>` tags, 276 KB of HTML on the homepage
- Trace flagged **ForcedReflow** — JS reading geometry (`offsetWidth` etc.) after invalidating styles

That 541 ms full-page relayout is your INP. With 28 `"use client"` components and GSAP + Lenis + Motion + Swiper all mounted on one route, the likely culprit is a scroll/animation handler reading layout geometry inside a hot path.

**Fix path:** batch reads before writes (never interleave); animate only `transform`/`opacity`; cache measurements outside the handler; consider `content-visibility: auto` on below-fold sections. Then re-trace to confirm — don't assume.

### 4.4 The 14.45 MB video

Ensure every `<video>` (`hero-section.tsx:360,370`, `sign-types-video-section.tsx:222`, `product-detail.tsx:132`) has `preload="none"`, a lightweight `poster`, and is re-encoded to H.264/WebM at a sane bitrate. A 14.45 MB autoplay video on mobile is a bounce.

### 4.5 Cheap accessibility wins (also agent-readability)

Lighthouse a11y 94, best-practices 96, with 4 failures:

- **`color-contrast`** — `.brand`, `.button--primary`, `.eyebrow` fail contrast. Real users and a real ranking-adjacent signal.
- **`label-content-name-mismatch`** — `.quick-add` buttons: visible text doesn't match `aria-label="Choose options for …"`.
- **`target-size`** — `.carousel-dot` tap targets below 24×24 px.
- **`errors-in-console`** — `<path> attribute d: Expected number, "M 24 100 Q 50% 100 76% 100…"` — SVG path data can't take `%` units. Currently a broken path, probably in `curved-input.tsx`.

These matter more than usual here: AI browsing agents read the **accessibility tree**. A mismatched `aria-label` misleads an agent about what a button does.

---

## 5. Phase 3 — Content architecture (the actual ranking lever)

This is where rankings come from. Everything above just makes you eligible.

You have 6 URLs. Target **60–80 quality URLs in 90 days** — not 1,056. Thin pages published at scale trigger Google's scaled-content-abuse policy and drag down the whole domain.

### 5.1 Use-case / collection pages (~12 pages, highest commercial intent)

Your `lib/store-data.ts` already contains the taxonomy — Bar, Marriage, Gym, Game, Custom, girls — and `public/3d-metallic-neon-sign/` has `Resturants`, `corporte`, `Salon` folders. **The assets exist; the pages don't.**

`/neon-signs/{use-case}` for: wedding · bar & pub · gym & fitness · gaming room · bedroom · salon & beauty · restaurant & café · retail storefront · office & corporate · birthday & party · kids room · man cave

Each needs 600+ genuinely specific words — sizing guidance for that context, colour recommendations, mounting notes, real photos from your existing library. Not the same paragraph with the noun swapped.

### 5.2 Buying guides — your AEO engine (~8 pages)

These are the queries with actual search demand. I verified live SERPs; here's what ranks and what the intent is:

| Target query | What ranks now | Your angle |
|---|---|---|
| "how much does a custom neon sign cost" | radikalneonsigns ($140–1,800), boxwoodrose ($50–1,000) | Honest cost-driver breakdown by sign type. You have 4 types; they have 1 |
| "LED neon vs glass neon" | echoneon, hi-hyperlite (150W vs 50W comparison) | You already have the copy in `product-catalog.ts` — 100,000 hrs, 12V, shatterproof silicone |
| "are LED neon signs safe / do they get hot" | thin coverage | Strong differentiator — 12V, cool-touch, shatterproof |
| "frontlit vs backlit vs halo-lit channel letters" | **almost nobody covers this well** | 🎯 Genuine gap. You make all three |
| "what is an ultra-thin lightbox" | very thin coverage | 🎯 Genuine gap. Near-zero competition |
| "how to hang a neon sign" | scattered | High-volume, low-difficulty |
| "neon sign sizing guide" | scattered | Converts directly to quotes |
| "are neon signs expensive to run" | signcustomiser, hi-hyperlite | Power-cost math with real numbers |

**The two 🎯 gaps are your fastest wins.** Everyone competes on "custom neon signs" — nobody owns "halo-lit vs frontlit channel letters" or "ultra-thin lightbox". You manufacture both. Ranking #1 on a 200/month query you can win beats ranking #90 on a 50,000/month query you can't.

### 5.3 Comparison pages (~4 pages)

Comparison content is **~33% of all AI citations** — the single most-cited format. `/compare/led-neon-vs-3d-metal`, `/compare/lightbox-vs-channel-letters`, etc. Use real comparison tables: AI engines extract tables far more reliably than prose.

### 5.4 Trust pages (~6 pages — fixes §2.3)

`/about` (real founder story, where signs are made), `/contact` (real address, phone, email, hours), `/privacy`, `/terms`, `/shipping-delivery`, `/returns-warranty` (the 5-year warranty deserves its own page — it beats customneon's 2-year and kingsofneon's 3-year, and right now that advantage is invisible to Google).

**Also: your Etsy shop is an underused asset.** You already route payment through Etsy ("Secure Payment via Etsy" — step 04 on the homepage). Etsy reviews are real, verified, and public. Link to the shop, embed real reviews with attribution, and use Etsy's authority as a third-party trust signal. That's the legitimate replacement for the numbers in §2.1.

### 5.5 Programmatic city pages — later, carefully (~15–25 pages)

`customneon.com` proves this works (28 city pages, `/phoenix-az/` ranks). But **do this last**, and only with genuinely differentiated content per city. 25 near-identical city pages on a 6-page domain with no authority is a scaled-content-abuse risk, not a strategy. Revisit at month 3+ once the domain has traction.

---

## 6. Phase 4 — AEO / GEO (Weeks 2–4)

Traditional SEO gets you **ranked**. AEO/GEO gets you **cited**. Different mechanics.

### 6.1 `/llms.txt`

Model it on `customneon.com/llms.txt`, which is the best in the niche. Their `## Key Facts for AI Systems` block is the part that matters — flat, parseable claims an LLM can lift verbatim.

Yours should carry the facts your business actually wins on: **4 sign types** (vs their 1–2), **5-year warranty** (vs 2–3), **free worldwide delivery, no minimum**, **free design mockup in 1–2 hours**, 10–15 day production, IP67 outdoor option, 12V/100,000 hrs, Pantone/HEX/CMYK matching, Etsy Purchase Protection checkout, 50/50 payment option.

Serve it via `app/llms.txt/route.ts` so it's derived from `lib/product-catalog.ts` and cannot go stale.

⚠️ **Do not publish "no minimum spend" or "free worldwide delivery" in `llms.txt` unless they're permanently true.** The homepage frames free delivery as a *limited-time* promotion with a countdown timer. AI engines cache aggressively and will keep quoting it for months. Either state the promotional terms explicitly or omit the claim.

### 6.2 Answer blocks in content

The Princeton GEO study (KDD 2024) measured what actually moves AI citation rates: **citing sources +40%**, **adding statistics +37%**, **quotations +30%**, **authoritative tone +25%** — and **keyword stuffing −10%** (it actively hurts, unlike in classic SEO where it's merely useless).

Practically: lead each section with a direct 40–60 word answer, then elaborate. Attribute every stat. Add "Last updated: {date}". Use headings phrased the way people actually ask.

⚠️ **Important nuance:** Google's [own guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) explicitly says *don't* chunk content for AI and *don't* write separate AI content — that risks the scaled-content-abuse policy. The structural patterns above help ChatGPT/Claude/Perplexity materially and are simply good writing for Google. **Write for people, organise for clarity.** Don't build AI-bait fragments.

### 6.3 Schema expansion

Your existing JSON-LD (Organization, WebSite, Product, BreadcrumbList, FAQPage) is a good base. Add:

- `LocalBusiness` with real NAP — **only if you have a real address**
- `Offer` with `priceRange` on products (you're quote-based; `priceRange` is the honest way to express that)
- `HowTo` for install/hanging guides
- `ItemList` on collection pages
- `Article` + named `author` on guides — expertise attribution is an E-E-A-T signal
- `AggregateRating` — **only once §2.1 is resolved with real reviews**

The four product pages already ship `FAQPage` (`app/products/[slug]/page.tsx:74`). Extend that pattern to the new guides.

### 6.4 Agentic commerce (Month 2–3)

Yellowpop already exposes UCP + an MCP endpoint for AI shopping agents; Kings of Neon ships an agentic-discovery sitemap. You're on Next.js, not Shopify, so you don't get this free — but you do control the whole stack.

Minimum viable version: keep pricing/spec info on public, indexable, server-rendered pages (an agent can't parse what only renders after four frameworks boot), keep the accessibility tree clean (§4.5), and add an `/agents.md` describing how an agent should request a quote. Your Lighthouse **Agentic Browsing score is already 100** — good starting position, don't regress it.

### 6.5 Third-party presence

Brands get cited **6.5× more often via third-party sources than their own domain**. Wikipedia is ~7.8% of ChatGPT citations, Reddit ~1.8%.

Realistic actions: keep the Etsy shop rich and reviewed · answer genuinely in r/NeonSigns and r/weddingplanning (both surfaced in my SERP research for cost queries — **participate honestly, don't spam; astroturfing is exactly the kind of inauthentic signal that gets penalised**) · Pinterest (enormous for neon/decor intent, and you have strong imagery) · YouTube for install and behind-the-scenes (frequently cited by AI Overviews) · pursue press and an ISA membership the way customneon did.

---

## 7. Sequencing

| When | Work | Success criterion |
|---|---|---|
| **Week 1a** | §2 blockers: remove fake ratings, real WhatsApp number | No fabricated data in production |
| **Week 1b** | `robots.ts`, `sitemap.ts`, GSC + Bing + IndexNow, request indexing | 6/6 URLs indexed |
| **Week 1–2** | Perf: kill the 1.7 MB preload, remove `unoptimized`, `images` config, re-encode assets, compress the 14 MB video | LCP < 2.5s, hero payload < 400 KB |
| **Week 2** | INP: fix forced reflow / 541 ms relayout; the 4 Lighthouse a11y failures | INP < 200 ms, a11y 100 |
| **Week 2–3** | Trust pages (§5.4) + `llms.txt` (§6.1) | Policies live, `llms.txt` 200 |
| **Week 3–6** | 12 use-case pages (§5.1) — assets already exist | 18 URLs indexed |
| **Week 5–9** | 8 buying guides (§5.2), 🎯 gap topics first | First non-brand impressions in GSC |
| **Week 8–12** | 4 comparison pages (§5.3), schema expansion (§6.3) | AI citations appearing |
| **Month 3+** | City pages (§5.5) — only if domain has traction. Agentic commerce (§6.4) | — |

---

## 8. Measurement

**Baseline today:** 0 indexed pages · 0 impressions · 0 non-brand keywords · no CrUX data · INP 602 ms · CLS 0.01 · Lighthouse SEO 100 / a11y 94 / BP 96 / Agentic 100.

Track weekly in GSC: indexed page count → impressions → non-brand clicks, in that order. They unlock sequentially; don't expect clicks in week 2.

Monthly manual AEO check (no tooling needed): run your 20 priority queries through ChatGPT, Perplexity, and Google AI Overviews. Log whether you're cited, who is, and which page of theirs got picked. That log is the only reliable AEO feedback loop — **note that Search Console has no AI-specific reporting**, so there is no automated substitute.

Realistic expectations for a zero-authority domain: **indexation in days, first impressions in 2–6 weeks, meaningful non-brand traffic in 3–6 months.** Anyone promising "first place on Google" faster than that is selling something. What you *can* win fast is the low-competition long tail in §5.2 — that's the honest route to page one.

---

## 9. Two things I could not determine

1. **Real search volumes and keyword difficulty.** These need Ahrefs/Semrush/DataForSEO. My keyword targeting above is grounded in live SERP inspection — who ranks, how thin their coverage is, what intent the results serve — which is a sound basis for prioritisation but is *not* volume data. Validate before committing to the full 8-guide build.
2. **Whether a real physical business address exists.** This gates `LocalBusiness` schema, Google Business Profile, and city pages (§5.5) — collectively the highest-leverage local SEO available. If there is one, it moves up the priority list sharply.

## Skills installed for this work

`seo-audit` · `ai-seo` (AEO/GEO) · `programmatic-seo` · `seo` (Addy Osmani / web-quality) · `seo-geo`
