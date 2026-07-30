"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";

import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import { categoryLabels, heroSlides } from "@/lib/store-data";

export function CategoryRail() {
  const { chooseCategory } = useStorefront();

  return (
    <section
      className="category-rail shell"
      id="categories"
      aria-label="Shop by occasion"
    >
      {heroSlides.map((slide) => (
        <button
          key={slide.id}
          className="category-card"
          type="button"
          onClick={() => chooseCategory(slide.id, true)}
        >
          <Image
            src={slide.image}
            alt=""
            sizes="(max-width: 800px) 50vw, 17vw"
            placeholder="blur"
          />
          <span>{categoryLabels[slide.id]}</span>
          <small>
            {slide.id === "custom" ? "Start designing" : "Shop now"}{" "}
            <IconBox icon={ArrowRight} />
          </small>
        </button>
      ))}
    </section>
  );
}
