"use client";
import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  MAX_CART_ITEMS,
  parseCartItems,
  type CartItem,
} from "@/lib/cart";
import { trackCartAdded } from "@/lib/meta-pixel";
import type { Product } from "@/lib/store-data";

const ProductDialog = dynamic(
  () =>
    import("@/components/storefront/product-dialog").then(
      (m) => m.ProductDialog,
    ),
  { ssr: false },
);
type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  openProduct: (product: Product, item?: CartItem) => void;
  saveItem: (item: CartItem) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearSubmitted: (submitted: CartItem[]) => void;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<{
    product: Product;
    item?: CartItem;
  } | null>(null);
  const [notice, setNotice] = useState("");
  const itemsRef = useRef<CartItem[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    function load() {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        itemsRef.current = saved ? parseCartItems(JSON.parse(saved)) : [];
        setItems(itemsRef.current);
      } catch {
        itemsRef.current = [];
        setItems([]);
        setNotice(
          "Your saved cart could not be loaded. Please add your designs again.",
        );
      }
      setReady(true);
    }
    load();
    const sync = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) load();
    };
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  function commitItems(next: CartItem[]) {
    itemsRef.current = next;
    setItems(next);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      return true;
    } catch {
      setNotice(
        "Your browser cannot save this cart. Keep this tab open to complete checkout.",
      );
      return false;
    }
  }
  const openProduct = useCallback(
    (product: Product, item?: CartItem) => setSelected({ product, item }),
    [],
  );
  const saveItem = (item: CartItem) => {
    const current = itemsRef.current;
    const existing = current.find((entry) => entry.id === item.id);
    if (!existing && current.length >= MAX_CART_ITEMS)
      throw new Error(
        "Your cart can hold up to 20 designs. Remove a design to add another.",
      );
    const persisted = commitItems(
      existing
        ? current.map((entry) => (entry.id === item.id ? item : entry))
        : [...current, item],
    );
    if (!existing) trackCartAdded(item);
    else if (item.quantity > existing.quantity)
      trackCartAdded({ ...item, quantity: item.quantity - existing.quantity });
    setNotice(
      !persisted
        ? "Design saved for this visit. Keep this tab open; your browser cannot save it for later."
        : existing
          ? "Design updated in your cart."
          : "Design added to your cart.",
    );
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(""), 4500);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        openProduct,
        saveItem,
        setQuantity: (id, quantity) => {
          if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99)
            return;
          const item = itemsRef.current.find((entry) => entry.id === id);
          if (item && quantity > item.quantity)
            trackCartAdded({ ...item, quantity: quantity - item.quantity });
          commitItems(
            itemsRef.current.map((entry) =>
              entry.id === id ? { ...entry, quantity } : entry,
            ),
          );
        },
        removeItem: (id) =>
          commitItems(itemsRef.current.filter((entry) => entry.id !== id)),
        clearSubmitted: (submitted) =>
          commitItems(
            itemsRef.current.filter(
              (entry) =>
                !submitted.some(
                  (sent) => JSON.stringify(sent) === JSON.stringify(entry),
                ),
            ),
          ),
      }}
    >
      {children}
      {selected && (
        <ProductDialog
          key={selected.item?.id ?? selected.product.id}
          product={selected.product}
          item={selected.item}
          onClose={() => setSelected(null)}
        />
      )}
      <div
        className={`toast${notice ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
