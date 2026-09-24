# SERP Research: Commercial / Transactional Clusters (US)

**Client:** The Glownique (https://www.theglownique.com/). It makes illuminated signage to order: LED neon, metal channel letters (front-lit, halo-lit, dual-lit), backlit signs, slim LED lightboxes and UV-printed acrylic. It sells nationally online: free mockup, then a WhatsApp quote, then payment on Etsy. It does not install signs and has no verified storefront.

**Research date:** 2026-09-24. Captures ran 15:44–16:20 UTC.

**Scope:**
- 21 commercial queries
- 6 deep dives
- cross-query patterns and implications
- a PAA / related-search inventory

**Rules followed:** Only observed data is reported. Anything marked **(inferred)** is analyst judgement, not observation. No search volumes were measured, so none are stated.

---

## (a) Method and tool limitations

### Tools that worked

| Tool | What it gave | When (UTC) | Notes |
|---|---|---|---|
| **Google SERP in a real browser** (Claude Browser pane), `google.com/search?q=…&gl=us&hl=en&pws=0` | Full page 1 for **all 21 queries**: organic order, Shopping grids, local pack, PAA, AI Overviews, video and image packs, ads, "People also search for" | Q1–12: 15:46–15:51:46. Q13–21: 16:13–16:18 | A JS extractor read the DOM (see `serp_extract.js` and `serp_extract_v2.js`). Result links are opaque `/goto?url=` tokens, so Google results are shown by their displayed breadcrumb (e.g. `neonsigns.com › …`). Full URLs come from WebSearch where the same page appears. |
| **WebSearch** (tool says US-only; engine not disclosed) | About 9–10 URLs per query, full URLs, no SERP features | ~15:44–15:47 | Run for all 21 queries as a second source. Domain overlap with Google ranges from 2/7 to 8/8 per query (see `serp_data.py`). Its order is **not** Google rank. |
| **Python urllib page analyser** (`analyze_page.py`) on raw HTML | Title, meta, canonical, H1/H2/H3, all JSON-LD `@type`s, approximate visible word count (includes nav and footer), price strings, tables, images, FAQ-schema questions, AggregateRating | 15:53–16:22 | Returned 403 for yellowpop.com, fastsigns.com and theknot.com. Returned 404 for blueriverdigital.com, which the browser rendered fine. lindosign.com gave 522 once, then worked on retry. |
| **WebFetch** | Semantic summaries of deep-dive pages: FAQ lists, pricing, size guidance, CTA and order flow, trust signals | 15:55–16:22 | Returned 403 for yellowpop.com and theknot.com, so those were read in the browser. |
| **Browser DOM inspection** | yellowpop.com, theknot.com, blueriverdigital.com | ~15:55–16:21 | fastsigns.com showed a **Cloudflare "you have been blocked"** page. It was not analysed and not bypassed. |

### Blocks, failures and caveats

**Google CAPTCHA (no bypass attempted).** At 15:52:30 UTC, on the 13th query, Google served a reCAPTCHA "unusual traffic" page (`/sorry/index`).
- It was not solved or circumvented.
- A single retry at 16:05 was still blocked.
- By 16:13 the block had lifted by itself.
- Queries 13–21 were then captured with about 10–15 seconds between queries.
- The block was probably triggered because another agent was running Google searches through the same shared browser pane and IP. That agent also navigated my first tab mid-capture, so I moved to dedicated tabs and checked the query string in every capture.

**Bing could not be observed.**
- curl returned results that were unrelated to the query (YouTube pages), even though the query echo was correct.
- The real browser returned degraded results matching only the word "slim".
- WebFetch returned a zero-results page.
- All three look like bot filtering, so no Bing data is reported.

**Other tools that failed or were not used.**
- DuckDuckGo HTML (a proxy for Bing's index) returned an "anomaly" bot challenge.
- `mcp__web-search-prime` failed with error 1113 (insufficient balance).
- TinyFish was not used (it needs auth, as instructed).

**Location.**
- The browser IP is not in the US; the user appears to be in Pakistan.
- `gl=us&hl=en&pws=0` asked for US, non-personalised results, and Google showed "Can't determine location".
- Local packs showed US businesses (Los Angeles and Oak Lawn IL for neon; Buford GA and North Charleston SC for business signs). Treat local-pack data as a US approximation, not a true local SERP.
- Yellowpop displayed prices in PKR, so its USD prices were not observable.

**Volatility.** Each query was captured once. SERPs change constantly, so treat this as a snapshot, not a stable ranking.

**Video results.** Google video results showed views and age but often no platform label.
- YouTube was confirmed for Q1, Q13, Q16 and Q21.
- For the rest (Q2, Q5, Q6, Q7, Q9, Q11, Q12), YouTube is likely but inferred.

### Files (same folder)

| File | Contents |
|---|---|
| `serp_data.py` | Observed organic domains for Google (21 queries) and WebSearch (21), plus the tally code |
| `serp_extract*.js` | The Google DOM extractors |
| `analyze_page.py` | The on-page analyser |
| `dd/*.txt` | Deep-dive outputs |
| `gn/*.txt` | Outputs for Glownique's own pages |
| `raw/glownique_sitemap.xml` | Glownique sitemap (49 URLs) |

---

## Summary table (all 21 queries, Google US)

Notes for this table:
- Mkt = Amazon, Etsy or Walmart appearing in the organic top ~10.
- PASF = related searches ("People also search for").
- **theglownique.com was absent from all 21 Google SERPs and all 21 WebSearch sets.**

| # | Query | Dominant page types (organic top ~10) | Mkt in organic | Google SERP features observed |
|---|---|---|---|---|
| 1 | custom neon signs | DTC neon brand **homepages** (6), category (1), product (1), marketplace (1), video (1) | Etsy #5 | Popular products, **local pack**, PAA, video, bottom ads, PASF |
| 2 | custom led neon signs | homepages (6), product (2), marketplace (1), video (1) | Amazon #5 | Popular products, **local pack**, PAA, video, bottom ads, PASF |
| 3 | custom neon signs for business | homepages (5), landing (1), product (1), marketplace product (1) | Amazon #3 | Popular products (top), Deals, PAA, More products, Images, bottom ads, PASF |
| 4 | custom logo neon sign | homepages (5), product (1), marketplace (2), Pinterest (1) | Amazon #3, Etsy #8 | Popular + More products, **local pack**, Images, PAA, bottom ads, PASF |
| 5 | channel letter signs | configurator/product (2), homepage (1), reference (1), franchise (1), guide (1), video | Amazon #3 | **AI Overview (top)**, Images, PAA, Popular + More products, video, bottom ads, PASF |
| 6 | halo lit signs | manufacturer pages (3), product (1), guide (1), landing (1), Pinterest, video | none | Popular products, PAA, **AI Overview (mid)**, video, bottom ad, PASF |
| 7 | backlit signs | product (3, incl. print/decal), category/landing (3), franchise (1), Pinterest, video | Amazon #9 | Popular + More products, sponsored block, Images, PAA, video, PASF |
| 8 | front lit channel letters | wholesale/manufacturer (3), product (4), landing (1), marketplace listing (1) | Etsy #8 | **PAA at top**, sponsored block, Popular + More products, PASF |
| 9 | dual lit channel letters | wholesale/manufacturer (2), blogs (2), portfolio archive (1), collection (1), product (1), video | none | **AI Overview (mid)**, PAA, sponsored block, Popular + More products, video, PASF |
| 10 | 3d metal logo sign | product (2), collection/category (2), homepages (2), marketplace (2), Pinterest | Etsy shop #2, Amazon #3 | Popular + More products ×2, Images, **no PAA**, PASF (5) |
| 11 | acrylic logo sign | print/sign e-commerce product pages (6), marketplace (1), video, Pinterest-style board | Amazon #5 | **Top ads ×4**, Popular + More products, sponsored block, PAA, video, PASF |
| 12 | uv printed acrylic sign | product/category (4), landing (1), info page (1), marketplace listing (1), video | Etsy #7 | **Top ads ×4**, Popular products (top), More products, Videos module, PAA, Images, video, bottom ads, PASF |
| 13 | slim led light box sign | display-hardware e-commerce categories (5), landing (1), video (1) | none | Popular + More products ×2, **AI summary block (mid, no heading)**, sponsored block, Images, PAA, Videos module, video, PASF |
| 14 | custom business signs | generalist print/sign categories (5), homepage (1), franchise (2), marketplace (1) | Amazon #3 | **Top ad**, **local pack**, sponsored block, Popular products, PAA, Images, PASF |
| 15 | reception logo sign | sign-co / franchise pages (3), product (1), blog/guide (2), Etsy (1), Pinterest (1), stock-image site (1) | Etsy #5 | Popular products (top), Images, **no PAA**, no ads, PASF |
| 16 | restaurant neon signs | neon category/landing pages (5), product (1), marketplace (1), video (1) | Amazon #3 | Popular + More products, Images, **AI Overview loading placeholder (mid)**, PAA, video, PASF |
| 17 | salon neon sign | neon/salon category pages (5), marketplace (2, incl. Amazon Live video page), Pinterest | Amazon #3, #8 | Popular products, **AI Overview (mid, shopping-style)**, More products, PAA, bottom ad, PASF |
| 18 | gym neon sign | neon category pages (5), marketplace (2), Pinterest (2) | Amazon #6, Etsy #8 | Popular products (top), More products, PAA, bottom ad, PASF |
| 19 | wedding neon sign | neon category pages (5), editorial (2: The Knot, Brides), rentals/custom (1), marketplace (1) | Amazon #4 | Popular products (top; **mostly Etsy sellers**), Images, PAA, bottom ads, PASF |
| 20 | bedroom neon signs | neon category pages (5), marketplace (1), Pinterest (1), blog (1) | Amazon #4 | Popular + More products, Images, PAA, **"What people are saying"**, PASF |
| 21 | personalized neon bar signs | neon category pages (5), homepage (1), marketplace (1), video (1), Pinterest (1) | Amazon #2 | Popular products (top), More products ×2, Images, PAA, video, PASF |

---

## (b) Per-query detail

### How to read these tables

- **Google column:** organic results in the order observed, shown as `domain › breadcrumb`.
- **WebSearch column:** full URLs, in WebSearch's order (not a rank).
- **Page type codes:**

| Code | Meaning |
|---|---|
| home | homepage |
| cat | category or collection page |
| prod | product page |
| land | landing or service page |
| mkt | marketplace |
| guide / blog | informational article |
| ref | reference (e.g. Wikipedia) |
| video | video result |
| UGC | Pinterest or other user-generated boards |

### 1. custom neon signs

Captured 15:48:29 UTC (also seen at 15:46 with the same order).

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | neonsigns.com › … (/us/); stars 4.9 (2,095), free delivery, 7-day returns | home | etsy.com/market/custom_neon_sign | mkt |
| 2 | yellowpop.com; free delivery over $49, 14-day returns | home | yellowpop.com/ | home |
| 3 | neonchamp.com; free delivery, 90-day returns | home | amazon.com/…/dp/B09M8NVC12 (Yatvro) | mkt |
| 4 | customneon.com, with sitelinks (Design Your Own Sign, Business Logos, Illuminated Signs, Outdoor Signs) | home | customneon.com/ | home |
| 5 | etsy.com › market › custom_neon_sign (4.5 store rating, 1.1K) | mkt | hi-hyperlite.com/collections/led-neon-signs | cat |
| 6 | kingsofneon.com | home | kingsofneon.com/ | home |
| 7 | YouTube · LC SIGN, "How to Custom Your Own Neon Sign" (2:03) | video | neonsigns.com/us/ | home |
| 8 | echoneon.com | home | crazyneon.com/products/custom-neon-sign | prod |
| 9 | hi-hyperlite.com › collections › led-neon-signs ($105–$380, 4.7 store rating) | cat | neonchamp.com/ | home |
| 10 | crazyneon.com › products › custom-neon-sign ($49, was $98; 4.8 (721)) | prod | echoneon.com/ | home |

**Other features**
- **Popular products** grid after #2. Sellers and prices: customneon.com $61; Neon Signs Now $70.72; Neon Signs $33.59; NeonChamp $16.79 (was $28); CanvasChamp $27.99.
- **Local pack** after #3: Custom Neon (LA, 4.9, 702 reviews), Best Buy Neon Signs (LA), Best Neon Sign Company (Oak Lawn IL).
- PAA (4 questions).
- Bottom ads: getcustomneonsigns.com, helloneonsign.com.
- No AI Overview.

### 2. custom led neon signs

Captured 15:49:06 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | yellowpop.com | home | yellowpop.com/ | home |
| 2 | neonsigns.com › … | home | amazon.com/…/dp/B09M8NVC12 | mkt |
| 3 | neonchamp.com | home | customneon.com/ | home |
| 4 | customneon.com | home | bannerbuzz.co.nz/custom-neon-signs/p | prod (NZ domain) |
| 5 | amazon.com › Personalized-Yatvro-… | mkt prod | kingsofneon.com/ | home |
| 6 | kingsofneon.com | home | neonsigns.com/us/ | home |
| 7 | Video (platform not captured; likely YouTube, inferred), "How to Make Neon LED Sign at Home" (24.7K views) | video | crazyneon.com/products/custom-neon-sign | prod |
| 8 | crazyneon.com › products › custom-neon-sign | prod | neonchamp.com/ | home |
| 9 | backlitledsign.com › products › custom-neon-sign… | prod | canvaschamp.co.nz/custom-neon-signs | cat (NZ domain) |
| 10 | echoneon.com | home | – | |

**Other features:** Popular products (customneon.com, Neon Signs, Neon Signs Now, CanvasChamp, NeonChamp, crazyneon.com), **local pack**, PAA, bottom ads (getcustomneonsigns, helloneonsign). No AI Overview.

### 3. custom neon signs for business

Captured 15:49:10 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | *Popular products at very top* (customneon.com, BacklitLEDsign, Neon Signs Now, NeonChamp, Neon Signs, Make Neon) | shopping | | |
| 1 | yellowpop.com | home | amazon.com/…/dp/B0CMZZQXVL | mkt |
| 2 | neonsigns.com › … | home | amazon.com/business-logo-neon-light-sign-custom/s | mkt |
| 3 | amazon.com › Customizable-Printed-Dimma… | mkt prod | customneon.com/business-signs-logo/ | land |
| 4 | customneon.com › business-signs-logo | land | kingsofneon.com/ | home |
| 5 | kingsofneon.com | home | spellbrite.com/led-neon-custom-signs/ | land |
| 6 | neonchamp.com | home | neonsigns.com/us/ | home |
| 7 | bannerbuzz.com › … › LED Neon Signs (custom logo neon) | prod | crazyneon.com/products/custom-neon-sign | prod |
| 8 | customneon.com (second URL from the same domain) | home | neonchamp.com/ | home |
| 9 | – | | briteliteneon.com/pages/customizer | land/tool |

**Other features:** Deals module, PAA, More products, Images, bottom sponsored results. No local pack, no AI Overview.

### 4. custom logo neon sign

Captured 15:49:52 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | neonsigns.com › … | home | bannerbuzz.com/custom-logo-neon-sign/p | prod |
| 2 | yellowpop.com | home | amazon.com/…/dp/B0CMZZQXVL | mkt |
| 3 | amazon.com › Customizable-Printed-Dimma… | mkt prod | yellowpop.com/ | home |
| 4 | customneon.com | home | etsy.com/market/custom_neon_sign | mkt |
| 5 | neonchamp.com | home | customneon.com/ | home |
| 6 | kingsofneon.com | home | kingsofneon.com/ | home |
| 7 | bannerbuzz.com › … › LED Neon Signs | prod | gs-jj.com/neon-signs/Custom-Neon-Signs | cat |
| 8 | etsy.com › market › custom_neon_sign | mkt | neonsigns.com/us/ | home |
| 9 | pinterest.com › … › Custom Light Up Signs | UGC | neonchamp.com/ | home |

**Other features:** Popular and More products, **local pack**, Images, PAA, bottom ads. No AI Overview.

**Observation:** no logo-specific landing page ranks in Google's top 6. The first one is BannerBuzz at #7.

### 5. channel letter signs

Captured 15:49:57 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | **AI Overview at top** (summary below) | AIO | | |
| 1 | buysignletters.com › Channel-Letters-Num… | prod (configurator) | fastsigns.com/products/exterior-signage/channel-letter/ | franchise prod |
| 2 | signmonkey.com | home (design & price) | en.wikipedia.org/wiki/Channel_letter | ref |
| 3 | amazon.com › channel-letters (search) | mkt | davessigns.com/channel-letters-101-need-to-know/ | guide |
| 4 | en.wikipedia.org › wiki › Channel_letter | ref | pinterest.com/ideas/channel-letter-signs/… | UGC |
| 5 | fastsigns.com › products › channel-letter | franchise prod | ledsigncity.com/products/channel-letter-signage-custom-sizes-and-styles | prod |
| 6 | Video, "Channel Letter Sign Installation – Explained… Kinda…" (2.9K views) | video | channelletters.in/ | home (India) |
| 7 | ledsigncity.com › products › channel-letter-signag… | prod | buysignletters.com/en/Channel-Letters-Numbers | prod |
| 8 | davessigns.com › Blog (Channel Letters 101) | guide | signmonkey.com/ | home |
| 9 | – | | signarama.com/products/channel-letters | franchise |

**AI Overview content (summarised):** channel letters are fabricated 3D letters or logos for storefronts and interiors. It covers aluminum returns with acrylic or polycarbonate faces, LED modules, and wall or raceway mounting. Visible sources: Dave's Signs, FastSigns, Wikipedia.

**Other features:**
- Images and PAA.
- Popular and More products (BacklitLEDsign, LED Sign City, elephantsignageshop, Lux Signage Co, BuySignLetters, SignsAtelier, Lightbox Shop, sunsignad).
- Bottom ads: jigsign.com, 4over4.com.
- **No local pack**, even though "near me" appears in related searches.

### 6. halo lit signs

Captured 15:50:01 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | halolitsigns.com (exact-match domain) | home (manufacturer) | impactsigns.com/halo-lit-sign/ | land/guide |
| – | Popular products (BacklitLEDsign, BannerBuzz, Woodland Manufacturing, Neon Signs Now, helloneonsign, AOOS), then PAA | | | |
| 2 | geminimade.com › letters-logos › lit-signage › cast-metal-halo-lit | manufacturer | davessigns.com/what-are-halo-lit-signs/ | guide |
| – | **AI Overview (mid-SERP)** (summary below) | AIO | | |
| 3 | woodlandmanufacturing.com › halo-lit-letters | prod (priced) | geminimade.com/…/cast-metal-halo-lit/ | manufacturer |
| 4 | bannerbuzz.com › … › LED Letters (halo lit acrylic letters) | prod | bannerbuzz.com/halo-lit-acrylic-letters/p | prod |
| 5 | davessigns.com › Blog (What Are Halo Lit Signs?) | guide | pinterest.com/onthefasttrack/… | UGC |
| 6 | ledbacklitsigns.com › halo-lit-signs | land | woodlandmanufacturing.com/halo-lit-letters.html | prod |
| 7 | pinterest.com › onthefasttrack › … | UGC | tuppsigns.com/illuminated-signs-understanding-backlit-halo-lit-… | guide |
| 8 | Video, "How to make halo lit channel letters bright…" (7.5K views, 5 years old) | video | halolitsigns.com/ | home |
| 9 | – | | luxsignage.co/collections/halo-lit-channel-letters | cat |

**AI Overview content (summarised):** halo lighting throws LED light from behind opaque letters onto the wall. It lists materials (aluminum, stainless, acrylic) and LED colours, and has a truncated pricing bullet. Visible source label: "Halo Lit Signs +2".

**Other features:** bottom ad jigsign.com.

### 7. backlit signs

Captured 15:50:45 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | backlitledsign.com › products › backlit-office-sig… | prod | signazon.com/backlit-signs/ | cat |
| 2 | squaresigns.com › Products (backlit decal signs) | prod (print) | impactsigns.com/sign-letters/backlit/ | land |
| 3 | signazon.com › Window Decals (backlit signage / lightbox) | cat | amazon.com/Backlit-Signs/s | mkt |
| – | Sponsored block (backlit exhibits) | ads | | |
| 4 | customneon.com › led-halo-backlit-signs | land | squaresigns.com/product/backlit-decal-signs/ | prod |
| 5 | impactsigns.com › Sign Letters (backlit channel letters) | land | customneon.com/led-halo-backlit-signs/ | land |
| 6 | pinterest.com › thomasutley0456 › … | UGC | pinterest.com/thomasutley0456/backlit-signage/ | UGC |
| 7 | signarama.com › products › led-backlit-signs | franchise | lindosign.com/illuminated-channel-letters-2/back-lit-signs-letters/ | cat |
| 8 | Video, "Making a LED Backlit Sign…" (6K views) | video | backlitledsign.com/products/illuminated-business-signs-custom-backlit-sign | prod |
| 9 | amazon.com › Backlit-Signs (search) | mkt | backlitledsign.com/products/backlit-office-signs-led-backlit-logo-3d-metal-sign | prod |

**Other features:** Popular products (BacklitLEDsign, Square Signs, helloneonsign, Make Neon), More products, Images, PAA. No AI Overview.

**Mixed intent:** results cover printed decals and lightboxes (Square Signs, Signazon), halo and backlit letters (Custom Neon, Impact Signs, Signarama) and product sellers.

### 8. front lit channel letters

Captured 15:50:49 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | **PAA at top of results** | PAA | | |
| 1 | directsignwholesale.com › Products (front lit trimmed) | wholesale prod | etsy.com/listing/1407085841/… | mkt |
| 2 | customneon.com › front-lit-signs | land | customneon.com/front-lit-signs/ | land |
| 3 | backlitledsign.com › products › 3d-illuminated-let… | prod | pinterest.com/pin/… | UGC |
| – | Sponsored block (edge-lit channel letters) | ads | | |
| 4 | en.cosunsign.com › product › front-lit-channel-let… | manufacturer (CN) | en.wikipedia.org/wiki/Channel_letter | ref |
| – | Popular products (Lux Signage Co, Selegna Signs, Channel Letters, SignsAtelier, Vaha Visuals, AOOS, Sign in Global) | shopping | | |
| 5 | nextlevelcustomsigns.com › cl-fl | prod | selegnasigns.com/products/front-lit-channel-letters | prod |
| 6 | selegnasigns.com › products › front-lit-chan… | prod | directsignwholesale.com/products/front-lit-channel-letters/ | wholesale |
| 7 | classicclw.com › front-lit | wholesale manufacturer | en.cosunsign.com/product/front-lit-channel-letter-sign/ | manufacturer |
| 8 | etsy.com › … › Signs (front lit listing) | mkt | nextlevelcustomsigns.com/pan-channel-letters-front-lit-p/cl-fl.htm | prod |
| 9 | ledsigncity.com › products › channel-letter-signag… | prod | ledsigncity.com/products/channel-letter-signage-custom-sizes-and-styles | prod |

**Other features:** More products. No AI Overview, no local pack.

### 9. dual lit channel letters

Captured 15:50:53 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | directsignwholesale.com › Products (front & back lit) | wholesale prod | lindosign.com/product/dual-lit-channel-letters/ | prod (CN) |
| – | **AI Overview** (summary below) | AIO | | |
| 2 | classicclw.com › dual-lit | wholesale manufacturer | en.cosunsign.com/news/benefits-of-front-and-halo-lit-… | blog |
| – | PAA; sponsored block (edge-lit) | | | |
| 3 | en.cosunsign.com › news › benefits-of-front-and-… | blog | channelletter.com/front-and-back-lit-channel-letters/ | wholesale |
| 4 | channelletterdepot.com › benefits-of-front-and-ha… | blog | directsignwholesale.com/products/front-halo-lit-channel-letters/ | wholesale |
| 5 | giantsign.com › filter › dual-lighted | portfolio archive | giantsign.com/tag/dual-lit-channel-letters-sign/ | archive |
| – | Popular products (Channel Letters, Lux Signage Co, Vaha Visuals, BacklitLEDsign) | shopping | | |
| 6 | Video, "dual lit with dual color rgb trimless…" (400+ views) | video | emntsigns.com/dual-lit-channel-letters | land |
| 7 | backlitledsign.com › collections › face-lit-channel… | cat | classicclw.com/dual-lit/ | wholesale |
| 8 | channelletters.in › products › custom-3d-le… | prod (IN) | giantsign.com/filter/dual-lighted/ | archive |
| 9 | – | | channelletterdepot.com/benefits-of-front-and-halo-lit-… | blog |

**AI Overview content (summarised):** dual-lit means face light plus a rear halo, possibly in different colours, run from one LED system. It also lists materials.

**Observations:**
- Two domains rank an article with the **same title**. This looks like syndicated or duplicated content (inferred).
- The video in the results has only about 400 views, so video competition here is weak (inferred).

### 10. 3d metal logo sign

Captured 15:51:38 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | backlitledsign.com › products › custom-stainless-s… | prod | etsy.com/shop/Businessign3Dmetal | mkt |
| – | Popular products (BacklitLEDsign, Neon Signs Now, Make Neon, Luckyneon), More products ×2, Images | | | |
| 2 | etsy.com › shop › Businessign3Dmetal | mkt shop | luckyneon.com/products/custom-logo-3d-metal-backlit-signs-… | prod |
| 3 | amazon.com › clp (custom 3D metal backlit sign) | mkt | isledsign.com/product-item/custom-3d-metal-signs/ | prod |
| 4 | crafted3dsigns.com › collections › business… | cat | lindosignage.com/products/3d-metal-signs/ | prod |
| 5 | shieldcoart.com | home | backlitledsign.com/collections/3d-metal-logo-signs | cat |
| 6 | businesssign.com › 3d-metal-signs | cat | backlitledsign.com/products/waterproof-3d-custom-metal-signs | prod |
| 7 | luckyneon.com › products › custom-logo-3… | prod | backlitledsign.com/collections/3d-metal-letters-logos | cat |
| 8 | pinterest.com › ideas › custom-3d-metal-si… | UGC | backlitledsign.com/products/metal-office-signage-… | prod |
| 9 | artsigns.com | home | backlitledsign.com/products/business-sign-3d-letters-… | prod |

**Other features:** **no PAA, no AI Overview, no ads**. 5 related searches.

**Observation:** WebSearch returned five URLs from backlitledsign.com.

### 11. acrylic logo sign

Captured 15:51:42 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | **Top ads:** architecturalsigns.com, imprintplus.com, clearviewplastic.com, 4over4.com | ads | | |
| 1 | squaresigns.com › Products (custom acrylic signs) | prod | etsy.com/market/acrylic_logo_sign | mkt |
| – | Popular products (Vistaprint, Impact Signs, Noeli Creates, A Custom Shop, UPrinting, speedyorders, engravedhappyism) | shopping | | |
| 2 | signs.com › acrylic | prod | impactsigns.com/business-signs/acrylic-logos/ | cat |
| 3 | vistaprint.com › … › Rigid Signs | prod | signs.com/acrylic/ | prod |
| – | Sponsored block (acrylic office logo signs) | ads | | |
| 4 | backlitledsign.com › products › custom-acrylic-si… | prod | axiomprint.com/product/acrylic-business-signs-976 | prod |
| 5 | amazon.com › custom-acrylic-signs-business | mkt | fastsigns.com/products/materials/acrylic-signs/ | franchise |
| – | More products; PAA | | | |
| 6 | printleaf.com › Signs & Banners › Signs | prod | squaresigns.com/product/acrylic-signs/ | prod |
| 7 | office.fedex.com › … › acrylic-signs | prod | cottonandcanvasco.com/products/custom-business-logo-acrylic-sign | prod |
| 8 | Video, "How To Make Acrylic Signage Using [UV printer]" (25.5K views) | video | crafted3dsigns.com/products/acrylic-laser-cut-3d-round-logo-sign-… | prod |
| 9 | Ideas board, "…Raised Letters ideas" (1 day ago; no domain captured; format suggests Pinterest, inferred) | UGC | backlitledsign.com/products/custom-acrylic-signs-acrylic-cut-letters | prod |

### 12. uv printed acrylic sign

Captured 15:51:46 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | **Top ads:** ccpdisplays.com, clearviewplastic.com, imprintplus.com, 4over4.com | ads | | |
| – | Popular products at top (Vistaprint, Neon Signs Now, Etsy sellers, Square Signs, LambsGarage, PrintDrill, Product Label Queen, Impact Signs) | shopping | | |
| 1 | custommadebetter.com › products › custom-… (UV printed signs) | prod | signs.com/acrylic/ | prod |
| 2 | displays2go.com › Custom Sign Printing | cat | squaresigns.com/product/acrylic-signs/ | prod |
| – | More products; Videos module; PAA | | | |
| 3 | printleaf.com › Signs & Banners › Signs | prod | displays2go.com/C-29605/Custom-Acrylic-Signs-Full-Color-UV-Printing | cat |
| – | Images | | | |
| 4 | customneon.com › uvprint (LED + UV printed signs) | land | printleaf.com/acrylic-signs/ | prod |
| 5 | Video, "Printing Acrylic Signs with a UV Printer" (33K views, 8 years old) | video | custommadebetter.com/products/custom-uv-printed-signs-… | prod |
| 6 | signs.com › acrylic | prod | luckyneon.com/collections/custom-logo-acrylic-business-sign-… | cat |
| 7 | etsy.com › … › Signs (UV printed acrylic logo sign listing) | mkt | luckyneon.com/products/uv-printing-acrylic-backlit-sign-… | prod |
| 8 | logojet.com › pages › printing-on-acrylic | info (printer maker) | sfacrylics.com/products/uv-printed-acrylic-signs | prod |
| 9–10 | – | | signsatwholesale.com/products/uv-printed-acrylic-signs; fastneonsigns.com/products/custom-acrylic-backlit-signs-… | wholesale; prod |

**Other features:** bottom ads 4over4.com and imprintplus.com.

### 13. slim led light box sign

Captured 16:14:21 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | displays4sale.com › collections › lightboxes-bac… (poster light boxes: backlit, edge-lit, LED) | cat | customneon.com/light-box-signs/ | land |
| – | Popular products, More products | shopping | | |
| 2 | lightboxshop.com › Outdoor Signs (Outdoor LED Light Boxes) | cat | lindosign.com/product-category/light-box-sign/ultra-slim-light-box/ | cat (CN) |
| – | More products | | | |
| – | **AI summary block (mid-SERP, no "AI Overview" heading)** (summary below) | AI | | |
| – | Sponsored block (backlit lightbox booths); Images; PAA | | | |
| 3 | blueriverdigital.com › lightboxes › low-profile-thi… | cat | 777sign.com/window-slim-led-light-box | wholesale prod |
| – | Videos module | | | |
| 4 | customneon.com › light-box-signs | land | lightboxshop.com/slim-led-light-box-48x96 | prod |
| 5 | displays2go.com › Backlit Poster Frames | cat | lightboxshop.com/slim-led-light-box-18x24 | prod |
| 6 | anythingdisplay.com › led-lightbox-sign | cat/land | lightboxshop.com/slim-led-light-box-48x72 | prod |
| 7 | YouTube · Maneki Signage, "How To Make Signage: Standard Lightbox" (68.5K views, 6 years old) | video | lightboxshop.com/led-lightbox-signs/slim-snap-frame-LED-light-boxes/ | cat |
| 8–9 | – | | prestigesigns.net/slim-led-light-box-signs/; backlitledsign.com/products/slim-double-sided-led-light-box-… | land; prod |

**AI summary content (summarised):** defines a slim lightbox as a frame under about an inch thick. It groups options into snap/poster frames, rimless acrylic logo signs and outdoor slim panels. It names vendors (Snap Frames 4 Sale, Neon Signs Now, Fast Neon Signs, Lightbox Shop) and cites Anything Display and Displays2Go.

**Shopping sellers and prices:** sunsignad $100, Lightbox Shop $725 / $475, DM Office Solutions $55.36, 123Displays $139, Neon Signs Now $11.20, Fastneonsigns $99, Lux Signage Co $103.99, crazyneon.com $129, MyDIYsigns $159.

**Observation:** Google and WebSearch differ sharply here (only 2 of 7 Google domains appear in WebSearch). Google favours **display-hardware retailers** selling poster and snap frames.

### 14. custom business signs

Captured 16:15:29 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | **Top ad:** bronzememorials.net | ads | | |
| 1 | signs.com | home | fastsigns.com/products/ | franchise hub |
| – | **Local pack:** 2 sign shops (Buford GA 4.9 (69); North Charleston SC 4.2 (105)) | local | | |
| 2 | businesssignsandmore.com › collections › custom-… | cat | smartpress.com/shop/custom-signs | cat |
| 3 | amazon.com › custom-signs-business | mkt | amazon.com/custom-signs-business/s | mkt |
| 4 | vistaprint.com › signs-posters | cat | vistaprint.com/signs-posters | cat |
| – | Sponsored block (business signage near you); Popular products; PAA | | | |
| 5 | fastsigns.com › products | franchise hub | impactsigns.com/product-category/outdoor-signs/ | cat |
| 6 | smartsign.com › custom-signs | cat | signs.com/ | home |
| 7 | signarama.com › categories › outdoor-signs | franchise | smartsign.com/custom-signs | cat |
| – | Images | | | |
| 8 | smartpress.com › shop › custom-signs | cat | squaresigns.com/ | home |
| 9 | impactsigns.com › product-category › outd… | cat | businesssignsandmore.com/collections/custom-business-signs | cat |

**Shopping sellers:** Vistaprint ($7.99–$24.99), SmartSign, Impact Signs $300, House Sensations Art, Pretty Perfect Studio, Lux Signage Co, 1-800-The-Sign.

### 15. reception logo sign

Captured 16:16:00 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | Popular products at top (BacklitLEDsign $25, Etsy – USArtsDesign $50, Etsy – Pupax $30, SignsAtelier $95, Impact Signs $300, Etsy – Seller $30, Luckyneon $513.90, Create Neon $350); Images | | | |
| 1 | impactsigns.com › custom-office-signs | cat/land | etsy.com/market/reception_logo_sign | mkt |
| 2 | signarama.com › products › reception-signs | franchise | etsy.com/market/reception_sign_logo | mkt |
| 3 | pinterest.com › ryansignpro › reception-sig… | UGC | signsnow.com/reception-signs | franchise |
| 4 | easysigns.com › Products (acrylic reception signs) | prod | pinterest.com board | UGC |
| 5 | etsy.com › market › reception_logo_sign | mkt | signsbytomorrow.com/rockville/signs/reception-and-office-signage | franchise local |
| 6 | magnific.com › free-photos-vectors › rece… | stock images | businesssignsandmore.com/products/custom-business-logo-sign | prod |
| 7 | mariettasigns.com › blog-news-and-updates | blog (local sign co) | easysigns.com/products/details/acrylic-reception-panel-signs | prod |
| 8 | greendotsign.com › OFFICE SIGNS | cat | spectrumsigns.com/reception-signs/ | local sign co |
| 9 | 3dcustomwallsigns.co.uk › how-3d-logo-signs-el… | guide (UK domain) | highvaluesigns.com/lobby-signs/ | land |

**Other features:** **no PAA, no ads, no local pack.** The SERP is fragmented: a stock-image site and a UK domain both rank in the US top 10.

### 16. restaurant neon signs

Captured 16:16:31 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | customneon.com › signs-for-sale › cafe-restaurant | cat | bannerbuzz.com/restaurant-neon-signs/p | prod |
| – | Popular products (NeonChamp $27.99, customneon.com $61 / $134 / $200, Neon Signs Now $70.72, Create Neon $300, BannerBuzz $401, Echo Neon $420, Luckyneon $50, neoneverglow.de); More products | | | |
| 2 | bannerbuzz.com › … › Business Neon Signs | prod | amazon.com/Neon-Restaurant-Signs/s | mkt |
| – | Images; **AI Overview loading placeholder** (content not captured) | | | |
| 3 | amazon.com › Neon-Restaurant-Signs | mkt | pinterest.com/ideas/… | UGC |
| – | PAA | | | |
| 4 | spellbrite.com › shop › restaurant-business-… | cat | customneon.com/signs-for-sale/cafe-restaurant/ | cat |
| 5 | crazyneon.com › collections › restaurant-neon-si… | cat | customneon.com/dining-fast-food/ | land |
| 6 | YouTube · Eater, "How Neon Signs Are Made for Restaurants" (709K views, 8 years old) | video | spellbrite.com/shop/restaurant-business-led-neon-signs/ | cat |
| 7 | echoneon.com › restaurant-neon-signs | land | crazyneon.com/collections/restaurant-neon-signs | cat |
| 8 | customneon.com › dining-fast-food (second Custom Neon URL) | land | vitalneon.com/blog/best-neon-signs-for-restaurants-and-cafes | blog |
| 9 | – | | echoneon.com/restaurant-neon-signs/ | land |

### 17. salon neon sign

Captured 16:17:06 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | customneon.com › signs-for-sale › beauty-nail-hai… | cat | yellowpop.com/collections/neons-for-beauty-salons-spas | cat |
| 2 | yellowpop.com › collections › neons-for-be… | cat | pinterest.com/neonsignsdepot/hair-salon-neon-signs/ | UGC |
| – | Popular products (NeonChamp from $27.99, Echo Neon $95, BannerBuzz $188–$230, Best Of Signs $111.44, Jantec Neon Products $349) | | | |
| – | **AI Overview (mid-SERP)** (summary below); More products | | | |
| 3 | amazon.com › hair-salon-neon-sign | mkt | bestofsigns.com/beauty-salon-neon-sign.html | prod |
| – | PAA | | | |
| 4 | orantneon.com › hair-salons-barbershops | cat | customneon.com/signs-for-sale/beauty-nail-hair-salons/ | cat |
| 5 | crazyneon.com › collections › salon-neon-signs | cat | crazyneon.com/collections/salon-neon-signs | cat |
| 6 | pinterest.com › ideas › neon-sign-in-salon | UGC | neonchamp.com/hair-salon-neon-signs | cat |
| 7 | bestofsigns.com › … › LED Neon Signs | cat/prod | beautyspaexpo.com/collections/salon-neon-signs | cat |
| 8 | amazon.com › live › video (Amazon Live video page) | mkt video | luckyneon.com/collections/gym-salon-neon-signs | cat |
| 9 | – | | orantneon.com/collections/hair-salons-barbershops | cat |

**AI Overview content (summarised):** shopping-style. It says salon signs can be bought online, names BannerBuzz and NeonChamp as example providers, and lists price tiers starting with basic LED signs.

**Other features:** bottom ad getcustomneonsigns.com.

### 18. gym neon sign

Captured 16:17:40 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | Popular products at top (Luckyneon $50, NeonChamp $27.99, CommerceSigns $169, Walmart – LEDNO1 $39.99, HexaGara $300, customneon.com $61) | | | |
| 1 | customneon.com › signs-for-sale › gym-fitness | cat | yellowpop.com/collections/neons-for-gyms | cat |
| – | More products | | | |
| 2 | crazyneon.com › collections › gym-neon-signs | cat | amazon.com/…/dp/B0DGG6BNV7 | mkt |
| 3 | neonchamp.com › gym-neon-sign | cat | etsy.com/market/fitness_neon_sign | mkt |
| 4 | yellowpop.com › neons-for-gyms | cat | radikalneonsigns.com/neon-signs-for-businesses/gyms/ | cat |
| 5 | pinterest.com › … › Fitness Neon Sign | UGC | customneon.com/gym-neon-signs/ | land |
| 6 | amazon.com › fitness-neon-sign | mkt | pinterest.com/ideas/… | UGC |
| – | PAA | | | |
| 7 | pinterest.com › … (second Pinterest URL) | UGC | crazyneon.com/collections/gym-neon-signs | cat |
| 8 | etsy.com › market › fitness_neon_sign | mkt | neonchamp.com/gym-neon-sign | cat |
| 9 | radikalneonsigns.com › gyms | cat | luckyneon.com/products/custom-gym-neon-signs | prod |

**Other features:** bottom ad getcustomneonsigns.com.

### 19. wedding neon sign

Captured 16:13:43 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | Popular products at top (**Etsy sellers ×5**: "Etsy – Seller" $60 and $50, NeonSignCustomKing $65, HouseOfRounds $30, JaxleyDesign $50; Walmart – Seller $59.99; NeonChamp $27.99; Vinacustom $25.90) | | | |
| 1 | customneon.com › signs-for-sale › wedding-signs | cat | theknot.com/content/neon-signs | editorial |
| 2 | crazyneon.com › collections › wedding-neon-signs | cat | amazon.com/Neon-Wedding-Signs/s | mkt |
| – | Images | | | |
| 3 | neonsigns.com › custom-wedding-neon-sig… | cat | customneon.com/signs-for-sale/wedding-signs/ | cat |
| 4 | amazon.com › Neon-Wedding-Signs | mkt | neonsigns.com/us/custom-wedding-neon-signs | cat |
| – | PAA | | | |
| 5 | thelovelyglassjar.com (custom-made signs + USA rentals) | home | in.pinterest.com/pin/… | UGC |
| 6 | theknot.com › … › Themes & Decor (18 ideas) | editorial | crazyneon.com/collections/wedding-neon-signs | cat |
| 7 | brides.com › gallery › neon-wedding-signs (25 ideas) | editorial | neonchamp.com/wedding-neon-signs | cat |
| 8 | neonchamp.com › wedding-neon-signs | cat | thelovelyglassjar.com/ | home |
| 9 | briteliteneon.com › collections › milestones | cat | walmart.com/ip/970348348 | mkt |

**Other features:** bottom ads getcustomneonsigns.com and neonsignlife.com. No AI Overview.

### 20. bedroom neon signs

Captured 16:18:13 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| 1 | yellowpop.com › collections › neons-for-be… | cat | yellowpop.com/collections/neons-for-bedroom | cat |
| – | Popular products (customneon.com $61, Etsy – CandyledneonsignShop $56, NeonChamp $28 / $157, Echo Neon $95, Yellowpop US $319, Etsy – CaravelleDecor $18, Urban Outfitters $151 / $208, Etsy – Seller $50) | | | |
| 2 | customneon.com › signs-for-sale › home-decor | cat | amazon.com/neon-signs-bedroom/s | mkt |
| – | More products | | | |
| 3 | crazyneon.com › collections › neon-signs-for-ro… | cat | radikalneonsigns.com/neon-signs-for-home/bedroom/ | cat |
| 4 | amazon.com › neon-signs-bedroom | mkt | pinterest.com/ideas/… | UGC |
| – | Images; PAA | | | |
| 5 | neonchamp.com › neon-signs-for-bedroom | cat | customneon.com/bedroom-signs/ | land |
| 6 | radikalneonsigns.com › bedroom | cat | pinterest.com/ideas/… | UGC |
| 7 | Pinterest · customneon board ("95 Neon Lights for Kids' Rooms ideas") | UGC | customneon.com/signs-for-sale/home-decor/ | cat |
| 8 | orantneon.com › News (101+ bedroom ideas) | blog | crazyneon.com/collections/neon-signs-for-room | cat |
| – | **"What people are saying"** (trending posts and discussions) | UGC module | neonchamp.com/neon-signs-for-bedroom; orantneon.com/blogs/news/neon-sign-bedroom-ideas | |

### 21. personalized neon bar signs

Captured 16:18:48 UTC.

| Pos | Google | Type | WebSearch | Type |
|---|---|---|---|---|
| – | Popular products at top (Make Neon $39, customneon.com $61, NeonSignly $189, NeonChamp from $27.99, CanvasChamp $59, Dope Neons $105) | | | |
| 1 | customneon.com › signs-for-sale › bar-signs | cat | amazon.com/clp/B09BD9Z7MQ | mkt |
| 2 | amazon.com › custom-bar-neon-sign | mkt | amazon.com/custom-neon-bar-signs/s | mkt |
| – | More products | | | |
| 3 | neonsigns.com › … (homepage) | home | customneon.com/home-bar-signs/ | land |
| – | More products; Images; PAA | | | |
| 4 | crazyneon.com › collections › neon-bar-signs | cat | customneon.com/signs-for-sale/bar-signs/ | cat |
| 5 | dopeneons.com › collections › the-bar | cat | yellowpop.com/ | home |
| 6 | neonchamp.com › personalized-neon-bar-s… | cat | crazyneon.com/collections/neon-bar-signs | cat |
| 7 | YouTube · Khaist Neon Arts, "How to make Neon Sign for Lounge Bar…" (58.1K views) | video | neonchamp.com/personalized-neon-bar-signs | cat |
| 8 | lamomoneon.com › collections › business | cat | lamomoneon.com/collections/business | cat |
| 9 | pinterest.com › ideas › backlit-bar-sign | UGC | neonsigns.com/us/ | home |

### Brand visibility check for The Glownique

- theglownique.com appeared in **none** of the 21 Google page-1 SERPs and none of the 21 WebSearch result sets.
- For branded queries it is indexed. In WebSearch, `"The Glownique" neon signs` and `theglownique custom neon sign` both returned theglownique.com/products/custom-neon-signs.
- `site:theglownique.com` in WebSearch returned only unrelated sites. That is a limitation of the engine, not proof the site isn't indexed.
- The branded WebSearch also surfaced a **public GitHub repository of the site's code** (github.com/Huzaifa4412/theglownique). Worth checking whether it should be public or indexable. (Inferred risk: an indexable duplicate of site copy.)

---

## (c) Deep dives

**How to read the numbers:**
- **Word counts** are approximate visible text, including nav and footer. They come from server-rendered HTML via `analyze_page.py`, or from the rendered DOM for Yellowpop, The Knot and Blue River.
- **FAQ lists** come from on-page FAQ blocks (via WebFetch or raw-HTML headings) or from FAQPage JSON-LD where present.
- **Headings** are abbreviated.
- **"Why it ranks"** notes are inferred.

### DD1: "custom neon signs"

The top 3 organic results are neonsigns.com/us/, yellowpop.com and neonchamp.com. I added customneon.com (#4) because it recurs across the whole keyword set.

#### A. neonsigns.com/us/ (Google #1)

- **Page type:** brand homepage acting as the main custom-neon landing page (e-commerce + design tool + quote).
- **Title:** "Neon Signs, Custom Neon Signs | 50% Off - {Lowest Price}". **H1:** "NEON SIGNS".
- **H2 outline (14):** categories → neon technology → customer gallery → ready-to-customise signs → colour panel → add-on options → about custom neon → 3 colour types → quality details → installation → market leader → FAQ → unboxing → closing.
- **Size of page:** ~2,400 words, 183 images, 0 tables.
- **Pricing:** entry price "from $42.58" for simple text under 24". The Offer schema says 41, a small mismatch.
- **Size guidance:** minimal. The only anchor is "under 24 inches".
- **Specs / comparison:** compares 3 colour types (static, RGB 7-colour, RGB gradient) and has a construction section. Neither is an HTML table.
- **FAQs (~16, no FAQPage schema):**
  - cost
  - certifications
  - rush orders
  - international shipping
  - cancelling or changing an order
  - multiple packages
  - warranty
  - damage on delivery
  - returns and refunds
  - materials
  - waterproofing
  - what's included
  - how signs are made
  - free design service
  - fonts
  - animated vs regular
- **Reviews:** Shopper Approved 4.9 from 2,095 reviews, also in AggregateRating schema. This matches the star rich result in the SERP.
- **Gallery:** about 24 customer photos.
- **CTAs / flow:**
  - "Get Instant Quote"
  - design tool ("3 minutes") plus an AI design tool
  - free proof within 12 hours
  - approval before production
  - rush option
- **Trust signals:** 2-year warranty; FCC / UL / CE / RoHS / Prop 65 badges; 24/7 support; PayPal, Affirm and ACH.
- **Schema:** LocalBusiness, Organization, Product + Offer (with **OfferShippingDetails** and **MerchantReturnPolicy**), AggregateRating, Review.
- **Why it ranks (inferred):** an instant design and quote path, a visible entry price, stars in the SERP, and hub links to every use case (business, wedding, bar, home, outdoor). One URL covers the whole head term.

#### B. yellowpop.com (Google #2)

- **Page type:** brand homepage covering art collaborations, custom neon and B2B.
- **Title:** "Custom Neon Signs - Led sign - Best Quality | YELLOWPOP – YELLOWPOP". **H1:** "LIGHTEN UP YOUR SPACE WITH A LED NEON SIGN".
- **H2 outline (13):** product finder → PopBox → new → MLB → artist best-sellers → artists → light up your brand (B2B) → text editor → custom neon → how it works → reviews → service promise → still not sure.
- **Size of page:** ~2,560 words (rendered), 324 images.
- **Pricing:** shown in PKR because of the browser's location, so USD is unobserved. The SERP snippet showed free delivery over $49 and 14-day returns.
- **Missing on homepage:** no size guide, no spec table, no FAQ, no FAQ schema.
- **Reviews:** "4.9 (1900+ ratings)" header and a Trustpilot carousel.
- **Flow (4 steps):**
  1. Design in the editor.
  2. Get a price: instant for text, team quote for complex designs.
  3. Pay through a secure link.
  4. Free worldwide shipping in 2–3 weeks, or 7–12 days paid.
- **B2B path:** upload a logo and get a free quote within 24 hours.
- **Schema:** Organization, WebSite, BreadcrumbList, Brand.
- **Why it ranks (inferred):** brand authority (artist and MLB licences), plus an editor-first text path and a quote path for logos. Its quote-then-pay-by-link flow is the closest structural match to Glownique's WhatsApp-quote-then-Etsy flow.

#### C. neonchamp.com (Google #3)

- **Page type:** brand homepage / landing page.
- **Title:** "Custom Neon Signs | 50% Off - Lowest Price | Neon Signs". **H1:** "Custom Neon Signs".
- **H2 outline (17):** promotions → design with us → testimonials → shop → US supplier → categories → the difference → **NeonChamp vs other competitors** → brand logos → glow options → colours → installation → knowledge base → buying guide → future of LED neon.
- **Size of page:** ~4,200 words, 52 images.
- **Pricing:** "start price $27.99". The FAQ quotes a typical range of about $150–$2,000.
- **Size guidance:** none as a chart; size is a field in the quote form.
- **Comparison table:** NeonChamp vs competitors on price/quality, support, warranty, noise and delivery.
- **FAQs (9, marked up as FAQPage):**
  - How to make LED neon signs?
  - Neon vs LED?
  - Cost?
  - How to hang?
  - Lifespan?
  - How to create your own?
  - Why expensive?
  - How made?
  - Who makes them near me?
- **Reviews:** Product schema claims AggregateRating 4.7 from 244,432. WebFetch saw a Reviews.io badge of about 4.1. The inconsistency is recorded as observed.
- **Flow:** three paths (design text / upload logo for a free quote and mockup / ready-made). Buy now, pay later.
- **Trust signals:** 3-year warranty, ships in 7–9 business days, free remote and dimmer, brand logos.
- **Schema:** Organization, LocalBusiness, WebSite + SearchAction, WebPage + Speakable, Product ×16 (with Offer, AggregateRating, Review, MerchantReturnPolicy), FAQPage.
- **Why it ranks (inferred):** long-form copy and an FAQPage that answer the cost and how-to questions PAA shows, plus a very low entry price.

#### D. customneon.com (Google #4)

This domain also appears in Shopping at $61 and in the local pack (Custom Neon, LA, 4.9 from 702 reviews).
- **Page type:** homepage.
- **Title:** "Custom Neon™ Signs Custom Made LED Neon Lights Logos & Art USA & Canada". **H1:** "Custom Neon™ Signs The World's Best LED Neon Logos & Art".
- **Size of page:** ~1,760 words.
- **Tools:** an embedded design tool, and a 5-step quote form (upload → indoor/outdoor → size → **budget range** → contact).
- **Trust signals:** "4.9 Google rating" badge, 65,000+ customers, 2-year warranty, free shipping, unlimited revisions, ISA member.
- **FAQ:** none on the homepage.
- **Schema:** Organization, WebSite, WebPage / Speakable, MerchantReturnPolicy, OfferShippingDetails.
- **Why it ranks (inferred):** a strong brand and domain (in **14 of 21** Google SERPs, #1 on 5 of them), sitelinks, and a dedicated page for every use case.

### DD2: "custom logo neon sign"

Google #1 (neonsigns.com/us/), #2 (yellowpop.com) and #4 (customneon.com) are the **same homepages** analysed in DD1. #3 is an Amazon product page. No logo-specific page appears until #6–7, so the pages below are the logo-intent pages that rank.

#### A. bannerbuzz.com/custom-logo-neon-sign/p (Google #7; WebSearch #1)

- **Page type:** product page with a configurator.
- **Title:** "Custom Logo Neon Signs for Instant Brand Recognition | BannerBuzz". **H1:** "Custom LED Logo Neon Signs".
- **H2 outline:** benefit → features → mounting options → package contents → backboard shapes → install by hanging → install by wall mount → closing → contact → FAQ → reviews → also viewed.
- **Size of page:** ~2,800 words, 70 images, 1 table, 3 embedded YouTube install videos.
- **Pricing:** $147.30 shown (40% off $245.50).
- **Size guidance:** handled in the FAQ (backing size vs neon portion; custom sizes).
- **FAQs:**
  - backing vs neon size
  - custom size
  - rolled or folded delivery
  - wallet points
  - how to customise
- **Reviews:** 4.8 from 225 (AggregateRating plus 20 Review entries).
- **Flow:** upload logo → size / orientation / backboard → add to cart.
- **Trust signals:** 2-year warranty, free shipping, IP65, 24/7 phone line.
- **Schema:** Product, Offer, MerchantReturnPolicy, AggregateRating, Review, BreadcrumbList, Organization.
- **Why it ranks (inferred):** exact-match title and H1, a visible price, review stars and install videos.

#### B. kingsofneon.com (Google #6)

- **Page type:** homepage.
- **SERP title:** "Custom Neon Signs & Personalized Neon Lights". **H1:** "Kings Of Neon® USA".
- **Offer:** "free quote in 24 hours"; the SERP snippet promises a free 3D mock-up and quote within 24 hours.
- **Product mix (from H3s):** **neon, acrylic backlit, 3D channel letters, lightbox**. This is essentially Glownique's product mix.
- **Size of page:** ~2,180 words, 175 images, product prices from about $142 to $741.
- **FAQ:** none.
- **Schema:** Organization, WebSite, BreadcrumbList.
- **Why it ranks (inferred):** the same promise as Glownique (upload → free mockup → quote), carried by brand strength. **This is Glownique's closest positional competitor.**

#### C. customneon.com/business-signs-logo/ (Google #4 for "custom neon signs for business")

- **Page type:** B2B landing page.
- **Title:** "Custom Neon™ Business Signs | Made-to-Order LED Logos". **H1:** "Custom Neon® Business Signs & Logos".
- **Size of page:** ~2,930 words, 61 images.
- **Tools and assets:** design tool, a 5-step quote form with a budget field, **indoor and outdoor spec-sheet PDFs**, and a gallery of brand projects.
- **Pricing:** "start at $61".
- **Size guidance:**
  - measure the wall
  - consider viewing distance
  - largest single backboard is about 7'8" × 3'11"
- **FAQs (12, no FAQPage schema):**
  - what happens after a quote request
  - finished artwork needed?
  - file formats
  - exact logo conversion
  - cost
  - revisions
  - is the quote free?
  - timeline
  - indoor vs outdoor
  - what size to request
  - multiple locations
  - quick quote vs upload
- **Schema:** Organization, WebSite, WebPage, BreadcrumbList.
- **Why it ranks (inferred):** it answers the main B2B objections (artwork, revisions, cost, timeline) and shows big-brand proof.

### DD3: "channel letter signs"

An AI Overview sits at the top. The organic top results are buysignletters.com (#1), signmonkey.com (#2), Amazon (#3, skipped) and Wikipedia (#4, reference). **fastsigns.com (#5) was blocked by Cloudflare**, so ledsigncity.com (#7) and davessigns.com (#8) were added instead.

#### A. buysignletters.com/en/Channel-Letters-Numbers (Google #1)

- **Page type:** product page with a configurator (text, 60+ fonts, heights 6"–36", LED toggle).
- **Title:** "Channel Letters | Order Online | Buysignletters.com Custom Sign Letters & Numbers | Metal, Acrylic & Plastic | BuySignLetters".
- **Headings:** several H1s used as section labels (mounting methods, install PDFs, ordering), and one H2 (installation videos).
- **Size of page:** ~2,660 words, 162 images, 1 table, **no JSON-LD**.
- **Pricing:** LED add-on +$125; free shipping over $100. No base price in the static HTML; price likely appears after configuration (inferred).
- **Specs:** 304 / 316 stainless, finishes, 7 mounting methods, install PDFs and videos.
- **FAQ:** none on the page.
- **Reviews:** a "Five Star Service" badge only.
- **Trust signals:** lifetime guarantee, UL, "authorized Gemini supplier since 2001", made in USA, 12–15 business-day production. Recommends a licensed electrician for hook-up.
- **Why it ranks (inferred):** a direct online-order configurator plus deep install support from a long-standing specialist domain.

#### B. signmonkey.com (Google #2)

- **Page type:** homepage (design, price and buy online).
- **Title:** "Custom Storefront Signs | Channel Letters, Cabinet Signs & More". **H1:** "Custom Signs You Can Design, Price, and Buy Online".
- **Page structure:** 5-day production → easy install → factory direct → real signs gallery → product finder → lit channel letters (face, halo, combination, reverse lit) → lit shapes → cabinets → dimensional letters.
- **Size of page:** **~340 words (thin)**, 51 images.
- **Schema:** Organization only.
- **Pricing:** instant online pricing through the builder.
- **FAQ:** none.
- **Reviews:** Trustpilot badge link only.
- **Trust signals:** 5-day production with a ship-by date, free shipping*, UL file number, DIY-install messaging, built in USA.
- **Why it ranks (inferred):** instant pricing and checkout for a product normally sold by quote. It is a **ship-only, DIY-install model ranking #2**.

#### C. ledsigncity.com product (Google #7)

- **Title / H1:** "Front Lit Channel Letter Signage – Custom Sizes and Styles".
- **Size of page:** ~430 words.
- **Pricing:** $345, with ProductGroup / AggregateOffer variants from $345 to $1,020+.
- **Reviews:** "5.0 based on 107 reviews".
- **Gallery:** day and night photos of real installs.
- **Flow:** add to cart, plus an instant-quote subdomain.
- **FAQ:** none.

#### D. davessigns.com/channel-letters-101-need-to-know/ (Google #8; cited in the AI Overview)

- **Page type:** guide on a local sign company's blog (Ventura CA, plus "nationwide").
- **Size of page:** ~4,690 words.
- **H2 outline:** definition → where used → why → **five types** (front, halo/reverse, open face, backlit, combination) → materials → **five mounting options** → next steps.
- **Schema:** Article (updated 07/10/2026).
- **CTAs:** phone and quote request.
- **Pricing / FAQ:** none.

#### E. fastsigns.com (Google #5)

Not analysable because of the Cloudflare block. It is a national franchise product page and is cited in the AI Overview.

### DD4: "halo lit signs"

The top 3 organic results are halolitsigns.com, geminimade.com and woodlandmanufacturing.com.

#### A. halolitsigns.com (Google #1)

- **Page type:** exact-match-domain homepage of a halo-lit sign manufacturer. The page content indicates production in China (per WebFetch summary).
- **Title:** "Custom Halo Lit Signs, Reverse/Halo Lit Channel Letter Sign". **H1:** "Halo Lit Signs".
- **H2 outline (16):** about → sample cases → custom → models → outdoor → workflow → personalised → FAQ → why us → reviews → contact → about → suppliers → delivery → payment.
- **Size of page:** ~5,250 words, 37 images.
- **Pricing:** quote only (schema Offer price 500).
- **Size guidance:** a visibility rule of thumb (about 100× the letter height; e.g. 24" letters for about 200 ft).
- **Models:** 7 model types, each with construction notes (not a table).
- **FAQs (~21):**
  - lead time
  - on-time delivery
  - location
  - white vs warm white
  - 110–120 VAC
  - order changes
  - proof before delivery
  - visibility distance
  - vector files
  - design help
  - fonts
  - card payments and security
  - cancellation
  - payment terms
  - proof before paying
  - rush orders
  - plating
  - installation services
  - where it can be installed
  - LED renewal
- **Reviews:** 6 testimonials, plus AggregateRating 4.8 from 785 in schema.
- **Gallery:** 9 luxury-brand case studies.
- **Flow (6 steps):**
  1. Send a vector file.
  2. Quote within 1 working day.
  3. Payment.
  4. About 15 days of production.
  5. Courier delivery.
  6. 3-year warranty.
- **Schema:** WebSite, Organization, Product, Offer, AggregateRating, Review.
- **Why it ranks (inferred):** exact-match domain, deep topical coverage and a transparent process for remote ordering. It is the **closest analogue to Glownique's remote model**, and it ranks #1 with no local presence.

#### B. geminimade.com/…/cast-metal-halo-lit/ (Google #2)

- **Page type:** manufacturer product-line page (sells through partners).
- **Title:** "Lit Cast Metal Halo Lit Letters & Logos - Gemini". **H1:** "Lit Cast Metal – Halo Lit".
- **Size of page:** ~670 words including nav; the body copy itself is only about 80–100 words. 10 images.
- **Missing:** no pricing, no FAQ, no reviews.
- **CTA:** "find a partner".
- **Trust signals:** lifetime guarantee, UL.
- **Schema:** WebSite, Organization, WebPage, BreadcrumbList, ImageObject.
- **Why it ranks (inferred):** manufacturer brand authority. "Gemini Halo Lit letters" appears as a related search.

#### C. woodlandmanufacturing.com/halo-lit-letters.html (Google #3)

- **Page type:** product page with a letter designer.
- **Title:** "Halo Lit Letters - Custom Halo Signs | Woodland Manufacturing". **H1:** "Halo Lit Letters". No H2s. H3s cover specs, warranty and reviews.
- **Size of page:** ~1,030 words, no JSON-LD.
- **Pricing:** a **price table by letter height** (12"–45"), about $221–$1,477 per character.
- **Size guidance:** letter height is measured on the capital "A".
- **Specs:** UL LED package, 4 colours, mounting hardware, warranty (5 years LED, 2 years power supply).
- **Reviews:** none yet.
- **Flow:** designer → add to cart.
- **Why it ranks (inferred):** transparent per-letter pricing and UL specs for ready-to-buy searchers.

### DD5: "slim led light box sign"

Google's top 3 are all display-hardware retailers: displays4sale.com, lightboxshop.com (outdoor category) and blueriverdigital.com. customneon.com is #4. The WebSearch-ranked pages (Custom Neon's lightbox page, Lindo Sign, Lightbox Shop's slim category) are covered as supplementary.

#### A. displays4sale.com/collections/lightboxes-backlit-edgelit-led-light-boxes (Google #1)

- **Page type:** large collection page (Shopify-style store) for poster lightboxes.
- **Titles:** the HTML title is "Light-Up Poster Boxes & Sign Displays – Displays4Sale". Google showed the H1 instead: "Poster Light Boxes | Backlit | Edge-lit | Led Light Boxes". This is a **Google title rewrite** to the H1.
- **Headings:** no meaningful H2s. H3s are only "Featured Categories" and "Browse All Products".
- **Size of page:** ~11,400 words, mostly product-card specs. 84 images.
- **Pricing:** "From $X" on every card, about $194–$2,241 (per WebFetch).
- **Size guidance:** extensive. Poster sizes from 8.5×11" to 48×72"; frame depth from 0.75" (slim edge-lit) to 5.5"; graphic thickness notes.
- **Specs on cards:** profile width, depth, finish, LED output (lux, 5300K).
- **Missing:** no FAQ, no reviews.
- **CTAs:** "View options & pricing" on each product; a request-a-quote page for custom sizes.
- **Trust signals:** 2-year limited warranty, UL, free ground shipping, 1–2 day quick-ship on some items.
- **Schema:** Organization only.
- **Why it ranks (inferred):** a huge, spec-dense catalogue covering every size and depth. The "slim" intent is met through the edge-lit 1–2" options.

#### B. lightboxshop.com/outdoor-lightbox-sign/outdoor-light-box-signs/ (Google #2)

Lightbox Shop also holds four WebSearch results through its slim category and size-specific product pages.
- **Page type:** category page (outdoor LED light boxes).
- **Title:** "Outdoor Light Boxes by Lightbox Shop". **H1:** "Outdoor LED Light Boxes".
- **Size of page:** ~3,560 words, 98 images.
- **Pricing:** mostly $1,181–$1,850 per box.
- **Other:** product compare tool; note on custom shapes.
- **Schema:** WebSite, Organization, BreadcrumbList.
- **Observation:** Google chose the *outdoor* category, not the slim snap-frame one. Related searches point the same way ("Slim led light box sign outdoor", "Outdoor lighted sign boxes for businesses", "4x8 lighted sign box").

**Supplementary: Lightbox Shop's slim snap-frame category (WebSearch #7)**
- ~2,400 words.
- **Price per standard size:** $175 (16×20") to $1,975 (48×96"), across 10 standard sizes plus custom.
- **Reviews:** Shopper Approved badge (34,049 reviews).
- **Trust signals:** UL, ADA, free shipping in the contiguous US; art upload and proof after purchase.
- **Inconsistency:** 2-year warranty on the page vs "5-year" in the meta description.

#### C. blueriverdigital.com/lightboxes/low-profile-thin-lightboxes (Google #3)

- **Page type:** category page.
- **Title:** "Low Profile Thin Lightboxes | Blue River Digital". **H1:** "Low Profile Thin Lightboxes". No H2 or H3.
- **Size of page:** ~565 words (rendered), 25 images.
- **Pricing:** product prices about $52–$1,119.
- **Spec content:** boxes under 2" deep; **ADA protrusion limit (≤ 4" from the wall)**; direct-backlit vs edge-lit explained.
- **Schema:** Organization, PostalAddress.
- **Note:** a non-browser client got a 404; the browser rendered the page.
- **Why it ranks (inferred):** exact topical match ("low profile, thin") from a long-standing lightbox specialist.

#### D. customneon.com/light-box-signs/ (Google #4; WebSearch #1)

- **Page type:** landing page with a long, configurator-style quote form.
- **Title:** "Lightbox Signage Custom Light Box Signs with Logos & Storefront Displays".
- **Size of page:** ~3,220 words, 82 images.
- **Pricing:** quote only.
- **Size guidance:** minimum depth by type (front-lit ~4 cm, double-sided ~6 cm, fully illuminated ~10 cm, slim fixed ~1 cm).
- **Configurator:** 6 shapes, 4 types, 8 LED colours, several mounting options.
- **FAQs (10, visible on page, no FAQPage schema):**
  - depths
  - LED colours
  - outdoor use
  - custom size
  - efficiency
  - materials
  - double-sided
  - business benefits
  - maintenance
  - uses
- **Trust signals:** "4.9 Google" badge, IP67, spec PDFs.
- **Inconsistency:** 2-year warranty in the header vs 3-year in the body.
- **Why it ranks (inferred):** a *custom, branded* lightbox page that includes an explicit slim type. This is the sub-intent that matches Glownique.

#### Also in WebSearch but not in Google's top 10

- **Lindo Sign ultra-slim category (China):** ~700 words, no prices, WhatsApp / email inquiry, metric and A1/A3 sizes.
- **777sign:** trade-only wholesale.

### DD6: "wedding neon sign"

Google's top 3 are customneon.com, crazyneon.com and neonsigns.com. Editorial pages sit at #6 (The Knot) and #7 (Brides). The Shopping grid at the top is **dominated by Etsy sellers**.

#### A. customneon.com/signs-for-sale/wedding-signs/ (Google #1)

- **Page type:** category page (ready-made plus design-your-own).
- **Title:** "Custom Neon™ Wedding Signs Buy Ready-Made or Design a Wedding Light". **H1:** "Buy Ready-Made & Personalized Custom Neon® Wedding Signs".
- **Size of page:** ~1,150 words, 39 images.
- **Products:** 18, with visible prices from about $150 to $695 (OfferCatalog + Product ×18 schema).
- **Other:** embedded design tool; "4.9 Google rating"; real wedding photos with credits.
- **Missing:** no FAQ, no size guidance.
- **Why it ranks (inferred):** a shoppable, priced grid plus a personalisation tool on the strongest domain.

#### B. crazyneon.com/collections/wedding-neon-signs (Google #2)

- **Page type:** collection page with 56 products.
- **Title:** "Wedding Neon Signs | Romantic, Stylish & Fast Delivery – Crazy Neon". **H1:** "Collection: Wedding Neon Signs".
- **Size of page:** ~2,375 words, 59 images.
- **Pricing:** from $49 (sale; regular $98) up to about $616.
- **Designs:** wedding-specific (surnames, "est." year, quotes).
- **FAQ (6, from raw-HTML headings, no FAQPage schema):**
  - why LED is better
  - partially neon designs
  - battery or plug-in
  - how long custom creation takes
  - how big a sign can be
  - damage in transit
- **Paths:** ready-made / design your own text / upload image or idea.
- **Trust signals:** delivery in 6–9 days (also in the meta description), 3-year warranty, buy now pay later, $5 shipping protection.
- **Schema:** Organization only in raw HTML.
- **Why it ranks (inferred):** a large priced assortment of wedding-specific designs plus a clear delivery window for event dates.

#### C. neonsigns.com/us/custom-wedding-neon-signs (Google #3)

- **Page type:** category / landing page.
- **Title:** "Wedding Neon Signs - {50% Off - Light Up Your Wedding Day }". **H1:** "Wedding Neon Signs".
- **Size of page:** ~1,080 words, 95 images, 12-photo inspiration gallery.
- **Size guidance:** the FAQ lists recommended sizes from 15" to 71".
- **FAQs (3):**
  - multicolour tubes
  - warranty
  - wedding sizes
- **Reviews:** Shopper Approved 4.9 from 2,095 (AggregateRating).
- **Flow (3 steps):** free quote → customise with a designer → receive.
- **Schema:** LocalBusiness, Organization, Product ×5, Offer, AggregateRating, Review.

#### D. Editorial reference: theknot.com/content/neon-signs (Google #6; WebSearch #1)

- **Page type:** listicle / shopping guide ("18 Neon Wedding Sign Ideas…").
- **Size of page:** ~1,740 words, 69 images.
- **Pricing:** price buttons on each item (about $34–$500), **mostly linking to Etsy** via affiliate links. It also links to Custom Neon, Yellowpop, Name Glo and Wayfair.
- **Schema:** Article, CollectionPage, ItemList.
- **Related page:** Brides.com has a similar "25 ideas" gallery at #7.
- **Why it ranks (inferred):** it serves the "ideas" slice of wedding intent, which the PAA and related searches reinforce (see (f)).

---

## (d) Cross-query patterns (Google, 21 SERPs)

### 1. Which page types win which intents

| Intent cluster | Queries | What dominates the organic top 10 |
|---|---|---|
| **Neon head terms** | 1–4 | **Brand homepages** of DTC neon specialists (neonsigns.com, Yellowpop, NeonChamp, Custom Neon, Kings of Neon, Echo Neon) plus Etsy / Amazon. Only 1–2 inner pages per SERP. Shopping on 4/4 and local packs on 3/4. Organic results carry review-star, shipping and returns snippets. |
| **Neon use-case terms** | 16–21 | **Category / collection pages** of the same neon brands. Custom Neon is **#1 on restaurant, salon, gym, wedding and bar**; Yellowpop is #1 on bedroom. Amazon is in all six (#2–#6); Etsy on gym. Pinterest on 4 of 6. Editorial only on wedding (The Knot, Brides) and one blog on bedroom (Orant Neon). |
| **Channel letters** | 5, 8, 9 | A mix of wholesale and manufacturer sites (DSW, Classic CLW, Cosun, Channel Letter Depot), online configurators (BuySignLetters, SignMonkey), franchises (FastSigns, Signarama), Wikipedia, a local sign company's guide (Dave's Signs) and Shopify-style product pages (BacklitLEDsign, LED Sign City, Selegna, Next Level). AI Overviews on 2 of 3. |
| **Halo / backlit** | 6, 7 | Manufacturers (halolitsigns, Gemini, Woodland), product pages (BacklitLEDsign, BannerBuzz), guides (Dave's Signs). "Backlit signs" is **ambiguous**: it also pulls printed backlit decals and lightbox print shops (Square Signs, Signazon). |
| **Metal / acrylic / UV** | 10–12 | Product pages from print and sign e-commerce (Square Signs, Signs.com, Vistaprint, Printleaf, FedEx Office, Displays2go, Custom Made Better), Shopify sellers (BacklitLEDsign, Luckyneon) and Etsy / Amazon. **Top-of-page ads** on acrylic and UV. |
| **Slim lightbox** | 13 | **Display-hardware retailers** (Displays4Sale, Lightbox Shop, Blue River, Displays2Go, Anything Display) whose poster/snap-frame catalogues list many sizes. Custom Neon's custom lightbox page is the only "custom branded sign" result (#4). |
| **Generic business signs** | 14 | Generalist print and sign sites and franchises (Signs.com, Vistaprint, SmartSign, Smartpress, FastSigns, Signarama, Impact Signs) plus Amazon and a **local pack**. |
| **Reception / lobby** | 15 | Fragmented: sign-company and franchise pages, a product page, Etsy, Pinterest, a stock-image site and a UK guide. No PAA and no ads. |

**Marketplace pressure:** Amazon, Etsy or Walmart appears in the organic top 10 of **18 of 21** Google SERPs. The exceptions are **halo lit signs, dual lit channel letters and slim led light box sign**. In Shopping grids, Etsy sellers ("Etsy – <shop>") appear on UV acrylic, reception, **wedding (5 of the 8 sellers captured)** and bedroom. Walmart sellers appear on gym and wedding.

### 2. Recurring organic domains

This counts the number of Google SERPs (out of 21) where each domain appears in the organic top ~10 (`serp_data.py`).

| Rank | Domain | SERPs | Note |
|---|---|---|---|
| 1 (tie) | customneon.com | 14 | #1 on 5 queries; often two URLs per SERP |
| 1 (tie) | amazon.com | 14 | Marketplace |
| 3 | video results (counted as youtube.com) | 11 | YouTube confirmed on 4; the other 7 are likely YouTube (inferred) |
| 4 | pinterest.com | 10 | Inspiration / UGC |
| 5 (tie) | neonchamp.com | 8 | DTC neon |
| 5 (tie) | crazyneon.com | 8 | DTC neon (collections) |
| 7 (tie) | yellowpop.com | 7 | DTC neon |
| 7 (tie) | etsy.com | 7 | Marketplace |
| 9 (tie) | neonsigns.com | 6 | DTC neon |
| 9 (tie) | backlitledsign.com | 6 | Shopify seller across metal, backlit, channel-letter and neon SERPs |

Just below the top 10: kingsofneon.com 4, bannerbuzz.com 4, echoneon.com 3, signarama.com 3, impactsigns.com 3, signs.com 3.

**Sellers only** (Amazon, Etsy, Pinterest, YouTube, Wikipedia and Walmart excluded): customneon 14, neonchamp 8, crazyneon 8, yellowpop 7, neonsigns 6, backlitledsign 6, kingsofneon 4, bannerbuzz 4, echoneon 3, signarama 3, impactsigns 3, signs.com 3.

**WebSearch tally (for comparison):** customneon 13, amazon 11, pinterest 10, neonchamp 9, crazyneon 9, etsy 7, yellowpop 7, neonsigns 6.

### 3. SERP features across the 21 Google SERPs

| Feature | Count | Where / notes |
|---|---|---|
| Popular products (Shopping) grid | **21/21** | Every query. At the very top on #3, 12, 15, 18, 19 and 21. Extra "More products" or "Deals" modules on 15/21. |
| People also ask | **19/21** | Missing on 3d metal logo sign and reception logo sign. At the top of the results on front lit channel letters. |
| Related searches | 21/21 | |
| Images pack | 13/21 | |
| Video (YouTube-type results or Videos module) | 11/21 | Often old or low-view: 400 views on dual-lit; 5–8-year-old videos on halo, UV and restaurant. Salon also showed an Amazon Live video page. |
| AI Overview / AI summary | **6/21** | Channel letter signs (top), halo lit (mid), dual lit (mid), slim lightbox (mid, no heading), salon (mid, shopping-style, names vendors), restaurant (loading placeholder, content not captured). None on neon head terms, acrylic/UV, 3D metal, wedding, gym, bedroom or bar. |
| Local pack | 4/21 | Neon head terms (Q1, 2, 4) and custom business signs (Q14). Location undetermined, so a US approximation. |
| Ads | 16/21 | **Top ads only on acrylic, UV and custom business signs.** Elsewhere the ads are bottom or mid-page blocks. Recurring advertisers: getcustomneonsigns (neon, 7 SERPs), helloneonsign, neonsignlife, jigsign, 4over4, imprintplus, clearviewplastic. |
| "What people are saying" | 1/21 | Bedroom |

**Other patterns:**
- **Rich organic snippets.** Neon DTC results show stars, price ranges, delivery fees and return windows:
  - neonsigns.com: 4.9 (2,095)
  - Crazy Neon: $49, 4.8 (721), 90-day returns
  - Hyperlite: $105–$380, 4.7 store rating
  - Etsy: store rating
  - The domains behind them publish **MerchantReturnPolicy and OfferShippingDetails** JSON-LD (neonsigns.com, NeonChamp, Custom Neon). neonsigns.com and NeonChamp also publish AggregateRating.
- **Shopping price anchors are low for neon.** NeonChamp shows "$27.99" or "$16.79" on most neon grids. Custom Neon shows $61; Neon Signs Now $70.72. This signals a very price-anchored, discount-heavy SERP.
- **Cost questions dominate PAA.** They appear on every query that had PAA. Related searches add "cheap", "cost", "for sale" and "amazon/etsy" modifiers.
- **"Near me" appears in related searches on 11/21.** That covers neon, channel letters, 3D metal, acrylic, UV, custom business signs, restaurant and bar. A local pack appeared on only 4.

### 4. On-page patterns across the deep-dive pages (25 pages)

- **Prices are usually visible:**
  - entry "from" prices: neonsigns.com, NeonChamp, Custom Neon business, Crazy Neon
  - item prices: BannerBuzz, Custom Neon wedding, Crazy Neon wedding, LED Sign City, Blue River
  - tables or per-size prices: Woodland (per letter height), Lightbox Shop and Displays4Sale (per size)
  - quote-only pages still rank when they have depth: halolitsigns, Custom Neon lightbox
- **Social proof** is on most winners: Shopper Approved, Trustpilot, Google-rating badges, and per-product review counts, often marked up as AggregateRating.
- **Configurators and design tools** are the norm: neonsigns, Yellowpop, Custom Neon, BuySignLetters, SignMonkey, Woodland.
- **Mockup / proof speed is a headline claim:** 12-hour proof (neonsigns.com), 24-hour mock-up and quote (Kings of Neon), 24-hour quote (Yellowpop), 1-working-day quote (halolitsigns).
- **Size guidance appears on the stronger pages:**
  - depth minimums (Custom Neon lightbox)
  - visibility rule of thumb (halolitsigns)
  - wedding size list (neonsigns.com)
  - letter height measured on "A" (Woodland)
  - maximum single panel (Custom Neon business)
  - ADA ≤ 4" protrusion (Blue River)
  - poster sizes and depths (Displays4Sale)
- **Spec depth:** downloadable spec PDFs (Custom Neon); UL, electrical and mounting details (Woodland, BuySignLetters); install videos (BannerBuzz, BuySignLetters).
- **Real project galleries:** halolitsigns brand case studies, neonsigns.com customer photos, LED Sign City install photos, SignMonkey real signs, Custom Neon wedding photos.
- **FAQPage schema isn't required to rank.** Only NeonChamp had it among the deep-dive pages. Most winners still have visible FAQs on cost, process, lead time and file formats.
- **Thin pages still rank when authority or utility is high:** SignMonkey (~340 words), Gemini (~100 words of body copy), LED Sign City (~430), Blue River (~565).

---

## (e) Implications for The Glownique

### Current state (observed)

- theglownique.com is absent from all 21 SERPs. It is indexed and appears for branded queries.
- The sitemap already has a page for every cluster.
- The same analyser was run on Glownique's pages:

| Glownique URL | Words | Images | Prices shown | Schema | FAQ questions |
|---|---|---|---|---|---|
| / (home) | ~3,450 | 44 | Cost ranges $250–$2,500 | Organization, WebSite, Service / OfferCatalog, Product ×4, FAQPage | 11 |
| /products/custom-neon-signs | ~1,245 | 17 | none | Product, Brand, BreadcrumbList, FAQPage | 5 |
| /business-signs/custom-logo-neon-signs | ~600 | 4 | none | Product, FAQPage | 4 |
| /business-signs/channel-letter-signs | ~545 | 4 | none | Product, FAQPage | 4 |
| /business-signs/backlit-signs | ~1,170 | 4 | none | Product, FAQPage (+1 table) | 5 |
| /business-signs/lightbox-signs | ~480 | 4 | none | Product, FAQPage | 4 |
| /products/ultra-thin-lightbox | ~810 | 18 | none | Product, FAQPage | 5 |
| /custom-signage/wedding-signs | ~1,390 | 14 | none (a cost FAQ exists but gives no $ figures) | CollectionPage, ItemList, FAQPage | 6 |

**Gaps against the ranking pages:**
- The ranking pages run about 1,000–5,000 words, with prices or price tables, ratings, galleries, specs and configurators.
- Glownique's **business pages are thin** (about 480–600 words and 4 images) and **show no prices**.
- Glownique has **no AggregateRating / Review markup** and **no MerchantReturnPolicy / OfferShippingDetails**. The neon leaders use these, and the shipping and returns snippets seen in the SERP are consistent with them. Only mark up reviews that are genuine and shown on the page (inferred recommendation).

### How winnable each cluster looks (inferred from observed SERP composition)

| Cluster | Queries | Verdict | Evidence, then inference | Glownique URL (from sitemap) |
|---|---|---|---|---|
| Neon head terms | custom neon signs; custom led neon signs; custom logo neon sign; custom neon signs for business | **Hard, long-term** | Entrenched DTC homepages with thousands of reviews and star snippets. Etsy / Amazon in the top 5. Shopping grids anchored at $16.79–$70.72. Local packs. A new domain is unlikely to reach page 1 soon; target long-tail logo / B2B variants and PAA questions instead (e.g. "How can I turn my logo into a neon sign?"). | /products/custom-neon-signs; /business-signs/custom-logo-neon-signs; /blog/turn-business-logo-into-custom-neon-sign |
| Generic business signs | custom business signs | **Hard / poor fit** | Print giants and franchises, a local pack, and a broad intent (banners, yard signs). Deprioritise. | /business-signs |
| Neon use-case, consumer | personalized neon bar signs; bedroom neon signs | **Hard** | Custom Neon or Yellowpop at #1, Amazon at #2–4, Pinterest, Etsy sellers in Shopping. | /custom-signage/bar-neon-signs and /business-signs/bar-signs (**possible cannibalisation**); /custom-signage/home-decor-signs |
| Neon use-case, B2B | restaurant, salon, gym neon | **Medium** | Won by **category pages**, not homepages, which is a more level field. Still the same big neon brands plus Amazon / Etsy. The salon AI Overview names vendors (BannerBuzz, NeonChamp). Needs depth: use-case galleries, sizes, prices, FAQs. | /business-signs/restaurant-signs, /salon-spa-signs, /gym-fitness-signs |
| Wedding neon | wedding neon sign | **Medium** | Category pages at #1–3; editorial at #6–7; rentals at #5. PAA and related searches ask about size, names and "ideas". **Shopping is dominated by Etsy sellers**, which is directly relevant because Glownique already takes payment through Etsy. | /custom-signage/wedding-signs; /blog/custom-wedding-neon-signs-backdrop-guide |
| Channel-letter head term | channel letter signs | **Medium–hard** | AI Overview, Wikipedia, franchises, instant-price configurators. Storefront buyers often need installation and permits. But ship-only models (SignMonkey #2, BuySignLetters #1) rank, so no-install is not disqualifying. | /business-signs/channel-letter-signs; /products/3d-metal-neon-signs |
| Channel-letter lighting types | front lit channel letters; dual lit channel letters | **More winnable** | Mostly wholesale, manufacturer and blog pages of modest depth; duplicated blog titles; a weak video (400 views). Dual-lit has an AI Overview to earn citations from. Glownique's existing comparison guide matches related searches ("front-lit vs backlit signage", "halo-lit vs backlit"). Caveat: part of this SERP is **trade / wholesale** intent. | /guides/front-lit-vs-halo-lit-vs-dual-lit; /business-signs/channel-letter-signs |
| Halo / backlit logo | halo lit signs; backlit signs | **More winnable (halo); medium (backlit)** | Halo #1 is a remote manufacturer that wins on process transparency; #2 is a page with about 100 words of body copy; no marketplaces. Indoor and lobby halo logos suit ship-and-mount better than exterior letters. "Backlit signs" is ambiguous (decals, lightboxes), so target the backlit logo / letters sub-intent. | /business-signs/backlit-signs; /business-signs/backlit-lobby-signs; /guides/backlit-sign-wall-surfaces-and-standoffs |
| 3D metal logo | 3d metal logo sign | **More winnable** | Shopify sellers, an Etsy shop, Amazon, small collections. No PAA, no AI Overview, no ads. Searchers use "3D metal (backlit) sign / logo / letters"; Glownique's product name "3D Metal **Neon** Signs" may not match that vocabulary. | /products/3d-metal-neon-signs |
| Acrylic / UV | acrylic logo sign; uv printed acrylic sign | **Medium** | Print giants plus top ads. The UV SERP is more niche. An illuminated or 3D UV-acrylic angle sets Glownique apart from flat print ("Custom Acrylic Signs with LED" is a related search). | /business-signs/acrylic-logo-signs; /products/uv-print-acrylic-signs (**possible overlap**) |
| Slim lightbox | slim led light box sign | **Medium** | Google favours **display-hardware retailers** of poster and snap frames, with big size and price lists but little copy (Blue River ~565 words; Displays4Sale has no FAQ or reviews). Glownique's product is a *custom branded* lightbox, which matches the sub-intent Custom Neon's #4 page and the AI summary's "rimless acrylic logo signs" group serve. That sub-intent is winnable (inferred); generic poster-frame intent is a weaker fit. | /business-signs/lightbox-signs; /products/ultra-thin-lightbox (**possible overlap**) |
| Reception / lobby | reception logo sign | **More winnable** | Fragmented SERP: a stock-image site and a UK guide rank; no PAA, no ads, no local pack; Etsy and small sellers in Shopping. A national made-to-order lobby-sign page with real photos, sizes and prices could compete. | /business-signs/backlit-lobby-signs; /business-signs/office-signs |

### Implications across all clusters (inferred unless marked observed)

1. **Shopping is the biggest surface outside organic.** A Popular-products grid was on **21/21** SERPs and at the very top on 6. Etsy shops appear there as "Etsy – <shop>" (observed on wedding, bedroom, reception and UV). Glownique's Etsy listings, and a Merchant Center feed if the checkout model allows one, deserve evaluation. Policy requirements were not verified here.
2. **Show prices on money pages.** Winners show "from" prices, prices by size or price tables, and PAA is dominated by cost questions. Glownique shows prices only on the homepage. Honest from-prices or size and price bands per product and business page would match the intent.
3. **Answer the PAA set on the matching page.** The questions cluster into:
   - cost
   - how signs are made or how to get one made
   - logo-to-neon
   - installation
   - front vs halo vs dual
   - what size (wedding, bedroom)
   - why neon isn't used anymore / is it illegal (bedroom, salon, gym)
   AI Overviews on channel-letter topics cite definitional guides (Dave's Signs, Wikipedia, FastSigns). Clear definitions and comparisons, with diagrams, are the likely route to being cited.
4. **Remote sellers can rank if the process is explicit.** halolitsigns (remote, #1) and SignMonkey (ship-only, #2) show a non-local model can win. That needs:
   - process steps, lead times, proof before payment, payment protection, warranty and shipping details
   - real project photos (Glownique's business pages have only 4 images)
   - verifiable reviews (Etsy reviews are a candidate source; mark up only what is genuine and visible)
5. **Mockup speed is a differentiator.** Competitors headline 12–24 hours. Glownique's homepage meta claims about 2 hours. Keep the claim only if it can be sustained.
6. **Don't chase the local pack.** It appeared only on neon head terms and custom business signs, and it needs a real location. Glownique has no storefront, so no fake Google Business Profile and no city doorway pages. Handle "near me" demand (11/21 related searches) with nationwide-shipping messaging and installer guidance instead.
7. **Turn the no-install gap into content.** Channel-letter PAA includes "How do I install a channel letter sign?" and competitors recommend licensed electricians. A frank "ships ready to mount; use your local installer or electrician" section plus a mounting guide fits the model and the PAA.
8. **Video slots look soft.** Video appeared on 11/21 SERPs, often old or low-view. Short fabrication, unboxing and mounting videos on YouTube, embedded on product pages, could take these slots.
9. **Consolidate overlapping pages.** These pairs target the same intent:
   - /business-signs/bar-signs vs /custom-signage/bar-neon-signs
   - /business-signs/lightbox-signs vs /products/ultra-thin-lightbox
   - /business-signs/channel-letter-signs vs /products/3d-metal-neon-signs
   - /business-signs/acrylic-logo-signs vs /products/uv-print-acrylic-signs

   Custom Neon does sometimes rank two URLs, but usually one URL per domain ranks. Give each query one clear primary URL and make the other support it.

---

## (f) PAA and related searches (Google, deduplicated)

The query echo (`data-q`) is excluded. Source query numbers are in brackets.

### People also ask (61 unique questions)

**Cost, price and where to buy (19)**
- What is the average cost of a Custom Neon sign? [1, 21]
- How much does a custom LED neon sign cost? [2]
- How much do Custom Neon lights cost? [2]
- How much does it cost to get a Custom Neon sign made? [3, 4]
- How much should a neon sign cost? [17, 19]
- How much does a real neon sign typically cost? [16]
- How expensive is a real neon sign? [18]
- How much does a restaurant sign cost? [16]
- How much does a channel letter sign cost? [5, 9]
- How much does a channel letter cost? [8]
- How much do channel letters cost per inch? [8, 9]
- How much does a lighted business sign cost? [6]
- How much do backlit signs cost? [7]
- How much does a lightbox sign cost? [13]
- How much does an acrylic sign cost? [11, 12]
- Why are acrylic signs so expensive? [11]
- How much do custom signs typically cost? [14]
- Is a neon sign business profitable? [3, 17]
- Does Office Depot make custom signs? [14]

**Process and how-to (12)**
- How to get a Custom Neon sign made? [1, 2, 3, 4, 21]
- How can I create my own neon sign? [1]
- How do I make my own LED neon sign? [2]
- How can I turn my logo into a neon sign? [4]
- How can I create a neon logo? [4]
- How do I install a channel letter sign? [5]
- How can I create a backlit sign? [7]
- How can I create my own acrylic sign? [11]
- How to make your own light box sign? [13]
- How can I create my own sign for my business? [14]
- Where can I find a custom light sign for my business? [3]
- Where can I find gym signs? [18]

**Definitions, comparisons and materials (15)**
- What is a channel letter sign? [5]
- What are the key differences between channel letter signs and box signs? [5]
- What are the different types of channel letters? [8, 9]
- What are illuminated channel letters? [8, 9]
- What are halo lit signs? [6]
- What are halo signs? [6]
- What is the difference between face-lit and halo-lit signs? [6]
- What are backlit signs? [7]
- What is the best material for backlit signs? [7]
- What are the common problems with lightboxes? [13]
- What to use instead of a lightbox? [13]
- Can UV printers print on acrylic? [12]
- What are the downsides of UV printing? [12]
- How permanent is UV printing? [12]
- Does Hobby Lobby have acrylic signs? [11]

**Choosing: best, size, ideas, lighting (12)**
- Who makes the best Custom Neon signs? [1, 21]
- What is the best neon sign for a wedding? [19]
- What is a good size neon sign for a wedding? [19]
- What are some good neon wedding signs with last names? [19]
- What are some good light-up neon signs for bedrooms? [20]
- What size neon sign for bedroom? [20]
- What are some trendy neon signs for bars? [21]
- What kind of sign is best for a restaurant? [16]
- What type of lighting is best for a restaurant? [16]
- What lighting is best for salons? [17]
- What type of light is best for a gym? [18]
- What are some unique business sign ideas? [14]

**Concerns and misconceptions (3)**
- Why don't people use neon signs anymore? / Why are neon signs not used anymore? [17, 18, 20]
- Are neon signs illegal? [20]

**No PAA observed** on: 3d metal logo sign [10] and reception logo sign [15].

### Related searches / "People also search for" (deduplicated, grouped)

**Neon: price and marketplace modifiers**
- Cheap custom neon signs [1, 3]
- Custom led neon signs cheap [2]
- Custom logo neon sign cheap [4]
- Personalized neon bar signs cheap [21]
- Bedroom neon signs cheap [20]
- Best custom neon signs [1, 3]
- Best custom neon sign company [3]
- Custom Neon signs Etsy [1]
- Custom Neon Signs Amazon [1]
- Custom LED Neon Signs Amazon [2]
- Custom logo neon sign amazon [4]
- Salon neon sign amazon [17]
- Gym neon sign amazon [18]
- Bedroom neon signs amazon [20]
- Neon Lights for Room Amazon [20]
- Personalized neon bar signs amazon [21]

**Neon: type, use and name**
- Custom LED neon signs / Custom LED neon sign [1, 3, 4]
- Custom neon signs [2, 20, 21]
- Neon signs [17]
- Custom LED signs [1]
- Custom neon signs for business [1, 4]
- Custom LED signs for business [2, 3, 4]
- Custom neon signs for business with logo [3]
- Custom LED signs for room [2, 3, 4]
- Custom LED Name Sign [2]
- Custom neon name signs [4]
- Custom restaurant neon signs [16]
- LED signs for restaurants [16]
- Vintage restaurant neon signs [16]
- Outdoor restaurant neon signs [16]
- LED restaurant signs Outdoor [16]
- Commercial restaurant signs [16]
- Salon neon sign for sale [17]
- Nail Neon Sign [17]
- Hello Gorgeous Neon Sign [17]
- Beauty salon Sign [17]
- Hair Salon signs outdoor [17]
- Hair Salon signs ideas [17]
- Custom gym neon sign [18]
- Gym neon sign ideas [18]
- Home Gym Neon Sign [18]
- Custom Gym Sign [18]
- Motivational Gym signs [18]
- Metal Gym Signs [18]
- Gym signs for home Gym [18]
- Custom bedroom neon signs [20]
- Small bedroom neon signs [20]
- Neon lights for bedroom Wall [20]
- Neon Lights for Room ceiling [20]
- Customizable personalized neon bar signs [21]
- Custom personalized neon bar signs [21]
- Personalized bar signs for home [21]

**Wedding**
- Wedding neon sign ideas [19]
- Wedding neon sign with name [19]
- Neon Sign for Wedding Last Name [19]
- Wedding Neon Sign backdrop [19]
- Light up sign for wedding entrance [19]
- Custom wedding neon sign [19]
- Better Together Neon Sign [19]
- What size neon sign for wedding [19]

**"Near me" (local intent)**
- Custom neon signs near me [1, 2, 3, 4]
- Custom LED neon signs near me [2]
- Channel letter signs near me [5]
- 3d metal logo sign near me [10]
- Custom 3D signs near me [10]
- Custom acrylic signs near me [11]
- Uv printed acrylic sign near me [12]
- Custom business signs near me [14]
- Custom made signs near me [14]
- Restaurant neon signs near me [16]
- Neon light restaurant near Me [16]
- Personalized neon bar signs near me [21]
- Neon Bar signs near me [21]

**Channel letters**
- Channel letter sign cost [5]
- Types of channel letter signs [5]
- Channel letter signs for sale [5]
- Custom channel letter signs [5]
- Outdoor channel letter signs [5]
- Reverse channel letters [5]
- Channel Letter Sign manufacturers [5]
- Customizable front lit channel letters [8]
- Front lit sign [6, 8]
- Front lit signage details [8]
- Front-lit vs backlit signage [8]
- Back lit channel letters [8]
- Custom front lit channel letters [8]
- Front lit channel letters for sale [8]
- Halo lit channel letters [6, 8, 9]
- Dual lit channel letters template [9]
- Dual lit channel letters free [9]
- Reverse channel letters halo lit [9]
- Trimless channel letters [9]
- Open Face Channel Letters [9]
- Channel letter Diagram [9]
- Faux neon Channel Letters [9]

**Halo and backlit**
- Halo-lit vs backlit [6]
- Halo lit signs meaning [6]
- Custom halo lit signs [6]
- Gemini Halo Lit letters [6]
- Halo sign [6]
- Halo signs medical [6]
- Backlit signage box [7]
- Led backlit signs [7]
- Backlit signs for business [7]
- Personalized backlit signs [7]
- Backlit Letters Sign [7]
- Translucent vinyl for backlit signs [7]
- Backlit logo sign [7]
- Outdoor backlit signs [7]

**Lightbox**
- Slim led light box sign outdoor [13]
- Large slim led light box sign [13]
- LED light box for wall [13]
- Light box signs outdoor [13]
- Slim led light box sign for sale [13]
- Light box sign Frame [13]
- Outdoor lighted sign boxes for businesses [13]
- 4x8 lighted sign box [13]

**3D metal**
- 3d metal logo sign online [10]
- 3D business signs outdoor [10]
- Laser cut LED sign [10]
- Custom metal signs [14]

**Acrylic and UV**
- Custom acrylic logo sign [11]
- 3D Acrylic Logo sign [11]
- Custom acrylic signs for business [11]
- Custom Acrylic Signs with LED [11, 12]
- Custom 3D acrylic signs [11]
- Acrylic Sign Blank [11]
- Acrylic sign for business [11]
- Uv printed acrylic sign template [12]
- Uv printed acrylic sign wholesale [12]
- Custom uv printed acrylic sign [12]
- Acrylic Office signs for Wall [12]
- Uv printed acrylic sign for sale [12]
- Free uv printed acrylic sign [12]

**Business, office and reception**
- Custom business signs outdoor [14]
- Custom business signs with logo [14]
- Outdoor business signs [14]
- Custom Wall signs for business [14]
- Custom business signs indoor [14]
- Reception logo sign ideas [15]
- Reception logo sign free [15]
- Reception signage ideas [15]
- Custom reception logo sign [15]
- Custom office signs for Wall [15]
- Custom Office signs for Wall with logo [15]
- Custom logo sign for wall [15]
- *(Q15 also showed an Etsy listing URL as a related-search string.)*

### Competitor FAQ themes (for reference, from the deep dives)

These themes recur across neonsigns.com, NeonChamp, BannerBuzz, Custom Neon (business and lightbox pages), halolitsigns, Crazy Neon wedding and neonsigns.com wedding:
- cost, and why it's expensive
- how signs are made; neon vs LED; lifespan
- hanging, mounting and installation services
- warranty; waterproof and outdoor use; what's in the box
- free design or mockup; fonts; vector and file formats; revisions
- lead time, rush orders and delivery window for event dates
- proof before payment; payment methods and security; cancellation and changes
- returns and transit damage
- multiple locations
- indoor vs outdoor
- what size to order (including wedding sizes); maximum size
- white vs warm white
- 110–120 VAC compatibility
- battery vs plug-in
- partially-neon designs
- LED replacement

Full per-page question lists are in section (c).
