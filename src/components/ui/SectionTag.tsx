import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionTag({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-pill bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
