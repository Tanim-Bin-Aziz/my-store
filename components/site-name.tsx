import { SITE_NAME } from "@/lib/products";

const ACCENT = "#A55CAA";
const SPLIT = 3;

export function SiteName({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="text-foreground">{SITE_NAME.slice(0, SPLIT)}</span>
      <span style={{ color: ACCENT }}>{SITE_NAME.slice(SPLIT)}</span>
    </span>
  );
}
