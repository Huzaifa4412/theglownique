"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { FocusCards, type FocusCardItem } from "@/components/ui/focus-cards";

export const CATEGORY_CARDS: FocusCardItem[] = [
  {
    id: "offices",
    slug: "business-signs/office-signs",
    title: "Offices & Reception",
    signTypeTag: "Backlit Lobby Signs",
    actionText: "Explore Office Signs",
    description: "Halo-lit 3D metal letters & corporate lobby signage built for boardrooms and reception walls.",
    image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp",
    alt: "Corporate 3D metal backlit sign on dark office reception wall",
    accent: "#ff7bb1",
  },
  {
    id: "restaurants",
    slug: "business-signs/restaurant-signs",
    title: "Restaurants & Dining",
    signTypeTag: "Storefront & Dining",
    actionText: "Explore Restaurant Signs",
    description: "Warm architectural glow and weatherproof channel letters that brand dining rooms and storefronts.",
    image: "/3d-metallic-neon-sign/Resturants/generated/026ad950-fafb-4407-8420-c83be7f49365.webp",
    alt: "Custom illuminated restaurant storefront and dining room sign",
    accent: "#ffaa33",
  },
  {
    id: "bars",
    slug: "business-signs/bar-signs",
    title: "Bars & Lounges",
    signTypeTag: "Cocktails & Nightlife",
    actionText: "Explore Bar Signs",
    description: "Vibrant custom neon and dual-lit channel lettering that set the mood for nightlife and event venues.",
    image: "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
    alt: "Vibrant cocktails and lounge custom neon sign glowing in a bar setting",
    accent: "#6b4664",
  },
  {
    id: "salons",
    slug: "business-signs/salon-spa-signs",
    title: "Salons, Spas & Beauty",
    signTypeTag: "Photo-Ready Glow",
    actionText: "Explore Salon Signs",
    description: "Soft halo-backlit logos and custom script neon designed as viral selfie backdrops for beauty studios.",
    image: "/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.webp",
    alt: "Warm halo-lit luxury salon and spa illuminated sign on feature wall",
    accent: "#ff2f83",
  },
  {
    id: "gyms",
    slug: "business-signs/gym-fitness-signs",
    title: "Gyms & Fitness Studios",
    signTypeTag: "High-Impact Commercial",
    actionText: "Explore Gym Signs",
    description: "Bold motivational neon quotes and high-durability 3D steel signage engineered for workout spaces.",
    image: "/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp",
    alt: "High-energy gym and fitness custom motivational neon sign",
    accent: "#00dc5a",
  },
  {
    id: "retail",
    slug: "business-signs/retail-storefronts",
    title: "Retail Boutiques & Storefronts",
    signTypeTag: "Storefront Displays",
    actionText: "Explore Retail Signs",
    description: "Slim edge-lit lightboxes, illuminated window signs, and branded acrylic logos that drive foot traffic.",
    image: "/ultra-thin-slim-lightbox/IMG-20260803-WA0004.jpg",
    alt: "Illuminated retail boutique storefront sign and slim lightbox display",
    accent: "#38bdf8",
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
          <p className="eyebrow">Tailored to your space</p>
          <h2 id="glow-directions-heading">
            Signs crafted for <PremiumAccentText>every industry.</PremiumAccentText>
          </h2>
          <p>
            Whether you are outfitting a high-traffic cocktail lounge, branding an executive reception wall, or designing a photo-worthy salon backdrop — explore signs engineered for your specific environment.
          </p>
        </header>

        <FocusCards
          cards={CATEGORY_CARDS}
          onSelect={(card) => {
            if (card.slug) {
              const target = card.slug.startsWith("/") ? card.slug : `/${card.slug}`;
              router.push(target);
            }
          }}
        />

        <div className="mt-10 text-center">
          <Link
            href="/business-signs"
            className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#282421] transition-colors hover:text-[#8f2347]"
          >
            <span>Explore all commercial sign collections</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
