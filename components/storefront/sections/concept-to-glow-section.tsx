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
          <p className="eyebrow">See it before it shines</p>
          <h2 id="concept-to-glow-heading">
            From concept <span>to glow.</span>
          </h2>
          <p className="concept-to-glow__intro">
            Drag across the preview to see how your idea becomes a finished
            custom neon sign — colour-matched and ready to hang.
          </p>
          <div className="concept-to-glow__proof" aria-label="Design guarantees">
            <span>Free preview</span>
            <span>Colour matched</span>
            <span>Ready to hang</span>
          </div>
          <CustomQuoteButton
            className="button button--primary concept-to-glow__cta"
            label="Start your design"
          />
        </div>

        <div className="concept-to-glow__stage">
          <div className="concept-to-glow__labels" aria-hidden="true">
            <span>Design preview</span>
            <span>Finished glow</span>
          </div>
          <div className="concept-to-glow__compare">
            <Compare
              className="concept-to-glow__compare-surface"
                firstImage="/before-after/before.png"
                secondImage="/before-after/after.png"
              firstImageClassName="concept-to-glow__before"
              secondImageClassname="concept-to-glow__after"
              initialSliderPercentage={38}
              slideMode="drag"
              showHandlebar
              autoplay={false}
              ariaLabel="Compare the design preview with the finished neon sign"
            />
            <div className="concept-to-glow__grid" aria-hidden="true" />
            <span className="concept-to-glow__note concept-to-glow__note--top">
              Your words, mapped to light
            </span>
            <span className="concept-to-glow__note concept-to-glow__note--bottom">
              Handcrafted in your colour
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
