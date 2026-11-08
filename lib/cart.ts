import { products, SIGN_TYPES } from "./store-data";
import type { SignType } from "./store-data";

export const CART_STORAGE_KEY = "glownique-cart-v1";
export const MAX_CART_ITEMS = 20;
export const MAX_QUANTITY = 99;
export type CartItem = {
  id: string;
  productId: number;
  signType: SignType;
  color: string;
  size: string;
  signText: string;
  usageLocation: "Indoor" | "Outdoor";
  details: string;
  quantity: number;
};
export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  budget: string;
  timeline: string;
  notes: string;
};
export type CheckoutPayload = {
  submissionId: string;
  items: CartItem[];
  customer: CheckoutCustomer;
  consent: true;
};
export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid request.");
  return value as Record<string, unknown>;
}
function text(
  value: unknown,
  label: string,
  max: number,
  required = false,
): string {
  if (value === undefined && !required) return "";
  if (
    typeof value !== "string" ||
    value.length > max ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
  )
    throw new Error(`Please check ${label}.`);
  const cleaned = value.trim();
  if (required && !cleaned) throw new Error(`Please enter ${label}.`);
  return cleaned;
}
/** Shared by saved carts and server requests; never trust client prices or names. */
export function parseCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value) || value.length > MAX_CART_ITEMS)
    throw new Error("Your cart can hold up to 20 designs.");
  const ids = new Set<string>();
  return value.map((raw) => {
    const item = object(raw);
    if (
      typeof item.id !== "string" ||
      !UUID_PATTERN.test(item.id) ||
      ids.has(item.id)
    )
      throw new Error("Invalid cart item.");
    ids.add(item.id);
    if (
      !Number.isInteger(item.productId) ||
      !products.some((p) => p.id === item.productId)
    )
      throw new Error("A design in your cart is unavailable.");
    if (!SIGN_TYPES.some((type) => type.id === item.signType))
      throw new Error("Please choose a valid sign type.");
    if (item.usageLocation !== "Indoor" && item.usageLocation !== "Outdoor")
      throw new Error("Please choose indoor or outdoor use.");
    if (
      !Number.isInteger(item.quantity) ||
      Number(item.quantity) < 1 ||
      Number(item.quantity) > MAX_QUANTITY
    )
      throw new Error("Quantity must be between 1 and 99.");
    return {
      id: item.id,
      productId: item.productId as number,
      signType: item.signType as SignType,
      color: text(item.color, "a colour", 80, true),
      size: text(item.size, "a size", 160, true),
      signText: text(item.signText, "your sign text", 1000),
      usageLocation: item.usageLocation,
      details: text(item.details, "design details", 1500),
      quantity: item.quantity as number,
    };
  });
}
export function parseCheckout(value: unknown): CheckoutPayload {
  const input = object(value);
  if (
    typeof input.submissionId !== "string" ||
    !UUID_PATTERN.test(input.submissionId)
  )
    throw new Error("Please refresh checkout and try again.");
  if (input.consent !== true)
    throw new Error("Please agree to the privacy policy to continue.");
  const items = parseCartItems(input.items);
  if (!items.length) throw new Error("Your cart is empty.");
  const raw = object(input.customer);
  const customer: CheckoutCustomer = {
    name: text(raw.name, "your name", 120, true),
    email: text(raw.email, "your email", 254, true).toLowerCase(),
    phone: text(raw.phone, "your phone number", 40),
    country: text(raw.country, "your delivery country", 100, true),
    city: text(raw.city, "your city", 100, true),
    postalCode: text(raw.postalCode, "your postal code", 24),
    budget: text(raw.budget, "your budget", 80),
    timeline: text(raw.timeline, "your timeline", 100),
    notes: text(raw.notes, "your notes", 2000),
  };
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) ||
    /[\r\n]/.test(customer.email)
  )
    throw new Error("Please enter a valid email address.");
  return { submissionId: input.submissionId, items, customer, consent: true };
}
export function cartProduct(item: CartItem) {
  return products.find((product) => product.id === item.productId)!;
}
/** Same stable sign-type IDs as product-page ViewContent. */
export function cartContentId(item: CartItem): string {
  return {
    "Neon Sign": "custom-neon-signs",
    "3D Metal Neon Sign": "3d-metal-neon-signs",
    "Ultra Thin Lightbox": "ultra-thin-lightbox",
    "Acrylic UV Print Neon Sign": "uv-print-acrylic-signs",
  }[item.signType];
}
