"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LayoutDashboard, Package, Settings, ShoppingBag, Users } from "lucide-react";
import { Logo } from "@/components/logo";
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
    <aside className="flex min-w-0 flex-[1_1_240px] flex-col gap-6 border-r bg-background p-4">
      <Link href="/admin" className="flex min-h-11 items-center gap-2.5">
        <Logo size={48} aria-hidden />
        <span className="flex flex-col leading-tight">
          <span className="text-base font-bold tracking-tight">{SITE_NAME}</span>
          <span className="text-xs text-muted-foreground">Admin panel</span>
        </span>
      </Link>

      <nav aria-label="Admin" className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = href !== "#" && (exact ? pathname === href : pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-lg px-3",
                active ? "bg-muted font-semibold" : "text-neutral-700 hover:bg-muted/60"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-auto flex min-h-11 items-center gap-3 rounded-lg border px-3 font-medium hover:bg-muted/60"
      >
        <ExternalLink size={18} />
        View store
      </Link>
    </aside>
  );
}
