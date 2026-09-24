# SEO Experiment Log

One row per material change to an important page. Measure against the baseline over the stated window before changing the same page again. "Deploy date" is the day the change reaches production — fill it in when the branch ships; the windows start then.

Baselines are thin because the site is seven weeks old: most pages have no measurable search traffic yet. That makes the first GSC export after deploy the real baseline for query-level metrics; record it in the Baseline column when it exists.

| ID | Deploy date | URL | Hypothesis | Change | Target query | Baseline (2026-09-24) | Window | Result | Decision |
|---|---|---|---|---|---|---|---|---|---|
| EXP-01 | TBD | `/business-signs/channel-letter-signs` | One page per intent concentrates signals and will earn impressions the split pair did not | Merged `/products/3d-metal-neon-signs` into it (301), full template, renamed to search language, definition-first intro, install/permit FAQs | channel letter signs | Not in top 10 (manual SERP); GSC unknown | 8 weeks | | |
| EXP-02 | TBD | `/business-signs/lightbox-signs` | As EXP-01 | Merged `/products/ultra-thin-lightbox` (301) | lightbox signs; LED light box sign | Not in top 10; GSC unknown | 8 weeks | | |
| EXP-03 | TBD | `/business-signs/acrylic-logo-signs` | As EXP-01 | Merged `/products/uv-print-acrylic-signs` (301) | acrylic signs; custom acrylic signs | Not in top 10; GSC unknown | 8 weeks | | |
| EXP-04 | TBD | `/guides/front-lit-vs-halo-lit-vs-dual-lit` | A sourced, answer-first comparison with a table will rank and be cited where thin, unsourced pages lead | Rebuilt: 462 → ~1,850 words, table, USSC letter-height data, 11 sources | front lit vs halo lit; halo lit vs backlit; what is a dual lit sign | Not in top 10 on 3 captured SERPs | 8–12 weeks | | |
| EXP-05 | TBD | `/` | A visible, descriptive H1 and faster LCP improve engagement without hurting brand queries | Visible H1; banner via image optimizer with dimensions; title aligned | the glownique; custom LED neon signs | Mobile LCP p75 3,327 ms; INP p75 1,084 ms; CLS p75 0.203 (PostHog) | 4 weeks after 50+ field samples | | |
| EXP-06 | TBD | `/llms.txt` + Organization schema | Consistent, qualified facts and a disambiguation line change what assistants say about the brand | Etsy shop `sameAs`, `disambiguatingDescription`, qualified key facts, industry pages listed | "Is The Glownique legit?", "What does The Glownique sell?" | AI summaries conflated the brand with glownique.com (cosmetics) | Monthly prompt panel ×3 | | |
| EXP-07 | TBD | Sitewide | Removing unverifiable claims does not reduce conversion | Customer count, Star Seller, 5-star shop, insured, prices, 100,000 h, 80 %, IP67 (sign-level), cool to touch, shatterproof removed or qualified | — | Quote submissions: 1 in 29 days; configurator opens: 12 | 8 weeks | | |
| EXP-08 | TBD | Industry pages | Contextual links from product pages raise crawl frequency and impressions for the industry pages | 15 use-case links + footer hubs | office signs; restaurant signs; salon signs; gym neon sign | Industry pages had 1–2 contextual inlinks | 8 weeks | | |

## How to read results

- Use GSC page-level impressions and average position for the target query group, compared over equal windows, excluding brand queries.
- Treat anything under ~100 impressions per window as noise.
- Record the decision (keep / iterate / revert) and the reason, even when the answer is "not enough data yet".
