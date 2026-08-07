"use client";

import { useSyncExternalStore } from "react";
import { Truck, Zap, Check } from "lucide-react";
import { motion } from "motion/react";

import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

// ─────────────────────────────────────────────────────────────
// Set this to when your free-delivery promotion actually ends.
// The countdown targets this real deadline (it does NOT secretly
// reset per visitor). Update it whenever you run a new promo.
// ─────────────────────────────────────────────────────────────
const OFFER_END = new Date("2026-08-11T23:59:59");

// The countdown reads the wall clock, which is an external system, so it is
// subscribed to with useSyncExternalStore instead of being mirrored into state
// from an effect — the latter re-renders twice per tick and is flagged by
// react-hooks/set-state-in-effect.
function subscribeToClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

// The snapshot has to be a value that is stable between ticks, otherwise React
// sees a new value on every render and loops. Whole seconds remaining is stable
// and every unit below is derived from it. Rounded up so the display only hits
// zero at the moment the offer actually ends.
function getSecondsLeft(): number | null {
  return Math.max(0, Math.ceil((OFFER_END.getTime() - Date.now()) / 1000));
}

// `null` on the server and during hydration, so the first client render matches
// the server HTML and the "--" placeholder shows until the clock is read.
function getServerSecondsLeft(): number | null {
  return null;
}

const trustPoints = [
  "All four sign types",
  "No minimum spend",
  "Ships worldwide",
];

export function FreeDeliverySection() {
  const secondsLeft = useSyncExternalStore(
    subscribeToClock,
    getSecondsLeft,
    getServerSecondsLeft,
  );

  const mounted = secondsLeft !== null;
  const remaining = secondsLeft ?? 0;
  const expired = mounted && remaining === 0;

  const units = [
    { label: "Days", value: Math.floor(remaining / 86_400) },
    { label: "Hours", value: Math.floor(remaining / 3_600) % 24 },
    { label: "Mins", value: Math.floor(remaining / 60) % 60 },
    { label: "Secs", value: remaining % 60 },
  ];

  const isLive = !expired;

  return (
    <section
      className="free-delivery-section relative overflow-hidden bg-[#0b0910] py-16 sm:py-20 border-y border-white/10 text-white"
      id="free-delivery"
      aria-labelledby="free-delivery-heading"
    >
      {/* Ambient neon glows */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#f40b68]/25 to-transparent blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#6d26ff]/25 to-transparent blur-[130px]"
        aria-hidden="true"
      />

      <motion.div
        className="shell relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f40b68]/40 bg-[#f40b68]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-pink-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400" />
          </span>
          Limited-time offer
        </div>

        {/* Delivery icon */}
        <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-[#f40b68] to-[#6d26ff] shadow-[0_0_30px_rgba(244,11,104,0.5)]">
          <Truck className="h-7 w-7 text-white" aria-hidden="true" />
        </div>

        <h2
          id="free-delivery-heading"
          className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
        >
          Free Worldwide Delivery{" "}
          <PremiumAccentText>on every order</PremiumAccentText>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
          For a limited time, we&apos;re covering delivery on all four sign types
          — anywhere in the world, with no minimum spend. Lock in your free
          delivery before the countdown ends.
        </p>

        {/* Countdown */}
        <div
          className="mt-9 flex items-start justify-center gap-2.5 sm:gap-4"
          role="timer"
          aria-live="off"
          aria-label={
            isLive
              ? "Time remaining for free worldwide delivery"
              : "Free delivery promotion status"
          }
        >
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-start">
              <div className="flex min-w-[70px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4 shadow-[0_0_30px_rgba(244,11,104,0.12)] backdrop-blur-md sm:min-w-[92px] sm:px-5 sm:py-5">
                <div className="flex h-9 items-center justify-center overflow-hidden sm:h-14">
                  <motion.span
                    key={`${unit.label}-${mounted ? unit.value : "x"}`}
                    initial={{ y: -14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl font-extrabold tabular-nums text-white sm:text-5xl"
                  >
                    {mounted ? String(unit.value).padStart(2, "0") : "--"}
                  </motion.span>
                </div>
                <span className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-pink-300/80 sm:text-xs">
                  {unit.label}
                </span>
              </div>
              {index < units.length - 1 && (
                <span
                  className="px-1 pt-3 text-2xl font-bold text-white/25 sm:px-1.5 sm:pt-4 sm:text-4xl"
                  aria-hidden="true"
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {expired && (
          <p className="mt-5 text-xs font-semibold text-pink-300">
            Our free-delivery promotion has ended for now — ask us about current
            offers when you request a quote.
          </p>
        )}

        {/* CTA */}
        <div className="mt-9">
          <CustomQuoteButton
            className="button button--primary"
            label={isLive ? "Claim free delivery" : "Design your sign"}
          />
        </div>

        {/* Trust row */}
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-300">
          {trustPoints.map((point) => (
            <li key={point} className="inline-flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#f40b68] to-[#6d26ff]">
                <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
          <Zap className="h-3 w-3 text-pink-400" aria-hidden="true" />
          Delivery cost is fully covered by The Glownique during this promotion.
        </p>
      </motion.div>
    </section>
  );
}
