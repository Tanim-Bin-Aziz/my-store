import { cn } from "@/lib/utils";

export function SkeletonBlock({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-background">
      <SkeletonBlock className="aspect-square rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-3">
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-4 w-4/5" />
        <div className="mt-auto flex items-center justify-between gap-2">
          <SkeletonBlock className="h-5 w-20" />
          <SkeletonBlock className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
