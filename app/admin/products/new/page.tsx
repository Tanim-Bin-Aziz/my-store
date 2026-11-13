"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Package, UploadCloud } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";

const card = "flex flex-col gap-4 rounded-xl border bg-background p-5";
const field = "flex flex-col gap-1.5";

const num = (v: string) => parseFloat(v) || 0;
const money = (v: number) => `${v < 0 ? "-" : ""}৳ ${Math.abs(Math.round(v)).toLocaleString("en-US")}`;

export default function AdminNewProductPage() {
  const [cny, setCny] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [ship, setShip] = React.useState("");
  const [sell, setSell] = React.useState("");
  const [message, setMessage] = React.useState("");

  // Landed cost = China price x exchange rate + shipping/duty per unit.
  const cost = num(cny) * num(rate) + num(ship);
  const price = num(sell);
  const ready = cost > 0 && price > 0;
  const profit = price - cost;

  const save = (status: "draft" | "active") => (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    // TODO: POST the form data to your API (e.g. /api/products) with `status`.
    setMessage(status === "draft" ? "Saved as draft (demo only, nothing is stored yet)." : "Published (demo only, nothing is stored yet).");
  };

  return (
    <form onSubmit={save("active")} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/admin/products" className="inline-flex min-h-11 items-center gap-1 text-[13px] text-muted-foreground">
            <ChevronLeft size={14} />
            Products
          </Link>
          <h1 className="text-[28px] font-bold tracking-tight">Add product</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/products" className={buttonVariants({ variant: "outline" })}>
            Discard
          </Link>
          <Button type="button" variant="outline" onClick={save("draft")}>
            Save as draft
          </Button>
          <Button type="submit">Publish product</Button>
        </div>
      </div>

      {message && (
        <div role="status" className="rounded-lg border bg-background px-4 py-3 text-neutral-700">
          {message}
        </div>
      )}

      <div className="flex flex-wrap items-start gap-5">
        {/* Main column */}
        <div className="flex min-w-0 flex-[2_1_520px] flex-col gap-5">
          <section aria-label="Basic information" className={card}>
            <div className="text-base font-semibold">Basic information</div>
            <div className={field}>
              <Label htmlFor="pname">Product name</Label>
              <Input id="pname" placeholder="e.g. Wireless earbuds" required />
            </div>
            <div className={field}>
              <Label htmlFor="pdesc">Description</Label>
              <Textarea id="pdesc" rows={5} placeholder="What it does, what is in the box, who it is for" />
            </div>
          </section>

          <section aria-label="Images" className={card}>
            <div className="text-base font-semibold">Images</div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-neutral-400 bg-neutral-50 px-4 py-7 text-center">
              <UploadCloud size={28} className="text-neutral-600" />
              <div className="font-medium">Drag images here</div>
              <div className="text-[13px] text-muted-foreground">PNG or JPG, square images look best</div>
              {/* TODO: wire up real uploads (S3, Cloudinary, UploadThing, ...) */}
              <Button type="button" variant="outline" className="mt-1">
                Choose files
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="relative flex aspect-square items-center justify-center rounded-[10px] border-2 border-primary bg-muted text-neutral-400">
                <Package size={28} strokeWidth={1.25} aria-label="Main image placeholder" />
                <span className="absolute left-1.5 top-1.5 flex h-5 items-center rounded-full bg-primary px-2 text-[11px] font-semibold text-primary-foreground">
                  Main
                </span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-[10px] border border-dashed border-neutral-400 bg-neutral-50" />
              ))}
            </div>
          </section>

          <section aria-label="Pricing" className={card}>
            <div>
              <div className="text-base font-semibold">Pricing and profit</div>
              <div className="text-[13px] text-muted-foreground">
                Enter your China purchase cost and the profit is calculated for you.
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <div className={field}>
                <Label htmlFor="cny">Purchase price (¥ CNY)</Label>
                <Input id="cny" inputMode="decimal" placeholder="0" value={cny} onChange={(e) => setCny(e.target.value)} />
              </div>
              <div className={field}>
                <Label htmlFor="rate">Exchange rate (৳ per ¥)</Label>
                <Input id="rate" inputMode="decimal" placeholder="0" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div className={field}>
                <Label htmlFor="ship">Shipping and duty per unit (৳)</Label>
                <Input id="ship" inputMode="decimal" placeholder="0" value={ship} onChange={(e) => setShip(e.target.value)} />
              </div>
              <div className={field}>
                <Label htmlFor="sell">Selling price (৳)</Label>
                <Input id="sell" inputMode="decimal" placeholder="0" value={sell} onChange={(e) => setSell(e.target.value)} />
              </div>
              <div className={field}>
                <Label htmlFor="compare">Compare-at price (৳)</Label>
                <Input id="compare" inputMode="decimal" placeholder="Optional, shown crossed out" />
              </div>
            </div>

            <div aria-live="polite" className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 rounded-xl border bg-neutral-50 p-4">
              <div>
                <div className="text-[13px] text-muted-foreground">Landed cost per unit</div>
                <div className="text-xl font-bold tracking-tight">{money(cost)}</div>
              </div>
              <div>
                <div className="text-[13px] text-muted-foreground">Profit per unit</div>
                <div className={cn("text-xl font-bold tracking-tight", ready && profit < 0 && "text-red-700")}>
                  {ready ? money(profit) : "—"}
                </div>
              </div>
              <div>
                <div className="text-[13px] text-muted-foreground">Margin</div>
                <div className={cn("text-xl font-bold tracking-tight", ready && profit < 0 && "text-red-700")}>
                  {ready ? `${((profit / price) * 100).toFixed(1)}%` : "—"}
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Variants" className={card}>
            <div className="text-base font-semibold">Variants</div>
            <div className={field}>
              <Label htmlFor="colors">Colors</Label>
              <Input id="colors" placeholder="Black, White, Blue" />
              <div className="text-[13px] text-muted-foreground">
                Separate options with a comma. Customers pick one on the product page.
              </div>
            </div>
          </section>
        </div>

        {/* Side column */}
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-5">
          <section aria-label="Status" className={card}>
            <Label htmlFor="status" className="text-base font-semibold">
              Status
            </Label>
            <Select id="status">
              <option>Active</option>
              <option>Draft</option>
            </Select>
            <div className="text-[13px] text-muted-foreground">Draft products are hidden from your store.</div>
          </section>

          <section aria-label="Organization" className={card}>
            <div className="text-base font-semibold">Organization</div>
            <div className={field}>
              <Label htmlFor="cat">Category</Label>
              <Select id="cat">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div className={field}>
              <Label htmlFor="tags">Show in</Label>
              <Select id="tags">
                <option>Regular listing</option>
                <option>New arrivals</option>
                <option>Best sellers</option>
              </Select>
            </div>
          </section>

          <section aria-label="Inventory" className={card}>
            <div className="text-base font-semibold">Inventory</div>
            <div className={field}>
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" placeholder="e.g. EB-001" />
            </div>
            <div className={field}>
              <Label htmlFor="stock">Stock quantity</Label>
              <Input id="stock" inputMode="numeric" placeholder="0" />
            </div>
            <div className={field}>
              <Label htmlFor="low">Low stock alert at</Label>
              <Input id="low" inputMode="numeric" placeholder="5" />
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
