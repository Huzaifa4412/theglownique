"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type DetailImage = {
  src: string;
  alt: string;
  /** Short label for the thumbnail button. */
  label: string;
  /** CSS object-position, for a portrait source in a landscape frame. */
  position?: string;
};

type DetailGalleryProps = {
  images: readonly DetailImage[];
  /** `sizes` for the main frame. */
  sizes: string;
  /** Names the thumbnail group for screen readers, e.g. "Hair salon photos". */
  label: string;
  /** True for the hero only: its first image is the page's LCP element. */
  preload?: boolean;
  /** Rendered directly under the picture: the WhatsApp and Etsy buttons. */
  children?: ReactNode;
};

/**
 * One large picture, whatever is passed as children directly underneath it,
 * then thumbnails to swap the picture. Every image stays in the DOM (the
 * thumbnails are real <img> elements with alt text), so crawlers see all of
 * them, not just the first.
 */
export function DetailGallery({ images, sizes, label, preload = false, children }: DetailGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="detail-gallery">
      <div className="detail-gallery__frame">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes={sizes}
          // `preload` already implies eager loading; passing both is an error.
          {...(preload ? { preload: true } : { loading: "lazy" as const })}
          className="object-cover"
          style={current.position ? { objectPosition: current.position } : undefined}
        />
      </div>

      {/* Straight under the picture, above the thumbnails: on a phone the
          buttons must not be pushed below the fold by a row of thumbnails. */}
      {children}

      {images.length > 1 ? (
        <div className="detail-gallery__thumbs" role="group" aria-label={label}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="detail-gallery__thumb"
              aria-pressed={index === active}
              aria-label={`Show ${image.label}`}
              onClick={() => setActive(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="96px"
                loading="lazy"
                className="object-cover"
                style={image.position ? { objectPosition: image.position } : undefined}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
