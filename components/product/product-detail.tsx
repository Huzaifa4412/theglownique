"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

import { getProductPage, getRelatedProducts } from "@/lib/product-catalog";
import { whatsappQuoteUrl } from "@/lib/site";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { DELIVERY } from "@/lib/claims";

// Canvas-based and only rendered on the LED neon page, so it's split into its
// own chunk rather than shipped with all four product routes. No `ssr: false`
// — the headings and colour names still need to server-render for crawlers.
const NeonColorChangerSection = dynamic(() =>
  import("@/components/storefront/sections/neon-color-changer-section").then(
    (m) => m.NeonColorChangerSection,
  ),
);

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProductPage(slug);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const related = getRelatedProducts(slug);
  const quoteUrl = whatsappQuoteUrl(product.name);
  const accent = product.accent;
  const activeImage = product.gallery[activeImg] ?? product.gallery[0];

  return (
    <div style={{ "--accent": accent } as CSSProperties}>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#0b0910] text-white">
        <div
          className="pointer-events-none absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full blur-[150px] opacity-40"
          style={{ background: accent }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-[480px] w-[480px] rounded-full bg-[#6d26ff]/30 blur-[150px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-white/50" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">Products</span>
              <span aria-hidden="true">/</span>
              <span className="text-white">{product.name}</span>
            </nav>

            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md"
              style={{ borderColor: `${accent}66`, color: accent, backgroundColor: `${accent}1a` }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
              {product.category}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg font-semibold" style={{ color: accent }}>
              {product.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300">
              {product.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {product.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 backdrop-blur-md"
                >
                  <Check className="h-3 w-3" style={{ color: accent }} aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-meta-source="product-hero-cta"
                className="button button--whatsapp text-base py-3.5 px-6 font-bold flex items-center gap-2.5"
              >
                <span>Get a free quote &amp; mockup</span>
                <WhatsappIcon className="h-6 w-6 shrink-0" />
              </a>
              <Link
                href="/#stacking-craft"
                className="text-sm font-bold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                See how ordering works
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
              style={{ boxShadow: `0 30px 90px -20px ${accent}55` }}
            >
              {product.heroVideo ? (
                <video
                  src={product.heroVideo}
                  poster={product.heroImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={product.heroImage}
                  alt={`${product.name} — ${product.tagline}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── TRUST BAR ─────────────────────── */}
      <section className="border-b border-[#eadfe4] bg-white">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-xs font-semibold text-[#5e5862] sm:text-sm">
          {[DELIVERY.short, "5-year warranty", "Free design mockup", "Secure Etsy payment"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: accent }}>
                <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />
              </span>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─────────────────────── FEATURES ─────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              Why you&apos;ll love it
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              Built to impress, made to last
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-transform duration-300 hover:-translate-y-1">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: accent }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#1e1a22]">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5e5862]">{feature.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────── CRAFT / HOW IT'S MADE ─────────────────── */}
      <section className="border-t border-[#eadfe4] bg-[#fdf7f9] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              The craft
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              {product.craft.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5e5862]">{product.craft.body}</p>
            <ul className="mt-6 space-y-3">
              {product.craft.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium text-[#1e1a22]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: accent }}>
                    <Check className="h-3 w-3 text-white" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#eadfe4] shadow-xl">
              <Image
                src={product.craft.image}
                alt={product.craft.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── SPECS ─────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              The details
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              Specifications
            </h2>
          </Reveal>
          <Reveal>
            <dl className="overflow-hidden rounded-2xl border border-[#eadfe4]">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-4 ${
                    i % 2 === 0 ? "bg-[#fdf7f9]" : "bg-white"
                  }`}
                >
                  <dt className="text-sm font-bold text-[#1e1a22]">{spec.label}</dt>
                  <dd className="text-sm leading-6 text-[#5e5862]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── BACKBOARD CUTS ─────────────────
          Only the LED neon page defines `backings`; the other sign types have
          no backboard choice, so this drops out entirely for them. */}
      {product.backings && (
        <section className="border-t border-[#eadfe4] bg-[#fdf7f9] py-16 sm:py-20">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
                Choose your backboard
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
                {product.backings.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                {product.backings.body}
              </p>
            </Reveal>

            {/* One wide comparison shot with the three cuts labelled in-image.
                Below ~640px it would shrink past legibility, so it stays at a
                readable width there and the strip pans instead. */}
            <Reveal className="mb-8">
              <div className="overflow-x-auto rounded-3xl border border-[#eadfe4] bg-[#0b0910] shadow-xl">
                <Image
                  src={product.backings.image}
                  alt={product.backings.imageAlt}
                  width={1921}
                  height={819}
                  sizes="(max-width: 640px) 640px, (max-width: 1360px) 100vw, 1320px"
                  className="h-auto w-full min-w-[640px]"
                />
              </div>
            </Reveal>

            {/* Same left-to-right order as the photo above, so a reader can map
                each card onto the sign it describes. */}
            <div className="grid gap-5 md:grid-cols-3">
              {product.backings.items.map((backing, i) => (
                <Reveal key={backing.name} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-transform duration-300 hover:-translate-y-1">
                    <p
                      className="text-xs font-extrabold uppercase tracking-widest"
                      style={{ color: accent }}
                    >
                      {backing.summary}
                    </p>
                    <h3 className="mt-1.5 text-lg font-bold text-[#1e1a22]">{backing.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#5e5862]">{backing.text}</p>
                    <p className="mt-4 border-t border-[#eadfe4] pt-3 text-xs font-semibold text-[#1e1a22]">
                      Best for:{" "}
                      <span className="font-medium text-[#5e5862]">{backing.bestFor}</span>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────── LIGHTING DIRECTION ─────────────────
          Only the 3D metal page defines `lighting`; every other sign type is
          lit one way only, so this drops out entirely for them. It shares the
          backboard section's slot — neither product defines both. */}
      {product.lighting && (
        <section className="border-t border-[#eadfe4] bg-[#fdf7f9] py-16 sm:py-20">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
                Choose your glow
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
                {product.lighting.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                {product.lighting.body}
              </p>
            </Reveal>

            {/* A photo per card rather than one comparison strip: the whole
                difference here is the glow, which needs the full frame. Dark
                plate behind each shot so the lit faces read at full contrast. */}
            <div className="grid gap-5 md:grid-cols-3">
              {product.lighting.items.map((style, i) => (
                <Reveal key={style.name} delay={i * 0.08}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eadfe4] bg-white shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative aspect-square w-full overflow-hidden bg-[#0b0910]">
                      <Image
                        src={style.image}
                        alt={style.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p
                        className="text-xs font-extrabold uppercase tracking-widest"
                        style={{ color: accent }}
                      >
                        {style.summary}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold text-[#1e1a22]">{style.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-[#5e5862]">{style.text}</p>
                      <p className="mt-4 border-t border-[#eadfe4] pt-3 text-xs font-semibold text-[#1e1a22]">
                        Best for:{" "}
                        <span className="font-medium text-[#5e5862]">{style.bestFor}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────── OPTIONS ─────────────────────── */}
      <section className="border-t border-[#eadfe4] bg-[#0b0910] py-16 text-white sm:py-20">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-40"
            style={{ background: accent }}
            aria-hidden="true"
          />
          <Reveal className="relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              Make it yours
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.options.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300">
              {product.options.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {product.options.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 backdrop-blur-md transition-colors hover:border-white/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── COLOUR STUDIO ─────────────────
          Sits directly under OPTIONS so the colour list above it becomes
          something you can actually try. Brings its own <section> and dark
          background, which carries on from the OPTIONS band above. */}
      {product.colorStudio && <NeonColorChangerSection quoteHref={quoteUrl} />}

      {/* ─────────────────────── USE CASES ─────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              Where it shines
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              Perfect for
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.useCases.map((useCase, i) => (
              <Reveal key={useCase.title} delay={i * 0.08}>
                <div className="group h-full overflow-hidden rounded-2xl border border-[#eadfe4] bg-white shadow-[0_10px_30px_rgba(107,38,67,0.06)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                    <Image
                      src={useCase.image}
                      alt={useCase.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#1e1a22]">{useCase.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#5e5862]">{useCase.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── GALLERY ─────────────────────── */}
      <section className="border-t border-[#eadfe4] bg-[#fdf7f9] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              Gallery
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              See it in the wild
            </h2>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[#eadfe4] bg-black/5 shadow-xl">
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`Show ${item.alt}`}
                  aria-current={i === activeImg}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 bg-black/5 transition-all"
                  style={{ borderColor: i === activeImg ? accent : "transparent", opacity: i === activeImg ? 1 : 0.7 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="25vw"
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              Questions, answered
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              {product.name} FAQs
            </h2>
          </Reveal>
          <Reveal className="space-y-3">
            {product.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-[#eadfe4] bg-white shadow-[0_10px_30px_rgba(107,38,67,0.05)] transition-colors open:border-[#f8c6da]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-[#1e1a22] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                    style={{ color: accent }}
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm leading-6 text-[#5e5862]">{faq.a}</div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── CTA BAND ─────────────────────── */}
      <section className="relative overflow-hidden bg-[#0b0910] py-16 text-white sm:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
          style={{ background: `linear-gradient(90deg, ${accent}, #6d26ff)` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] opacity-30"
          style={{ background: accent }}
          aria-hidden="true"
        />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to design your {product.name.replace(/s$/, "").toLowerCase()}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300">
            Send your idea and we&apos;ll send back a free mockup — with tracked worldwide delivery, a
            5-year warranty and secure Etsy payment on every order.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-meta-source="product-closing-cta"
              className="button button--whatsapp text-base py-3.5 px-6 font-bold flex items-center gap-2.5"
            >
              <span>Get a free quote &amp; mockup</span>
              <WhatsappIcon className="h-6 w-6 shrink-0" />
            </a>
            <Link
              href="/#shop"
              className="text-sm font-bold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Browse the full collection
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ─────────────────────── RELATED ─────────────────────── */}
      <section className="border-t border-[#eadfe4] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accent }}>
              Explore more
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1e1a22] sm:text-4xl">
              Other sign types
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08}>
                <Link
                  href={`/products/${item.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-[#eadfe4] bg-white shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                    <Image
                      src={item.heroImage}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: item.accent }}>
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-[#1e1a22]">{item.name}</h3>
                    </div>
                    <ArrowRight
                      className="h-5 w-5 shrink-0 text-[#5e5862] transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
