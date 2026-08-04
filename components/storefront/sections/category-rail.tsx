"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";

import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import type { CategoryId } from "@/lib/store-data";

export const CATEGORY_RAIL_ITEMS: {
  id: CategoryId;
  label: string;
  signType: string;
  actionText: string;
  image: string;
}[] = [
  {
    id: "home",
    label: "For Home",
    signType: "LED Neon Sign",
    actionText: "Shop now",
    image: "/hero/neon-sign-hero.png",
  },
  {
    id: "business",
    label: "For Business",
    signType: "3D Metal Neon Sign",
    actionText: "Shop now",
    image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
  },
  {
    id: "events",
    label: "Custom Art & Branding",
    signType: "Acrylic UV Print Neon",
    actionText: "Shop now",
    image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
  },
  {
    id: "custom",
    label: "Create Your Own",
    signType: "Ultra Thin Lightbox",
    actionText: "Start designing",
    image: "/ultra-thin-slim-lightbox/main-hero.png",
  },
];

export function CategoryRail() {
  const { chooseCategory } = useStorefront();

  return (
    <section
      className="category-rail shell"
      id="categories"
      aria-label="Shop by occasion"
    >
      {CATEGORY_RAIL_ITEMS.map((item) => (
        <button
          key={item.id}
          className="category-card group"
          type="button"
          onClick={() => chooseCategory(item.id, true)}
        >
          <div className="relative w-full aspect-[1.9/1] overflow-hidden bg-black/10">
            <Image
              src={item.image}
              alt={`${item.label} — custom ${item.signType}`}
              fill
              sizes="(max-width: 800px) 50vw, 25vw"
              unoptimized
              className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
            />
          </div>
          <span>{item.label}</span>
          <small>
            {item.actionText} <IconBox icon={ArrowRight} />
          </small>
        </button>
      ))}
    </section>
  );
}
