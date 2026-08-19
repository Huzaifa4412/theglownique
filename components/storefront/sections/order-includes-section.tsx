import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StoreIcon, type StoreIconName } from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { DELIVERY } from "@/lib/claims";

/**
 * "What every order includes" — the homepage reassurance band.
 *
 * Replaces the free-delivery countdown section, which was removed when that
 * promotion ended on 2026-08-11. The countdown could not simply be re-pointed:
 * its entire subject was a discount that no longer exists, and a timer counting
 * down to nothing is worse than no section at all.
 *
 * Everything below is a standing commitment rather than a limited offer, so
 * there is no expiry to police and nothing here goes stale on a date. The
 * delivery line reads from lib/claims.ts so it can never drift back into
 * promising free shipping.
 */

const inclusions: ReadonlyArray<{
  icon: StoreIconName;
  title: string;
  body: string;
}> = [
  {
    icon: "ImageSquare",
    title: "A free design mockup",
    body: "Send your words, logo or a rough sketch and we return a colour-matched digital preview. You see the sign before you spend anything, and there is no obligation to go ahead.",
  },
  {
    icon: "Cube",
    title: "Made to order, not off a shelf",
    body: "Every sign is built to your text, size and colour, then handcrafted and light-tested before it is packed. Most orders take around 10–15 days to make.",
  },
  {
    icon: "Truck",
    title: DELIVERY.short,
    body: "We ship to almost every country, fully tracked to your door. Your shipping cost is confirmed with your quote and shown again at checkout, so the number you agree to is the number you pay.",
  },
  {
    icon: "ShieldCheck",
    title: "5-year warranty",
    body: "Backed by our 100% glow guarantee. If a sign arrives faulty or fails within the warranty, send a photo and we put it right.",
  },
  {
    icon: "SealCheck",
    title: "Payment through Etsy",
    body: "Checkout runs on our verified Etsy shop, so your payment is handled by Etsy's encrypted checkout and your order and tracking live in your Etsy account.",
  },
  {
    icon: "Sparkle",
    title: "Design help included",
    body: "Colour, sizing, mounting and whether a wall can take it — ask before you order. We would rather talk you into the right sign than sell you the wrong one.",
  },
];

export function OrderIncludesSection() {
  return (
    <section
      className="border-t border-[#eadfe4] bg-gradient-to-b from-white via-[#fdf7f9] to-white px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="order-includes-heading"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
            No surprises
          </p>
          <h2
            id="order-includes-heading"
            className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl"
          >
            What every order <PremiumAccentText>includes.</PremiumAccentText>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5e5862] sm:text-base">
            Not a limited-time offer — this is simply how ordering works here,
            on every sign, for everyone.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inclusions.map((item) => (
            <li
              key={item.title}
              className="h-full rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex text-[#ce0754]">
                <StoreIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-[#1e1a22]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-3">
          <CustomQuoteButton
            className="button button--whatsapp px-7 py-3.5 text-base font-bold"
            label="Get your free mockup"
          />
          <p className="text-xs text-[#6b6570]">
            Takes a minute. No payment details, no commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
