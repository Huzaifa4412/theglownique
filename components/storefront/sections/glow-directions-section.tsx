"use client";

import { useMemo } from "react";

import { useStorefront } from "@/components/storefront/storefront-context";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import {
  FocusCards,
  type FocusCardItem,
} from "@/components/ui/focus-cards";
import { heroSlides, type CategoryId } from "@/lib/store-data";

const directionIds: CategoryId[] = [
  "home",
  "weddings",
  "business",
  "gaming",
];

const directionCopy: Record<CategoryId, string> = {
  home: "Soft colour for the room you unwind in.",
  weddings: "Warm light for the day you keep.",
  business: "A brand moment people remember.",
  events: "A bright focal point for the celebration.",
  gaming: "Electric colour that changes the setup.",
  custom: "Your words, colour and scale.",
};

export function GlowDirectionsSection() {
  const { chooseCategory } = useStorefront();
  const cards = useMemo<FocusCardItem[]>(
    () =>
      directionIds.map((id) => {
        const slide = heroSlides.find((item) => item.id === id)!;

        return {
          id,
          title: slide.eyebrow,
          description: directionCopy[id],
          image: slide.image,
          alt: slide.alt,
          accent: slide.accent,
        };
      }),
    [],
  );

  return (
    <section
      className="glow-directions"
      aria-labelledby="glow-directions-heading"
      data-reveal
    >
      <div className="shell">
        <header className="glow-directions__heading">
          <p className="eyebrow">Find your direction</p>
          <h2 id="glow-directions-heading">
            Start with a <PremiumAccentText>mood.</PremiumAccentText> Make it
            yours.
          </h2>
          <p>
            Hover to reveal four directions, then choose one as the starting
            point for your sign.
          </p>
        </header>
        <FocusCards
          cards={cards}
          onSelect={(card) => chooseCategory(card.id as CategoryId, true)}
        />
      </div>
    </section>
  );
}
