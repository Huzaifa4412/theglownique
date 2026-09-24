# Search & AI-crawler documentation register — The Glownique

**Access date for every source below: 2026-09-24.**
**Site context:** made-to-order, quote-based custom illuminated signs; no public fixed prices; payment happens on Etsy; no physical storefront; Next.js App Router. The app at `next-js-frontend/` has **next@16.2.12** installed; the nextjs.org docs currently describe **v16.3.6** ("Latest").

**How this was checked.** TinyFish was unavailable (not authenticated) and the web-reader MCP had run out of quota. Pages were downloaded as raw HTML with Python `urllib` (so the footer "Last updated" stamps could be read exactly), plus WebFetch and a JS-rendering browser for Bing's help pages, which are client-rendered. Raw copies (HTML plus extracted text) are in `scratchpad/research/raw/`. For Next.js, the documented behaviour was also checked against the installed source in `next-js-frontend/node_modules/next/dist`.

**Status tags:** `VERIFIED` = read on the primary source today. `SECONDARY` = only third-party confirmation. `INFERENCE` = my reasoning from the verified facts. `NOT VERIFIED` = could not confirm.

---

## Findings that contradict common SEO assumptions (quick list)

| # | Common assumption | What the primary docs say today | Ref |
|---|---|---|---|
| 1 | "Add FAQPage schema for FAQ rich results." | Google has stopped showing the FAQ rich result altogether. It was deprecated on **2026-05-08**, stopped appearing from **2026-05-07**, and the docs were removed on **2026-06-15**. The FAQPage doc URL now redirects to the changelog. HowTo has been gone since **2023-09-13**. | DOC-03 |
| 2 | "Product schema needs `offers` with a price." | For product snippets, **one of** `offers`, `review` or `aggregateRating` is enough. Merchant listings do need `Offer` with a price above 0, **and** the page must be one where the shopper can actually buy. Pages that link out to another seller (Etsy, in our case) are excluded. | DOC-01 |
| 3 | "Use `AggregateOffer` lowPrice/highPrice for a 'from $X' range." | Only product snippets accept AggregateOffer, and Google says not to use it for a set of product variants. It is meant for offers from several merchants. Merchant listings reject AggregateOffer. | DOC-01 |
| 4 | "`schema.org/MadeToOrder` is fine for custom items." | It is a valid schema.org value, but it is **not** in Google's 10 supported availability values and it has no Merchant Center mapping. | DOC-01 |
| 5 | "Show our reviews (e.g., from Etsy) as stars." | Google says **not to aggregate reviews from other websites**. Organization/LocalBusiness stars are ineligible when the business controls its own reviews, and that includes embedded widgets. A new guideline (**2026-07-24**) bans fake or undisclosed incentivized reviews. | DOC-02 |
| 6 | "llms.txt helps with Google AI Overviews." | Google Search **ignores** llms.txt; it neither helps nor harms (clarified **2026-06-15**). Google says no special files or markup are needed for AI features. | DOC-05/06 |
| 7 | "There's no way to opt out of AI Overviews without noindex/nosnippet." | Search Console now has a **Search generative AI control** (rolled out worldwide on **2026-08-31**). It is set to *include* by default, and the AI guide makes being included an eligibility condition. | DOC-05 |
| 8 | "Search Console can't show AI Overview/AI Mode visibility." | A new **Generative AI performance report** exists (announced 2026-06-03, rolled out to all sites 2026-08-31). It documents **impressions only**. Clicks from AI features are still counted inside the normal Performance report ("Web"). | DOC-05 |
| 9 | "Set a canonical in the root layout and you're done." | In Next.js, metadata merges shallowly, so a root `alternates.canonical` is **inherited by every page that doesn't set `alternates`**. If it is `'/'`, every such page declares the homepage as its canonical. | DOC-12 |
| 10 | "`priority`/`changefreq` in sitemaps matter." | Google ignores both. `lastmod` is used only when it is consistently and verifiably accurate. The Next.js docs example uses `lastModified: new Date()`, which goes against Google's guidance. | DOC-09 |
| 11 | "IndexNow covers Google too." | Google does not appear among the IndexNow endpoints (Amazon, Bing, Naver, Seznam, Yandex, Yep, plus the global endpoint). Bing's guidelines now prefer streaming submissions over batches. | DOC-10 |
| 12 | "`noarchive` is obsolete." | Google no longer uses it (since 2024). **Bing** says NOARCHIVE keeps content out of Copilot answers and grounding, and NOCACHE limits Copilot to URL, title and snippet. | DOC-10 |
| 13 | "All AI bots obey robots.txt." | ChatGPT-User ("rules may not apply") and Perplexity-User ("generally ignores") are user-triggered and not reliably bound by robots.txt. Anthropic says all three of its bots, including Claude-User, honor robots.txt. | DOC-11 |
| 14 | "Google-Extended opt-out hides us from AI Overviews." | Google-Extended does not affect inclusion or ranking in Google Search. It controls Gemini Apps/Vertex AI training and grounding. To leave Search AI features, use the Search Console control. | DOC-06 |
| 15 | "Bing treats 308 like 301." | Bing's guidelines only name 301 (permanent) and 302 (under 2 days). Google treats 301 and 308 the same. Next.js `permanent: true` sends a 308. What Bing does with 308 is **not verified**. | DOC-07 |

---

## DOC-01 — Google Product structured data: product snippets vs merchant listings

| Source | URL | Page last updated |
|---|---|---|
| Introduction to Product structured data | https://developers.google.com/search/docs/appearance/structured-data/product | 2025-12-10 UTC |
| Product snippet (Product, Review, Offer) structured data | https://developers.google.com/search/docs/appearance/structured-data/product-snippet | 2026-09-08 UTC |
| Merchant listing (Product, Offer) structured data | https://developers.google.com/search/docs/appearance/structured-data/merchant-listing | 2026-09-08 UTC |
| General structured data guidelines | https://developers.google.com/search/docs/appearance/structured-data/sd-policies | 2026-07-10 UTC |
| schema.org ItemAvailability / MadeToOrder | https://schema.org/ItemAvailability , https://schema.org/MadeToOrder | schema.org V30.1, 2026-09-16 |
| Merchant Center: price / availability attributes | https://support.google.com/merchants/answer/6324371 , https://support.google.com/merchants/answer/6324448 | no date shown |

**Key facts (VERIFIED, paraphrased)**
- **Which markup applies.** Product snippets are for product pages where people **can't buy directly**, such as reviews and aggregators. Merchant listings are for pages where customers **buy from you**. Having both a feed and page markup maximizes eligibility, and snippets may take price from a Merchant Center feed when the page doesn't have one.
- **Product snippets: required.** `name`, plus "You must include one of the following properties": `review`, `aggregateRating` or `offers`.
  - Providing only `offers`, without `review` or `aggregateRating`, may trigger a Rich Results Test *warning*.
  - `offers` may be an `Offer` or an `AggregateOffer`.
  - Offer requires `price` (or `priceSpecification.price`). `priceCurrency` is recommended for snippets but required for merchant listings.
  - `price: 0` is documented as meaning "available without payment".
- **When none of offers/review/aggregateRating is present.** The general guidelines say "Items that are missing required properties are not eligible for rich results." Search Console reports this as an invalid item with the error *Either "offers", "review", or "aggregateRating" should be specified* (`SECONDARY`: the exact error string comes from Google Search Central Community threads, not from the docs).
- **Merchant listings: required.**
  - `name`, `image` and `offers` (an `Offer` only; "merchant listings require an Offer as the merchant has to be the seller").
  - A price greater than zero, plus `priceCurrency`.
  - Eligibility: only pages where a shopper can buy, "not pages with links to other sites that sell the product."
  - Shipping and return policies are recommended at Organization level. Offer-level policies are only for overrides.
- **AggregateOffer.** Accepted for product snippets only. It requires `lowPrice` and `priceCurrency`; `highPrice` and `offerCount` are recommended. Google gives multiple merchants as the use case and says "Don't use AggregateOffer to describe a set of product variants." It can't be used with the price-drop enhancement. Merchant listings don't accept it.
- **Availability values Google supports (both docs).** BackOrder, Discontinued, InStock, InStoreOnly, LimitedAvailability, OnlineOnly, OutOfStock, PreOrder, PreSale, SoldOut.
  - **MadeToOrder is not listed.** Reserved isn't either.
  - schema.org does define MadeToOrder ("made to order (custom made)").
  - Merchant Center's schema.org mapping has no MadeToOrder entry. Its only "build to order" value is for vehicle ads.
- **Page types.** Product rich results only support pages that focus on a single product or its variants. Category and listing pages aren't eligible. Google recommends Product markup in the **initial HTML**.
- **Quote-only / price-on-request.** No guidance on any Google Search page I checked.
  - The general guidelines forbid marking up content that isn't visible, and markup that misleads.
  - Merchant Center requires a price on every product, and any user in the target country must be able to buy at that price.

**Implication for a quote-based, made-to-order sign site** (`INFERENCE` from the facts above)
- **Merchant listings and Shopping free listings are out of reach** from this site as currently set up: checkout happens on Etsy, and there are no fixed prices. Don't write markup aimed at them.
- **Don't publish a `Product` JSON-LD that has none of offers/review/aggregateRating.** It shows up as an invalid item in Search Console and earns no rich result.
- **Don't invent prices.** `price: 0` means free, and hidden or estimated prices break the visible-content rule.
- Product snippets become an option only if a page shows **(a)** a real, visible price for a specific standard product (`Offer`), or **(b)** genuine reviews gathered on this site for that product. See DOC-02.
- For "from $X" size or variant pricing, `AggregateOffer` goes against Google's guidance. Use real per-variant `Offer`s (product-variant markup) only if those prices are published.
- Never use `MadeToOrder` expecting Google to recognise it. If an `Offer` is ever used, pick a Google-supported value, or leave `availability` out (it is only recommended).
- For quote pages, rely on Organization/WebSite (homepage), BreadcrumbList, ImageObject/image metadata (DOC-08), clear visible copy and fast HTML. These carry no penalty risk.

---

## DOC-02 — Reviews, self-serving reviews, review snippet eligibility

| Source | URL | Page last updated |
|---|---|---|
| Review snippet (Review, AggregateRating) structured data | https://developers.google.com/search/docs/appearance/structured-data/review-snippet | 2026-09-08 UTC |
| Blog: Making Review Rich Results more helpful | https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful | 2019-09-16 (updated 2019-09-18) |
| Search Central changelog | https://developers.google.com/search/updates | 2026-09-24 UTC |

**Key facts (VERIFIED)**
- Review snippets are supported for Product, LocalBusiness, Organization and some other types.
  - LocalBusiness and Organization only qualify for **sites that capture reviews about *other* businesses**.
  - If the reviewed entity controls the reviews about itself, its LocalBusiness/Organization pages are ineligible for stars. This covers markup and embedded third-party widgets such as Google or Facebook review widgets.
  - For LocalBusiness/Organization, ratings must come directly from users, not from editors.
- The 2019 FAQ says you **won't get a manual action** just for having self-serving reviews; Google simply won't show the stars.
- Technical guidelines (current):
  - Name a specific item (nest the review or use `itemReviewed`).
  - Reviews and ratings must be visible on the page.
  - Cover a single item, not a category.
  - Include an AggregateRating when there are several reviews.
  - **"Don't aggregate reviews or ratings from other websites."**
- **New 2026-07-24:** don't include fake or undisclosed incentivized reviews (for example, reviews written for money or free products without clear disclosure).
- 2025-01-15: Google recommends accepting ratings only when they come with a comment and the author's name.
- 2025-11-12: avoid indicating what's being reviewed in more than one way (the nesting clarification).
- Violations can lead to a manual action. A structured-data manual action removes rich-result eligibility but doesn't affect ranking.

**Implication**
- Never put `aggregateRating` or `review` on the Organization/OnlineBusiness entity for The Glownique.
- Etsy reviews can be **shown to users** as testimonials (with attribution). **Don't mark them up** as Review/AggregateRating on this site, because that is aggregating reviews from another site.
- If on-site reviews are collected later (with name and comment, disclosed incentives, about a specific product), they can support product snippets on that product's page. Don't reward reviews without disclosure.

---

## DOC-03 — FAQPage, HowTo and other retired structured data (dated timeline)

| Source | URL | Page last updated |
|---|---|---|
| Latest Google Search Documentation Updates (changelog) | https://developers.google.com/search/updates (anchors `#faq-deprecation`, `#removing-faq-rich-result`) | 2026-09-24 UTC |
| FAQPage doc (now redirects to the changelog) | https://developers.google.com/search/docs/appearance/structured-data/faqpage → `/search/updates#removing-faq-rich-result` | n/a (removed) |
| Blog: Changes to HowTo and FAQ rich results | https://developers.google.com/search/blog/2023/08/howto-faq-changes | 2023-08-08 (update 2023-09-14) |
| Blog: Simplifying the search results page | https://developers.google.com/search/blog/2025/06/simplifying-search-results | 2025-06-12 (update 2025-09-08) |
| Structured data search gallery | https://developers.google.com/search/docs/appearance/structured-data/search-gallery | 2026-06-15 UTC |

**Timeline (VERIFIED from changelog and blogs)**
- **2023-08-08:** FAQ rich results limited to well-known, authoritative government and health sites. HowTo limited to desktop. Google said unused structured data "does not cause problems".
- **2023-09-13/14:** HowTo no longer shown on desktop either and deprecated. HowTo docs removed on 2023-09-14.
- 2024-11-29: sitelinks search box docs removed (feature gone).
- **2025-01-22:** breadcrumb rich results shown on desktop only.
- **2025-04-23:** deprecation notice for Special Announcement (deprecated 2025-07-31).
- **2025-06-12:** phase-out announced for Book Actions, Course Info, ClaimReview, Estimated Salary, Learning Video, Special Announcement and Vehicle Listing.
- **2025-09-09:** docs removed for Course Info, Estimated Salary, Learning Video, Special Announcement and Vehicle Listing. Search Console and Rich Results Test support removed the same day.
- **2025-11-05:** Practice Problem deprecated. Dataset markup is now used only by Dataset Search. The Book Actions banner was removed because a feature still uses that markup.
- **2026-01-06:** Practice Problem docs removed.
- **2026-05-08:** FAQ rich result deprecation notice: "This feature will no longer appear in Google Search starting May 7, 2026."
- **2026-06-15:** FAQ rich result documentation removed ("no longer shown in Google Search results").
- The current Search gallery lists neither FAQ nor HowTo.

**Implication**
- Drop FAQPage and HowTo as Google rich-result tactics.
- Keep **visible** FAQ and process content for users. It still helps AI features and Bing, which ask for explicit, self-contained facts (DOC-05, DOC-10).
- Existing FAQPage markup can stay, since it is harmless per the 2023 blog, or be removed to cut maintenance.
- `NOT VERIFIED`: whether the Rich Results Test and Search Console still process FAQPage after 2026-06-15; whether Bing gives any benefit for FAQPage.

---

## DOC-04 — Organization structured data (and WebSite/site name)

| Source | URL | Page last updated |
|---|---|---|
| Organization structured data | https://developers.google.com/search/docs/appearance/structured-data/organization | 2026-09-08 UTC |
| Site names in Google Search | https://developers.google.com/search/docs/appearance/site-names | 2025-12-10 UTC |
| schema.org OnlineStore / isStoreOn | https://schema.org/OnlineStore , https://schema.org/isStoreOn | V30.1, 2026-09-16 |

**Key facts (VERIFIED)**
- **No required properties.** Add as many relevant ones as you can.
- **Recommended properties:**
  - `name` (use the same `name`/`alternateName` as your site name), `alternateName`, `url`, `logo`, `description`, `sameAs` (social or review profiles; several allowed).
  - Contact: `contactPoint` (email/telephone), `email`, `telephone` (with country code).
  - `address` (PostalAddress, if applicable).
  - Identifiers: `legalName` (if different from name), `foundingDate`, `numberOfEmployees`, `iso6523Code`, `duns`, `leiCode`, `naics`, `globalLocationNumber`, `taxID`, `vatID`.
  - Policies: `hasMerchantReturnPolicy`, `hasShippingService`, `hasMemberProgram`.
- **Logo:** at least 112×112 px, crawlable and indexable, in a Google Images format, and it should look right on a white background.
- **Placement:** on the home page or a single page that describes the organization (such as About). "You don't need to include it on every page of your site."
- **Use the most specific subtype.** Google's example: OnlineStore rather than OnlineBusiness for an ecommerce site. LocalBusiness subtypes are for local or physical businesses.
- **Site names:** `WebSite` structured data must be on the **domain-level home page**. Google also looks at og:site_name, `<title>` and headings on that page.
- schema.org `OnlineStore` has an `isStoreOn` → `OnlineMarketplace` property ("marketplace this online store is on"). Google doesn't document or use it (`INFERENCE`: no Google feature listed).

**Implication**
- Put one Organization entity plus a WebSite entity in the **homepage** JSON-LD. Linking them by `@id` is an optional best practice from the general guidelines. There's no need to repeat them in the root layout for every page.
- Use `OnlineBusiness`, or `OnlineStore` if the brand wants to be seen as an ecommerce seller. `INFERENCE`: since checkout is on Etsy, `OnlineBusiness` is the more literal choice.
- Don't use `LocalBusiness` (no storefront) or a street `address` you can't stand behind.
- Include `logo`, `url`, `sameAs` (Etsy shop, Instagram, Pinterest, etc.), and real contact methods. Add `legalName`/`vatID` only if they exist.
- Return and shipping policies aren't needed, because there's no merchant-listing path (DOC-01).

---

## DOC-05 — Google AI features (AI Overviews / AI Mode): what site owners should do, controls, reporting

| Source | URL | Page last updated |
|---|---|---|
| AI features and your website | https://developers.google.com/search/docs/appearance/ai-features | 2025-12-10 UTC |
| Optimizing your website for generative AI features on Google Search | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 UTC |
| Blog: A new resource for optimizing for generative AI | https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing | 2026-05-15 |
| Search Console Help: Search generative AI control | https://support.google.com/webmasters/answer/16908024 | no date; states rolled out worldwide 2026-08-31 |
| Search Console Help: Generative AI performance report (Search) | https://support.google.com/webmasters/answer/16984139 | no date; rolled out worldwide 2026-08-31 |
| Blog: Introducing Search Generative AI performance reports | https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports | 2026-06-03 |
| Search Console Help: How performance data is counted (AI Overviews / AI Mode) | https://support.google.com/webmasters/answer/7042828 | no date shown |
| Blog: web multimodal Search performance reporting | https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc | 2026-09-24 |
| Spam policies (now explicitly covers generative AI responses) | https://developers.google.com/search/docs/essentials/spam-policies | 2026-08-28 UTC |

**Key facts (VERIFIED)**
- **No special optimisation needed.** "There are no additional requirements to appear in AI Overviews or AI Mode." Normal SEO applies.
- **Eligibility:** a page must be indexed and eligible to show with a snippet. The 2026 AI guide adds that the site must be *included* via the Search Console generative AI control.
- **No special files or markup needed.** Google says this includes llms.txt, "chunking", rewriting for AI and chasing inauthentic mentions. Structured data isn't required for AI features but is still useful for rich results.
- **Content advice:** create non-commodity content (first-hand, unique). Building separate pages for every fan-out or query variant to manipulate rankings or AI answers **violates the scaled-content-abuse policy**.
- **Other levers Google names:** keep Merchant Center and Business Profile data current. It also mentions Business Agent and the Universal Commerce Protocol (UCP) for agentic commerce.
- **Controls:**
  - Googlebot robots.txt rules govern crawling for AI features.
  - `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex` limit what's shown.
  - The **Search generative AI control** (Settings → Search generative AI) covers AI Overviews, AI Mode and Discover gen-AI features. It defaults to *Include*. Excluding takes effect in about 1–2+ days and doesn't affect other ranking. It doesn't cover training; Google points to Google-Extended for that.
- **Measurement:**
  - AI Overview and AI Mode traffic is counted in the standard **Performance report, "Web" search type**.
  - A click on an external link in an AI Overview or AI Mode counts as a click, and standard impression rules apply.
  - An AI Overview occupies **one position**, and all its links share that position. An AI Mode follow-up question counts as a new query.
  - The new **Generative AI performance report** shows **impressions** by page, country, device and date. No click metric is documented.
  - A **multimodal** search-type filter (Lens, Circle to Search, image uploads) launched 2026-09-24.
- **Spam:** since 2026-05-15 the spam policies explicitly cover attempts to manipulate generative AI responses.

**Implication**
- No AI-specific files or markup are needed for Google.
- Make sure the Search Console property is on **Include** for generative AI.
- Make sure the CDN/WAF (e.g., Vercel firewall) doesn't block Googlebot.
- Keep key facts (materials, sizes, lead times, the quote process, shipping regions) in visible HTML text.
- Measure AI visibility with the Gen AI performance report (impressions), and clicks with the regular Performance report plus analytics.
- Track multimodal (Lens) impressions for product photos.
- `NOT VERIFIED`: whether The Glownique can have a Google Business Profile (online-only businesses are typically ineligible under GBP policy, not checked today).

---

## DOC-06 — llms.txt and Google-Extended

| Source | URL | Page last updated |
|---|---|---|
| AI optimization guide ("Mythbusting") | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#mythbusting | 2026-07-10 UTC |
| Changelog: "Clarifying guidance on llms.txt files" (2026-06-15) | https://developers.google.com/search/updates#clarifying-guidance-on-llms.txt-files | 2026-09-24 UTC |
| Google common crawlers (Google-Extended section) — new crawling-docs home | https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers | 2026-07-14 UTC |

**Key facts (VERIFIED)**
- **Official Google statement (2026-06-15):** llms.txt files aren't needed for Google Search, and Google Search itself doesn't use them. Maintaining them for other services is fine: "Doing so will neither harm nor help your site's visibility or rankings". Google may still crawl such files like any other file, with no special treatment.
- **Google-Extended** is a robots.txt **product token**, not a separate crawler user agent (crawling uses existing Google UAs).
  - It controls whether crawled content can be used to train future Gemini models (Gemini Apps, Vertex AI) and for **grounding** in Gemini Apps and Grounding with Google Search on Vertex AI.
  - It "does not impact a site's inclusion in Google Search" and isn't a ranking signal. The description was updated 2025-04-25.
  - The Search generative AI control help says to use Google-Extended to limit *training* of the models used in Search gen-AI features. This is a nuance beyond the crawler doc.
- **Doc location changed:** Google's crawler docs moved to `developers.google.com/crawling/...` (2025-11-20). The IP-range files also moved (blog, 2026-03).
- The OpenAI, Anthropic, Perplexity and Apple crawler docs don't say their bots read llms.txt. OpenAI's and Perplexity's doc sites publish their own llms.txt indexes, but that says nothing about crawler behaviour.

**Implication**
- llms.txt is optional and low priority. Build it only if it's cheap and useful for non-Google agents, and keep it accurate. Expect no Google effect.
- Decide on Google-Extended purely as a policy question about AI training. Blocking it doesn't reduce Google Search or AI Overview visibility.

---

## DOC-07 — Canonicalization, host consolidation (www vs non-www), redirects, trailing slashes

| Source | URL | Page last updated |
|---|---|---|
| How to specify a canonical URL (consolidate duplicate URLs) | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | 2026-07-10 UTC |
| What is canonicalization | https://developers.google.com/search/docs/crawling-indexing/canonicalization | 2026-08-20 UTC |
| Fix canonicalization issues (troubleshooting) | https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting | 2026-08-21 UTC |
| Redirects and Google Search | https://developers.google.com/search/docs/crawling-indexing/301-redirects | 2026-04-14 UTC |
| Site moves with URL changes | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | 2026-08-20 UTC |
| Blog: To slash or not to slash | https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash | 2010-04-21 |
| Robots meta tag spec (placement note) | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | 2026-03-24 UTC |
| Bing Webmaster Guidelines (sections 6, 7, 20) | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | no date shown (rewrite reported 2026-02-26 — SECONDARY) |
| Next.js `redirects` / `trailingSlash` | https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects , …/trailingSlash | 2026-06-30 / 2025-06-16 |

**Key facts (VERIFIED)**
- **Signal strength:** redirects (strong) > `rel=canonical` (strong) > sitemap inclusion (weak). The signals stack.
  - Canonical is a **hint, not a rule**.
  - Use a self-referential canonical and **absolute URLs**.
  - Don't use robots.txt, `noindex` or the removal tool for canonicalization. Don't send conflicting signals (e.g., one URL in the sitemap, another in rel=canonical).
  - Link internally to the canonical URL.
  - Canonical link elements are only accepted in `<head>`.
  - Robots meta tags, by contrast, *are* honoured in `<body>` (note added 2026-03-24).
- **JavaScript (2025-12-17):** set the canonical in the HTML source and don't let JS change it. If you can't, leave it out of the HTML and set it only with JS.
- **Host variants:** pick one URL and **redirect** the others to it (Google's example includes `example.com` vs `www.example.com`).
  - Google prefers HTTPS unless there are conflicting signals.
  - Change of Address isn't needed for www↔non-www on the same domain.
  - For a *domain* migration, submit Change of Address for **all** verified variants, including www and non-www (added 2026-06-17).
- **Redirect codes:** 301 and 308 = permanent (the target should become canonical). 302, 303 and 307 = temporary (not a canonical signal). Server-side is best; meta refresh 0 s is permanent; JS redirects only as a last resort.
- **Trailing slashes:**
  - Google treats `/foo` and `/foo/` as separate URLs.
  - Pick one, use it consistently in links and sitemaps, and 301 the duplicate (or use rel=canonical).
  - The root URL `https://example.com` is equivalent to `https://example.com/`.
- **Re-evaluation:** Google may keep pages in a duplicate cluster for **up to two weeks** after fixes (troubleshooting update, 2026-07-10).
- **Bing:**
  - Use 301 for permanent moves and 302 only for very short-term changes (under 2 days).
  - "Use redirects instead of canonical tags" when content moves.
  - Canonical tags don't replace fixing duplication at the source.
  - Sitemaps should list only canonical URLs.

**Implication**
- Choose one host (apex or www) and enforce it with a **single-hop permanent redirect** at the edge (Vercel domain redirect or a Next.js `redirects` rule with `has: [{ type: 'host', ... }]`).
- Next.js `permanent: true` sends **308**, which Google accepts. If you want to match Bing's wording literally, use `statusCode: 301` (Next.js allows `statusCode` instead of `permanent`). `NOT VERIFIED`: whether Bing treats 308 differently from 301.
- Keep the Next.js default (`trailingSlash: false`, which redirects `/about/` → `/about`) and use that form everywhere: canonicals, sitemap, internal links, JSON-LD `url`.
- Every indexable page needs an **absolute self-referential canonical in the server HTML `<head>`** (see DOC-12 for the Next.js pitfalls).

---

## DOC-08 — Image SEO (alt text, filenames, responsive images, image sitemaps, image metadata)

| Source | URL | Page last updated |
|---|---|---|
| Google image SEO best practices | https://developers.google.com/search/docs/appearance/google-images | 2026-03-02 UTC |
| Image sitemaps | https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps | 2025-12-10 UTC |
| Image metadata (licensable images) | https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata | 2025-12-10 UTC |
| Bing Webmaster Guidelines §12 (images/video) | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | no date shown |

**Key facts (VERIFIED)**
- **Embedding:**
  - Use HTML `<img src>`; images inside `<picture>` are found too.
  - **Google doesn't index CSS background images.**
  - With `srcset`/`<picture>`, always give a fallback `src`.
- **Formats:** BMP, GIF, JPEG, PNG, WebP, SVG and AVIF are supported. The file extension should match the file type.
- **Filenames and alt text:**
  - Filenames give "very light clues". Use short, descriptive names and avoid names like `IMG0023.jpg`.
  - **Alt text is the most important image attribute.** Write descriptive, in-context alt text and don't stuff keywords.
  - Place images near relevant text.
- **Consistent URLs (2025-05-12):** reference an image with **the same URL** everywhere it's used, to save crawl budget.
- **Preferred image (2026-03-02):** you can influence the thumbnail with schema.org `primaryImageOfPage`, or `image` on the main entity, or with `og:image`. Avoid logos, text-heavy images and extreme aspect ratios. Use high resolution.
- **Image sitemaps:**
  - Use the `image:` namespace, with up to 1,000 `<image:image>` per `<url>`.
  - `image:loc` may be on another domain (CDN) if that domain is verified.
  - `caption`, `title`, `geo_location` and `license` were deprecated (May 2022 blog).
  - Either a separate image sitemap or tags inside the main sitemap works.
- **Image metadata (licensable badge):**
  - `ImageObject` needs `contentUrl` plus one of `creator`, `creditText`, `copyrightNotice` or `license`.
  - `license` is required for the Licensable badge; `acquireLicensePage` is recommended. IPTC embedded metadata is an alternative.
  - Structured data must be added for **every instance** of the image on every page.
- **Bing:** use descriptive filenames, alt text and captions. Images should reinforce the text, not replace it.

**Implication**
- Portfolio and product photos should render as `<img>` via `next/image`, which emits `srcset` plus `src`. Don't use CSS backgrounds for meaningful sign photos.
- Give files descriptive names at upload (e.g., in Sanity) and write specific alt text (sign text, colour, material, setting).
- Set a per-page `og:image` that shows the sign, not the logo.
- Add an image sitemap (Next's `sitemap.ts` supports an `images` field per the Next.js docs, last updated 2026-08-25).
- Reuse one canonical image URL per asset.
- `creator`/`creditText`/`copyrightNotice` markup is optional. Add `license` only if you want the Licensable badge (probably not needed).
- `INFERENCE`: next/image serves optimized variants at `/_next/image?url=…&w=…` URLs. Keep the source asset URL stable, and make sure the CDN domain in image sitemaps is verified if it differs from the site.

---

## DOC-09 — Sitemaps (lastmod, changefreq/priority, image extension)

| Source | URL | Page last updated |
|---|---|---|
| Build and submit a sitemap | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | 2026-07-08 UTC |
| Blog: Sitemaps ping endpoint is going away | https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping | 2023-06-26 (deprecation complete) |
| Image sitemaps | (see DOC-08) | 2025-12-10 UTC |
| Next.js sitemap file convention | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap | 2026-08-25 |
| Bing Webmaster Guidelines §3 | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | no date shown |

**Key facts (VERIFIED)**
- **"Google ignores `<priority>` and `<changefreq>` values."**
- **`lastmod`:**
  - Used only if it's consistently and verifiably accurate.
  - It should reflect the last *significant* change: main content, structured data or links count; a copyright-date change doesn't.
  - If you can't tell the real date for a page, leave `lastmod` out for that page (2023 blog).
- **Limits and format:**
  - 50 MB (uncompressed) or 50,000 URLs per sitemap; use a sitemap index beyond that.
  - UTF-8, **absolute URLs**, and only the URLs you want shown (canonicals).
  - A root location is recommended.
- **Submission:** via Search Console or a `Sitemap:` line in robots.txt (as many as needed). The **ping endpoint is dead** (deprecated 2023-06-26, returns 404).
- **Bing:**
  - List only canonical URLs and reflect the current structure.
  - Remove deleted or redirected URLs promptly.
  - Accurate `lastmod` and **ETag** headers help Bing detect changes.
- **Next.js docs example:** uses `lastModified: new Date()` and sets `changeFrequency`/`priority`.

**Implication**
- In `app/sitemap.ts`, set `lastModified` from real content timestamps (e.g., the CMS document's updated time, and only for meaningful edits). Don't use `new Date()` at build or request time.
- `changeFrequency`/`priority` can be dropped; Google ignores them.
- List only canonical, indexable, 200-status URLs with no redirects, and include image entries.
- Reference the sitemap in `robots.ts` and submit it in Search Console and Bing Webmaster Tools. Don't build sitemap "pings".

---

## DOC-10 — Bing Webmaster Guidelines, IndexNow, Bing AI/Copilot citations and AI Performance reporting

| Source | URL | Page last updated |
|---|---|---|
| Bing Webmaster Guidelines (rendered in browser) | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | **no date on page**; rewrite reported 2026-02-26/27 by SERoundtable & SEJ (`SECONDARY`) |
| IndexNow documentation | https://www.indexnow.org/documentation | no date shown |
| IndexNow FAQ | https://www.indexnow.org/faq | no date shown |
| IndexNow search engines (protocol participants) | https://www.indexnow.org/searchengines | no date shown |
| Bing: How to add IndexNow | https://www.bing.com/indexnow/getstarted | no date shown |
| Bing blog: Introducing AI Performance in Bing Webmaster Tools (Public Preview) | https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview | 2026-02-10 |
| Bing blog: New AI Visibility Insights (Intents, Topics, Citation Share, Compare) | https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare | 2026-06-16 |

**Key facts (VERIFIED)**
- **Bing guidelines scope:** they now cover Bing search, **Copilot and grounding API results**. Following them supports eligibility for "grounding results and citations".
- **Bing guideline content:**
  - SEO fundamentals apply to AI experiences.
  - Discovery comes via IndexNow, XML sitemaps, crawlable `<a href>` links and external links.
  - Consolidate duplicates. Use 301 for moves, 302 only for under 2 days, and redirects rather than canonicals for moves.
  - Don't hide critical content behind client-side rendering, and don't block Bingbot.
  - Return 404 for removed content and notify IndexNow.
  - Keep each URL on one topic, put key information early, state facts explicitly, and name entities consistently.
  - Structured data "may support clearer grounding" but guarantees nothing, and it must match visible content.
- **Bing meta directives for AI:**
  - `NOINDEX` removes a URL from Bing, Copilot and grounding.
  - `NOSNIPPET`/`DATA-NOSNIPPET` may limit Copilot citation quality.
  - **`NOARCHIVE` prevents use in Copilot responses and grounding.**
  - **`NOCACHE` limits Copilot to URL, title and snippet.**
  - The page also mentions a `data-snippet` attribute for controlling cited text (`NOT VERIFIED` how it works; the name is as printed on the page).
- **Abuse list (new):**
  - Defines "GEO" and says it doesn't guarantee citations.
  - "Keyword Stuffing and Artificially Engineered Language" includes content meant to trigger citations.
  - Automatically generated content at scale without oversight.
  - Misleading structured data.
  - **"Prompt Injection and AI Manipulation"**.
- **IndexNow protocol:**
  - Key: 8–128 characters from `a-z A-Z 0-9 -`.
  - Host a UTF-8 file `/{key}.txt` containing the key at the **root** (recommended). The alternative is a `keyLocation` file, which only covers URLs under its path.
  - Submit one URL via `GET https://<engine>/indexnow?url=…&key=…`, or up to **10,000 URLs** per `POST` JSON (`host`, `key`, `keyLocation`?, `urlList`) to e.g. `https://api.indexnow.org/indexnow`.
  - Submitting to one participant shares the URLs with all of them: global, Amazon, Bing, Naver, Seznam, Yandex, Yep. **Google isn't listed.**
  - Responses: 200 OK; 202 accepted with key validation pending; 400; 403 invalid key; 422 URL not on host or key mismatch; 429 too many requests.
  - **What to submit:** only added, updated or deleted URLs (redirects and 404/410s included).
  - **Don't over-submit:** don't resend the same URL many times a day (wait at least 5 minutes, and only for meaningful changes). Submissions count against crawl quota. Don't use it for the whole site except after a migration or redesign; use sitemaps for the full inventory.
  - Bing's guidelines add: "Avoid batch submissions when possible"; streaming submissions are preferred.
- **Bing AI Performance (public preview 2026-02-10):**
  - Shows **Total Citations**, **Average Cited Pages**, **Grounding queries** (a sample), page-level citation activity and trends.
  - Covers Microsoft Copilot, AI summaries in Bing and select partner integrations.
  - Citation counts don't indicate ranking or placement. No click metric.
  - Bing says it respects robots.txt and other controls.
  - **2026-06-16** added *Intents*, *Topics*, *Citation Share* (your share of all citations for a grounding query) and *Compare* (period overlay).

**Implication**
- Verify the site in Bing Webmaster Tools and watch the AI Performance report.
- Add IndexNow: put the key file in `/public/{key}.txt`, and have a CMS publish/unpublish webhook call a Next.js route handler that POSTs only the changed canonical URLs (including deletions and redirects). Don't loop over the whole sitemap.
- Never ship `noarchive`/`nocache` on pages meant to earn Copilot citations. Avoid blanket `nosnippet`.
- Keep answers in text, not only in images (for example, lead times, sizes, materials).

---

## DOC-11 — AI crawler user-agents and robots.txt controls

| Source | URL | Page last updated |
|---|---|---|
| OpenAI: Overview of OpenAI Crawlers (platform.openai.com/docs/bots now redirects here) | https://developers.openai.com/api/docs/bots | no date shown (page offers an RSS feed) |
| Anthropic: Does Anthropic crawl data from the web… | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler | 2026-04-07 (page date & `dateModified`) |
| Perplexity Crawlers (docs.perplexity.ai/guides/bots redirects here) | https://docs.perplexity.ai/docs/resources/perplexity-crawlers | `dateModified` 2026-01-29 |
| Apple: About Applebot | https://support.apple.com/en-us/119829 | Published Date: 2026-09-04 |
| Google common crawlers (Google-Extended) | https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers | 2026-07-14 UTC |

**Key facts (VERIFIED)**

| Token | Purpose | Respects robots.txt? | Notes |
|---|---|---|---|
| **OAI-SearchBot** | Surfaces sites in ChatGPT search | Yes | Opted-out sites don't appear in ChatGPT search answers (they may still show as navigational links). About 24 h to apply robots.txt changes. OpenAI recommends allowing it plus its published IPs. |
| **GPTBot** | Crawls content that may be used to train OpenAI foundation models | Yes | Independent of OAI-SearchBot. One crawl may serve both if both are allowed. |
| **ChatGPT-User** | User-initiated visits from ChatGPT or Custom GPTs | **"robots.txt rules may not apply"** | Not used for automatic crawling or search inclusion. |
| OAI-AdsBot (new) | Validates landing pages of ads submitted to ChatGPT | n/a | Only visits submitted ad pages. Not used for training. |
| **ClaudeBot** | Collects content that may help train Anthropic models | Yes | Supports `Crawl-delay`. Blocking signals exclusion of *future* content from training. |
| **Claude-SearchBot** | Indexes content to improve Claude's search results | Yes | Blocking may reduce visibility in Claude search answers. |
| **Claude-User** | User-initiated fetches from Claude | Yes (Anthropic says all its bots honour robots.txt) | Blocking may reduce visibility for user-directed search. Anthropic warns that IP blocking may not give a reliable opt-out. |
| **PerplexityBot** | Surfaces and links sites in Perplexity search; not used for foundation-model training | Yes | Up to 24 h to apply. Perplexity recommends allowing it plus its published IP ranges (and gives WAF allow-rule examples). |
| **Perplexity-User** | User-initiated fetches | **"generally ignores robots.txt"** | Not used for training. |
| **Applebot** | Search in Spotlight, Siri and Safari; data may also train Apple models and ground answers | Yes | If there's no Applebot group, it follows the **Googlebot** rules. Ignores `crawl-delay`. `nosnippet` excludes content from AI-generated answers. |
| **Applebot-Extended** | Control token: opts out of *training* Apple foundation models | Token only — **doesn't crawl** | Doesn't affect Apple search inclusion or ranking. |
| **Google-Extended** | Control token for Gemini/Vertex training and grounding | Token only | No effect on Google Search (DOC-06). |

**Implication**
- **Allow** the search and retrieval bots: Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot and Applebot.
- **Decide separately** on the training tokens: GPTBot, ClaudeBot, Google-Extended and Applebot-Extended. Blocking them doesn't remove search visibility, according to each vendor.
- Make sure Vercel or WAF bot protection doesn't challenge these UAs. Google also asks that CDNs and hosting not block crawling.
- Don't count on robots.txt to stop ChatGPT-User or Perplexity-User.
- See DOC-12 for how Next.js streaming metadata treats these UAs.

---

## DOC-12 — Next.js 16 metadata: canonical inheritance, `metadataBase`, streaming metadata, JSON-LD

| Source | URL | Page last updated |
|---|---|---|
| Next.js `generateMetadata` / Metadata object | https://nextjs.org/docs/app/api-reference/functions/generate-metadata | 2026-08-25 (docs version switcher: Latest v16.3.6) |
| Next.js guide: How to implement JSON-LD | https://nextjs.org/docs/app/guides/json-ld | 2026-03-02 |
| Next.js `redirects` / `trailingSlash` / `sitemap` | see DOC-07 / DOC-09 | 2026-06-30 / 2025-06-16 / 2026-08-25 |
| Installed source (project) | `next-js-frontend/node_modules/next/dist/lib/metadata/resolve-metadata.js` (`mergeMetadata`, ~L166-171); `…/resolvers/resolve-url.js` (`resolveRelativeUrl`, ~L87); `…/shared/lib/router/utils/html-bots.js` (L15); `…/is-bot.js` (L36) | next@16.2.12 |

**Key facts (VERIFIED)**
- **Merging:** metadata is evaluated from the root layout down to the page and **shallowly merged**. A key defined in a later segment replaces the earlier one; keys a segment doesn't set are **inherited**.
  - The docs' "Inheriting fields" example shows `openGraph` inherited from `app/layout.js`.
  - The installed source confirms this: `mergeMetadata` `structuredClone`s the parent result and only overwrites keys present in the child.
  - Result: **a root-layout `alternates` (including `canonical`) is inherited by every page that doesn't return its own `alternates`.**
  - Inheritance is per top-level key. A page that sets `alternates.languages` but not `canonical` loses the parent canonical (`INFERENCE` from shallow merge).
- **Relative URLs:**
  - Relative metadata URLs need `metadataBase`; without it the build fails. `metadataBase` is usually set in the root layout. Absolute URLs ignore it, and duplicate or trailing slashes are normalised.
  - The docs table (for the root path) resolves `/`, `./`, `payments`, `/payments` and `../payments` against `metadataBase`.
  - In the installed source, a value starting with `./` is resolved **against the current request pathname**. `./` in a root layout would therefore produce a per-page self-canonical (without query string).
  - With `trailingSlash: true`, a slash is appended to same-origin URLs.
  - This `./` behaviour isn't spelled out for canonicals in the docs (`VERIFIED in source only`).
- **Streaming metadata (v15.2+):**
  - When `generateMetadata` resolves during streaming, metadata tags are **appended to `<body>`**. Next.js says JS-executing bots (Googlebot) read them correctly.
  - "HTML-limited" bots get blocking metadata in `<head>`. The default regex includes `Bingbot`, `BingPreview`, `applebot`, social scrapers and `*-Google`/`Google-*`. It does **not** include GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User or PerplexityBot.
  - `htmlLimitedBots: /.*/` in `next.config` turns streaming off.
  - Google accepts rel=canonical only in `<head>` (DOC-07).
- **JSON-LD:**
  - Render a native `<script type="application/ld+json">` in `layout.js`/`page.js`; `next/script` is the wrong tool.
  - `JSON.stringify` doesn't sanitise, so replace `<` with `<` (`.replace(/</g, '\\u003c')`) or use `serialize-javascript`.
  - `schema-dts` can add typing.
- **Redirects:** `permanent: true` sends **308** and `false` sends **307**. `statusCode` can replace `permanent`, and host matching is done with `has: [{ type: 'host' }]`. By default, `trailingSlash` redirects `/about/` → `/about` (the doc doesn't state the status code).

**Implication**
- Keep `metadataBase` in the root layout.
- **Don't set `alternates.canonical` to a fixed path in the root layout.** Either have every indexable page/`generateMetadata` return an explicit absolute or path canonical, or (source-verified but undocumented) use `canonical: './'` in the root layout and override it where needed. Test with `curl` either way.
- Non-canonical routes (filtered, paginated, preview URLs) need explicit handling.
- Prefer statically generated or cached metadata so the canonical ships in the server HTML `<head>`.
- If any route resolves `generateMetadata` at request time, consider adding the AI bots to `htmlLimitedBots` (or `/.*/`) so non-JS crawlers get the canonical in `<head>`. Verify with `curl -A "GPTBot"` / `-A "Googlebot"` and view-source.
- Escape `<` in all JSON-LD.
- `NOT VERIFIED`: whether fully prerendered pages ever put metadata in `<body>`. Check the build output.

---

## DOC-13 — Google spam policies: doorway abuse, scaled content abuse, site reputation

| Source | URL | Page last updated |
|---|---|---|
| Spam policies for Google web search | https://developers.google.com/search/docs/essentials/spam-policies (anchors `#doorways`, `#scaled-content`, `#site-reputation` verified in the HTML) | 2026-08-28 UTC |
| Blog: Update to the Site Reputation Policy | https://developers.google.com/search/blog/2026/08/update-site-reputation-policy | 2026-08 (listed in blog index) |
| AI optimization guide (fan-out pages) | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | 2026-07-10 UTC |

**Key facts (VERIFIED, one-line summaries)**
- **Doorway abuse:** sites or pages built to rank for specific similar queries that funnel users to less useful intermediate pages. Examples include multiple region or city pages that all funnel to one page, and near-duplicate pages that are closer to search results than to a browsable hierarchy.
- **Scaled content abuse:** many pages generated mainly to manipulate rankings with little value, *no matter how they're made*. This covers AI, scraping, stitching, synonymising or translating content, and keyword pages that make little sense. The AI guide adds that creating a page for each fan-out or query variation to manipulate AI answers also violates this policy.
- **Site reputation policy:** third-party content published on a host mainly to benefit from the host's ranking signals.
  - As of **2026-08-28**, enforcement differs by user location. Outside the EEA it's a possible manual action. Inside the EEA, the pages are categorised separately from the main domain instead.
  - Freelancer and white-label content counts as third-party.
- **Scope:** spam policies explicitly cover attempts to manipulate generative AI responses (2026-05-15). A new "back button hijacking" policy was added under malicious practices (2026-04-13).

**Implication**
- No "custom neon signs in [city]" page network, since there's no local presence; that's the textbook doorway pattern.
- Programmatic pages by occasion or style must each carry unique substance (real project photos, specs, process, pricing logic explained without fixed prices). Otherwise consolidate them.
- Don't host sponsored or third-party articles for ranking.
- Don't mass-generate AI blog content.

---

## Items I could not verify (flagged)
1. The exact Search Console/Rich Results Test error text for a Product with no offers, review or aggregateRating. It appears only in Google community threads (`SECONDARY`). The docs only say such items aren't eligible.
2. How the Rich Results Test treats `availability: MadeToOrder` (error vs warning). I didn't run the RRT (it requires a browser session). The docs simply leave the value out.
3. Whether Search Console and the Rich Results Test still parse or report FAQPage after the docs were removed on 2026-06-15.
4. Whether Bing treats 308 exactly like 301. Its guidelines only mention 301 and 302.
5. The official date of the Bing Webmaster Guidelines rewrite. The page shows no date; 2026-02-26/27 comes from SERoundtable and Search Engine Journal.
6. Last-updated dates for pages that don't show one: OpenAI crawler doc, IndexNow docs, Bing help pages, and Search Console Help articles (except their "rolled out 2026-08-31" notes).
7. Bing's `data-snippet` attribute (named in its guidelines). Semantics not verified.
8. Whether an online-only business with no storefront can have a Google Business Profile (not researched; outside the listed docs).
9. Whether the canonical-specific consequence of Next.js metadata inheritance holds in v16.3.6. The general shallow-merge rule is documented, and the canonical case was verified in the installed next@16.2.12 source.
