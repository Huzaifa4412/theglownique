import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { BannerSliderSection } from "@/components/storefront/sections/banner-slider-section";
import { ComparisonSection } from "@/components/storefront/sections/comparison-section";
import { FaqSection } from "@/components/storefront/sections/faq-section";
import { HeroSection } from "@/components/storefront/sections/hero-section";
import { NeonUseCasesSection } from "@/components/storefront/sections/neon-use-cases-section";
import { NeonColorChangerSection } from "@/components/storefront/sections/neon-color-changer-section";
import { SignageGuideSection } from "@/components/storefront/sections/signage-guide-section";
import { SignTypesZigzagSection } from "@/components/storefront/sections/sign-types-zigzag-section";
import { NewsletterSection } from "@/components/storefront/sections/newsletter-section";
import { OrderIncludesSection } from "@/components/storefront/sections/order-includes-section";
import { OrderTimeline } from "@/components/storefront/sections/order-timeline";
import { ReviewsSection } from "@/components/storefront/sections/reviews-section";
import { ShopSection } from "@/components/storefront/sections/shop-section";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

const HOME_TITLE = "Neon Signs & Business Signs, Made to Order | The Glownique";
const HOME_DESCRIPTION =
  "Neon signs handmade to order for homes, weddings and businesses, plus 3D channel letters, slim lightboxes and acrylic logo signs. Free design mockup first.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: "The Glownique",
    images: [
      {
        url: "/hero/neon-sign-hero.png",
        width: 1200,
        height: 630,
        alt: "LED neon sign glowing on a dark wall, handmade to order by The Glownique",
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
        {/* Neon: the head term this page is mapped to ("neon signs"). */}
        <HeroSection />
        <NeonUseCasesSection />
        {/* The other three sign types, each routed to its one canonical page. */}
        <SignTypesZigzagSection />
        {/* Side-by-side comparison of all four types, plus the buying guides. */}
        <SignageGuideSection />
        <ShopSection />
        {/* The interactive designer: the strongest dwell-time asset on the page. */}
        <NeonColorChangerSection />
        <ReviewsSection />
        <OrderTimeline />
        <OrderIncludesSection />
        <ComparisonSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </StorefrontShell>
  );
}


