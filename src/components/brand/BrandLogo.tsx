import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  href?: string;
  onClick?: () => void;
  inverse?: boolean;
};

export function BrandLogo({
  className,
  markClassName,
  textClassName,
  href = "/",
  onClick,
  inverse = false,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("group flex shrink-0 items-center gap-3", className)} onClick={onClick} aria-label="Studify">
      <Image
        src="/brand/studify-logo-1.png"
        alt=""
        width={512}
        height={512}
        className={cn("h-10 w-10 rounded-xl object-contain", markClassName)}
      />
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight transition-colors group-hover:text-brand",
          inverse ? "text-white" : "text-primary",
          textClassName
        )}
      >
        Studify
      </span>
    </Link>
  );
}
