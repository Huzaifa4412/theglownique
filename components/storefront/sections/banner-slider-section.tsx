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
 * - Dimensions are the files' real pixel sizes. The acrylic crop is 860×1828,
 *   not the 887×1774 of the others; declaring the wrong box makes the slide
 *   resize when the image lands.
 * - Filenames describe the sign (image search reads them); links point at each
 *   sign type's one canonical URL, never at a /products address that 301s.
 *
 * Not in the slider: /banner/ultra-thin-lightbox-*.png. Despite its name it
 * shows printed acrylic signs, not lightboxes, and one of its four tiles
 * carries the Charlotte Hornets marks and a player's name. Site policy since
 * 2026-09-14 excludes third-party trademarks from imagery; replace that tile
 * (or confirm a licence) before adding it back.
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
    mobile: { src: "/banner/custom-led-neon-signs-mobile.png", width: 887, height: 1774 },
    laptop: { src: "/banner/custom-led-neon-signs-laptop.png", width: 1674, height: 940 },
  },
  {
    id: "backlit",
    href: "/business-signs/backlit-signs",
    alt: "Gold halo-lit 3D metal letter signs for a beauty studio, a café and an eatery and tavern, with close-ups of the lit letter edges",
    mobile: { src: "/banner/halo-lit-metal-letter-signs-mobile.png", width: 887, height: 1774 },
    laptop: { src: "/banner/halo-lit-metal-letter-signs-laptop.png", width: 1674, height: 940 },
  },
  {
    id: "acrylic",
    href: "/business-signs/acrylic-logo-signs",
    alt: "Round illuminated acrylic logo signs for beauty studios, with printed and gold-finish logos glowing on marble plinths",
    mobile: { src: "/banner/acrylic-logo-signs-mobile.png", width: 860, height: 1828 },
    laptop: { src: "/banner/acrylic-logo-signs-laptop.png", width: 1672, height: 941 },
  },
  {
    id: "lightbox",
    href: "/products/ultra-thin-lightbox",
    alt: "Ultra thin slim LED lightbox displays for retail and storefronts",
    mobile: { src: "/banner/ultra-thin-lightbox-mobile.png", width: 887, height: 1774 },
    laptop: { src: "/banner/ultra-thin-lightbox-laptop.png", width: 1674, height: 940 },
  },
];

// Swiper's loop mode needs at least two slides more than it shows (one), so
// the set is only doubled when there are fewer than three. Doubles reuse the
// same URLs (cached, no extra bytes) and are hidden from assistive technology.
const SLIDES = (BANNERS.length < 3 ? [...BANNERS, ...BANNERS] : [...BANNERS]).map(
  (banner, index) => ({
    ...banner,
    key: `${banner.id}-${index}`,
    duplicate: index >= BANNERS.length,
    first: index === 0,
  }),
);

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
