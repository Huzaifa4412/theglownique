"use client";

import { Sparkles as SparklesIcon, Zap, Moon, ArrowRight } from "lucide-react";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { WobbleCard } from "@/components/ui/wobble-card";
import { motion } from "motion/react";
import Image from "next/image";

export function IlluminationStylesSection() {
  const description = (
    <>
      Whether you need a vibrant <strong className="text-gray-200">custom neon sign board</strong> for your storefront, an elegant <strong className="text-gray-200">backlit logo</strong> for corporate branding, or a glowing centerpiece for a <strong className="text-gray-200">wedding</strong>, how you illuminate your space matters. We engineer the best <strong className="text-gray-200">LED neon signs</strong> using premium architectural lighting. Explore our two primary illumination styles below to find the exact glow your space deserves.
    </>
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-[#09090b] text-white py-24 md:py-32 relative w-full overflow-hidden flex flex-col items-center justify-center border-y border-white/10" aria-labelledby="illumination-heading">
      
      {/* Premium Ambient Lighting */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[400px] bg-pink-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="shell max-w-6xl mx-auto flex flex-col items-start text-left relative z-10 px-4 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(244,11,104,0.15)] backdrop-blur-md">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Glow &amp; Illumination Styles</span>
          </div>
        </motion.div>
        
        <motion.h2 
          id="illumination-heading" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl"
        >
          How do you want your <br className="hidden lg:block"/> <PremiumAccentText>custom neon sign</PremiumAccentText> to glow?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-16"
        >
          {description}
        </motion.p>

        {/* Premium Image Wobble Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
          
          {/* FRONT-LIT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full h-full cursor-pointer group"
            onClick={() => scrollToSection("color-studio")}
          >
            <WobbleCard containerClassName="col-span-1 h-full bg-[#130b15] border border-pink-500/10 rounded-3xl overflow-hidden shadow-2xl group-hover:border-pink-500/40 transition-colors duration-500 p-0">
              <div className="flex flex-col h-full">
                {/* Image Section - Zoomed In & Uncovered */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/hero/neon-sign-hero.webp"
                    alt="Front Lit Custom Neon Sign"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Text Section - Below Image */}
                <div className="flex flex-col p-8 lg:p-10 text-left flex-grow justify-center bg-gradient-to-t from-[#130b15] to-transparent">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 bg-pink-500/20 w-fit rounded-lg border border-pink-500/30">
                      <Zap className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                      Classic Front-Lit
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    Bold and vibrant. The LEDs shine directly outward, maximizing visual pop. Perfect for high-energy retail spaces, <strong className="text-gray-200">outdoor</strong> storefronts, and vibrant statement pieces.
                  </p>
                  <div className="flex items-center gap-2 text-pink-400 font-bold uppercase tracking-wider text-xs group-hover:text-pink-300 transition-colors mt-auto">
                    Explore Front-Lit Studio <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </WobbleCard>
          </motion.div>

          {/* BACK-LIT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full h-full cursor-pointer group"
            onClick={() => scrollToSection("concept-to-glow")}
          >
            <WobbleCard containerClassName="col-span-1 h-full bg-[#0b0c15] border border-indigo-500/10 rounded-3xl overflow-hidden shadow-2xl group-hover:border-indigo-400/40 transition-colors duration-500 p-0">
              <div className="flex flex-col h-full">
                {/* Image Section - Zoomed In & Uncovered */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/before-after/after.webp"
                    alt="Reverse Halo Backlit Custom Neon Sign"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Text Section - Below Image */}
                <div className="flex flex-col p-8 lg:p-10 text-left flex-grow justify-center bg-gradient-to-t from-[#0b0c15] to-transparent">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 bg-indigo-500/20 w-fit rounded-lg border border-indigo-400/30">
                      <Moon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                      Reverse-Halo
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    Sophisticated and elegant. The LEDs face the wall, creating a premium floating 3D aesthetic. Ideal for <strong className="text-gray-200">custom logo signs</strong> and luxurious interiors.
                  </p>
                  <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider text-xs group-hover:text-indigo-300 transition-colors mt-auto">
                    Explore Halo Backlit <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </WobbleCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
