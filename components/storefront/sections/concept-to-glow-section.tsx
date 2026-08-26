"use client";

import { Compare } from "@/components/ui/compare";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { useStorefront } from "@/components/storefront/storefront-context";

export function ConceptToGlowSection() {
  const { reducedMotion } = useStorefront();

  return (
    <section
      className="concept-to-glow"
      id="concept-to-glow"
      aria-labelledby="concept-to-glow-heading"
    >
      <div className="shell concept-to-glow__inner">
        <div className="concept-to-glow__copy">
          <p className="eyebrow">See it on the wall first</p>
          <h2 id="concept-to-glow-heading">
            From bare wall <span>to backlit.</span>
          </h2>
          <p className="concept-to-glow__intro">
            Drag across the preview to see the same reception wall before and after a backlit logo
            sign. The letters stay solid — the LEDs face the wall behind them, so what you see is
            the halo, never the light source.
          </p>
          <div className="concept-to-glow__proof" aria-label="Design guarantees">
            <span>Free preview</span>
            <span>Warm white halo</span>
            <span>Standoff mounted</span>
          </div>
          <CustomQuoteButton
            className="button button--whatsapp concept-to-glow__cta"
            label="Design your backlit sign"
          />
        </div>

        <div className="concept-to-glow__stage">
          <div className="concept-to-glow__labels" aria-hidden="true">
            <span>Bare wall</span>
            <span>Backlit</span>
          </div>
          <div className="concept-to-glow__compare">
            <Compare
              className="concept-to-glow__compare-surface"
              firstImage="/before-after/before.webp"
              secondImage="/before-after/after.webp"
              firstImageAlt="A salon reception wall, bare, before a backlit logo sign is fitted"
              secondImageAlt="The same reception wall with a backlit logo sign, warm white light haloing the letters against the wall"
              firstImageClassName="concept-to-glow__before"
              secondImageClassname="concept-to-glow__after"
              initialSliderPercentage={38}
              slideMode="drag"
              showHandlebar
              autoplay={false}
              ariaLabel="Compare the bare wall with the finished backlit sign"
            />
            <div className="concept-to-glow__grid" aria-hidden="true" />
            <span className="concept-to-glow__note concept-to-glow__note--top">
              Lit from behind, not in front
            </span>
            <span className="concept-to-glow__note concept-to-glow__note--bottom">
              Glow, never glare
            </span>
          </div>
          <p className="concept-to-glow__hint">
            {reducedMotion
              ? "A clear preview before anything is made."
              : "Drag the handle or use the arrow keys to explore."}
          </p>
        </div>
      </div>
    </section>
  );
}
