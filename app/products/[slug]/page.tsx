import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductRoute } from "@/components/product/product-route";
import { PRODUCT_PAGES, getProductPage } from "@/lib/product-catalog";
import { productMetadata } from "@/lib/product-seo";

type Params = { params: Promise<{ slug: string }> };

/**
 * Sign types whose one public URL is /products/<slug>. The other three live
 * under /business-signs; their old /products addresses are 301s in
 * next.config.ts, which run before routing, and anything else 404s.
 */
const PRODUCTS_HERE = PRODUCT_PAGES.filter((product) => product.path === `/products/${product.slug}`);

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS_HERE.map((product) => ({ slug: product.slug }));
}

function productAt(slug: string) {
  const product = getProductPage(slug);
  return product && PRODUCTS_HERE.includes(product) ? product : undefined;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = productAt(slug);
  return product ? productMetadata(product) : {};
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = productAt(slug);
  if (!product) notFound();

  return <ProductRoute product={product} />;
}
