# Questions Only the Owner Can Answer

Each answer unblocks specific work. Where an answer changes a claim, update `lib/claims.ts` and `resources/claims-and-proof-register.csv` in the same release.

## 1. Conflicts that are live today (answer first)

1. **Warranty term.** The site says a 5-year warranty on every page; the Etsy listing says 3 years. Which is true, for which sign types, covering what (LEDs, power supply, labour, shipping)? *Unblocks: consumer-protection risk, `WARRANTY` in claims.ts, Etsy listings, llms.txt.*
2. **Lead time.** The homepage says "~10–15 business days", other pages "10–15 days", `/shipping` "10–15 days from approval to arrival". Which is it — production or door-to-door — and what is transit to the US? Is there a rush option? *Unblocks: CLM-002, wedding/event buyers, schema shipping details.*
3. **Stainless steel grade.** 304 or 316 (or both, by use)? *Unblocks: channel-letter specs.*
4. **Mockup turnaround.** Is "about 2 hours" true most of the time? In which time zone and hours?
5. **Payment.** Is 50% deposit / 50% before dispatch real on Etsy (the listing showed a deposit listing)? *Unblocks: CLM-014.*
6. **Delivery.** Etsy still shows free delivery on listings; the site says the promotion ended on 2026-08-11. Which is current?
7. **Remote dimmer and revisions.** The homepage says every sign arrives with a wireless remote dimmer; the neon product spec says the remote is optional. Which is it? The homepage also promises "unlimited free revisions" — is that a standing policy?

## Answers received 2026-09-28 (from the owner, in chat)

| Q | Answer | Still open |
|---|---|---|
| 1 Warranty | **5 years.** | What it covers (LEDs, power supply, remote, labour, return shipping) and whether it applies to all four sign types. The Etsy listing still says 3 years and must be changed to match. |
| 2 Lead time | **LED neon: production 3–5 days, shipping 3–8 days. Rush option available**; the customer states the required date. | Business or calendar days. Whether shipping 3–8 days is US only or also Canada, UK and Australia. Lead times for channel letters, lightboxes and acrylic signs. Whether rush costs extra. Whether the clock starts at mockup approval or at payment. |
| 3 Steel grade | Not answered. | 304 or 316. |
| 4 Mockup | **Within 24 hours.** | Business days only, or weekends too? |
| 5 Payment | **50% / 50% is available but optional**; full payment up front is the default. | Is the split offered on the website, Etsy, or both? |
| 6 Delivery | Owner wants the **free delivery promotion extended** further. | A real end date and the regions it covers (US only or worldwide). A promotion must have a real end date and must not be extended again and again, or it becomes a misleading "limited time" offer. |
| 7 Remote | **Every neon sign comes with a remote.** | Is the remote also a dimmer? Is it included with channel letters, lightboxes and acrylic signs? Is "unlimited free revisions" a standing policy? |

### Follow-up answers 2026-09-28 (owner, in chat)

| Topic | Answer | Implication for copy and schema |
|---|---|---|
| Warranty scope | 5 years on **all four sign types**: LED neon, channel letters, lightboxes and acrylic signs (confirmed 2026-09-28). | State "5-year warranty" on every sign-type page and in Product/Offer data. Parts covered (LEDs, power supply, remote) are not itemised; do not list them until the owner does. |
| Days | **Business days**, same for all countries. | LED neon: "made in 3–5 business days, delivered in 3–8 business days". |
| Other sign types | Channel letters, lightboxes and acrylic signs: **production 3–10 business days**. | Use on those pages; transit 3–8 business days. |
| Rush | **No extra charge** for rush orders. | May say "rush orders at no extra cost; tell us your date". Do not promise a specific rush time. |
| Mockup | 24 hours **including weekends**. | "Free mockup within 24 hours." Replaces the retired "about 2 hours". |
| Remote | **Every neon sign comes with a remote.** | Fixes the "included vs optional" conflict: included. Dimmer function still to confirm before saying "dimmer". |
| Revisions | "Unlimited free revisions" **is a standing policy**. | May be stated. |
| Steel | "A quality, best" — **no grade given**. | Say "stainless steel" only. Do not state 304, 316 or "marine grade" without a supplier spec. |
| Free delivery | **Free worldwide delivery is a standing policy with no end date.** A countdown timer is used only to attract buyers. | Free worldwide delivery becomes a standing claim (update CLM-001, `lib/claims.ts`, `/shipping`, Offer `shippingDetails` with rate 0). **Owner agreed on 2026-09-28 to remove the countdown.** A scan of all 66 live pages found no timer on the website (it was removed in August); remaining timers are on Etsy or ads, which the owner removes. Never add one back: a timer on an offer that never ends is fake urgency, which the FTC and the UK CMA treat as deceptive. |

**Confirmed 2026-09-28:** production starts after mockup approval, and the remote dims the sign. Section 1 is fully answered.

Sections 2–6 below are still unanswered. Prices are in progress.

## 2. Who you are (About page, entity, trust)

8. Legal business name and country of registration.
9. Where signs are made (city/country) and where they ship from. Etsy says the United States; the WhatsApp number has a Canadian (Ontario) area code.
10. Who designs and who fabricates — names, roles, years in signage — and may they be named on the site?
11. Since when have you made signs? Is 2025 (Etsy "on Etsy since") the start?
12. A contact email for the site and schema (currently none is published).
13. Workshop or process photos you can publish.

## 3. Prices (the most-asked buyer question)

14. Price bands by sign type and size from real orders — e.g. LED neon at 24", 36", 48", 60"; channel letters per letter height and lighting style — with the month they were valid.
15. What every quote includes (backboard, adapter, dimmer/remote, hardware, outdoor build, shipping) and what it never includes (installation, electrician, permits).
16. May we state a "from" price per sign type? If yes, it can also go into Product structured data.

## 4. Proof

17. Three to five projects we can publish as case studies: client permission, before/after or day/night photos, dimensions, lighting type, lead time, what was hard.
18. Which gallery and banner images are real installations or customer photos, and which are renders or supplier images? (Two channel-letter images are in `generated/` folders and show fictional brands.)
19. Rights to reuse Etsy order photos (they show customer names).
20. Any real testimonials collected outside Etsy, with consent to publish.

## 5. Specifications

21. For each sign type: which parts are rated for outdoor use (LED neon, power supply, dimmer, connectors) and to what IP rating, from the supplier datasheet.
22. The LED datasheet (LM-80 report and TM-21 projection) if you want an hour figure back on the site. "Up to 100,000 hours" was removed on 2026-09-24 as unsupported.
23. Plug-measured watts for a real sign, if you want an energy comparison with glass neon back. "Up to 80% less power" was removed on 2026-09-24: it only holds against old transformer neon.
24. Measured wattage for 3–5 typical signs (enables an honest running-cost answer).
25. Are any signs or power supplies UL/ETL listed? (Only state it with a file number.)
26. For channel letters: what ships with the order — full-size mounting pattern, hardware, wiring diagram, power-supply location?

## 6. Accounts and access

27. Share Google Search Console (Owner or Full user) and GA4 (Viewer).
28. Verify the site in Bing Webmaster Tools (import from GSC) and submit the sitemap.
29. Sanity: an Editor-role API token, so journal fixes (two "insured" claims, one link to a retired URL, long titles) can be made.
30. Should the GitHub repository be public? It ranks for the brand name and exposes the SEO strategy.
31. Instagram and Facebook: may the bios link to theglownique.com?
32. Should a Pinterest business account be created (visual search is strong for neon and wedding decor)?
