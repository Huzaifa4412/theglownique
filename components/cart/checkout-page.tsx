"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useCart } from "./cart-provider";
import {
  cartProduct,
  parseCheckout,
  type CartItem,
  type CheckoutCustomer,
} from "@/lib/cart";
import {
  trackCheckoutStarted,
  trackCheckoutSubmitted,
  trackEtsyOutbound,
} from "@/lib/meta-pixel";
import { ETSY_SHOP_URL } from "@/lib/site";

export function CheckoutPage({ available }: { available: boolean }) {
  const { items, ready, clearSubmitted } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{
    reference: string;
    items: CartItem[];
  } | null>(null);
  const [stayHere, setStayHere] = useState(false);
  const started = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const submitting = useRef(false);
  useEffect(() => {
    if (ready && items.length && !started.current) {
      started.current = true;
      trackCheckoutStarted(items);
    }
  }, [items, ready]);
  useEffect(() => {
    if (!receipt || stayHere) return;
    const timer = setTimeout(() => {
      trackEtsyOutbound("checkout-success-redirect", "/checkout");
      window.location.assign(ETSY_SHOP_URL);
    }, 8000);
    return () => clearTimeout(timer);
  }, [receipt, stayHere]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    const customer = Object.fromEntries(
      [
        "name",
        "email",
        "phone",
        "country",
        "city",
        "postalCode",
        "budget",
        "timeline",
        "notes",
      ].map((key) => [key, String(data.get(key) ?? "").trim()]),
    ) as CheckoutCustomer;
    const fingerprint = JSON.stringify({ items, customer });
    if (attempt.current?.fingerprint !== fingerprint)
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    let payload;
    try {
      payload = parseCheckout({
        submissionId: attempt.current.id,
        items,
        customer,
        consent: data.get("consent") === "on",
      });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Please check your details.",
      );
      return;
    }
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response
        .json()
        .catch(() => ({
          error:
            "We couldn’t submit your request. Your cart is saved; please try again.",
        }));
      if (!response.ok || result.accepted !== true)
        throw new Error(
          result.error ??
            "We couldn’t submit your request. Your cart is saved; please try again.",
        );
      setReceipt({ reference: result.reference, items: payload.items });
      clearSubmitted(payload.items);
      // Only successful server acceptance reaches this conversion event.
      trackCheckoutSubmitted(payload.items, payload.submissionId);
    } catch (cause) {
      setError(
        cause instanceof Error && !(cause instanceof TypeError)
          ? cause.message
          : "Connection interrupted. Your cart is saved; please try again.",
      );
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  if (!ready) return <p role="status">Loading checkout…</p>;
  if (receipt)
    return (
      <div className="commerce-success" role="status">
        <CheckCircle2 size={44} aria-hidden="true" />
        <p className="eyebrow">Request received</p>
        <h2>Let’s bring your sign to life.</h2>
        <p>
          Your reference is <strong>{receipt.reference}</strong>. We’ve sent
          your design summary by email. Check your spam folder too.
        </p>
        <p>
          Our team will review your details and follow up with your quote and
          next steps. You can reply to the email with artwork or questions.
        </p>
        <div className="commerce-receipt">
          {receipt.items.map((item) => (
            <p key={item.id}>
              {cartProduct(item).name} × {item.quantity}
              <br />
              <small>
                {item.color} · {item.size}
              </small>
            </p>
          ))}
        </div>
        <p className="commerce-note">
          This confirms your quote request. Payment follows after you approve
          your quote and design.
        </p>
        <a
          href={ETSY_SHOP_URL}
          className="button button--primary"
          data-meta-source="checkout-success-etsy"
        >
          Continue on Etsy <ArrowRight size={18} />
        </a>
        <p className="commerce-note">
          Include your reference in your Etsy message so we can match your
          designs.
        </p>
        {!stayHere && (
          <p className="commerce-note">
            We’ll take you to Etsy in a few seconds.{" "}
            <button
              type="button"
              onClick={() => setStayHere(true)}
              className="commerce-text-link"
            >
              Stay on this page
            </button>
          </p>
        )}
      </div>
    );
  if (!items.length)
    return (
      <div className="commerce-empty">
        <h2>Your cart is empty.</h2>
        <p>Add your favourite designs before checkout.</p>
        <Link href="/#shop" className="button button--primary">
          Explore signs
        </Link>
      </div>
    );
  return (
    <div className="commerce-grid">
      <form className="commerce-form" onSubmit={submit}>
        {!available && (
          <div className="commerce-alert" role="status">
            Email checkout is temporarily unavailable. Your cart is saved.
            Please <Link href="/contact">contact us</Link> to send your request.
          </div>
        )}
        <fieldset disabled={busy || !available}>
          <legend>1. Your details</legend>
          <div className="commerce-fields">
            <label className="form-label">
              Full name
              <input name="name" autoComplete="name" maxLength={120} required />
            </label>
            <label className="form-label">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
              <small>Your design summary and quote will go here.</small>
            </label>
            <label className="form-label">
              Phone (optional)
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
          </div>
        </fieldset>
        <fieldset disabled={busy || !available}>
          <legend>2. Delivery &amp; timing</legend>
          <div className="commerce-fields">
            <label className="form-label">
              Country
              <input
                name="country"
                autoComplete="country-name"
                defaultValue="United States"
                maxLength={100}
                required
              />
            </label>
            <label className="form-label">
              City
              <input
                name="city"
                autoComplete="address-level2"
                maxLength={100}
                required
              />
            </label>
            <label className="form-label">
              Postal code (optional)
              <input
                name="postalCode"
                autoComplete="postal-code"
                maxLength={24}
              />
            </label>
            <label className="form-label">
              Budget for this request (USD, optional)
              <select name="budget">
                <option value="">Please select</option>
                {[
                  "Under $250",
                  "$250 - $500",
                  "$500 - $1,000",
                  "$1,000 - $2,500",
                  "$2,500+",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="form-label">
              Timeline (optional)
              <select name="timeline">
                <option value="">Please select</option>
                {[
                  "ASAP (Within 1 week)",
                  "1 - 2 weeks",
                  "2 - 4 weeks",
                  "1+ month / Just researching",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="form-label commerce-fields__full">
              Anything else? (optional)
              <textarea
                name="notes"
                rows={4}
                maxLength={2000}
                placeholder="Installation details, event date, or a link to artwork"
              />
            </label>
          </div>
        </fieldset>
        <fieldset disabled={busy || !available}>
          <legend>3. Review &amp; send</legend>
          <p>
            Each design is made to order. We’ll confirm pricing and delivery in
            your quote, then arrange payment through our{" "}
            <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer">
              Etsy shop
            </a>{" "}
            after approval.
          </p>
          <label className="commerce-consent">
            <input name="consent" type="checkbox" required />
            <span>
              I agree to the <Link href="/terms">terms</Link> and{" "}
              <Link href="/privacy">privacy policy</Link>, and to being
              contacted about this request.
            </span>
          </label>
          <p className="commerce-note">No payment is taken at this step.</p>
        </fieldset>
        {error && (
          <div className="commerce-alert" role="alert">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={busy || !available}
          className="button button--primary commerce-submit"
        >
          <Mail size={19} />
          {busy ? "Sending your request…" : "Submit quote request"}
          <ArrowRight size={18} />
        </button>
      </form>
      <aside className="commerce-summary">
        <p className="eyebrow">Your designs</p>
        <h2>Request summary</h2>
        {items.map((item) => (
          <div key={item.id} className="commerce-summary__item">
            <strong>
              {cartProduct(item).name} × {item.quantity}
            </strong>
            <p>
              {item.signType}
              <br />
              {item.color} · {item.size}
              <br />
              {item.usageLocation}
            </p>
            {item.signText && <p>{item.signText}</p>}
            {item.details && <p>{item.details}</p>}
          </div>
        ))}
        <dl>
          <div>
            <dt>Total signs</dt>
            <dd>{items.reduce((sum, item) => sum + item.quantity, 0)}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>Custom quote</dd>
          </div>
        </dl>
        <Link
          href="/cart"
          className="commerce-text-link"
          aria-disabled={busy}
          onClick={(event) => {
            if (busy) event.preventDefault();
          }}
        >
          Edit your cart
        </Link>
      </aside>
    </div>
  );
}
