import TiltedCard from "@/components/TiltedCard";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StoreIcon } from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { heroSlides } from "@/lib/store-data";

const designSteps = [
  {
    number: "01",
    title: "Say it your way",
    description: "A phrase, name or mark that only belongs to you.",
    icon: "FileText" as const,
  },
  {
    number: "02",
    title: "Set the mood",
    description: "Choose the colour and scale that suit your space.",
    icon: "Sparkle" as const,
  },
  {
    number: "03",
    title: "Approve the glow",
    description: "See a free design preview before production begins.",
    icon: "SealCheck" as const,
  },
];

export function InspirationSection() {
  return (
    <section className="inspiration" id="inspiration">
      <div className="inspiration__wordmark" aria-hidden="true">
        YOUR IDEA
      </div>

      <div className="inspiration__pin" data-inspiration-pin>
        <div className="shell inspiration__grid">
          <div
            className="inspiration__visual inspiration__visual--tilted"
            data-inspiration-visual
          >
            <div className="inspiration__studio-label" aria-hidden="true">
              <span>Custom studio</span>
              <span>Preview 01</span>
            </div>

            <TiltedCard
              imageSrc={heroSlides[5].image}
              altText="Creative studio with a Your Idea neon sign"
              sizes="(max-width: 899px) 100vw, 50vw"
              rotateAmplitude={5}
              scaleOnHover={1.018}
            />

            <div className="inspiration__visual-note">
              <span className="inspiration__live-mark" aria-hidden="true" />
              <span>Made for your wall, room and story</span>
              <strong>LED neon</strong>
            </div>
          </div>

          <div className="inspiration__copy">
            <div className="inspiration__intro" data-inspiration-copy>
              <p className="eyebrow">Make it personal</p>
              <h2>
                Your idea, drawn in <PremiumAccentText>light.</PremiumAccentText>
              </h2>
              <p>
                Send the words, colour and rough size. We turn them into a clear
                preview before your sign is made.
              </p>
            </div>

            <ol className="inspiration__brief" aria-label="Custom design process">
              {designSteps.map((step) => (
                <li key={step.number} data-inspiration-step>
                  <span className="inspiration__step-number">{step.number}</span>
                  <StoreIcon name={step.icon} />
                  <span className="inspiration__step-copy">
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="inspiration__action" data-inspiration-action>
              <CustomQuoteButton
                className="button button--primary custom-cta"
                label="Start your design"
              />
              <p>
                <StoreIcon name="CheckCircle" /> Free preview. No commitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
