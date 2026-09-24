import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import type { ProductPage } from "@/lib/product-catalog";
import { productJsonLd } from "@/lib/product-seo";
import { serializeJsonLd } from "@/lib/utils";

/**
 * The full sign-type page. Rendered by app/products/[slug] for sign types that
 * live under /products, and by the /business-signs route files for the three
 * that live there — one template, so the two can never disagree in structure,
 * schema or tracking.
 */
export function ProductRoute({ product }: { product: ProductPage }) {
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
        <ProductDetail slug={product.slug} />
      </main>
      <SiteFooter />
    </>
  );
}
