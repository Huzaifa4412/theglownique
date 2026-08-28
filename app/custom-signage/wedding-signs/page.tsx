import type { Metadata } from "next";

import { LandingPageView } from "@/components/landing/landing-page";
import { COLLECTION_PAGES } from "@/lib/collection-pages";
import { landingMetadata, requireLandingPage } from "@/lib/landing-pages";

// Copy, FAQs and schema inputs live in lib/collection-pages.ts. This file exists
// to own the route and nothing else.
const page = requireLandingPage(COLLECTION_PAGES, "wedding-signs");

export const metadata: Metadata = landingMetadata(page);

export default function WeddingSignsPage() {
  return <LandingPageView page={page} />;
}
