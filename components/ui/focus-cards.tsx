"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type FocusCardItem = {
  id: string;
  slug?: string;
  title: string;
  signTypeTag?: string;
  description?: string;
  actionText: string;
  image: StaticImageData | string;
  alt: string;
  accent: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onSelect,
  }: {
    card: FocusCardItem;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onSelect?: (card: FocusCardItem) => void;
  }) => {
    const isStringImage = typeof card.image === "string";

    return (
      <button
        type="button"
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(index)}
        onBlur={() => setHovered(null)}
        onClick={() => onSelect?.(card)}
        aria-label={`${card.actionText} ${card.title} signs`}
        className={cn(
          "focus-card",
          hovered !== null && hovered !== index && "is-muted",
        )}
        style={{ "--focus-accent": card.accent } as React.CSSProperties}
      >
        <Image
          src={card.image}
          alt={card.alt}
          className="focus-card__image"
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
          unoptimized={isStringImage}
          placeholder={isStringImage ? undefined : "blur"}
        />
        <span className="focus-card__scrim" aria-hidden="true" />

        {card.signTypeTag && (
          <span className="focus-card__tag">
            {card.signTypeTag}
          </span>
        )}

        <span className="focus-card__copy">
          <strong>{card.title}</strong>
          <span className="focus-card__action-btn">
            {card.actionText} &rarr;
          </span>
        </span>
      </button>
    );
  }
);

Card.displayName = "Card";

export function FocusCards({
  cards,
  onSelect,
}: {
  cards: FocusCardItem[];
  onSelect?: (card: FocusCardItem) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="focus-cards">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
