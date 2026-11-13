"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border bg-background">
      <div className="relative">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <ProductImage src={product.image} alt={product.name} className="aspect-square" />
        </Link>
        {product.badge && <Badge className="absolute left-3 top-3 bg-white text-brand">{product.badge}</Badge>}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
            <Heart size={16} />
          </span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div>
          <div className="text-xs text-muted-foreground">{product.category}</div>
          <h3 className="mt-0.5 text-sm font-semibold">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-base font-bold tracking-tight">{formatPrice(product.price)}</span>
          <Button size="sm" onClick={() => add(product.slug, product.colors[0])}>
            <Plus size={16} />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
