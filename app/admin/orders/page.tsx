"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/admin/status-badge";
import { TabBar } from "@/components/admin/tab-bar";
import { districts, orderStatuses, orders, type OrderStatus } from "@/lib/admin-data";
import { formatPrice } from "@/lib/utils";

const tabs = ["All", ...orderStatuses] as const;

export default function AdminOrdersPage() {
  const [tab, setTab] = React.useState<"All" | OrderStatus>("All");
  const [q, setQ] = React.useState("");
  const [pay, setPay] = React.useState("All payments");
  const [district, setDistrict] = React.useState("All districts");

  const list = orders.filter(
    (o) =>
      (tab === "All" || o.status === tab) &&
      (pay === "All payments" || o.payment === pay) &&
      (district === "All districts" || o.district === district) &&
      (!q || o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Orders</h1>
          <div className="text-muted-foreground">{list.length} orders shown</div>
        </div>
        <Button variant="outline">
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      <section aria-label="Orders list" className="overflow-hidden rounded-xl border bg-background">
        <TabBar tabs={tabs} value={tab} onChange={setTab} />

        <div className="flex flex-wrap gap-3 border-b px-5 py-4">
          <Input
            aria-label="Search orders"
            placeholder="Order ID or customer"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-[320px] flex-[1_1_220px]"
          />
          <Select aria-label="Payment method" className="w-auto" value={pay} onChange={(e) => setPay(e.target.value)}>
            <option>All payments</option>
            <option>Cash on delivery</option>
            <option>bKash</option>
            <option>Card</option>
          </Select>
          <Select aria-label="District" className="w-auto" value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option>All districts</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-neutral-50 text-xs font-semibold text-neutral-600">
              <tr>
                <th className="px-5 py-2.5">Order</th>
                <th className="px-5 py-2.5">Customer</th>
                <th className="px-5 py-2.5">Date</th>
                <th className="px-5 py-2.5">Payment</th>
                <th className="px-5 py-2.5">Total</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-5 py-3 font-semibold">{o.id}</td>
                  <td className="px-5 py-3">
                    {o.customer}
                    <div className="text-xs text-muted-foreground">
                      {o.district} · {o.phone}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{o.date}</td>
                  <td className="px-5 py-3">{o.payment}</td>
                  <td className="px-5 py-3 font-medium">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3">
                    {/* TODO: link to /admin/orders/[id] */}
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <div className="px-5 py-10 text-center text-muted-foreground">No orders found.</div>}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3">
          <div className="text-[13px] text-muted-foreground">
            Showing {list.length} of {orders.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" disabled>
              Next
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
