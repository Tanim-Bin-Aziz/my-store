import { Suspense } from "react";
import Link from "next/link";
import { Gift, Headphones, Home, LayoutGrid, Shirt, Smartphone, Sparkles, Watch, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { SortSelect } from "@/components/sort-select";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata = { title: "All products" };

const categoryIcons: Record<string, typeof LayoutGrid> = {
  Electronics: Smartphone,
  Audio: Headphones,
  "Home & Kitchen": Home,
  Fashion: Shirt,
  Watches: Watch,
  "Tools & DIY": Wrench,
  "Beauty & Care": Sparkles,
  "Gifts & Toys": Gift,
};

const iconFor = (category?: string) => (category && categoryIcons[category]) || LayoutGrid;

type SearchParams = {
  category?: string;
  q?: string;
  tag?: string;
  sort?: string;
  min?: string;
  max?: string;
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const min = sp.min ? Number(sp.min) : undefined;
  const max = sp.max ? Number(sp.max) : undefined;
  const q = sp.q?.toLowerCase().trim();

  let list = products.filter(
    (p) =>
      (!sp.category || p.category === sp.category) &&
      (!sp.tag || p.tags.includes(sp.tag as "new" | "best")) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
      (min === undefined || Number.isNaN(min) || p.price >= min) &&
      (max === undefined || Number.isNaN(max) || p.price <= max)
  );
  if (sp.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sp.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const hrefFor = (category?: string) => {
    const next = new URLSearchParams();
    if (category) next.set("category", category);
    if (sp.sort) next.set("sort", sp.sort);
    const s = next.toString();
    return s ? `/products?${s}` : "/products";
  };

  return (
    <main className="container pt-4">
      <nav aria-label="Breadcrumb" className="flex min-h-11 items-center gap-2 text-[13px] text-muted-foreground">
        <Link href="/" className="underline">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-foreground">{sp.category ?? "All products"}</span>
      </nav>

      <div className="mb-6 mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">{sp.category ?? "All products"}</h1>
          <div className="text-muted-foreground">{list.length} products</div>
        </div>
        <Suspense>
          <SortSelect />
        </Suspense>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <aside aria-label="Filters" className="order-2 flex min-w-0 max-w-full flex-[1_1_220px] flex-col lg:order-none">
          <div className="rounded-xl bg-muted/60 p-2">
            <div className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Categories
            </div>
            <nav aria-label="Product categories" className="flex flex-col gap-0.5">
              {[undefined, ...categories].map((c) => {
                const active = (sp.category ?? undefined) === c;
                const Icon = iconFor(c);
                return (
                  <Link
                    key={c ?? "all"}
                    href={hrefFor(c)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-colors",
                      active
                        ? "bg-background font-semibold text-foreground shadow-sm ring-1 ring-black/5"
                        : "text-neutral-700 hover:bg-black/[0.04] hover:text-foreground"
                    )}
                  >
                    <Icon size={16} className="flex-none" />
                    <span className="truncate">{c ?? "All products"}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="my-2 h-px bg-border" />

            <form className="px-2.5 pb-1">
              <div className="pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Price (৳)
              </div>
              {sp.category && <input type="hidden" name="category" value={sp.category} />}
              {sp.sort && <input type="hidden" name="sort" value={sp.sort} />}
              <div className="flex items-center gap-2">
                <Input
                  name="min"
                  inputMode="numeric"
                  aria-label="Minimum price"
                  placeholder="Min"
                  defaultValue={sp.min}
                  className="h-9 px-2.5"
                />
                <span aria-hidden="true" className="text-muted-foreground">–</span>
                <Input
                  name="max"
                  inputMode="numeric"
                  aria-label="Maximum price"
                  placeholder="Max"
                  defaultValue={sp.max}
                  className="h-9 px-2.5"
                />
              </div>
              <Button type="submit" variant="outline" size="sm" className="mt-2 w-full">
                Apply
              </Button>
            </form>
          </div>
        </aside>

        <section aria-label="Products" className="order-1 min-w-0 flex-[4_1_560px] lg:order-none">
          {list.length === 0 ? (
            <div className="rounded-xl border p-10 text-center text-muted-foreground">
              No products found. Try another category or search.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-4">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
