import { cn } from "@/lib/utils";
import { statusStyles, type OrderStatus } from "@/lib/admin-data";

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

export function ProductStatusBadge({ draft }: { draft: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold",
        draft ? "bg-neutral-200 text-neutral-700" : "bg-green-100 text-green-800"
      )}
    >
      {draft ? "Draft" : "Active"}
    </span>
  );
}
