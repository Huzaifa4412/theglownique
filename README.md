# The Glownique

Next.js storefront for The Glownique custom neon-sign brand.

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quote checkout

Customers configure signs, save designs in the cart, and submit a quote request
before continuing to Etsy. Resend sends a customer summary and owner notification.
Set the required server variables in `.env.example` before enabling checkout.
See [checkout setup and tracking](docs/checkout-and-tracking.md) for configuration,
retry handling, Meta events, and verification steps.

## Commands

```bash
bun dev
bun run lint
bun run build
bun start
```

## Structure

- `app/` — App Router pages, global styles, metadata, and local image assets
- `components/` — reusable and interactive UI components
- `lib/` — storefront data and shared types
