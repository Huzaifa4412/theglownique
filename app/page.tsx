import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { StudioHome } from "@/components/storefront/studio-home";
import { homeSignTypes } from "@/lib/home-content";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

const title = "Custom Neon Signs & Business Signage | The Glownique";
const description =
  "Custom LED neon signs, 3D metal letters, acrylic signs and slim lightboxes for your business, wedding or home. Start with a free design preview and quote.";
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
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
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
