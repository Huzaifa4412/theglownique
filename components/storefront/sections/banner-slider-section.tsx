"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export function BannerSliderSection() {
  // Repeating the banner 4 times as requested
  const slides = [1, 2, 3, 4];

  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {slides.map((index) => (
          <SwiperSlide key={index} className="relative w-full">
            <picture>
              {/* Mobile image for screens smaller than 768px */}
              <source media="(max-width: 767px)" srcSet="/banner/mobile.png" />
              {/* Laptop image for screens 768px and up */}
              <source media="(min-width: 768px)" srcSet="/banner/laptop.png" />
              {/* Fallback img */}
              <img
                src="/banner/laptop.png"
                alt={`Banner Slide ${index}`}
                className="w-full h-auto block"
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
