"use client";

import { useRef } from "react";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { StoreIcon } from "@/components/storefront/store-icon";
import { useStorefront } from "@/components/storefront/storefront-context";
import { testimonials } from "@/lib/store-data";

export function TestimonialCarousel() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const { reducedMotion } = useStorefront();

  return (
    <div className="testimonial-carousel" aria-label="Customer testimonials">
      <div className="testimonial-carousel__spark testimonial-carousel__spark--one" aria-hidden="true">✦</div>
      <div className="testimonial-carousel__spark testimonial-carousel__spark--two" aria-hidden="true">✦</div>
      <Swiper
        modules={[A11y, Autoplay, EffectCoverflow, Navigation, Pagination]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="testimonial-swiper"
        effect={reducedMotion ? "slide" : "coverflow"}
        speed={reducedMotion ? 0 : 650}
        slidesPerView={1.06}
        spaceBetween={12}
        centeredSlides
        coverflowEffect={{
          rotate: 2,
          stretch: "4%",
          depth: 90,
          scale: 0.92,
          modifier: 1.25,
          slideShadows: false,
        }}
        loop
        grabCursor
        slideToClickedSlide
        autoplay={reducedMotion ? false : { delay: 4600, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, el: ".testimonial-carousel__pagination" }}
        navigation={false}
        a11y={{
          prevSlideMessage: "Previous testimonial",
          nextSlideMessage: "Next testimonial",
          slideLabelMessage: "Testimonial {{index}} of {{slidesLength}}",
        }}
        breakpoints={{
          680: { slidesPerView: 1.45, spaceBetween: 18 },
          1040: { slidesPerView: 2.15, spaceBetween: 22 },
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.name}>
            <article className="review-card">
              <div className="review-card__topline">
                <div className="review-stars" aria-label="Five stars">★★★★★</div>
                <span className="review-card__verified"><StoreIcon name="SealCheck" /> Verified</span>
              </div>
              <span className="review-card__quote-mark" aria-hidden="true">“</span>
              <blockquote>{item.quote}</blockquote>
              <footer>
                <span className="avatar">{item.initials}</span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>
                <span className="review-card__shine" aria-hidden="true">✦</span>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="testimonial-carousel__controls">
        <div className="testimonial-carousel__pagination" aria-label="Choose testimonial" />
        <div className="testimonial-carousel__arrows">
          <button type="button" className="testimonial-carousel__arrow" aria-label="Previous testimonial" onClick={() => swiperRef.current?.slidePrev()}><span aria-hidden="true">←</span></button>
          <button type="button" className="testimonial-carousel__arrow" aria-label="Next testimonial" onClick={() => swiperRef.current?.slideNext()}><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}
