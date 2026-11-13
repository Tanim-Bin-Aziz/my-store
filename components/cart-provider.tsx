"use client";

import * as React from "react";
import { DELIVERY_FEE, getProduct, type Product } from "@/lib/products";

type CartItem = { slug: string; color: string; qty: number };

export type CartLine = CartItem & { product: Product };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  add: (slug: string, color: string, qty?: number) => void;
  setQty: (slug: string, color: string, qty: number) => void;
  remove: (slug: string, color: string) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = "my-store-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const value = React.useMemo<CartContextValue>(() => {
    const lines: CartLine[] = items.flatMap((it) => {
      const product = getProduct(it.slug);
      return product ? [{ ...it, product }] : [];
    });
    const count = lines.reduce((a, l) => a + l.qty, 0);
    const subtotal = lines.reduce((a, l) => a + l.product.price * l.qty, 0);
    const delivery = lines.length ? DELIVERY_FEE : 0;
    const same = (a: CartItem, slug: string, color: string) => a.slug === slug && a.color === color;

    return {
      lines,
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      add: (slug, color, qty = 1) =>
        setItems((cur) =>
          cur.some((i) => same(i, slug, color))
            ? cur.map((i) => (same(i, slug, color) ? { ...i, qty: i.qty + qty } : i))
            : [...cur, { slug, color, qty }]
        ),
      setQty: (slug, color, qty) =>
        setItems((cur) => cur.map((i) => (same(i, slug, color) ? { ...i, qty: Math.max(1, qty) } : i))),
      remove: (slug, color) => setItems((cur) => cur.filter((i) => !same(i, slug, color))),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
