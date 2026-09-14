import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionPageView } from "@/components/landing/collection-page";
import { COLLECTION_PAGES, getCollectionPage } from "@/lib/collection-pages";
import { landingMetadata } from "@/lib/landing-pages";

import "../collection.css";

type Params = { params: Promise<{ slug: string }> };

// One route for every consumer collection. The slugs are the catalog in
// lib/collection-pages.ts and nothing else: an unknown slug is a 404 at build
// time rather than a page that quietly renders empty.
export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getCollectionPage(slug);
  return page ? landingMetadata(page) : {};
}

export default async function CollectionRoute({ params }: Params) {
  const { slug } = await params;
  const page = getCollectionPage(slug);
  if (!page) notFound();

  return <CollectionPageView page={page} siblings={COLLECTION_PAGES} />;
}
