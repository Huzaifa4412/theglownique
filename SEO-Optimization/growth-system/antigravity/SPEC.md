# The Glownique — SEO, AEO & GEO Growth Spec (v2)

Spec date: 2026-09-28, updated with owner answers the same day · Site: https://theglownique.com · Repo: `next-js-frontend/` (Next.js 16.2, Sanity CMS, Vercel)
Supersedes nothing. It builds on `SEO-Optimization/growth-system/` (audit of 2026-09-24) and turns it into an executable plan for an agent with Search Console, GA4, BigQuery and Ubersuggest access.

Evidence labels, used everywhere in this spec and in everything produced from it:

- **Measured**: a number from a tool run, with the date and tool.
- **Observed**: seen on a live page or SERP, with the URL and date.
- **Inferred**: a conclusion drawn from measured or observed evidence.
- **Assumption**: stated when data is missing. Never presented as fact.

---

## 1. Business facts (the only facts agents may state)

| Fact | Value | Source of truth |
|---|---|---|
| Brand | The Glownique (not "Glownique" cosmetics at glownique.com) | `app/layout.tsx` Organization schema, `disambiguatingDescription` |
| Sign types sold | 4: custom LED neon, 3D metal channel letters, ultra-thin LED lightboxes, UV-print acrylic logo signs | `lib/product-catalog.ts` |
| Canonical URL per sign type | `/products/custom-neon-signs`, `/business-signs/channel-letter-signs`, `/business-signs/lightbox-signs`, `/business-signs/acrylic-logo-signs` | `ProductPage.path` |
| Market | US English, national, ship-only. Canada, UK and Australia are secondary buyers served by the same English pages | Audit 2026-09-24 |
| Installation | Not offered. Buyer's installer and licensed electrician do it | Guides and FAQs |
| Warranty, lead time, mockup, remote, revisions, delivery, payment | **Confirmed by the owner on 2026-09-28.** See §1A | `OWNER-QUESTIONS.md` answer tables |
| Prices | **Pending.** The owner is preparing a price list. See §1B | — |
| Steel grade | Not given. Say "stainless steel" only | — |
| Etsy shop | https://www.etsy.com/shop/TheGlownique | `lib/site.ts` |

## 1A. Confirmed owner facts (2026-09-28)

These are now the approved wording. They replace every older figure on the site.

| Fact | Approved statement | Replaces | Claim ID |
|---|---|---|---|
| Warranty | 5-year warranty on every sign: LED neon, channel letters, lightboxes and acrylic signs | "5-year" (was validation required); Etsy "3-year" | CLM-004 → approved |
| Production, LED neon | 3–5 business days after mockup approval | "10–15 days" | CLM-002 → approved |
| Production, other types | Channel letters, lightboxes and acrylic signs: 3–10 business days | "10–15 days" | CLM-002 |
| Delivery time | 3–8 business days, all countries | "approval to arrival" wording | CLM-002 |
| Rush orders | Available at no extra cost. The customer tells us the date they need | — (new) | new CLM row |
| Mockup | Free mockup within 24 hours, every day including weekends | "~2 h", "1–2 hours" | CLM-003 → approved |
| Remote | Every neon sign comes with a remote that also dims it | "optional remote" | new CLM row |
| Revisions | Unlimited free design revisions | — | new CLM row |
| Payment | Pay in full, or optionally 50% deposit and 50% before dispatch | "50% / 50%" as the only option | CLM-014 → approved |
| Delivery price | Free worldwide delivery on every order, standing policy, no end date | "promotion ended 2026-08-11" | CLM-001 → approved; retire `FREE_DELIVERY_PROMO` for good |
| Urgency | No countdown timers or "offer ends" wording anywhere, ever | Etsy/ads timer (owner removes) | new retired pattern |

Also confirmed on 2026-09-28:
- The production clock starts **after mockup approval**. Say "made in 3–5 business days after you approve your mockup".
- The remote **dims** the sign. "Every neon sign comes with a dimmable remote" is approved, and existing "dims with the remote" copy is correct.

## 1B. Pricing — pending

The owner is preparing prices. Until a dated price list is added to the claims register:
- Build every page so a price block can be added later without a redesign: a "From $X" slot on each sign-type page, a price-band table slot in the cost guide, an `Offer.price` slot in Product JSON-LD.
- Hide the slots when no price is set. Never show a placeholder, a range from competitors or an estimate.
- When prices arrive: add rows to the claims register with a "valid as of" month, fill the slots, add `Offer` (`price`, `priceCurrency: USD`, `availability`, `shippingDetails`, `hasMerchantReturnPolicy`) and rebuild `/guides/custom-business-sign-cost`.

The remaining owner questions (About page identity, proof and projects, specifications, access) are also deferred. Work that needs them stays in the backlog. Everything else proceeds.

Products not in the catalog (metal letters sold alone, wholesale, glass neon, installation) must not get commercial pages until the owner confirms they are sold.

---

## 2. Live issues found on 2026-09-28

These come from `npm run seo:audit`, `curl` header checks and a crawl of all 66 sitemap URLs on the live site.

### P0 — fix first

| ID | Issue | Evidence | Fix | Acceptance test |
|---|---|---|---|---|
| **P0-A** | **Host mismatch.** Vercel now serves the bare domain as primary: `https://www.theglownique.com/*` answers **308 → `https://theglownique.com/*`**. Every canonical tag, the sitemap (66 `<loc>`), every JSON-LD `@id`/`url`, `robots.txt` `Sitemap:` and `Host:` still point at **www**. Google is told the canonical is a URL that redirects away. | Measured, `curl -I`, 2026-09-28 | **Recommended:** in Vercel → Project → Settings → Domains, make `www.theglownique.com` the primary domain and redirect the apex to it (301/308). No code change; matches GSC, IndexNow, schema and all internal URLs. **Only if the owner insists on the apex:** change `SITE_URL` in `lib/site.ts`, `siteUrl` in `app/layout.tsx`, every hard-coded `https://www.theglownique.com` (grep), `app/robots.ts`, `public/llms.txt`/`app/llms.txt`, the IndexNow host, then add the apex property in GSC and Bing. Do not do both. | `curl -sI https://theglownique.com/` → one redirect to `https://www.theglownique.com/`; `curl -sI https://www.theglownique.com/` → 200; canonical of every page equals its final URL; `npm run seo:audit -- --base https://www.theglownique.com` passes host checks |
| **P0-B** | **Infinite redirect loop on single-segment trailing-slash URLs.** `/business-signs/`, `/guides/`, `/blog/`, `/about/` etc. answer `301 Location: <same URL>` forever. Deeper paths (`/business-signs/bar-signs/`) work. Cause: in `next.config.ts` the rule `"/:first(...)/:rest*/" → "/:first/:rest*"` rebuilds the trailing slash when `:rest*` is empty. | Measured, `curl -I` and `seo-audit.mjs` | Split into two rules: `source: "/:first((?!ingest(?:/\|$)\|api(?:/\|$))[^/]+)/"` (same lookahead as the existing rule; a bare `$` would match the end of the whole URL and let `/ingest/` through) → `"/:first"`, then the existing rule with `:rest+` instead of `:rest*`. Read `node_modules/next/dist/docs/` on `redirects` first (Next 16 breaking changes). Keep `statusCode: 301` and keep `/ingest/*` and `/api/*` excluded. | `curl -sIL --max-redirs 3 https://www.theglownique.com/guides/` ends in 200 at `/guides` after one hop; `/ingest/e/` and `/api/leads/` are not redirected; `seo-audit.mjs` zero failures |
| **P0-C** | **Keyword stuffing reintroduced after the audit merge** (commits `25bc88f`, `695d11b`, `c581e77`). Examples: restaurant meta description "Get mexican or chinese restaurant neon sign ideas today."; restaurant intro "Whether you need a mexican restaurant neon sign, a chinese restaurant neon sign, or general restaurant neon sign ideas, we custom build them all."; wedding intro "a wedding neon sign last name piece"; salon copy repeating "hair salon neon sign". | Observed, `git diff 82002b5 HEAD -- lib/industry-pages.ts lib/collection-pages.ts` | Rewrite each sentence for a human reader. Keep a long-tail term only where it reads naturally, once. Long-tail variants belong in headings of real sections, image alt text of real photos, or FAQs, never in chained lists. | A reviewer reading the paragraph aloud cannot tell which keywords it targets; no sentence lists more than two keyword variants |
| **P0-D** | **Unsubstantiated environmental claim** in the homepage hero: "Eco-friendly 12V LED neon". The FTC Green Guides (16 CFR 260.4) advise against unqualified general environmental benefit claims. Not in the claims register. | Observed, `components/storefront/sections/hero-section.tsx:142` | Replace with a factual, specific statement already supported, e.g. "12V LED neon — no glass tubes, no gas". Add a register row if any environmental claim is reintroduced with evidence. | `grep -rn "Eco-friendly" components lib app` returns nothing; add the pattern to `scripts/seo-audit.mjs` retired claims |
| **P0-E** | **Site facts out of date.** The owner resolved every conflict on 2026-09-28 (§1A), but the site still says 10–15 days, mockup ~2 h, optional remote and free delivery ended. Pricing is still pending (§1B). | `OWNER-QUESTIONS.md`, `lib/claims.ts` | Run Workstream 1A (§6A). | Every acceptance test in §6A passes |

### P1 — high impact

| ID | Issue | Evidence | Fix |
|---|---|---|---|
| P1-A | Two journal posts still claim "insured delivery" (retired claim CLM-023) | `seo-audit.mjs` warnings: `/blog/custom-gaming-neon-signs-streaming-setup-guide`, `/blog/turn-business-logo-into-custom-neon-sign` | Edit in Sanity. The repo token is viewer-only, so the owner edits in `/studio` or provides an Editor token |
| P1-B | A journal post links a retired URL that 301s | `/blog/custom-acrylic-signs-office-wall-guide` → `/products/uv-print-acrylic-signs` | Change the link in Sanity to `/business-signs/acrylic-logo-signs` |
| P1-C | Product JSON-LD has no `offers`, `review` or `aggregateRating`, so no Product rich result is possible and GSC may list the items as invalid | Measured, JSON-LD on `/products/custom-neon-signs` | Check GSC → Enhancements → Product snippets / Merchant listings. If the owner approves a real "from" price, add an `Offer` with `price`, `priceCurrency: USD`, `availability`, `shippingDetails`, `hasMerchantReturnPolicy`. Never invent a price or add a rating that is not first-party and on-page |
| P1-D | Possible cannibalisation pairs, to confirm with GSC query-to-page data | Observed titles | See §6.3 |
| P1-E | Thin hubs and commercial pages | Measured word counts, 2026-09-28: `/business-signs/custom-logo-neon-signs` 642, `/custom-signage` 667, `/guides` 667, `/guides/custom-business-sign-cost` 756 with no numbers | Expand only with first-party substance (§6.4). Word count is not the target |
| P1-F | Brand collision: "Glownique" SERPs belong to a cosmetics brand; AI answers conflated them | Audit 2026-09-24 | Entity work in §8 |
| P1-G | `robots.txt` has a non-standard `Host:` line | Observed | Remove it, or keep it only if it matches the final primary host. Google ignores it |
| P1-H | Homepage mobile INP p75 ~1.1 s, LCP ~3.3 s, CLS ~0.20 (small PostHog samples, 2026-09-24) | `KPI-BASELINE.md` | §10 |

---

## 3. What was changed in the owner's research brief, and why

The owner's brief (kept in spirit, pasted in the master prompt) was a strong research checklist. These points were corrected before handing it to an agent:

1. **It was research-only.** It produced a report but no code, no acceptance tests and no stopping points. This spec adds workstreams with definitions of done.
2. **It ignored the existing knowledge base.** Most of its research (45 SERPs, 45 competitor pages, keyword map of 206 rows, claims register) already exists in `growth-system/`. The agent must extend it, not redo it, and log what changed.
3. **It asked for "free shipping", "fast shipping", "cheap", "wholesale" and "near me" modifiers.** Free delivery ended on the site on 2026-08-11 and lead time is unresolved, so shipping modifiers become claims. "Near me" and city pages would be doorways for a ship-only seller. They are research signals only, never page targets, unless the fact behind them is verified.
4. **It listed products the site does not sell** (standalone metal letters, glass neon, wholesale). Pages follow the catalog.
5. **It targeted Canada, UK and Australia.** No separate market pages or hreflang: one English site. Only add hreflang if localized pages with local prices, shipping and currency are built later.
6. **It said "Etsy credibility" and asked about reviews.** Etsy numbers are 25 sales and 8 reviews (2026-09-24). Only first-party, verifiable figures with the date may be shown. No AggregateRating from Etsy data in site schema.
7. **It had no guardrails on automated copy.** Keyword stuffing and unverified claims reached production twice. This spec adds hard rules and a regression gate.
8. **It had 14 deliverables as one giant report.** They are mapped to files in §12 so the output is maintainable.
9. **It did not name real data sources.** GSC, GA4, BigQuery and Ubersuggest are now available and are mandatory evidence where they apply.
10. **It did not say what to do when facts are missing.** Rule: write the page with the fact omitted or qualified, and list the question in `OWNER-QUESTIONS.md`.

---

## 4. Hard rules (non-negotiable)

1. **Evidence before claims.** Any number, certification, rating, time, price, material grade or superlative must already be in `SEO-Optimization/resources/claims-and-proof-register.csv` with a status that allows publication, or be read from `lib/claims.ts`. Otherwise it is not published.
2. **No fabricated data.** No invented volumes, rankings, traffic, backlinks, prices, reviews, authors, credentials, case studies or customer quotes. Say "unavailable" instead.
3. **No keyword stuffing, hidden text or chained keyword lists.** One head term in the H1, in the words people search. Variants appear only where a human reader needs them.
4. **No doorway pages.** No city or state pages. No near-duplicate industry pages. A new URL must pass the page gate in §6.1.
5. **One URL per intent.** Check `KEYWORD-MAP.csv` and GSC before creating a page. Never hard-code `/products/${slug}`; use `product.path` or `productHref(slug)`.
6. **Schema describes what is visible on the page.** No `AggregateRating`, `Review`, `Offer` price or `LocalBusiness` without matching visible, true content. FAQPage markup only for real on-page FAQs (Google shows FAQ rich results only for authoritative government and health sites, so treat FAQPage as a semantic aid, not a rich-result play).
7. **Next.js 16 is not the Next.js in training data.** Read `node_modules/next/dist/docs/` before changing routing, metadata, redirects, `proxy.ts`, images or caching.
8. **Nothing outward-facing without the owner.** No git push, merge, deploy, Vercel domain change, Sanity write, GSC removal request, Etsy edit, social profile edit or outreach email without explicit approval in that session. Prepare the change, show it, wait.
9. **Every change is logged** in `SEO-EXPERIMENTS.md` with date, URL, hypothesis, metric and review date.
10. **Every release passes** `npm run lint`, `npm run build`, and `npm run seo:audit` (against the local production build, then against production after deploy) with zero failures.

---

## 5. Workstream 0 — Access, baseline and truth (days 1–3)

Goal: replace every "unavailable" in the 2026-09-24 audit with real data.

| Source (tool) | Pull | Save to |
|---|---|---|
| Google Search Console (Composio) | Property type and host (domain vs URL-prefix; www vs apex). Index coverage: indexed, "Crawled – not indexed", "Discovered – not indexed", "Duplicate, Google chose different canonical", redirects, 404s. Sitemaps status. Last 90 days (or since first data) queries × pages: clicks, impressions, CTR, position. Enhancements: Product snippets, Merchant listings, Breadcrumbs. URL Inspection for the 12 most important URLs. | `research/gsc-baseline-2026-09.md` + CSV exports in `research/data/` |
| GA4 (Composio) | Sessions by default channel group, landing page, device, country; key events (quote submit, configurator start, Etsy outbound click, WhatsApp click). Confirm key events exist; if not, list what to configure | `KPI-BASELINE.md` (append a dated section) |
| BigQuery (Composio) | If the GA4 or GSC bulk export is linked, query landing-page × query performance and conversion paths. If no export is linked, say so and recommend enabling the GSC bulk export and GA4 BigQuery link (owner action) | `research/bigquery-notes.md` |
| PostHog (existing API, see `reference-analytics-access` note) | AI referrals (chatgpt.com, perplexity.ai, copilot, gemini, claude.ai), leads by source. Filter `$host` to production hosts. Never print raw event properties (they include IPs) | `KPI-BASELINE.md` |
| Ubersuggest | Domain overview for theglownique.com and top competitors; keyword ideas, volumes, SD, CPC, SERP top 10 for every cluster in `KEYWORD-MAP.csv`; backlinks and referring domains for competitors; content ideas | Update `KEYWORD-MAP.csv` volume/SD columns with a `source` and `date`; `research/ubersuggest-2026-09.md` |
| Bing Webmaster Tools | If not verified, prepare the import-from-GSC steps for the owner. Bing feeds ChatGPT search and Copilot | `OWNER-QUESTIONS.md` §6 |
| Live site | Crawl all sitemap URLs: status, canonical, robots, title, meta description, H1, word count, JSON-LD types, internal links in/out, image alt coverage | `URL-INVENTORY.csv` (refresh, add `crawl_date`) |

Definition of done: a one-page "State of search, 2026-09" section at the top of `SEO-AUDIT.md` with measured numbers, each linked to its source file, and every open question from the old audit marked answered or still open.

---

## 6. Workstreams 1–2 — Technical fixes and content integrity (days 1–7)

### 6.0 Order of work

1. P0-B redirect loop (code, small, testable locally).
1a. Workstream 1A fact alignment (§6A).
2. P0-C de-stuffing and P0-D eco claim (code).
3. P0-A host decision: present the two options to the owner with the recommendation; implement the chosen one.
4. After deploy: submit the sitemap in GSC and Bing, run `npm run indexnow` for changed URLs, request indexing for the 10 most important URLs.
5. P1-A, P1-B in Sanity (owner or Editor token).

### 6.1 Page gate — a new URL is allowed only if all are true

1. A distinct search intent exists (GSC impressions, Ubersuggest volume, PAA or AI Overview follow-ups) that no current URL satisfies.
2. The page can contain first-party substance: real photos, real specs, owner-approved facts, sourced data or a decision tool.
3. The SERP for the target query shows the page type proposed (product/category vs guide vs listicle). Match the dominant type.
4. It has at least three natural internal links in and a clear link to a commercial page.
5. It does not repeat a section of an existing page. If it would, make it a section there instead.

Anything failing the gate becomes a section, an FAQ, a filter or nothing.

### 6.2 Keep, improve, merge, redirect, remove

Every URL in `URL-INVENTORY.csv` gets one action with a reason, based on GSC data first and on content overlap second.

### 6.3 Cannibalisation candidates to verify with GSC query-to-page data

| Pair or group | Risk | Default decision if GSC shows two URLs trading positions |
|---|---|---|
| `/blog/led-neon-vs-glass-neon` and `/guides/led-neon-vs-glass-neon` | Same title intent | Keep the guide (deeper, sourced). Fold unique parts of the post in, 301 the post |
| `/blog/how-to-choose-the-right-neon-color-for-your-sign` and `/blog/choosing-neon-sign-colours-for-your-brand` | Colour choice | Split intent clearly (home decor vs brand colours) or merge |
| `/custom-signage/wedding-signs`, `/blog/custom-wedding-neon-signs-backdrop-guide`, `/blog/neon-sign-ideas-for-weddings-and-events` | Wedding | Collection owns "custom wedding neon signs"; one post owns ideas; one owns sizing/backdrop how-to. Differentiate or merge |
| `/business-signs/bar-signs`, `/custom-signage/bar-neon-signs`, `/blog/custom-neon-signs-for-bars-and-cafes` | Bar | B2B venue vs home bar are distinct intents. Keep both collections, make the post an ideas article linking to both |
| `/business-signs/backlit-signs`, `/business-signs/backlit-lobby-signs`, `/guides/front-lit-vs-halo-lit-vs-dual-lit` | Backlit / halo | Check GSC. Lobby page may merge into backlit signs |
| `/guides/how-led-neon-signs-are-made` and planned `/how-we-make-signs` | Process | Do not build a second process page. Add first-party workshop content to the guide or to `/about` |
| `/blog/how-to-choose-a-custom-neon-sign` and `/products/custom-neon-signs` | "custom neon sign" | Post targets "how to choose"; product page owns the head term. Check anchor text |

### 6.4 Pages to expand (only with real substance)

- `/guides/custom-business-sign-cost`: owner price bands by type and size with a "valid as of" date. Separate fabricated vs installed vs permit cost for channel letters. Until prices exist, publish the cost drivers and a "what affects your quote" table, not numbers.
- `/business-signs/custom-logo-neon-signs`: logo-to-neon process, what logos convert well, detail limits, real before/after mockup vs finished photo.
- `/custom-signage` and `/guides` hubs: a short definition, a chooser table (occasion or question → page), and links to every child.

---

## 6A. Workstream 1A — Fact alignment (days 1–5)

Goal: every page, schema block and `llms.txt` states exactly the facts in §1A, from one source.

**Step 1. Source of truth.** Update `lib/claims.ts` first, then make the files below read from it instead of hard-coding text:
- `WARRANTY`: status `approved`, term "5-year warranty", scope all four sign types.
- `LEAD_TIME`: status `approved`; neon production "3–5 business days"; other types "3–10 business days"; transit "3–8 business days"; rush "available at no extra cost"; clock starts at mockup approval.
- `MOCKUP`: "free mockup within 24 hours, including weekends".
- `REMOTE`: "every neon sign comes with a dimmable remote".
- `REVISIONS`: "unlimited free design revisions".
- `PAYMENT`: full payment, or optional 50% deposit and 50% before dispatch.
- `DELIVERY`: free worldwide delivery, standing policy. Retire `FREE_DELIVERY_PROMO` and `HAS_FREE_DELIVERY_PROMO`, or replace them with a plain `FREE_WORLDWIDE_DELIVERY = true`. Delete the "promotion ended" wording.

**Step 2. Files that state old facts** (grep of 2026-09-28; re-run it, the list may have grown):

| Old fact | Files |
|---|---|
| "10–15 days" | `lib/claims.ts`, `components/storefront/sections/order-includes-section.tsx`, `faq-section.tsx`, `comparison-section.tsx`, `app/terms/page.tsx`, `app/shipping/page.tsx`, `app/contact/page.tsx`, `app/llms.txt/route.ts` |
| "Mockup in ~2 hours", "~2 h" | `components/storefront/sections/hero-section.tsx`, `app/layout.tsx` |
| "optional remote" | `lib/collection-pages.ts` |
| Free delivery ended, or shipping cost "confirmed with your quote" | `lib/claims.ts` `DELIVERY`, `app/shipping/page.tsx`, `order-includes-section.tsx`, `app/llms.txt/route.ts`, metadata in `app/layout.tsx` |
| "5-year" | Already correct in about 20 files. Where scope is stated, make it cover all four sign types |

**Step 3. Policy pages.** Rewrite `/shipping` (free worldwide delivery, 3–8 business days, tracked, rush at no extra cost), `/returns` (5-year warranty on all four types) and `/terms` (lead times, payment options). Keep the legal meaning precise. Show the owner the diff before deploy.

**Step 4. Structured data.**
- Add `hasMerchantReturnPolicy` built from `/returns`.
- Add `shippingDetails`: `shippingRate` 0 USD, destination worldwide, `deliveryTime.handlingTime` (neon 3–5, others 3–10 business days) and `deliveryTime.transitTime` 3–8 business days.
- Google expects `Offer` to carry a price, so emit `Offer` only when §1B prices exist. Until then, keep the objects ready in code, or place return and shipping policy at Organization level if current Google documentation supports it. Check the docs before choosing.

**Step 5. Claims register and audit.** Set CLM-001, 002, 003, 004 and 014 to approved with source "owner, 2026-09-28". Add rows for rush, remote and revisions. In `scripts/seo-audit.mjs`, add "10–15 days", "~2 h", "2 hours", "optional remote", "promotion ended", "countdown", "offer ends" and "sale ends" to the retired patterns.

**Step 6. Off-site (the owner does these; prepare the exact text).** Etsy: 5-year warranty in every listing, the new lead times, free worldwide shipping set in shipping profiles rather than as a timed sale, and no sale timers. Instagram and Facebook bios: the same facts and a link to the site. Ads: remove countdown creatives.

**Acceptance tests**
- A grep for every old fact in Step 2 returns nothing outside `lib/claims.ts` comments and the claims register history.
- `/shipping`, `/returns`, `/terms`, `/llms.txt`, the homepage FAQ and every sign-type page show the §1A wording.
- `npm run seo:audit` passes with the new retired patterns.
- The Rich Results Test shows no errors on the four sign-type pages.
- `SEO-EXPERIMENTS.md` has the entry "Fact alignment 2026-09-28". Review CTR and quote rate on the sign-type pages after 28 days.

## 7. Workstream 3 — Research (days 3–14)

Use the owner's full research brief (in the master prompt) as the checklist, with these constraints:

- **Extend** `COMPETITOR-RESEARCH.md`, `research/serp-commercial.md`, `research/serp-decision.md`, `CONTENT-GAPS.md` and `KEYWORD-MAP.csv`. Add a dated "2026-09 refresh" section. Do not rewrite what still holds.
- **Four competitor sets:** direct sellers (Custom Neon, Yellowpop, NeonSigns.com, NeonChamp, Crazy Neon, Kings of Neon, SignMonkey, BuySignLetters, halolitsigns.com), SERP competitors (sign-shop blogs, manufacturers, FASTSIGNS/Signarama), marketplaces (Etsy, Amazon, Walmart), informational authorities. Verify the list still holds with Ubersuggest and a fresh SERP sample, then add or drop.
- **Per competitor**, record only what can be observed, with URLs: page types, category structure, schema types, pricing display, mockup and quote flow, warranty and shipping terms, review volume, content depth on the winnable clusters, backlinks and referring domains (Ubersuggest).
- **Page-type analysis:** for each keyword cluster, record which page type ranks in the top 5. This decides the page type to build.
- **AI visibility check:** for 25 buyer questions (list in §9), record whether Google AI Overview, ChatGPT search, Perplexity and Copilot answer, which domains they cite, and whether The Glownique appears. Repeat monthly. Save in `research/ai-visibility-2026-09.md`.
- **Label every price and figure** as verified, observed, estimate or unavailable. Competitor numbers are never adopted as The Glownique's.

Definition of done: an updated keyword universe grouped by cluster, intent, funnel stage and commercial value, each row mapped to exactly one target URL or marked "track only".

---

## 8. Workstream 4 — Architecture and page roadmap (days 7–30)

### 8.1 Target hierarchy (keeps existing URLs; no mass rewrites)

```
/                                   Brand + custom LED neon head terms
├── /products/custom-neon-signs     Pillar: custom LED neon signs
├── /business-signs                 Pillar: custom business signs
│   ├── /channel-letter-signs       Sign type (canonical)
│   ├── /lightbox-signs             Sign type (canonical)
│   ├── /acrylic-logo-signs         Sign type (canonical)
│   ├── /custom-logo-neon-signs     Neon for business logos
│   ├── /backlit-signs              Lighting style
│   └── /{restaurant, salon-spa, gym-fitness, office, retail-storefronts, bar, open, trade-show}-signs   Industries
├── /custom-signage                 Pillar: personal and occasion neon
│   └── /{wedding, event, home-decor, kids-room-neon, gaming-neon, bar-neon}-signs
├── /guides                         Decision guides (buying, sizing, lighting, outdoor, cost, install)
├── /blog                           Ideas and care articles that feed the pillars
├── /projects                       NEW when 3+ real projects with permission exist
├── /about                          Entity, people, process, where signs are made
└── /contact, /shipping, /returns, /terms, /privacy, /accessibility
```

### 8.2 Roadmap candidates (each must pass the page gate)

| Tier | Page | Intent | Blocked on |
|---|---|---|---|
| 1 | Fix and expand existing money pages (four sign types, custom logo neon, industry pages) with real photos, specs, FAQs from PAA | Commercial | Owner facts and photos |
| 1 | `/guides/custom-business-sign-cost` rebuilt; optional `/guides/custom-neon-sign-cost` only if GSC/Ubersuggest show a distinct neon-cost intent | Commercial investigation | Owner price bands |
| 1 | `/guides/sign-installation-electrical-permits` (what the installer and electrician need, what ships with the order, permit checklist) | Decision, top objection for channel letters | What ships with the order |
| 2 | `/projects` hub + 3 case studies (`/projects/{slug}`) | Proof, E-E-A-T, image search | Owner projects, permission |
| 2 | Neon sign size guide for personal signs (wedding, bedroom, bar) if not already covered by `/guides/sign-size-viewing-distance` | Decision | — |
| 2 | Font and colour shown lit (section or gallery on the neon page) | Commercial | Owner photos |
| 3 | Running cost / wattage explainer or calculator | Informational, AEO | Measured watts |
| 3 | Glossary of sign terms (halo-lit, returns, raceway, standoffs, IP rating) as one page with anchors | AEO, entity | — |
| 4 | Seasonal idea posts (only if GSC shows traction on existing Christmas and Halloween posts) | Informational | — |

Excluded on purpose: city or state pages, "near me" pages, one page per colour or font, one page per keyword variant, pages for products not sold.

### 8.3 Per-page brief template

Every new or rebuilt page gets a brief in `PAGE-BRIEFS.md` with: URL, title (≤ 60 chars), meta description (≤ 155 chars), H1, primary and secondary keywords with source and date, intent, audience, 40–60 word answer-first opening, section outline, facts used (with claim IDs), images needed, internal links in and out, schema types, CTA, owner inputs needed, success metric and review date.

---

## 9. Workstream 5 — AEO (answer engine optimization)

Target questions (starting set; extend from PAA, GSC queries, forums and AI follow-ups):

1. What is a custom LED neon sign?
2. How much does a custom neon sign cost?
3. How much do channel letter signs cost, installed vs shipped?
4. How long does a custom neon sign take to make and ship?
5. What size neon sign do I need for a wedding backdrop / bedroom wall / storefront?
6. Can you turn my logo into a neon sign? What detail is too small?
7. LED neon vs glass neon: what is the difference?
8. Are LED neon signs safe? Do they get hot?
9. Can LED neon signs be used outdoors? What does IP67 mean?
10. How much electricity does a neon sign use?
11. How long do LED neon signs last?
12. How do I hang or mount a neon sign?
13. Who installs channel letters, and do I need a permit?
14. Front-lit vs halo-lit vs dual-lit: which should I choose?
15. Channel letters vs lightbox sign: which is better?
16. What letter height can people read from a given distance?
17. Can I choose the font and colour? Can I see it before paying?
18. Is there a warranty? What does it cover?
19. How is a neon sign shipped and what if it arrives damaged?
20. How do I clean an LED neon sign?
21. Do neon signs come with a dimmer or remote?
22. Can a neon sign run on batteries for an event?
23. What is the difference between backlit and halo-lit?
24. What should I send to get a quote?
25. Is The Glownique the same company as Glownique cosmetics?

Rules:

- Answer in the first 40–60 words under a heading phrased as the question. Then the detail, the table, the caveats and the source.
- Place each question on exactly one primary page (map it in `KEYWORD-MAP.csv`), and link to that answer from other pages instead of repeating it.
- Use tables for any comparison, lists for steps, and real numbers only when the source is recorded.
- Mark up with the schema that matches the page type (Article, Product, BreadcrumbList); FAQPage only for visible FAQ blocks.

---

## 10. Workstream 6 — GEO and entity

1. **Entity home:** `/about` must state the legal name, what is made, where, by whom, since when, contact email, and the disambiguation from Glownique cosmetics. All from owner answers. Organization schema mirrors it with `sameAs` for the Etsy shop, Instagram, Facebook, Pinterest and LinkedIn once they link back.
2. **Consistency:** one name ("The Glownique"), one description sentence, one warranty, one lead time, one contact set across the site, `llms.txt`, Etsy, Instagram, Facebook, Pinterest, Google Business Profile (only if the owner has an eligible address; ship-only businesses usually do not), directories.
3. **Citable assets:** comparison tables, the sizing table, sourced outdoor/IP explainer, the lighting guide, owner-measured wattage, a price-band table with a date, real project sheets. These are what AI answers quote.
4. **llms.txt:** keep it factual and qualified, list the canonical pages and the four sign types, add the new guides and `/projects`. It is a low-cost aid, not a ranking factor.
5. **AI crawler access:** keep the current `robots.txt` allowances for search and user agents. Verify after the host fix that bots get 200 HTML on the primary host.
6. **Third-party presence:** get listed where AI answers already cite sources for these questions (wedding vendor directories, "best custom neon sign" roundups, trade forums, supplier partner pages). Earned only. See §14.
7. **Measure:** the monthly AI visibility check in §7 and PostHog AI referral sessions and leads.

---

## 11. Workstreams 7–11 — Schema, internal links, images, performance, conversion

**Structured data.** Organization + WebSite sitewide (exists). Product on the four sign-type pages; add `Offer` only with owner-approved price and matching visible text, plus `shippingDetails` and `hasMerchantReturnPolicy` from `/shipping` and `/returns`. BreadcrumbList everywhere (exists). Article for guides and posts with a real author or the organization as author (never an invented person). CollectionPage + ItemList on hubs (exists). Validate with the Rich Results Test and Schema.org validator after each change; record results in `SCHEMA-MAP.md`.

**Internal linking.** Pillars: `/products/custom-neon-signs`, `/business-signs`, `/custom-signage`, `/guides`. Every guide links to the sign type it helps choose, with a descriptive anchor ("halo-lit channel letters", not "click here"). Every product page links to its decision guides and 2–3 industries or occasions. Every blog post links to one pillar and one guide. No orphans; no links to redirecting URLs (the audit checks this). Update `INTERNAL-LINKING.md`.

**Image SEO.** Descriptive filenames for new uploads (`halo-lit-channel-letters-cafe-night.webp`), fix typo folders (`3d-arcylic`, `corporte`) with redirects if the old paths were ever indexed, alt text that describes the photo (not a keyword list), width and height set, AVIF/WebP through `next/image`, an image sitemap for product and project photos. Real photos over renders; renders must be labelled as visualisations.

**Performance.** Targets at p75 mobile: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Defer PostHog session recording and surveys on mobile, lazy-mount heavy animation sections, delay the chat widget until interaction, remove legacy polyfills. Measure before and after with a Chrome DevTools trace and PostHog web vitals; log in `SEO-EXPERIMENTS.md`.

**Conversion.** Above the fold on every money page: the free mockup CTA, what to send for a quote, and the fact that makes the purchase low-risk (approve before you pay, once confirmed). Visible warranty, production time and shipping only after P0-E is resolved. Track quote submit, configurator start, Etsy click and WhatsApp click as GA4 key events. Show real photos with sizes. No fake urgency or counters.

---

## 12. Deliverables and where they live

| Owner's deliverable | File in `SEO-Optimization/growth-system/` |
|---|---|
| 1 Executive summary | `SEO-AUDIT.md` top section "State of search, 2026-09" |
| 2 Competitor landscape | `COMPETITOR-RESEARCH.md` (refresh section) |
| 3 Keyword and intent map | `KEYWORD-MAP.csv` |
| 4 Website architecture | `antigravity/SPEC.md` §8 (update in place) |
| 5 New page roadmap | `CONTENT-PLAN.md` |
| 6 Existing page optimization | `URL-INVENTORY.csv` action column |
| 7 Content clusters | `CONTENT-PLAN.md` |
| 8 AEO strategy | `CONTENT-PLAN.md` AEO section + `KEYWORD-MAP.csv` question rows |
| 9 GEO strategy | `research/brand-entity-baseline.md` + `research/ai-visibility-2026-09.md` |
| 10 Technical audit | `TECHNICAL-ISSUES.md` |
| 11 Internal linking map | `INTERNAL-LINKING.md` |
| 12 Authority strategy | `research/authority-plan.md` (new) |
| 13 90-day plan | `90-DAY-ROADMAP.md` |
| 14 Prioritized master list | `SEO-AUDIT.md` §3 queue, with the columns Priority, Task, URL, Topic, SEO, AEO, GEO, Conversion impact, Effort, Timing, Status |

---

## 13. Phased plan

| Window | Work | Exit criteria |
|---|---|---|
| Days 0–7 | WS0 baseline; P0-A to P0-E fixed, including §6A fact alignment, and deployed with owner approval; sitemap resubmitted in GSC and Bing; IndexNow; owner questions sent | Zero `seo:audit` failures on production; GSC shows the sitemap read on the primary host |
| Days 8–30 | Research refresh; cannibalisation decisions from GSC; de-stuff and tighten all industry and collection copy; rebuild the cost guide and custom logo neon page with owner facts; `/about` completed with owner answers; performance pass on the homepage | Each changed URL logged; field INP trending down |
| Days 31–60 | Installation and permits guide; `/projects` with the first case studies; image SEO pass; internal-link pass; Offer schema if prices approved; Etsy listing titles aligned with the keyword map (owner) | New pages indexed (GSC URL Inspection); impressions on target clusters rising |
| Days 61–90 | Authority plan in motion (§14); AI visibility check month 2; refresh top 10 pages by impressions with CTR fixes (titles and descriptions) | First earned mentions or links; first AI citation or referral lead |
| Months 3–6 | Scale case studies, glossary, running-cost tool, seasonal content only where GSC shows demand; quarterly content pruning | Organic and AI-referred leads per month tracked and rising |

---

## 14. Authority plan (earned only)

- Wedding and event: vendor directories and real-wedding features that accept vendor credits with permission (e.g. The Knot, WeddingWire, Junebug, local planners). Verify each accepts product vendors.
- Hospitality and retail: supply project write-ups to the client's own site, trade associations and local business press where a real installation exists.
- Design: Pinterest boards with real photos, Houzz project pages if relevant, design blogs that cover neon decor.
- Data assets: publish owner-measured wattage and a sourced letter-height reference that others can cite.
- Roundups: find "best custom neon sign" articles that AI answers cite and contact editors with a factual product brief. No paid links, no PBNs, no link exchanges, no mass directories.
- Brand mentions without links still count for entity clarity. Track them.

---

## 15. Measurement

| Metric | Source | Cadence |
|---|---|---|
| Indexed pages vs sitemap | GSC | Weekly |
| Impressions, clicks, CTR, position by cluster | GSC export | Weekly |
| Organic sessions and key events by landing page | GA4 | Weekly |
| AI referral sessions and leads | PostHog + GA4 | Weekly |
| AI answer citations for the 25 questions | Manual check, `research/ai-visibility-*.md` | Monthly |
| Core Web Vitals p75 | PostHog, CrUX when available | Monthly |
| Referring domains | Ubersuggest | Monthly |
| `seo:audit` status | CI or pre-deploy | Every release |

---

## 16. Owner decisions needed (blocking specific work)

1. Primary host: www (recommended) or apex. Blocks P0-A.
2. Answered 2026-09-28 (§1A). Nothing left open in this group.
3. **Price list, in progress.** Price bands by type and size with a "valid as of" month. Blocks the cost guide, the "From $X" slots and Offer schema (§1B).
4. Identity facts for `/about`. Block GEO entity work.
5. Three to five real projects with permission and photos. Block `/projects`.
6. Sanity Editor token or owner edits for P1-A and P1-B.
7. Approval to push, deploy, submit to GSC/Bing, and edit Etsy and social profiles.
