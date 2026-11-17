"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LayoutDashboard, Package, Settings, ShoppingBag, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import { SiteName } from "@/components/site-name";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/products";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "#", label: "Customers", icon: Users },
  { href: "#", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-w-0 flex-[1_1_240px] flex-col gap-4 border-r bg-muted/60 p-3">
      <Link href="/admin" className="flex min-h-11 items-center gap-2.5 rounded-lg px-2">
        <Logo size={48} aria-hidden />
        <span className="flex flex-col leading-tight">
          <SiteName className="text-base font-bold tracking-tight" />
          <span className="text-xs text-muted-foreground">Admin panel</span>
        </span>
      </Link>

      <nav aria-label="Admin" className="flex flex-col gap-0.5">
        <div className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </div>
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = href !== "#" && (exact ? pathname === href : pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-colors",
                active
                  ? "bg-background font-semibold text-foreground shadow-sm ring-1 ring-black/5"
                  : "text-neutral-700 hover:bg-black/[0.04] hover:text-foreground"
              )}
            >
              <Icon size={16} className="flex-none" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="mb-2 h-px bg-border" />
        <Link
          href="/"
          className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm text-neutral-700 transition-colors hover:bg-black/[0.04] hover:text-foreground"
        >
          <ExternalLink size={16} className="flex-none" />
          View store
        </Link>
      </div>
    </aside>
  );
}
