import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { StudioHome } from "@/components/storefront/studio-home";
import { homeAnswer, homeSignTypes } from "@/lib/home-content";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

// Brand + illuminated-signage category (SEO-Optimization/05, HOME row): the
// homepage owns the entity; product and cluster pages own their head terms.
const title = "Custom Neon Signs & Illuminated Signage | The Glownique";
const description =
  "Custom LED neon signs, channel letters, lightboxes & acrylic logo signs, made to order for business, weddings & home. Free design mockup with every quote.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "The Glownique",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/studio-social.jpg",
        width: 1200,
        height: 630,
        alt: "Pink Good Vibes custom neon sign in a warm living room — The Glownique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/studio-social.jpg"],
  },
};
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: title,
  // The same one-line answer the page renders (AEO/GEO): the machine-readable
  // description and the visible copy can never drift apart.
  description: homeAnswer,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/brand/studio-social.jpg`,
    width: 1200,
    height: 630,
  },
  inLanguage: "en-US",
  mainEntity: {
    "@type": "ItemList",
    name: "Custom sign types",
    itemListElement: homeSignTypes.map((type, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: type.name,
      url: `${SITE_URL}${type.href}`,
    })),
  },
};
export default function Home() {
  return (
    <StorefrontShell enableMotion={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <StudioHome />
      <SiteFooter />
    </StorefrontShell>
  );
}
