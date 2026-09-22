"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export function BannerSliderSection() {
  const slides = [
    { id: 1, mobileSrc: "/banner/mobile.png", laptopSrc: "/banner/laptop.png", alt: "Glownique Custom Banners" },
    { id: 2, mobileSrc: "/banner/backlit-sign-mobile.png", laptopSrc: "/banner/backlit-sign-laptop.png", alt: "Premium Backlit Sign Banners" },
    { id: 3, mobileSrc: "/banner/mobile.png", laptopSrc: "/banner/laptop.png", alt: "Glownique Custom Banners" },
    { id: 4, mobileSrc: "/banner/backlit-sign-mobile.png", laptopSrc: "/banner/backlit-sign-laptop.png", alt: "Premium Backlit Sign Banners" },
  ];

  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full">
            <picture>
              {/* Mobile image for screens smaller than 768px */}
              <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
              {/* Laptop image for screens 768px and up */}
              <source media="(min-width: 768px)" srcSet={slide.laptopSrc} />
              {/* Fallback img */}
              <img
                src={slide.laptopSrc}
                alt={slide.alt}
                className="w-full h-auto block"
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
