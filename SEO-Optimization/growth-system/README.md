# Growth System — SEO, AEO & GEO (from 2026-09-24)

The current working set for The Glownique's organic growth. It builds on — and where they conflict, supersedes — the numbered documents in the parent folder, which remain the historical baseline from August 2026. The implementation record lives where it always has: `../resources/implementation-log.md`; claims live in `../resources/claims-and-proof-register.csv`.

`../The Glownique — SEO, AEO & GEO Audit and Improvement Guide.md` (committed from the pre-audit working tree) was written without access to the live site; its checklist items are answered, with evidence, in `SEO-AUDIT.md` and `TECHNICAL-ISSUES.md`.

## Read in this order

1. **[SEO-AUDIT.md](SEO-AUDIT.md)** — executive diagnosis, measured baselines, the P0–P3 queue and what is done.
2. **[OWNER-QUESTIONS.md](OWNER-QUESTIONS.md)** — the answers only the owner can give; several P0/P1 items wait on them.
3. **[90-DAY-ROADMAP.md](90-DAY-ROADMAP.md)** — what happens next, week by week.
4. [TECHNICAL-ISSUES.md](TECHNICAL-ISSUES.md) — stack, crawl, redirects, performance, Lighthouse, process risks, CI recipe.
5. [SCHEMA-MAP.md](SCHEMA-MAP.md) — structured data per template and why.
6. [INTERNAL-LINKING.md](INTERNAL-LINKING.md) — link graph findings, changes, anchor conventions.
7. [COMPETITOR-RESEARCH.md](COMPETITOR-RESEARCH.md) — SERP patterns, winnability, buyer objections.
8. [CONTENT-GAPS.md](CONTENT-GAPS.md) and [CONTENT-PLAN.md](CONTENT-PLAN.md) — what to write, in what order, blocked on what.
9. [PAGE-BRIEFS.md](PAGE-BRIEFS.md) — briefs for the major pages.
10. [KPI-BASELINE.md](KPI-BASELINE.md) and [SEO-EXPERIMENTS.md](SEO-EXPERIMENTS.md) — the numbers to beat, and the log every change is measured against.
11. Data: [URL-INVENTORY.csv](URL-INVENTORY.csv) (49 URLs, live crawl), [KEYWORD-MAP.csv](KEYWORD-MAP.csv) (206 active keywords, remapped to URLs that exist).

## Evidence

`research/` holds the full reports behind the synthesis:

| File | What it is |
|---|---|
| `serp-commercial.md` | 21 commercial Google US SERPs, 25 deep dives |
| `serp-decision.md` | 24 decision/informational SERPs, 20 deep dives, 8 forum threads, question bank |
| `brand-entity-baseline.md` | Brand SERPs, indexation signals, Etsy shop, social profiles, competing "Glownique" entities |
| `search-docs-register.md` | Google, Bing, IndexNow, crawler and Next.js documentation, verified 2026-09-24 |
| `technical-fact-base.md` | 84 cited sources on LED neon, glass neon, LED lifetime ratings, IP codes, channel letters, lightboxes, UV print, materials, NEC/UL, ADA |

Labels throughout: **Measured** (a tool result), **Observed** (seen on a live page or SERP), **Inferred**, **Recommendation**. Unavailable sources are named, never estimated.

## Rules this system runs on

- One intent, one URL. Consolidate before creating.
- No price, lead time, rating, customer count, certification or IP rating without evidence in the claims register first. `scripts/seo-audit.mjs` enforces the patterns that have shipped before.
- Answer first, cite sources, show real photos; label visualisations.
- No city pages without real premises; no query-permutation pages; no bought links.
- Log every material change in `SEO-EXPERIMENTS.md` with its baseline and window.
