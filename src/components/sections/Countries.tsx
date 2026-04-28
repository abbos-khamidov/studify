"use client";

import * as React from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { countries } from "@/lib/countries";

const LOCAL_NAMES: Record<string, string> = {
  korea: "한국",
  turkey: "Türkiye",
  uk: "United Kingdom",
  malaysia: "Malaysia",
  france: "France",
  germany: "Deutschland",
};

const COUNTRY_GRADIENTS: Record<string, string> = {
  korea: "linear-gradient(135deg, #ffe4e6 0%, #fff1f2 100%)",
  turkey: "linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)",
  uk: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
  malaysia: "linear-gradient(135deg, #fefce8 0%, #fffbeb 100%)",
  france: "linear-gradient(135deg, #f0f9ff 0%, #eff6ff 100%)",
  germany: "linear-gradient(135deg, #f1f5f9 0%, #f9fafb 100%)",
};

function scholarshipPill(text: string) {
  if (text.includes("GKS")) return "Стипендии GKS";
  if (text.includes("DAAD")) return "Стипендии DAAD";
  if (text.includes("Chevening")) return "Стипендии Chevening";
  if (text.includes("Burslari")) return "Стипендии Türkiye";
  if (text.includes("MIS")) return "Стипендии MIS";
  if (text.includes("Eiffel")) return "Стипендии Eiffel";
  return "Гранты и стипендии";
}

export function Countries() {
  const items = React.useMemo(() => countries.slice(0, 6), []);
  const [isMobile, setIsMobile] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const pinRef = React.useRef<HTMLDivElement | null>(null);
  const bgRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const triggerRef = React.useRef<ScrollTrigger | null>(null);
  const triggerStartRef = React.useRef(0);

  const flagRef = React.useRef<HTMLDivElement | null>(null);
  const nameRef = React.useRef<HTMLHeadingElement | null>(null);
  const descRef = React.useRef<HTMLParagraphElement | null>(null);
  const pillsRef = React.useRef<HTMLDivElement | null>(null);
  const ctaRef = React.useRef<HTMLAnchorElement | null>(null);
  const bigNumberRef = React.useRef<HTMLDivElement | null>(null);
  const priceRef = React.useRef<HTMLSpanElement | null>(null);
  const uniRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (isMobile || !sectionRef.current || !pinRef.current) return;
    const total = items.length;
    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          triggerStartRef.current = self.start;
        },
        onUpdate: (self) => {
          const nextIndex = Math.min(total - 1, Math.floor(self.progress * total));
          setCurrentIndex((prev) => (prev === nextIndex ? prev : nextIndex));
        },
      });
    }, sectionRef);
    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
      ctx.revert();
    };
  }, [isMobile, items.length]);

  React.useEffect(() => {
    const layers = bgRefs.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length === 0) return;
    layers.forEach((layer, i) => {
      gsap.to(layer, {
        opacity: i === currentIndex ? 1 : 0,
        duration: 0.55,
        ease: "power2.out",
      });
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(flagRef.current, { opacity: 0, scale: 0.2, rotate: -14 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.5 })
      .fromTo(nameRef.current, { clipPath: "inset(0 100% 0 0)", x: -24 }, { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.6 }, "-=0.2")
      .fromTo(descRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.35 }, "-=0.3")
      .fromTo(pillsRef.current?.children ?? [], { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.28 }, "-=0.2")
      .fromTo(ctaRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.28 }, "-=0.1")
      .fromTo(bigNumberRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.48 }, "-=0.45");

    const country = items[currentIndex];
    const uniTarget = Number(country.uniCount.replace(/\D/g, "")) || 0;
    const priceTarget = Number(country.price.replace(/[^\d]/g, "")) || 0;
    const uniState = { val: 0 };
    const priceState = { val: 0 };
    if (uniRef.current) {
      gsap.to(uniState, {
        val: uniTarget,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: () => {
          if (!uniRef.current) return;
          uniRef.current.textContent = `${Math.round(uniState.val)}+ вузов`;
        },
      });
    }
    if (priceRef.current) {
      gsap.to(priceState, {
        val: priceTarget,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: () => {
          if (!priceRef.current) return;
          const rounded = Math.max(0, Math.round(priceState.val));
          const prefix = country.price.includes("€") ? "€" : country.price.includes("£") ? "£" : "$";
          priceRef.current.textContent = `от ${prefix}${rounded.toLocaleString("en-US")}`;
        },
      });
    }
  }, [currentIndex, items]);

  const goToIndex = React.useCallback(
    (index: number) => {
      if (!triggerRef.current) return;
      const targetY = triggerStartRef.current + window.innerHeight * index;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    []
  );

  if (isMobile) {
    return (
      <section id="countries" className="bg-secondary">
        <div className="h-[100svh] snap-y snap-mandatory overflow-y-auto">
          {items.map((country, idx) => (
            <article
              key={country.slug}
              className="relative flex h-[100svh] snap-start flex-col justify-between overflow-hidden px-6 pb-10 pt-24"
              style={{ background: COUNTRY_GRADIENTS[country.slug] ?? COUNTRY_GRADIENTS.korea }}
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-pill bg-white/80 px-3 py-1 text-xs font-bold text-primary">
                  <span>{country.flag}</span>
                  <span>{LOCAL_NAMES[country.slug] ?? country.name}</span>
                </div>
                <h3 className="mt-5 text-5xl font-extrabold leading-[0.95] text-primary">{country.name}</h3>
                <p className="mt-4 text-base font-medium text-secondary">{country.description}</p>
              </div>
              <Link href={`/countries/${country.slug}`} className="text-lg font-extrabold text-brand">
                Узнать больше →
              </Link>
              <div className="pointer-events-none absolute bottom-4 right-6 text-[120px] font-extrabold leading-none text-black/5">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const country = items[currentIndex];
  return (
    <section
      id="countries"
      ref={sectionRef}
      className="relative overflow-clip bg-secondary"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="relative h-screen overflow-hidden" ref={pinRef}>
        {items.map((item, index) => (
          <div
            key={item.slug}
            ref={(el) => {
              bgRefs.current[index] = el;
            }}
            className="absolute inset-0"
            style={{
              background: COUNTRY_GRADIENTS[item.slug] ?? COUNTRY_GRADIENTS.korea,
              opacity: index === 0 ? 1 : 0,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] grid-cols-[minmax(0,60fr)_minmax(0,40fr)] px-8 py-16">
          <div className="flex flex-col justify-center">
            <div ref={flagRef} className="inline-flex w-fit items-center gap-2 rounded-pill bg-white/80 px-4 py-2 text-sm font-bold text-primary">
              <span>{country.flag}</span>
              <span>{LOCAL_NAMES[country.slug] ?? country.name}</span>
            </div>
            <h2
              ref={nameRef}
              className="mt-6 max-w-[95%] text-[clamp(52px,6.8vw,122px)] font-extrabold leading-[0.92] tracking-tight text-[#1A1108] [word-break:break-word] will-change-transform"
            >
              {country.name}
            </h2>
            <p ref={descRef} className="mt-5 max-w-2xl text-[20px] font-medium leading-relaxed text-[#6B6560]">
              {country.description}
            </p>
            <div ref={pillsRef} className="mt-7 flex flex-wrap gap-3">
              <span ref={uniRef} className="rounded-pill bg-white/75 px-4 py-2 text-sm font-bold text-primary">
                {country.uniCount}
              </span>
              <span ref={priceRef} className="rounded-pill bg-white/75 px-4 py-2 text-sm font-bold text-primary">
                {country.price}
              </span>
              <span className="rounded-pill bg-white/75 px-4 py-2 text-sm font-bold text-primary">
                {scholarshipPill(country.scholarships)}
              </span>
            </div>
            <Link
              ref={ctaRef}
              href={`/countries/${country.slug}`}
              className="mt-8 text-xl font-extrabold text-[#FF8225]"
            >
              Узнать больше →
            </Link>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              ref={bigNumberRef}
              className="text-[clamp(160px,20vw,260px)] font-extrabold leading-none text-transparent"
              style={{ WebkitTextStroke: "2px rgba(26,17,8,0.12)" }}
            >
              {String(currentIndex + 1).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 z-20 -translate-y-1/2 space-y-3">
          {items.map((item, idx) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => goToIndex(idx)}
              className={`block h-3.5 w-3.5 rounded-full border transition-colors ${
                idx === currentIndex ? "border-brand bg-brand" : "border-gray-400/70 bg-transparent"
              }`}
              aria-label={`Перейти к ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
