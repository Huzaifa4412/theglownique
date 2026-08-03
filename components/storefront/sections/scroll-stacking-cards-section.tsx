"use client";

import React, { useRef } from "react";
import { Layers, Zap, Cpu, Sliders } from "lucide-react";
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
  glowShadow: string;
  accentBg: string;
  badgeBg: string;
  stats: string;
  previewText: string;
};

const STACK_CARDS: StackCardItem[] = [
  {
    id: "card-1",
    number: "01",
    badge: "8mm Cast Acrylic",
    title: "Optical Grade Cast Base",
    subtitle: "Precision Flame-Polished Edges",
    description:
      "Ultra-clear 8mm cast acrylic backboard, laser-cut to exact design dimensions with 45° flame-polished outer edges for maximum light reflection and structural stability.",
    icon: Layers,
    accentHex: "#f40b68",
    glowShadow: "rgba(244, 11, 104, 0.16)",
    accentBg: "rgba(244, 11, 104, 0.08)",
    badgeBg: "#fff0f5",
    stats: "99.2% Optical Clarity",
    previewText: "Optical Precision",
  },
  {
    id: "card-2",
    number: "02",
    badge: "IP67 Phosphorus Silicon",
    title: "High-Density Silicon LED",
    subtitle: "100,000+ Hours Lifespan",
    description:
      "Flexible phosphorus-silicon LED tubes running at cool-touch 12V low voltage. Shatterproof, zero heat output, and 80% more energy efficient than traditional glass neon.",
    icon: Zap,
    accentHex: "#6d26ff",
    glowShadow: "rgba(109, 38, 255, 0.16)",
    accentBg: "rgba(109, 38, 255, 0.08)",
    badgeBg: "#f3eefd",
    stats: "12V Cool-Touch Operation",
    previewText: "100k+ Hours Glow",
  },
  {
    id: "card-3",
    number: "03",
    badge: "Stealth Micro Wiring",
    title: "Concealed Circuitry",
    subtitle: "Zero Visible Power Joints",
    description:
      "Silver-alloy micro circuitry embedded invisibly within structural rear channels. Eliminates wire clutter for a pure, floating neon aesthetic against any wall.",
    icon: Cpu,
    accentHex: "#0284c7",
    glowShadow: "rgba(2, 132, 199, 0.16)",
    accentBg: "rgba(2, 132, 199, 0.08)",
    badgeBg: "#f0f9ff",
    stats: "Invisible Power Channels",
    previewText: "Pure Stealth",
  },
  {
    id: "card-4",
    number: "04",
    badge: "Wireless RF Control",
    title: "Smart Dimmer System",
    subtitle: "Multi-Mode Ambient Pulse",
    description:
      "Full 1-100% smooth brightness control, dynamic breathing pulse modes, and smart timer automation using the included compact wireless RF remote controller.",
    icon: Sliders,
    accentHex: "#d97706",
    glowShadow: "rgba(217, 119, 6, 0.16)",
    accentBg: "rgba(217, 119, 6, 0.08)",
    badgeBg: "#fffbeb",
    stats: "Multi-Mode Wireless RF",
    previewText: "Smart Ambiance",
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
            <span>Architectural Engineering</span>
            <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#6d26ff] to-[#f40b68]" />
          </p>

          <h2
            id="stacking-craft-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1e1a22] leading-tight"
          >
            Crafted for <PremiumAccentText>Pure Brilliance.</PremiumAccentText>
          </h2>

          <p className="text-sm sm:text-base text-[#5e5862] leading-relaxed max-w-2xl mx-auto font-normal">
            Scroll down to explore the 4 precision pillars behind every handcrafted Glownique neon sign.
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
                          style={{ color: card.accentHex }}
                        >
                          {card.number}
                        </span>
                        <span
                          className="px-3 py-1 text-xs font-bold rounded-full border border-[#eadfe4]"
                          style={{
                            backgroundColor: card.badgeBg,
                            color: card.accentHex,
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
                          style={{ color: card.accentHex }}
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
                          color: card.accentHex,
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
                          The Glownique Standard
                        </span>
                      </div>

                      <CustomQuoteButton
                        className="button button--primary text-xs px-5 py-2.5 rounded-xl font-bold w-full shadow-md"
                        label="Get Custom Quote"
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
