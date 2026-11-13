import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full bg-brand/10 px-2.5 text-xs font-semibold text-brand",
        className
      )}
      {...props}
    />
  );
}
