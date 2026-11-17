import { MessageCircle, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const trust = [
  { icon: Truck, title: "Fast delivery", text: "Doorstep delivery with order tracking." },
  { icon: ShieldCheck, title: "Quality checked", text: "Inspected before it reaches you." },
  { icon: RotateCcw, title: "Easy returns", text: "Simple replacement if something is wrong." },
  { icon: MessageCircle, title: "Friendly support", text: "Chat with us any time you need help." },
];

export function TrustStrip() {
  return (
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
  );
}

const steps = [
  { n: "01", title: "Choose what you love", text: "Browse preserved blooms, bouquets, and craft gifts in our collection." },
  { n: "02", title: "We arrange and pack", text: "Each piece is hand-prepared with care and wrapped for safe delivery." },
  { n: "03", title: "Delivered to you", text: "Pay online or on delivery, and track your parcel to your door." },
];

export function HowItWorks() {
  return (
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
  );
}
