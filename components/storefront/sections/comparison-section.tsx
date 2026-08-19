import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StoreIcon } from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { DELIVERY } from "@/lib/claims";

const comparisonRows = [
  ["Free digital mockup", "1–2 hours", "Days"],
  ["Handcrafted delivery", "10–15 days", "Weeks"],
  ["Customer support", "7 days a week", "Limited"],
] as const;

const includedBenefits = [
  "Made to your exact spec",
  "All four sign types",
  "Free design preview",
  DELIVERY.short,
  "5-year warranty",
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
            A free design preview, honest timelines and a sign handcrafted
            around your brand — that&apos;s the difference.
          </p>
          <CustomQuoteButton
            className="comparison-cta button button--whatsapp mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.13em]"
            label="Get a custom quote"
          />
          <p className="mt-4 flex items-center gap-2 text-xs font-bold text-white/80">
            <StoreIcon name="ShieldCheck" /> Quality checked before dispatch
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
