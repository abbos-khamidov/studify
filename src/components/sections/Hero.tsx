"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button, buttonVariants } from "@/components/ui/Button";
import { GlobePlaceholder } from "@/components/three/GlobePlaceholder";
import { gsap } from "@/lib/gsap";
import { useTextReveal } from "@/hooks/useTextReveal";

const Globe = dynamic(() => import("../three/Globe").then((mod) => ({ default: mod.Globe })), {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

const PROCESS_STEPS = [
  {
    title: "Бесплатная консультация",
    text: "Разбираем цели, бюджет и сроки. Подбираем стратегию поступления под ваш кейс.",
  },
  {
    title: "Персональный подбор",
    text: "Формируем shortlist университетов и программ с высоким шансом зачисления.",
  },
  {
    title: "Подача и сопровождение",
    text: "Ведем документы, мотивацию, подачу и коммуникацию с вузами до оффера.",
  },
];

const UNIVERSITY_OPTIONS = [
  { country: "Южная Корея", program: "Бакалавриат", name: "Seoul National University", city: "Сеул", tuition: "от $6,500/год" },
  { country: "Южная Корея", program: "Бакалавриат", name: "Yonsei University", city: "Сеул", tuition: "от $7,200/год" },
  { country: "Южная Корея", program: "Магистратура", name: "KAIST", city: "Тэджон", tuition: "от $8,000/год" },
  { country: "Германия", program: "Бакалавриат", name: "TU Munich", city: "Мюнхен", tuition: "от €0/год" },
  { country: "Германия", program: "Магистратура", name: "LMU Munich", city: "Мюнхен", tuition: "от €0/год" },
  { country: "Германия", program: "Подготовительная программа", name: "Studienkolleg Berlin", city: "Берлин", tuition: "от €2,500/год" },
  { country: "Великобритания", program: "Бакалавриат", name: "University of Manchester", city: "Манчестер", tuition: "от £18,000/год" },
  { country: "Великобритания", program: "Магистратура", name: "University of Bristol", city: "Бристоль", tuition: "от £19,500/год" },
  { country: "Польша", program: "Бакалавриат", name: "University of Warsaw", city: "Варшава", tuition: "от €3,200/год" },
  { country: "Польша", program: "Магистратура", name: "Jagiellonian University", city: "Краков", tuition: "от €3,900/год" },
  { country: "Чехия", program: "Подготовительная программа", name: "Charles University Prep", city: "Прага", tuition: "от €4,200/год" },
  { country: "Чехия", program: "Бакалавриат", name: "Czech Technical University in Prague", city: "Прага", tuition: "от €3,500/год" },
];

export function Hero() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const tagWrapRef = React.useRef<HTMLDivElement | null>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement | null>(null);
  const buttonRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const processRef = React.useRef<HTMLDivElement | null>(null);
  const formRef = React.useRef<HTMLDivElement | null>(null);
  const hereRef = React.useRef<HTMLSpanElement | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedCountry, setSelectedCountry] = React.useState("Южная Корея");
  const [selectedProgram, setSelectedProgram] = React.useState("Бакалавриат");
  const { words, wordRefs, setWordRef } = useTextReveal("Твоё будущее начинается");
  const universities = React.useMemo(
    () =>
      UNIVERSITY_OPTIONS.filter(
        (item) => item.country === selectedCountry && item.program === selectedProgram
      ),
    [selectedCountry, selectedProgram]
  );

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordEls = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    const buttons = buttonRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [tagWrapRef.current, subtitleRef.current, buttons, processRef.current, formRef.current],
          { clearProps: "all", opacity: 1 }
        );
        gsap.set(wordEls, { yPercent: 0, opacity: 1, clearProps: "all" });
        gsap.set(hereRef.current, { yPercent: 0, opacity: 1, clearProps: "all" });
        return;
      }

      gsap.set(tagWrapRef.current, { opacity: 0, y: 30 });
      gsap.set(wordEls, { yPercent: 100 });
      gsap.set(hereRef.current, { yPercent: 100 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 28 });
      gsap.set(buttons, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(processRef.current, { opacity: 0, y: 24 });
      gsap.set(formRef.current, { opacity: 0, y: 24, scale: 0.98 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(tagWrapRef.current, { opacity: 1, y: 0, duration: 0.45, delay: 0.2 })
        .to(
          wordEls,
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.06,
          },
          "-=0.1"
        )
        .to(
          hereRef.current,
          {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.42 }, "-=0.6")
        .to(buttons, { opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.1 }, "-=0.28")
        .to(processRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.08")
        .to(formRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.34 }, "-=0.08");
    }, section);

    return () => ctx.revert();
  }, [wordRefs]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-white pb-16 pt-32 lg:min-h-screen lg:py-[120px] lg:pt-40"
    >
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-start lg:gap-16">
          <div className="max-w-xl lg:max-w-none">
            <div ref={tagWrapRef}>
              <SectionTag className="mb-6">
                <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
                500+ студентов уже учатся за рубежом
              </SectionTag>
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-primary lg:text-[72px]">
              {words.map((word, index) => (
                <React.Fragment key={`${word}-${index}`}>
                  <span
                    className="inline-block align-bottom"
                    style={{
                      clipPath: "inset(-10% -2% -10% 0)",
                      paddingRight: index < words.length - 1 ? "0.22em" : 0,
                    }}
                  >
                    <span ref={setWordRef(index)} className="inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                </React.Fragment>
              ))}
              <span className="inline-block align-bottom" style={{ clipPath: "inset(-10% -2% -10% 0)" }}>
                <span ref={hereRef} className="inline-block text-brand will-change-transform">
                  здесь
                </span>
              </span>
            </h1>

            <p ref={subtitleRef} className="mt-8 max-w-lg text-lg font-medium leading-relaxed text-secondary">
              Подберём университет, оформим документы и подготовим к поступлению — от заявки до зачисления за 30 дней.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <div
                ref={(el) => {
                  buttonRefs.current[0] = el;
                }}
              >
                <Link href="/quiz" className={buttonVariants({ size: "lg", className: "px-10" })}>
                  Подобрать университет
                </Link>
              </div>
              <div
                ref={(el) => {
                  buttonRefs.current[1] = el;
                }}
              >
                <Link href="tel:+998939492000" className={buttonVariants({ variant: "secondary", size: "lg", className: "px-8" })}>
                  Задать вопрос
                </Link>
              </div>
            </div>

          </div>

          <div className="relative mx-auto h-[320px] w-[320px] justify-self-center sm:h-[420px] sm:w-[420px] lg:-mt-16 lg:h-[560px] lg:w-[560px] lg:self-start">
            <Globe />
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <div
            ref={processRef}
            className="rounded-3xl border border-brand/10 bg-gradient-to-br from-[#FFF8F2] to-[#FFF2E4] px-6 py-6 shadow-[0_16px_50px_rgba(255,130,37,0.12)] lg:px-8 lg:py-8"
          >
            <div className="mb-6">
              <SectionTag className="mb-3">Процесс подбора</SectionTag>
              <h3 className="text-2xl font-extrabold leading-tight text-primary lg:text-3xl">
                Консультация и поступление без хаоса
              </h3>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-secondary lg:text-base">
                Мы берем на себя весь путь: от первой стратегии до финального оффера. Вы получаете прозрачный план и
                поддержку на каждом этапе.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {PROCESS_STEPS.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-brand bg-white shadow-[0_8px_28px_rgba(255,130,37,0.18)]"
                        : "border-brand/15 bg-white/70 hover:border-brand/40"
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-brand/80">Шаг {index + 1}</div>
                    <div className="mt-2 text-base font-extrabold text-primary">{step.title}</div>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-secondary">{step.text}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-brand/15">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div
            ref={formRef}
            className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-brand/20 bg-gradient-to-br from-[#FFF6EE] via-[#FFF2E6] to-[#FFEAD6] px-6 py-7 text-primary shadow-[0_22px_55px_rgba(255,130,37,0.18)] sm:px-7 sm:py-8 lg:px-10 lg:py-10"
          >
            <div className="mb-5 text-center">
              <h4 className="text-2xl font-extrabold lg:text-3xl">Не знаете с чего начать?</h4>
              <p className="mt-2 text-sm font-medium text-secondary lg:text-base">
                Ответьте на 2 вопроса, и мы покажем подходящие варианты университетов.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
              <form className="space-y-4 rounded-2xl border border-brand/15 bg-white/85 p-4 lg:p-5">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-secondary">Страна</span>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="h-14 w-full rounded-xl border border-brand/20 bg-white px-4 text-sm font-semibold text-primary outline-none focus:border-brand"
                  >
                    <option>Южная Корея</option>
                    <option>Германия</option>
                    <option>Великобритания</option>
                    <option>Польша</option>
                    <option>Чехия</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-secondary">Программа</span>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="h-14 w-full rounded-xl border border-brand/20 bg-white px-4 text-sm font-semibold text-primary outline-none focus:border-brand"
                  >
                    <option>Бакалавриат</option>
                    <option>Магистратура</option>
                    <option>Подготовительная программа</option>
                  </select>
                </label>
                <button
                  type="button"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                >
                  <Search className="h-4 w-4" />
                  Найти
                </button>
                <Button type="button" variant="secondary" size="lg" className="h-12 w-full rounded-xl border-brand/30 text-primary">
                  Связаться с консультантом
                </Button>
              </form>

              <div className="rounded-2xl border border-brand/15 bg-white/75 p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                  Подходящие университеты
                </div>
                <div className="grid max-h-[360px] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                  {universities.length > 0 ? (
                    universities.map((uni) => (
                      <div
                        key={`${uni.country}-${uni.program}-${uni.name}`}
                        className="rounded-xl border border-brand/15 bg-white px-3 py-3 shadow-[0_6px_20px_rgba(255,130,37,0.12)]"
                      >
                        <div className="text-sm font-extrabold text-primary">{uni.name}</div>
                        <div className="mt-1 text-xs font-semibold text-secondary">{uni.city}</div>
                        <div className="mt-2 inline-block rounded-pill bg-brand/10 px-2 py-1 text-[11px] font-bold text-brand">
                          {uni.tuition}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-brand/30 px-3 py-4 text-sm font-medium text-secondary sm:col-span-2">
                      Скоро добавим варианты для этой комбинации.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
