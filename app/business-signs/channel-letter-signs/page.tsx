import type { Metadata } from "next";

import { ProductRoute } from "@/components/product/product-route";
import { requireProductPage } from "@/lib/product-catalog";
import { productMetadata } from "@/lib/product-seo";

// The single page for channel letters. /products/3d-metal-neon-signs, which
// used to target the same query with the same product, 301s here.
const product = requireProductPage("3d-metal-neon-signs");

export const metadata: Metadata = productMetadata(product);

export default function ChannelLetterSignsPage() {
  return <ProductRoute product={product} />;
}
