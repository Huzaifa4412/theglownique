"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { cartProduct } from "@/lib/cart";
import { getSignTypeDetail } from "@/lib/store-data";

export function CartPage() {
  const { items, ready, openProduct, setQuantity, removeItem } = useCart();
  if (!ready) return <p role="status">Loading your cart…</p>;
  if (!items.length)
    return (
      <div className="commerce-empty">
        <ShoppingBag size={40} aria-hidden="true" />
        <h2>Your next great sign starts here.</h2>
        <p>
          Add a design to your cart, then send your details for a custom quote.
        </p>
        <Link href="/#shop" className="button button--primary">
          Explore signs <ArrowRight size={18} />
        </Link>
      </div>
    );
  return (
    <div className="commerce-grid">
      <div className="commerce-items">
        {items.map((item) => {
          const product = cartProduct(item);
          return (
            <article className="commerce-item" key={item.id}>
              <Image
                src={product.image ?? getSignTypeDetail(item.signType).image}
                width={160}
                height={160}
                alt={product.name}
                className="commerce-item__image"
              />
              <div className="commerce-item__body">
                <h2>{product.name}</h2>
                <p>
                  {item.signType} · {item.color}
                </p>
                <p>
                  {item.size} · {item.usageLocation}
                </p>
                {item.signText && (
                  <p className="commerce-item__text">{item.signText}</p>
                )}
                <div className="commerce-item__actions">
                  <label>
                    Qty{" "}
                    <input
                      type="number"
                      min={1}
                      max={99}
                      step={1}
                      value={item.quantity}
                      aria-label={`Quantity for ${product.name}`}
                      onChange={(event) =>
                        setQuantity(item.id, Number(event.target.value))
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => openProduct(product, item)}
                  >
                    Edit design
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
              <span className="commerce-price">Custom quote</span>
            </article>
          );
        })}
        <Link href="/#shop" className="commerce-text-link">
          + Add another design
        </Link>
      </div>
      <aside className="commerce-summary">
        <p className="eyebrow">Made just for you</p>
        <h2>Your request</h2>
        <dl>
          <div>
            <dt>Designs</dt>
            <dd>{items.length}</dd>
          </div>
          <div>
            <dt>Total signs</dt>
            <dd>{items.reduce((sum, item) => sum + item.quantity, 0)}</dd>
          </div>
          <div>
            <dt>Pricing &amp; delivery</dt>
            <dd>Confirmed in your quote</dd>
          </div>
        </dl>
        <p>
          We review your size, design, and delivery details before confirming a
          price. Nothing is charged at this step.
        </p>
        <Link href="/checkout" className="button button--primary">
          Continue to checkout <ArrowRight size={18} />
        </Link>
      </aside>
    </div>
  );
}
