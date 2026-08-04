"use client";

import {
  MagnifyingGlass,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { useEffect, useMemo } from "react";

import { IconBox } from "@/components/icon-box";
import { ProductVisual } from "@/components/storefront/product-visual";
import { ScrollTrigger } from "@/components/storefront/gsap";
import { useStorefront } from "@/components/storefront/storefront-context";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import {
  categoryLabels,
  products,
  type CategoryId,
} from "@/lib/store-data";

export function ShopSection() {
  const {
    activeCategory,
    search,
    changeSearch,
    chooseCategory,
    clearFilters,
    openProduct,
  } = useStorefront();

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        categoryLabels[product.category].toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refresh);
  }, [filteredProducts.length]);

  return (
    <section className="shop-section shell" id="shop">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The signs everyone loves</p>
          <h2>
            Best-selling <PremiumAccentText>neon signs</PremiumAccentText>
          </h2>
        </div>
        <label className="catalog-search">
          <IconBox icon={MagnifyingGlass} />
          <span className="sr-only">Search the catalog</span>
          <input
            type="search"
            value={search}
            placeholder="Search the collection"
            onChange={(event) => changeSearch(event.currentTarget.value)}
          />
        </label>
      </div>

      <div
        className="filter-row"
        role="group"
        aria-label="Filter products"
      >
        <button
          className={`filter-button${activeCategory === "all" ? " is-active" : ""}`}
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => chooseCategory("all")}
        >
          All signs
        </button>
        {Object.entries(categoryLabels).map(([id, label]) => (
          <button
            key={id}
            className={`filter-button${activeCategory === id ? " is-active" : ""}`}
            type="button"
            aria-pressed={activeCategory === id}
            onClick={() => chooseCategory(id as CategoryId)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="catalog-status" aria-live="polite">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "sign" : "signs"}
      </p>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-card__surface">
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}
              <ProductVisual product={product} />
              <button
                className="quick-add"
                type="button"
                aria-label={`Choose options for ${product.name}`}
                onClick={() => openProduct(product)}
              >
                <IconBox icon={SlidersHorizontal} /> Customize
              </button>
            </div>
            <div className="product-card__info">
              <div>
                <h3>{product.name}</h3>
                <p>{product.size}</p>
              </div>
              <span>Custom quote</span>
            </div>
            <div
              className="product-rating"
              aria-label={`${product.rating} out of 5 stars`}
            >
              <span>★★★★★</span> {product.rating}{" "}
              <small>({product.reviews.toLocaleString()})</small>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-products">
          <IconBox icon={MagnifyingGlass} />
          <h3>No signs found</h3>
          <p>Try another search or browse the complete collection.</p>
          <button
            className="button button--secondary clear-filters"
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
