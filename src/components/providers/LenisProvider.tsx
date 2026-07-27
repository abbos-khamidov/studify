"use client";

import { useEffect, type ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    let rafId = 0;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    async function startSmoothScroll() {
      const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("@/lib/gsap")]);
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.08,
        duration: 1,
        smoothWheel: true,
      });

      ScrollTrigger.defaults({ scroller: document.documentElement });
      const unsubscribeScroll = lenis.on("scroll", ScrollTrigger.update);

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        unsubscribeScroll();
        lenis.destroy();
      };
    }

    startSmoothScroll();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
