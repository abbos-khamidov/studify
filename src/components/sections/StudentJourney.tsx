"use client";

import * as React from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/Button";

const STAGES = [
  {
    key: "dream",
    bg: "#FFFFFF",
    title: "Каждый год [35000] молодых узбекистанцев мечтают учиться за рубежом",
  },
  {
    key: "problem",
    bg: "#FFFDF9",
    title: "Но [73%] не знают с чего начать",
  },
  {
    key: "solution",
    bg: "#FFF9F3",
    title: "[Studify] — проводник в мир образования",
  },
  {
    key: "result",
    bg: "#FFF8F2",
    title: "[500+] студентов уже учатся в [12] странах мира",
  },
] as const;

export function StudentJourney() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [stage, setStage] = React.useState(0);

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const pinRef = React.useRef<HTMLDivElement | null>(null);
  const bgRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const numberMainRef = React.useRef<HTMLSpanElement | null>(null);
  const numberSecondaryRef = React.useRef<HTMLSpanElement | null>(null);
  const linePathRef = React.useRef<SVGPathElement | null>(null);
  const straightPathRef = React.useRef<SVGPathElement | null>(null);
  const flagRowRef = React.useRef<HTMLDivElement | null>(null);
  const ctaRef = React.useRef<HTMLAnchorElement | null>(null);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsMobile(media.matches);
    const updateReduced = () => setPrefersReducedMotion(reducedMedia.matches);
    update();
    updateReduced();
    media.addEventListener("change", update);
    reducedMedia.addEventListener("change", updateReduced);
    return () => {
      media.removeEventListener("change", update);
      reducedMedia.removeEventListener("change", updateReduced);
    };
  }, []);

  React.useEffect(() => {
    if (isMobile || prefersReducedMotion || !sectionRef.current || !pinRef.current) return;
    const total = STAGES.length;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: pinRef.current,
      pinSpacing: false,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(total - 1, Math.floor(self.progress * total));
        setStage((prev) => (prev === idx ? prev : idx));
      },
    });
    return () => trigger.kill();
  }, [isMobile, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const layers = bgRefs.current.filter(Boolean) as HTMLDivElement[];
    layers.forEach((layer, idx) => {
      gsap.to(layer, {
        opacity: idx === stage ? 1 : 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    const stageEl = pinRef.current?.querySelector(`[data-stage="${stage}"]`) as HTMLDivElement | null;
    if (stageEl) {
      gsap.fromTo(
        stageEl,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
      );
    }

    if (stage === 0 && numberMainRef.current) {
      const state = { v: 0 };
      gsap.to(state, {
        v: 35000,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          if (numberMainRef.current) numberMainRef.current.textContent = Math.round(state.v).toLocaleString();
        },
      });
    }

    if (stage === 1 && numberMainRef.current) {
      const state = { v: 0 };
      gsap.to(state, {
        v: 73,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: () => {
          if (numberMainRef.current) numberMainRef.current.textContent = `${Math.round(state.v)}%`;
        },
      });
      if (linePathRef.current) {
        const length = linePathRef.current.getTotalLength();
        linePathRef.current.style.strokeDasharray = `${length}`;
        gsap.fromTo(linePathRef.current, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" });
      }
    }

    if (stage === 2 && straightPathRef.current) {
      gsap.fromTo(straightPathRef.current, { opacity: 0, scaleX: 0.7 }, { opacity: 1, scaleX: 1, duration: 0.55, ease: "power3.out" });
    }

    if (stage === 3) {
      if (numberMainRef.current) {
        const s = { v: 0 };
        gsap.to(s, {
          v: 500,
          duration: 0.75,
          ease: "power2.out",
          onUpdate: () => {
            if (numberMainRef.current) numberMainRef.current.textContent = `${Math.round(s.v)}+`;
          },
        });
      }
      if (numberSecondaryRef.current) {
        const s = { v: 0 };
        gsap.to(s, {
          v: 12,
          duration: 0.65,
          ease: "power2.out",
          onUpdate: () => {
            if (numberSecondaryRef.current) numberSecondaryRef.current.textContent = `${Math.round(s.v)}`;
          },
        });
      }
      if (flagRowRef.current) {
        gsap.fromTo(
          flagRowRef.current.children,
          { scale: 0.4, opacity: 0, y: 16 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: "back.out(1.7)" }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
      }
    }
  }, [stage, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) {
    return (
      <section className="bg-white">
        <div className="h-[100svh] snap-y snap-mandatory overflow-y-auto">
          {STAGES.map((s, idx) => (
            <article
              key={s.key}
              className="flex h-[100svh] snap-start items-center justify-center px-6 text-center"
              style={{ backgroundColor: s.bg }}
            >
              <div className="max-w-[800px]">
                <div className="text-sm font-bold text-brand">Этап {idx + 1}</div>
                <h3 className="mt-4 text-4xl font-extrabold leading-tight text-primary">{s.title.replace(/\[|\]/g, "")}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-clip bg-white" style={{ height: `${STAGES.length * 100}vh` }}>
      <div ref={pinRef} className="relative h-screen">
        {STAGES.map((s, idx) => (
          <div
            key={s.key}
            ref={(el) => {
              bgRefs.current[idx] = el;
            }}
            className="absolute inset-0"
            style={{ backgroundColor: s.bg, opacity: idx === 0 ? 1 : 0 }}
          />
        ))}

        <div className="relative z-10 flex h-full items-center justify-center px-8 text-center">
          <div className="w-full max-w-[800px]">
            {stage === 0 && (
              <div data-stage="0">
                <h2 className="text-5xl font-extrabold leading-tight text-primary lg:text-7xl">
                  Каждый год <span ref={numberMainRef} className="text-brand">0</span> молодых узбекистанцев мечтают учиться за рубежом
                </h2>
                <div className="mx-auto mt-10 flex w-full max-w-[340px] flex-wrap justify-center gap-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className="journey-dot" />
                  ))}
                </div>
              </div>
            )}

            {stage === 1 && (
              <div data-stage="1">
                <h2 className="text-5xl font-extrabold leading-tight text-primary lg:text-7xl">
                  Но <span ref={numberMainRef} className="text-brand">0%</span> не знают с чего начать
                </h2>
                <svg viewBox="0 0 320 90" className="mx-auto mt-10 h-20 w-[320px]">
                  <path ref={linePathRef} d="M10,70 C60,10 130,85 180,35 C220,0 280,70 310,20" stroke="#C4B6A8" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            )}

            {stage === 2 && (
              <div data-stage="2">
                <h2 className="text-5xl font-extrabold leading-tight text-primary lg:text-7xl">
                  <span className="text-brand">Studify</span> — проводник в мир образования
                </h2>
                <svg viewBox="0 0 320 90" className="mx-auto mt-10 h-20 w-[320px]">
                  <path ref={straightPathRef} d="M10,45 L290,45" stroke="#FF8225" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M290,45 L270,32 M290,45 L270,58" stroke="#FF8225" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            )}

            {stage === 3 && (
              <div data-stage="3">
                <h2 className="text-5xl font-extrabold leading-tight text-primary lg:text-7xl">
                  <span ref={numberMainRef} className="text-brand">0+</span> студентов уже учатся в{" "}
                  <span ref={numberSecondaryRef} className="text-brand">0</span> странах мира
                </h2>
                <div ref={flagRowRef} className="mt-10 flex items-center justify-center gap-3">
                  {["🇰🇷", "🇹🇷", "🇬🇧", "🇲🇾", "🇫🇷", "🇩🇪"].map((flag) => (
                    <span key={flag} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                      {flag}
                    </span>
                  ))}
                </div>
                <Link
                  ref={ctaRef}
                  href="/quiz"
                  className={`${buttonVariants({ size: "lg", className: "mt-10 px-10" })}`}
                >
                  Стать следующим →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .journey-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 130, 37, 0.5);
          animation: drift 4.5s ease-in-out infinite;
        }
        .journey-dot:nth-child(3n) {
          animation-duration: 5.8s;
        }
        .journey-dot:nth-child(4n) {
          animation-duration: 6.4s;
        }
        @keyframes drift {
          0% {
            transform: translateY(0);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-14px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
}
