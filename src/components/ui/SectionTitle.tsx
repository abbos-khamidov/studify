import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  accentWord?: string;
  children: string;
}

export function SectionTitle({ className, accentWord, children, ...props }: SectionTitleProps) {
  if (!accentWord) {
    return (
      <h2 className={cn("text-4xl lg:text-5xl font-extrabold tracking-tight text-primary", className)} {...props}>
        {children}
      </h2>
    );
  }

  const parts = children.split(new RegExp(`(${accentWord})`, "gi"));

  return (
    <h2 className={cn("text-4xl lg:text-5xl font-extrabold tracking-tight text-primary", className)} {...props}>
      {parts.map((part, i) =>
        part.toLowerCase() === accentWord.toLowerCase() ? (
          <span key={i} className="text-brand">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </h2>
  );
}
