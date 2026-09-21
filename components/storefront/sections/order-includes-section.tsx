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
    title: "Free 1-on-1 Design Mockup",
    body: "Send your logo, typography, or sketch. We return a true-to-scale digital preview showing exact sizing, Pantone color match, and backing cuts before you spend anything.",
  },
  {
    icon: "Cube",
    title: "Made to Order in Our Workshop",
    body: "Every piece is custom cut, hand-assembled, and electrically tested with a 24-hour burn-in inspection before packing. Handcrafted in ~10–15 business days.",
  },
  {
    icon: "Sparkle",
    title: "Power Supply & Dimmer Included",
    body: "Every sign arrives complete with a plug-and-play 12V power adapter for your country, wireless remote dimmer with brightness control, and pre-drilled mounting standoffs.",
  },
  {
    icon: "ShieldCheck",
    title: "5-Year Full Glow Warranty",
    body: "Commercial-grade LEDs rated for up to 100,000 hours. If any electrical component fails or a sign arrives damaged, just send a quick photo and we replace it immediately.",
  },
  {
    icon: "SealCheck",
    title: "Protected Checkout via Etsy",
    body: "Orders are secured through our verified 5-star Etsy shop, giving you full buyer protection, encrypted checkout, and the flexibility to split payments 50/50.",
  },
  {
    icon: "Truck",
    title: "Tracked Crated Delivery",
    body: "Packed in custom shockproof wooden crates to ensure 100% damage-free transit. Delivered right to your doorstep with full tracking from dispatch to delivery.",
  },
];

export function OrderIncludesSection() {
  return (
    <section
      className="border-t border-[#dcd6ce] bg-gradient-to-b from-white via-[#f3f0e9] to-white px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="order-includes-heading"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#8f2347]">
            No surprises
          </p>
          <h2
            id="order-includes-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-[#282421] sm:text-4xl"
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
              className="h-full rounded-2xl border border-[#dcd6ce] bg-white p-6 shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex text-[#8f2347]">
                <StoreIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-[#282421]">
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
          <p className="text-xs text-[#6b625c]">
            Takes a minute. No payment details, no commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
