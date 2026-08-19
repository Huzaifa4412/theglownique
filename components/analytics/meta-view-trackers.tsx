"use client";

import { useEffect, useRef } from "react";

import {
  trackGuideView,
  trackViewCategory,
  trackViewContent,
} from "@/lib/meta-pixel";

/**
 * Fire-once-on-mount view trackers.
 *
 * These exist so a server-rendered page can report a view without becoming a
 * client component itself: drop <MetaViewContent /> into the JSX and the page
 * stays a Server Component while one null-rendering leaf handles the pixel call.
 *
 * The ref guard matters — React Strict Mode runs mount effects twice in
 * development, and without it every product page would report two ViewContents
 * locally and send you chasing a bug that doesn't exist in production.
 */

type MetaViewContentProps = {
  /** Stable id for the page. Use the route slug so a future catalog feed matches. */
  contentId: string;
  contentName: string;
  contentCategory?: string;
};

/** A sign-type product page was viewed. Renders nothing. */
export function MetaViewContent({
  contentId,
  contentName,
  contentCategory,
}: MetaViewContentProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewContent({
      id: contentId,
      name: contentName,
      category: contentCategory,
    });
  }, [contentId, contentName, contentCategory]);

  return null;
}

/** A long-form guide was read. Renders nothing. */
export function MetaGuideView({ guideName }: { guideName: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackGuideView(guideName);
  }, [guideName]);

  return null;
}

/**
 * A category or hub page was viewed — /products, /business-signs.
 *
 * ViewCategory rather than ViewContent, because a hub lists several sign types
 * and isn't itself a product. Mixing hubs into ViewContent would make the
 * product-viewer audience mean "looked at anything", which is the audience you
 * least want blurred.
 */
export function MetaViewCategory({ category }: { category: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewCategory(category);
  }, [category]);

  return null;
}
