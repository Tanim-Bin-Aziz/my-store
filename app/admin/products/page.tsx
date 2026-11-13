"use client";

import * as React from "react";
import Link from "next/link";
import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { ProductStatusBadge } from "@/components/admin/status-badge";
import { TabBar } from "@/components/admin/tab-bar";
import { LOW_STOCK_LIMIT, adminProducts } from "@/lib/admin-data";
import { categories } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";

const tabs = ["All", "Active", "Draft", "Low stock"] as const;

export default function AdminProductsPage() {
  const [items, setItems] = React.useState(adminProducts);
  const [tab, setTab] = React.useState<(typeof tabs)[number]>("All");
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState("All categories");

  const list = items.filter(
    (p) =>
      (tab === "All" ||
        (tab === "Active" && !p.draft) ||
        (tab === "Draft" && p.draft) ||
        (tab === "Low stock" && p.stock <= LOW_STOCK_LIMIT)) &&
      (category === "All categories" || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Products</h1>
          <div className="text-muted-foreground">{list.length} products shown</div>
        </div>
        <Link href="/admin/products/new" className={buttonVariants()}>
          <Plus size={16} />
          Add product
        </Link>
      </div>

      <section aria-label="Products list" className="overflow-hidden rounded-xl border bg-background">
        <TabBar tabs={tabs} value={tab} onChange={setTab} />

        <div className="flex flex-wrap gap-3 border-b px-5 py-4">
          <Input
            aria-label="Search products"
            placeholder="Search by name or SKU"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-[320px] flex-[1_1_220px]"
          />
          <Select aria-label="Category" className="w-auto" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-neutral-50 text-xs font-semibold text-neutral-600">
              <tr>
                <th className="w-[72px] px-5 py-2.5">
                  <span className="sr-only">Image</span>
                </th>
                <th className="px-5 py-2.5">Product</th>
                <th className="px-5 py-2.5">Category</th>
                <th className="px-5 py-2.5">Price</th>
                <th className="px-5 py-2.5">Stock</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.slug} className="border-t">
                  <td className="px-5 py-3">
                    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-neutral-400">
                      <Package size={20} strokeWidth={1.5} />
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href="/admin/products/new" className="font-semibold">
                      {p.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{p.sku}</div>
                  </td>
                  <td className="px-5 py-3 text-neutral-700">{p.category}</td>
                  <td className="px-5 py-3 font-medium">{formatPrice(p.price)}</td>
                  <td className={cn("px-5 py-3 font-medium", p.stock <= LOW_STOCK_LIMIT && "text-amber-800")}>{p.stock}</td>
                  <td className="px-5 py-3">
                    <ProductStatusBadge draft={p.draft} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex">
                      <Link
                        href="/admin/products/new"
                        aria-label={`Edit ${p.name}`}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                      >
                        <Pencil size={18} />
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${p.name}`}
                        // TODO: call your API to delete, then update the list.
                        onClick={() => setItems((cur) => cur.filter((x) => x.slug !== p.slug))}
                      >
                        <Trash2 size={18} className="text-muted-foreground" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <div className="px-5 py-10 text-center text-muted-foreground">No products here.</div>}
        </div>
      </section>
    </>
  );
}
