import Link from "next/link";
import { notFound } from "next/navigation";
import { Banknote, RotateCcw, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductTabs } from "@/components/product-tabs";
import { formatPrice } from "@/lib/utils";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getProduct(slug)?.name ?? "Product" };
}

const delivery = [
  { icon: Truck, title: "Delivery in [X] days", text: "Charge [amount] inside Dhaka, [amount] outside." },
  { icon: Banknote, title: "Cash on delivery", text: "Pay when the parcel reaches you." },
  { icon: RotateCcw, title: "[X]-day return", text: "Replacement if the item is damaged or wrong." },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <main className="container pt-4">
      <nav aria-label="Breadcrumb" className="flex min-h-11 flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
        <Link href="/" className="underline">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products" className="underline">All products</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-start gap-8">
        <section aria-label="Product images" className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
          <ProductImage src={product.image} alt={product.name} iconSize={96} className="aspect-square rounded-2xl border" />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <ProductImage
                key={i}
                src={product.image}
                alt={`${product.name} view ${i + 1}`}
                iconSize={28}
                className={i === 0 ? "aspect-square rounded-xl border-2 border-primary" : "aspect-square rounded-xl border"}
              />
            ))}
          </div>
        </section>

        <section aria-label="Product details" className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <Badge className="h-7 px-3">In stock</Badge>
            <h1 className="text-3xl font-bold leading-tight tracking-tight">{product.name}</h1>
            <div className="text-muted-foreground">{product.category} · SKU [SKU code]</div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-tight">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
            )}
          </div>

          <p className="max-w-[520px] text-neutral-700">{product.description}</p>

          <div className="border-t pt-5">
            <ProductPurchase product={product} />
          </div>

          <div className="flex flex-col gap-3.5 rounded-xl border p-4">
            {delivery.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon size={20} className="mt-0.5 flex-none text-brand" />
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-[13px] text-muted-foreground">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ProductTabs product={product} />

      <section aria-label="Related products" className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">You may also like</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-4">
          {related.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="overflow-hidden rounded-lg border">
              <ProductImage src={p.image} alt={p.name} iconSize={44} className="aspect-square" />
              <div className="p-3">
                <div className="text-xs text-muted-foreground">{p.category}</div>
                <div className="mt-0.5 font-semibold">{p.name}</div>
                <div className="mt-2 font-bold">{formatPrice(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
