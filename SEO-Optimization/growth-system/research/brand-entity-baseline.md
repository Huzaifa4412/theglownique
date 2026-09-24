# The Glownique: Brand / Entity Baseline

- **Subject:** The Glownique, made-to-order illuminated signage (https://www.theglownique.com/)
- **Data collected:** 2026-09-24, 15:44–16:16 UTC. Times are UTC. "≈" means the access time comes from the session log, not from a page stamp.
- **Rules applied:** Every fact comes from an observed page or result and carries its URL and access time. **(inference)** marks interpretation. Counts are copied exactly as displayed and never estimated. Quotes are under 15 words.
- **Evidence on disk:** `scratchpad/serp/` (raw SERP HTML/JSON) and `scratchpad/fetch/` (site HTML, Wayback Etsy snapshots, social/probe responses).

---

## 0. Method and tool status

| Tool | Result in this run | Used for |
|---|---|---|
| WebSearch | Worked. **Ignores `site:`** (returned unrelated Wikipedia/Substack pages). Each result comes with an LLM-written summary, which is treated as AI-answer evidence and not as fact | Brand SERPs, domain-filtered index probes |
| mcp__web-search-prime | **Failed:** HTTP 429 "Insufficient balance" (≈15:44) | — |
| mcp__web-reader | **Failed:** HTTP 429 "Insufficient balance" (≈15:49) | — |
| WebFetch | Instagram OK. Facebook returned only the page name. **Etsy HTTP 403** | Social checks |
| Bash curl | Worked for the site, robots, sitemap, llms.txt, GitHub API, RDAP, Wayback, Common Crawl, YouTube and Companies House. Etsy returned 403 (DataDome JS/captcha page). DuckDuckGo HTML gave 200 for 4 queries, then 202 "anomaly". Bing HTML/RSS returned degraded, irrelevant results. Mojeek 403/captcha. TikTok WAF "Please wait". Facebook 400 | Site facts, indexation hints |
| Claude Browser pane (logged out). Not in the brief's tool list; used as a fallback because two listed tools had no credit | Worked for the Etsy shop and listing, Facebook, TikTok, Pinterest and DuckDuckGo. **Bing** was partly degraded. **Google:** "unusual traffic" CAPTCHA at 16:05:41. **Perplexity:** Cloudflare verification. **Copilot:** sign-in wall. None of these challenges was attempted or bypassed | Etsy verification, social checks, SERPs |

Viewing context: the browser pane's region was auto-detected as **Pakistan** (Etsy page titles read "Etsy Pakistan"). Etsy delivery estimates and "free delivery" labels therefore apply to a Pakistan destination.

---

## Executive summary

1. **Unrelated entities own the unqualified brand SERP.** For "The Glownique", "Glownique", "The Glownique reviews" and "is The Glownique legit", none of the top-10 results on WebSearch, DuckDuckGo or Bing belong to the neon brand. GLOWNIQUE cosmetics (glownique.com) dominates. A scam-flagged "Glownique4u.online" and three unrelated "The Glownique" YouTube channels also rank.
2. **theglownique.com is almost invisible to search.**
   - DuckDuckGo shows "No results found" for all three `site:` variants.
   - The site never reaches the DuckDuckGo or Bing top 10 for any brand query, including its own domain name.
   - The WebSearch backend holds exactly **1** site URL (`/products/custom-neon-signs`).
   - The domain was **registered 2026-08-04** (51 days old).
   - There are no Common Crawl or Wayback captures.
3. **The Etsy shop is the brand's strongest search asset.** https://www.etsy.com/shop/TheGlownique ranks #1–2 on DuckDuckGo and Bing for "the glownique neon signs" and "theglownique". On 2026-09-24 it showed **25 sales, 5.0 (8), 286 admirers, 78 items, "United States", on Etsy since 2025, and no Star Seller badge.**
4. **The brand's own claims conflict with Etsy.**
   - The site says "5,000+ Happy Clients" and "Etsy Star Seller".
   - The Instagram bio says "1000+ Neon Signs Sold" and "Star Seller".
   - Etsy shows 25 sales and no badge.
   - Warranty is 5 years on the site but 3 years on the Etsy listing (1 year in the Sep 2025 snapshot).
   - llms.txt says free delivery has ended, while Etsy shows free delivery.
5. **Schema `sameAs` points to one Etsy listing, not the shop.** Every Etsy listing or shop URL on the 7 site pages checked is that same listing (home, product, contact, shipping, returns, terms, privacy). None points to the shop. The only other Etsy URL is Etsy's privacy page.
6. **No independent third-party mentions were found** (press, blogs, directories, Reddit, Pinterest, YouTube).
7. **AI summaries already mix up the entity.** A WebSearch summary claimed the brand's "primary website is actually glownique.com". Another called the brand "a Next.js storefront", taken from the public GitHub README.

---

## 1. Brand SERPs

Result codes:
- **OWN** = theglownique.com
- **ETSY-S / ETSY-L / ETSY-M** = Etsy shop / Etsy listing / Etsy "market" search page
- **SOC** = the brand's own social profile
- **GH** = the brand's public GitHub repo
- **UNREL** = an unrelated entity
- **GEN** = generic or irrelevant page

### Scoreboard (top 10)

| Query | OWN (WebSearch / DDG / Bing) | Etsy shop | Brand social | Notes |
|---|---|---|---|---|
| "The Glownique" (quoted) | 0 / 0 / 0 | — | — | 100% UNREL (cosmetics, UK tanning salon, unrelated YouTube) |
| Glownique | 0 / 0 / n.a. | — | — | 100% UNREL. Bing degraded |
| Glownique neon | **#6** / 0 / 0 | DDG #2 (curl 15:46), absent (browser 16:10); Bing #2 | — | WebSearch #1 = GH |
| the glownique neon signs | **#4** / 0 / 0 | DDG #1, Bing #1 | — | ETSY-M #2 on both |
| theglownique.com | 0 / 0 / 0 | — | — | "The Glowtique" (a MA salon) and glownique.com fill the page |
| The Glownique reviews | 0 / 0 / n.a. | — | — | Scam-checker pages about glownique.com and glownique4u.online |
| is The Glownique legit | 0 / 0 / n.a. | — | — | Same scam-checker pattern |
| theglownique (extra) | 0 / 0 / 0 | DDG #2, Bing #2 | IG #1, FB #4 (DDG and Bing) | GH #7 |

**Knowledge panel:** none observed.
- Bing right rail (`#b_context`) was empty for "The Glownique" and "theglownique" (≈16:14).
- DuckDuckGo showed no infobox (≈16:15).
- Google could not be checked (CAPTCHA).

### Detail by query

**Q1 "The Glownique"**

- **WebSearch (≈15:44):** facebook.com/glowniqueofficial, then glownique.com /pages/services, /pages/about-us, 3 product pages, the homepage, /pages/contact-us and /collections. All UNREL (cosmetics).
- **DDG curl (15:46:08):** 6 results, all UNREL:
  1. glownique.com/pages/about-us
  2. glownique.com/
  3. youtube.com/channel/UCpFO98i3jc6931jkbPQMiFw, "The Glownique" (mehndi Shorts)
  4. deastilosacouture.com/pages/glownique (cosmetics retailer)
  5. glownique.com/collections/all-products
  6. facebook.com/p/Glownique-61574842785940/ ("Glownique | Wolverhampton", tanning)
- **DDG browser (≈16:10):** the same first 5, plus walmart.com GLOWNIQUE product pages ×2.
- **DDG unquoted (≈16:15):** glownique.com, about-us, FB glowniqueofficial, theglowtique.com, shop.app/m/glownique, IG glowniqueofficial, glownique.net/collections/all, YT @glownique, YT UCpFO98…, glownique.net.
- **Bing browser (≈16:03, "About 340 results"):** glownique.com about-us, glownique.com, the YouTube "The Glownique" channel, FB glowniqueofficial ("Miami FL"), deastilosacouture, glownique.com all-products, a glownique.com product, facebook.com, shop.app, and scam-detector.com/validator/glownique-com-review/.

**Q2 Glownique**

- **WebSearch:** FB glowniqueofficial, IG glowniqueofficial, GOV.UK "GLOWNIQUE LTD" (15834488), YT @Glownique, glownique.com ×3, glownique.net/pages/contact, Wikipedia "Glow", Wikipedia "Glow & Lovely".
- **DDG browser (≈16:09):**
  1. glownique.com
  2. glownique.com/pages/about-us
  3. glowniqueshop.com
  4. glownique.net/collections/all
  5. shop.app/m/glownique
  6. IG glowniqueofficial
  7. glownique.net
  8. x.com/WeAreGlownique
  9. glowniqueshop.com collection
  10. FB glowniqueofficial
- **DDG curl:** HTTP 202 (blocked).
- **Bing:** irrelevant results (Microsoft "Hotmail" support pages, math.stackexchange), both in the browser and via curl ("88 results"). **Unusable.**

**Q3 Glownique neon**

- **WebSearch:**
  1. **GH** github.com/Huzaifa4412/theglownique
  2. magnific.com (GEN)
  3. Wikipedia "Neon lamp" (GEN)
  4. stock.adobe.com (GEN)
  5. canva.com (GEN)
  6. **OWN** /products/custom-neon-signs
  7. Wikipedia "Neon lighting" (GEN)
  8–9. glownique.com blog posts (UNREL)
- **DDG curl (15:46:17):**
  1. glownique.com
  2. **ETSY-S**
  3. **ETSY-M** etsy.com/market/glownique_neon_sign
  4. glownique.net/collections/all
  5. glownique.net
  6. IG glowniqueofficial
  7. glownique.com all-products
  8. glowniqueshop.com
  9. IG @glownique ("Glownique Designs", clothing)
  10. YT @glownique
- **DDG browser (≈16:10):** the Etsy shop was absent. ETSY-M was #2. Everything else was UNREL, including an Amazon "GLOWNIQUE" store and shop.app.
- **Bing browser (≈16:04, "About 278 results"):**
  1. glownique.com
  2. **ETSY-S**
  3. **ETSY-M**
  4. glownique.net/collections/all
  5. glownique.net
  6. IG glowniqueofficial
  7. glownique.com all-products
  8. glowniqueshop.com
  9. IG @glownique
  10. YT @glownique

**Q4 the glownique neon signs**

- **WebSearch:**
  1. etsy.com/market/glow_neon_sign (GEN)
  2. nist.gov
  3. amazon.com
  4. **OWN** /products/custom-neon-signs
  5. makeneon.com
  6. nationalsigncorp.com
  7. fastneonsigns.com
  8. glowneonlights.com
  9. walmart "Glowneon"
- **DDG curl (15:46:21):**
  1. **ETSY-S**
  2. **ETSY-M**
  3. glownique.net
  4. glownique.com
  5. IG glowniqueofficial
  6. pk.linkedin.com/in/farhan-akhlaq-… (unrelated sign company owner)
  7. facebook.com/glowniquebeauty (tanning salon)
  8. glowniqueshop.com
  9. FB glowniqueofficial
  10. YT @glownique
- **DDG browser (≈16:10):**
  1. **ETSY-S**
  2. **ETSY-M**
  3. glownique.net/collections/all
  4. glownique.com
  5. IG glowniqueofficial
  6. glownique.net
  7. neonchamp.com (competitor)
  8. **GH**
  9. facebook.com/glownique ("Glownique Designs")
  10. glownique.com about-us
- **Bing browser ("About 36,000 results"):** **ETSY-S**, **ETSY-M**, glownique.net, glownique.com, IG glowniqueofficial, pk.linkedin.com/in, FB glowniquebeauty, glowniqueshop.com, FB glowniqueofficial, YT @glownique.

**Q5 theglownique.com**

- **WebSearch:** Wikipedia ×5 (GEN), FB glowniqueofficial and glownique.com ×3. The summary misattributed the domain (see §6).
- **DDG curl (15:46:25) and browser (≈16:11):**
  1. theglowtique.com ("The Glowtique", a salon in East Longmeadow, MA)
  2. glownique.com all-products
  3. glownique.com
  4. theglowtique.com/about
  5. glownique.com about-us
  6. FB theglowtique
  7. theglowtique.com/gallery
  8. a theglowtique product page
  9. glownique.com services
  10. glownique.com contact-us
- **Bing browser ("About 2,470 results"):** the same pattern.

**Q6 The Glownique reviews**

- **WebSearch:** FB glowniqueofficial, amazon.com/stores/GLOWNIQUE, glownique.com collections, glownique.com, TikTok "glowny review" discover pages ×2, Wikipedia "The Glow (album)", a glownique.com product, glownique.net.
- **DDG browser (≈16:09):**
  1. glownique.com
  2. scam-detector.com/validator/glownique-com-review/
  3. gridinsoft.com/…/glownique-com ("79/100 Trust Score")
  4. FB glowniqueofficial
  5. hypestat.com/info/glownique.com
  6. glownique.com about-us
  7. YT @GlowniqueJaishree27
  8. YT UCpFO98…
  9. gridinsoft.com/…/glownique4u-online ("Store Scam Warning")
  10. FB glowniquebeauty
- **Bing:** irrelevant results (Google Chrome download pages). Unusable.

**Q7 is The Glownique legit**

- **WebSearch:** glownique.com pages ×6, FB glowniqueofficial, glownique.net.
- **DDG browser (≈16:09):**
  1. scam-detector glownique-com-review
  2. gridinsoft glownique-com
  3. glownique.com
  4. scamadviser.com
  5. gridinsoft glownique4u-online
  6. glownique.com about-us
  7. islegitsite.com
  8. onlyreputable.com
  9. scamadviser.com/check-website/glownique4u.online
  10. hypestat glownique.com
- **Bing:** irrelevant results (WhatsApp pages). Unusable.

**Q8 theglownique (handle, extra)**

- **DDG browser (≈16:09):**
  1. **SOC** IG @theglownique (stale snippet: "1,042 Followers, 0 Following, 35 Posts")
  2. **ETSY-S**
  3. glownique.com
  4. **SOC** facebook.com/61578567176081/ (snippet from a Dec 17, 2025 post)
  5. IG glowniqueofficial
  6. glownique.com skincare
  7. **GH**
  8. YT GLOWNIQUE lip-gloss video (UNREL)
  9. **ETSY-L** listing 4501020899 (snippet: "Ships from Austin, TX. Listed on May 7, 2026")
  10. YT @Theglownique-r2h (UNREL)
- **Bing browser (≈16:14, "About 6,030 results"):** the same order for #1–4, GH at #7, an Etsy listing at #9.

---

## 2. Indexation hints

> **Caveat:** `site:` results are sampled and approximate. **They are not an index report.** Use the Google Search Console Page-indexing report and Bing Webmaster Tools (URL Inspection / Site Explorer) for the authoritative count.

| Probe | Engine / time | Result |
|---|---|---|
| `site:theglownique.com` | DDG browser ≈16:08 | **"No results found for site:theglownique.com"** |
| `site:www.theglownique.com` | DDG browser ≈16:09 | **No results found** |
| `site:theglownique.com -www` | DDG browser ≈16:09 | **No results found** |
| `site:` ×3 | DDG HTML curl 15:52–16:08 | HTTP 202 (anomaly/rate limit). No data |
| `site:theglownique.com` | Bing browser ≈16:02 | "About 52 results", **all from kisskh.co** (unrelated). No site URLs. Unusable |
| `site:www.theglownique.com` | Bing browser ≈16:04 | "About 60,900 results", all unrelated (adult) domains. Unusable |
| `site:` ×3 | WebSearch ≈15:53 | Operator not supported. Only unrelated Wikipedia/Substack pages |
| Domain-filtered WebSearch (`allowed_domains=theglownique.com`, 8 topical queries) | ≈15:54–16:15 | Only **1 URL** ever returned: https://www.theglownique.com/products/custom-neon-signs |
| `site:` | Google | Not observable (CAPTCHA 16:05:41) |

**Supporting facts:**
- **Sitemap:** https://www.theglownique.com/sitemap.xml lists **49 URLs** (≈15:48): home, 15 business-signs, 4 guides, 7 custom-signage, 4 products, 6 policy/contact pages, the blog hub and 11 posts.
- **robots.txt:** allows all crawlers, including GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended. It disallows only `/api/`.
- **Redirects:** the apex domain returns 308 to www. `http://` returns 308 to `https://`.
- **Domain registration (RDAP, ≈16:14):** registered **2026-08-04T18:15:26Z**, expires 2027-08-04. Registrar Hostinger; nameservers Vercel.
- **Common Crawl:** "No Captures found for: theglownique.com" in CC-MAIN-2026-39, -34 and -30 (≈16:13).
- **Wayback Machine:** no captures of theglownique.com.
- **Duplicate host:** `https://theglownique.vercel.app/` returns 200 with the full site. It has a canonical tag pointing to www.theglownique.com and `meta robots` set to "index, follow". It is also the "homepage" field on the public GitHub repo.

**(inference)** Bing and DuckDuckGo appear to hold zero site URLs. Bing-grounded answers (ChatGPT search, Copilot) therefore cannot cite the site today, and the site is not in the 2026 Common Crawl snapshots used for LLM training. The domain's age (7 weeks) likely explains part of this.

---

## 3. Etsy: shop verification

**Access:** WebFetch returned 403. curl returned 403 (a DataDome page pointing to `geo.captcha-delivery.com`). web-reader returned 429. **The logged-out browser pane loaded Etsy normally**, with no challenge shown.

### Current shop, https://www.etsy.com/shop/TheGlownique (browser, ≈16:04–16:06)

| Field | Observed value |
|---|---|
| Shop name | **TheGlownique** (banner: "WELCOME TO THEGLOWNIQUE", "ENJOY UPTO 70% OFF") |
| Shop ID | 57842127 (from the `referring_id=57842127` contact link) |
| Location shown | **United States** |
| Sales | **25** ("25 sales" in header, "25 Sales" in sidebar, "Sales 25" in About) |
| Reviews / rating | **5.0 (8)**, shown as the "Average item review" |
| Admirers | **286** |
| Age | "1.5 years on Etsy". About section: "On Etsy since 2025" |
| Active items | **78**, all 78 "On sale". Sections: Custom Neon 37, wedding signs 5, Gaming room 4, Backlit Signs 17, Acrylic Uv Print sign 3, Restaurant Sign 7, Salon/Spa 5 |
| Prices shown? | **Yes.** Examples: USD 10.80 (was 36.00), 11.40 (was 38.00), 28.50 (was 95.00), all "(70% off)", plus "FREE delivery" (to a Pakistan viewer) |
| Star Seller badge | **Not displayed.** No "Star Seller" text on the shop or listing page (browser find, ≈16:05) |
| Seller display name | "Dena" ("Message Dena"). The Aug/Sep 2025 snapshots showed "Owned by Rabia" |
| Announcement | Last updated 16 Jun 2025. Mentions "up to 70% OFF" and "56+ Stylish Fonts" |
| About headline | "Glownique – Custom Neon Signs That Light Up Your World". The shop copy uses "Glownique", not "The Glownique" |
| Production partners | Two described. One says "United States" |
| Policies | Last updated 17 Dec 2025. Returns: "See item details for return and exchange eligibility." |
| Link to theglownique.com | None found on the shop page |
| Reviews listed (8) | Dated 30 Dec 2025, 02 Oct 2025 (×3, **same reviewer name**), 19 Sep 2025, 03 Sep 2025 (×2, **same reviewer name, identical text**), 09 Jul 2025 |

### Listing 1878290703 (the only Etsy URL the site links to), browser ≈16:05

| Field | Observed value |
|---|---|
| Price | **USD 10.80**, original USD 36.00, "70% off", "Sale ends on 11 October" |
| Price note | "Displayed price is a deposit only—final cost depends on size." |
| Warranty in description | "We offer a **3-year warranty** on all neon signs" |
| Returns | "Returns & exchanges not accepted" |
| Ships from | "**Sent from: United States**" (delivery destination: Pakistan) |
| Processing time | **Not shown explicitly.** Delivery estimate: "Get it by 30 Sept-05 Oct" when ordered on 24 Sep, to Pakistan |
| Shipping | "Free delivery". Description says DHL & FedEx, "absolutely FREE" |
| Item reviews | 5.0, "(2 reviews)", "100% Buyers recommend" |
| Other | "Typically responds within a few hours". "Listed on 16 Aug, 2026". "824 favourites". Colour options: 12 solid colours plus RGB |
| Ads | This listing is the first tile on https://www.etsy.com/market/glownique_neon_sign, labelled "Ad by Etsy seller". That page shows "819 relevant results", mostly other sellers |

### Historical snapshots (Wayback Machine)

Snapshots of the listing were taken on **2025-08-30 and 2025-09-05**. No snapshot exists for the shop page.

| Field | 2025-08-30 | 2025-09-05 |
|---|---|---|
| Sales | "6 sales" | "5 sales" |
| Age | "6 months on Etsy" | "6 months on Etsy" |
| Shop rating | 5.0 (1) | 5.0 (3) |
| Owner | Owned by Rabia | Owned by Rabia |
| Ships from | "Austin, TX" | "Austin, TX" |
| Price | $10.80 (was $36.00) | $10.80 (was $36.00) |
| Warranty | "1-year warranty" | "1-year warranty" |
| JSON-LD | brand "TheGlownique", `shippingOrigin` US-TX | same |

### Search-snippet evidence

- DuckDuckGo snippet for listing 4501020899 (≈16:09): "sold by TheGlownique. Ships from Austin, TX."
- Bing/DuckDuckGo shop snippet: "a love for design and the magic of neon light."

### Not verifiable

- A shop-level processing time. Etsy does not display one.
- A US-destination delivery estimate for 2026. Changing the destination needs form input, which was not done.
- Whether the shop ever held Star Seller status.
- Sales by period.
- Whether "Rabia" and "Dena" are the same account holder. **(inference)** Same shop ID, so same shop.

---

## 4. Third-party mentions and backlinks

**Searched:**
- WebSearch: brand terms plus "neon", with the brand's own domains, Etsy and GitHub blocked; plus social and directory domain allow-lists (Yelp, Houzz, Alignable, Crunchbase, Trustpilot, BBB, Manta, YellowPages, Pinterest, TikTok, YouTube, LinkedIn, X).
- DuckDuckGo and Bing brand SERPs.
- Direct checks: Pinterest source page, Trustpilot, ScamAdviser, BBB, SmartCustomer/Sitejabber.

**Findings:**
1. **No independent editorial, press, blog, directory, Reddit, Pinterest, TikTok or YouTube mentions of the neon brand were found.**
2. Platform or aggregator pages that reference the brand. None of these is an editorial mention:
   - https://www.etsy.com/market/glownique_neon_sign: an Etsy search landing page ranking top-3 for neon brand queries. It shows mostly competitors.
   - https://www.smartcustomer.com/reviews/theglownique.com (redirected from sitejabber.com/reviews/theglownique.com, ≈16:13): "Theglownique Reviews", 0 reviews, meta robots `noindex`. A random-domain test returned 404, so this is a real, unclaimed profile.
   - Owned but ranking: https://github.com/Huzaifa4412/theglownique (public; created 2026-07-30; homepage field theglownique.vercel.app) and the vercel.app duplicate host.
3. **Could not check:**
   - Trustpilot ("Verifying Connection", 403), ScamAdviser (Cloudflare), BBB ("You have been blocked").
   - Pinterest `/source/theglownique.com/` rendered no pins in the logged-out view (inconclusive).
   - Reddit: WebSearch refuses the reddit.com domain filter.
4. **Backlinks:** no backlink index was available (no GSC, Ahrefs or Semrush). **(inference)** No referring domains were observed. Check the GSC "Links" report and Bing Webmaster Tools "Backlinks".

---

## 5. Social profile consistency

| Platform | URL | Reachable | Name shown | Bio / category | Link to website? | Counts as displayed (time) |
|---|---|---|---|---|---|---|
| Instagram | https://www.instagram.com/theglownique/ | Yes via WebFetch. curl got a JS shell | TheGlownique (@theglownique) | "Handmade Neon Signs"; "We are Star Seller on Etsy \| 1000+ Neon Signs Sold". Highlights: FAQs, Price, Reviews, Custom Order, Best | **No.** Bio link goes to Etsy listing 1878290703 (`ref=shop_home_active_1`) | 3,854 followers, 2 following (≈15:55). DDG snippet (stale): 1,042 followers, 35 posts |
| Facebook | https://www.facebook.com/people/TheGlownique/61578567176081/ | Yes in browser (logged out). curl 400 | TheGlownique | "Page · Home decor". "TheGlownique is in United States America." "Not yet rated (0 reviews)" | **None shown** in About → Contact and basic info | "1.8K followers • 0 following". Page ID 691837727353065. **Created 15 July 2025.** "This Page isn't currently running ads." (≈16:06) |
| Etsy | https://www.etsy.com/shop/TheGlownique | Yes in browser | TheGlownique | Custom neon and backlit signs | No | See §3 |
| TikTok | https://www.tiktok.com/@theglownique | Yes in browser | — | **"Couldn't find this account"** (≈16:07) | — | — |
| Pinterest | https://www.pinterest.com/theglownique/ | Redirects to `pinterest.com/?show_error=true` | — | **(inference)** No profile at this handle | — | — |
| YouTube | https://www.youtube.com/@TheGlownique | Yes | "The Glownique" | **Unrelated.** Glow-up/self-care: "A soft space for glow-ups, girl energy, and gentle motivation" (channel UCjBm1Tnkl3fwA-1B8dRzTMw) | — | No videos visible |
| YouTube | https://www.youtube.com/@TheGlownique-l3i (UCpFO98i3jc6931jkbPQMiFw) | Yes | "The Glownique" | **Unrelated.** Mehndi Shorts. Ranks #3 DDG and Bing for "The Glownique" | — | "18 subscribers", "3 videos" |
| YouTube | https://www.youtube.com/@Theglownique-r2h | From DDG snippet | "Glow for all" | **Unrelated.** DIY skincare | — | — |
| LinkedIn | https://www.linkedin.com/company/theglownique | HTTP 404 | — | **(inference)** None | — | — |
| X | https://x.com/theglownique | "User Profile Not Found" | — | None | — | — |
| Threads | https://www.threads.com/@theglownique | Login wall | — | Inconclusive | — | — |
| Facebook vanity | https://www.facebook.com/theglownique | "This content isn't available at the moment" | — | **(inference)** Possibly unclaimed | — | — |

**Consistency findings:**
- **Name:** the site uses "The Glownique" (schema `alternateName` "The Glownique Custom Neon Signs"). Etsy, Instagram and Facebook use "TheGlownique". Etsy About copy uses "Glownique".
- **Links run one way:**
  - The site links to Instagram, Facebook and the Etsy *listing*.
  - No profile links back to theglownique.com.
  - The site never links to the Etsy *shop*. Its aria-label says "opens our Etsy shop", but the link opens a listing.
- **Claims differ between channels:** see §9.
- **Location:**
  - Facebook: US.
  - Etsy: US; ships from Austin, TX (2025 and a 2026 snippet).
  - Site: no address, no email, no legal name.
  - The only phone number is WhatsApp **+1 (289) 796-3492**. **(inference)** Area code 289 is southern Ontario, Canada.

---

## 6. AI-answer visibility

### Observed (no logins)

1. **WebSearch LLM summaries (≈15:44–16:15)**
   - For "theglownique.com": *"The primary website is actually glownique.com (not theglownique.com)."* This is a **misattribution**.
   - For "Glownique neon", "TheGlownique neon" and "theglownique tiktok": the brand was described as "a Next.js storefront". The source is the public GitHub README.
   - For "The Glownique reviews / legit / linkedin": answers were built from cosmetics facts (co-founders, Niagara Peninsula).
   - For "TheGlownique etsy neon sign": the summary attributed a Julius Caesar sign and a "24-month warranty" to TheGlownique. The cited listing (1331074472) is now unavailable. **(inference)** Its ID predates the shop, so this is likely a misattribution.
   - Positive: neon-qualified queries were paraphrased correctly from `/products/custom-neon-signs` (12V, 13 colours + RGB, 5-year warranty, Etsy payment).
2. **DuckDuckGo Search Assist (≈16:11):** offered "Generate answer" for "what is The Glownique neon sign company", but no answer text rendered. Its 10 source results were all non-neon entities, plus the Etsy market page. **(inference)** Any generated answer would be grounded in the wrong entity.
3. **Not observable:**
   - Google AI Overviews / AI Mode (CAPTCHA).
   - Perplexity (Cloudflare verification).
   - Bing Copilot (sign-in wall).
   - ChatGPT, Gemini and Claude (require login; not attempted).

### Proposed monthly prompt panel (run manually)

**Run setup:** first business day of each month. Use a US locale (US VPN), a fresh or incognito session, and search/browsing ON where offered.

**Engines:** ChatGPT, Perplexity, Google AI Overview / AI Mode, Gemini, Copilot, Claude.

**Log per answer:**
- Brand mentioned (0/1)
- Correct entity (0/1; score 0 if cosmetics or salon facts appear)
- Cites theglownique.com (0/1)
- Cites Etsy shop, Instagram or Facebook (0/1)
- Key facts accurate (0–2: warranty, lead time, Etsy payment)
- Competitors named
- Sentiment (−1 / 0 / +1)
- Screenshot and cited URLs

**KPIs:**
- Correct-entity rate on brand prompts
- Mention rate on commercial prompts
- Site-citation share
- Confusion rate

| # | Type | Prompt |
|---|---|---|
| B1 | Brand | What is The Glownique? |
| B2 | Brand | Is The Glownique (theglownique.com) legit? |
| B3 | Brand | Are The Glownique custom neon signs any good? Reviews? |
| B4 | Brand | Is The Glownique the same company as GLOWNIQUE cosmetics? |
| B5 | Brand | Does The Glownique have an Etsy shop? How do I order? |
| B6 | Brand | What warranty, production time and shipping does The Glownique offer? |
| B7 | Brand | Who is behind The Glownique neon signs and where are they based? |
| C1 | Commercial | Best websites to order a custom LED neon sign online in the US |
| C2 | Commercial | Best Etsy shops for custom neon signs with a free mockup |
| C3 | Commercial | Where can I turn my business logo into a neon sign? |
| C4 | Commercial | Who makes the best custom wedding neon signs with our names? |
| C5 | Commercial | Best companies for 3D channel letter signs for a small storefront |
| C6 | Commercial | Where to buy a backlit acrylic logo sign for an office lobby |
| C7 | Commercial | Recommended suppliers of slim LED lightbox signs for retail shops |
| C8 | Commercial | Where can I order a custom gaming neon sign with my gamertag? |

---

## 7. Competing "Glownique" entities (for disambiguation)

| # | Entity | Domain / profiles | What it is | Where it ranks / evidence |
|---|---|---|---|---|
| 1 | **GLOWNIQUE** (cosmetics). **Primary conflict** | glownique.com (registered 2020-02-01); IG @glowniqueofficial; FB /glowniqueofficial ("Miami FL"); X @WeAreGlownique; YT @Glownique; Amazon store; Walmart products; shop.app/m/glownique; stocked by deastilosacouture.com | Premium makeup and skincare. Co-founders Jaden Kim and Angelica Lentoni. Site text lists Toronto, ON (M4W 3E2) and Miami, FL (33131) | #1–5 for almost every brand query. Scam-checker pages about glownique.com (scam-detector, gridinsoft, hypestat) rank for "reviews" and "legit" |
| 2 | **Glownique (Wolverhampton)** | facebook.com/p/Glownique-61574842785940/; **GLOWNIQUE LTD**, Companies House 15834488 | Tanning/beauty salon. The company's registered office is in Wolverhampton (WV3 9RY), SIC 96020; incorporated 12 Jul 2024, **dissolved 16 Dec 2025**. **(inference)** Linked to the Facebook page by city | DDG #6 "The Glownique"; WebSearch #3 "Glownique" |
| 3 | Glownique (tanning FB page) | facebook.com/glowniquebeauty | "Tanning Salon", 80 likes (snippet) | DDG/Bing #7 "the glownique neon signs" |
| 4 | Glownique (jewellery) | glownique.net (Shopify; EU currencies) | Zircon ring shop | Top-10 "Glownique", "Glownique neon" |
| 5 | GlowniqueShop | glowniqueshop.com (Shopify) | Beauty products | Top-10 "Glownique", "Glownique neon" |
| 6 | Glownique Designs | IG @glownique ("Clothing (Brand)", 114 followers per snippet); facebook.com/glownique | Clothing | Holds the plain @glownique handles |
| 7 | **Glownique For You** | glownique4u.online (Shopify "Store unavailable", HTTP 402) | Korean skincare, jewellery and fashion. Gridinsoft: "12/100 Trust Score", scam indicators, domain ~7 months old | **Scam warnings rank for "is The Glownique legit"** (reputational spillover) |
| 8 | "The Glownique" (glow-up channel) | youtube.com/@TheGlownique | Self-care / motivation | Holds the @TheGlownique handle |
| 9 | "The Glownique" (mehndi channel) | youtube.com/@TheGlownique-l3i | Henna Shorts | #3 DDG and Bing for "The Glownique" |
| 10 | "Glow for all" / "Glownique Jaishree" | YT @Theglownique-r2h; YT @GlowniqueJaishree27 | Skincare / beauty reviews | DDG "theglownique" #10; "reviews" #7 |
| 11 | Near-name: **The Glowtique** | theglowtique.com; FB /theglowtique | Beauty salon, East Longmeadow, MA | **Owns the "theglownique.com" query** |
| 12 | Near-name neon brands | neoniqueled.com (Neonique LED, 2-year warranty); Glowneon (Walmart seller); GloW Neon Lights LLC (glowneonlights.com, Casper WY) | Neon competitors with similar names | Appear on neon-qualified queries |

---

## 8. Verified entity facts

**Confidence levels:**
- **High:** observed directly on the primary source at access time.
- **Medium:** from a snippet, WebFetch summarisation or an older snapshot.
- **Low:** inference.

| Fact | Value | Source URL | Confidence |
|---|---|---|---|
| Brand name (site) | "The Glownique" (`og:site_name`, `Organization.name`) | https://www.theglownique.com/ | High |
| Handle used on marketplaces and socials | "TheGlownique" | Etsy / IG / FB URLs above | High |
| Canonical host | https://www.theglownique.com (apex and http 308 → www) | https://theglownique.com/ | High |
| Domain registered | 2026-08-04 (Hostinger; Vercel DNS) | https://rdap.verisign.com/com/v1/domain/theglownique.com | High |
| Organization `sameAs` (current) | IG, FB and **Etsy listing 1878290703** (no shop URL) | https://www.theglownique.com/ (JSON-LD) | High |
| Public contact channels | WhatsApp +1 (289) 796-3492 and Etsy only. No address, email or legal name on /contact, /terms, /privacy | https://www.theglownique.com/contact | High |
| Site claims | "5,000+ Happy Clients"; "Etsy Star Seller"; 5-year warranty; ~10–15 days | https://www.theglownique.com/ | High (as claims) |
| Etsy shop | TheGlownique, shop ID 57842127 | https://www.etsy.com/shop/TheGlownique | High |
| Etsy location | "United States" | same | High |
| Etsy sales | 25 (2026-09-24) | same | High |
| Etsy rating | 5.0 (8 reviews) | same | High |
| Etsy admirers | 286 | same | High |
| Etsy since | 2025 ("1.5 years on Etsy") | same | High |
| Etsy active listings | 78, all on sale (70% off) | same | High |
| Etsy Star Seller | Not displayed | same + listing | High (absence at access time) |
| Etsy seller display name | "Dena" (2026). "Rabia" (Aug/Sep 2025) | listing page; Wayback snapshots | High / High (historical) |
| Listing price and terms | USD 10.80 deposit (was 36.00); 3-year warranty; no returns; "Sent from: United States" | https://www.etsy.com/listing/1878290703/custom-neon-sign-led-light-for-wedding | High |
| Historical ships-from | Austin, TX (2025 snapshots; 2026 DDG snippet for listing 4501020899) | https://web.archive.org/web/20250905104253/https://www.etsy.com/listing/1878290703/custom-neon-sign-led-light-for-wedding | High (2025) / Medium (2026) |
| Instagram | @theglownique, 3,854 followers, 2 following; bio claims Star Seller and 1000+ sold; bio link → Etsy listing | https://www.instagram.com/theglownique/ | Medium-High (WebFetch) |
| Facebook | TheGlownique, 1.8K followers, Home decor, 0 reviews, US, created 15 Jul 2025, Page ID 691837727353065 | https://www.facebook.com/people/TheGlownique/61578567176081/ | High |
| TikTok @theglownique | Does not exist | https://www.tiktok.com/@theglownique | High |
| YouTube @TheGlownique | Owned by an unrelated channel | https://www.youtube.com/@TheGlownique | High |
| Search index footprint | DDG `site:` = 0. WebSearch = 1 URL. Common Crawl = 0. Wayback = 0 | see §2 | High (as observed) |
| Public source repo | github.com/Huzaifa4412/theglownique is public and includes an `SEO-Optimization/` strategy folder | https://api.github.com/repos/Huzaifa4412/theglownique | High |
| Duplicate host | theglownique.vercel.app serves the site (canonical → www) | https://theglownique.vercel.app/ | High |
| Business base country | Unresolved: US (Etsy, FB) vs +1-289 (Ontario) phone | multiple | Low (inference) |

---

## 9. Conflicts and risks

1. **Scale claims contradict the only public sales ledger.** The site says "5,000+ Happy Clients". Instagram says "1000+ Neon Signs Sold". Etsy shows **25 sales** and **8 reviews**, and the site states all payments go through Etsy. This is a trust and substantiation risk, and AI answers may cite Etsy's numbers against the site. **(inference)**
2. **"Etsy Star Seller"** (site, Instagram) is not displayed on the Etsy shop or listing.
3. **Warranty:** site and llms.txt say 5 years. The Etsy listing says 3 years (1 year in Sep 2025).
4. **Shipping:** llms.txt says there is "no standing free-delivery offer". The Etsy listing and shop show "Free delivery", and the listing text says "absolutely FREE". A 22 May Facebook post and a Dec 17 2025 post promote free shipping.
5. **Pricing:** the site FAQ and llms.txt promise "fixed prices" on Etsy. The Etsy listing says the displayed price is a deposit only. Etsy prices sit at a permanent "70% off" (since at least Aug 2025). Facebook says "starting from just $39". **(inference)** A perpetual-sale framing can raise consumer-law and marketplace-policy questions.
6. **Colours:** the site says 13 colours + RGB. The Etsy variation list shows 12 + RGB (minor).
7. **`sameAs`, llms.txt and every on-site Etsy CTA point to one listing, not the shop.** The listing is weaker as an entity identifier and can be deactivated.
8. **Identity and geography are inconsistent:**
   - No address, legal name or email on the site.
   - Etsy says US / Austin TX; Facebook says US.
   - The only phone is a WhatsApp number with an Ontario area code (289), overlapping GLOWNIQUE cosmetics' Ontario footprint.
   - The seller display name changed from Rabia to Dena.
9. **Name variants:** "The Glownique" / "TheGlownique" / "Glownique" (Etsy About). The bare "Glownique" belongs to the cosmetics brand in every engine.
10. **Handle collisions:** YouTube @TheGlownique and @TheGlownique-l3i, IG @glownique, FB /glownique and X @WeAreGlownique are all held by others.
11. **Near-zero discoverability:** 0 Bing/DuckDuckGo site URLs, 0 Common Crawl captures, 0 independent mentions. LLMs have nothing to ground on except Etsy, the socials and GitHub. The misattributions in §6 are the result.
12. **The public GitHub repo ranks for brand queries.** Its README shapes AI descriptions ("Next.js storefront"). It also exposes the full SEO/competitor strategy (`SEO-Optimization/`), `CLAUDE.md` and `.claude/`.
13. **Duplicate vercel.app host** is indexable ("index, follow"). The canonical tag mitigates this but does not remove it.
14. **Reputation spillover:** "legit" and "reviews" SERPs are full of scam-checker pages for glownique.com and a scam-flagged glownique4u.online.
15. **Review concentration on Etsy:** 5 of the 8 shop reviews come from 2 reviewer names on 2 dates, including two identical texts. The homepage showcases these reviewers. **(inference)** This is a credibility risk if scrutinised. It is not evidence of wrongdoing.
16. **Etsy "market" page leakage:** etsy.com/market/glownique_neon_sign ranks top-3 for neon brand queries and shows 819 mostly competitor results. **(inference)** Some brand demand leaks to rivals.

---

## 10. Recommended entity actions

### 10.1 `sameAs` and schema corrections (site JSON-LD, footer, llms.txt)

- **Replace** `https://www.etsy.com/listing/1878290703/...` with **`https://www.etsy.com/shop/TheGlownique`** in `Organization.sameAs` and in llms.txt "Brand & Social Presence". Keep listing links only as purchase CTAs, and point "Visit The Glownique on Etsy" to the shop.
- **Keep** `https://www.instagram.com/theglownique/` and the Facebook URL. Claim a Facebook username (/theglownique appears unassigned **(inference)**), then update `sameAs` to the vanity URL.
- **Do not** add any YouTube "The Glownique" channel. All current ones are unrelated.
- **Add to Organization** (only values that are true):
  - `disambiguatingDescription`, e.g. "Maker of made-to-order LED neon and illuminated business signs; not affiliated with GLOWNIQUE cosmetics."
  - `contactPoint` (WhatsApp telephone, contactType "customer service").
  - `foundingDate` (Etsy shows 2025).
  - `address.addressCountry` once one base country is decided.
  - `areaServed`.
  - Optionally type it as `OnlineStore`, with `hasMerchantReturnPolicy` matching the real policy.
- **Add on-page disambiguation:** a short About paragraph and an FAQ ("Is The Glownique related to GLOWNIQUE cosmetics?"). Mirror it in llms.txt.

### 10.2 Align claims before building citations (highest priority)

- Remove or substantiate "5,000+ Happy Clients", "Etsy Star Seller" and the Instagram bio's "Star Seller | 1000+ Neon Signs Sold". Use verifiable figures instead, e.g. "5.0★ on Etsy".
- Use one warranty term everywhere (site, llms.txt, Etsy listings, Instagram highlights).
- Use one shipping statement everywhere (free vs quoted), including the Etsy listing text and Facebook posts.
- Reword "fixed prices" vs "deposit only" consistently.
- Align colour count and lead time.
- Use "The Glownique" as the display name everywhere: Etsy shop title and About copy, Facebook page name, Instagram name field. Keep "TheGlownique" as the handle.
- Publish a consistent base and dispatch location (and ideally a business or legal name) on /contact and in schema.

### 10.3 Profiles to create or fix

| Profile | Action |
|---|---|
| TikTok | Create **@theglownique** (currently "Couldn't find this account"). Add the website link and a neon-specific bio |
| Pinterest | Create a business account **theglownique** (URL currently errors). Claim theglownique.com and pin product and project images linking to site pages |
| YouTube | @TheGlownique is taken. Use a distinct handle such as **@TheGlowniqueSigns** or **@TheGlowniqueNeon**. Add website and Etsy shop links and a disambiguating channel description |
| LinkedIn | Create a company page (company/theglownique returns 404) with the website URL |
| X | Optionally reserve @theglownique (not found) for defence |
| Instagram | Point the bio link to theglownique.com (or a link hub with the site first and Etsy second). Correct the bio claims |
| Facebook | Add website and Instagram in About → Contact and basic info. Claim a username. Enable reviews |
| Etsy | Mention "The Glownique" in the shop title and announcement. Link the website where Etsy policy allows |
| SmartCustomer / Trustpilot | Claim the existing SmartCustomer profile. Consider Trustpilot only with a compliant, non-gated review-invite flow |
| Google Business Profile / Bing Places | Only if a qualifying address or service area exists. Follow each platform's eligibility rules |

### 10.4 Citations to pursue (no independent mentions exist yet)

1. **Wedding and event vendor directories** (The Knot, WeddingWire, Zola vendor listings). Real-wedding features credit the sign maker with a link.
2. **Maker and small-business directories:** Alignable, Crunchbase (organisation profile), Houzz (lighting/decor), plus a local chamber if a physical base is published.
3. **Editorial roundups:** "best custom neon sign" and gift-guide articles. AI answers cite these heavily for commercial prompts C1–C4. Pitch neutral publishers, not competitor blogs.
4. **Creator placements:** streamer, gaming-setup and café/salon customer features on YouTube, TikTok and Instagram that tag and link the brand, with permission-based case studies on the site.
5. **Expert quotes** via journalist-request platforms, on signage cost and channel-letter topics (matching /guides).
6. **Wikidata:** defer until at least two independent, reliable references exist.

### 10.5 Indexation and technical prerequisites

- Verify the site in **Bing Webmaster Tools**, submit the sitemap and enable **IndexNow**. Bing and DuckDuckGo show zero pages, and Bing is the grounding index for ChatGPT search and Copilot. In Google Search Console, submit the sitemap and inspect key URLs.
- Add a **308 redirect from theglownique.vercel.app to www.theglownique.com**, or send `X-Robots-Tag: noindex` on non-production hosts.
- **Make the GitHub repo private**, or strip the `SEO-Optimization/` folder, `CLAUDE.md` and `.claude/`, and rewrite the README so it does not describe the brand as a "Next.js storefront".
- Re-run this baseline monthly alongside the §6 prompt panel. Track OWN presence in the top 10 for Q1–Q8, the Bing index count, and the AI correct-entity rate.

---

### Appendix: evidence files (scratchpad)

- `serp/ddg_*.html`, `serp/ddg_results_*.json`: DuckDuckGo HTML SERPs (15:46, curl).
- `serp/bing_*.html`, `serp/bing_rss_the_glownique.xml`: degraded Bing responses.
- `fetch/wb_listing_20250830.dec.html`, `fetch/wb_listing_20250905.dec.html` (+ `.txt`): Wayback Etsy listing snapshots.
- `fetch/home.html`, `site_*.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `prod.html`: the site as fetched at ≈15:48–16:00.
- `fetch/https___www_youtube_com_*`, `ig.html`, `fb.html`, `ch.html`, `cmp_*.html`, `g4u*.html`, `tp_*.html`: probes of social profiles and competing entities.
- Browser-pane observations (Etsy, Facebook, TikTok, Pinterest, DuckDuckGo, Bing) were read live; the page text is quoted above.
