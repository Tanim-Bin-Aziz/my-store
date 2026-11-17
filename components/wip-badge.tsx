import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function WipBadge({ className }: { className?: string }) {
  return (
    <span
      role="status"
      title="This section is unavailable while we reconnect to the backend."
      className={cn(
        "pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50/95 px-2.5 py-1 text-[11px] font-semibold text-amber-800 shadow-sm backdrop-blur",
        className
      )}
    >
      <TriangleAlert size={12} aria-hidden="true" />
      Work in progress
    </span>
  );
}
