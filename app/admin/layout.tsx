import type { Metadata } from "next";
import { Search } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// TODO: protect /admin (login / middleware) before you deploy.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-wrap items-stretch bg-neutral-50">
      <AdminSidebar />

      <div className="flex min-w-0 flex-[999_1_560px] flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-6 py-3">
          <div className="relative max-w-[420px] flex-[1_1_260px]">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search"
              placeholder="Search orders, products, customers"
              className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-muted-foreground">[Admin name]</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground"
            >
              A
            </span>
          </div>
        </header>

        <main className="flex flex-col gap-6 p-6">{children}</main>
      </div>
    </div>
  );
}
