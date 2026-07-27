"use client";

import * as React from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { countries } from "@/lib/countries";
import { useLocale, type Locale } from "@/hooks/useLocale";

const COUNTRY_COPY: Record<Locale, Record<string, {
  name: string;
  localName: string;
  price: string;
  uniCount: string;
  description: string;
  scholarship: string;
}>> = {
  uz: {
    korea: { name: "Janubiy Koreya", localName: "한국", price: "$3,000/yildan", uniCount: "45+ universitet", description: "Ilg'or texnologiyalar, K-madaniyat va qulay narxlar.", scholarship: "GKS stipendiyalari" },
    turkey: { name: "Turkiya", localName: "Türkiye", price: "$2,500/yildan", uniCount: "60+ universitet", description: "Stipendiyalar, madaniy yaqinlik va qulay ta'lim.", scholarship: "Türkiye stipendiyalari" },
    germany: { name: "Germaniya", localName: "Deutschland", price: "€0/yildan", uniCount: "100+ universitet", description: "Davlat universitetlarida bepul ta'lim imkoniyati.", scholarship: "DAAD stipendiyalari" },
    uk: { name: "Buyuk Britaniya", localName: "United Kingdom", price: "£12,000/yildan", uniCount: "80+ universitet", description: "Prestij, ingliz tili va dunyo tan oladigan diplomlar.", scholarship: "Chevening stipendiyalari" },
    malaysia: { name: "Malayziya", localName: "Malaysia", price: "$4,000/yildan", uniCount: "30+ universitet", description: "Ingliz tilida ta'lim, tropik muhit va qulay yashash.", scholarship: "MIS stipendiyalari" },
    france: { name: "Fransiya", localName: "France", price: "€2,770/yildan", uniCount: "50+ universitet", description: "Arzon ta'lim, san'at, dizayn va biznes.", scholarship: "Eiffel stipendiyalari" },
  },
  ru: {
    korea: { name: "Южная Корея", localName: "한국", price: "от $3,000/год", uniCount: "45+ университетов", description: "Передовые технологии, K-культура и доступные цены.", scholarship: "Стипендии GKS" },
    turkey: { name: "Турция", localName: "Türkiye", price: "от $2,500/год", uniCount: "60+ университетов", description: "Стипендии, культурная близость и доступное образование.", scholarship: "Стипендии Türkiye" },
    germany: { name: "Германия", localName: "Deutschland", price: "от €0/год", uniCount: "100+ университетов", description: "Бесплатное обучение в государственных университетах.", scholarship: "Стипендии DAAD" },
    uk: { name: "Великобритания", localName: "United Kingdom", price: "от £12,000/год", uniCount: "80+ университетов", description: "Престиж, английский язык и дипломы с мировым признанием.", scholarship: "Стипендии Chevening" },
    malaysia: { name: "Малайзия", localName: "Malaysia", price: "от $4,000/год", uniCount: "30+ университетов", description: "Обучение на английском, тропики и доступная жизнь.", scholarship: "Стипендии MIS" },
    france: { name: "Франция", localName: "France", price: "от €2,770/год", uniCount: "50+ университетов", description: "Низкая стоимость обучения, искусство, дизайн и бизнес.", scholarship: "Стипендии Eiffel" },
  },
  en: {
    korea: { name: "South Korea", localName: "한국", price: "from $3,000/year", uniCount: "45+ universities", description: "Advanced technology, K-culture and affordable costs.", scholarship: "GKS scholarships" },
    turkey: { name: "Turkey", localName: "Türkiye", price: "from $2,500/year", uniCount: "60+ universities", description: "Scholarships, cultural closeness and affordable education.", scholarship: "Türkiye scholarships" },
    germany: { name: "Germany", localName: "Deutschland", price: "from €0/year", uniCount: "100+ universities", description: "Free study options at public universities.", scholarship: "DAAD scholarships" },
    uk: { name: "United Kingdom", localName: "United Kingdom", price: "from £12,000/year", uniCount: "80+ universities", description: "Prestige, English-language study and globally recognized degrees.", scholarship: "Chevening scholarships" },
    malaysia: { name: "Malaysia", localName: "Malaysia", price: "from $4,000/year", uniCount: "30+ universities", description: "English-language study, tropical climate and affordable living.", scholarship: "MIS scholarships" },
    france: { name: "France", localName: "France", price: "from €2,770/year", uniCount: "50+ universities", description: "Low tuition, art, design and business.", scholarship: "Eiffel scholarships" },
  },
};

const COUNTRY_UI: Record<Locale, { learnMore: string; ariaGoTo: string; universitiesAnimated: string; priceFrom: string }> = {
  uz: { learnMore: "Batafsil →", ariaGoTo: "O'tish:", universitiesAnimated: "universitet", priceFrom: "dan" },
  ru: { learnMore: "Узнать больше →", ariaGoTo: "Перейти к", universitiesAnimated: "вузов", priceFrom: "от" },
  en: { learnMore: "Learn more →", ariaGoTo: "Go to", universitiesAnimated: "universities", priceFrom: "from" },
};

const COUNTRY_GRADIENTS: Record<string, string> = {
  korea: "linear-gradient(135deg, rgba(255,130,37,0.96) 0%, rgba(255,168,86,0.88) 48%, rgba(255,255,255,0.76) 100%)",
  turkey: "linear-gradient(135deg, rgba(255,130,37,0.96) 0%, rgba(255,94,66,0.78) 48%, rgba(255,255,255,0.74) 100%)",
  uk: "linear-gradient(135deg, rgba(255,130,37,0.96) 0%, rgba(255,191,115,0.82) 45%, rgba(238,246,255,0.76) 100%)",
  malaysia: "linear-gradient(135deg, rgba(255,130,37,0.96) 0%, rgba(255,200,94,0.82) 45%, rgba(255,255,255,0.74) 100%)",
  france: "linear-gradient(135deg, rgba(255,130,37,0.96) 0%, rgba(255,180,104,0.82) 44%, rgba(239,246,255,0.76) 100%)",
  germany: "linear-gradient(135deg, rgba(255,130,37,0.96) 0%, rgba(255,185,72,0.82) 46%, rgba(255,255,255,0.76) 100%)",
};

function FlagStrip({ activeSlug }: { activeSlug: string }) {
  return (
    <div className="pointer-events-none flex gap-3">
      {countries.slice(0, 6).map((country) => (
        <div
          key={country.slug}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-3xl shadow-[0_10px_30px_rgba(26,17,8,0.12)] backdrop-blur-md transition-all duration-300 ${
            country.slug === activeSlug
              ? "border-white bg-white/90 opacity-100"
              : "border-white/35 bg-white/20 opacity-65"
          }`}
        >
          {country.flag}
        </div>
      ))}
    </div>
  );
}

export function Countries() {
  const locale = useLocale();
  const ui = COUNTRY_UI[locale];
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
          uniRef.current.textContent = `${Math.round(uniState.val)}+ ${ui.universitiesAnimated}`;
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
          priceRef.current.textContent = `${ui.priceFrom} ${prefix}${rounded.toLocaleString("en-US")}`;
        },
      });
    }
  }, [currentIndex, items, locale, ui.priceFrom, ui.universitiesAnimated]);

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
      <section id="countries" className="bg-brand">
        <div className="h-[100svh] snap-y snap-mandatory overflow-y-auto">
          {items.map((country, idx) => (
            (() => {
              const text = COUNTRY_COPY[locale][country.slug];
              return (
            <article
              key={country.slug}
              className="relative flex h-[100svh] snap-start flex-col justify-between overflow-hidden px-6 pb-10 pt-24"
              style={{ background: COUNTRY_GRADIENTS[country.slug] ?? COUNTRY_GRADIENTS.korea }}
            >
              <div className="pointer-events-none absolute -right-10 top-20 text-[180px] leading-none opacity-20 blur-[0.2px]">
                {country.flag}
              </div>
              <div className="pointer-events-none absolute -bottom-8 -left-8 text-[150px] leading-none opacity-10">
                {country.flag}
              </div>
              <div>
                <div className="mb-6 overflow-hidden">
                  <FlagStrip activeSlug={country.slug} />
                </div>
                <div className="inline-flex items-center gap-2 rounded-pill border border-white/30 bg-white/25 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  <span className="text-base">{country.flag}</span>
                  <span>{text.localName}</span>
                </div>
                <h3 className="mt-5 text-5xl font-extrabold leading-[0.95] text-white">{text.name}</h3>
                <p className="mt-4 text-base font-semibold leading-relaxed text-white/86">{text.description}</p>
              </div>
              <Link href={`/countries/${country.slug}`} className="w-fit rounded-pill bg-white px-5 py-3 text-base font-extrabold text-brand shadow-[0_12px_32px_rgba(26,17,8,0.14)]">
                {ui.learnMore}
              </Link>
              <div className="pointer-events-none absolute bottom-4 right-6 text-[120px] font-extrabold leading-none text-white/12">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </section>
    );
  }

  const country = items[currentIndex];
  const text = COUNTRY_COPY[locale][country.slug];
  return (
    <section
      id="countries"
      ref={sectionRef}
      className="relative overflow-clip bg-brand"
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

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.2),transparent_30%)]" />
        <div className="pointer-events-none absolute -right-12 top-4 z-[1] text-[clamp(220px,26vw,420px)] leading-none opacity-20">
          {country.flag}
        </div>
        <div className="pointer-events-none absolute -bottom-16 left-[42%] z-[1] text-[clamp(180px,20vw,320px)] leading-none opacity-10">
          {country.flag}
        </div>
        <div className="absolute left-8 top-28 z-20">
          <FlagStrip activeSlug={country.slug} />
        </div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] grid-cols-[minmax(0,60fr)_minmax(0,40fr)] px-8 py-16">
          <div className="flex flex-col justify-center">
            <div ref={flagRef} className="inline-flex w-fit items-center gap-2 rounded-pill border border-white/35 bg-white/25 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_28px_rgba(26,17,8,0.08)] backdrop-blur-md">
              <span className="text-lg">{country.flag}</span>
              <span>{text.localName}</span>
            </div>
            <h2
              ref={nameRef}
              className="mt-6 max-w-[95%] text-[clamp(52px,6.8vw,122px)] font-extrabold leading-[0.92] tracking-tight text-white [word-break:break-word] will-change-transform"
            >
              {text.name}
            </h2>
            <p ref={descRef} className="mt-5 max-w-2xl text-[20px] font-semibold leading-relaxed text-white/86">
              {text.description}
            </p>
            <div ref={pillsRef} className="mt-7 flex flex-wrap gap-3">
              <span ref={uniRef} className="rounded-pill border border-white/25 bg-white/90 px-4 py-2 text-sm font-bold text-primary">
                {text.uniCount}
              </span>
              <span ref={priceRef} className="rounded-pill border border-white/25 bg-white/90 px-4 py-2 text-sm font-bold text-primary">
                {text.price}
              </span>
              <span className="rounded-pill border border-white/25 bg-white/90 px-4 py-2 text-sm font-bold text-primary">
                {text.scholarship}
              </span>
            </div>
            <Link
              ref={ctaRef}
              href={`/countries/${country.slug}`}
              className="mt-8 w-fit rounded-pill bg-white px-6 py-3 text-lg font-extrabold text-brand shadow-[0_14px_38px_rgba(26,17,8,0.16)] transition-transform hover:scale-[1.02]"
            >
              {ui.learnMore}
            </Link>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              ref={bigNumberRef}
              className="text-[clamp(160px,20vw,260px)] font-extrabold leading-none text-transparent"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.34)" }}
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
                idx === currentIndex ? "border-white bg-white" : "border-white/70 bg-transparent"
              }`}
              aria-label={`${ui.ariaGoTo} ${COUNTRY_COPY[locale][item.slug].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
