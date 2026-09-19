"use client";

import { useState } from "react";
import { Sparkles, Tag, ShieldCheck, Zap } from "lucide-react";
import { CurvedInput } from "@/components/ui/curved-input";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { archiveLead } from "@/lib/leads";
import { trackNewsletterSignup } from "@/lib/meta-pixel";
import { capturePostHog } from "@/lib/posthog-client";

export function NewsletterSection() {
  const [message, setMessage] = useState("");

  const handleEmailSubmit = (email: string) => {
    // The address is now archived to Sanity, so a signup is a real record
    // someone can act on. Before this it was discarded and the confirmation
    // message claimed a code had been sent — a promise nothing could keep.
    //
    // The wording below is deliberately "we'll send" rather than "on its way":
    // the code is sent by hand from the Studio, so the copy has to describe a
    // commitment, not a delivery that already happened.
    archiveLead({
      source: "newsletter",
      email,
      topic: "Newsletter signup (10% welcome code)",
      pagePath: "/",
      consent: true,
    });
    trackNewsletterSignup();
    capturePostHog("newsletter_signed_up", { source: "homepage_newsletter" });
    setMessage(
      `Thanks — ${email} is on the list. We'll email your 10% code shortly.`,
    );
  };

  return (
    <section
      className="newsletter-section relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-[#efe9e0] via-[#f3f0e9] to-white border-t border-[#dcd6ce]"
      id="newsletter"
      aria-labelledby="newsletter-heading"
    >
      {/* Ambient Neon Background Glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-tr from-[#a92d56]/15 via-[#c25e83]/10 to-[#6b4664]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell max-w-4xl mx-auto px-4 relative z-10">
        <div className="rounded-[32px] bg-white/80 backdrop-blur-2xl border border-[#dcd6ce] p-8 sm:p-14 shadow-[0_24px_70px_rgba(107,38,67,0.12)] text-center relative overflow-hidden">
          {/* Subtle Pink Top Line Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#a92d56] via-[#c25e83] to-[#6b4664]"
            aria-hidden="true"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#efe9e0] border border-[#e9e2d4] text-[#8f2347] text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>Exclusive VIP Welcome Offer</span>
          </div>

          {/* Heading */}
          <h2
            id="newsletter-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#282421] leading-tight mb-4"
          >
            Get 10% off <PremiumAccentText>your first order</PremiumAccentText>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#5e5862] leading-relaxed max-w-xl mx-auto mb-10 font-normal">
            Sign up for product drops, colour inspiration and subscriber-only offers.
          </p>

          {/* Curved Input Component from ReactBits */}
          <CurvedInput
            placeholder="Enter your email address"
            buttonText="Get my code"
            onSubmit={handleEmailSubmit}
          />

          {message && (
            <p className="mt-4 text-xs font-semibold text-[#8f2347] animate-fade-in">
              {message}
            </p>
          )}

          {/* Trust Guarantee Row */}
          <div className="mt-10 pt-8 border-t border-[#dcd6ce]/60 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5e5862] font-semibold">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#a92d56]" />
              <span>Instant Code Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#a92d56]" />
              <span>Zero Spam Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#a92d56]" />
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
