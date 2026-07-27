"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Phone, Search, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { GlobePlaceholder } from "@/components/three/GlobePlaceholder";
import { useLocale, type Locale } from "@/hooks/useLocale";
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

const HERO_COPY: Record<Locale, {
  tag: string;
  title: string;
  accent: string;
  subtitle: string;
  phoneLabel: string;
  phoneError: string;
  consultation: string;
  message: string;
  processTag: string;
  processTitle: string;
  processText: string;
  steps: typeof PROCESS_STEPS;
  startTitle: string;
  startText: string;
  countryLabel: string;
  programLabel: string;
  find: string;
  contact: string;
  universities: string;
  empty: string;
  step: string;
}> = {
  uz: {
    tag: "500+ talaba allaqachon chet elda o'qiyapti",
    title: "Kelajaging shu yerdan boshlanadi",
    accent: "",
    subtitle: "Universitet tanlaymiz, hujjatlarni tayyorlaymiz va 30 kun ichida arizadan qabulgacha kuzatib boramiz.",
    phoneLabel: "Telefon raqami",
    phoneError: "Telefon raqamini kiriting",
    consultation: "Bepul konsultatsiya",
    message: "Assalomu alaykum! Studify bo'yicha bepul konsultatsiya olmoqchiman. Raqamim:",
    processTag: "Tanlash jarayoni",
    processTitle: "Konsultatsiya va qabul jarayoni tartibli bo'ladi",
    processText: "Birinchi strategiyadan final offergacha butun yo'lni o'z zimmamizga olamiz. Siz aniq reja va har bosqichda yordam olasiz.",
    steps: [
      { title: "Bepul konsultatsiya", text: "Maqsad, budjet va muddatlarni tahlil qilamiz. Sizga mos qabul strategiyasini tanlaymiz." },
      { title: "Shaxsiy tanlov", text: "Qabul ehtimoli yuqori bo'lgan universitet va dasturlar ro'yxatini tuzamiz." },
      { title: "Topshirish va kuzatuv", text: "Hujjatlar, motivatsiya xati, ariza va universitet bilan aloqani offergacha yuritamiz." },
    ],
    startTitle: "Nimadan boshlashni bilmaysizmi?",
    startText: "2 ta savolga javob bering, biz mos universitet variantlarini ko'rsatamiz.",
    countryLabel: "Davlat",
    programLabel: "Dastur",
    find: "Topish",
    contact: "Konsultant bilan bog'lanish",
    universities: "Mos universitetlar",
    empty: "Bu kombinatsiya uchun variantlarni tez orada qo'shamiz.",
    step: "Bosqich",
  },
  ru: {
    tag: "500+ студентов уже учатся за рубежом",
    title: "Твоё будущее начинается",
    accent: "здесь",
    subtitle: "Подберём университет, оформим документы и подготовим к поступлению — от заявки до зачисления за 30 дней.",
    phoneLabel: "Номер телефона",
    phoneError: "Введите номер телефона",
    consultation: "Бесплатная консультация",
    message: "Здравствуйте! Хочу бесплатную консультацию Studify. Мой номер:",
    processTag: "Процесс подбора",
    processTitle: "Консультация и поступление без хаоса",
    processText: "Мы берем на себя весь путь: от первой стратегии до финального оффера. Вы получаете прозрачный план и поддержку на каждом этапе.",
    steps: PROCESS_STEPS,
    startTitle: "Не знаете с чего начать?",
    startText: "Ответьте на 2 вопроса, и мы покажем подходящие варианты университетов.",
    countryLabel: "Страна",
    programLabel: "Программа",
    find: "Найти",
    contact: "Связаться с консультантом",
    universities: "Подходящие университеты",
    empty: "Скоро добавим варианты для этой комбинации.",
    step: "Шаг",
  },
  en: {
    tag: "500+ students already study abroad",
    title: "Your future starts",
    accent: "here",
    subtitle: "We choose a university, prepare documents, and guide you from application to admission in 30 days.",
    phoneLabel: "Phone number",
    phoneError: "Enter your phone number",
    consultation: "Free consultation",
    message: "Hello! I want a free Studify consultation. My number:",
    processTag: "Selection process",
    processTitle: "Consultation and admission without chaos",
    processText: "We handle the path from first strategy to final offer. You get a clear plan and support at every step.",
    steps: [
      { title: "Free consultation", text: "We review goals, budget and deadlines. Then we build an admission strategy for your case." },
      { title: "Personal shortlist", text: "We prepare a shortlist of universities and programs with strong admission chances." },
      { title: "Application support", text: "We handle documents, motivation, applications and university communication until the offer." },
    ],
    startTitle: "Not sure where to start?",
    startText: "Answer 2 questions and we will show suitable university options.",
    countryLabel: "Country",
    programLabel: "Program",
    find: "Find",
    contact: "Contact a consultant",
    universities: "Suitable universities",
    empty: "We will add options for this combination soon.",
    step: "Step",
  },
};

function formatPhoneInput(value: string) {
  const trimmed = value.trimStart();
  return trimmed.startsWith("+") ? trimmed : `+${trimmed.replace(/^\+/, "")}`;
}

export function Hero() {
  const locale = useLocale();
  const copy = HERO_COPY[locale];
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const tagWrapRef = React.useRef<HTMLDivElement | null>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement | null>(null);
  const processRef = React.useRef<HTMLDivElement | null>(null);
  const formRef = React.useRef<HTMLDivElement | null>(null);
  const consultationRef = React.useRef<HTMLFormElement | null>(null);
  const hereRef = React.useRef<HTMLSpanElement | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedCountry, setSelectedCountry] = React.useState("Южная Корея");
  const [selectedProgram, setSelectedProgram] = React.useState("Бакалавриат");
  const [phone, setPhone] = React.useState("+998 ");
  const [phoneError, setPhoneError] = React.useState("");
  const [showGlobe, setShowGlobe] = React.useState(false);
  const { words, wordRefs, setWordRef } = useTextReveal(copy.title);
  const universities = React.useMemo(
    () =>
      UNIVERSITY_OPTIONS.filter(
        (item) => item.country === selectedCountry && item.program === selectedProgram
      ),
    [selectedCountry, selectedProgram]
  );

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % copy.steps.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [copy.steps.length]);

  React.useEffect(() => {
    const load = () => setShowGlobe(true);
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(load, 700);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordEls = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled) return;

      ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [tagWrapRef.current, subtitleRef.current, consultationRef.current, processRef.current, formRef.current],
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
      gsap.set(consultationRef.current, { opacity: 0, y: 20, scale: 0.98 });
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
        .to(consultationRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.34 }, "-=0.18")
        .to(processRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.08")
        .to(formRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.34 }, "-=0.08");
      }, section);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [wordRefs]);

  function handleConsultationSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");

    if (digits.length < 9) {
      setPhoneError(copy.phoneError);
      return;
    }

    setPhoneError("");
    const message = encodeURIComponent(`${copy.message} ${phone}`);
    window.open(`https://wa.me/998939492000?text=${message}`, "_blank", "noopener,noreferrer");
  }

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
                {copy.tag}
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
              {copy.accent ? (
                <span className="inline-block align-bottom" style={{ clipPath: "inset(-10% -2% -10% 0)" }}>
                  <span ref={hereRef} className="inline-block text-brand will-change-transform">
                    {copy.accent}
                  </span>
                </span>
              ) : null}
            </h1>

            <p ref={subtitleRef} className="mt-8 max-w-lg text-lg font-medium leading-relaxed text-secondary">
              {copy.subtitle}
            </p>

            <form
              ref={consultationRef}
              onSubmit={handleConsultationSubmit}
              className="mt-10 w-full max-w-xl rounded-2xl border border-brand/20 bg-white p-3 shadow-[0_14px_44px_rgba(255,130,37,0.14)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex min-h-14 flex-1 items-center rounded-xl border border-brand/15 bg-[#FFF8F2] px-4 focus-within:border-brand focus-within:bg-white">
                  <Phone className="mr-3 h-4 w-4 shrink-0 text-brand" />
                  <span className="sr-only">{copy.phoneLabel}</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(event) => {
                      setPhone(formatPhoneInput(event.target.value));
                      if (phoneError) setPhoneError("");
                    }}
                    placeholder="+998 90 123 45 67"
                    className="min-w-0 flex-1 bg-transparent text-base font-semibold text-primary outline-none placeholder:text-secondary/70"
                    aria-invalid={Boolean(phoneError)}
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-extrabold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Send className="h-4 w-4" />
                  {copy.consultation}
                </button>
              </div>
              {phoneError ? <p className="mt-2 px-1 text-sm font-semibold text-red-600">{phoneError}</p> : null}
            </form>

          </div>

          <div className="relative mx-auto h-[320px] w-[320px] justify-self-center sm:h-[420px] sm:w-[420px] lg:-mt-16 lg:h-[560px] lg:w-[560px] lg:self-start">
            {showGlobe ? <Globe /> : <GlobePlaceholder />}
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <div
            ref={processRef}
            className="rounded-3xl border border-brand/10 bg-gradient-to-br from-[#FFF8F2] to-[#FFF2E4] px-6 py-6 shadow-[0_16px_50px_rgba(255,130,37,0.12)] lg:px-8 lg:py-8"
          >
            <div className="mb-6">
              <SectionTag className="mb-3">{copy.processTag}</SectionTag>
              <h3 className="text-2xl font-extrabold leading-tight text-primary lg:text-3xl">
                {copy.processTitle}
              </h3>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-secondary lg:text-base">
                {copy.processText}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {copy.steps.map((step, index) => {
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
                    <div className="text-xs font-bold uppercase tracking-wider text-brand/80">{copy.step} {index + 1}</div>
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
              <h4 className="text-2xl font-extrabold lg:text-3xl">{copy.startTitle}</h4>
              <p className="mt-2 text-sm font-medium text-secondary lg:text-base">
                {copy.startText}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
              <form className="space-y-4 rounded-2xl border border-brand/15 bg-white/85 p-4 lg:p-5">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-secondary">{copy.countryLabel}</span>
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
                  <span className="mb-1 block text-xs font-semibold text-secondary">{copy.programLabel}</span>
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
                  {copy.find}
                </button>
                <Button type="button" variant="secondary" size="lg" className="h-12 w-full rounded-xl border-brand/30 text-primary">
                  {copy.contact}
                </Button>
              </form>

              <div className="rounded-2xl border border-brand/15 bg-white/75 p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                  {copy.universities}
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
                      {copy.empty}
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
