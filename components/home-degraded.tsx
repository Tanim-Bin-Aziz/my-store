import Link from "next/link";
import { Timer, TriangleAlert } from "lucide-react";
import { Logo } from "@/components/logo";
import { SiteName } from "@/components/site-name";
import { buttonVariants } from "@/components/ui/button";
import { SkeletonBlock, SkeletonProductCard } from "@/components/skeleton";
import { WipBadge } from "@/components/wip-badge";
import { TrustStrip, HowItWorks } from "@/components/home-static";
import { cn } from "@/lib/utils";

// Degraded homepage shown when the backend/database is unreachable.
// Mirrors the normal homepage structure: data-driven (dynamic) sections render
// as skeletons with a "Work in progress" badge in front; static sections still work.
export function DegradedHome() {
  return (
    <main>
      {/* Outage notice */}
      <div className="container pt-4">
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-[13px] font-medium text-amber-900"
        >
          <TriangleAlert size={16} className="flex-none" aria-hidden="true" />
          Our database is temporarily unavailable. Some sections are being updated — please check back soon.
        </div>
      </div>

      {/* Site name, shown prominently while the page can't be personalised */}
      <section className="container pt-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3 sm:gap-4">
          <Logo size={56} className="text-foreground" />
          <SiteName className="text-4xl font-extrabold tracking-tight sm:text-5xl" />
        </Link>
        <p className="mt-2 text-muted-foreground">Handcrafted flowers &amp; gifts, made to delight.</p>
      </section>

      {/* Hero (dynamic) — skeleton */}
      <section aria-label="Featured collection" aria-busy="true" className="container pt-6">
        <div className="relative overflow-hidden rounded-2xl">
          <WipBadge />
          <div className="flex flex-wrap gap-4">
            <div className="flex min-w-0 flex-[2_1_560px] flex-wrap items-center gap-6 rounded-2xl border bg-muted p-5 sm:p-8">
              <div className="flex min-w-0 flex-[1_1_300px] flex-col items-start gap-4">
                <SkeletonBlock className="h-7 w-40 rounded-full" />
                <SkeletonBlock className="h-9 w-full max-w-[380px]" />
                <SkeletonBlock className="h-9 w-3/4 max-w-[300px]" />
                <SkeletonBlock className="h-4 w-full max-w-[420px]" />
                <SkeletonBlock className="h-4 w-2/3 max-w-[280px]" />
                <div className="flex flex-wrap gap-2 pt-1">
                  <SkeletonBlock className="h-10 w-36 rounded-md" />
                  <SkeletonBlock className="h-10 w-36 rounded-md" />
                </div>
              </div>
              <SkeletonBlock className="min-h-[240px] min-w-0 flex-[1_1_240px] rounded-xl" />
            </div>
            <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
              <SkeletonBlock className="min-h-[140px] flex-1 rounded-2xl" />
              <SkeletonBlock className="min-h-[140px] flex-1 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Categories (dynamic) — skeleton */}
      <section id="categories" aria-label="Shop by category" aria-busy="true" className="container pt-10">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Shop by category</h2>
        </div>
        <div className="relative rounded-2xl">
          <WipBadge />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-[104px] rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products (dynamic) — skeleton */}
      <section id="products" aria-label="Featured products" aria-busy="true" className="container pt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Featured products</h2>
          <div className="flex flex-wrap gap-2">
            <SkeletonBlock className="h-8 w-14 rounded-md" />
            <SkeletonBlock className="h-8 w-28 rounded-md" />
            <SkeletonBlock className="h-8 w-24 rounded-md" />
          </div>
        </div>
        <div className="relative rounded-2xl">
          <WipBadge />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Request banner — static, still works */}
      <section className="container pt-10 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary p-8 text-primary-foreground">
          <div className="min-w-0 flex-[1_1_320px]">
            <div className="text-[22px] font-bold tracking-tight">Can&apos;t find the perfect piece?</div>
            <div className="mt-1 text-neutral-300">Tell us what you have in mind and we&apos;ll craft something special for you.</div>
          </div>
          <Link href="/products" className={cn(buttonVariants({ variant: "light" }))}>
            <Timer size={16} />
            Request a custom piece
          </Link>
        </div>
      </section>
    </main>
  );
}
