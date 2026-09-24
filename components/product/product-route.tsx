import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { requireGuideSummary } from "@/lib/guides";
import type { ProductPage } from "@/lib/product-catalog";
import { productJsonLd } from "@/lib/product-seo";
import { serializeJsonLd } from "@/lib/utils";

/**
 * The full sign-type page. Rendered by app/products/[slug] for sign types that
 * live under /products, and by the /business-signs route files for the three
 * that live there — one template, so the two can never disagree in structure,
 * schema or tracking.
 */
/**
 * The guides each sign type's buyers most need, in reading order. Resolved
 * here, on the server, so the guide content never ships in the client bundle;
 * an unknown slug throws at build time rather than rendering a dead link.
 */
const READING_LIST: Record<string, readonly string[]> = {
  "custom-neon-signs": [
    "led-neon-vs-glass-neon",
    "sign-size-viewing-distance",
    "indoor-vs-outdoor-illuminated-signs",
    "how-led-neon-signs-are-made",
  ],
  "3d-metal-neon-signs": [
    "front-lit-vs-halo-lit-vs-dual-lit",
    "sign-size-viewing-distance",
    "lightbox-vs-channel-letters",
    "backlit-sign-wall-surfaces-and-standoffs",
    "custom-business-sign-cost",
  ],
  "ultra-thin-lightbox": [
    "lightbox-vs-channel-letters",
    "indoor-vs-outdoor-illuminated-signs",
    "custom-business-sign-cost",
  ],
  "uv-print-acrylic-signs": [
    "sign-size-viewing-distance",
    "indoor-vs-outdoor-illuminated-signs",
    "custom-business-sign-cost",
  ],
};

export function ProductRoute({ product }: { product: ProductPage }) {
  const reading = (READING_LIST[product.slug] ?? []).map((slug) => {
    const guide = requireGuideSummary(slug);
    return { href: guide.href, title: guide.title, summary: guide.summary };
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd(product)) }}
      />
      {/* content_ids is the internal slug, so a Meta catalog feed added later can
          use the same id and inherit these retargeting audiences. */}
      <MetaViewContent
        contentId={product.slug}
        contentName={product.name}
        contentCategory={product.category}
      />
      <AnnouncementBar />
      <ProductTopBar productName={product.name} />
      <main id="main-content">
        <ProductDetail slug={product.slug} reading={reading} />
      </main>
      <SiteFooter />
    </>
  );
}
