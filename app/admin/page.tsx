import Link from "next/link";
import { Clock, DollarSign, Package, Plus, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/admin/status-badge";
import { LOW_STOCK_LIMIT, adminProducts, orderStatuses, orders } from "@/lib/admin-data";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const sales = orders.filter((o) => o.status !== "Cancelled").reduce((a, o) => a + o.total, 0);
  const pending = orders.filter((o) => o.status === "Pending").length;
  const lowStock = adminProducts.filter((p) => p.stock <= LOW_STOCK_LIMIT);

  const stats = [
    { label: "Total sales", value: formatPrice(sales), icon: DollarSign },
    { label: "Orders", value: String(orders.length), icon: ShoppingBag },
    { label: "Pending orders", value: String(pending), icon: Clock },
    { label: "Products", value: String(adminProducts.length), icon: Package },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Dashboard</h1>
          <div className="text-muted-foreground">Overview of your store.</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select aria-label="Date range" className="w-auto">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
          </Select>
          <Link href="/admin/products/new" className={buttonVariants()}>
            <Plus size={16} />
            Add product
          </Link>
        </div>
      </div>

      <section aria-label="Key numbers" className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col gap-3 rounded-xl border bg-background p-5">
            <div className="flex items-center justify-between text-neutral-600">
              <span>{label}</span>
              <Icon size={18} />
            </div>
            <div className="text-[28px] font-bold tracking-tight">{value}</div>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap items-start gap-4">
        <section aria-label="Recent orders" className="min-w-0 flex-[2_1_520px] overflow-hidden rounded-xl border bg-background">
          <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
            <div className="text-base font-semibold">Recent orders</div>
            <Link href="/admin/orders" className="inline-flex min-h-11 items-center font-medium text-neutral-700 underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-neutral-50 text-xs font-semibold text-neutral-600">
                <tr>
                  <th className="px-5 py-2.5">Order</th>
                  <th className="px-5 py-2.5">Customer</th>
                  <th className="px-5 py-2.5">Payment</th>
                  <th className="px-5 py-2.5">Total</th>
                  <th className="px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-5 py-3 font-semibold">{o.id}</td>
                    <td className="px-5 py-3">
                      {o.customer}
                      <div className="text-xs text-muted-foreground">{o.district}</div>
                    </td>
                    <td className="px-5 py-3">{o.payment}</td>
                    <td className="px-5 py-3 font-medium">{formatPrice(o.total)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
          <section aria-label="Orders by status" className="flex flex-col gap-3 rounded-xl border bg-background p-5">
            <div className="text-base font-semibold">Orders by status</div>
            {orderStatuses.map((s) => (
              <div key={s} className="flex items-center justify-between gap-3">
                <StatusBadge status={s} />
                <span className="font-semibold">{orders.filter((o) => o.status === s).length}</span>
              </div>
            ))}
          </section>

          <section aria-label="Low stock" className="flex flex-col gap-3 rounded-xl border bg-background p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold">Low stock</div>
              <Link href="/admin/products" className="inline-flex min-h-11 items-center font-medium text-neutral-700 underline">
                Manage
              </Link>
            </div>
            {lowStock.length === 0 && <div className="text-muted-foreground">Nothing is running low.</div>}
            {lowStock.map((p) => (
              <div key={p.slug} className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-muted text-neutral-400">
                  <Package size={20} strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1 font-medium">{p.name}</span>
                <span className="text-[13px] font-semibold text-amber-800">{p.stock} left</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
