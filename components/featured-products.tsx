"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const tabs = [
  { id: "all", label: "All" },
  { id: "new", label: "New arrivals" },
  { id: "best", label: "Best sellers" },
] as const;

export function FeaturedProducts() {
  const [tab, setTab] = React.useState<(typeof tabs)[number]["id"]>("all");
  const shown = (tab === "all" ? products : products.filter((p) => p.tags.includes(tab))).slice(0, 8);

  return (
    <section id="products" className="container pt-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Featured products</h2>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Button
              key={t.id}
              size="sm"
              variant={tab === t.id ? "default" : "outline"}
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
