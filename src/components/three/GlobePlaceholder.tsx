import { cn } from "@/lib/utils";

export function GlobePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full min-h-[280px] aspect-square max-w-[520px] mx-auto rounded-full",
        "bg-gradient-to-br from-brand-subtle via-brand-light to-brand-subtle/80",
        "ring-1 ring-brand/10 shadow-lg animate-pulse",
        className
      )}
      aria-hidden
    />
  );
}
