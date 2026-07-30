import Image from "next/image";

import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StoreIcon } from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { heroSlides } from "@/lib/store-data";

export function InspirationSection() {
  return (
    <section className="inspiration" id="inspiration">
      <div className="shell inspiration__grid">
        <div className="inspiration__visual">
          <Image
            src={heroSlides[5].image}
            alt="Creative studio with a Your Idea neon sign"
            sizes="(max-width: 800px) 100vw, 54vw"
            placeholder="blur"
          />
        </div>
        <div className="inspiration__copy">
          <p className="eyebrow">Make it personal</p>
          <h2>
            Your words deserve their <PremiumAccentText>own light.</PremiumAccentText>
          </h2>
          <p>
            Pick a phrase that means something, then choose a colour and size
            that fits your room. We send a mockup before anything is made.
          </p>
          <ul>
            <li>
              <StoreIcon name="CheckCircle" /> Free design preview
            </li>
            <li>
              <StoreIcon name="CheckCircle" /> Dimmable, low-energy LED neon
            </li>
            <li>
              <StoreIcon name="CheckCircle" /> Ready to hang out of the box
            </li>
          </ul>
          <CustomQuoteButton
            className="button button--primary custom-cta"
            label="Start your design"
          />
        </div>
      </div>
    </section>
  );
}
