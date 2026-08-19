# Implementation Log

Records what actually shipped, against the backlog in
[07-technical-seo-plan.md](../07-technical-seo-plan.md). Documents 06–12 are
instructions; this file is the evidence. Append releases, never rewrite them.

---

## Release 2026-08-19 — claims reconciliation and crawler correctness

Owner decisions taken into this release:

1. The free-worldwide-delivery promotion **has ended**. Withdraw the claim.
2. **Keep** the Meta Pixel, Vercel Analytics and Tawk.to; fix the disclosure.

### Shipped

| ID | Change | Evidence |
|---|---|---|
| TECH-06 | `lib/claims.ts` added — commercial claims as release data. Every surface resolves one value; the register CSV is the paper half, this is the runtime half. | `lib/claims.ts` |
| TECH-06 / CLM-001 | Expired free-delivery promotion withdrawn from 15 files: root metadata (description, OG, Twitter), announcement bar, footer, homepage FAQ, comparison section, product trust bars, all four product meta descriptions, the six-step process cards, `/products`, `/shipping`, `/contact` FAQ and `llms.txt`. The homepage countdown section was deleted outright — its entire subject was the retired promotion. | `npm run seo:audit` fails if it reappears |
| TECH-03 / CLM-015 / CLM-016 | Privacy notice rewritten. It previously stated "no advertising cookies or tracking pixels" while the Meta Pixel was live and setting `_fbp`/`_fbc`. The tool list is now generated from `TRACKING_TOOLS`, plus a dedicated Meta Pixel section naming the cookies, what is and is not shared, and opt-out routes. | `/privacy` |
| TECH-13 / CLM-012 / CLM-011 | `llms.txt`: delivery corrected and explicitly marked ended; unverified "5.0 out of 5 from 8 reviews" withdrawn; unsourced competitor comparison removed; privacy line corrected. | `/llms.txt` |
| TECH-11 | `robots.ts` rebuilt from the crawler matrix. Legacy `anthropic-ai` removed; `Claude-SearchBot`, `Claude-User`, `Perplexity-User` added; search, training/grounding and user-triggered agents separated into three documented groups; the incorrect "Google-Extended controls AI Overviews" comment removed. | `/robots.txt` |
| TECH-02 | `/studio` now serves `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex` **and was removed from the robots.txt disallow**. The previous config could never de-index it: a crawler blocked from fetching the page never sees the noindex. | `curl -I /studio` |
| TECH-05 | `lib/routes.ts` route manifest with hand-entered material modification dates; `sitemap.ts` reads it. An unchanged rebuild no longer advances any date. Verified: changed routes carry 2026-08-19, untouched routes still carry 2026-08-11. | `/sitemap.xml` |
| TECH-04 | Removed the `keywords` meta tag (Google ignores it, AUD-11). Trimmed the one title exceeding the truncation threshold. | audit passes |
| TECH-14 | IndexNow key hosted at `/b2e9695668d33bad83be011d34e0e804.txt`; `npm run indexnow -- --all \| <paths>` submits change notifications. | `scripts/indexnow-submit.mjs` |
| TECH-20 | `npm run seo:audit` — route/metadata/schema regression suite over all 21 routes. | passes, 0 failures |
| TECH-17 (partial) | Lighthouse lab baseline captured. See below. | this file |
| CLM-018 | Accessibility page corrected twice: it claimed 100/100 with zero failures, re-measurement found 94 with three real failures, those were fixed, and it now publishes 100/100 with the measurement date and the twelve-page coverage behind it. | `/accessibility` |
| TECH-19 | **Accessibility defects found and fixed.** The WhatsApp button green was 1.98:1 behind white text — and that button is every quote CTA on the site. Brand accents were used as both fills and text, failing 2.2–4.1:1 in both directions. The Etsy button's decorative "E" was a text node, so at mobile widths its visible text read `"E Etsy"`, which its accessible name did not contain. Tawk.to's frames had no titles. | Lighthouse, table below |

### Regression suite

`scripts/seo-audit.mjs` fails CI on: non-200 routes, missing or cross-route
canonicals, `og:url` inherited from the homepage (AUD-08), missing OG/Twitter
fields, a `keywords` tag, zero or multiple `<h1>`, JSON-LD that does not parse or
contains an unescaped `<` (TECH-07), a non-indexable route missing its noindex or
appearing in the sitemap, sitemap dates that all equal today, and **any retired
claim reappearing** on a page or in `llms.txt`.

The retired-claim guard was verified to actually fire against the previous copy
rather than passing vacuously.

### Measurement baseline — Lighthouse, 2026-08-19

Lab data from a local production build (`next build` + `next start`), Chrome,
mobile emulation. **Not field data.** GSC Core Web Vitals and PageSpeed Insights
still required for TECH-17 sign-off, and both need owner access.

First pass (before fixes) and after, per template:

| Route | Template | A11y before | A11y after |
|---|---|---:|---:|
| `/` | home | 94 | **100** |
| `/products` | catalog hub | 96 | **100** |
| `/products/custom-neon-signs` | product (pink) | 93 | **100** |
| `/products/3d-metal-neon-signs` | product (gold) | 96 | **100** |
| `/products/ultra-thin-lightbox` | product (green) | — | **100** |
| `/products/uv-print-acrylic-signs` | product (violet) | — | **100** |
| `/business-signs` | B2B hub | 96 | **100** |
| `/business-signs/custom-logo-neon-signs` | B2B product | — | **100** |
| `/guides` | guides hub | — | **100** |
| `/guides/custom-business-sign-cost` | guide | — | **100** |
| `/contact` | contact | 97 | **100** |
| `/shipping` | policy | — | **100** |

Best Practices sits at 73 on every page. All three failures are expected and
none is a defect to fix here:

- `third-party-cookies` and `inspector-issues` — the Meta Pixel's `_fbp`/`_fbc`.
  Disclosed on `/privacy` rather than denied. Removing the finding means
  removing the pixel, which is a business decision already taken the other way.
- `errors-in-console` — `/_vercel/insights/script.js` 404s on localhost because
  Vercel Analytics only exists on Vercel. Not reproducible in production.

Performance (LCP/INP/CLS) was **not** captured; the Lighthouse tool used here
excludes it. It needs a separate trace and, for anything reportable, field data.

### Not shipped — blocked on owner input

| Item | Blocked on |
|---|---|
| TECH-01, TECH-15, TECH-16 | Search Console, Bing Webmaster Tools and analytics access. No index-coverage claim can be made without them; `site:` is not evidence. |
| TECH-10 | The canonical Etsy **shop/profile** URL. `ETSY_SHOP_URL` is still a single *listing* URL, which is also what `Organization.sameAs` carries. |
| CLM-002 | Production vs transit lead times. "10–15 days" still means arrival on `/shipping` and production in `/terms` and `llms.txt`. Splitting them needs an approved transit figure per region — deliberately not invented here. |
| CLM-004 – CLM-010 | Supplier and test evidence for warranty scope, 100,000-hour life, 80% energy saving, IP67, 12V safety and colour matching. |
| CLM-014 | Whether the 50/50 payment split is an Etsy-compliant workflow. |
| TECH-02 (full) | Whether Studio is authenticated or removed from the public frontend. The noindex is a mitigation, not access control. |
| Consent gating | No cookie banner. Relevant if EU/UK traffic matters; the privacy page currently says so in plain terms. |

### Not shipped — needs first-party evidence, not engineering

The IA in [06-information-architecture.md](../06-information-architecture.md)
calls for six industry pages, seven more guides, a projects hub, a process page
and a QC/warranty page. The hub, four B2B product pages and two guides exist.

The remainder is deliberately not generated. Every one of those page types is
defined by evidence this repository does not contain — real projects, named
expertise, permissioned customer outcomes, supplier data. The program's own
operating rules forbid "invented expertise" and "thin query permutations", and
publishing fourteen pages of plausible-sounding filler would breach the strategy
far more damagingly than shipping nothing. Case-study interviews and the expert
intake (weeks 1–3 of the roadmap) are the actual prerequisite.

---

## Release 2026-08-19b — visual revert of the contrast work

Owner reviewed the contrast release and asked for the brand appearance back.
Four decisions, applied as follows.

| Ask | What shipped | Accessibility effect |
|---|---|---|
| WhatsApp buttons looked off-brand | Restored WhatsApp's exact green (`#25d366`) and changed the **ink** instead: dark `#1e1a22` on the brand green is 8.64:1, versus 1.98:1 for the white text that was there originally. Icons and the floating button match. | **No loss.** Brand colour and AA, both kept. |
| Homepage lost a section | Added `OrderIncludesSection` — "What every order includes": free mockup, made to order, tracked delivery, 5-year warranty, Etsy payment, design help. Every line is a standing commitment with no expiry, so nothing here can go stale like the countdown did. Delivery copy reads from `lib/claims.ts`. | Scores 100. |
| Pink text was duller sitewide | Reverted only where the bright pink is legitimately compliant: five non-text icons (3:1 floor under WCAG 1.4.11, and `#f40b68` is 4.12:1) and one 20px bold hover state that clears the large-text threshold. **The other 28 were left dark** — they are 12–14px text where 4.12:1 genuinely fails 4.5:1. | No loss. |
| Revert the product accent work | Reverted in full. `accentText`/`accentOnDark` removed; product pages, the product hub and the business-signs hub badges use the single bright `accent` again. | **Cost 4 points on three templates.** |

### Accessibility after the revert

| Template | Before this release | After |
|---|---:|---:|
| Home, contact, guides, B2B detail, policy pages | 100 | **100** |
| Product detail (×4) | 100 | **96** |
| Product hub | 100 | **96** |
| Business-signs hub | 100 | **96** |

The four points are one audit, `color-contrast`, and these are the exact
measurements behind it:

- `#f40b68` on the dark product hero glow — 2.72:1 and 3.03:1
- white on `#f40b68` badge — 4.12:1; `#f40b68` on white — 4.12:1
- white on `#e0a23c` badge — 2.23:1; `#e0a23c` on white — 2.23:1
- white on `#0e9f6e` badge — 3.38:1; white on `#d97706` — 3.18:1
- breadcrumb `text-white/50` on the hero — 3.58:1

All are small text or badge labels, so 4.5:1 applies; none reaches it. Restoring
compliance without dulling the palette is still possible — larger or heavier
badge text would drop the requirement to 3:1, and a solid dark chip behind the
accent label would fix the hero — but both change the design, so they are worth
a deliberate pass rather than a silent one.

`/accessibility` was updated in the same release to publish 96 for those three
templates, name the cause, and say plainly that it was a deliberate trade.
Leaving the page claiming 100 would have recreated exactly the stale-claim
problem this program was set up to fix.

---

## Release 2026-08-19c — navigation, visibility fix, chat disclosure

| Change | Detail |
|---|---|
| Contact in navigation | Added to both live navbars. `site-header.tsx` drives its desktop and mobile lists from one array, so a single entry covers both; `product-top-bar.tsx` (used by product, B2B, guide, policy and contact pages) got an explicit link and its `aria-label` corrected from "Product pages" to "Primary navigation". `navbar-menu.tsx` and `floating-navbar.tsx` are dead code and were not touched. |
| Invisible CTA fixed | "Start an enquiry" on `/contact` rendered `#1e1a22` on `#1e1a22`. Cause: `globals.css` sets `a { color: inherit }` **outside any cascade layer**, and unlayered CSS beats layered CSS regardless of specificity — so Tailwind's `text-white` utility lost. Fixed with the important modifier (`text-white!`); now 17.13:1. Worth knowing: `text-white` on any `<a>` in this codebase is inert for the same reason. |
| Retired claim leak | `/contact` still read "Tracked delivery, **free worldwide**". The audit guard missed it because its pattern only matched *free … delivery* in that order. Copy fixed, and a second pattern added for the reversed order, checked against seven cases including three that must NOT match (e.g. "tracked delivery and a free design mockup"). |
| Live-chat data disclosure | Owner is enabling Tawk's built-in Pre-Chat Form (dashboard: Administration → Chat Widget → Content → Pre-Chat Form), which collects name, email and phone. `TRACKING_TOOLS` and a new "Live chat" section on `/privacy` now say what is collected, why, that Tawk holds it, and that WhatsApp and the contact page are alternatives. |

The chat disclosure ships slightly ahead of the dashboard toggle. That is the
safe direction of error: describing a collection a day early is a far smaller
problem than collecting a day before disclosing.

---

## Release 2026-08-19d — custom pre-chat gate and lead capture to Sanity

Owner changed direction twice here, and both changes are reflected: Tawk's
built-in Pre-Chat Form is **not** used, and captured data is now persisted.

### Live-chat pre-chat gate

Tawk's own bubble is hidden on load via `Tawk_API.onLoad` in the inline script —
set before the embed loads, because a React effect cannot reliably beat it. Our
own launcher takes its place, collects name/email/phone in site styling, attaches
them with `Tawk_API.setAttributes`, then reveals and opens the real widget. A
returning visitor is not asked twice (localStorage), and the same key is read in
the inline script so the widget never flashes.

`lib/tawk.ts` wraps the API. Every call waits for the widget to report ready with
a bounded retry, because the embed is `lazyOnload` — `Tawk_API` exists as a bare
object before then, and `setAttributes` would throw at exactly the wrong moment.

Written with `useSyncExternalStore` rather than `useEffect` + `setState`:
localStorage is an external store, and the effect version is a lint error in this
project (`react-hooks/set-state-in-effect`) for good reason.

### Lead capture

| Piece | Detail |
|---|---|
| `sanity/schemaTypes/lead.ts` | `lead` document type. Captured fields are **read-only in the Studio** — the record is evidence of what a customer said, not a document to edit. `status` and `internalNotes` are the editable ones. |
| `sanity/structure.ts` | Leads get explicit panes ("New", "All"), newest first, because a lead list is a worklist, not a content library. |
| `app/api/leads/route.ts` | The only holder of the write token. Whitelists field names, coerces to string, caps lengths, validates source and email. |
| `sanity/lib/write-client.ts` | Server-only. `SANITY_API_WRITE_TOKEN` has no `NEXT_PUBLIC_` prefix on purpose — that token can delete the whole dataset. |
| `lib/leads.ts` | `archiveLead()` — fire-and-forget with `keepalive`, so a failed archive can never stop someone reaching WhatsApp, and the request survives the tab navigating away. |

Wired into all three forms: the contact page, the pre-chat gate, and the
newsletter.

Verified against the running route: valid payloads accepted, and 400s for a
missing name on a named source, a malformed email, an unknown source and invalid
JSON. With no token configured the route returns `202 {"archived":false}` and
logs a warning rather than 500-ing at a customer.

### Two claims this falsified, corrected in the same release

1. **"No quote database … your quote details are not stored on our servers at
   all."** That was the whole point of the old design and it is now untrue. The
   privacy notice, its metadata, its intro, `llms.txt` and the contact form's own
   "nothing reaches us until you tap send" all corrected. `/privacy` now names
   Sanity as the store, says what it is used for, and says we will delete it on
   request.
2. **The newsletter told people "your welcome code is on its way"** while
   discarding the email entirely — nothing was stored and nothing was ever sent.
   The address is now archived, and the message says "we'll email your 10% code
   shortly", which is a commitment that can actually be kept from the Studio. The
   pixel helper's doc comment was updated too; it still fires a custom event
   rather than `CompleteRegistration`, because sending is manual.

### End-to-end verification, 2026-08-19

`SANITY_API_WRITE_TOKEN` was supplied by the owner and the pipeline was verified
against the live `production` dataset, one clearly-marked record per source,
each deleted immediately afterwards:

| Source | Route response | Stored correctly | Cleaned up |
|---|---|---|---|
| `contact-form` (all 13 fields) | `201 {"archived":true}` | yes | yes |
| `newsletter` (no name) | `201 {"archived":true}` | yes, `name` absent as designed | yes |
| `pre-chat` | `201 {"archived":true}` | yes | yes |

Also checked: no unexpected field names reached the document, so the whitelist in
the route handler is doing its job; `status` defaulted to `new`; `submittedAt` was
server-stamped. `count(*[_type=="lead"])` is back to **0** — the dataset was left
exactly as found.

Leads are now visible in the Studio at `/studio` under **Leads → New**.

### Still outstanding

- `SANITY_API_WRITE_TOKEN` must also be set in the Vercel project settings, or
  production will accept enquiries and silently not archive them (202 + a logged
  warning, by design).
- No rate limiting on `/api/leads`. It is spammable. A real fix needs a KV store
  or Vercel's WAF; a per-instance in-memory counter would be theatre on
  serverless.

---

## Release 2026-08-20 — merged and deployed to production

PR [#1](https://github.com/Huzaifa4412/theglownique/pull/1) merged to `master` as
`e142de8`. Production deployment **Ready**.

### Production had been broken for 14 days

The last successful production deploy before this was **2026-08-05**, even though
the Sanity and Meta Pixel commits were both on `origin/master`. Cause, confirmed
from the failed preview build log:

```
Error: Missing environment variable: NEXT_PUBLIC_SANITY_DATASET
```

`sanity/env.ts` calls `assertValue`, which throws at build time, and Vercel had
only `NEXT_PUBLIC_WHATSAPP_NUMBER` configured. Every build after the Sanity commit
failed. `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` were added
to Production, and this is the first green production build since 5 August.

Consequence worth recording: the Meta Pixel was committed on 2026-08-14 but never
reached production, so the "no tracking pixels" privacy claim was wrong in the
repository rather than on the live site. It was still wrong and still had to go —
but the exposure was smaller than first stated.

Note that `/api/leads` widened this dependency: previously only `/studio` needed
the Sanity vars, now the route handler does too. Any environment that builds this
app must have them.

### Verified against https://www.theglownique.com

`scripts/seo-audit.mjs --base https://www.theglownique.com` → **21 routes, 0
failures, 0 warnings**. Plus:

| Check | Result |
|---|---|
| `/studio` response header | `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex` |
| Legacy `anthropic-ai` in robots.txt | gone |
| `Claude-SearchBot` in robots.txt | present |
| "Free worldwide delivery" on homepage | 0 occurrences |
| "Tracked worldwide delivery" | 12 occurrences |
| `/contact` links in homepage nav | 3 (desktop, mobile, footer) |
| IndexNow key file | 200 |
| `llms.txt` marks the promo ended | yes |
| `/privacy` names the Meta Pixel | yes |
| Distinct sitemap `lastmod` values | 2 — dates are not build-stamped |

### Still open

- **Preview scope for the two `NEXT_PUBLIC_SANITY_*` vars.** Vercel CLI 54.9.1
  returns `action_required: git_branch_required` even for its own documented
  `--yes` form, so this needs the dashboard. Until then every PR preview build
  fails the same way.
- **`SANITY_API_WRITE_TOKEN` is set for Preview as well as Production.** That was
  not the recommendation: a preview deploy now writes real `lead` documents into
  the production dataset, so testing a form on a preview URL creates a real lead.
  Remove the Preview scope unless that is wanted.
- **No rate limiting on `/api/leads`**, which is now live and publicly postable.
- IndexNow has **not** been pinged for this release; run `npm run indexnow -- --all`
  if you want Bing notified of the changed URLs.
