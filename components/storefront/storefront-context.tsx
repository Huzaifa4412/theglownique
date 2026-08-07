"use client";

import { createContext, useContext } from "react";

import type { CategoryId, Product } from "@/lib/store-data";

export type StorefrontContextValue = {
  activeCategory: "all" | CategoryId;
  search: string;
  reducedMotion: boolean;
  changeSearch: (value: string, fromHeader?: boolean) => void;
  chooseCategory: (
    category: "all" | CategoryId,
    shouldScroll?: boolean,
  ) => void;
  clearFilters: () => void;
  openProduct: (product: Product) => void;
  showToast: (message: string) => void;
};

export const StorefrontContext =
  createContext<StorefrontContextValue | null>(null);

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used within StorefrontShell");
  }

  return context;
}

/**
 * Same context, but null instead of a throw when there's no shell above.
 *
 * Only for components that are shared between the storefront and the product
 * detail routes — the latter render outside StorefrontShell, so anything that
 * reaches for the product dialog or the toast has to have a fallback. Keep
 * using useStorefront everywhere else: the throw is worth having.
 */
export function useOptionalStorefront() {
  return useContext(StorefrontContext);
}
