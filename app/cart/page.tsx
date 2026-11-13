"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronLeft, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/components/cart-provider";
import { cn, formatPrice } from "@/lib/utils";

const payments = [
  { id: "cod", label: "Cash on delivery", note: "Pay when the parcel reaches you." },
  { id: "bkash", label: "bKash", note: "Pay online with your bKash number." },
  { id: "card", label: "Card", note: "Visa, Mastercard and other cards." },
];

const districts = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function CartPage() {
  const { lines, count, subtotal, delivery, total, setQty, remove, clear } = useCart();
  const [pay, setPay] = React.useState("cod");
  const [placed, setPlaced] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lines.length === 0) return;
    // TODO: send the order to your backend here (POST /api/orders with form data + lines + payment method).
    clear();
    setPlaced(true);
  };

  return (
    <main className="container pt-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Cart &amp; checkout</h1>
          <div className="text-muted-foreground">{count} items in your cart</div>
        </div>
        <Link href="/products" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-neutral-700">
          <ChevronLeft size={16} />
          Continue shopping
        </Link>
      </div>

      {placed ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border px-6 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Check size={28} strokeWidth={2.5} />
          </span>
          <h2 className="text-[22px] font-bold tracking-tight">Order placed</h2>
          <p className="max-w-[420px] text-muted-foreground">
            Thank you. We will call you to confirm your order and delivery time.
          </p>
          <Link href="/" className={cn(buttonVariants(), "mt-2")}>
            Back to home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-6">
            {/* Items */}
            <section aria-label="Cart items" className="overflow-hidden rounded-2xl border">
              <div className="border-b px-5 py-4 text-base font-semibold">Your items</div>
              {lines.map((l) => (
                <div key={`${l.slug}-${l.color}`} className="flex flex-wrap items-center gap-4 border-b px-5 py-4">
                  <ProductImage src={l.product.image} alt={l.product.name} iconSize={28} className="h-[72px] w-[72px] flex-none rounded-[10px]" />
                  <div className="min-w-0 flex-[1_1_180px]">
                    <Link href={`/products/${l.slug}`} className="font-semibold">{l.product.name}</Link>
                    <div className="text-[13px] text-muted-foreground">{l.color}</div>
                    <div className="mt-1 font-semibold">{formatPrice(l.product.price)}</div>
                  </div>
                  <div className="inline-flex items-center rounded-md border">
                    <Button type="button" variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQty(l.slug, l.color, l.qty - 1)}>
                      <Minus size={16} />
                    </Button>
                    <span aria-live="polite" className="min-w-8 text-center font-semibold">{l.qty}</span>
                    <Button type="button" variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQty(l.slug, l.color, l.qty + 1)}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <Button type="button" variant="ghost" size="icon" aria-label="Remove item" onClick={() => remove(l.slug, l.color)}>
                    <Trash2 size={18} className="text-muted-foreground" />
                  </Button>
                </div>
              ))}
              {lines.length === 0 && (
                <div className="px-5 py-8 text-center text-muted-foreground">
                  Your cart is empty.{" "}
                  <Link href="/products" className="font-medium text-foreground underline">
                    Browse products
                  </Link>
                </div>
              )}
            </section>

            {/* Delivery */}
            <section aria-label="Delivery details" className="flex flex-col gap-4 rounded-2xl border p-5">
              <div className="text-base font-semibold">Delivery details</div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="01XXXXXXXXX" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="district">District</Label>
                  <Select id="district" name="district">
                    {districts.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                    <option>Other district</option>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="address">Full address</Label>
                <Textarea id="address" name="address" rows={3} placeholder="House, road, area" required />
              </div>
            </section>

            {/* Payment */}
            <section aria-label="Payment method" className="flex flex-col gap-3 rounded-2xl border p-5">
              <div className="text-base font-semibold">Payment method</div>
              {payments.map((p) => {
                const active = pay === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPay(p.id)}
                    className={cn(
                      "flex min-h-14 w-full items-center gap-3 rounded-xl bg-background px-4 py-2 text-left",
                      active ? "border-2 border-primary" : "border"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 flex-none items-center justify-center rounded-full border-2",
                        active ? "border-primary" : "border-neutral-400"
                      )}
                    >
                      {active && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                    </span>
                    <span className="flex flex-col">
                      <span className={active ? "font-semibold" : "font-medium"}>{p.label}</span>
                      <span className="text-[13px] text-muted-foreground">{p.note}</span>
                    </span>
                  </button>
                );
              })}
            </section>
          </div>

          {/* Summary */}
          <aside aria-label="Order summary" className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 rounded-2xl border bg-neutral-50 p-5">
            <div className="text-base font-semibold">Order summary</div>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-neutral-600">Delivery</span>
                <span className="font-medium">{formatPrice(delivery)}</span>
              </div>
              <div className="flex justify-between gap-3 border-t pt-3 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Input aria-label="Coupon code" placeholder="Coupon code" className="min-w-0 flex-1" />
              <Button type="button" variant="outline">Apply</Button>
            </div>
            <Button type="submit" size="lg" disabled={lines.length === 0}>
              Place order
            </Button>
            <div className="flex items-start gap-2 text-[13px] text-muted-foreground">
              <ShieldCheck size={16} className="mt-px flex-none text-brand" />
              <span>We will call to confirm your order before dispatch.</span>
            </div>
          </aside>
        </form>
      )}
    </main>
  );
}
