import type { Metadata } from "next";

import { LandingPageView } from "@/components/landing/landing-page";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { landingMetadata, requireLandingPage } from "@/lib/landing-pages";

// Copy, FAQs and schema inputs live in lib/industry-pages.ts. This file exists
// to own the route and nothing else.
const page = requireLandingPage(INDUSTRY_PAGES, "salon-spa-signs");

export const metadata: Metadata = landingMetadata(page);

export default function SalonSpaSignsPage() {
  return <LandingPageView page={page} />;
}
