# Improvement Plan — Closing the Google SEO Starter Guide Gaps

**Created:** 2026-08-05 · **Companion to:** [SEO-PLAN.md](SEO-PLAN.md) (master strategy + original audit)
**Scope:** the 6 gaps found when auditing the live site against Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

---

## 0. Where you stand

The last commit closed the guide's **technical** and **on-page** sections almost completely: crawlable CSS/JS, 2,443 prerendered words on the homepage, descriptive URLs, canonicals, unique titles and descriptions, 0 images missing alt text, no keyword stuffing (2–4% density), and valid structured data.

What remains is the half of the guide that code cannot fix:

| Gap | Type | Who |
|---|---|---|
| 1. Not indexed (`site:` → 0 results) | Manual | **You** |
| 2. Zero backlinks + brand-name collision | Off-site | **You** (I can prep assets) |
| 3. 12 dead `href="#"` links | Code | Me |
| 4. `<meta name="keywords">` still shipping | Code | Me |
| 5. Videos invisible to Search (0 `VideoObject`) | Code | Me + you (dates) |
| 6. "Promote your website" — nothing | Off-site | **You** |

**Honest framing:** gaps 3–5 are hygiene. Gaps 1, 2 and 6 are what actually decide whether you get traffic. Don't let the satisfying code work crowd out the uncomfortable off-site work.

---

## 1. 🚨 The strategic problem: you don't own your own brand name

Searching **"Glownique"** returns [**@glowniquetanning**](https://www.instagram.com/glowniquetanning/) — an unrelated UK tanning salon with an established Instagram presence and a year of posts. Google's entity graph currently associates "Glownique" with tanning, not signage.

This matters more than it sounds:

- **Brand search is normally your easiest win.** It's the one query you should rank #1 for on day one. You're competing for it.
- **The tanning salon uses "glow" language too** ("A premium tan, the Glownique way"), so semantic disambiguation is harder than a random-word collision.
- **AI engines inherit this.** Ask ChatGPT "what is Glownique" today and it will describe tanning, not neon signs.

### Strategy: always pair the brand with the category

Never let "The Glownique" appear alone in a title, heading, or citable sentence. Google needs repeated co-occurrence of `The Glownique` + `custom neon signs` / `LED signage` to split the entity.

**Concrete actions:**

| Where | Do this |
|---|---|
| `<title>` on every page | Already correct — keeps "Custom LED Neon Signs" alongside the brand. Don't "clean this up." |
| Organization schema | Add `alternateName: "Glownique Signs"` and `description` leading with the category (partly present). |
| `sameAs` in Organization schema | **Currently missing.** Add every profile you own (Instagram, TikTok, Pinterest, Etsy). This is the single strongest entity-disambiguation signal available to you. |
| Google Business Profile | Category "Sign shop" / "Custom sign manufacturer". Highest-leverage single action for entity clarity. |
| Social handles | If any are still unclaimed, prefer `theglownique` + a signage word over bare `glownique`. |
| Anchor text you influence | "The Glownique custom neon signs", not "Glownique". |

**Success criterion:** searching `The Glownique` returns your site in the top 3 within 8 weeks of indexing.

---

## 2. Sprint 1 — Code fixes, no input needed (~½ day)

### 2.1 Delete the `keywords` metadata (2 minutes)

[app/layout.tsx:44](app/layout.tsx:44) ships 16 keywords. Google has ignored this tag [since 2009](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag) and the guide lists it under things not to focus on.

Remove the whole `keywords: [...]` array. No replacement. It's dead weight in every page's `<head>`, and it signals "SEO by checklist" to anyone reading your source.

### 2.2 Fix the header logo link (2 minutes)

[site-header.tsx:35](components/storefront/sections/site-header.tsx:35) — `<a className="brand" href="#">`. A site logo must link to `/`. This is the most-clicked navigation element on any site and yours goes nowhere. The footer version already does this correctly ([site-footer.tsx:56](components/storefront/sections/site-footer.tsx:56)).

### 2.3 Route video posters through the image optimizer (~1 hour, big win)

The `poster` attribute takes a plain URL — it **bypasses `next/image` entirely**. Your hero currently ships:

| Poster | Size |
|---|---|
| `3d-metallic-neon-sign/corporte/056b3189….png` | **2.36 MB** |
| `3d-arcylic/3235dc09….png` | **2.11 MB** |

That's **4.47 MB of raw PNG** on the homepage, invisible to the optimization work already done — it never showed up in the image audit because it isn't an `<img>`.

**Fix:** pre-generate compressed poster derivatives at build time (`sharp` is already installed and working) into e.g. `public/posters/*.webp`, and point `poster=` at those. Expect ~4.47 MB → ~150 KB. Same pattern for [sign-types-video-section.tsx](components/storefront/sections/sign-types-video-section.tsx) and [product-detail.tsx](components/product/product-detail.tsx).

### 2.4 Add `VideoObject` schema (~2 hours)

Google's guideline: *"VideoObject structured data must be added to a page where users can watch the video."* Your 4 product pages each already have a `heroVideo` in [lib/product-catalog.ts](lib/product-catalog.ts) — so those are the correct hosts. Add a `VideoObject` node to each product page's existing `@graph`.

**Required properties** (omit any and Google extracts nothing):

| Property | Source |
|---|---|
| `name` | e.g. "How we handcraft custom LED neon signs" — must be **unique per video** |
| `thumbnailUrl` | the new compressed poster from §2.3 (absolute URL) |
| `uploadDate` | ISO 8601 — **needs a real date from you** (see §3.4) |

**Recommended** (add all four — they control what the video result displays): `description` (unique per video), `contentUrl` (the `.mp4` itself, not the page), `embedUrl`, `duration` (ISO 8601, e.g. `PT18S` — requires `ffprobe`, see §3.4).

Skip `BroadcastEvent` (not livestreams) and `Clip`/`SeekToAction` (those need ≥30s videos with deep-linkable timestamps; yours are short loops).

**Validate** with the [Rich Results Test](https://search.google.com/test/rich-results) before shipping.

### 2.5 Resolve the 12 dead links (~2 hours + content)

From [site-footer.tsx](components/storefront/sections/site-footer.tsx):

| Dead link | Line |
|---|---|
| Contact | 28 |
| Help centre / Shipping info / Returns / Track your order | 34–37 |
| Instagram / TikTok / Pinterest | 62 / 65 / 68 |
| Privacy / Terms / Accessibility | 107–109 |

**Recommendation: build the pages, don't just hide the links.** Privacy and Terms are a legal requirement for selling to the UK/EU/US regardless of SEO, and shipping/returns information is what a buyer checks before committing to a £300 made-to-order item. Hiding the links removes the symptom and keeps the disease.

I can draft all six from facts already established in the codebase — 5-year warranty, free worldwide delivery (promotional), ~10–15 day production, Etsy Purchase Protection checkout, 50/50 payment option, free design mockup — with only the genuinely unknown fields flagged for you to fill (see §3.2).

**Also fix while in here:** "About us" and "Our process" both point to `/#about`, and "Create your own" and "How it works" both point to `/#custom`. Two different labels resolving to one destination is a poor user signal; either differentiate the targets or merge the labels.

### 2.6 Add `sameAs` to Organization schema (15 minutes, after §3.1)

Blocked on your social URLs, but this is the entity-disambiguation fix from §1 and the highest-value schema addition available.

---

## 3. Sprint 2 — What I need from you

Nothing in Sprint 1 §2.5/§2.6 or Sprint 3 can complete without these. This is the critical path.

### 3.1 Social + Etsy URLs 🔴

Your Etsy shop is your **only** source of real reviews and third-party authority, every payment runs through it, and **it is not linked anywhere on the site.** That's the single biggest missed asset in this audit.

Send me: Etsy shop URL, Instagram, TikTok, Pinterest (and YouTube if it exists). If a profile doesn't exist yet, say so and I'll remove that icon rather than ship a dead link.

### 3.2 Business details for the trust pages 🔴

- Registered business name and country (for Terms + Privacy data controller)
- Contact email + whether you'll publish a phone number
- **Physical address, or confirmation there isn't a public one** — this gates `LocalBusiness` schema, Google Business Profile, and city pages, collectively the highest-leverage local SEO you have
- Returns window (e.g. 14/30 days) and the policy on custom/made-to-order items, which are normally exempt from distance-selling cancellation rights
- Support hours (the homepage claims "7 days a week")

### 3.3 `NEXT_PUBLIC_WHATSAPP_NUMBER` 🔴

Still unset. Every quote CTA is disabled. This is a 100% conversion leak — worth more than everything else in this document combined, because traffic that can't convert is worthless.

### 3.4 Video dates + durations 🟠

`uploadDate` is **required** for `VideoObject`; `duration` is recommended. Either send me the dates the videos were produced, or approve using the product-page publish date. For durations I'll need `ffmpeg`/`ffprobe` installed (neither is on this machine) — or you can read them off any video player.

---

## 4. Sprint 3 — The real gap: discovery and promotion

The guide is blunt: *"Google primarily finds pages through links from other pages it already crawled."* You have zero. No amount of on-page work substitutes.

### 4.1 Get indexed — do this first, today (30 minutes, yours)

1. **Search Console** → verify (the tag is live) → **Sitemaps** → submit `https://www.theglownique.com/sitemap.xml`
2. **URL Inspection** → paste each of the 6 URLs → **Request Indexing**. Individually. Don't wait for organic discovery on a zero-authority domain.
3. **Bing Webmaster Tools** → same. This also feeds **Copilot** and **ChatGPT search** (Bing-backed), so it's disproportionately valuable for the AEO work.
4. **Google Business Profile** — if §3.2 yields a real address.

**Success criterion:** `site:theglownique.com` returns 6 results within 7 days.

### 4.2 Link acquisition — modelled on what actually worked for the leader

`customneon.com` didn't rank on code quality. Their authority came from a stack you can replicate at a smaller scale:

| Their signal | Your equivalent | Effort |
|---|---|---|
| International Sign Association member | Join a national sign-trade or craft association | Low, costs money |
| Forbes / Business Insider / Yahoo Finance features | Respond to journalist requests (Featured, Qwoted, SourceBottle) — small-business and "made to order" angles get picked up | Medium, ongoing |
| 670+ Google reviews | Google Business Profile + ask every Etsy buyer | Low, high value |
| `/showcase/` customer gallery | You already have the photography — publish it as case studies with client names (with permission) | Low |
| 366K Instagram | Pinterest is the better bet for neon/decor intent and you have strong imagery | Medium |

**Realistic first 10 links for a new signage brand**, roughly in order of ease: your own Etsy shop and social profiles · local business directories · the wedding-supplier directories that dominate "wedding neon sign" searches · interior-design and event blogs offered a free sign in exchange for an honest review + link · Reddit `r/NeonSigns` and `r/weddingplanning` (**participate genuinely — astroturfing is exactly the inauthentic-mention pattern that gets penalised, and the guide warns about over-promotion**) · supplier/partner pages · local press on the "handmade in ___" angle.

**Anti-pattern:** do not buy links, do not mass-submit to directories, do not post promotional Reddit comments. All three are faster routes to a penalty than to page one.

### 4.3 Where promotion and content meet

Every buying guide from [SEO-PLAN.md §5.2](SEO-PLAN.md) is also a link asset — that's why it's sequenced after indexing. The two uncontested topics (**"frontlit vs backlit vs halo-lit channel letters"** and **"what is an ultra-thin lightbox"**) are the ones worth pitching to trade publications, because nobody has written them well and you manufacture both.

---

## 5. Sequencing

| # | Work | Depends on | Effort | Owner |
|---|---|---|---|---|
| 1 | **GSC + Bing verify, submit sitemap, request indexing** | nothing — do today | 30 min | You |
| 2 | Set `NEXT_PUBLIC_WHATSAPP_NUMBER` | — | 5 min | You |
| 3 | Remove `keywords`; fix header logo | — | 5 min | Me |
| 4 | Compress video posters (4.47 MB → ~150 KB) | — | 1 hr | Me |
| 5 | Send social + Etsy URLs, business details | — | 20 min | You |
| 6 | `sameAs` schema + wire real social/Etsy links | 5 | 30 min | Me |
| 7 | Build 6 trust pages, kill all dead links | 5 | 3 hrs | Me |
| 8 | `VideoObject` schema on 4 product pages | 4, 3.4 | 2 hrs | Me |
| 9 | Google Business Profile | 5 (address) | 1 hr | You |
| 10 | Ask Etsy buyers for reviews; claim/link profiles | 5 | ongoing | You |
| 11 | Content Phase 3 ([SEO-PLAN.md §5](SEO-PLAN.md)) | 1 | weeks | Me |
| 12 | INP / hydration work (602 ms) | — | 1 day | Me |

**Items 1 and 2 are worth more than 3 through 8 combined.** Please do them first.

---

## 6. Measuring this

| Metric | Now | 7 days | 30 days | 90 days |
|---|---|---|---|---|
| Pages indexed (`site:`) | **0** | 6 | 6–20 | 40–70 |
| Referring domains | **0** | 1–3 | 5–10 | 15–30 |
| Brand search "The Glownique" | not ranked | not ranked | top 10 | **top 3** |
| Non-brand impressions (GSC) | 0 | 0 | first signs | growing |
| Non-brand clicks | 0 | 0 | 0–handful | meaningful |
| Dead links on site | **12** | 0 | 0 | 0 |
| `VideoObject` valid items (GSC) | 0 | — | 4 | 4 |

Expect nothing in week one but indexation. Impressions before clicks, clicks before revenue — the stages unlock in order and skipping ahead in the reporting only creates false disappointment.

---

## 7. What this plan deliberately does not do

- **No city/location pages yet.** 25 near-identical pages on a 6-page domain with no authority is a scaled-content-abuse risk, not a strategy. Revisit at month 3+ ([SEO-PLAN.md §5.5](SEO-PLAN.md)).
- **No `AggregateRating` schema** until real reviews exist. See the fabricated-data section in [SEO-PLAN.md §2.1](SEO-PLAN.md).
- **No keyword-volume commitments.** Targeting is grounded in live SERP inspection, not Ahrefs/Semrush data. Validate before committing to the full 8-guide build.
- **No promises about timing.** Google's guide: *"Some changes might take effect in a few hours, others could take several months."* Anyone quoting you a date for "first place on Google" is selling something.
