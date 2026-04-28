import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white border border-gray-200 rounded-2xl transition-all duration-500",
        "hover:shadow-brand hover:-translate-y-2",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
