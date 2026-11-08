"use client";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { SignTypePreview } from "@/components/storefront/sign-type-preview";
import { SIGN_TYPES, type Product, type SignType } from "@/lib/store-data";
import { parseCartItems, type CartItem } from "@/lib/cart";

const COLORS = [
  ["Warm White", "#FFF4D6"],
  ["Cold White", "#EBF8FF"],
  ["Yellow", "#FFDD00"],
  ["Orange", "#FF8000"],
  ["Dark Blue", "#0036FF"],
  ["Ice Blue", "#62DAFF"],
  ["Green", "#00DC5A"],
  ["Light Pink", "#FFAAD2"],
  ["Hot Pink", "#FF1EAA"],
  ["Red", "#FF2020"],
  ["Purple", "#9B3CFF"],
  ["Teal", "#00D2BE"],
  ["RGBA Party", "linear-gradient(135deg,#ff1eaa,#62daff,#ffdd00)"],
];

export function ProductDialog({
  product,
  item,
  onClose,
}: {
  product: Product;
  item?: CartItem;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { saveItem } = useCart();
  const [signType, setSignType] = useState<SignType>(
    item?.signType ?? product.signType ?? "Neon Sign",
  );
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
    document.body.classList.add("dialog-open");
    return () => {
      document.body.classList.remove("dialog-open");
    };
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const [entry] = parseCartItems([
        {
          id: item?.id ?? crypto.randomUUID(),
          productId: product.id,
          signType,
          color: String(form.get("color") ?? "Warm White"),
          size: String(form.get("size") ?? ""),
          signText: String(form.get("signText") ?? ""),
          usageLocation: String(form.get("usageLocation")),
          details: String(form.get("details") ?? ""),
          quantity: Number(form.get("quantity")),
        },
      ]);
      saveItem(entry);
      setSaved(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Please check your design details.",
      );
    }
  }
  return (
    <dialog
      ref={dialog}
      className="product-dialog ph-no-capture"
      aria-labelledby="cart-design-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="icon-button dialog-close"
        type="button"
        aria-label="Close design options"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      <div className="dialog-product-visual">
        <SignTypePreview signType={signType} />
      </div>
      {saved ? (
        <div className="product-form">
          <p className="eyebrow">Saved to your cart</p>
          <h2 id="cart-design-title" className="dialog-product-name">
            Your design is in.
          </h2>
          <p>
            Review your designs at checkout. We’ll email your custom quote after
            reviewing the details.
          </p>
          <Link
            href="/cart"
            onClick={onClose}
            className="button button--primary"
          >
            View cart &amp; checkout
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="button button--secondary"
          >
            Continue browsing
          </button>
        </div>
      ) : (
        <form className="product-form" onSubmit={submit}>
          <div className="product-form-header">
            <p className="eyebrow">Make it yours</p>
            <h2 id="cart-design-title" className="dialog-product-name">
              {product.name}
            </h2>
            <p className="dialog-product-note">
              Save your design, then send everything together at checkout. Each
              sign is individually quoted before payment.
            </p>
          </div>
          <label className="form-label">
            Sign type
            <select
              value={signType}
              onChange={(event) => setSignType(event.target.value as SignType)}
            >
              {SIGN_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="form-fieldset">
            <legend className="form-legend">Colour</legend>
            <div className="color-options">
              {COLORS.map(([label, swatch]) => (
                <label key={label} className="color-radio-card">
                  <input
                    type="radio"
                    name="color"
                    value={label}
                    defaultChecked={label === (item?.color ?? "Warm White")}
                  />
                  <span
                    style={
                      {
                        background: swatch,
                        "--swatch": swatch,
                      } as CSSProperties
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="form-label">
            Sign text, logo, or idea
            <textarea
              name="signText"
              rows={3}
              maxLength={1000}
              defaultValue={item?.signText}
              placeholder="Your wording, logo description, or design idea"
            />
          </label>
          <div className="quote-shaping-grid">
            <label className="form-label">
              Size
              <input
                type="text"
                name="size"
                required
                maxLength={160}
                defaultValue={item?.size ?? product.size}
                placeholder="e.g. 36 in wide × 24 in high"
              />
            </label>
            <label className="form-label">
              Quantity
              <input
                name="quantity"
                type="number"
                required
                min={1}
                max={99}
                step={1}
                defaultValue={item?.quantity ?? 1}
              />
            </label>
            <label className="form-label">
              Where will it be used?
              <select
                name="usageLocation"
                defaultValue={item?.usageLocation ?? "Indoor"}
              >
                <option>Indoor</option>
                <option>Outdoor</option>
              </select>
            </label>
          </div>
          <label className="form-label">
            Design details (optional)
            <textarea
              name="details"
              rows={3}
              maxLength={1500}
              defaultValue={item?.details}
              placeholder="Mounting, wall finish, lighting style, or a link to your artwork"
            />
          </label>
          <p className="dialog-product-note">
            You can share artwork by replying to your confirmation email.
          </p>
          {error && (
            <p className="form-error-text" role="alert">
              {error}
            </p>
          )}
          <button
            className="button button--primary submit-quote-btn"
            type="submit"
          >
            <ShoppingBag size={20} />
            {item ? "Update cart" : "Add to cart"}
          </button>
        </form>
      )}
    </dialog>
  );
}
