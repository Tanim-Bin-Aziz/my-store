// Sample data for the admin panel. Replace with your database / API calls.

import { products } from "@/lib/products";

export const orderStatuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"] as const;
export type OrderStatus = (typeof orderStatuses)[number];

export const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Shipped: "bg-violet-100 text-violet-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-neutral-200 text-neutral-700",
};

export type Order = {
  id: string;
  customer: string;
  phone: string;
  district: string;
  payment: "Cash on delivery" | "bKash" | "Card";
  total: number;
  date: string;
  status: OrderStatus;
};

export const orders: Order[] = [
  { id: "#1008", customer: "Customer name", phone: "01XXXXXXXXX", district: "Dhaka", payment: "Cash on delivery", total: 1300, date: "Nov 12", status: "Pending" },
  { id: "#1007", customer: "Customer name", phone: "01XXXXXXXXX", district: "Chattogram", payment: "bKash", total: 2600, date: "Nov 12", status: "Pending" },
  { id: "#1006", customer: "Customer name", phone: "01XXXXXXXXX", district: "Dhaka", payment: "Cash on delivery", total: 1900, date: "Nov 11", status: "Confirmed" },
  { id: "#1005", customer: "Customer name", phone: "01XXXXXXXXX", district: "Sylhet", payment: "bKash", total: 1450, date: "Nov 10", status: "Confirmed" },
  { id: "#1004", customer: "Customer name", phone: "01XXXXXXXXX", district: "Dhaka", payment: "Cash on delivery", total: 6600, date: "Nov 09", status: "Shipped" },
  { id: "#1003", customer: "Customer name", phone: "01XXXXXXXXX", district: "Rajshahi", payment: "Cash on delivery", total: 2000, date: "Nov 08", status: "Delivered" },
  { id: "#1002", customer: "Customer name", phone: "01XXXXXXXXX", district: "Dhaka", payment: "bKash", total: 1000, date: "Nov 07", status: "Delivered" },
  { id: "#1001", customer: "Customer name", phone: "01XXXXXXXXX", district: "Chattogram", payment: "Cash on delivery", total: 1800, date: "Nov 06", status: "Cancelled" },
];

export const districts = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export const LOW_STOCK_LIMIT = 5;

export type AdminProduct = {
  slug: string;
  name: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
  draft: boolean;
};

// Built from the storefront catalog with sample stock numbers.
const sampleStock = [3, 24, 4, 18, 12, 9, 15, 30, 7, 2, 11, 6];
const sampleDrafts = new Set(["portable-blender", "travel-backpack"]);

export const adminProducts: AdminProduct[] = products.map((p, i) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: p.price,
  sku: `SKU-${String(i + 1).padStart(3, "0")}`,
  stock: sampleStock[i % sampleStock.length],
  draft: sampleDrafts.has(p.slug),
}));
