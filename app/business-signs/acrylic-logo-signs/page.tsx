import type { Metadata } from "next";

import { ProductRoute } from "@/components/product/product-route";
import { requireProductPage } from "@/lib/product-catalog";
import { productMetadata } from "@/lib/product-seo";

// The single page for acrylic logo signs. /products/uv-print-acrylic-signs,
// which used to target the same query with the same product, 301s here.
const product = requireProductPage("uv-print-acrylic-signs");

export const metadata: Metadata = productMetadata(product);

export default function AcrylicLogoSignsPage() {
  return <ProductRoute product={product} />;
}
