import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

// Shows the real image if the product has one, otherwise a neutral placeholder.
export function ProductImage({
  src,
  alt,
  className,
  iconSize = 52,
}: {
  src?: string;
  alt: string;
  className?: string;
  iconSize?: number;
}) {
  return (
    <div className={cn("flex items-center justify-center overflow-hidden bg-muted text-neutral-400", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <Package width={iconSize} height={iconSize} strokeWidth={1.25} aria-hidden="true" />
      )}
    </div>
  );
}
