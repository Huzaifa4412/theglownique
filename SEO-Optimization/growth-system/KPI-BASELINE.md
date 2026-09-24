# KPI Baseline — 2026-09-24

Record before the branch deploys. Re-measure on the same basis; never overwrite this file — add dated columns.

| KPI | Baseline | Source & method | Target direction |
|---|---|---|---|
| Organic search sessions (28 d) | 5 | PostHog, `$channel_type = 'Organic Search'`, production hosts | ↑ |
| Non-branded organic clicks | Unknown | GSC — not connected | ↑ |
| Impressions / clicks / CTR / position | Unknown | GSC — not connected | ↑ |
| Indexed pages vs sitemap URLs | Unknown (49 in sitemap; 1 URL surfaced in public search) | GSC Pages report | 49 / 49 |
| Commercial queries in top 10 (of 21 sampled) | 0 | Manual Google US capture | ↑ |
| Decision queries in top 10 (of 24 sampled) | 0 | Manual Google US capture | ↑ |
| AI-assistant sessions (28 d) | 4 (chatgpt.com) | PostHog `$channel_type = 'AI'` | ↑ |
| AI answers naming The Glownique (15-prompt panel) | Not yet run | Manual monthly panel, see below | ↑ |
| Quote submissions (configurator) | 1 in 29 days (from ChatGPT) | PostHog `configurator_quote_submitted` | ↑ |
| Leads archived | 2 | PostHog `lead_archived` | ↑ |
| Etsy outbound clicks | 2 | PostHog `outbound_click_tracked` (channel etsy) | ↑ |
| Mobile LCP p75 (home) | 3,327 ms (n=12) | PostHog `$web_vitals`, production hosts | ≤ 2,500 ms |
| Mobile INP p75 (home) | 1,084 ms (n=7) | PostHog `$web_vitals` | ≤ 200 ms |
| Mobile CLS p75 (home) | 0.203 (n=8) | PostHog `$web_vitals` | ≤ 0.1 |
| Lighthouse (home, mobile) | SEO 100 · A11y 97 · BP 73 | Chrome DevTools Lighthouse | hold / ↑ |
| `seo:audit` failures | 5 (production build before changes) → 0 (branch) | `node scripts/seo-audit.mjs` | 0 |
| Referring domains | Unknown (no third-party mentions found) | GSC Links / Bing Backlinks | ↑ |
| Etsy shop | 25 sales · 5.0 (8 reviews) · 78 items | etsy.com/shop/TheGlownique | ↑ |
| Instagram / Facebook followers | 3,854 / ~1.8K | Profiles | ↑ |

Notes: PostHog data starts on 2026-08-26. Two-thirds of recorded pageviews were `localhost` development traffic; every figure above filters to production hosts. Field vitals samples are small — treat as directional.

## Monthly AI prompt panel

Run the same prompts in ChatGPT, Perplexity, Gemini, Copilot and Claude on the first working day of each month. Record: mentioned (y/n), linked (y/n), competitors named, facts stated about The Glownique and whether they are right.

1. Where can I order custom channel letter signs online and have them shipped?
2. What's the difference between front-lit, halo-lit and dual-lit channel letters?
3. Best place to order a custom LED neon sign for a business logo?
4. How much does a custom neon sign cost?
5. How much do channel letter signs cost?
6. Are LED neon signs waterproof?
7. Custom neon sign for a wedding — who makes good ones?
8. Ultra-thin LED lightbox signs for a restaurant menu — who makes them?
9. Acrylic logo sign for a reception wall — options and suppliers?
10. Is The Glownique legit?
11. What does The Glownique sell?
12. The Glownique reviews
13. Does The Glownique install signs?
14. Custom halo-lit logo sign for a salon
15. LED neon vs glass neon — which should a bar buy?
