"use client";

import Link from "next/link";
import { Heart, Package, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { SITE_NAME, categories } from "@/lib/products";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="border-b bg-background">
      <div className="container flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
        <Link href="/" className="flex flex-none items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
            <Package size={20} />
          </span>
          <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
        </Link>

        <form action="/products" className="relative mx-auto min-w-0 max-w-[560px] flex-1 basis-[280px]">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            aria-label="Search products"
            placeholder="Search products, brands, categories"
            className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3.5 text-sm"
          />
        </form>

        <div className="flex flex-none items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Account">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart size={20} />
          </Button>
          <Link
            href="/cart"
            className="flex h-11 items-center gap-2 rounded-md border bg-background px-3.5 text-sm font-medium hover:bg-muted"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          </Link>
        </div>
      </div>

      <nav aria-label="Categories" className="container flex gap-1 overflow-x-auto pb-2">
        <Link href="/products" className="flex h-11 items-center whitespace-nowrap rounded-md px-3 text-sm font-semibold hover:bg-muted">
          All categories
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/products?category=${encodeURIComponent(c)}`}
            className="flex h-11 items-center whitespace-nowrap rounded-md px-3 text-sm text-neutral-700 hover:bg-muted"
          >
            {c}
          </Link>
        ))}
      </nav>
    </header>
  );
}
