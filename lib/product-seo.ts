import type { Metadata } from "next";

import type { ProductPage } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";

/**
 * Metadata and structured data for a sign-type page, wherever it lives.
 *
 * Sign types render at /products/<slug> or at a /business-signs/<term> URL
 * (see `ProductPage.path`). Both routes build their head and JSON-LD here, so
 * the canonical, the og:url and the breadcrumb trail are always the product's
 * own path and cannot drift between the two route files.
 */
export function productMetadata(product: ProductPage): Metadata {
  const branded = `${product.metaTitle} | The Glownique`;
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: product.path },
    openGraph: {
      type: "website",
      siteName: "The Glownique",
      title: branded,
      description: product.metaDescription,
      url: product.path,
      images: [{ url: product.heroImage, alt: `${product.name} — ${product.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description: product.metaDescription,
      images: [product.heroImage],
    },
  };
}

/**
 * Product + BreadcrumbList + FAQPage.
 *
 * No `offers`, `aggregateRating` or `review`: there is no owner-approved price
 * basis (CLM-019), checkout happens on Etsy (so merchant listings are out of
 * reach), and the only reviews are Etsy's, which Google does not allow a site
 * to mark up as its own. Without one of those three properties the Product is
 * simply ineligible for product rich results — accurate markup that Google can
 * still read as an entity, rather than invented numbers it could act on.
 * scripts/seo-audit.mjs fails the build if a price or rating appears.
 */
export function productJsonLd(product: ProductPage) {
  const pageUrl = `${SITE_URL}${product.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: product.name,
        description: product.intro,
        image: `${SITE_URL}${product.heroImage}`,
        category: product.category,
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: product.parent.label,
            item: `${SITE_URL}${product.parent.href}`,
          },
          { "@type": "ListItem", position: 3, name: product.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}
