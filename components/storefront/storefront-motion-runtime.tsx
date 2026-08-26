"use client";

import type { RefObject } from "react";

import { useStorefrontMotion } from "@/components/storefront/hooks/use-storefront-motion";

export function StorefrontMotionRuntime({
  rootRef,
  reducedMotion,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}) {
  useStorefrontMotion(rootRef, reducedMotion);
  return null;
}
