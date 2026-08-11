import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { sameAsUrls } from "@/lib/site";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["italic"],
  display: "swap",
});

// NOTE: Update this to your live production domain so canonical, Open Graph
// and structured-data URLs resolve correctly.
const siteUrl = "https://www.theglownique.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "The Glownique | Custom LED Neon Signs, Lightboxes & Business Signage",
    template: "%s | The Glownique",
  },
  description:
    "Custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — free design preview, free worldwide delivery and a 5-year warranty.",
  keywords: [
    "custom neon signs",
    "LED neon signs",
    "personalised neon signs",
    "custom LED neon sign",
    "3D metal neon signs",
    "channel letter signs",
    "halo lit signs",
    "frontlit and backlit signs",
    "ultra thin lightbox",
    "edge-lit LED lightbox",
    "3D acrylic UV print signs",
    "custom logo signs",
    "business signage",
    "storefront signs",
    "wedding neon signs",
    "neon signs for bedroom",
  ],
  applicationName: "The Glownique",
  authors: [{ name: "The Glownique" }],
  creator: "The Glownique",
  publisher: "The Glownique",
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title:
      "The Glownique | Custom LED Neon Signs, Lightboxes & Business Signage",
    description:
      "Handcrafted custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — previewed free, delivered free worldwide and backed by a 5-year warranty.",
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/hero/neon-sign-hero.png",
        width: 1200,
        height: 630,
        alt: "The Glownique custom LED neon sign glowing on a dark wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Glownique | Custom LED Neon Signs & Signage",
    description:
      "Handcrafted custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — previewed free, delivered free worldwide with a 5-year warranty.",
    images: ["/hero/neon-sign-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console ownership proof. Renders as
  // <meta name="google-site-verification" content="..." />.
  // Keep this in place permanently — removing it un-verifies the property.
  verification: {
    google: "agcFNbBfl911-m91cjKDSMzPxdSbezd8SXKJ7naZZMA",
  },
};

// Honest, layout-invisible structured data for richer search results.
// Product ratings are intentionally omitted (no verified aggregate rating).
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "The Glownique",
      // Pairs the brand with its category. "Glownique" alone currently resolves
      // to an unrelated tanning salon in Google's entity graph.
      alternateName: "The Glownique Custom Neon Signs",
      url: siteUrl,
      // Profiles we own. Strongest available signal for entity disambiguation —
      // populate SOCIAL_LINKS and ETSY_SHOP_URL in lib/site.ts to fill this.
      ...(sameAsUrls().length > 0 ? { sameAs: sameAsUrls() } : {}),
      image: `${siteUrl}/hero/neon-sign-hero.png`,
      description:
        "The Glownique handcrafts custom LED neon signs, 3D metal channel-letter signs, ultra-thin edge-lit lightboxes and UV-print acrylic signs, made to order with a free design preview.",
      slogan: "Designed with feeling. Built to glow.",
      knowsAbout: [
        "Custom LED neon signs",
        "3D metal channel letter signs",
        "Ultra-thin LED lightboxes",
        "UV-print acrylic signs",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom sign types",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Custom LED Neon Sign",
              description:
                "Flexible LED silicone neon tubing on laser-cut acrylic, running on safe 12V low voltage for homes, weddings and businesses.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "3D Metal Neon Sign",
              description:
                "Fabricated stainless-steel channel letters with frontlit, halo backlit or dual-lit LED illumination for storefronts and offices.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Ultra Thin Slim Lightbox",
              description:
                "Slim anodized-aluminium lightbox with edge-lit LEDs for uniform, shadow-free illumination and tool-free graphic swaps.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "3D Acrylic UV Print Neon Sign",
              description:
                "Full-colour UV-printed artwork on premium acrylic paired with glowing LED neon contours for logos and brand art.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "The Glownique",
      description:
        "Custom LED neon signs, 3D metal signage, ultra-thin lightboxes and UV-print acrylic signs, handcrafted and made to order.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, manrope.variable, cormorant.variable, "font-sans", geist.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a79ea1e45989d1d4159ad3e/1jvm3l1rm';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
