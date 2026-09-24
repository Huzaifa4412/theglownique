# SEO, AEO & GEO Audit — The Glownique

Audit date: 2026-09-24 · Branch: `seo/growth-system-2026-09` · Market: US English (national, ship-only)

Evidence labels used throughout:

- **Measured** — a number from a tool run on 2026-09-24 (crawl, Lighthouse, trace, PostHog query).
- **Observed** — seen on a live page or search result; can change tomorrow.
- **Inferred** — a conclusion drawn from measured/observed evidence.
- **Recommendation** — what should happen, and why.

Unavailable sources, not guessed at: **Google Search Console** (the property is verified by a meta tag in `app/layout.tsx`, but no access was granted to this session), **GA4** (tag `G-6PWLMLHEMK` is live; no API access), **Bing Webmaster Tools**, **Ahrefs/Semrush/DataForSEO**, **TinyFish** and the **Sanity MCP** (both need authorisation), **PageSpeed Insights API** (keyless quota exhausted). PostHog's own API stood in for analytics, and a cold-cache Chrome trace for lab performance.

---

## 1. Executive diagnosis

### Where The Glownique stands

The domain was registered on **2026-08-04** — seven weeks before this audit (Observed, WHOIS via the brand research). It is a technically well-built site with almost no search presence yet:

- **~5 organic search sessions in four weeks** (Measured, PostHog, production hosts, 2026-08-26 → 2026-09-24): three from google.com, two from the Google app, landing on `/custom-signage` and `/`.
- **Absent from all 45 SERPs sampled** — 21 commercial and 24 decision/informational queries, Google US, 2026-09-24 (Observed).
- **The brand name belongs to someone else in search.** "The Glownique" and "Glownique" return GLOWNIQUE cosmetics (glownique.com) and tanning/skincare businesses across the top 10 in Google, Bing and DuckDuckGo; AI summaries conflated the two (Observed).
- **Barely indexed.** One URL surfaced in one engine; no Wayback or Common Crawl captures (Observed). GSC is the only source that can say how many pages Google has actually indexed.
- **AI search already produces business value.** Four sessions arrived from chatgpt.com, and one of them — a US visitor with `utm_source=chatgpt.com` — opened the configurator and submitted a quote that was archived as a lead (Measured, PostHog). That is the only organic-origin lead in the data.

### What is already strong

- **Rendering and access.** Every page is statically prerendered; all ten crawler user-agents tested (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot, CCBot) received full HTML with content (Measured). No firewall blocking was observed.
- **Crawl hygiene.** 49 sitemap URLs, all 200, zero broken internal links, zero orphans, honest `lastmod` dates from a route manifest, `noindex` handled correctly on `/studio` (Measured).
- **Governance.** A claims register, a runtime claims module (`lib/claims.ts`) and a regression audit (`scripts/seo-audit.mjs`) that gates titles, canonicals, JSON-LD and retired claims. This is rarer than it should be and is the reason most problems below were caught.
- **Real commercial architecture.** A B2B hub with eight industry pages, six consumer occasion collections with real Etsy order photographs, three buying guides and eleven journal posts.
- **Lighthouse SEO 100, Accessibility 97** on the homepage (Measured).

### What is holding organic growth back

1. **No authority and an ambiguous entity** (Observed). No third-party mentions or links were found; Instagram (3.8K followers) and Facebook (1.8K) link to Etsy or nowhere, not the website; a YouTube handle "@TheGlownique" belongs to an unrelated channel; the public GitHub repository ranks for the brand name and exposes the SEO strategy.
2. **Unverified claims were shipping to production** (Measured, fixed on branch). Within the last five weeks, automated copy passes published "5,000+ Happy Clients" and "Etsy Star Seller" (the Etsy shop shows 25 sales and no badge), a "5-star rated shop", "insured delivery", three different sets of prices (`$120–$350`, "from $150", "from $250"), a fabricated `AggregateOffer` and keyword-stuffed sentences. Another uncommitted batch of the same kind was in the working tree at the start of the audit, and an OpenAI Codex session was running on the machine and edited files during it.
3. **The site competed with itself** (Measured, fixed on branch). Channel letters, lightboxes and acrylic signs each had two URLs aimed at one query, with contradictory specifications between them.
4. **Thin decision content where the market is winnable** (Measured). The front-lit/halo-lit/dual-lit guide is 462 words, the cost guide 432, the guides hub 108 — on the query cluster the SERP research found most winnable.
5. **No first-party proof.** No price basis, no case studies, no About page ("About us" linked to the footer's own anchor), and two channel-letter images are AI renders of fictional brands under a "See it in the wild" heading (fixed on branch; replacement photos needed).
6. **Heavy homepage** (Measured). Mobile field INP p75 ≈ 1.1 s, LCP p75 ≈ 3.3 s, CLS p75 ≈ 0.20 (PostHog web vitals, small samples). The LCP element was a 2.3 MB PNG banner (fixed on branch); the remaining INP cost is JavaScript — five animation libraries, session recording and chat on every page.

### Highest-impact opportunities

- **The channel-letter lighting cluster.** Front-lit, halo-lit and dual-lit channel letters, 3D metal logo signs and reception logo signs are held by thin manufacturer pages; SignMonkey ranks #2 for "channel letter signs" with ~340 words, and ship-only sellers rank (halolitsigns.com is #1 for "halo lit signs"). Not installing is not the barrier (Observed, SERP study).
- **Answer-engine formats.** AI Overviews topped all 24 decision SERPs; they lead with a number or definition, rebuild comparison tables, and cite pages with direct answers. None of the 20 competitor pages audited cites a primary source; their price ranges disagree by up to 10× (Observed). Sourced, first-party content has an open lane.
- **Google Shopping via Etsy.** Shopping grids appeared on 21/21 commercial SERPs and Etsy shops appear inside them (Observed). The Etsy listings are the fastest route into those grids.
- **Bing and IndexNow.** ChatGPT search and Copilot draw on Bing. The site is not verified in Bing Webmaster Tools, though the IndexNow key file is already published.
- **First-party data.** Real price ranges from the order book, real project photos and three case studies would be the most citable content on the site.

### Biggest technical risks

- Unreviewed automated edits reaching production (see 2 above). The audit script now fails on the claim patterns that shipped; wiring it into CI is recommended in `TECHNICAL-ISSUES.md`.
- No Search Console or Bing data, so indexation problems stay invisible.
- Homepage JavaScript weight and third-party scripts on mobile.
- The public repository publishing strategy and internal notes.

### Biggest content gaps

Comparison content for the winnable lighting cluster; honest cost guidance built on the owner's own numbers; an indoor/outdoor and IP-rating explainer (the #1 result for "are LED neon signs waterproof" is a thin product page); installation and permit guidance (the top buyer objection for channel letters); About/process pages; case studies.

### Biggest AEO/GEO opportunities

Definition-first openings (done on the four sign-type pages); comparison tables; sourced figures; entity disambiguation (done in schema and `llms.txt`); consistent facts across site, Etsy and socials (warranty currently conflicts: 5 years on the site, 3 on the Etsy listing); getting named on the pages AI systems already cite — wedding directories, "best custom neon sign" roundups, trade forums.

---

## 2. Measured baselines (2026-09-24)

| Metric | Value | Source |
|---|---|---|
| Sitemap URLs / HTTP 200 | 49 / 49 | Crawl |
| Broken internal links / orphans | 0 / 0 | Crawl |
| Organic search sessions, last 28 days | 5 | PostHog (production hosts) |
| AI-assistant sessions, last 28 days | 4 (all chatgpt.com) | PostHog |
| Organic-origin leads | 1 (ChatGPT-referred quote) | PostHog |
| Homepage mobile LCP p75 (field) | 3,327 ms (n=12) | PostHog web vitals |
| Homepage mobile INP p75 (field) | 1,084 ms (n=7) | PostHog web vitals |
| Homepage mobile CLS p75 (field) | 0.203 (n=8) | PostHog web vitals |
| Homepage cold lab LCP (Slow 4G, 4× CPU) | 43.4 s (image download 42.4 s) | Chrome trace |
| Homepage Lighthouse (mobile) | SEO 100 · A11y 97 · Best practices 73 · Agentic 67 | Lighthouse |
| Commercial SERPs with theglownique.com in top 10 | 0 of 21 | Google US, manual capture |
| Decision SERPs with theglownique.com in top 10 | 0 of 24 | Google US, manual capture |
| Etsy shop | 25 sales · 5.0 from 8 reviews · 78 items | etsy.com/shop/TheGlownique |
| `seo-audit.mjs` against production build | 5 failures (start) → 0 (branch) | Audit script |

Samples are small; treat field vitals as directional until CrUX or GSC has data. Full detail: `KPI-BASELINE.md`.

---

## 3. Prioritised implementation queue

Status: **DONE** = implemented and tested on the branch (not yet deployed) · **OWNER** = needs a decision, access or asset only the owner has · **NEXT** = queued for implementation.

### P0 — Critical

| # | Issue | Evidence | Affected URLs | Expected benefit | Implementation | Effort | Status |
|---|---|---|---|---|---|---|---|
| P0-1 | Fabricated and unverified claims in production | "5,000+ Happy Clients" vs 25 Etsy sales; no Star Seller badge; "5-star rated shop" withdrawn under CLM-012; "insured" with no insurer; `public/pricing.md` with unapproved prices (live, `text/markdown`) | `/`, `/pricing.md`, `/guides/custom-business-sign-cost` | Removes FTC/consumer-protection exposure and stops AI engines quoting false numbers | Claims removed; files deleted; audit fails on the patterns; register CLM-021…026 | S | DONE |
| P0-2 | Homepage H1 was a hidden keyword chain | `sr-only` "Custom LED Neon Signs & 3D Business Signage, Handcrafted Commercial & Custom Illuminated Signs That Light Up Everything"; visible text differed; cursor glyph in H1 | `/` | Removes hidden-text risk; one honest, visible H1 | Visible pill became the H1 ("Custom LED Neon & Business Signs"); display line a `<p>` | S | DONE |
| P0-3 | Three sign types had two competing URLs each | Same product, same query, conflicting specs; flagged independently by the SERP study | `/products/{3d-metal-neon-signs, ultra-thin-lightbox, uv-print-acrylic-signs}`, `/business-signs/{channel-letter-signs, lightbox-signs, acrylic-logo-signs}` | Concentrates signals on one page per query; ends self-competition | Kept head-term URLs, full template there, 301s, every link from `ProductPage.path` | M | DONE |
| P0-4 | Homepage LCP/CLS from raw 2.3 MB PNG banners | LCP element `/banner/mobile.png`; ~5 MB wasted image bytes; no width/height | `/` | Lab LCP image payload cut from ~4.7 MB to AVIF/WebP at rendered width; CLS box reserved | `getImageProps()` art direction, per-source dimensions, priority on slide 1 only | S | DONE — two new slides added by another contributor during the audit link to 301 URLs and declare wrong dimensions; fix before deploy |
| P0-5 | Branch not deployed | — | All | Nothing above reaches users until merged | Review, merge, deploy; `npm run seo:audit -- --base https://www.theglownique.com`; `npm run indexnow` for changed URLs | S | OWNER |
| P0-6 | No Search Console / Bing data in the loop | GSC verified but not shared; Bing not verified | All | Index coverage, queries, CTR — the data every later decision needs | Share GSC access; verify Bing (import from GSC); submit sitemap in both | S | OWNER |
| P0-7 | Warranty conflict | Site: 5-year warranty everywhere; Etsy listing: 3-year | Sitewide, Etsy | Consumer-protection and trust risk; AI engines will quote whichever they find | Owner decides the true term; update `lib/claims.ts` WARRANTY and Etsy together | S | OWNER |
| P0-8 | Unsupported technical claims repeated sitewide | Cited fact check (`research/technical-fact-base.md` §11): "up to 100,000 hours" is an LED L70 figure, not sign life; "80% less power" holds only against old transformer neon; IP67 is brief immersion and usually rated on the strip; no basis for "cool to the touch"; acrylic backboards can crack. FTC requires substantiation before publication | 16 files: product, collection, industry, homepage sections, policies, llms.txt | Removes the claims most likely to be quoted by AI and challenged by buyers | 65 exact replacements with qualified wording; practical safety advice added; register CLM-006…009 record what evidence restores each | M | DONE |

### P1 — High impact

| # | Issue | Evidence | Affected URLs | Expected benefit | Implementation | Effort | Status |
|---|---|---|---|---|---|---|---|
| P1-1 | Etsy links and `sameAs` named one listing, not the shop | `ETSY_SHOP_URL` = a wedding-sign listing | Header, reviews, contact, schema, llms.txt | Correct entity link; B2B buyers no longer land on a wedding listing | Shop URL; `disambiguatingDescription`; `contactPoint` | S | DONE |
| P1-2 | llms.txt stated validation-pending claims as facts | 100,000 h, 80 % less power, IP67, 50/50, 1–2 h, 5-year | `/llms.txt` | AI answers stop repeating unevidenced absolutes | Attributed, qualified or pointed at policy pages; industry pages and disambiguation added | S | DONE |
| P1-3 | Duplicate hosts and trailing-slash URLs | `theglownique.vercel.app` 200 + index; `/business-signs/` 200 | All | One URL per page | `X-Robots-Tag: noindex` on `*.vercel.app`; 301 slash removal excluding `/ingest`, `/api` | S | DONE |
| P1-4 | Hubs not linked sitewide; industry pages weakly linked | 15 pages with ≤2 contextual inlinks | `/business-signs`, `/guides`, industry and occasion pages | Crawl paths and relevance to money pages | Footer "Explore" column; 15 contextual product → industry/occasion links | S | DONE |
| P1-5 | Front-lit vs halo-lit vs dual-lit guide is thin on the most winnable cluster | 462 words, 2 H2s; SERP study: thin competitors | `/guides/front-lit-vs-halo-lit-vs-dual-lit` | Rankings and AI citations for the lighting cluster | Rebuilt: answer first, 8-row table, per-style definitions, backlit terminology, decision list, USSC letter-height data, mounting, listing/permits, 6 FAQs, 11 sources | M | DONE — add day/night photos of one logo in all three modes (OWNER) |
| P1-6 | Cost content has no numbers | No approved price basis; competitors lead with ranges | `/guides/custom-business-sign-cost` | The single most-asked buyer question; AI Overviews lead with a number | Owner supplies dated ranges by size from orders; split channel-letter cost (fabrication vs installation vs permit) | M | OWNER → NEXT |
| P1-7 | No About/process page; "About us" links to the footer | Footer `/#about` is the footer's own id | Sitewide | E-E-A-T, entity clarity, trust for high-value B2B orders | Owner answers OWNER-QUESTIONS.md §2; build `/about` and `/how-we-make-signs` (reuse the parked WIP draft, fact-checked) | M | OWNER → NEXT |
| P1-8 | Visualisations presented as installations | `/generated/` renders of fictional brands under "See it in the wild" | Channel-letter page | Honesty; real photos convert better | Heading and alt text fixed; replace with real project photos | S | DONE (photos: OWNER) |
| P1-9 | CMS content defects | Two posts say "insured"; one links a retired URL; three titles too long | `/blog/*` | Consistency; no redirect hops | Titles fixed in template; editor changes the rest in Sanity (write token is viewer-only) | S | OWNER |
| P1-10 | Social profiles do not link the website | IG bio → Etsy; FB lists no website | Off-site | Entity consolidation; referral path | Update bios; create Pinterest (visual search), LinkedIn; claim a distinct YouTube handle | S | OWNER |
| P1-11 | Etsy listings are the fastest route into Shopping grids | Shopping on 21/21 commercial SERPs, Etsy shops inside | Etsy | Product visibility without new site authority | Rewrite listing titles/tags/first photos around the mapped terms; consistent warranty and lead time | M | OWNER |
| P1-12 | Homepage INP on mobile | INP p75 ≈ 1.1 s; worst targets: header Etsy button, Swiper, chat | `/` | Responsiveness; conversion | Defer session recording/surveys/dead-clicks on mobile; lazy-mount sparkles, lamp, wobble and 3D-card sections; measure before/after | M | NEXT |
| P1-13 | Lead-time conflict (CLM-002) and steel grade | "10–15 business days" (home) vs "days" vs "approval to arrival" (shipping); 304 vs 316 | Sitewide | Consistent facts AI can quote | Owner defines production vs transit and the grade; update `lib/claims.ts` | S | OWNER |

### P2 — Growth

| # | Item | Why | Status |
|---|---|---|---|
| P2-1 | Indoor/outdoor and IP-rating guide | #1 result for "are LED neon signs waterproof" is a thin product page; buyers put indoor signs outdoors | NEXT |
| P2-2 | Channel letters vs lightbox (cabinet) comparison | Decision SERP with AI Overview; no comparison page on the site | NEXT |
| P2-3 | Sign size and viewing-distance guide | Business sizing guidance is missing from the SERP | NEXT (needs sourced legibility data) |
| P2-4 | "How we make custom LED neon signs" process page | Repurpose the parked WIP draft after a fact-check; supports P1-7 | NEXT |
| P2-5 | Guides hub content | 108 words; should route to every guide and sign type | NEXT |
| P2-6 | Bar signs pair and backlit lobby page | SERP study flags the bar pair as competing; lobby page has ~160/mo total demand and overlaps two pages | Review with GSC data |
| P2-7 | Image SEO | UUID filenames, typo folders (`3d-arcylic`, `corporte`), no image sitemap | NEXT |
| P2-8 | Digital PR and citations | Wedding directories, "best custom neon sign" roundups, design and trade publications, supplier/partner pages | OWNER + NEXT |
| P2-9 | Case studies / `/projects` | Needs real projects with permission | OWNER |

### P3 — Nice to have

| # | Item | Status |
|---|---|---|
| P3-1 | `http://theglownique.com` takes two hops (http→https→www); configure a single redirect in Vercel domains | OWNER |
| P3-2 | ~74 KB of legacy JS polyfills (Chrome insight) | NEXT |
| P3-3 | 11 pre-existing lint errors in Aceternity UI components | NEXT |
| P3-4 | Meta Conversions API gateway returns HTTP 422 on every page | OWNER (Events Manager) |
| P3-5 | Tawk.to auto-message covers the hero facts on mobile | OWNER (CRO call) |
| P3-6 | `/studio` is public (noindexed) | OWNER |
| P3-7 | Make the GitHub repository private | OWNER |

---

## 4. What changed on the branch

Six code commits after the working-tree snapshot, plus this documentation, each built and tested against a local production server:

1. Unverified claims removed (customer count, Star Seller, shop rating, insured, prices, fabricated `AggregateOffer`).
2. Homepage: visible H1, optimized banner, trailing-slash 301s, `noindex` on `*.vercel.app`, template fixes.
3. One URL per sign type (three 301s), shared product route and schema, footer hubs, homepage `ItemList`.
4. Etsy shop entity, `disambiguatingDescription`, qualified `llms.txt`, 15 contextual links, blog title lengths.
5. Technical claims qualified sitewide (lifetime, energy, IP67, heat, shatterproof).
6. Lighting comparison guide rebuilt with sources.

Summary in `resources/implementation-log.md` (release 2026-09-24); the experiment log with baselines and measurement windows is `SEO-EXPERIMENTS.md`.

`scripts/seo-audit.mjs` against the production build: **5 failures at the start → 0**. Remaining warnings are CMS content and the two new banner links.
