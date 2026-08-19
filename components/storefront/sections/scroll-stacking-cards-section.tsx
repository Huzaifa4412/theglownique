"use client";

import React, { useRef } from "react";
import { Upload, Palette, FileText, ShieldCheck, Wrench, Truck } from "lucide-react";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

type StackCardItem = {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accentHex: string;
  /** Darkened accent for TEXT on the pale badge/tint backgrounds.
   *  accentHex itself is a mid-tone that only reaches ~3.1-3.8:1 there. */
  accentText: string;
  glowShadow: string;
  accentBg: string;
  badgeBg: string;
  stats: string;
  previewText: string;
};

const STACK_CARDS: StackCardItem[] = [
  {
    id: "step-1",
    number: "01",
    badge: "You send it",
    title: "Share Your Idea",
    subtitle: "Words, Logo or Rough Sketch",
    description:
      "Tell us what you'd like your sign to say and send your text, logo, brand colours or even a rough sketch. Whatever you have is enough for us to get started.",
    icon: Upload,
    accentHex: "#f40b68",
    accentText: "#ce0754",
    glowShadow: "rgba(244, 11, 104, 0.16)",
    accentBg: "rgba(244, 11, 104, 0.08)",
    badgeBg: "#fff0f5",
    stats: "Any file works — logo, photo or sketch",
    previewText: "Your Idea",
  },
  {
    id: "step-2",
    number: "02",
    badge: "We design it",
    title: "Free Design Mockup",
    subtitle: "See It Before You Buy",
    description:
      "Our designers turn your idea into a realistic digital mockup — showing the size, colours and glow — completely free, so you can picture it on your wall before you commit.",
    icon: Palette,
    accentHex: "#6d26ff",
    accentText: "#5b16d6",
    glowShadow: "rgba(109, 38, 255, 0.16)",
    accentBg: "rgba(109, 38, 255, 0.08)",
    badgeBg: "#f3eefd",
    stats: "Free, no-obligation preview",
    previewText: "Free Mockup",
  },
  {
    id: "step-3",
    number: "03",
    badge: "You approve",
    title: "Approve & Get Your Quote",
    subtitle: "Two Flexible Payment Options",
    description:
      "Happy with the mockup? We send a clear, all-in quote — sign, custom options and tracked delivery included. Choose the plan that suits you: pay in full, or split it 50/50, with half to begin production and the balance once your sign is ready.",
    icon: FileText,
    accentHex: "#0284c7",
    accentText: "#075985",
    glowShadow: "rgba(2, 132, 199, 0.16)",
    accentBg: "rgba(2, 132, 199, 0.08)",
    badgeBg: "#f0f9ff",
    stats: "Pay in full, or 50% now & 50% when ready",
    previewText: "Your Quote",
  },
  {
    id: "step-4",
    number: "04",
    badge: "You pay, safely",
    title: "Secure Payment via Etsy",
    subtitle: "Buyer-Protected Checkout",
    description:
      "You pay through our verified Etsy shop, so every transaction runs on Etsy's encrypted checkout with Purchase Protection. Your details and money stay safe — and we only begin production once your payment is confirmed.",
    icon: ShieldCheck,
    accentHex: "#0d9488",
    accentText: "#0f766e",
    glowShadow: "rgba(13, 148, 136, 0.16)",
    accentBg: "rgba(13, 148, 136, 0.08)",
    badgeBg: "#f0fdfa",
    stats: "Etsy Purchase Protection · encrypted checkout",
    previewText: "100% Secure",
  },
  {
    id: "step-5",
    number: "05",
    badge: "We craft it",
    title: "Handcrafted in Production",
    subtitle: "Made & Quality-Checked",
    description:
      "With your payment secured, skilled makers handcraft your sign by hand, then light-test and quality-check every inch of glow before packing it safely for its journey.",
    icon: Wrench,
    accentHex: "#d97706",
    accentText: "#92400e",
    glowShadow: "rgba(217, 119, 6, 0.16)",
    accentBg: "rgba(217, 119, 6, 0.08)",
    badgeBg: "#fffbeb",
    stats: "Handmade & quality-checked in ~10–15 days",
    previewText: "In Production",
  },
  {
    id: "step-6",
    number: "06",
    badge: "We deliver it",
    title: "Tracked Worldwide Delivery",
    subtitle: "Tracked Right to Your Door",
    description:
      "Once your sign is ready and the balance is settled, it ships fully tracked to your door — arriving ready to hang and glow, wherever in the world you are.",
    icon: Truck,
    accentHex: "#0e9f6e",
    accentText: "#047857",
    glowShadow: "rgba(14, 159, 110, 0.16)",
    accentBg: "rgba(14, 159, 110, 0.08)",
    badgeBg: "#ecfdf5",
    stats: "Shipped worldwide, fully tracked",
    previewText: "Tracked Delivery",
  },
];

export function ScrollStackingCardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="scroll-stacking-section relative bg-gradient-to-b from-white via-[#fdf7f9] to-[#fff0f5] text-[#1e1a22] py-20 md:py-28 border-t border-[#eadfe4]"
      id="stacking-craft"
      aria-labelledby="stacking-craft-heading"
    >
      <div className="shell max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching The Glownique aesthetic */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="eyebrow flex items-center justify-center gap-2">
            <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#f40b68] to-[#6d26ff]" />
            <span>How to order</span>
            <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#6d26ff] to-[#f40b68]" />
          </p>

          <h2
            id="stacking-craft-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1e1a22] leading-tight"
          >
            From idea to your wall in <PremiumAccentText>six simple steps.</PremiumAccentText>
          </h2>

          <p className="text-sm sm:text-base text-[#5e5862] leading-relaxed max-w-2xl mx-auto font-normal">
            Scroll to see how your custom sign goes from first idea to tracked delivery — no guesswork, no risk.
          </p>
        </div>

        {/* 3D Stacking Cards Container */}
        <div className="relative max-w-5xl mx-auto space-y-12">
          {STACK_CARDS.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className="sticky top-28 transition-all duration-300"
                style={{
                  zIndex: index + 10,
                }}
              >
                <div
                  className="rounded-[24px] p-6 sm:p-10 border border-[#eadfe4] bg-white/95 backdrop-blur-xl shadow-[0_22px_60px_rgba(107,38,67,0.12)] transition-all duration-500 relative overflow-hidden"
                  style={{
                    boxShadow: `0 24px 60px -10px ${card.glowShadow}`,
                    transform: `scale(${1 - (STACK_CARDS.length - index - 1) * 0.02})`,
                  }}
                >
                  {/* Subtle Top Accent Border Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[24px]"
                    style={{
                      background: `linear-gradient(90deg, ${card.accentHex}, #f40b68)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    {/* Left Column: Number & Content */}
                    <div className="space-y-4 max-w-xl">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono font-extrabold text-3xl sm:text-4xl tracking-tight"
                          style={{ color: card.accentText }}
                        >
                          {card.number}
                        </span>
                        <span
                          className="px-3 py-1 text-xs font-bold rounded-full border border-[#eadfe4]"
                          style={{
                            backgroundColor: card.badgeBg,
                            color: card.accentText,
                          }}
                        >
                          {card.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1e1a22] tracking-tight">
                          {card.title}
                        </h3>
                        <p
                          className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                          style={{ color: card.accentText }}
                        >
                          {card.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5e5862] leading-relaxed font-normal">
                        {card.description}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#1e1a22]">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]"
                          style={{ backgroundColor: card.accentHex }}
                        >
                          ✓
                        </span>
                        <span>{card.stats}</span>
                      </div>
                    </div>

                    {/* Right Column: Contrast Neon Sign Tile */}
                    <div className="flex flex-col items-center justify-center p-7 sm:p-8 rounded-[20px] bg-[#170e17] border border-[#32182c] min-w-[260px] text-center space-y-4 shadow-xl relative overflow-hidden group">
                      {/* Background Ambient Glow */}
                      <div
                        className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-75"
                        style={{ backgroundColor: card.accentHex }}
                        aria-hidden="true"
                      />

                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: card.accentBg,
                          borderColor: `${card.accentHex}50`,
                          color: card.accentText,
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="space-y-1 relative z-10">
                        <span
                          className="font-serif italic text-2xl sm:text-3xl block font-bold transition-all duration-300"
                          style={{
                            color: "#ffffff",
                            textShadow: `0 0 8px #ffffff, 0 0 18px ${card.accentHex}, 0 0 35px ${card.accentHex}`,
                          }}
                        >
                          {card.previewText}
                        </span>
                        <span className="text-[10px] text-[#fde2ec] font-extrabold uppercase tracking-widest block">
                          The Glownique Way
                        </span>
                      </div>

                      <CustomQuoteButton
                        className="button button--whatsapp text-xs px-5 py-2.5 rounded-xl font-bold w-full shadow-md"
                        label="Start your order"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
