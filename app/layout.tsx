import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Manrope, Geist } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { MetaPixelEvents } from "@/components/analytics/meta-pixel-events";
import { PreChatGate } from "@/components/chat/pre-chat-gate";
import { cn, serializeJsonLd } from "@/lib/utils";
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
    default: "Custom LED Neon Signs & Business Signage | The Glownique",
    template: "%s | The Glownique",
  },
  description:
    "Custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — free design preview, tracked worldwide delivery and a 5-year warranty.",
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
    title: "Custom LED Neon Signs & Business Signage | The Glownique",
    description:
      "Handcrafted custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — previewed free, delivered worldwide with tracking and backed by a 5-year warranty.",
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
    title: "Custom LED Neon Signs & Business Signage | The Glownique",
    description:
      "Handcrafted custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — previewed free, delivered worldwide with tracking and a 5-year warranty.",
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

// Honest, layout-invisible structured data for global entity organization.
// Commercial Offer/Product nodes are scoped to dedicated product/catalog routes.
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
      // The brand mark itself, squared onto its plum backing. Google reads
      // Organization.logo for knowledge-panel and rich-result surfaces and
      // wants a crawlable raster, so it points at the generated PNG rather
      // than public/logo.svg (a 950KB SVG wrapping a masked bitmap).
      // Regenerate both with `npm run brand:icons`.
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo-512.png`,
        width: 512,
        height: 512,
      },
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
        {children}
        <Analytics />
        {/* Base pixel + the event layer that fires PageView per route and picks
            up WhatsApp/Etsy outbound clicks. See lib/meta-pixel.ts for the full
            event map and for what is deliberately not tracked. */}
        <MetaPixel />
        <MetaPixelEvents />
        {/* Collects name/email/phone before the chat can start, then hands them
            to Tawk so an abandoned conversation is still followable. */}
        <PreChatGate />
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

            // Keep Tawk's own bubble hidden until our pre-chat form has been
            // completed (components/chat/pre-chat-gate.tsx). Set BEFORE the embed
            // script loads, because onLoad fires as soon as the widget is ready
            // and a React effect cannot reliably beat it.
            //
            // A returning visitor already has details stored, so the widget is
            // revealed immediately rather than gating them a second time. Reading
            // localStorage here rather than in the component avoids a flash of
            // the bubble followed by it disappearing.
            Tawk_API.onLoad = function(){
              var known = false;
              try { known = !!localStorage.getItem('glownique:chat-visitor'); } catch (e) {}
              if (!known && typeof Tawk_API.hideWidget === 'function') Tawk_API.hideWidget();
            };

            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a79ea1e45989d1d4159ad3e/1jvm3l1rm';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();

            // Tawk injects its widget as <iframe> elements with no title, which
            // a screen reader announces as an unlabelled frame and which fails
            // the WCAG 2.2 "Frame Titled" check. We can't change what the vendor
            // renders, so label the frames as they appear. The observer stays
            // alive because Tawk tears its frames down and rebuilds them when
            // the widget is opened, minimised or reloaded.
            (function(){
              function labelFrames(){
                var frames = document.querySelectorAll('iframe:not([title])');
                for (var i = 0; i < frames.length; i++) {
                  frames[i].setAttribute('title', 'Live chat support');
                }
              }
              labelFrames();
              if (typeof MutationObserver === 'function') {
                new MutationObserver(labelFrames).observe(document.body, {
                  childList: true,
                  subtree: true,
                });
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
