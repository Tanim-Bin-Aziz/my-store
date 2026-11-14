"use client";

import Link from "next/link";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/logo";
import { SiteName } from "@/components/site-name";
import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { SITE_NAME, categories } from "@/lib/products";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="border-b bg-background">
      <div className="container py-2.5 sm:py-3">
        <div className="flex items-center gap-1.5 sm:gap-4">
          <Link href="/" aria-label={SITE_NAME} className="flex flex-none items-center gap-2.5">
            <Logo size={44} aria-hidden />
            <SiteName className="hidden text-lg font-bold tracking-tight sm:inline" />
          </Link>

          <form action="/products" role="search" className="relative min-w-0 flex-1 sm:mx-auto sm:max-w-[560px]">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              aria-label="Search products"
              placeholder="Search products, brands, categories"
              className="h-11 w-full min-w-0 rounded-md border border-input bg-background pl-10 pr-3 text-base placeholder:text-muted-foreground sm:text-sm"
            />
          </form>

          <div className="flex flex-none items-center">
            <UserMenu />
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden h-11 w-11 sm:inline-flex">
              <Heart size={20} />
            </Button>
            <Link
              href="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative flex h-11 w-11 flex-none items-center justify-center gap-2 rounded-md hover:bg-muted sm:w-auto sm:border sm:px-3.5"
            >
              <ShoppingCart size={20} />
              <span className="hidden text-sm font-medium sm:inline">Cart</span>
              <span className="absolute -right-0.5 -top-0.5 flex h-[20px] min-w-[20px] items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-[11px] font-semibold text-primary-foreground sm:static sm:h-[22px] sm:min-w-[22px] sm:border-0 sm:px-1.5 sm:text-xs">
                {count}
              </span>
            </Link>
          </div>
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
