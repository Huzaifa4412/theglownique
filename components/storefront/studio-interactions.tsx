"use client";

import { useState } from "react";
import Image from "next/image";
import { useStorefront } from "@/components/storefront/storefront-context";
import { categoryLabels, products, type CategoryId } from "@/lib/store-data";
import styles from "./studio-home.module.css";

export function StudioCatalog() {
  const {
    activeCategory,
    search,
    changeSearch,
    chooseCategory,
    clearFilters,
    openProduct,
  } = useStorefront();
  const [expanded, setExpanded] = useState(false);
  const query = search.trim().toLowerCase();
  const filtered = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      (!query ||
        `${product.name} ${categoryLabels[product.category]}`
          .toLowerCase()
          .includes(query)),
  );
  const shown =
    expanded || query || activeCategory !== "all"
      ? filtered
      : filtered.slice(0, 4);
  return (
    <section
      className={styles.section}
      id="shop"
      aria-labelledby="catalog-heading"
    >
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.kicker}>The design edit</p>
          <h2 id="catalog-heading">Find your starting point.</h2>
        </div>
        <label className={styles.search}>
          <span className="sr-only">Search the catalog</span>
          <input
            type="search"
            placeholder="Find a sign…"
            value={search}
            onChange={(event) => changeSearch(event.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <div className={styles.filters} role="group" aria-label="Filter products">
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => chooseCategory("all")}
        >
          All designs
        </button>
        {Object.entries(categoryLabels).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={activeCategory === id}
            onClick={() => chooseCategory(id as CategoryId)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className={styles.resultCount} aria-live="polite">
        {shown.length} of {filtered.length} designs · Made to your size and
        colour
      </p>
      <div className={styles.catalogGrid}>
        {shown.map((product) => (
          <article className={styles.product} key={product.id}>
            <button
              type="button"
              onClick={() => openProduct(product)}
              aria-label={`Customize ${product.name}`}
            >
              <div className={styles.productImage}>
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 600px) 46vw, (max-width: 900px) 45vw, 23vw"
                  />
                )}
                <span className={styles.productAction} aria-hidden="true">
                  Make it yours ↗
                </span>
              </div>
              <h3>{product.name}</h3>
              <p>
                {product.signType} <span>↗</span>
              </p>
            </button>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className={styles.empty}>
          <h3>No matching designs.</h3>
          <p>Try a different phrase or explore all signs.</p>
          <button
            className={styles.primary}
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
      {!query && activeCategory === "all" && filtered.length > 4 && (
        <button
          className={styles.more}
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show fewer designs −"
            : `Explore all ${filtered.length} designs +`}
        </button>
      )}
    </section>
  );
}

export function StudioWallPreview() {
  const [position, setPosition] = useState(50);
  return (
    <div className={styles.wallPreview}>
      <Image
        src="/before-after/before.webp"
        alt="Salon reception wall before adding illuminated logo lettering"
        fill
        sizes="(max-width: 800px) 100vw, 52vw"
      />
      <div
        className={styles.afterImage}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src="/before-after/after.webp"
          alt="The same reception wall with a warm halo-lit Osée Beauty sign"
          fill
          sizes="(max-width: 800px) 100vw, 52vw"
        />
      </div>
      <span className={styles.beforeLabel}>Before</span>
      <span className={styles.afterLabel}>With a little glow</span>
      <div className={styles.compareLine} style={{ left: `${position}%` }}>
        <span aria-hidden="true">↔</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Compare the wall before and after adding a sign"
        aria-valuetext={`${position}% of the illuminated design shown`}
      />
      <span className={styles.previewNote}>
        Design visualisation · Drag to compare
      </span>
    </div>
  );
}
