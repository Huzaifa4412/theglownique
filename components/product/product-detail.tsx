import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

import { DetailCtaPair } from "@/components/detail/detail-cta-pair";
import { DetailGallery, type DetailImage } from "@/components/detail/detail-gallery";
import { DetailStickyCta } from "@/components/detail/detail-sticky-cta";
import { DetailVideo } from "@/components/detail/detail-video";
import { DELIVERY, WARRANTY } from "@/lib/claims";
import { getRelatedProducts, type ProductPage } from "@/lib/product-catalog";
import { ETSY_SHOP_URL, whatsappQuoteUrl } from "@/lib/site";

import "@/components/detail/detail.css";

// Canvas-based and only rendered on the LED neon page, so it's split into its
// own chunk rather than shipped with all four product routes. No `ssr: false`
// — the headings and colour names still need to server-render for crawlers.
const NeonColorChangerSection = dynamic(() =>
  import("@/components/storefront/sections/neon-color-changer-section").then(
    (m) => m.NeonColorChangerSection,
  ),
);

/** A buying guide, resolved on the server (lib/guides stays out of this bundle). */
export type ProductReading = { href: string; title: string; summary: string };

const article = (noun: string) => (/^[aeiou]/i.test(noun) ? "an" : "a");

/** Hero first, then the rest of the gallery, without repeating a picture. */
function heroImages(product: ProductPage): DetailImage[] {
  const seen = new Set<string>();
  return [{ src: product.heroImage, alt: `${product.name}: ${product.tagline}` }, ...product.gallery]
    .filter((item) => (seen.has(item.src) ? false : (seen.add(item.src), true)))
    .slice(0, 5)
    .map((item, index) => ({ ...item, label: `picture ${index + 1}` }));
}

/**
 * The sign-type detail page: LED neon, channel letters, lightboxes and acrylic
 * logo signs all render through this one template, from lib/product-catalog.ts.
 *
 * A Server Component. It used to be a client component that faded every
 * section in on scroll, which left the page blank to anything that does not
 * scroll (a crawler, a link preview, a full-page capture) and shipped the whole
 * catalog entry to the browser. The only interactive parts now are the
 * gallery, the sticky bar, the clips and the neon colour studio.
 *
 * Both ways to buy — WhatsApp and Etsy — sit directly under the hero picture,
 * under every use-case picture and at the close, and stay one tap away on a
 * phone through the sticky bar.
 */
export function ProductDetail({ product, reading = [] }: { product: ProductPage; reading?: ProductReading[] }) {
  const related = getRelatedProducts(product.slug);
  const etsyUrl = product.etsyUrl ?? ETSY_SHOP_URL;
  const quoteUrl = whatsappQuoteUrl(product.singular);
  // Tracking prefix: the internal slug, which is also the Meta content id.
  const source = product.slug;

  return (
    <div className="detail-page" style={{ "--dt-accent": product.accent } as CSSProperties}>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="detail-hero">
        <div className="relative z-10 mx-auto grid max-w-[1320px] gap-6 px-4 pb-12 pt-6 sm:gap-8 sm:px-6 sm:pt-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
          <div>
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              {/* Same trail as the BreadcrumbList in lib/product-seo.ts. */}
              <Link href={product.parent.href} className="text-white/80 transition-colors hover:text-white">
                {product.parent.label}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white" aria-current="page">
                {product.name}
              </span>
            </nav>

            <p className="detail-eyebrow detail-eyebrow--light">{product.category}</p>
            <h1 className="mt-2 text-[2.25rem] font-extrabold leading-[1.04] tracking-tight sm:mt-3 sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">{product.tagline}</p>

            <ul className="mt-6 hidden max-w-xl gap-x-6 gap-y-2.5 text-sm font-semibold text-white/90 sm:grid sm:grid-cols-2">
              {product.chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-(--dt-accent)" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <DetailGallery
              images={heroImages(product)}
              sizes="(max-width: 1024px) 100vw, 660px"
              label={`${product.name} pictures`}
              preload
            >
              <div>
                <DetailCtaPair subject={product.singular} etsyUrl={etsyUrl} source={`${source}-hero`} />
                <p className="mt-2.5 text-center text-xs leading-relaxed text-white/70">
                  Free mockup first. You pay nothing until you approve the design.
                </p>
              </div>
            </DetailGallery>
          </div>
        </div>
      </section>

      {/* ─────────────────────── TRUST STRIP ─────────────────────── */}
      <section className="border-b border-(--dt-line) bg-white" aria-label="What every order includes">
        <ul className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-3 px-4 py-5 text-sm font-semibold text-(--dt-muted) sm:px-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-10">
          {["Free mockup within 24 hours", WARRANTY.term, DELIVERY.short, "Secure Etsy checkout"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--dt-accent-ink)">
                <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />
              </span>
              <span className="first-letter:uppercase">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─────────────────────── DIRECT ANSWER ───────────────────────
          The catalog intro is written definition-first, so it answers the
          question in the heading in its first sentence. */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            What is {article(product.singular)} {product.singular}?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-(--dt-ink)">{product.intro}</p>
        </div>
      </section>

      {/* ─────────────────────── FEATURES ─────────────────────── */}
      <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="detail-eyebrow">Why choose it</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Built to impress, made to last</h2>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="border-t-2 border-(--dt-ink) pt-5">
                  <Icon className="h-6 w-6 text-(--dt-accent-ink)" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-extrabold tracking-tight">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--dt-muted)">{feature.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─────────────────── CRAFT / HOW IT'S MADE ─────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] bg-(--dt-night)">
            <Image
              src={product.craft.image}
              alt={product.craft.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div>
            <p className="detail-eyebrow">The craft</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{product.craft.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">{product.craft.body}</p>
            <ul className="mt-6 grid gap-3">
              {product.craft.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium text-(--dt-ink)">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--dt-accent-ink)">
                    <Check className="h-3 w-3 text-white" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────── SPECS ─────────────────────── */}
      <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="detail-specs">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="detail-eyebrow">The details</p>
          <h2 id="detail-specs" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {product.name}: specifications
          </h2>
          <dl className="mt-8 overflow-hidden rounded-2xl border border-(--dt-line) bg-white">
            {product.specs.map((spec, index) => (
              <div
                key={spec.label}
                className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-(--dt-blush)"
                }`}
              >
                <dt className="text-sm font-bold text-(--dt-ink)">{spec.label}</dt>
                <dd className="text-sm leading-relaxed text-(--dt-muted)">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────── BACKBOARD CUTS ─────────────────
          Only the LED neon page defines `backings`; the other sign types have
          no backboard choice, so this drops out entirely for them. */}
      {product.backings && (
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Choose your backboard</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{product.backings.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">{product.backings.body}</p>
            </div>

            {/* One wide comparison shot with the three cuts labelled in-image.
                Below ~640px it would shrink past legibility, so it stays at a
                readable width there and the strip pans instead. */}
            <div className="mt-8 overflow-x-auto rounded-[20px] border border-(--dt-line) bg-(--dt-night)">
              <Image
                src={product.backings.image}
                alt={product.backings.imageAlt}
                width={1921}
                height={819}
                sizes="(max-width: 640px) 640px, (max-width: 1360px) 100vw, 1320px"
                className="h-auto w-full min-w-[640px]"
              />
            </div>

            {/* Same left-to-right order as the photo above, so a reader can map
                each column onto the sign it describes. */}
            <ul className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-3">
              {product.backings.items.map((backing) => (
                <li key={backing.name} className="border-t-2 border-(--dt-ink) pt-5">
                  <p className="detail-eyebrow">{backing.summary}</p>
                  <h3 className="mt-1.5 text-lg font-extrabold tracking-tight">{backing.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--dt-muted)">{backing.text}</p>
                  <p className="mt-3 text-sm font-semibold text-(--dt-ink)">
                    Best for: <span className="font-normal text-(--dt-muted)">{backing.bestFor}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────────────── LIGHTING DIRECTION ─────────────────
          Only the 3D metal page defines `lighting`; every other sign type is
          lit one way only, so this drops out entirely for them. */}
      {product.lighting && (
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Choose your glow</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{product.lighting.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">{product.lighting.body}</p>
            </div>

            {/* A photo per style rather than one comparison strip: the whole
                difference here is the glow, which needs the full frame. */}
            <ul className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
              {product.lighting.items.map((style) => (
                <li key={style.name}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-(--dt-night)">
                    <Image
                      src={style.image}
                      alt={style.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <p className="detail-eyebrow mt-5">{style.summary}</p>
                  <h3 className="mt-1.5 text-lg font-extrabold tracking-tight">{style.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--dt-muted)">{style.text}</p>
                  <p className="mt-3 text-sm font-semibold text-(--dt-ink)">
                    Best for: <span className="font-normal text-(--dt-muted)">{style.bestFor}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─────────────────────── OPTIONS ─────────────────────── */}
      <section className="bg-(--dt-night) py-14 text-white sm:py-20">
        <div
          className={`mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-6 ${
            product.heroVideo ? "lg:grid-cols-2 lg:items-center lg:gap-14" : ""
          }`}
        >
          <div className="max-w-2xl">
            <p className="detail-eyebrow detail-eyebrow--light">Make it yours</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{product.options.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">{product.options.body}</p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {product.options.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {product.heroVideo ? (
            <figure className="min-w-0">
              <DetailVideo
                src={product.heroVideo}
                poster={product.heroImage}
                label={`Video of ${article(product.singular)} ${product.singular}, filmed up close`}
              />
              <figcaption className="mt-3 text-sm text-white/65">Filmed up close, so you can see the build.</figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      {/* ───────────────── COLOUR STUDIO ─────────────────
          Sits directly under OPTIONS so the colour list above it becomes
          something you can actually try. Brings its own <section> and dark
          background, which carries on from the OPTIONS band above. */}
      {product.colorStudio && <NeonColorChangerSection quoteHref={quoteUrl} />}

      {/* ─────────────────────── USE CASES ─────────────────────── */}
      <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="detail-uses">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="detail-eyebrow">Where it goes</p>
            <h2 id="detail-uses" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.galleryHeading ?? `Where ${article(product.singular)} ${product.singular} works best`}
            </h2>
            {product.galleryNote ? (
              <p className="mt-4 text-sm leading-relaxed text-(--dt-muted)">{product.galleryNote}</p>
            ) : null}
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {product.useCases.map((useCase) => (
              <article key={useCase.title} className="grid gap-4">
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] bg-(--dt-night)">
                  <Image
                    src={useCase.image}
                    alt={useCase.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                {/* Both ways to buy, directly under the picture. */}
                <DetailCtaPair
                  subject={`${product.singular} for ${useCase.title.toLowerCase()}`}
                  etsyUrl={etsyUrl}
                  source={`${source}-use-${useCase.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                />
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{useCase.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-(--dt-muted)">{useCase.text}</p>
                  {/* The industry and occasion pages were reachable almost only
                      from their hub; these are the product pages' contextual
                      links into them. */}
                  {useCase.href ? (
                    <p className="mt-3 text-sm">
                      <Link href={useCase.href} className="detail-link inline-flex items-center gap-1">
                        {useCase.linkLabel ?? `${useCase.title} signs`}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── BEFORE YOU ORDER ───────────────────
          The guides answer the questions a buyer has before the FAQ's ordering
          questions: which lighting, what size, indoor or outdoor. */}
      {reading.length > 0 ? (
        <section className="bg-white py-14 sm:py-20" aria-labelledby="before-you-order">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <p className="detail-eyebrow">Before you order</p>
            <h2 id="before-you-order" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Guides for choosing your {product.singular}
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {reading.map((guide) => (
                <li key={guide.href} className="border-t border-(--dt-line) pt-4">
                  <Link href={guide.href} className="detail-link text-base">
                    {guide.title}
                  </Link>
                  <p className="mt-1.5 text-sm leading-relaxed text-(--dt-muted)">{guide.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section className="border-t border-(--dt-line) bg-white py-14 sm:py-20" aria-labelledby="detail-faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="detail-eyebrow">Questions</p>
          <h2 id="detail-faq" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {product.name} FAQs
          </h2>
          <div className="mt-8 grid gap-3">
            {product.faqs.map((faq, index) => (
              <details
                key={faq.q}
                // The first answer starts open, so a skimming visitor has
                // something to read without tapping.
                open={index === 0}
                className="group rounded-2xl border border-(--dt-line) bg-white open:border-(--dt-accent-ink)"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-bold text-(--dt-ink)">{faq.q}</h3>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-(--dt-accent-ink) transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-(--dt-muted)">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <section className="detail-hero py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to design your {product.singular}?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Send your idea and the free mockup comes back within 24 hours. If you like it, you get a quote for that exact
            sign, with {DELIVERY.clause} and a {WARRANTY.term}.
          </p>
          <DetailCtaPair
            subject={product.singular}
            etsyUrl={etsyUrl}
            source={`${source}-closing`}
            className="mx-auto mt-8 max-w-md"
          />
        </div>
      </section>

      {/* ─────────────────────── RELATED ─────────────────────── */}
      <section className="border-t border-(--dt-line) bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Other sign types</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={item.path} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-(--dt-night)">
                    <Image
                      src={item.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 flex items-center justify-between gap-3 text-base font-bold text-(--dt-ink) group-hover:underline">
                    {item.name}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DetailStickyCta whatsappUrl={quoteUrl} etsyUrl={etsyUrl} source={source} />
    </div>
  );
}
