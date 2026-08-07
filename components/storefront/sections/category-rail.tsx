"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import { IconBox } from "@/components/icon-box";
import { getProductPage } from "@/lib/product-catalog";
import type { CategoryId } from "@/lib/store-data";

/**
 * Each card is an entry point to one sign type's own detail page. They used to
 * filter the shop grid in place, which left visitors on the homepage with no
 * way to read about the product — the detail pages are where the specs,
 * options and FAQs live, so that's where a click should land.
 */
const RAIL_SOURCE: {
  id: CategoryId;
  slug: string;
  label: string;
  actionText: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "home",
    slug: "custom-neon-signs",
    label: "For Home",
    actionText: "Shop now",
    image: "/hero/neon-sign-hero.png",
    imageAlt:
      "Someone holding a white script LED neon name sign reading Olivia, with small pink hearts",
  },
  {
    id: "business",
    slug: "3d-metal-neon-signs",
    label: "For Business",
    actionText: "Shop now",
    image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
    imageAlt:
      "Halo-backlit 3D metal letters spelling Estudio Sur, glowing warm on a dark office reception wall",
  },
  {
    id: "events",
    slug: "uv-print-acrylic-signs",
    label: "Custom Art & Branding",
    actionText: "Shop now",
    image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
    imageAlt:
      "Illuminated white 3D acrylic letters spelling Sabroso! across a restaurant feature wall",
  },
  {
    id: "custom",
    slug: "ultra-thin-lightbox",
    label: "Create Your Own",
    actionText: "Start designing",
    image: "/ultra-thin-slim-lightbox/main-hero.png",
    imageAlt:
      "A Pop's Shop crest logo lightbox shown side by side, unlit and lit with a warm halo glow",
  },
];

/**
 * The sign-type label is read from the catalog rather than retyped here, so the
 * card, the products nav and the detail page can't drift into calling the same
 * product three different things.
 */
export const CATEGORY_RAIL_ITEMS = RAIL_SOURCE.map((item) => ({
  ...item,
  signType: getProductPage(item.slug)?.category ?? "",
}));

export function CategoryRail() {
  return (
    <section
      className="category-rail shell"
      id="categories"
      aria-label="Shop by sign type"
    >
      {CATEGORY_RAIL_ITEMS.map((item) => (
        <Link
          key={item.id}
          className="category-card group"
          href={`/products/${item.slug}`}
        >
          <div className="relative w-full aspect-[1.9/1] overflow-hidden bg-black/10">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 800px) 50vw, 25vw"
              unoptimized
              className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
            />
          </div>
          <span className="category-card__audience">{item.label}</span>
          <span className="category-card__type">{item.signType}</span>
          <small>
            {item.actionText} <IconBox icon={ArrowRight} />
          </small>
        </Link>
      ))}
    </section>
  );
}
