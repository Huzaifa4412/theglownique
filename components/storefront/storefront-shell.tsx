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
import {
  trackConfiguratorOpen,
  trackSearch,
  trackViewCategory,
} from "@/lib/meta-pixel";
import { categoryLabels, type CategoryId, type Product } from "@/lib/store-data";

/**
 * How long the search box has to be idle before the query is reported.
 *
 * Search fires on a debounce because the input tracks every keystroke — without
 * this, "wedding" would send seven Search events, six of them for prefixes
 * nobody searched for.
 */
const SEARCH_TRACK_DELAY_MS = 900;

/** Below this, a query is a typo or a single letter rather than an intent. */
const MIN_TRACKED_QUERY_LENGTH = 3;

export function StorefrontShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTrackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      // "all" is the default and the reset — it says nothing about what the
      // visitor is shopping for, so it isn't worth an event. A real category is:
      // "weddings" and "business" are entirely different ad audiences.
      if (category !== "all") trackViewCategory(categoryLabels[category]);
      if (shouldScroll) scrollToShop();
    },
    [scrollToShop],
  );

  const changeSearch = useCallback(
    (value: string, fromHeader = false) => {
      setSearch(value);

      if (searchTrackTimerRef.current) clearTimeout(searchTrackTimerRef.current);
      const query = value.trim();
      if (query.length >= MIN_TRACKED_QUERY_LENGTH) {
        searchTrackTimerRef.current = setTimeout(
          () => trackSearch(query),
          SEARCH_TRACK_DELAY_MS,
        );
      }

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
    // Every route into the quote configurator lands here — the shop grid's
    // Customize buttons and every CustomQuoteButton on the page — so this is the
    // one place the AddToCart-equivalent needs to fire.
    trackConfiguratorOpen(product.name, categoryLabels[product.category]);
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
      if (searchTrackTimerRef.current) clearTimeout(searchTrackTimerRef.current);
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
        <div className="scroll-progress" aria-hidden="true">
          <span className="scroll-progress__bar" />
        </div>
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
