# Quote checkout and Etsy handoff

The catalogue contains individually quoted signs. Customers configure designs, add them to a persistent cart, edit quantities, and submit contact/delivery details at `/checkout`. On success, the website confirms the request, sends the customer to the Etsy shop after eight seconds (with a visible cancel option), and includes the same Etsy link in the email. This does not create an Etsy cart or paid Etsy order. Customers should include the request reference when messaging the shop.

## Configuration

Set these server-side variables locally and in the hosting environment:

- `RESEND_API_KEY`: sending key from the brand's Resend account.
- `RESEND_FROM_EMAIL`: sender on a domain verified in that account, for example `The Glownique <quotes@your-verified-domain>`.
- `CHECKOUT_OWNER_EMAIL`: mailbox receiving the complete request.
- `CHECKOUT_REPLY_TO_EMAIL`: optional customer reply mailbox; defaults to the owner mailbox.
- `SANITY_API_WRITE_TOKEN`: existing Editor token, required for durable request storage.

Checkout is visibly unavailable until the required variables exist. Never put these secrets in `NEXT_PUBLIC_` variables. Deploy the code/Studio schema after configuration. Presence of settings is not proof that the sender domain is verified or messages are delivered; perform a labelled end-to-end test with a mailbox you control before launch.

## Request handling

`POST /api/checkout` validates item IDs/options, quantities, consent, email and field lengths. Product names resolve from the server catalogue. The JSON stream is limited to 96 KiB. Requests are same-origin and limited to eight attempts per ten minutes per server instance/IP; this is a basic limiter, not a distributed abuse control.

Requests are stored as `checkoutRequest` documents with dotted `checkout.<UUID>` IDs, outside the public dataset's default root-document read grant. They appear in Studio under Checkout requests; `pending_email` records need attention. Customer contact details and notes remain out of analytics events. The server uses the private write client. Verify custom Sanity ACLs still protect dotted IDs if dataset permissions change.

One submission UUID and payload hash identify the request. Repeated identical submissions reuse the private record. Changed payloads cannot reuse an accepted reference. Owner and customer email IDs are persisted separately. Resend idempotency keys also protect retries after ambiguous provider responses (provider retention is 24 hours). Success requires storage plus provider acceptance of both messages. Inbox delivery/bounces still need checking in Resend. Failures keep the cart available for retry.

Only sign designs are saved to localStorage (`glownique-cart-v1`); contact details are held in the checkout form. Artwork can be shared by replying to the email. No file is silently represented as uploaded.

Cart, checkout and the configurator are excluded from PostHog autocapture/session replay with `ph-no-capture`. Checkout network payloads are excluded from replay network capture too. Explicit Meta funnel events continue to carry only catalogue IDs, quantities and channel labels.

## Meta events

The existing pixel ID remains configurable through `NEXT_PUBLIC_META_PIXEL_ID`; explicitly set it blank locally/staging to disable reporting. These are Pixel events, rather than HTML meta tags:

| Event | Trigger | Parameters |
| --- | --- | --- |
| `ViewContent` | Existing sign-type product view | Existing stable sign-type IDs |
| `ConfiguratorOpen` (custom) | Homepage configurator opens | Design name/category; no conversion |
| `AddToCart` | New design saved, or quantity increased | `content_ids`, aggregated `contents`, `content_type`, `num_items`, `checkout_channel=website_quote` |
| `InitiateCheckout` | Nonempty website checkout opens | Same cart parameters |
| `Lead` | Server accepts quote and both Resend emails | Same cart parameters; stable event ID derived from submission UUID |
| `CheckoutSubmitted` (custom) | Same successful response | Same cart parameters; useful for separating checkout leads |
| `InitiateCheckout` | Customer continues to Etsy | `checkout_channel=etsy`, source, page path |

Do not sum Etsy and website `InitiateCheckout` events as distinct customer conversions; split by `checkout_channel`. No `Purchase` or `AddPaymentInfo` event fires: the website cannot observe Etsy payment. No fabricated price/value/currency is reported for unpriced signs. No names, emails, sign text, notes, or phone numbers enter cart event payloads. CAPI and Etsy order ingestion are not configured.

In Meta Events Manager → Test Events, verify one AddToCart per actual addition, InitiateCheckout on checkout entry, and Lead/CheckoutSubmitted only after a successful submission. Use `Lead` as the quote conversion or define a custom conversion for `CheckoutSubmitted`. Provider ingestion has to be verified in the connected Meta account; a local function test proves only the payload/trigger.

Cart and checkout have dedicated titles, descriptions, canonical URLs, and explicit `noindex` for robots and Googlebot. They are excluded from the content sitemap.

## Checks

Run `bun test tests/checkout.test.mjs`, `npx tsc --noEmit`, `bun run lint`, and `bun run build`. Service tests use fake persistence and email dependencies, never customer mailboxes. Before launch, test the configured Resend sender, both inboxes, private Sanity record, Meta Test Events, and the Etsy destination together.

For local browser checks on Windows, run a production build and start it with `bun run start --port 3011` and run `node scripts/checkout-browser-smoke.mjs`. The script uses installed Edge in an isolated headless profile, blocks external hosts, serves a temporary test page through an isolated local proxy, and saves screenshots in `tmp/checkout-browser/`. It checks persisted cart contents, new additions, edits, responsive layout, disabled checkout with missing settings, and a mocked failure/retry/success flow with Meta event assertions. It does not send emails or prove delivery to Meta.
