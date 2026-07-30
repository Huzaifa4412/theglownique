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
