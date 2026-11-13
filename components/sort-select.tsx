"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/input";

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-muted-foreground">
        Sort by
      </label>
      <Select
        id="sort"
        className="w-auto"
        value={params.get("sort") ?? "featured"}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          next.set("sort", e.target.value);
          router.push(`/products?${next.toString()}`);
        }}
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </Select>
    </div>
  );
}
