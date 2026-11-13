import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Gift,
  Headphones,
  Home,
  Package,
  RotateCcw,
  Shirt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
  Truck,
  Watch,
  Wrench,
  MessageCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeaturedProducts } from "@/components/featured-products";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";

const categoryIcons = [
  { name: "Electronics", icon: Smartphone },
  { name: "Audio", icon: Headphones },
  { name: "Home & Kitchen", icon: Home },
  { name: "Fashion", icon: Shirt },
  { name: "Watches", icon: Watch },
  { name: "Tools & DIY", icon: Wrench },
  { name: "Beauty & Care", icon: Sparkles },
  { name: "Gifts & Toys", icon: Gift },
];

const trust = [
  { icon: Truck, title: "Fast delivery", text: "Doorstep delivery with order tracking." },
  { icon: ShieldCheck, title: "Quality checked", text: "Inspected before it reaches you." },
  { icon: RotateCcw, title: "Easy returns", text: "Simple replacement if something is wrong." },
  { icon: MessageCircle, title: "Friendly support", text: "Chat with us any time you need help." },
];

const steps = [
  { n: "01", title: "Choose what you like", text: "Browse the catalog and add your favourites to the cart." },
  { n: "02", title: "We import and check", text: "Your order is sourced from China and inspected on arrival." },
  { n: "03", title: "Delivered to you", text: "Pay online or on delivery, and track your parcel to your door." },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="container pt-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex min-w-0 flex-[2_1_560px] flex-wrap items-center gap-6 rounded-2xl border bg-muted p-5 sm:p-8">
            <div className="flex min-w-0 flex-[1_1_300px] flex-col items-start gap-4">
              <Badge className="h-7 px-3">New arrivals just landed</Badge>
              <h1 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-tight">
                Smart finds from China, delivered to your door
              </h1>
              <p className="max-w-[440px] text-base text-neutral-600">
                Browse our latest imports across electronics, home, fashion and more. Simple ordering, honest prices.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/products" className={buttonVariants()}>
                  Shop all products <ArrowRight size={16} />
                </Link>
                <Link href="/products" className={buttonVariants({ variant: "outline" })}>
                  Browse categories
                </Link>
              </div>
            </div>
            <ProductImage
              alt="Featured product"
              iconSize={72}
              className="min-h-[240px] min-w-0 flex-[1_1_240px] rounded-xl border bg-background"
            />
          </div>

          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
            <Link href="/products?tag=new" className="flex flex-1 flex-col justify-between gap-4 rounded-2xl border p-6 hover:bg-muted/50">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-muted text-brand">
                <Package size={20} />
              </span>
              <span>
                <span className="block text-base font-semibold">New arrivals</span>
                <span className="block text-[13px] text-muted-foreground">Fresh stock, added every week.</span>
              </span>
            </Link>
            <Link href="/products?tag=best" className="flex flex-1 flex-col justify-between gap-4 rounded-2xl border p-6 hover:bg-muted/50">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-muted text-brand">
                <Flame size={20} />
              </span>
              <span>
                <span className="block text-base font-semibold">Best sellers</span>
                <span className="block text-[13px] text-muted-foreground">What customers order the most.</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container pt-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-5 rounded-2xl border px-6 py-5">
          {trust.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon size={22} className="mt-0.5 flex-none text-brand" />
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-[13px] text-muted-foreground">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container pt-10">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Shop by category</h2>
          <Link href="/products" className="text-sm font-medium text-neutral-700 underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {categoryIcons.map(({ name, icon: Icon }) => (
            <Link
              key={name}
              href={`/products?category=${encodeURIComponent(name)}`}
              className="flex flex-col gap-3 rounded-xl border p-4 hover:bg-muted/50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-muted text-brand">
                <Icon size={20} />
              </span>
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProducts />

      {/* How it works */}
      <section className="container pt-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">How it works</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-2 rounded-2xl border p-6">
              <span className="text-[13px] font-bold text-brand">{s.n}</span>
              <div className="text-base font-semibold">{s.title}</div>
              <div className="text-muted-foreground">{s.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Request banner */}
      <section className="container pt-10">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary p-8 text-primary-foreground">
          <div className="min-w-0 flex-[1_1_320px]">
            <div className="text-[22px] font-bold tracking-tight">Can&apos;t find a product?</div>
            <div className="mt-1 text-neutral-300">Tell us what you are looking for and we will source it for you.</div>
          </div>
          <Link href="/products" className={cn(buttonVariants({ variant: "light" }))}>
            <Timer size={16} />
            Request a product
          </Link>
        </div>
      </section>
    </main>
  );
}
