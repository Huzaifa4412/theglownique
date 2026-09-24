import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { ProductDetail } from "@/components/product/product-detail";
import { PRODUCT_PAGES, getProductPage } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

// Only the four known product slugs are valid — anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_PAGES.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) return {};

  const url = `/products/${product.slug}`;
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "The Glownique",
      title: `${product.metaTitle} | The Glownique`,
      description: product.metaDescription,
      url,
      images: [{ url: product.heroImage, alt: `${product.name} — ${product.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.metaTitle} | The Glownique`,
      description: product.metaDescription,
      images: [product.heroImage],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) notFound();

  const pageUrl = `${SITE_URL}/products/${product.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: product.name,
        description: product.metaDescription,
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
            name: "Custom Signage",
            item: `${SITE_URL}/custom-signage`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      {/* content_ids is the route slug, so a Meta catalog feed added later can
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
