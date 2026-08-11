"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Star } from "@phosphor-icons/react";
import type { Product } from "@/lib/store-data";

export function ProductVisual({ product }: { product: Product }) {
  const neonColor = product.color || "#f40b68";

  if (product.image) {
    return (
      <div
        className="product-visual relative overflow-hidden group w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 rounded-l-2xl select-none"
        style={
          {
            "--neon": neonColor,
            "--wall": product.background || "linear-gradient(145deg, #18121d, #0d0812)",
          } as CSSProperties
        }
      >
        {/* Dark Studio Wall Pattern Background */}
        <div
          className="absolute inset-0 bg-[#120d18] pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(135deg, #1d1424 0%, #0d0812 100%)
            `,
            backgroundSize: "32px 32px, 100% 100%",
          }}
        />

        {/* Ambient Neon Spotlight Glow */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none transition-all duration-700 ease-out group-hover:opacity-70 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle at 50% 48%, ${neonColor} 0%, rgba(244, 11, 104, 0.15) 45%, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
            {product.signType || "Custom Sign"}
          </span>
        </div>

        {/* Real Product Image Container - 100% Visible & Centered */}
        <div className="relative w-full h-full max-h-[85%] flex items-center justify-center z-10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            unoptimized
            className="object-contain w-full h-full p-2 transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Bottom Specs Pill */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 text-[11px] font-bold text-amber-300 shadow-xl">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>5.0 Craftsmanship</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-visual relative overflow-hidden flex items-center justify-center p-8 bg-[#120d18] text-white"
      style={
        {
          "--neon": neonColor,
          "--wall": product.background,
        } as CSSProperties
      }
    >
      <span className="neon-wire" aria-hidden="true" />
      <span className="neon-copy text-2xl font-bold">{product.name}</span>
    </div>
  );
}
