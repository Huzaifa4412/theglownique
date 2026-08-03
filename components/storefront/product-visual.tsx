import Image from "next/image";
import type { CSSProperties } from "react";
import type { Product } from "@/lib/store-data";

export function ProductVisual({ product }: { product: Product }) {
  if (product.image) {
    return (
      <div
        className="product-visual relative overflow-hidden group w-full h-full flex items-center justify-center bg-zinc-950 rounded-2xl"
        style={
          {
            "--neon": product.color,
            "--wall": product.background,
          } as CSSProperties
        }
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Ambient neon glow behind the product */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: `radial-gradient(circle at center, ${product.color} 0%, transparent 70%)`,
          }}
        />

        {/* Sign Type Badge Overlay */}
        {product.signType && (
          <span className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300 uppercase tracking-wider">
            {product.signType}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="product-visual"
      style={
        {
          "--neon": product.color,
          "--wall": product.background,
        } as CSSProperties
      }
    >
      <span className="neon-wire" aria-hidden="true" />
      <span className="neon-copy">{product.name}</span>
    </div>
  );
}
