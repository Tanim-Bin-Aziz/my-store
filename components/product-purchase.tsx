"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = React.useState(product.colors[0]);
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    add(product.slug, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 font-semibold">
          Color: <span className="font-normal text-neutral-600">{color}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <Button
              key={c}
              variant="outline"
              aria-pressed={color === c}
              onClick={() => setColor(c)}
              className={cn(color === c && "border-2 border-primary font-semibold")}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 font-semibold">Quantity</div>
        <div className="inline-flex items-center rounded-md border">
          <Button variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus size={16} />
          </Button>
          <span aria-live="polite" className="min-w-9 text-center font-semibold">
            {qty}
          </span>
          <Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="lg" className="flex-[1_1_180px]" onClick={handleAdd}>
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {added ? "Added" : "Add to cart"}
        </Button>
        <Link
          href="/cart"
          onClick={() => add(product.slug, color, qty)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-[1_1_180px]")}
        >
          Buy now
        </Link>
      </div>
    </div>
  );
}
