"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import TiltedCard from "@/components/TiltedCard";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { StoreIcon } from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { heroSlides } from "@/lib/store-data";

const inspirationSlides = [
  {
    image: "/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp",
    alt: "Better Together Wedding Neon Sign in warm glow",
    label: "Weddings & Keepsakes",
    tag: "Preview 01",
    subtitle: "Made for your unforgettable moment",
    badge: "1. Neon Sign",
  },
  {
    image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
    alt: "Corporate HQ 3D Metallic Channel Lettering Sign",
    label: "3D Metal Signage",
    tag: "Preview 02",
    subtitle: "Frontlit, Backlit & Dual-Lit channel lettering",
    badge: "2. 3D Metal Sign",
  },
  {
    image: "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
    alt: "Vibrant Cocktails & Lounge Neon Sign",
    label: "Bars & Restaurants",
    tag: "Preview 03",
    subtitle: "Set the mood for nightlife and events",
    badge: "1. Neon Sign",
  },
  {
    image: "/ultra-thin-slim-lightbox/IMG-20260803-WA0004.jpg",
    alt: "Ultra Thin Slim Lightbox Sign with Edge-lit LED",
    label: "Ultra Thin Lightbox",
    tag: "Preview 04",
    subtitle: "Uniform illumination for modern storefronts",
    badge: "3. Lightbox Sign",
  },
  {
    image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
    alt: "3D Acrylic UV Print Neon Sign with glowing contour",
    label: "3D Acrylic UV Print",
    tag: "Preview 05",
    subtitle: "High-definition UV graphics + contour neon",
    badge: "4. Acrylic UV Print",
  },
  {
    image: "/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp",
    alt: "No Pain No Gain Gym Frontlit Metal Sign",
    label: "Gym & Commercial",
    tag: "Preview 06",
    subtitle: "High-impact branding built to last",
    badge: "2. 3D Metal Sign",
  },
  {
    image: "/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp",
    alt: "Personalized Name Neon Sign",
    label: "Custom Persona",
    tag: "Preview 07",
    subtitle: "Your phrase, signature font & favorite color",
    badge: "Custom Craft",
  },
];

const designSteps = [
  {
    number: "01",
    title: "Say it your way",
    description: "A phrase, name or mark that only belongs to you.",
    icon: "FileText" as const,
  },
  {
    number: "02",
    title: "Set the mood",
    description: "Choose the colour and scale that suit your space.",
    icon: "Sparkle" as const,
  },
  {
    number: "03",
    title: "Approve the glow",
    description: "See a free design preview before production begins.",
    icon: "SealCheck" as const,
  },
];

export function InspirationSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % inspirationSlides.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % inspirationSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + inspirationSlides.length) % inspirationSlides.length
    );
  };

  const activeSlide = inspirationSlides[currentIndex];

  return (
    <section className="inspiration" id="inspiration">
      <div className="inspiration__wordmark" aria-hidden="true">
        YOUR IDEA
      </div>

      <div className="inspiration__pin" data-inspiration-pin>
        <div className="shell inspiration__grid">
          {/* Left Column: Continuous Animated Image Visual */}
          <div
            className="inspiration__visual inspiration__visual--tilted relative group"
            data-inspiration-visual
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Top Studio Label */}
            <div className="inspiration__studio-label z-20">
              <span className="font-medium">{activeSlide.label}</span>
              <span className="font-mono text-pink-400">{activeSlide.tag}</span>
            </div>

            {/* Continuous Animated Card Transition Container */}
            <div className="relative w-full overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <TiltedCard
                    imageSrc={activeSlide.image}
                    altText={activeSlide.alt}
                    sizes="(max-width: 899px) 100vw, 50vw"
                    rotateAmplitude={5}
                    scaleOnHover={1.018}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Visual Note Badge */}
            <div className="inspiration__visual-note z-20 transition-all duration-300">
              <span className="inspiration__live-mark" aria-hidden="true" />
              <span>{activeSlide.subtitle}</span>
              <strong className="text-pink-400">{activeSlide.badge}</strong>
            </div>

            {/* Interactive Carousel Overlay Controls */}
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Previous slide"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label={isPlaying ? "Pause auto-play" : "Play auto-play"}
              >
                {isPlaying ? (
                  <Pause size={14} weight="fill" className="text-pink-400" />
                ) : (
                  <Play size={14} weight="fill" className="text-emerald-400" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Next slide"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {inspirationSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-pink-500 shadow-[0_0_8px_rgba(244,11,104,0.6)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Copy & Design Process */}
          <div className="inspiration__copy">
            <div className="inspiration__intro" data-inspiration-copy>
              <p className="eyebrow">Make it personal</p>
              <h2>
                Your idea, drawn in <PremiumAccentText>light.</PremiumAccentText>
              </h2>
              <p>
                Send the words, colour and rough size. We turn them into a clear
                preview before your sign is made.
              </p>
            </div>

            <ol className="inspiration__brief" aria-label="Custom design process">
              {designSteps.map((step) => (
                <li key={step.number} data-inspiration-step>
                  <span className="inspiration__step-number">{step.number}</span>
                  <StoreIcon name={step.icon} />
                  <span className="inspiration__step-copy">
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="inspiration__action" data-inspiration-action>
              <CustomQuoteButton
                className="button button--primary custom-cta"
                label="Start your design"
              />
              <p>
                <StoreIcon name="CheckCircle" /> Free preview. No commitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
