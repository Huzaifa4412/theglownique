"use client";

import { WhatsappLogo, X } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type FormEvent,
} from "react";

import { IconBox } from "@/components/icon-box";
import { ProductVisual } from "@/components/storefront/product-visual";
import { products, type Product } from "@/lib/store-data";

const WHATSAPP_NUMBER = "15551234567";

type ProductDialogProps = {
  product: Product | null;
  onClose: () => void;
  showToast: (message: string) => void;
};

export function ProductDialog({
  product,
  onClose,
  showToast,
}: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogProduct = product ?? products[products.length - 1];

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    document.body.classList.remove("dialog-open");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !product) return;

    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");

    return () => document.body.classList.remove("dialog-open");
  }, [product]);

  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;

    const form = new FormData(event.currentTarget);
    const size = String(form.get("size"));
    const signType = String(form.get("signType") || "Neon Sign");
    const color = String(form.get("color"));
    const customText = String(form.get("customText") || "").trim();
    const message = [
      "Hello The Glownique! I would like a custom quote:",
      "",
      `Design: ${product.name}`,
      `Sign Type: ${signType}`,
      `Preferred size: ${size}`,
      `Neon colour: ${color}`,
      customText
        ? `Custom wording: "${customText}"`
        : "Custom wording: Same as displayed",
      "",
      "Please share a custom quote and the next steps. Thank you!",
    ].join("\n");

    closeDialog();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    showToast("Your quote request is ready in WhatsApp");
  };

  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <button
        className="icon-button dialog-close"
        type="button"
        aria-label="Close product options"
        onClick={closeDialog}
      >
        <IconBox icon={X} />
      </button>
      <div className="dialog-product-visual">
        <ProductVisual product={dialogProduct} />
      </div>
      <form
        className="product-form"
        key={product?.id ?? "empty"}
        onSubmit={handleQuoteSubmit}
      >
        <p className="eyebrow">Make it yours</p>
        <h2 className="dialog-product-name">{dialogProduct.name}</h2>
        <p className="dialog-product-note">
          Every sign is quoted individually after we review your design choices.
        </p>
        <label>
          Sign Type
          <select name="signType" defaultValue={dialogProduct.signType || "Neon Sign"}>
            <option value="Neon Sign">1. Neon Sign (LED Flexible Silicone)</option>
            <option value="3D Metal Neon Sign">2. 3D Metal Neon Sign (Frontlit / Backlit / Dual-Lit)</option>
            <option value="Ultra Thin Lightbox">3. Ultra Thin Lightbox Signs</option>
            <option value="Acrylic UV Print Neon Sign">4. Acrylic UV Print Neon Sign</option>
          </select>
        </label>
        <label>
          Size
          <select name="size" defaultValue="Medium · up to 32 in">
            <option>Small · up to 24 in</option>
            <option>Medium · up to 32 in</option>
            <option>Large · up to 42 in</option>
          </select>
        </label>
        <fieldset>
          <legend>Neon colour</legend>
          <div className="color-options">
            {[
              ["Hot pink", "#ff3d8d"],
              ["Warm white", "#ffd8b9"],
              ["Electric blue", "#4b82ff"],
              ["Green", "#66ef87"],
            ].map(([label, swatch], index) => (
              <label key={label}>
                <input
                  type="radio"
                  name="color"
                  value={label}
                  defaultChecked={index === 0}
                />
                <span style={{ "--swatch": swatch } as CSSProperties} />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="custom-text-label">
          Custom wording <span>(optional)</span>
          <input
            type="text"
            name="customText"
            maxLength={32}
            placeholder="Your words here"
          />
        </label>
        <button className="button button--primary" type="submit">
          Request a custom quote <IconBox icon={WhatsappLogo} />
        </button>
      </form>
    </dialog>
  );
}
