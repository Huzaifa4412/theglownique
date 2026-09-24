# SERP Research: Decision & Informational Queries (US), The Glownique

**Snapshot date:** 2026-09-24  |  **Scope:** 20 queries + 4 variants = 24 Google SERPs; 20 competitor pages audited; 8 forum threads read + ~20 Reddit/Quora titles observed on SERPs.
**Business context used for recommendations:** made-to-order illuminated signage (custom LED neon, metal channel letters front-/halo-/dual-lit, backlit signs, slim LED lightboxes, UV-printed acrylic logo signs), US-national online seller, free mockup → WhatsApp quote → Etsy checkout, **no installation**.
**Existing site routes (from `resources/current-route-and-schema-inventory.md`):** `/products/custom-neon-signs`, `/products/3d-metal-neon-signs`, `/products/ultra-thin-lightbox`, `/products/uv-print-acrylic-signs` + policy pages. Planned guides per `06-information-architecture.md` are referenced where they fit.

**Labels used throughout:** **[O] = observed** (seen directly in a SERP capture, fetched HTML or forum page on 2026-09-24). **[I] = inferred** (my interpretation/recommendation). Competitor numbers appear only as "competitor states" or "AIO states". None were checked, and none should be adopted as Glownique figures.

---

## 0. Key findings (TL;DR)

1. **[O] An AI Overview (AIO) appeared at the top of all 24 captured SERPs. No classic featured snippet appeared on any of them.** The AIOs follow one pattern: a one-sentence answer with a number or range, bold-labelled breakdowns, and often a **comparison or price table** (Q1, Q2, Q4, Q5). They end with **qualifying questions**: indoor or outdoor, size, text or logo, wall material, budget, landlord rules.
2. **[O] customneon.com is the most-cited source across neon topics.** It was cited in the AIO for Q1, Q3, Q8a, Q8b, Q12, Q16, Q17, Q20a and Q20b. For channel-letter topics the AIO cites sign-shop blogs (BlinkSigns/"Ohio Sign Company", Flexlume, Houston Sign Crafters, AlphaGraphics, ESCO Pacific, Gemini) and even the **Signs101 trade forum** for per-inch pricing.
3. **[O] The bar for competitor evidence is low.** None of the 20 audited pages linked to a primary source (standards body, .gov, .edu, test lab). Price ranges are unsourced and disagree with each other by up to 10x. Author signals are weak: brand-as-author, usernames, names without credentials. Freshness is used heavily: "2026" in titles, dateModified bumps.
4. **[O] Specific gaps a ship-only seller can fill:**
   - **Channel-letter cost pages mix "installed project" ranges with "letters shipped" ranges.** One installer states $2k–$20k+. One factory-direct seller states $800–$4k ship-only. The AIO blends both.
   - **The #1 result for "are LED neon signs waterproof" / "can LED neon signs be used outdoors" is a thin product page** (neonsigns.com outdoor, ~783 words). It never explains IP ratings.
   - **"What size neon sign do I need" is dominated by wedding content.** There is little sizing guidance for businesses.
   - **Halo-lit vs backlit terminology is inconsistent.** The AIO says the terms are the same thing. Tupp Signs says "backlit" also means front-lit.
   - **Claims about glass-neon wattage per foot contradict each other.** NeonSignsNow states ~3.5–4 W/ft; BlinkSigns and the AIO state 60–100 W/ft.
5. **[O] The Glownique was not seen in any of the 24 captured SERPs** (organic, AIO citations, shopping or forums).
6. **[I] What to build first:**
   - Channel-letter cost guide that clearly separates fabrication from installation.
   - Custom LED neon cost guide.
   - One comparison page covering front-lit, halo-lit (backlit) and dual-lit.
   - Indoor/outdoor and IP-rating guide.
   - Channel letters vs lightbox (cabinet) comparison.
   - Then: size guide, a "what your installer needs" install guide, and LED vs glass neon.
   - **"How to make a neon sign" is DIY-intent and not worth targeting as written.** Repurpose the draft into a "how our LED neon signs are made" process page.

---

## 1. Method & limits

| Item | Detail |
|---|---|
| SERP capture | Google web search loaded in the Claude Browser pane with `gl=us&hl=en&pws=0`, then the full page text was extracted with JavaScript. Google reported "Can't determine location", so these are **national US results without local personalization**, requested from a non-US IP. Local packs, shopping and AIO content may differ for a real US user. |
| Queries captured | Q1–Q20 plus variants: "channel letters vs cabinet sign", "can led neon signs be used outdoors", "best storefront sign type", "best font for neon sign" (24 SERPs). One unintended SERP ("custom neon signs") was also captured. It appears in the Appendix only. |
| PAA | Initial 4 PAA questions recorded for every SERP. **Expanded** (clicked to reveal more questions) only for Q1, Q2 and Q3. On the next page load Google served an **"unusual traffic" interstitial**. I stopped immediately, did not attempt to solve or bypass it, and closed the tab. PAA answer text and source domains did not render because the window was hidden, so **I have no data on which site holds each PAA answer.** |
| Featured snippets | None observed. Some AIO blocks were captured without the "AI Overview" label because of where the text capture started. They share the AIO structure: source chips with "+N", "Show more", and follow-up prompts. |
| Cross-check | The WebSearch tool (US) was run for all 20 queries. Its link order is **not** a Google rank; it was used only to confirm domains and full URLs. |
| Unavailable tools | `web-search-prime` returned an out-of-credits error (1113). TinyFish was not used, as instructed. |
| Reddit / Quora | **Reddit was blocked for every tool I had:** WebSearch refuses reddit.com, the Browser pane blocks it, and direct requests hit a login redirect or 403. Quora returned 403. I did not route around these blocks through proxies. Reddit evidence is therefore limited to **thread titles and snippets as Google displayed them [O]**. Forum deep reads used **WeddingWire (3 threads)** and **Signs101 (5 threads)**. |
| Page audits | Raw HTML was fetched with Python urllib, which extracted H1–H3, JSON-LD types/dates/authors, table count, `$` figures and outbound domains. Script: `research/page_audit.py`; raw HTML in `research/raw/Q*.html`. A small-model page summarizer (WebFetch) added content summaries. It sometimes called 2026 dates "future-dated"; that is a model artifact and was ignored. Word counts include navigation and footer boilerplate. |
| Volatility | Single snapshot. Q1's organic order changed between two loads a few minutes apart (Voodoo Neon ↔ Kings of Neon). |
| Not available | No search volume, keyword difficulty or rank-tracking data. **No volumes are claimed or inferred.** |

---

## 2. SERP feature matrix (all 24 SERPs) [O]

Legend: ✔ present, — not seen. "Fora" = Reddit/Quora/Facebook/forum results or "Discussions and forums" module.

| # | Query | AIO | FS | PAA | Video | Images | Shopping | Fora | Ads | Dominant intent [I] | Winning format [I] |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | how much does a custom neon sign cost | ✔ (price-by-size table) | — | ✔ | — | — | ✔ Popular products ($16.79–$70.72 listed) | ✔ Reddit ×3; "Forums" tab | — | Commercial investigation (price check) | Product pages showing a "starts at $X" price in the snippet + price guides with size tiers |
| 2 | how much do channel letters cost | ✔ (installed-cost table by lighting type) | — | ✔ | — | — | ✔ ($9.99–$1,580 listed) | ✔ Signs101 | — | Commercial investigation | Installer/factory cost guides with ranges, plus deposit/pricing pages |
| 3 | led neon vs glass neon | ✔ | — | ✔ | ✔ (4) | — | — | ✔ Reddit | — | Comparison / informational | Seller comparison page with attribute table; artisan blog |
| 4 | front lit vs halo lit sign | ✔ (comparison table) | — | ✔ | — | — | — | ✔ Instagram | — | Comparison | Sign-shop comparison blogs; manufacturer knowledge base |
| 5 | halo lit vs backlit sign | ✔ (says they are the same; table vs front-lit) | — | ✔ | ✔ (Instagram/YouTube/Facebook) | — | — | ✔ Instagram | — | Definition / clarification | Definitional Q&A plus comparison |
| 6 | channel letters vs lightbox sign | ✔ | — | ✔ | — | — | — | ✔ Reddit, Facebook | — | Comparison (buyer choosing) | Sign-shop comparison blogs |
| 6b | channel letters vs cabinet sign | ✔ | — | ✔ | — | ✔ | — | ✔ Reddit, LinkedIn | — | Comparison | Sign-shop comparison blogs |
| 7 | acrylic sign vs metal sign | ✔ | — | ✔ | ✔ (1 YouTube) | — | — | — | — | Comparison (materials) | Sign-shop blogs (pros/cons + price) |
| 8a | are led neon signs waterproof | ✔ | — | ✔ | ✔ (4, mostly DIY waterproofing) | — | — | ✔ Discussions & forums (Reddit r/led, Quora) | ✔ (in the AIO area) | Informational pre-purchase | Seller outdoor product pages + support FAQ |
| 8b | can led neon signs be used outdoors | ✔ | — | ✔ | ✔ (3) | — | — | ✔ Reddit ×3, Instagram | — | Informational pre-purchase | Product page, help-center article, FAQ page |
| 9 | how long do led neon signs last | ✔ (with embedded YouTube) | — | ✔ | ✔ (in AIO) | — | — | ✔ Reddit ×3 | — | Informational | Seller FAQ/blog with hours → years |
| 10 | how much electricity does an led neon sign use | ✔ (offers to calculate cost) | — | ✔ | — | — | — | ✔ Reddit ×3 | — | Informational / calculation | Seller blogs with watts per foot, cost per month |
| 11 | what size neon sign do i need | ✔ | — | ✔ (drifts to welcome/yard signs) | ✔ (3) | — | — | ✔ Facebook groups | — | Informational / planning | Size guides, mostly weddings |
| 12 | how to hang a neon sign | ✔ (embedded Kings of Neon video) | — | ✔ | ✔ (3) | ✔ | — | ✔ Reddit | — | How-to (post-purchase) | Seller how-to + video |
| 13 | how are channel letters installed | ✔ (embedded Sign Monkey video) | — | ✔ (cost-related) | ✔ (heavy: 4+) | — | — | ✔ Signs101, Facebook | — | How-to / process | Video + installer guides |
| 14 | what is a dual lit sign | ✔ | — | ✔ | — | — | ✔ (includes "Dual-Lite" exit signs, entity noise) | — | — | Definition | Short definitional blogs + product pages |
| 15 | best sign for storefront | ✔ (says channel letters) | — | ✔ | — | — | — | Pinterest | ✔ | Commercial investigation (broad) | "Ultimate guide" / ideas listicles; marketplaces |
| 15b | best storefront sign type | ✔ | — | ✔ | — | — | — | — | ✔ (6) | Commercial investigation (broad) | Types guides |
| 16 | neon sign for business worth it | ✔ (pros/cons) | — | ✔ | ✔ (3) | — | ✔ (heavy) | ✔ Reddit ×3 + Discussions module (Reddit, Quora ×2) | — | Commercial investigation | Mix: marketplace, forums, seller business pages |
| 17 | how to make a neon sign | ✔ (DIY steps + "order online") | — | ✔ | ✔ (3 + short-video carousel) | — | — | ✔ Reddit, Instagram | — | **DIY how-to** | Video tutorials, DIY blogs, one seller guide, one online design tool |
| 18 | uv printing on acrylic signs | ✔ (below first result) | — | ✔ | ✔ (4 + 1 result) | — | ✔ (heavy) | — | ✔ (heavy) | Mixed: buy a UV-printed sign / learn UV printing (printer owners) | Print-shop product pages + printer-brand guides |
| 19 | lightbox sign vs neon sign | ✔ | — | ✔ | — | — | — | ✔ Facebook, Quora | — | Comparison | **Weak/mismatched**: many results answer "LED vs neon" |
| 20a | neon sign font ideas | ✔ | — | ✔ | — | ✔ | — | — | — | Inspiration | Seller font listicles + font marketplaces |
| 20b | best font for neon sign | ✔ (cites Custom Neon only) | — | ✔ | ✔ (1) | ✔ | — | ✔ Reddit ×3 | — | Inspiration / design | Seller font listicles + font marketplaces |

---

## 3. Per-query findings

URL format: a full URL where it was confirmed by a fetch or by WebSearch. Otherwise Google's displayed breadcrumb, ending in "…". Dates are those Google displayed [O].

### Q1. how much does a custom neon sign cost
**Organic order [O] (2nd load):**

| # | Domain | URL | Page type | Date shown |
|---|---|---|---|---|
| 1 | neonsigns.com | https://www.neonsigns.com/us/ | Product/category home (snippet shows starting price + rating stars) | — |
| 2 | reddit.com | r/weddingplanning thread asking for a neon sign cost estimate (plus 2 more Reddit threads) | Forum | ~4 yrs |
| 3 | canvaschamp.com | https://www.canvaschamp.com/custom-neon-signs | Product (snippet lists add-on prices) | — |
| 4 | customneon.com | https://customneon.com/quick-quote/ | Quote landing page | — |
| 5 | boxwoodrose.com | https://www.boxwoodrose.com/our-blog/how-much-should-you-pay-for-a-neon-sign | Guide (event/neon rental company) | Dec 11, 2024 |
| 6 | yellowpop.com | https://www.yellowpop.com | Homepage | — |
| 7 | kingsofneon.com | https://www.kingsofneon.com/blogs/news/how-much-should-i-pay-for-a-neon-sign | Blog | May 1, 2023 |
| 8 | westernsignsaz.com | https://westernsignsaz.com/custom-neon-signs-costs-2025/ | Guide (local sign company) | Mar 25, 2025 |
| 9 | neonsignsnow.com | https://www.neonsignsnow.com/guides/how-much-do-neon-signs-lights-cost | Guide | — |
| (1st load #9) | voodooneon.com | https://voodooneon.com/blogs/voodoo/how-much-an-led-neon-sign-costs-and-why | Blog | Nov 29, 2023 |

- **AIO [O]:**
  - Opens with an overall range (AIO states $200–$1,500) and says the price depends mainly on LED flex vs glass.
  - Notes that promotional "starting" prices are much lower.
  - Includes a **4-row table by size/use**: small 12–24", medium 24–36", large 36–60", outdoor/commercial 60"+. The table's ranges do not match the headline range [O].
  - Lists cost drivers: design complexity, backboard, smart features, waterproofing.
  - Ends by asking for text or logo, size, and indoor or outdoor.
  - Cited: Boxwood Rose, Custom Neon (quick-quote), NeonsignLife, Voodoo Neon, NeonChamp, CanvasChamp.
- **PAA (expanded) [O]:** 15 questions, all listed in §6.
- **Other [O]:**
  - Shopping "Popular products" module (customneon $61, NeonSignsNow $70.72, NeonChamp $16.79, CanvasChamp $27.99, crazyneon $49).
  - Filter chips: Under $40, Outdoor, Wedding, Business & Retail Signs, Glass, Metal, Large.
  - A "Forums" tab.
  - Related searches: near me, for business, Amazon, Etsy, cheap, best company.
- **Intent / format [I]:** price-checking with transactional overlap. Google rewards pages that show a concrete starting price (product pages) and guides with **size-tier tables**.
- **Gap [I]:**
  - No page ties its price ranges to a method or data.
  - The top "guide" is written by a rental company.
  - No page separates business-logo pricing from wedding/name-sign pricing.

### Q2. how much do channel letters cost
| # | Domain | URL | Page type | Date |
|---|---|---|---|---|
| 1 | flexlume.com | https://www.flexlume.com/blog/how-much-does-a-channel-letter-sign-cost | Cost guide (installer) | pub. May 2025 |
| 2 | 42fab.com | https://www.42fab.com/signage/channel-letter-sign-deposit | Product (deposit) page | — |
| 3 | georgiasignbuilders.com | https://georgiasignbuilders.com/pricing/ | Pricing page | — |
| 4 | channelletter.com | https://www.channelletter.com/news/channel-letter-sign-cost/ | Cost guide (factory-direct, ship-only) | 2026 |
| 5 | signs101.com | https://www.signs101.com/threads/vertical-inch-channel-letter-pricing.180201/ | Trade forum | May 27, 2025 |
| 6 | signdealz.com | https://www.signdealz.com/blog/channel-letter-signs-cost-consideration | Blog | — |
| 7 | fastsigns.com | fastsigns.com › products › channel-letter | Service/product page | — |
| 8 | blinksigns.com ("Ohio Sign Company") | https://blinksigns.com/channel-letter-sign-cost/ | Cost guide (installer) | Jun 17, 2026 |
| 9 | signmonkey.com | https://signmonkey.com | Online designer + pricing (home) | — |

- **AIO [O]:**
  - Gives an **installed** range for a standard illuminated storefront set.
  - Describes the "inch rule" and per-letter pricing, citing Signs101.
  - **Table by illumination type** (non-lit / front-lit / halo / combination) with installed costs.
  - Drivers: letter count and height, raceway vs flush, custom logos, lift/crane, permits.
  - Ends by asking for letter count, lighting type and landlord raceway rules.
  - Cited: Ohio Sign Company (BlinkSigns), Signs101, Flexlume, Houston Sign Crafters, Signs By Tomorrow, Cosun Sign.
- **PAA (expanded) [O]:** per-inch cost, typical cost, installation, LED sign cost; also off-topic yard-sign and "LC sign" noise (see §6).
- **Related searches [O]:** per square foot, **price calculator**, near me, types, installation, outdoor business sign cost.
- **Intent / format [I]:** commercial investigation. Buyers want a number, but the SERP mixes three different products: installed projects, shipped letters, and trade per-inch pricing.
- **Gap [I]:** clarity on **what the price includes** (fabrication, shipping, install, electrical, permits). This matters most for a ship-only seller.

### Q3. led neon vs glass neon
| # | Domain | URL | Type | Date |
|---|---|---|---|---|
| 1 | customneon.com | https://customneon.com/neon-vs-led/ | Seller comparison page (17-row table) | — |
| 2 | patricknashdesign.com | https://www.patricknashdesign.com/blog/neon-vs-led | Glass-neon artisan blog | Mar 29, 2023 |
| 3 | reddit.com | r/unpopularopinion thread arguing glass neon looks better than LED's "dotted" light | Forum | ~6 yrs |
| 4 | help.yellowpop.com | help.yellowpop.com › knowledge › led-vs-traditio… | Help article | — |
| 5 | neonplus.co.uk | neonplus.co.uk › blog › neon-vs-led-neon-… | Blog (UK) | — |
| 6 | oasisneonsigns.com.au | oasisneonsigns.com.au › blogs › news › neon-vs… | Blog (AU) | Jan 30, 2026 |
| 7 | voodooneon.com | https://voodooneon.com/blogs/voodoo/neon-vs-led | Blog (+ video, FAQ) | Jul 10, 2024 |
| 8 | neon-flamingo.com | neon-flamingo.com › Blog | Blog | — |

- **AIO [O]:** compares material, cost (AIO states LED is ¼–⅓ of glass price), energy, safety/durability, aesthetics (glass: 360° warm glow and hum; LED: visible points up close), then asks about indoor/outdoor, budget and look. Cited: yellowpop, Custom Neon, YouTube, Patrick Nash Design.
- **Videos [O]:** Voodoo Neon, Zanvis Neon, Custom Neon Signs, "Make It or Break It" (Jan 2026).
- **PAA (expanded) [O]:** 9 questions, including health tangents on LED lighting.
- **Intent / format [I]:** comparison. **The AIO draws on both a seller (facts) and an artisan (aesthetics)**, so balanced first-hand perspective gets cited.

### Q4. front lit vs halo lit sign
| # | Domain | URL | Type | Date |
|---|---|---|---|---|
| 1 | signfreaks.com | https://signfreaks.com/blog/front-lit-vs-halo-lit-channel-letters/ | Sign-shop blog (Chicago) | pub. Oct 31, 2025 |
| 2 | hub.geminimade.com | https://hub.geminimade.com/knowledge/your-expert-guide-comparing-illuminated-styles-between-halo-lit-face-lit-combo-and-two-sided-lit-products | Manufacturer knowledge base | Jul 1, 2026 |
| 3 | channelletterdepot.com | https://channelletterdepot.com/benefits-of-front-and-halo-lit-channel-letter-signs-dual-lit/ | Wholesale blog | — |
| 4 | tuppsigns.com | https://tuppsigns.com/illuminated-signs-understanding-backlit-halo-lit-and-reverse-channel-letters/ | Blog | Apr 5, 2024 |
| 5 | esco-pacific.com | https://esco-pacific.com/blog/front-lit-vs-halo-lit-channel-letters/ | Sign-shop blog | Sep 10, 2026 |
| 6 | instagram.com | impact.corporate.signs post | Social | ~4 months |
| 7 | dcisigns.com | dcisigns.com › news › post › 4-types-of-channel… | Blog | Oct 11, 2018 |
| 8 | bannerbuzz.com | https://www.bannerbuzz.com/blog/front-lit-vs-halo-lit-led-channel-letters-what-is-the-difference/ | Retailer blog | Jul 30, 2026 |
| 9 | halolitsigns.com | https://www.halolitsigns.com | Product home | — |

- **AIO [O]:**
  - Explains how each style works, what it suits, and its tone, pros and cons.
  - **Quick comparison table:** illumination direction, visibility range (AIO states 250–300+ ft vs 100–150 ft), wall requirements, fabrication cost.
  - Warns that halo-lit performs poorly on dark or glossy walls.
  - Ends by asking indoor/outdoor, wall material and goal.
  - Cited: Channel Letter Depot, ESCO Pacific, Gemini, Cosun, Uni-Signs, Instagram, SignMonkey. **The #1 organic result, SignFreaks, was not cited.**
- **PAA [O]:** types of storefront signs; frontlit vs backlit difference; what halo-lit signage is; whether backlit is the same as halo-lit.
- **Intent / format [I]:** comparison. The format that wins citations is a **table plus wall-surface guidance**.

### Q5. halo lit vs backlit sign
| # | Domain | URL | Type | Date |
|---|---|---|---|---|
| 1 | tuppsigns.com | (as Q4) | Blog | Apr 5, 2024 |
| 2 | backlitledsign.com | backlitledsign.com › collections › halo-reverse-lit-… | Product collection | — |
| 3 | hub.geminimade.com | (as Q4) | Knowledge base | Jul 1, 2026 |
| 4 | titansofprint.com | titansofprint.com › questions › what-are-th… | Q&A page | — |
| 5 | signfreaks.com | (as Q4) | Blog | — |
| 6 | davessigns.com | https://www.davessigns.com/what-are-the-different-types-of-lighted-signs/ | Blog | Aug 21, 2025 |
| 7 | instagram.com | impact.corporate.signs | Social | — |
| 8 | woodlandmanufacturing.com | woodlandmanufacturing.com › halo-lit-lett… | Product | — |

- **AIO [O]:** states that halo-lit and backlit **are the same thing**, explains construction (opaque faces, LEDs aimed back, standoffs), and compares with front-lit in a table. Cited: Titans of Print, Impact Signs, DCI Signs.
- **Contradiction [O]:** Tupp Signs' snippet calls backlit letters the same as front-lit. The terminology really is inconsistent across the SERP.
- **Videos [O]:** Instagram, YouTube and Facebook from sign shops.
- **Related searches [O]:** price/cost variants, and a variant that adds channel letters.
- **[I]:** Treat this as a definition/FAQ inside the Q4 page, not as its own page.

### Q6. channel letters vs lightbox sign / Q6b. channel letters vs cabinet sign
**Q6 organic [O]:**
1. signarama.com › tx-Sunnyvale › our-work (franchise location page, Sep 2025)
2. alphagraphics.com › blog › 2026/07 (franchise blog, Jul 19, 2026)
3. facebook.com (Signarama Limerick post)
4. https://www.aoos.com/blogs/business-sign-guides/channel-letters-vs-light-box-signs (guide)
5. houstonsigncrafters.com › Blog (Jun 16, 2026)
6. reddit r/smallbusiness thread about putting up a channel-letter or lightbox sign (14 yrs old). Snippet warns about early LED failures, water and bird droppings.
7. https://www.davessigns.com/channel-letters-101-need-to-know/ (Jul 10, 2026)
8. channelletter.com › light-box-sign (product page, Jul 27, 2026)
9. https://ftsignage.com/what-is-the-difference-between-a-channel-letter-sign-and-a-box-sign/ (Jun 29, 2026)

**Q6b organic [O]:**
1. alphagraphics.com
2. LinkedIn (BlinkSigns article)
3. https://www.signsbytomorrow.com/rockhill/blog/what-are-the-differences-between-channel-letters-and-cabinet-signs (Aug 3, 2026)
4. reddit r/CommercialSignage (1 comment, promotional)
5. vitalsignandgraphics.com (Mar 20, 2026)
6. https://awninginnovations.com/blog/channel-letters-vs-cabinet-signs-a-sign-shop-guide-to-recommending-the-right-product/ (B2B)
7. image pack (LinkedIn, Tupp Signs)
8. houstonsigncrafters.com
9. classicsignsmo.com (Jul 2021)

- **AIO [O]:**
  - Covers structure, look, cost, use cases and landlord/municipal criteria. The AIO says channel letters are often *required*, and that cabinet signs are sometimes banned.
  - Q6's AIO quotes cost ranges (AIO states per-letter $75–$150; wall lightbox $300–$1,500, cited to Neon Designs).
  - Ends by asking indoor/outdoor, budget and landlord rules.
- **PAA [O]:** definitional (what channel letters and lightboxes are, whether they are illuminated, letter types, average cost, the four types of signs).
- **[I]:** comparison intent from real buyers. Glownique sells both, but its **slim LED lightbox is not the same product as an outdoor cabinet sign**. The page must state that scope explicitly.

### Q7. acrylic sign vs metal sign
**Organic [O]:**
1. https://www.signsbytomorrow.com/rockhill/blog/acrylic-signs-vs-metal-signs-pros-cons-and-pricing (Apr 2, 2026)
2. https://www.pirossigns.com/custom-metal-signs-vs-acrylic-which-one-is-right-for-you (May 2025)
3. https://www.precisionrepro.net/post/acrylic-vs-metal-signs-which-sign-is-right-for-you (Jul 2025)
4. https://www.displaysandholders.com/acrylic-vs-metal-wood-signs-why-businesses-prefer-acrylic (supplier, May 2025)
5. skylinelaserco.com (acrylic vs faux metal, Feb 2026)
6. printingservices.vanderbilt.edu (university print services materials page)
7. msksigncompany.com (Aug 2025)
8. https://www.fastsigns.com/blog/materials-used/acrylic-signs/acrylic-signs-vs-metal-signs-which-should-you-ch/
9. YouTube (Woodland Manufacturing: acrylic letters vs vinyl)

- **AIO [O]:** appearance, best use (acrylic indoors/lobby; metal outdoors), cost (acrylic lower), durability (acrylic scratches and can yellow without UV treatment), installation.
- **PAA [O]:** acrylic vs metal prints, best outdoor sign material, how long acrylic signs last, why acrylic signs are expensive.
- **[I]:** the SERP is about flat materials for lobby and exterior signs, not about illumination. The PAA also brings in "prints", which is wall-art intent.

### Q8a. are led neon signs waterproof / Q8b. can led neon signs be used outdoors
**Q8a organic [O]:**
1. https://www.neonsigns.com/us/custom-outdoor-neon-signs (product)
2. https://customneon.com/outdoor-lighted-signs/ (product + FAQ + spec sheets)
3. Amazon search (marketplace)
4. neonplus.co.uk blog
5. **Discussions & forums module:** Reddit r/led, Quora (30+ answers)
6. https://www.radikalneonsigns.com/waterproof-led-signs/ (landing)
7. neonattack.com (Apr 23, 2025)
8. Etsy listing for a custom outdoor IP67 neon (marketplace, $77.02 shown)

Videos: Spectron LED ×2, iDecoMart, Neon Expert (DIY waterproofing). Sponsored results appeared inside the AIO area (helloneonsign, getcustomneonsigns).

**Q8b organic [O]:**
1. neonsigns.com outdoor (product)
2. https://support.customneon.com/hc/en-us/articles/14468464630555-Can-I-use-my-Custom-Neon-sign-outdoors (help article, Oct 28, 2025)
3. Reddit r/led thread about using an Amazon neon outside, plus 2 r/NeonSigns threads (Oct and Dec 2024)
4. https://www.radikalneonsigns.com/faq/can-neon-signs-go-outside/
5. neonplus.co.uk
6. crazyneon.com outdoor product ($88)
7. Instagram (echoneonstudio)
8. https://www.neonsignsnow.com/guides/can-neon-signs-led-lights-be-used-outdoors-outside (Mar 11, 2024)

Videos: Spectron ×2, NEONPARTY.

- **AIO [O]:**
  - Q8a: only outdoor-rated signs are waterproof (AIO states indoor signs are often IP44 or unrated; outdoor typically IP67). The **power supply, dimmer and remote are often not waterproof**. Waterproof does not mean submersible. Cited: Custom Neon, Radikal, Neon Attack, Reddit.
  - Q8b: yes, if the sign is rated for it. Indoor signs are OK only briefly in fair weather. Protect the power supply. Mount under cover. **Choose the outdoor build when ordering, because indoor signs cannot be retrofitted.** Cited: Crazy Neon, Custom Neon, Radikal, Instagram.
- **PAA [O]:** lifespan; whether neon signs can stay outside; LED vs neon; burnout; best weatherproof sign material.
- **[I]:** a pre-purchase deal-breaker question. Google ranks brand product pages first, but the AIO takes its facts from the pages that explain IP ratings and component caveats.

### Q9. how long do led neon signs last
**Organic [O]:**
1. https://www.radikalneonsigns.com/faq/how-long-do-neon-signs-last/
2. Reddit r/NeonSigns thread on how long neon tubes last (+2 threads)
3. https://orantneon.com/blogs/news/how-long-does-neon-sign-last (Nov 2022)
4. https://www.kingsofneon.com/blogs/in-depth-guides/how-long-do-neon-signs-last (Sep 2024)
5. https://www.sygns.com/blogs/magazine/how-long-does-neon-last (Nov 2022)
6. https://support.customneon.com/hc/en-us/articles/14468645574683-Everything-You-Need-to-Know-LED-Neon-vs-Glass-Neon (Oct 2025)
7. https://underneon.eu/how-long-do-led-neon-signs-last-and-what-affects-their-lifespan/
8. smithersofstamford.com (Mar 2025)
9. neonchics.com (Apr 2025)

- **AIO [O]:**
  - AIO states 30k–50k hours, about 10–15 years at 8–10 hours a day, or about 3–5 years if run 24/7.
  - LED neon fades gradually rather than burning out.
  - The power adapter may fail first.
  - Embeds a Radikal Neon YouTube video.
- **Spread of claims [O]:** competitors variously state 40k, 50k and ~100k hours, all unsourced.
- **PAA [O]:** burnout, LED vs neon, cost, whether a sign can be left on all the time.

### Q10. how much electricity does an led neon sign use
**Organic [O]:**
1. neonsign.com (blog)
2. neonsignsnow.com guide (Jul 19, 2026)
3. Reddit r/Electricity (+2 threads on current draw and a 135W power supply)
4. sygns.com (Nov 2022)
5. orantneon.com (table snippet)
6. blinksigns.com LED vs neon (Aug 2025)
7. helioneon.com (May 8, 2026; cites a 2026 US residential rate, competitor states ~17¢/kWh)
8. oasisneonsigns.com (May 2025)
9. crazyneon.com (compares to appliances)

- **AIO [O]:** gives a watts range and a per-foot rate, computes a worked monthly cost, and **offers to calculate the user's own bill**.
- **Contradiction [O]:** glass neon per-foot wattage ranges from ~3.5–4 W/ft (NeonSignsNow) to 60–100 W/ft (BlinkSigns and the AIO). That is an order-of-magnitude disagreement.
- **Related searches [O]:** per month/year/hour, **LED vs neon power consumption calculator**, whether neon signs get hot.

### Q11. what size neon sign do i need
**Organic [O]:**
1. https://www.neonchamp.com/blog/how-big-should-a-neon-sign-be-for-a-wedding-backdrop-or-stage (Jan 12, 2026)
2. https://zanvis.com/blogs/news/how-big-size-should-a-neon-sign-be-for-your-wedding
3. https://www.neonsignsnow.com/guides/neon-sign-light-size-chart
4. Facebook (Buffalo Brides group + 2 more Facebook threads)
5. eyecandyconfetti.com
6. https://oasisneonsigns.com/blogs/news/neon-sign-size-chart (Jan 2025)
7. Amazon product
8. https://www.cvlinens.com/blogs/styling-tips/what-size-neon-sign-for-wedding (Jul 2024)

Videos: Voodoo Neon (how to size for your wall), Lemon8, Geek Garage.

- **AIO [O]:**
  - Sizes by location: home, wedding backdrop, stage, accent.
  - Rules of thumb:
    - About one-third of the empty wall (cited to Radikal).
    - Readability of about 10 ft per inch of letter height (cited to cityneon.us).
    - A paper/cardboard mock-up test.
  - Offers an exact recommendation if told the location, text and wall size.
- **PAA [O]:** Google broadens to **generic sign sizing** (18x24 and 16x20 welcome signs, standard sign size, yard signs).
- **[I]:** business and storefront sizing is under-served, and the question overlaps with general sign-size and viewing-distance intent.

### Q12. how to hang a neon sign
- **Top of page [O]:** AIO with 3 methods (standoff screws, adhesive hooks, ceiling wire; embeds a Kings of Neon video), then a video carousel (Radikal, Kings of Neon, Custom Neon).
- **Organic [O]:**
  1. Reddit r/mancave thread where an electrical-box location complicates hanging
  2. https://support.customneon.com/hc/en-us/articles/14468364084379-How-do-I-hang-or-wall-mount-my-Custom-Neon-sign (Oct 2025)
  3. image pack
  4. greasemonkeyusa.com (large signs)
  5. https://www.yellowpop.com/blogs/news/how-to-hang-a-neon-sign-on-a-wall-without-nails (Jun 3, 2026)
  6. Facebook (Custom Neon video)
  7. https://neondesigns.shop/blogs/neon-guides/neon-sign-installation-guide
  8. https://neongrand.com/blogs/neon-sign-101/neongrand-led-neon-sign-user-manual
- **PAA [O]:** hanging on a wall, what to use, heavy signs, attaching to a wall.
- **[I]:** post-purchase how-to that a brand's own hardware answers best, in video format.

### Q13. how are channel letters installed
- **Top of page [O]:** AIO with a 6-step process (pattern, drilling, power holes, mounting, low-voltage wiring, sealing) and 3 mounting methods; embeds a Sign Monkey video.
- **Organic [O]:**
  1. YouTube Fastsigns Kirkland (15:43)
  2. https://www.flexlume.com/blog/whats-involved-in-channel-letter-sign-installation
  3. https://www.sunrisesigns.com/our-blog/how-to-install-channel-letters (Aug 2025)
  4. Signs101 installation-instructions thread (2018)
  5. YouTube Lucaso Signs
  6. https://www.fastsigns.com/independence-charlotte-nc/about-us/news-press/2026/march/channel-letter-mounting-methods-explained-choosi/ (Mar 31, 2026)
  7. latitudesignage.com
  8. Facebook (Latitude)
  9. signmonkey.com raceway video (2019)
- **PAA [O]:** per-inch cost, sign cost, channel vs reverse channel letters, how to build channel letters.
- **[I]:** the cost and install intents overlap. Video dominates.

### Q14. what is a dual lit sign
**Organic [O]:**
1. channelletterdepot.com
2. https://en.cosunsign.com/news/benefits-of-front-and-halo-lit-channel-letter-signs-dual-lit/
3. https://giantsign.com/tag/dual-lit-channel-letters-sign/ (tag archive)
4. https://www.classicclw.com/dual-lit
5. luxsignage.co product
6. titansofprint.com
7. https://www.directsignwholesale.com/products/front-halo-lit-channel-letters/
8. https://lindosign.com/works/front-and-back-lit-channel-letters-dual-illumination-sign/ (Apr 2026)
9. geminimade

- **AIO [O]:** gives the definition and synonyms (front-and-back lit, combination-lit), how it works (translucent face + open or clear back), color-contrast halos, and benefits. Cited: Giant Sign, Lux Signage, ChannelLetter.com.
- **Entity noise [O]:** WebSearch and Google Shopping both return **"Dual-Lite" exit signs**, a brand.
- **PAA [O]:** generic (types of lit signage, illuminated sign cost, making your own, double-sided signs).

### Q15. best sign for storefront / Q15b. best storefront sign type
**Q15 organic [O]:**
1. Amazon
2. businesssignsandmore.com collection
3. https://www.davessigns.com/storefront-signs-the-ultimate-guide/ (Jul 10, 2026)
4. Pinterest board
5. fastsigns.com retail signage
6. lamomoneon.com storefront sign ideas (May 2025)
7. fitsmallbusiness.com (Mar 2022)
8. signmonkey.com storefront templates
9. georgeandwilly.com signage collection

Ad: architecturalsigns.com.

**Q15b organic [O]:**
1. Dave's Signs
2. yodeck.com (digital signage, Jul 2026)
3. https://www.shopify.com/blog/retail-signage (Jul 22, 2026)
4. aboutsigns.ca (2019)
5. https://humblesignco.com/types-of-storefront-signs/
6. Fit Small Business
7. https://www.safetydecals.com/blogs/news/store-signs
8. spectrumsigns.com.au (4 days old)
9. signdealz.com

Ads: 6, including wholesale channel-letter makers.

- **AIO [O]:** names illuminated channel letters the best primary storefront sign. Also covers blade signs, awnings, LED neon, window graphics, lightbox/cabinet and dimensional letters. Adds local compliance and landlord rules, and asks about business type, foot vs car traffic, and budget/landlord.
- **PAA [O]:** storefront sign cost; which color gets most attention; what storefront signs are called; trends; most durable material.
- **[I]:** broad and top-of-funnel. Established national brands and publishers (Shopify) are present.

### Q16. neon sign for business worth it
- **Top of page [O]:** AIO with pros and cons (brand recall, social-media photos, energy, safety; upfront cost; "not a magic fix") and best-fit industries. Then a video carousel (including "Don't Buy a NEON Sign Until You Watch This!", Jan 2026).
- **Organic [O]:**
  1. Amazon
  2. Reddit r/smallbusiness thread (5 yrs), a tiny-business worth-it thread (Apr 2026), and an **LED neon company owner AMA (Jul 25, 2026)**
  3. **Discussions & forums module:** r/SeattleNeonSigns (a coffee-cart owner), Quora ×2 on business cost and advantages
  4. bannerbuzz.com (Sep 2025)
  5. https://customneon.com/business-signs-logo/ (product, $200)
  6. bestbuyneonsigns.com (Aug 11, 2026)
  7. https://www.neonchamp.com/neon-signs-for-business
  8. davessigns.com (Sep 2025)
  9. Large shopping modules
- **PAA [O]:** whether a neon sign business is profitable (**seller-side intent noise**); whether neon signs are worth money; how much a neon sign should cost; disadvantages.

### Q17. how to make a neon sign (draft page assessment)
- **Top of page [O]:**
  - AIO presents two paths: (1) a **DIY LED neon** method (draw the design, cut acrylic, glue LED flex, solder to a 12/24V supply, mount), cited mostly to YouTube DIY channels; (2) **order a custom design online**, naming Custom Neon's sign maker and Yellowpop's editor.
  - Video carousel (Khaist Neon Arts 16:45 and 33:09, Geek Garage) and a **10-item short-video carousel**.
- **Organic [O]:**
  1. https://www.kingsofneon.com/blogs/in-depth-guides/how-to-make-neon-signs (seller guide, Sep 2024)
  2. https://customneon.com/create-neon-sign/ (interactive online design tool, $61)
  3. Reddit r/NeonSigns thread where the top answer cites about 2 years of apprenticeship to bend glass
  4. Instagram DIY (plywood and zip ties)
  5. Instructables
  6. https://kaylafaith.com/how-to-make-a-neon-sign-wedding/ (DIY blog)
  7. https://www.thesorrygirls.com/home-decor/diy-neon-sign (DIY blog)
- **PAA [O]:** making neon signs at home, equipment needed, whether neon glows without electricity, creating a neon sign online for free.
- **Related searches [O]:** free online neon sign maker, neon light making equipment, **AI neon sign generator**, laser cutter.
- **Adjacent query "how are led neon signs made" (WebSearch cross-check only) [O]:** seller pages dominate: Kings of Neon, NeonSignsNow ×2, Voodoo Neon, Fineyst, NeonNiche, Echo Neon (a shop that makes both glass and LED), CreateNeon.
- **Assessment [I]:**
  - **The intent is mainly DIY**: video-first tutorials for hobbyists, plus a secondary "design my own online" reading.
  - **Sellers can rank.** Kings of Neon ranks #1 with a long guide. Custom Neon ranks #2 with an **interactive builder**, which matches the "make/design my own" reading.
  - **Glownique has no online builder**, and a DIY tutorial would attract people trying to avoid buying.
  - Realistic outcome: at best a page-1 guide competing with video, and low conversion.
  - Better angle: **"how are LED neon signs made" / "how we make your custom neon sign"** (process/how-it's-made intent, where seller pages dominate), with a short "DIY vs ordering custom" section.

### Q18. uv printing on acrylic signs
- **Top of page [O]:** 3 ads (TROY UV printers, Clearview Plastics, 4OVER4), then #1 displays2go.com UV-printed acrylic signs (product).
- **AIO [O]:** explains UV-cured ink, **second-surface (reverse) printing**, the white-ink underlayer on clear acrylic, durability (AIO states 3–5 years indoors / 2–3 outdoors, cited to eufyMake/Acme Plastics), 3D texture effects, thickness and standoffs.
- **Videos [O]:** xTool/eufyMake/Epson UV-printer tutorials for **printer owners**.
- **Organic [O]:**
  - custommadebetter.com (product)
  - YouTube (Epson tutorial)
  - https://www.logojet.com/pages/printing-on-acrylic (printer manufacturer)
  - https://www.eufymake.com/blogs/printing-guides/print-on-acrylic (printer brand, Mar 2026)
  - hcbrands.com (product)
  - Etsy listing
  - subli-star.com (printer blog)
  - A large shopping module ($13.39–$300)
- **PAA [O]:** whether a UV printer can print on acrylic, downsides of UV printing, whether UV goes through acrylic, how permanent UV printing is.
- **[I]:** the SERP is split between people buying signs and people who own or are buying UV printers.

### Q19. lightbox sign vs neon sign
**Organic [O]:**
1. briteideadisplays.com (LED panel vs lightbox, Jul 2025)
2. crazyneon.com (neon vs ultra-thin lightbox blog)
3. customneon.com/neon-vs-led (**mismatch**)
4. signandglow.com (LED vs neon, Jun 2026)
5. davessigns.com (lightbox styles, Jul 2026)
6. Facebook Q&A
7. Quora (how to tell neon from LED)
8. oasisneonsigns.com.au
9. bannerbuzz.com (neon vs LED)

- **AIO [O]:** compares visibility/readability, look (lightbox corporate vs neon mood), design complexity (lightbox handles detailed multi-color logos; neon is limited by bending) and energy/durability. Cited: Ortwein Sign, Crazy Neon, BannerBuzz, George and Willy, Brite Idea Displays.
- **PAA [O]:** lightbox cost; why neon isn't used anymore; how to tell LED from neon; what has replaced neon.
- **[I]:** **weak SERP**. Only one or two results actually compare a lightbox with neon. Glownique sells both.

### Q20a. neon sign font ideas / Q20b. best font for neon sign
**Q20a organic [O]:**
1. https://www.yellowpop.com/blogs/news/the-best-fonts-for-neon-signs-and-why-they-work-so-well (Mar 19, 2026)
2. https://customneon.com/most-popular-neon-fonts/
3. https://neongrand.com/blogs/helpful-tips/10best-neon-sign-fonts-for-your-custom-design
4. image pack
5. fonts.adobe.com (HT Neon)
6. fontspace.com
7. https://www.1001fonts.com/neon-fonts
8. https://www.myfonts.com/pages/tags/neon-fonts
9. https://voodooneon.com/blogs/voodoo/the-top-13-led-neon-sign-fonts (Jun 2024)

**Q20b organic [O]:**
1. customneon.com (most-popular fonts)
2. Reddit r/weddingplanning font thread (+2)
3. 1001fonts
4. PAA and image pack
5. voodooneon
6. Adobe Fonts
7. MyFonts
8. https://www.neonsignsnow.com/guides/best-font-for-neon-sign-digital-artwork
9. YouTube (Voodoo Neon top 20 fonts)

- **AIO [O]:** style families (monoline script, bold sans, double-line retro, rounded sans) and practical tips (avoid thin strokes, watch spacing). Q20b's AIO cites **Custom Neon only**, including its claim that script fonts account for most orders.
- **PAA [O]:** good fonts for neon signs, making a font look like neon, free neon fonts, **Canva**, best font for a sign in general.
- **[I]:** two intents: (a) buyers designing a sign, served by seller listicles with named fonts; (b) graphic designers wanting a neon-effect font, served by marketplaces and Canva questions.

---

## 4. Deep dives: top organic pages for Q1, Q2, Q3, Q4, Q8, Q11

All figures are **competitor states**, recorded for context only. "Sources cited" means outbound links to primary or authoritative sources: **none of the 20 audited pages had any [O].** H2 outlines are condensed; boilerplate is omitted.

### Q1: custom neon sign cost
**#1 neonsigns.com/us/ [O]**
- **Type:** product/category homepage with educational blocks. ~2.5k words.
- **H1:** "NEON SIGNS".
- **H2s:** shop by category; latest neon technology; customer inspiration; ready-to-customize; color panel; additional options (engraved, UV-printed, 2-sided, animated, infinity mirror); about custom neon; 3 color types; quality details; easy installation; FAQ & support; unboxing.
- **Figures:** competitor states a starting price of $42.58 for simple text under 24". No price-by-size table.
- **Trust:** 4.9/5 from 2,095 reviews (Shopper Approved); competitor lists FCC/UL/CE/RoHS and similar certifications; 2-year warranty; 2-business-day rush.
- **Schema:** Product, Offer, AggregateRating, Review (reviews dated Sep 21–22, 2026), LocalBusiness, MerchantReturnPolicy, OfferShippingDetails.
- **Author/date:** none.
- **Why it ranks / is citable [I]:** exact price in the snippet, rating stars and brand strength. **It was not cited in the AIO.**

**#2 Reddit r/weddingplanning thread [O]:** not accessible (Reddit blocks our tools). See §5 for the snippet.

**Next organic results also audited:**
- **customneon.com/quick-quote/ (#4, cited in AIO) [O]**
  - **H1:** Custom Neon Price Quote / Free Design Service.
  - **H2s:** get a free quote; tell us about your sign; price range; your details; reviews; FAQ about ordering (12 questions, including logo sign cost, indoor vs outdoor, what size to request, multiple locations).
  - **Figures:** competitor states signs start at $61 for a simple two-letter design.
  - **Process:** free mockup and price, typically within 24h; unlimited revisions; rush 2–3 weeks (US/Canada).
  - **Trust:** 4.9 Google rating, 2-year warranty, ISA member badge.
  - **Schema:** WebPage + SpeakableSpecification. No author or date.
  - **[I]:** the **closest analogue to Glownique's mockup → quote model**. Its FAQ is the part the AIO uses.
- **boxwoodrose.com (#5, AIO's lead citation) [O]**
  - **Title:** "(2026 Guide)". **H1:** How much should you pay for a neon sign?
  - **H2s:** what determines cost (size, complexity, LED vs glass, installation, extras); why invest; LED vs glass cost comparison; FAQ (5); tips; conclusion.
  - **Figures (competitor states):**

    | Item | Stated range |
    |---|---|
    | ~18×24" | $200–$500 |
    | ~3×5' | $600–$1,300 |
    | XL | $2,000+ |
    | Simple text | from ~$80 |
    | Complex artwork | $1,000+ |
    | LED | $50–$1,000 |
    | Glass | $300–$2,000 |
    | Rentals | $50–$300 |
    | Add-ons | $50–$200 |
    | Overall | $200–$1,500 |

  - **Table:** 1 (LED vs glass: price, energy, durability, customization, maintenance).
  - **Sources:** none.
  - **Author:** Drew Miles (no bio). Published 2024-12-11, modified 2026-07-16.
  - **Schema:** Article + LocalBusiness/ProfessionalService.
  - **Business:** event photo-booth/neon rental.
  - **[I]:** cited because it has an explicit range sentence in the FAQ, size tiers and a table, despite no data or method.
- **neonsignsnow.com guide (#9) [O]:** long H1; Key Takeaways; cost by materials/labor; average cost; by location; factors; LED vs glass; business investment; FAQ. Competitor states custom text signs from ~$80 and $100–$500. Schema is BreadcrumbList only. No author or date in the schema.

### Q2: channel letter cost
**#1 flexlume.com [O]**
- **H1:** How much does a channel letter sign cost?
- **H2s (all questions):** size; logos; materials; lighting; mounting; installation cost drivers; timeline; average cost; FAQ.
- **Figures (competitor states):** $2,000–$20,000+ overall; $4,000–$6,000 as the "industry standard" for basic signs; $2,000–$4,000 for the cheapest type.
- **Tables:** none. **Sources:** none.
- **Author:** Jim Boudreau (no credentials). Published 2025-05-12, modified 2025-08-06.
- **Schema:** BlogPosting + FAQPage + Person.
- **Why citable [I]:** the answer is in the first paragraph and the meta description, headings are phrased as questions, and FAQ schema is present.

**#2 42fab.com deposit page [O]**
- **Type:** product/deposit page. ~336 words; duplicated H1s.
- **Figures (competitor states):** $500 deposit; $75–$150 per letter with a 6-letter minimum; lighting add-ons of ~$20 per letter (single color) and ~$35 (color-changing); letters 1.5" deep.
- **Schema:** Product/Offer.
- **[I]:** ranks because it gives exact per-letter prices in the snippet and has price schema. It also appears in shopping.

**Also audited:**
- **channelletter.com (#4) [O]**
  - **H1:** How much do channel letter signs cost?
  - **H2s:** Quick Price Reference; what channel letters are; the 5 types; what drives cost; the biggest factor is who you order from; what to look for; what comes with your sign; timeline; FAQ (9).
  - **Table (competitor states, ship-only):**

    | Type | Stated range |
    |---|---|
    | Face-lit | $800–$2,500 |
    | Halo | $1,000–$3,000 |
    | Front & back lit | $1,200–$3,500 |
    | RGB | $1,500–$4,000 |
    | Non-lit metal | $500–$1,800 |

  - **Other claims:** factory-direct saves 30–50%. Electrician connection and permits are the buyer's responsibility. FAQ gives a readability rule (1" per 10 ft) and a 10+ year life.
  - **Author/date:** no byline (the schema author field is empty). Published 2026-06-28, modified 2026-08-06.
  - **[I]:** **the most similar business model to Glownique**. It puts a price table first and an FAQ that addresses objections.
- **blinksigns.com (#8, AIO's lead citation as "Ohio Sign Company") [O]**
  - **H1:** Channel letter sign cost … (2026 Guide).
  - **H2s:** the cost question; definition; cost by type (table); 9 price factors (height, count/logo, illumination, raceway vs flush, materials, electrical access, install height/equipment, permit/landlord, multi-location); front vs halo cost; raceway vs flush; what a quote should include; hidden costs; single vs multi-location; **quote-readiness checklist**; FAQ (12).
  - **Table (competitor states, framed as installed planning estimates):**

    | Type | Stated range |
    |---|---|
    | Non-lit | $2k–$8k+ |
    | Front-lit | $3k–$15k+ |
    | Halo | $4k–$20k+ |
    | Raceway-mounted | $3.5k–$18k+ |
    | Custom logo systems | $5k–$25k+ |

  - **Author:** Asfand Yar Junejo (no credentials), 2026-06-17.
  - **Schema:** BlogPosting + FAQPage + GeneralContractor.
  - **[I]:** cited because it labels ranges as planning estimates, is structured and fresh, and includes a checklist.

### Q3: LED neon vs glass neon
**#1 customneon.com/neon-vs-led/ [O]**
- **H1:** Glass neon vs LED neon signs.
- **H2s:** which is best; what's the difference; which suits business signage; indoor wall art; portability; LED flex vs glass.
- **Table:** 17 rows with a "Winner" column. Competitor states: LED 12V DC vs glass 3–18 kV; ~100,000 h vs ~10,000 h; brightness 24–26 lm/ft (LED) vs 60 lm/ft (glass); 18+ LED colors; glass hum and remote-control interference; LED photographs better; glass restricted by some regulations.
- **Sources, author, date:** none. **Schema:** WebPage + Speakable.
- **[I]:** cited for its exhaustive attribute table with numbers, and for customneon.com's authority across neon SERPs.

**#2 patricknashdesign.com [O]**
- **H1:** Glass neon vs LED neon: what's the difference?
- **H2s:** material aesthetic; color; cost; fragility; versatility; overview.
- **Figures:** none. **Sources:** none. **Author:** "James". Published 2023-03-29. **Schema:** Article.
- **Content:** glass-artisan perspective. Glass is 360°, sculptural and self-supporting; LED is 180° and needs a backing; LED is cheaper; glass is fragile.
- **[I]:** cited by the AIO for aesthetics because it is a **first-hand craftsperson view**, which AI answers use to balance seller claims.

**Also audited: voodooneon.com [O]:** H1 "…Ultimate Showdown"; infographic; key differences; which wins; FAQ (11). Author Chris Diprose; published 2024-07-09/10. Schema: Article + Person.

### Q4: front-lit vs halo-lit
**#1 signfreaks.com [O]**
- **H1:** **none in the raw HTML**; the title tag carries the phrase.
- **H2s:** introduction; channel-letter basics; what front-lit is; what halo-lit is; direct comparison; choosing (brand personality, lighting environment, budget); maintenance/lifespan/ROI; **real Chicago projects** (a bookstore, the Chicago Bulls, Jollibee); conclusion.
- **Figures (competitor states):** 7–10 years before major component replacement; front-lit is generally cheaper (qualitative).
- **Tables:** none rendered. **Sources:** none.
- **Author:** username only. Published 2025-10-31, modified 2025-12-02. Footer claims 25+ years. **Schema:** Article.
- **[I]:** ranks on exact match, depth (~2.7k words) and named real projects. **The AIO did not cite it.**

**#2 hub.geminimade.com [O]**
- **H1:** expert guide comparing halo, face, combo and two-sided lit products.
- **H3s:** face lit; two-sided lit blade signs; side lit; combining lighting; tips. 6 tables (layout/descriptive, with images).
- **Key claims:** face-lit reads over long distances but can be too intense at eye level; halo-lit suits narrow strokes and detail.
- **Date:** Jul 1, 2026. No author, no JSON-LD. **Publisher:** B2B manufacturer selling to sign shops.
- **[I]:** cited because of its manufacturer authority and specific application caveats.

**Also audited: esco-pacific.com (#5, AIO lead citation) [O]**
- **H1:** which looks better at night.
- **H2s:** front-lit visibility; halo-lit premium; side-by-side; combination lighting; which to choose; FAQ.
- **Figures:** no numbers; competitor states base costs are comparable and combination costs more.
- **Author/date:** organization byline; published 2026-09-10/11. **Schema:** Article + FAQPage + SignShop.
- **[I]:** fresh, answer-first and concise, which is the format the AIO prefers.

### Q8: waterproof / outdoor LED neon
**#1 neonsigns.com/us/custom-outdoor-neon-signs (#1 for both 8a and 8b) [O]**
- **H1:** Outdoor Neon Signs.
- **H2s:** templates; custom outdoor; why choose us; categories; outdoor signs we made; FAQ (3 generic questions); customize. ~783 words.
- **Figures:** no pricing or specs. IP67, anti-corrosion and UV protection are claimed in the meta description, but **the body never explains IP ratings or which components are rated.**
- **Schema:** Product/AggregateRating.
- **[I]:** ranks on brand and product relevance, not on how well it answers the question. **The AIO did not cite it.**

**#2 customneon.com/outdoor-lighted-signs/ (8a) [O]**
- **H1:** Custom Outdoor Neon Signs.
- **Structure:** quote builder sections; FAQ & specifications block with **downloadable indoor/outdoor spec sheets**; questions covering outdoor use, indoor vs outdoor, weather resistance, and glass vs acrylic for outdoors.
- **Claims (competitor states):**
  - IP67 means dust-tight and immersion to 1 m for 30 min, not for underwater use.
  - The dimmer/remote is not weatherproof.
  - No components should be submerged.
  - 2-year warranty.
- **Not seen:** no UL/ETL claims on the page. ~2.8k words. **Schema:** WebPage + Speakable.
- **[I]:** cited because it defines the standard precisely and states component caveats.

**#2 support.customneon.com (8b) [O]:**
- **H1:** can I use my sign outdoors? ~486 words. Updated 2025-10-28.
- **Content:** indoor signs are not waterproof; outdoor versions are IP67; defines an IP rating; indoor signs are OK briefly outdoors in fair weather if kept dry; avoid extreme heat or cold; links the spec sheets.
- **[I]:** the AIO paraphrases it almost clause by clause. **A short, conditional, answer-first help article wins here.**

### Q11: what size neon sign do I need
**#1 neonchamp.com wedding guide [O]**
- **H1:** how big a neon sign should be for a wedding backdrop or stage.
- **H2s:** Quick Answer; why size matters; size by backdrop type (5); choosing for photos (camera distance, short text, match width); by phrase type; by guest count/venue; placement height; style; tips; common mistakes; checklist; FAQ (7); About the Author.
- **Figures (competitor states):** backdrop 30–40" wide; stage 40–60"; ballroom 60–72"; welcome 18–24"; most popular 36"; covers 50–70% of backdrop width; guest-count tiers.
- **Tables:** none (bullets + checklist). **Sources:** none.
- **Author:** the brand. Published 2026-01-12. **Schema:** Article + Speakable.
- **[I]:** cited in the AIO for its Quick Answer block of inch ranges. **No business or home coverage.**

**#2 zanvis.com wedding page [O]**
- **H1:** What size neon sign for a wedding?
- **H2s:** how big; tips (indoor/outdoor wedding). ~1.2k words.
- **Table:** 1, converting cm/inch/ft for 6 standard sizes (19.7"–59"). **The feet column uses an ambiguous notation** (e.g., 36" is shown as "2.11 ft").
- **Real customer examples:** named couples' signs at 35", 40" and 36", with photos.
- **Figures:** competitor states couples usually pick 36/42/48".
- **Schema, author, date:** none.
- **[I]:** ranks on an exact-question H1 and first-hand customer photos with sizes.

**Also audited: neonsignsnow.com size chart (#3) [O]:** H1 (size chart + how to measure); Key Takeaways; sizes by use (competitor states 12×12 / 24×24 / 36×36); weddings; rooms; standard wall size; how to measure; FAQ. Author Sani Dhuka, published 2026-06-14. Article schema. No real data table.

### Cross-page patterns [O → I]
| Pattern | Observed on | Implication for Glownique [I] |
|---|---|---|
| Answer in the first 1–2 sentences / meta description with a number | Flexlume, ChannelLetter.com, BlinkSigns, ESCO, NeonChamp "Quick Answer" | Open every guide with a 40–60 word direct answer containing Glownique's own figure or rule. |
| Comparison/price table near the top | ChannelLetter.com, BlinkSigns, Custom Neon (17 rows), Boxwood Rose | Use real HTML tables. The AIO rebuilds tables from these. |
| FAQPage schema + question-style H2s | Flexlume, BlinkSigns, ESCO | Keep visible FAQ matched to its schema. |
| "2026" in title + recent dateModified | ChannelLetter.com, BlinkSigns, Boxwood Rose, ESCO, Custom Neon fonts | Show a dated "last reviewed" line with real changes; don't just bump the year. |
| No primary sources, method or credentials | All 20 pages | **Differentiate with sourced standards** (IP code, electrical sign code, electricity rates) and a named fabrication expert. Verify every standard before citing it. |
| First-hand evidence (named projects, customer photos with sizes) | SignFreaks, Zanvis, Patrick Nash | Use Glownique's own project photos with dimensions, lighting type and day/night shots. |

---

## 5. Forum & buyer-objection research

### Threads read in full [O]
| Source | Thread (paraphrased) | Date | What it shows |
|---|---|---|---|
| WeddingWire | Cheapest place to have a custom neon sign made | Feb 2019, 4 replies | One user reports a ~$500 Etsy option. Another says neon repair is costly. Reuse at home is valued. |
| WeddingWire | Neon signs (custom last-name sign) | Mar 2021, activity to Sep 2026 | Neon exceeds wedding budgets. Users report $500+ at one vendor, a ~$100 laser-cut alternative on Etsy, and ~$250 for a basic "open" sign. DIY considered. |
| WeddingWire | Help choosing a custom neon design | Dec 2024–Apr 2025, 6 replies | Wording choice (names vs "Est."), font/color mixing, Etsy star sellers. LED is recommended for safety. |
| Signs101 (trade) | Vertical-inch channel-letter pricing | May–Aug 2025 | Members state ~$15–$29 per vertical inch depending on style (excluding install). Complexity and labor drive price. |
| Signs101 (trade) | Why the channel-letter business is hard | Jan 2022 | State electrical-sign licensing (FL), permits and engineering, installer reliability, and **online factory-direct competition**. The middleman gets blamed when something fails. |
| Signs101 (trade) | Install-only pricing for letters shipped in by others | Dec 2010–Jan 2011 | Installers want a site survey, electrical in place, permits and insurance. They are wary of warranty and liability when installing another company's product. A member states ~$1,000, or ~$500 per raceway. |
| Signs101 (trade) | Install price for out-of-state fabricated letters | Mar 2019 | Members state ~$350–$1,700 per install. Drivers: bucket truck, permits, electrical, travel, crew hours. |
| Signs101 (trade) | Building LED neon: quality/suppliers | Jun–Aug 2025 | Avoid cheap marketplace strips and power supplies (fire risk reported). Superglue clouds acrylic. Pro-grade parts reported zero failures in 6 years. |
| Signs101 (trade) | Aurora LED flex experiences | Feb 2019 | Hot spots in untested imports; better outcomes with established flex brands. |

### Reddit/Quora threads observed only as SERP titles and snippets [O] (not opened; blocked)
- r/weddingplanning: a neon sign cost estimate; how much a custom-built sign costs (Dec 2020, 5 answers); how much people paid for a custom name sign (Apr 2023, 23 answers); a font question where thin strokes translate poorly.
- r/smallbusiness: opinions on custom neon signs; lightbox/channel-letter install help (snippet: early LED failures, water, bird droppings).
- r/SeattleNeonSigns: whether a custom neon sign is worth it for a tiny coffee-cart business.
- LED neon company AMA (Jul 2026, 30 answers).
- r/led: using an Amazon LED neon outside. Top answer expects it to fail when wet; a vendor rep replies.
- r/NeonSigns: outdoor sign build; neon outdoors; tube lifespan vs transformer; leaving old neon on vs off; ~2-year apprenticeship to learn glass bending.
- r/Electricity and related: LED neon vs glass power draw; current draw; which power supply for a 135W LED sign.
- r/mancave: hanging a neon sign when the electrical box is in the way.
- r/unpopularopinion: glass neon looks better than LED's "dotted" light.
- Quora: can custom neon signs be used outdoors (30+ answers); whether neon is costly for businesses; advantages for business; how to tell LED from neon; best place to buy a custom LED neon; cost to make an LED neon sign.

### Buyer-objection themes [I, built on the evidence above]
1. **Price opacity.** Listings advertise "from" prices of $16–$60 [O], while forum users report $250–$500+ for real name or wedding signs [O]. Buyers can't reconcile the two and ask why neon is so expensive (PAA [O]). → Publish what drives the gap: size, letter count, logo complexity, backboard, outdoor build, shipping.
2. **Quality and reliability of cheap LED neon.** Visible dots and hot spots, fading, section burn-outs, cheap power supplies [O Signs101/Reddit]. → Show close-up lit photos and the power-supply/adapter spec. State the warranty terms that actually exist. Mention certifications only if true.
3. **Indoor vs outdoor confusion.** People buy indoor signs for outdoor use [O r/led]. The power supply and dimmer are not waterproof [O AIO]. The outdoor build must be chosen at order time [O AIO]. → An explicit indoor/outdoor selector in the quote flow, plus a guide.
4. **"Who installs it?" (channel letters).** Licensing, permits, bucket trucks and installer liability for third-party products [O Signs101]. **This is the core objection for a ship-only seller** [I]. → An install-ready package: full-size pattern, mounting hardware list, wiring diagram, power-supply location, spec sheet for permits. Plus a "what to ask your installer" checklist.
5. **Permits and landlord criteria.** Landlords may require channel letters or ban cabinets [O AIO Q6]; permits cost extra [O AIO Q2]. → Say clearly who handles permits (the buyer) and what documents Glownique can supply.
6. **Lead time vs deadlines.** Wedding and event dates [O WeddingWire]; PAA asks how long a custom sign takes [O]. → Publish realistic production + shipping windows and rush policy, consistent with `/shipping`.
7. **Design translation.** Turning an exact logo into neon, fine detail, thin fonts, color mixing [O Custom Neon FAQ, Reddit font thread]. → Mockup examples showing an original logo, the simplification, and the final sign lit.
8. **Sizing uncertainty.** What fits a wall or backdrop, how it looks in photos, how far it can be read [O PAA/AIO]. → A size guide and a visual size comparison.
9. **Running cost, heat and 24/7 use** [O PAA Q9/Q10, Reddit]. → Measured wattage for real Glownique signs and a cost example using a cited, dated electricity rate.
10. **Lifespan and repairability** [O PAA]. → State what fails first (the adapter [O AIO]) and whether replacement parts are available (only if true).
11. **Authenticity (glass vs LED)** [O r/unpopularopinion, Patrick Nash]. → Be honest about where glass still wins.
12. **Marketplace trust and vendor self-promotion.** Etsy is used as the price benchmark [O WeddingWire]; vendors reply in Quora/Reddit threads [O]. → Glownique's Etsy checkout is a trust asset; explain the mockup → WhatsApp → Etsy flow plainly.

---

## 6. Master list of real questions (deduplicated), by topic

Sources:
- **P#** = Google PAA for that query [O].
- **P#x** = revealed only after PAA expansion [O].
- **R** = Reddit title/snippet on a SERP [O].
- **Qu** = Quora title on a SERP [O].
- **W** = WeddingWire thread [O].
- **S** = Signs101 [O].
- **RS** = "People also search for" [O].
- **(para)** = paraphrased from forum content.

**Cost & pricing**
- How much do custom neon signs cost? / What is the average cost of neon? / How much should a neon sign cost? (P1, P1x, P16)
- Why are neon signs so expensive? / Why are real neon signs so expensive? (P1, P1x)
- How much is a neon sign worth? / Are neon signs worth money? (P1x, P16)
- How much do custom signs typically cost? (P1x)
- Where can I find affordable custom neon signs? (P1x) / Cheapest place to have a neon sign made? (W, para)
- How much did people actually pay for a custom name neon sign? (R, para)
- How much do channel letters cost per inch? / How much do channel letters typically cost? / Average cost of channel letter signs? (P2, P2x, P6b, P13)
- How much do LED signs typically cost? / How much does an illuminated sign cost? (P2, P14)
- How much does a lightbox sign cost? (P19)
- How much does it cost for a storefront sign? (P15)
- Why are acrylic signs so expensive? (P7)
- How much does it cost to make an LED neon sign? (Qu)
- Channel letter cost per square foot / price calculator; halo-lit vs backlit price (RS)
- Are neon signs very costly for businesses? (Qu)

**Sizing**
- What size neon sign do I need (in inches / for a wedding / for my room)? (RS Q11)
- What is the standard size for a sign? (P11)
- Is 18x24 big enough for a welcome sign? / Is 16x20 a good size for a welcome sign? (P11)
- How big should a sign be to read from the road or the parking lot? (inferred from AIO readability rule; not a PAA) [I]
- Neon light size in mm, size chart, tube thickness (RS)

**Outdoor & weather**
- Are LED neon signs waterproof? Waterproof in water? (query, RS)
- Can you put neon signs outside? / Can neon signs stay outside? (P8a, P8b)
- Can I use an LED neon light outside (bought indoor)? (R, para) / Can custom neon signs be used outdoors? (Qu)
- What is the best weatherproof sign material for outdoor use? / What material is best for outdoor signs? (P8b, P7)
- Do channel letter signs work outdoors? (ChannelLetter.com FAQ; competitor-authored, not user data)

**Power & safety**
- Do neon signs use a lot of electricity? / How much electricity does a neon sign use? (P10)
- How much does it cost to leave an LED light on for 24 hours? / Do LED lights run up your electricity bill? (P10)
- Are neon signs expensive to run? (P1x)
- Can you leave neon signs on all the time? / Can you leave neon lights on overnight? (P9, RS)
- Do neon signs get hot? (RS)
- What power supply do I need for a 135W LED sign? / What is the current draw of a neon sign? (R, para)
- What is the downside of LED lights? / What is the negative side of LED? (P3x) [health tangents: low relevance]

**Lifespan & durability**
- How long do LED neon signs (typically) last? / How long does LED neon last? (P3x, P8a, P8b)
- Do LED neon signs burn out? (P3, P8a, P8b, P9)
- How long do neon signs typically last? (P1x) / How long do neon tubes last vs the transformer? (R, para)
- How long do acrylic signs last? (P7) / How permanent is UV printing? (P18)
- Should an old neon sign be left on or turned off? (R, para)

**Installation & mounting**
- How do I hang a neon sign on the wall? / What to hang a neon sign with? / How to hang a heavy neon sign? / How to attach neon light to wall? (P12)
- How to hang a neon sign without nails / with chain / on a backdrop; mounting kit (RS)
- How do you hang a neon sign around an electrical box? (R, para)
- How are channel letters installed? (P2x, query)
- Can channel letters be installed without a raceway? (Flexlume/BlinkSigns FAQ; competitor-authored)
- Who will install letters I bought online, and what will it cost? (S, para)
- Do I need a permit to install a channel letter sign? (ChannelLetter.com/BlinkSigns FAQ; competitor-authored; also AIO Q2)

**Design & fonts**
- What is a good font for a neon sign? / Best font to use for a sign? (P20a, P20b)
- What are some good free fonts for neon signs? / Is there a neon font in Canva? / How to make a font look like a neon sign? (P20a, P20b) [designer intent]
- Which thin or calligraphy fonts translate badly to neon? (R, para)
- Can you turn my exact logo into a neon sign? (Custom Neon FAQ; competitor-authored)
- What color sign gets the most attention? (P15)
- How to get a custom neon sign made? / How can I create my own neon sign? / Can I create a neon sign online for free? (P1, P17)
- How long does it take to get a custom neon sign? (P1x)

**Comparison & definitions**
- Which is better, LED or neon? / Are LED signs better than neon? / Is neon cheaper than LED? (P3, P3x, P8a, P9)
- Why aren't neon lights used anymore? / What has replaced neon signs? / Are neon signs making a comeback? (P3, P19, P1x)
- How to tell if a sign is LED or neon? (P19, Qu)
- What is halo-lit signage? / Is backlit the same as halo lit? (P4, P5)
- What is the difference between front-lit and backlit (halo-lit) signage? (P4, P5)
- Which is better, backlit or edge lit? (P5)
- What is the difference between channel letters and reverse channel letters? (P13)
- What are channel letters / Are channel letters illuminated? / What is a lightbox sign? (P6, P6b)
- What are the different types of storefront signs / lit signage / signage letters? (P4, P6, P14, P15b)
- Which is better, acrylic or metal prints? (P7)
- What is a double-sided sign? (P14)

**Business value**
- Is a custom neon sign worth it for a (tiny) business? (R, para)
- What are the disadvantages of using neon lights? (P16)
- What are the advantages of neon signs for business? (Qu)
- Is a neon sign business profitable? (P1, P16) [seller-side intent: exclude]

**DIY / process**
- Can I make neon signs at home? / What equipment do I need? / Is it hard to make your own neon sign? (P17, P1x)
- Does neon glow without electricity? (P17)
- How to make your own neon art (glass bending apprenticeship)? (R, para)
- Can a UV printer print on acrylic? / What are the downsides of UV printing? / Does UV go through acrylic? (P18)

Noise excluded from the list: yard-sign questions (P2x, P11); "LC sign" (P2); health effects of LED light (P3x).

---

## 7. Recommendation per query

Priorities: **P1** build now; **P2** next; **P3** later or conditional. Target URLs are existing routes or slugs planned in `06-information-architecture.md`. Slugs marked "(new)" are not in the IA [I].

| # | Query | Recommendation | Target | Priority | Reasoning (O = observed basis, I = inference) |
|---|---|---|---|---|---|
| 1 | how much does a custom neon sign cost | **New guide** + price-anchor section on product page | `/guides/custom-neon-sign-cost` (new; or a dedicated neon section inside planned `custom-business-sign-cost`) + `/products/custom-neon-signs` | P1 | O: AIO builds a price-by-size table; top results are product pages with starting prices and an unsourced rental-company guide; 15 PAA questions on cost, speed and running cost. I: win with **Glownique's own dated price bands** (from real Etsy listings or quote history, with the method stated), a "what's included" list (backboard, adapter, dimmer, outdoor build, shipping, **no install**), and separate business-logo vs name/text pricing. Never reuse competitor ranges. |
| 2 | how much do channel letters cost | **New guide** | `/guides/channel-letter-sign-cost` | P1 | O: the SERP and AIO blend installed-project ranges (installers) with ship-only ranges (factory-direct) and trade per-inch pricing; related search asks for a price calculator. I: Glownique's edge is clarity. Split **(a) fabricated letters shipped** (what it sells) from **(b) buyer-side costs** (installer, electrician, permit, lift), with a checklist. A calculator only if based on Glownique's real pricing formula. |
| 3 | led neon vs glass neon | **Comparison page** (or a strong section on the neon product page if resources are short) | `/guides/led-neon-vs-glass-neon` (new) | P2 | O: seller table (#1) and artisan blog (#2) both cited; video carousel; Reddit aesthetics debate. I: balanced and first-hand. Show where glass wins (glow, 360°, repair by a neon bender) and where LED wins, with Glownique close-up photos. Avoid unsourced numeric claims. |
| 4 | front lit vs halo lit sign | **Comparison page**, merged with Q5 and Q14 | `/guides/front-lit-vs-halo-lit-vs-dual-lit` | P1 | O: AIO table (direction, distance, wall surface, cost); the #1 organic result was not cited; fresh sign-shop pages were. I: one page with a definition block per style, an HTML table, wall-surface guidance, and day/night photos of the same Glownique letters in each mode. Fix product-page terminology: "3D metal neon signs" → standard "channel letters". |
| 5 | halo lit vs backlit sign | **Merge into Q4 page** (FAQ + terminology section) | same as Q4 | P1 (with Q4) | O: AIO says they are the same; Tupp contradicts; PAA "is backlit the same as halo lit". I: a separate page would split the same intent. |
| 6 | channel letters vs lightbox / cabinet sign | **Comparison page** | `/guides/lightbox-vs-channel-letters` | P1 | O: comparison intent; landlord criteria in the AIO; sign-shop blogs dominate; the Glownique catalog covers both. I: include a scope note (slim edge-lit LED lightbox vs outdoor cabinet sign), a decision matrix (logo complexity, budget, landlord rules, indoor/outdoor, visibility) and photos. |
| 7 | acrylic sign vs metal sign | **Comparison page** (lower priority); interim section on the UV acrylic product page | `/guides/acrylic-vs-metal-logo-signs` (new) or section on `/products/uv-print-acrylic-signs` | P3 | O: the SERP is about flat material choices (lobby vs exterior) from local sign shops; PAA drifts to "prints". I: winnable but only partly relevant. Frame it as lobby/reception logo signs (UV-printed acrylic vs metal letters) with real photos. |
| 8 | are led neon signs waterproof / can they be used outdoors | **New guide** + product-page FAQ | `/guides/indoor-vs-outdoor-illuminated-signs` + `/products/custom-neon-signs` FAQ | P1 | O: #1 is a thin product page; the AIO relies on explanations of IP ratings and component caveats; videos are DIY waterproofing; Reddit shows indoor signs used outdoors. I: explain IP codes by citing the IEC 60529 definitions directly (verify before publishing). State which Glownique components are rated (tube, adapter, dimmer) from **its real specs**. Cover channel letters and lightboxes outdoors too. Add an indoor/outdoor choice to the quote form. |
| 9 | how long do led neon signs last | **Existing page section** (FAQ) + part of Q3 | `/products/custom-neon-signs` FAQ | P2 | O: seller FAQs with unsourced hour claims (30k–100k); AIO converts hours to years. I: a standalone page adds little unless Glownique has LED datasheet data (e.g., an L70 rating) to publish. |
| 10 | how much electricity does an led neon sign use | **Existing page section** now; **new mini-guide with calculator** only if measured data exists | FAQ on neon page; later `/guides/led-neon-power-cost` (new) | P3 | O: AIO offers to calculate; related search asks for a calculator; wattage claims contradict each other. I: measured watts for 3–5 real Glownique sign sizes × a cited, dated US electricity rate (EIA) would be original and citable. Without measurements, keep it to a short FAQ answer. |
| 11 | what size neon sign do i need | **New guide** | `/guides/sign-size-viewing-distance` | P2 | O: results skew to weddings; AIO uses room-based sizes plus readability and mock-up rules; PAA drifts to generic sign sizes. I: cover business uses (storefront window, behind the counter, lobby logo, patio) plus home and events. Include a viewing-distance rule **from a primary source** (e.g., sign-legibility research; verify), a visual size comparison and a "tape it on the wall" test. Tie it to the free mockup. |
| 12 | how to hang a neon sign | **Existing page section** + short support article/video | install section on `/products/custom-neon-signs` (+ optional `/support/hang-neon-sign`) | P3 | O: seller how-tos and videos dominate; AIO embeds a video. I: low acquisition value but high post-purchase and AI-answer value. Document Glownique's actual hardware (standoffs, chain/wire) with photos. |
| 13 | how are channel letters installed | **New guide** | `/guides/sign-installation-electrical-permits` | P2 | O: video-heavy; installer guides; forum evidence that installers want patterns, electrical in place, permits, and worry about liability. I: because Glownique doesn't install, publish **"what your installer or electrician needs"**: mounting options, pattern, power-supply placement, sealing, permit documents. **This directly answers the core ship-only objection.** Claim listings or certifications only if they are real. |
| 14 | what is a dual lit sign | **Existing page section**: definition block on the Q4 page + channel letter product page | Q4 page + `/products/3d-metal-neon-signs` | P1 (with Q4) | O: short definitional SERP; entity noise from "Dual-Lite" exit signs. I: use disambiguating wording ("dual-lit (front- and halo-lit) channel letters"). |
| 15 | best sign for storefront / best storefront sign type | **New guide** (decision hub) | `/guides/choose-business-sign-type` | P3 | O: broad SERP (Shopify, national chains, marketplaces); AIO favors channel letters and adds compliance. I: build it after the P1 comparisons, as a hub linking to them. Be explicit about outdoor suitability and that installation and permits are the buyer's. |
| 16 | neon sign for business worth it | **Existing page section** | planned `/business-signs/custom-logo-neon-signs` (or current neon page) | P2 | O: AIO pros/cons; forums and heavy shopping; PAA partly seller-side. I: an honest pros/cons block with real client examples. No ROI claims without evidence. |
| 17 | how to make a neon sign | **Not worth targeting** (DIY). **Repurpose** the draft | Refocus to `/how-we-make-illuminated-signs` targeting "how are LED neon signs made"; add a short "DIY vs custom" section | — | O: DIY video intent; a seller ranks #2 only via an interactive builder; the adjacent "how are LED neon signs made" SERP is seller-dominated. I: Glownique has no builder and DIY readers are not buyers. A process page with workshop photos is realistic and supports trust and E-E-A-T. |
| 18 | uv printing on acrylic signs | **Existing page section** | `/products/uv-print-acrylic-signs` | P2 | O: split intent (printer owners vs sign buyers); ads and shopping heavy; PAA on downsides and permanence. I: a process explainer (UV-cured ink, white underlayer, second-surface printing), indoor/outdoor durability **from Glownique's supplier specs**, and FAQs answering the PAA. A standalone guide would mostly attract printer buyers. |
| 19 | lightbox sign vs neon sign | **Comparison page** (can start as a section of Q15's hub, then split if Search Console shows impressions) | `/guides/lightbox-vs-neon-sign` (new) or a section in `choose-business-sign-type` | P2/P3 | O: weak, mismatched SERP (results answer "LED vs neon"); AIO cites small sign shops. I: low competition and Glownique sells both. Size of the opportunity is unknown (no volume data), so a staged rollout is recommended. |
| 20 | neon sign font ideas / best font for neon sign | **Existing page section** now; guide later if original visuals exist | design/fonts section on `/products/custom-neon-signs` + mockup/quote page | P3 | O: seller listicles, font marketplaces, image packs, Canva PAA; AIO cites Custom Neon only. I: the value is supporting the mockup conversation. A later guide should show **real lit photos of Glownique's font options** (original visuals), not another list of font names. |

**Consolidation rules (to prevent cannibalization) [I]:**
- Q4 + Q5 + Q14 → one page.
- Q6 + Q6b → one page.
- Q8a + Q8b → one page.
- Q20a + Q20b → one section.
- Q15 + Q15b → one hub.
- Q9 and Q10 → FAQ sections before any standalone page.

---

## 8. Cross-cutting AEO/SEO implications [I]

1. **Mirror the AIO's qualifying questions.** Answer indoor vs outdoor, size, text vs logo, wall material, budget and landlord rules on the pages, and ask the same things in the WhatsApp quote flow. Custom Neon's quote FAQ and BlinkSigns' checklist are cited partly because they do this.
2. **State the business model where it matters:**
   - "We fabricate and ship; you arrange installation."
   - Mockup → WhatsApp quote → Etsy checkout.
   - This is both a differentiator and an objection handler. It must match `/shipping`, `/returns` and `/terms`.
3. **Beat the low evidence bar:**
   - Cite primary standards (IP code definitions, electrical sign code and listing requirements, EIA electricity rates) after verifying them.
   - Publish a short method note for any price band ("based on N quotes/listings, month/year").
   - Name the fabrication lead as the page's expert, with a real bio.
4. **Show first-hand visuals.** Day/night photos, close-ups of the LED line, size-in-context shots and real dimensions. These are the evidence types that ranked or were cited (SignFreaks projects, Zanvis customer sizes, the artisan's perspective).
5. **Use tables and short answer blocks.** Put a 40–60 word answer under each question-style H2, use HTML tables for comparisons and price bands, and keep visible FAQ matched to its schema. No schema for content that isn't visible.
6. **Keep freshness honest.** Show a "Last reviewed" date only when content actually changes. Competitors' "2026" titles sometimes sit on pages first published in 2023–2024 [O].
7. **Fix terminology on product pages.** Use "channel letters (front-lit, halo-lit/reverse-lit, dual-lit)", "LED neon flex", and "lightbox / light box sign (slim, edge-lit)" as the SERPs do. The current slug `3d-metal-neon-signs` does not match the channel-letter vocabulary seen across Q2/Q4/Q6/Q13/Q14 [O].

---

## Appendix A: incidental capture ("custom neon signs", unintended navigation) [O]
Local pack (Custom Neon, LA; Best Buy Neon Signs, LA; Best Neon Sign Company, Oak Lawn IL). Organic: neonsigns.com, yellowpop.com, neonchamp.com, customneon.com, **Etsy market page**, kingsofneon.com, YouTube (LC SIGN), echoneon.com, hi-hyperlite.com, crazyneon.com. Sponsored: getcustomneonsigns, helloneonsign. PAA: average cost of a custom neon sign; how to get one made; who makes the best; how to create your own. Shown only as head-term context. It is not part of the Q1 analysis.

## Appendix B: files
- Audit script: `research/page_audit.py`; extractor: `research/extract.py`
- URL lists: `research/urls.txt`, `research/urls2.txt`
- Audit outputs: `research/audit1.txt`, `research/audit2.txt`
- Raw HTML for audited pages: `research/raw/Q*.html`
