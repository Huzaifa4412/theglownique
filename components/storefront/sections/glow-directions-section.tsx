"use client";

import { useRouter } from "next/navigation";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { FocusCards, type FocusCardItem } from "@/components/ui/focus-cards";

export const CATEGORY_CARDS: FocusCardItem[] = [
  {
    id: "home",
    slug: "custom-neon-signs",
    title: "For Home",
    signTypeTag: "1. LED Neon Sign",
    actionText: "Explore",
    image: "/hero/neon-sign-hero.png",
    alt: "Vivid pink 'Good Vibes' custom LED neon sign on a home wall",
    accent: "#ff2f83",
  },
  {
    id: "business",
    slug: "3d-metal-neon-signs",
    title: "For Business",
    signTypeTag: "2. 3D Metal Neon Sign",
    actionText: "Explore",
    image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
    alt: "Corporate 3D metal channel-letter sign with illuminated lettering",
    accent: "#ffaa33",
  },
  {
    id: "events",
    slug: "uv-print-acrylic-signs",
    title: "Custom Art & Branding",
    signTypeTag: "3. Acrylic UV Print Neon",
    actionText: "Explore",
    description: "Full-colour UV-printed artwork on premium acrylic, traced with glowing LED neon contours.",
    image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
    alt: "Custom 3D acrylic UV-print neon sign with glowing contours",
    accent: "#6d26ff",
  },
  {
    id: "custom",
    slug: "ultra-thin-lightbox",
    title: "Create Your Own",
    signTypeTag: "4. Ultra Thin Slim Lightbox",
    actionText: "Explore",
    description: "Slim anodized-aluminium edge-lit lightboxes with 100% uniform, shadow-free illumination.",
    image: "/ultra-thin-slim-lightbox/main-hero.png",
    alt: "Client concept beside a finished ultra-thin slim LED lightbox",
    accent: "#00dc5a",
  },
];

export function GlowDirectionsSection() {
  const router = useRouter();

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
            Hover to explore signs for the home, business, custom branding and
            your own design — then choose a starting point.
          </p>
        </header>

        <FocusCards
          cards={CATEGORY_CARDS}
          onSelect={(card) => {
            if (card.slug) router.push(`/products/${card.slug}`);
          }}
        />
      </div>
    </section>
  );
}
