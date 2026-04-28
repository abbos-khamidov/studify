"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.2,
      smoothWheel: true,
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });
    const unsubscribeScroll = lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribeScroll();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
