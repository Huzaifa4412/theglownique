"use client";

import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";

export function LampCtaSection() {
  return (
    <section className="bg-slate-950 w-full relative z-0" aria-label="Lamp Call to Action">
      <LampContainer>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-pink-300 to-pink-600 py-4 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-7xl"
        >
          Design Your Ultimate <br /> Custom Neon Sign
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-gray-300 text-center text-lg md:text-xl mt-4 max-w-2xl mx-auto"
        >
          Our master craftsmen are ready to forge your logo into a masterpiece of light and acrylic. Get a free interactive mockup today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 flex justify-center z-50 relative pointer-events-auto"
        >
          <CustomQuoteButton 
             label="Get Your Free Mockup" 
             className="px-8 py-4 bg-pink-600 text-white rounded-full font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors shadow-[0_0_40px_rgba(244,11,104,0.4)]"
          />
        </motion.div>
      </LampContainer>
    </section>
  );
}
