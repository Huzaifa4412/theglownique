"use client";

import {
  UploadSimple,
  X,
  WhatsappLogo,
  House,
  Buildings,
  Check,
  Trash,
} from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ChangeEvent,
} from "react";

import { IconBox } from "@/components/icon-box";
import { ProductVisual } from "@/components/storefront/product-visual";
import { products, type Product } from "@/lib/store-data";
import { WHATSAPP_NUMBER } from "@/lib/site";

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

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [sizeMode, setSizeMode] = useState<"custom" | "preset">("custom");
  const [presetSize, setPresetSize] = useState<string>("Medium · up to 32 in");
  const [customWidth, setCustomWidth] = useState<string>("");
  const [customHeight, setCustomHeight] = useState<string>("");
  const [usageLocation, setUsageLocation] = useState<"Indoor" | "Outdoor">(
    "Indoor",
  );
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const MAX_SIZE = 8 * 1024 * 1024; // 8MB
    if (selectedFile.size > MAX_SIZE) {
      setFileError("File size exceeds 8 MB limit.");
      setFile(null);
      return;
    }

    setFileError("");
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError("");
  };

  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;

    const form = new FormData(event.currentTarget);
    const signText = String(form.get("signText") || "").trim();
    const signType = String(form.get("signType") || "Neon Sign");
    const color = String(form.get("color") || "Hot pink");

    const calculatedSize =
      sizeMode === "custom"
        ? customWidth || customHeight
          ? `Custom (${customWidth || "?"} in W × ${customHeight || "?"} in H)`
          : "Custom Size"
        : presetSize;

    const deliveryCountry = String(
      form.get("deliveryCountry") || "United States",
    );
    const budget = String(form.get("budget") || "Not specified");
    const timeline = String(form.get("timeline") || "Not specified");
    const additionalDetails = String(
      form.get("additionalDetails") || "",
    ).trim();

    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    const message = [
      "Hello The Glownique! I would like a custom quote:",
      "",
      `📋 Design Reference: ${product.name}`,
      `✨ Sign Type: ${signType}`,
      `🎨 Neon Colour: ${color}`,
      `💡 Sign Text / Idea: ${signText || "Same as displayed"}`,
      file
        ? `📁 Uploaded Reference: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`
        : "📁 Uploaded Reference: No file chosen",
      `📏 Size: ${calculatedSize}`,
      `📍 Location: ${usageLocation} (${
        usageLocation === "Indoor"
          ? "Interior walls, receptions and rooms"
          : "Storefronts, façades and exterior walls"
      })`,
      "",
      "🎯 Quote Shaping Details:",
      `🌍 Delivery Country: ${deliveryCountry}`,
      `💰 Working Budget (USD): ${budget}`,
      `⏱ Order Timeline: ${timeline}`,
      additionalDetails ? `📝 Additional Details: ${additionalDetails}` : "",
      "",
      "👤 Customer Details:",
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone Number: ${phone}`,
      "",
      "Please share a custom quote and next steps. Thank you!",
    ]
      .filter((line) => line !== "")
      .join("\n");

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
        <div className="product-form-header">
          <p className="eyebrow">Custom Neon Quote</p>
          <h2 className="dialog-product-name">{dialogProduct.name}</h2>
          <p className="dialog-product-note">
            Configure your custom sign below. Every sign is individually quoted
            after reviewing your details.
          </p>
        </div>

        {/* Sign Type & Color */}
        <div className="form-section">
          <label className="form-label">
            Sign Type
            <select
              name="signType"
              defaultValue={dialogProduct.signType || "Neon Sign"}
            >
              <option value="Neon Sign">
                1. Neon Sign (LED Flexible Silicone)
              </option>
              <option value="3D Metal Neon Sign">
                2. 3D Metal Neon Sign (Frontlit / Backlit / Dual-Lit)
              </option>
              <option value="Ultra Thin Lightbox">
                3. Ultra Thin Lightbox Signs
              </option>
              <option value="Acrylic UV Print Neon Sign">
                4. Acrylic UV Print Neon Sign
              </option>
            </select>
          </label>

          <fieldset className="form-fieldset">
            <legend className="form-legend">Neon colour</legend>
            <div className="color-options">
              {[
                ["Warm White", "#FFF4D6"],
                ["Cold White", "#EBF8FF"],
                ["Light Yellow", "#FFF480"],
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
                [
                  "RGBA Party",
                  "linear-gradient(135deg, #ff1eaa, #62daff, #ffdd00, #00dc5a, #9b3cff)",
                ],
              ].map(([label, swatch], index) => (
                <label key={label} className="color-radio-card">
                  <input
                    type="radio"
                    name="color"
                    value={label}
                    defaultChecked={index === 0}
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
        </div>

        {/* Sign Text / Idea & File Upload */}
        <div className="form-section">
          <label className="form-label">
            Sign text, logo, or idea
            <textarea
              name="signText"
              rows={3}
              placeholder="Example: our logo above the reception desk..."
              className="form-textarea"
            />
          </label>

          <div className="file-upload-box">
            <div className="file-upload-header">
              <span className="form-label-text">
                Upload your design or reference
              </span>
              <span className="file-upload-subtext">
                PNG, JPG, or WebP up to 8 MB
              </span>
            </div>
            <label className="file-upload-dropzone">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                className="file-input-hidden"
              />
              <div className="file-upload-content">
                <UploadSimple className="file-upload-icon" size={24} />
                {file ? (
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ) : (
                  <span className="file-placeholder-text">No file chosen</span>
                )}
                <span className="file-upload-btn">
                  {file ? "Change file" : "Browse file"}
                </span>
              </div>
            </label>
            {file && (
              <button
                type="button"
                className="file-remove-btn"
                onClick={handleRemoveFile}
              >
                <Trash size={14} /> Remove chosen file
              </button>
            )}
            {fileError && <p className="form-error-text">{fileError}</p>}
          </div>
        </div>

        {/* Size & Estimate */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Size & estimate</h3>
            <p className="form-section-desc">
              Select a size, or enter your own.
            </p>
            <div className="size-badge-note">
              For accurate sizing, use custom size
            </div>
          </div>

          <div className="size-selector-tabs">
            <button
              type="button"
              className={`size-tab ${sizeMode === "custom" ? "is-active" : ""}`}
              onClick={() => setSizeMode("custom")}
            >
              Custom Size
            </button>
            <button
              type="button"
              className={`size-tab ${sizeMode === "preset" ? "is-active" : ""}`}
              onClick={() => setSizeMode("preset")}
            >
              Preset Size
            </button>
          </div>

          {sizeMode === "custom" ? (
            <div className="custom-size-grid">
              <label className="form-label">
                Width (in)
                <input
                  type="text"
                  name="customWidth"
                  placeholder="e.g. 36"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                />
              </label>
              <label className="form-label">
                Height (in)
                <input
                  type="text"
                  name="customHeight"
                  placeholder="e.g. 24"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                />
              </label>
            </div>
          ) : (
            <label className="form-label">
              Choose preset size
              <select
                name="presetSize"
                value={presetSize}
                onChange={(e) => setPresetSize(e.target.value)}
              >
                <option value="Small · up to 24 in">Small · up to 24 in</option>
                <option value="Medium · up to 32 in">
                  Medium · up to 32 in
                </option>
                <option value="Large · up to 42 in">Large · up to 42 in</option>
                <option value="Extra Large · 50+ in">
                  Extra Large · 50+ in
                </option>
              </select>
            </label>
          )}
        </div>

        {/* Where will it be used? */}
        <div className="form-section">
          <label className="form-label">Where will it be used?</label>
          <div className="usage-cards-grid">
            <button
              type="button"
              className={`usage-card ${
                usageLocation === "Indoor" ? "is-selected" : ""
              }`}
              onClick={() => setUsageLocation("Indoor")}
            >
              <div className="usage-card-icon">
                <House size={20} />
              </div>
              <div className="usage-card-text">
                <strong className="usage-card-title">Indoor</strong>
                <span className="usage-card-desc">
                  Interior walls, receptions and rooms
                </span>
              </div>
              {usageLocation === "Indoor" && (
                <Check className="usage-check" size={18} />
              )}
            </button>

            <button
              type="button"
              className={`usage-card ${
                usageLocation === "Outdoor" ? "is-selected" : ""
              }`}
              onClick={() => setUsageLocation("Outdoor")}
            >
              <div className="usage-card-icon">
                <Buildings size={20} />
              </div>
              <div className="usage-card-text">
                <strong className="usage-card-title">Outdoor</strong>
                <span className="usage-card-desc">
                  Storefronts, façades and exterior walls
                </span>
              </div>
              {usageLocation === "Outdoor" && (
                <Check className="usage-check" size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Help us shape a more accurate quote. */}
        <div className="form-section">
          <h3 className="form-section-title">
            Help us shape a more accurate quote.
          </h3>
          <div className="quote-shaping-grid">
            <label className="form-label form-col-full">
              Delivery country
              <select name="deliveryCountry" defaultValue="United States">
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="Other">Other Country</option>
              </select>
            </label>

            <label className="form-label">
              Working budget (USD)
              <select name="budget" defaultValue="">
                <option value="" disabled>
                  Choose a range
                </option>
                <option value="Under $250">Under $250</option>
                <option value="$250 - $500">$250 - $500</option>
                <option value="$500 - $1,000">$500 - $1,000</option>
                <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                <option value="$2,500+">$2,500+</option>
              </select>
            </label>

            <label className="form-label">
              When do you plan to order?
              <select name="timeline" defaultValue="">
                <option value="" disabled>
                  Choose a timeline
                </option>
                <option value="ASAP (Within 1 week)">
                  ASAP (Within 1 week)
                </option>
                <option value="1 - 2 weeks">1 - 2 weeks</option>
                <option value="2 - 4 weeks">2 - 4 weeks</option>
                <option value="1+ month / Just researching">
                  1+ month / Just researching
                </option>
              </select>
            </label>
          </div>

          <label className="form-label">
            Additional details (optional)
            <textarea
              name="additionalDetails"
              rows={3}
              placeholder="Wall finish, deadline, mounting, power access, or anything else we should know..."
              className="form-textarea"
            />
          </label>
        </div>

        {/* Your details */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="form-section-title">Your details</h3>
            <p className="form-section-desc">
              Where should we continue the conversation?
            </p>
          </div>

          <div className="user-details-grid">
            <label className="form-label">
              Full name
              <input
                type="text"
                name="fullName"
                placeholder="Your name"
                required
              />
            </label>

            <label className="form-label">
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="form-label">
              Phone number
              <input
                type="tel"
                name="phone"
                placeholder="+1 555 000 0000"
                required
              />
            </label>
          </div>
        </div>

        {/* Terms agreement checkbox */}
        <label className="terms-checkbox-label">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            required
          />
          <span>
            I agree that these details can be used to prepare and follow up on
            my quote request.
          </span>
        </label>

        <button
          className="button button--primary submit-quote-btn"
          type="submit"
          disabled={!agreeTerms}
        >
          Request a custom quote <IconBox icon={WhatsappLogo} />
        </button>
      </form>
    </dialog>
  );
}

