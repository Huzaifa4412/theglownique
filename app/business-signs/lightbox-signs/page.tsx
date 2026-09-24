import type { Metadata } from "next";

import { ProductRoute } from "@/components/product/product-route";
import { requireProductPage } from "@/lib/product-catalog";
import { productMetadata } from "@/lib/product-seo";

// The single page for slim lightboxes. /products/ultra-thin-lightbox, which
// used to target the same query with the same product, 301s here.
const product = requireProductPage("ultra-thin-lightbox");

export const metadata: Metadata = productMetadata(product);

export default function LightboxSignsPage() {
  return <ProductRoute product={product} />;
}
