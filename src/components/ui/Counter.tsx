"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Counter({ end, className }: { end: string | number; className?: string }) {
  // Placeholder for animated counter component (ScrollTrigger count up)
  return <span className={cn(className)}>{end}</span>;
}
