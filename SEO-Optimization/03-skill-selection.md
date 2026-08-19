# Skill Selection and Research Stack

Snapshot date: 2026-08-11. No global skill was installed.

## Installed workflow used

| Skill | Role in this package | Reliability rule |
|---|---|---|
| `seo-audit` | Crawlability, indexation, metadata, on-page, content and authority audit order | Browser/rendered output is required for schema; text fetch alone is insufficient. |
| `ai-seo` | AI visibility, extractability, third-party presence and monitoring | Unsupported percentages and platform generalizations were not treated as facts. Google's current primary guidance overrides outdated skill text. |
| `seo-geo` | Cross-platform GEO checklist | Its `meta keywords`, FAQ visibility and numerical claims are outdated/unsupported; they are excluded unless verified. |
| `seo` | Metadata, internal links, images, schema and QA | Used as a checklist, not as evidence for ranking-factor weights. |
| `use-tinyfish` | Current sources, rendered heads, competitors, SERPs and public pages | Search first, then fetch primary pages; every observation is dated. |

Current Next.js behavior was checked against the installed 16.2.12 docs and Context7's high-reputation `/vercel/next.js` documentation. Local exact-version docs take precedence where they differ from the closest Context7 snapshot (16.2.9).

## External candidate snapshot

The following metrics are public skills.sh observations, not quality guarantees. Counts can move.

| Candidate | Observed signals | Decision | Rationale |
|---|---|---|---|
| [`sanity-io/agent-toolkit@seo-aeo-best-practices`](https://www.skills.sh/sanity-io/agent-toolkit/seo-aeo-best-practices) | 5.1K installs; 173 GitHub stars; Gen Agent Trust Hub, Socket and Snyk displayed Pass | Preferred supplemental skill | Maintained by Sanity, directly relevant to this project's CMS and covers metadata, sitemaps, robots, JSON-LD and E-E-A-T. Review the actual files and pinned commit before any future install. |
| [`kostja94/marketing-skills@generative-engine-optimization`](https://www.skills.sh/kostja94/marketing-skills/generative-engine-optimization) | 977 installs; 879 GitHub stars; three displayed Pass badges | Preferred dedicated GEO reference | Focused scope and stronger repository-authority signal than install count alone. Verify claims against platform primary sources. |
| [`agricidaniel/claude-seo@seo`](https://www.skills.sh/agricidaniel/claude-seo/seo) | 5.4K installs; 13.9K GitHub stars; Trust Hub Pass, Socket Pass, Snyk Warn | Strong universal suite; do not install until warning review | Broad, popular suite with bundled runtime and many sub-skills. The displayed Snyk warning and execution surface require code/dependency review. |
| [`nexscope-ai/ecommerce-skills@product-page-seo`](https://www.skills.sh/nexscope-ai/ecommerce-skills/product-page-seo) | 721 installs; 647 GitHub stars; Trust Hub Pass, Socket Pass, Snyk Warn | Relevant reference; adapt and review before use | Useful for Etsy/ecommerce detail, but the business is quote-led rather than native checkout; the Snyk warning must be resolved. |
| [`calm-north/seojuice-skills@optimize-for-ai`](https://www.skills.sh/calm-north/seojuice-skills/optimize-for-ai) | 6.6K installs; 19 GitHub stars; three displayed Pass badges | Do not select on install count alone | High install count but weak repository-authority signal relative to alternatives; inspect provenance and evidence quality first. |

The earlier planning estimate of roughly 978 installs for the Kostja skill is superseded by the live 977 snapshot above.

## Installation gate for a future phase

Before installing any external skill:

1. pin the repository and commit;
2. inspect `SKILL.md`, scripts, hooks, network calls and dependency manifests;
3. open every displayed warning/audit result rather than relying on the badge summary;
4. confirm license and maintenance activity;
5. run in a project-local test scope first;
6. compare its factual assertions with the primary-source register;
7. record owner, purpose, version and removal procedure.

No candidate is required to execute the current roadmap; the installed workflow plus primary sources is sufficient.
