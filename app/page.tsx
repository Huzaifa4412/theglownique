import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { BannerSliderSection } from "@/components/storefront/sections/banner-slider-section";
import { CategoryRail } from "@/components/storefront/sections/category-rail";
import { ComparisonSection } from "@/components/storefront/sections/comparison-section";
import { ConceptToGlowSection } from "@/components/storefront/sections/concept-to-glow-section";
import { FaqSection } from "@/components/storefront/sections/faq-section";
import { GlowDirectionsSection } from "@/components/storefront/sections/glow-directions-section";
import { LampCtaSection } from "@/components/storefront/sections/lamp-cta-section";
import { HeroSection } from "@/components/storefront/sections/hero-section";
import { IlluminationStylesSection } from "@/components/storefront/sections/illumination-styles-section";
import { InspirationSection } from "@/components/storefront/sections/inspiration-section";
import { NeonColorChangerSection } from "@/components/storefront/sections/neon-color-changer-section";
import { SignTypesVideoSection } from "@/components/storefront/sections/sign-types-video-section";
import { SignageGuideSection } from "@/components/storefront/sections/signage-guide-section";
import { NewsletterSection } from "@/components/storefront/sections/newsletter-section";
import { OrderIncludesSection } from "@/components/storefront/sections/order-includes-section";
import { OrderTimeline } from "@/components/storefront/sections/order-timeline";
import { ReviewsSection } from "@/components/storefront/sections/reviews-section";
import { ScrollStackingCardsSection } from "@/components/storefront/sections/scroll-stacking-cards-section";
import { ShopSection } from "@/components/storefront/sections/shop-section";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Custom LED Neon Signs & 3D Business Signage | The Glownique",
  description:
    "Custom LED neon signs, 3D channel letters & slim lightboxes made to order. Free design mockup in ~2 hrs, 5-yr warranty, safe 12V & tracked crated delivery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Custom LED Neon Signs & 3D Business Signage | The Glownique",
    description:
      "Handcrafted custom LED neon signs, 3D metal channel letters & slim lightboxes. Free 1-on-1 design preview in ~2 hrs, 5-year warranty & timber-crated delivery.",
    url: "/",
    siteName: "The Glownique",
    images: [
      {
        url: "/hero/neon-sign-hero.png",
        width: 1200,
        height: 630,
        alt: "The Glownique custom LED neon sign glowing on a dark wall",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.theglownique.com/#webpage",
  url: "https://www.theglownique.com",
  name: "Custom LED Neon Signs & 3D Business Signage | The Glownique",
  description:
    "Handcrafted custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and acrylic logo signs made to order with free 1-on-1 design mockups.",
  mainEntity: {
    "@type": "Service",
    name: "Custom Illuminated Signage Fabrication",
    provider: {
      "@type": "Organization",
      name: "The Glownique",
      url: "https://www.theglownique.com",
    },
    serviceType: "Custom Sign Manufacturing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom Illuminated Signs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Custom LED Neon Signs",
            description: "Handcrafted flexible 12V silicone LED neon signs on cast acrylic.",
            url: "https://www.theglownique.com/products/custom-neon-signs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "3D Metal Channel Letter Signs",
            description: "Precision-fabricated 304 stainless steel frontlit, halo backlit and dual-lit signs.",
            url: "https://www.theglownique.com/products/3d-metal-neon-signs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Ultra-Thin Slim Lightboxes",
            description: "Edge-lit slim aluminium lightboxes with tool-free graphic swap.",
            url: "https://www.theglownique.com/products/ultra-thin-lightbox",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "3D Acrylic UV Print Neon Signs",
            description: "High-definition UV printing on acrylic with glowing LED neon contours.",
            url: "https://www.theglownique.com/products/uv-print-acrylic-signs",
          },
        },
      ],
    },
  },
};

export default function Home() {
  return (
    <StorefrontShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content">
        <BannerSliderSection />
        <HeroSection />
        <CategoryRail />
        <IlluminationStylesSection />
        <NeonColorChangerSection />
        <ConceptToGlowSection />
        <SignTypesVideoSection />
        <SignageGuideSection />
        <GlowDirectionsSection />
        <ShopSection />
        <InspirationSection />
        <ReviewsSection />
        <OrderTimeline />
        <ScrollStackingCardsSection />
        <OrderIncludesSection />
        <ComparisonSection />
        <LampCtaSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </StorefrontShell>
  );
}
