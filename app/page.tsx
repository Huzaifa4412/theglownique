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
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

const HOME_TITLE = "Custom LED Neon Signs & Business Signs | The Glownique";
const HOME_DESCRIPTION =
  "Custom LED neon signs, 3D metal channel letters, slim lightboxes and acrylic logo signs, made to order after a free design mockup.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description:
    "Custom LED neon signs, 3D channel letters & slim lightboxes made to order. Free design mockup in ~2 hrs, 5-yr warranty, safe 12V & tracked crated delivery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
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

// WebPage + the four sign types as an ItemList, built from the catalog so every
// URL is the sign type's one canonical path. This replaced a Service >
// OfferCatalog > Offer > Product nest whose Offers carried no price and whose
// URLs pointed at pages that now redirect: Product nodes with no offers,
// reviews or ratings are ineligible for product results anyway, and the
// homepage is not a product page. Organization and WebSite come from the root
// layout; this page refers to them by @id.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: HOME_TITLE,
  description: HOME_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    name: "Custom illuminated sign types by The Glownique",
    itemListElement: PRODUCT_PAGES.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}${product.path}`,
    })),
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
