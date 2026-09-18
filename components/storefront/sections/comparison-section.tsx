import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StoreIcon } from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { DELIVERY } from "@/lib/claims";

const comparisonRows = [
  ["1-on-1 Design Mockup", "Human designer proof in 1–2 hrs", "Automated bot or days of waiting"],
  ["Handcrafted Build Time", "10–15 days honest dispatch", "Vague estimates or drop-shipped weeks"],
  ["Direct Artisan Support", "7 days/week via WhatsApp & Etsy", "Slow automated ticket queues"],
] as const;

const includedBenefits = [
  "Commercial-grade silicone (no brittle PVC or glass)",
  "Clean concealed wiring with soldered micro-joints",
  "Free dimmer remote & standoff mounting kit",
  "24-hour burn-in luminance check before dispatch",
  "Shockproof timber-crated packaging",
  "5-year warranty & 100% glow guarantee",
  "Etsy Purchase Protection & milestone pay",
] as const;

export function ComparisonSection() {
  return (
    <section
      className="comparison-section px-4 py-14 md:px-6 md:py-20"
      id="why-us"
      aria-labelledby="comparison-heading"
    >
      <div className="comparison-shell mx-auto grid max-w-[1320px] items-center gap-10 overflow-visible rounded-[28px] px-6 py-10 md:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:px-12 lg:py-12">
        <div className="comparison-copy">
          <p className="mb-3 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#ff7bb1]">
            The Glownique difference
          </p>
          <h2
            id="comparison-heading"
            className="max-w-md text-[clamp(2.2rem,4.1vw,4.3rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.065em] text-white"
          >
            Why choose <PremiumAccentText>The Glownique?</PremiumAccentText>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
            Too many online signs are cheap drop-shipped plastic with noisy power bricks, messy exposed wiring, and zero warranty. We hand-build commercial-grade signage with 12V solid silicone, laser-cut acrylic, 304 stainless steel, and rigorous 24-hour testing.
          </p>
          <CustomQuoteButton
            className="comparison-cta button button--whatsapp mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.13em]"
            label="Get a custom quote"
          />
          <p className="mt-4 flex items-center gap-2 text-xs font-bold text-white/80">
            <StoreIcon name="ShieldCheck" /> 24-hour burn-in tested before dispatch
          </p>
        </div>

        <div className="comparison-table-wrap">
          <div
            className="comparison-table"
            role="table"
            aria-label="The Glownique compared with other neon sign services"
          >
            <div className="comparison-rail" aria-hidden="true" />
            <div
              className="comparison-row comparison-row--head"
              role="row"
            >
              <div role="columnheader">
                <span className="sr-only">Benefit</span>
              </div>
              <div
                className="comparison-cell--brand"
                role="columnheader"
              >
                <span>The Glownique</span>
              </div>
              <div role="columnheader">Others</div>
            </div>
            {comparisonRows.map(([benefit, us, others]) => (
              <div className="comparison-row" role="row" key={benefit}>
                <div role="rowheader">{benefit}</div>
                <div className="comparison-cell--brand" role="cell">
                  {us}
                </div>
                <div role="cell">{others}</div>
              </div>
            ))}
            {includedBenefits.map((benefit) => (
              <div className="comparison-row" role="row" key={benefit}>
                <div role="rowheader">{benefit}</div>
                <div
                  className="comparison-cell--brand comparison-icon comparison-icon--yes"
                  role="cell"
                  aria-label="Included"
                >
                  <StoreIcon name="Check" />
                </div>
                <div
                  className="comparison-icon comparison-icon--no"
                  role="cell"
                  aria-label="Not standard"
                >
                  <StoreIcon name="X" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
