import Link from "next/link";
import { SiteName } from "@/components/site-name";
import { SITE_NAME } from "@/lib/products";

const linkClass = "flex min-h-8 items-center text-neutral-600 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-neutral-50">
      <div className="container py-10">
        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <div className="flex min-w-[260px] flex-[2_1_260px] flex-col gap-3">
            <div className="text-lg font-bold tracking-tight"><SiteName /></div>
            <p className="max-w-xs text-muted-foreground">
              Quality products imported from China, delivered across Bangladesh.
            </p>
          </div>
          <div className="flex flex-[1_1_140px] flex-col gap-1">
            <div className="mb-1 font-semibold">Shop</div>
            <Link href="/products" className={linkClass}>All products</Link>
            <Link href="/products?tag=new" className={linkClass}>New arrivals</Link>
            <Link href="/products?tag=best" className={linkClass}>Best sellers</Link>
          </div>
          <div className="flex flex-[1_1_140px] flex-col gap-1">
            <div className="mb-1 font-semibold">Help</div>
            <span className={linkClass}>Delivery info</span>
            <span className={linkClass}>Returns</span>
            <span className={linkClass}>Track order</span>
          </div>
          <div className="flex flex-[1_1_200px] flex-col gap-1">
            <div className="mb-1 font-semibold">Contact</div>
            <span className={linkClass}>[Phone number]</span>
            <span className={linkClass}>[Email address]</span>
            <span className={linkClass}>[Shop address]</span>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
