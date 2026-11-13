"use client";

import { cn } from "@/lib/utils";

export function TabBar<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b px-3">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={value === t}
          onClick={() => onChange(t)}
          className={cn(
            "h-12 whitespace-nowrap border-b-2 px-3.5 text-sm",
            value === t ? "border-primary font-semibold" : "border-transparent text-muted-foreground"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
