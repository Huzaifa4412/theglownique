# Measurement Framework

## North-star outcome

Qualified organic demand that progresses to an Etsy sale—not rankings or traffic alone.

### Qualified conversion definition

A conversion is qualified when the request concerns a real sign project and contains at least a product/use case plus a meaningful project detail such as logo/artwork, size, intended location, timeline or budget context.

Primary conversion events:

- `quote_start_whatsapp`
- `quote_form_complete_to_whatsapp`
- `etsy_handoff`
- `qualified_inquiry` (CRM/manual qualification)
- `attributable_sale` (when Etsy/order reconciliation permits)

Secondary events:

- product/industry/guide-to-case click;
- viewing-distance/calculator completion;
- email/phone contact where configured;
- media engagement only when it aids a decision.

## Event contract

| Event | Trigger | Required parameters | Deduplication/privacy rule |
|---|---|---|---|
| `quote_start_whatsapp` | User activates a WhatsApp quote CTA | `page_path`, `page_type`, `cluster`, `product`, `cta_location` | One per click; do not send message text, name, phone, email or artwork. |
| `quote_form_complete_to_whatsapp` | Form validation succeeds and WhatsApp handoff opens | Above plus `size_band`, `indoor_outdoor`, `file_attached_boolean` | No raw personal fields/file names/content. |
| `etsy_handoff` | User activates Etsy destination | `page_path`, `product`, `destination_type`, `listing_or_shop` | Strip Etsy tracking/personal parameters from analytics payload. |
| `qualified_inquiry` | Human/CRM qualifies lead | `first_landing_group`, `cluster`, `product`, `qualification_date`, `lead_id_pseudonymous` | Server/CRM controlled; retention and policy approved. |
| `attributable_sale` | Order matched under approved method | `lead_id_pseudonymous`, `order_date`, `product`, `revenue_bucket_or_value` | No personal/order details in web analytics; document attribution method. |

Instrumentation may not ship until the privacy/tooling decision in `TECH-03` is approved.

## Baseline imports

### Google Search Console

- Page Indexing status and reasons;
- submitted/discovered sitemap URLs;
- clicks, impressions, CTR and average position by query/page/country/device/search appearance;
- brand versus non-brand query segments;
- Core Web Vitals;
- Generative AI performance report, including eligible inclusion settings and available dimensions.

### Bing Webmaster Tools

- index/crawl/sitemap status;
- search performance;
- AI Performance total citations, average cited pages, sampled grounding queries, page-level citation activity and trends.

### Analytics/CRM/Etsy

- landing pages and channel grouping;
- conversion events above;
- qualification outcome and product type;
- Etsy handoff and the documented sale-matching method;
- no claim of attribution where matching is unavailable.

## KPI definitions

| KPI | Formula/definition | Frequency | Decision use |
|---|---|---|---|
| Intended index coverage | valid/indexed intended URLs ÷ submitted intended URLs | Weekly | Detect release/index problems. |
| 14-day index SLA attainment | new URLs valid/indexed within 14 days ÷ new URLs published | Weekly cohort | Investigate discovery, quality, canonical or crawl issues. |
| Non-brand commercial clicks | GSC clicks from approved commercial query segment | Monthly | Demand growth. |
| Qualified inquiry rate | qualified inquiries ÷ organic sessions | Monthly | Traffic quality and conversion effectiveness. |
| Quote-start rate | unique quote starts ÷ organic landing sessions | Weekly/monthly | Page/CTA effectiveness. |
| Etsy handoff rate | unique Etsy handoffs ÷ qualified quote starts | Monthly | Funnel progression; interpret with sales process context. |
| Attributable sale rate | matched sales ÷ qualified inquiries | Monthly/quarterly | Business outcome where data permits. |
| Content assisted conversions | conversions with page in approved journey window | Monthly | Value of guides/case studies beyond last click. |
| Relevant referring domains | new domains passing relevance/editorial review | Monthly | Authority quality, not volume. |
| AI citation rate | tracked prompts with a Glownique URL cited ÷ prompts sampled | Monthly | Source visibility. |
| AI mention rate | prompts naming Glownique ÷ prompts sampled | Monthly | Entity visibility. |
| AI recommendation rate | prompts placing Glownique on buyer shortlist ÷ prompts sampled | Monthly | Consensus/decision visibility. |
| Claim freshness | current approved volatile claims ÷ volatile claims published | Monthly | Trust/control quality. |

Average position is diagnostic, not a north star. Report query distributions and page-one/top-ten counts only with the same query set, location/device and date window.

## Segmentation

Every search and conversion report should separate:

- brand vs non-brand;
- commercial vs informational vs comparison;
- product vs industry vs guide vs case study;
- new vs existing page cohorts;
- US vs other countries;
- mobile vs desktop;
- Google classic/available generative reporting vs Bing AI vs third-party prompt sample;
- citation vs mention vs recommendation.

## AI visibility sampling

Maintain a fixed core prompt set plus a smaller discovery set. Use [templates/ai-visibility-tracker.csv](templates/ai-visibility-tracker.csv).

For each sample record:

- exact prompt and intent;
- platform/product/model if visible;
- logged-in state, location and date/time;
- whether an AI answer appeared;
- citations and cited URLs;
- brand mention and sentiment/context;
- shortlist/recommendation outcome and competitors;
- screenshot/archive reference where permitted;
- notes on personalization/variability.

Manual results are directional. Do not compare monthly rates if prompts/platform settings changed without labeling the break.

## Dashboard structure

1. **Executive:** qualified inquiries, attributable sales, non-brand clicks, index coverage, relevant referring domains, AI recommendation rate.
2. **Eligibility:** sitemap, page indexing reasons, 14-day cohorts, HTTP/canonical/robots/schema defects, Core Web Vitals.
3. **Content:** page/cluster impressions, clicks, CTR, conversions, assisted conversions, refresh status.
4. **Authority:** earned domains/mentions, target pages, relevance, referral/assisted outcomes.
5. **AI:** Google generative report, Bing AI Performance, prompt citation/mention/recommendation and AI referrals.
6. **Claims:** evidence expiry, owner, discrepancies and unresolved high-risk items.

## Cadence and decisions

### Weekly for first 90 days

- release/index cohorts and technical defects;
- query and landing-page movement without overreacting to daily rank noise;
- quote/Etsy events and broken tracking;
- claims/promotion expiry;
- outreach pipeline.

### Monthly

- full segmented performance report using [templates/monthly-seo-report.md](templates/monthly-seo-report.md);
- AI prompt sample and Bing/Google generative reports;
- content scale/refresh/consolidate decisions;
- claims validation and competitor/SERP spot check;
- relevant link quality and assisted conversion.

### Quarterly

- attribution method audit;
- content/IA consolidation;
- Core Web Vitals and accessibility template review;
- tool/protocol priorities;
- international/commerce gate review.

## Data-quality rules

- Store report timezone and date range (default business timezone: Asia/Karachi; annotate US market data).
- Preserve raw GSC exports before filtering.
- Version brand/non-brand and intent regexes.
- Annotate deployments, migrations, promotions, tracking changes and algorithm volatility.
- Never backfill unknown values with zero.
- Distinguish “no data,” “zero observed,” “not configured” and “not available.”
- Do not send personal quote content to analytics.
- Document Etsy attribution gaps and report matched sales separately from all sales.

## Source notes

Google's current generative guide states that the Generative AI performance report is available in Search Console (`G-AI-01`). Bing's public-preview dashboard definitions come from `BING-AI-01`. IndexNow acceptance means receipt, not indexing (`INDEXNOW-01`).
