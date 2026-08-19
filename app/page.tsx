import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { CategoryRail } from "@/components/storefront/sections/category-rail";
import { ComparisonSection } from "@/components/storefront/sections/comparison-section";
import { ConceptToGlowSection } from "@/components/storefront/sections/concept-to-glow-section";
import { FaqSection } from "@/components/storefront/sections/faq-section";
import { GlowDirectionsSection } from "@/components/storefront/sections/glow-directions-section";
import { HeroSection } from "@/components/storefront/sections/hero-section";
import { InspirationSection } from "@/components/storefront/sections/inspiration-section";
import { NeonColorChangerSection } from "@/components/storefront/sections/neon-color-changer-section";
import { SignTypesVideoSection } from "@/components/storefront/sections/sign-types-video-section";
import { NewsletterSection } from "@/components/storefront/sections/newsletter-section";
import { OrderIncludesSection } from "@/components/storefront/sections/order-includes-section";
import { OrderTimeline } from "@/components/storefront/sections/order-timeline";
import { ReviewsSection } from "@/components/storefront/sections/reviews-section";
import { ScrollStackingCardsSection } from "@/components/storefront/sections/scroll-stacking-cards-section";
import { ShopSection } from "@/components/storefront/sections/shop-section";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { StorefrontShell } from "@/components/storefront/storefront-shell";

export default function Home() {
  return (
    <StorefrontShell>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <CategoryRail />
        <OrderIncludesSection />
        <OrderTimeline />
        <ConceptToGlowSection />
        <NeonColorChangerSection />
        <SignTypesVideoSection />
        <ScrollStackingCardsSection />
        <ComparisonSection />
        <ShopSection />
        <GlowDirectionsSection />
        <InspirationSection />
        <ReviewsSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </StorefrontShell>
  );
}
