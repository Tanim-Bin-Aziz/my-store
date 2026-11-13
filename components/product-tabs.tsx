"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

const tabs = [
  { id: "desc", label: "Description" },
  { id: "specs", label: "Specifications" },
  { id: "ship", label: "Delivery & returns" },
] as const;

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = React.useState<(typeof tabs)[number]["id"]>("desc");

  return (
    <section aria-label="More information" className="mt-10">
      <div className="flex gap-1 overflow-x-auto border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "h-11 whitespace-nowrap border-b-2 px-4 text-sm",
              tab === t.id ? "border-primary font-semibold" : "border-transparent text-muted-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="max-w-3xl py-5 text-neutral-700">
        {tab === "desc" && <p>{product.description}</p>}
        {tab === "specs" && (
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] overflow-hidden rounded-xl border">
            {product.specs.map((s, i) => {
              const last = i === product.specs.length - 1;
              return (
                <React.Fragment key={s.label}>
                  <div className={cn("bg-neutral-50 px-4 py-3 font-semibold", !last && "border-b")}>{s.label}</div>
                  <div className={cn("px-4 py-3", !last && "border-b")}>{s.value}</div>
                </React.Fragment>
              );
            })}
          </div>
        )}
        {tab === "ship" && <p>[Delivery time, delivery charges, return and replacement rules.]</p>}
      </div>
    </section>
  );
}
