"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useStorefrontMotion } from "@/components/storefront/hooks/use-storefront-motion";
import { ProductDialog } from "@/components/storefront/product-dialog";
import {
  StorefrontContext,
  type StorefrontContextValue,
} from "@/components/storefront/storefront-context";
import type { CategoryId, Product } from "@/lib/store-data";

export function StorefrontShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeCategory, setActiveCategory] = useState<
    "all" | CategoryId
  >("all");
  const [search, setSearch] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(""), 2600);
  }, []);

  const scrollToShop = useCallback(() => {
    requestAnimationFrame(() => {
      document.querySelector("#shop")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }, [reducedMotion]);

  const chooseCategory = useCallback(
    (category: "all" | CategoryId, shouldScroll = false) => {
      setActiveCategory(category);
      if (shouldScroll) scrollToShop();
    },
    [scrollToShop],
  );

  const changeSearch = useCallback(
    (value: string, fromHeader = false) => {
      setSearch(value);
      if (fromHeader && value.length > 1) scrollToShop();
    },
    [scrollToShop],
  );

  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveCategory("all");
  }, []);

  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      document.body.classList.remove("dialog-open");
    },
    [],
  );

  useStorefrontMotion(rootRef, reducedMotion);

  const contextValue = useMemo<StorefrontContextValue>(
    () => ({
      activeCategory,
      search,
      reducedMotion,
      changeSearch,
      chooseCategory,
      clearFilters,
      openProduct,
      showToast,
    }),
    [
      activeCategory,
      changeSearch,
      chooseCategory,
      clearFilters,
      openProduct,
      reducedMotion,
      search,
      showToast,
    ],
  );

  return (
    <StorefrontContext.Provider value={contextValue}>
      <div ref={rootRef}>
        {children}
        <ProductDialog
          product={selectedProduct}
          onClose={closeProduct}
          showToast={showToast}
        />
        <div
          className={`toast${toast ? " is-visible" : ""}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </div>
    </StorefrontContext.Provider>
  );
}
