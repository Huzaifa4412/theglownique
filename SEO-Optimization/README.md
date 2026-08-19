# The Glownique Organic Growth Program

Status: research and implementation specification  
Market: United States, English  
Audience: national B2B signage buyers  
Prepared: 2026-08-11  
Production-code changes in this phase: none

This folder is the single source of truth for The Glownique's SEO, AEO, GEO and AIO program. It defines what is known, what remains to be verified, what should be built, who owns each decision, and how success will be measured. It does not promise a number-one ranking. The goal is durable page-one visibility and qualified signage inquiries through the free-mockup, WhatsApp and Etsy handoff funnel.

## Evidence convention

Every factual finding uses one of these labels:

- **Confirmed — repository:** directly observed in the current codebase.
- **Confirmed — rendered:** observed on the live site or a rendered output on 2026-08-11.
- **Public observation:** a dated search result or competitor-page observation; it can change.
- **User-provided operating assumption:** accepted for planning but not independently verified.
- **Estimate:** a planning number, never represented as measured performance.
- **Recommendation:** a decision proposed from the evidence.

External evidence is registered in [resources/primary-source-register.md](resources/primary-source-register.md). SERP observations are snapshots, not permanent rankings. Search volume and keyword difficulty are never estimated; unavailable values are marked `VALIDATION_REQUIRED` in [05-keyword-and-intent-map.csv](05-keyword-and-intent-map.csv).

## Reading order

1. [01-executive-strategy.md](01-executive-strategy.md) — decisions, outcomes and guardrails.
2. [02-current-state-audit.md](02-current-state-audit.md) — what exists and what is broken.
3. [03-skill-selection.md](03-skill-selection.md) — research workflow and external-skill due diligence.
4. [04-us-market-and-competitors.md](04-us-market-and-competitors.md) — current US search landscape.
5. [05-keyword-and-intent-map.csv](05-keyword-and-intent-map.csv) — one intent and destination per page.
6. [06-information-architecture.md](06-information-architecture.md) — future route, linking and content contracts.
7. [07-technical-seo-plan.md](07-technical-seo-plan.md) — decision-complete implementation backlog.
8. [08-content-aeo-geo-aio-plan.md](08-content-aeo-geo-aio-plan.md) — publishing and page-quality system.
9. [09-entity-authority-and-digital-pr.md](09-entity-authority-and-digital-pr.md) — brand, proof and earned authority.
10. [10-90-day-roadmap.md](10-90-day-roadmap.md), then [11-six-and-twelve-month-roadmap.md](11-six-and-twelve-month-roadmap.md).
11. [12-measurement-framework.md](12-measurement-framework.md) — events, dashboards and decision rules.

The `resources/` files contain evidence and inventories. The `templates/` files are repeatable operating documents. Documents 06–12 are implementation instructions; they are not evidence that the work has already shipped.

## Owners and review cadence

| Area | Accountable owner | Working owner | Review cadence |
|---|---|---|---|
| Business claims, pricing, warranty, delivery | Founder / operations | SEO lead | Before publish and monthly |
| Technical eligibility and structured data | Engineering lead | Next.js developer | Every release |
| Keyword map and editorial priorities | Growth lead | SEO/content lead | Monthly |
| Expert review and first-party proof | Named sign expert | Editor / producer | Every page |
| GSC, analytics and Bing reporting | Growth lead | Analyst | Weekly for 90 days, then monthly |
| Digital PR and link quality | Growth lead | PR/outreach owner | Biweekly |
| Privacy and legal wording | Business owner | Qualified counsel where needed | Before relevant tooling/policy changes |

## Operating rules

- One primary intent and one canonical destination per page.
- No US city or “near me” pages without a real location or defensible service-area presence.
- No thin query permutations, invented expertise, purchased links, fabricated reviews or undisclosed endorsements.
- Product, `Offer`, rating and merchant-listing markup must match visible, currently purchasable facts.
- Promotional claims must have an owner, evidence, expiry and fallback state.
- `llms.txt`, FAQ markup and AI-specific files are supporting work, never substitutes for indexability, useful content and authority.
- A URL is “launched” only after 200 status, canonical, robots, sitemap, metadata, structured-data, analytics and manual mobile checks pass.

## Baseline and unresolved inputs

The 2026-08-11 baseline is documented in [02-current-state-audit.md](02-current-state-audit.md). The live `site:` snapshot returned four URLs out of twelve sitemap URLs. This is a public observation, not an index-coverage report. Search Console remains the source of truth.

Required owner inputs before implementation can be considered complete:

- GSC exports and Generative AI performance report access.
- Analytics/event access and an approved privacy position.
- The canonical Etsy shop/profile URL and current shop-wide review evidence.
- Legal entity/contact details and governing-law review.
- Approved price ranges, price basis, warranty terms, production versus transit definitions and promotion rules.
- Named expert/founder bio, project permissions, customer-outcome evidence and media rights.

## Change control

Update the source register when a factual source changes. Update the claims register before changing a commercial claim. Update the keyword map before creating a new indexable route. Log completed work in the applicable roadmap and report it through the monthly template; do not rewrite historical baselines.
