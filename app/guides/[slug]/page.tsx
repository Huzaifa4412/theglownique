import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideArticle } from "@/components/guides/guide-article";
import { GUIDES, getGuide } from "@/lib/guides";

/**
 * Data-driven guides (lib/guides). The three hand-built guides live in their
 * own folders beside this one; a static segment always wins over [slug], so
 * the two can coexist without either shadowing the other.
 */
type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `/guides/${guide.slug}`;
  const branded = `${guide.metaTitle} | The Glownique`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "The Glownique",
      title: branded,
      description: guide.metaDescription,
      url,
      publishedTime: guide.publishedOn,
      modifiedTime: guide.updatedOn,
      images: [{ url: guide.image.src, width: guide.image.width, height: guide.image.height, alt: guide.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description: guide.metaDescription,
      images: [guide.image.src],
    },
  };
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
