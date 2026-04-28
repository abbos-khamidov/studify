import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const buttonVariants = ({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
} = {}) =>
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-pill font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-brand text-white hover:bg-brand-hover": variant === "primary",
      "border border-gray-300 bg-transparent text-primary hover:bg-gray-100": variant === "secondary",
      "bg-transparent text-primary hover:bg-gray-100": variant === "ghost",
      "h-11 px-6": size === "default",
      "h-9 px-4 text-sm": size === "sm",
      "h-14 px-8 text-lg": size === "lg",
    },
    className
  );

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
