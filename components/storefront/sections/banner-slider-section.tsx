"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

/**
 * Homepage banner slider.
 *
 * The first slide is the homepage's Largest Contentful Paint element on phones
 * and laptops alike, so how it loads decides the LCP of the site's busiest
 * landing page. The source files are ~2.3 MB PNGs; served raw they took an
 * estimated 42 s to arrive on a throttled phone and pushed field LCP past 3 s.
 * They now go through the image optimizer as art-directed AVIF/WebP at the
 * rendered width.
 *
 * - Each <source> and the <img> carry their own intrinsic width and height,
 *   so the browser reserves the right box before a byte arrives. The phone
 *   crop is 1:2 and the laptop crop 16:9; without per-source dimensions the
 *   box collapsed and the hero below it jumped when the image landed (CLS).
 * - Only the first slide asks for high fetch priority. The rest wait their
 *   turn behind it.
 * - Slides 3 and 4 repeat 1 and 2 so Swiper's loop mode has enough slides.
 *   They reuse the same URLs (cached, no extra bytes) and are hidden from
 *   assistive technology so a screen reader does not describe each banner twice.
 */
type BannerSlide = {
  id: string;
  href: string;
  alt: string;
  mobile: { src: string; width: number; height: number };
  laptop: { src: string; width: number; height: number };
};

const BANNERS: readonly BannerSlide[] = [
  {
    id: "neon",
    href: "/products/custom-neon-signs",
    alt: "Custom LED neon signs reading “Bride to be”, “Custom Neon Sign”, “Olivia” and “Bible Nerd”, glowing in warm white, orange, pink and cool white",
    mobile: { src: "/banner/mobile.png", width: 887, height: 1774 },
    laptop: { src: "/banner/laptop.png", width: 1674, height: 940 },
  },
  {
    id: "backlit",
    href: "/business-signs/backlit-signs",
    alt: "Gold halo-lit 3D metal letter signs for a beauty studio, a café and an eatery and tavern, with close-ups of the lit letter edges",
    mobile: { src: "/banner/backlit-sign-mobile.png", width: 887, height: 1774 },
    laptop: { src: "/banner/backlit-sign-laptop.png", width: 1674, height: 940 },
  },
];

const SLIDES = [...BANNERS, ...BANNERS].map((banner, index) => ({
  ...banner,
  key: `${banner.id}-${index}`,
  duplicate: index >= BANNERS.length,
  first: index === 0,
}));

function BannerPicture({
  slide,
}: {
  slide: (typeof SLIDES)[number];
}) {
  const common = { alt: slide.duplicate ? "" : slide.alt, sizes: "100vw" };
  const {
    props: { srcSet: laptopSrcSet },
  } = getImageProps({ ...common, ...slide.laptop });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    ...slide.mobile,
    loading: slide.first ? "eager" : "lazy",
    fetchPriority: slide.first ? "high" : "low",
  });

  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={laptopSrcSet}
        sizes="100vw"
        width={slide.laptop.width}
        height={slide.laptop.height}
      />
      <img
        {...imgProps}
        srcSet={mobileSrcSet}
        alt={common.alt}
        className="block h-auto w-full"
      />
    </picture>
  );
}

export function BannerSliderSection() {
  return (
    <section className="w-full" aria-label="Featured sign collections">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.key} className="relative w-full" aria-hidden={slide.duplicate || undefined}>
            <Link
              href={slide.href}
              tabIndex={slide.duplicate ? -1 : undefined}
              data-meta-source={`home-banner-${slide.id}`}
              className="block"
            >
              <BannerPicture slide={slide} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
