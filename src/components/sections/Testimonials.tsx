"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  uni: string;
  flag: string;
  quote: string;
  initials: string;
  avatarClass: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Малика Каримова",
    uni: "Yonsei University",
    flag: "🇰🇷",
    quote: "Думала, поступить в корейский вуз невозможно без знания языка. Studify доказали обратное — за 2 месяца я получила оффер!",
    initials: "МК",
    avatarClass: "bg-rose-100 text-rose-700",
  },
  {
    id: 2,
    name: "Достон Ахмедов",
    uni: "TU Berlin",
    flag: "🇩🇪",
    quote: "Сэкономил кучу времени и нервов. Ребята подготовили все документы, помогли с визой. Сейчас учусь бесплатно!",
    initials: "ДА",
    avatarClass: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    name: "Нигора Рашидова",
    uni: "UCSI University",
    flag: "🇲🇾",
    quote: "Получила стипендию 70% в Малайзии через Studify. Консультант был на связи 24/7.",
    initials: "НР",
    avatarClass: "bg-sky-100 text-sky-700",
  },
  {
    id: 4,
    name: "Жавлон Назаров",
    uni: "Bilkent University",
    flag: "🇹🇷",
    quote: "Подали заявки в 4 университета Турции — все приняли. Выбрал лучший вариант с грантом на 50%.",
    initials: "ЖН",
    avatarClass: "bg-orange-100 text-orange-700",
  },
];

export function Testimonials() {
  const [paused, setPaused] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const countRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (countRef.current) {
      countRef.current.textContent = "500+";
    }
  }, []);

  React.useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goToIndex = (idx: number) => setCurrentIndex((idx + testimonials.length) % testimonials.length);
  const t = testimonials[currentIndex];
  const isOdd = currentIndex % 2 === 0;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-16 lg:py-[120px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <SectionTag className="mb-4">Отзывы</SectionTag>
        <SectionTitle accentWord="успеха">Истории успеха</SectionTitle>
        <div className="mt-8">
          <h3 className="text-4xl font-extrabold text-primary lg:text-5xl">
            <span ref={countRef} className="text-brand">
              500+
            </span>{" "}
            историй успеха
          </h3>
          <p className="mt-2 text-lg font-medium text-secondary">Вот некоторые из них</p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#E8E6E1] bg-[#FBFAF7] px-6 py-8 lg:px-10 lg:py-10">
          <div className="grid min-h-[420px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div key={`q-${t.id}`} className={isOdd ? "order-1" : "order-2 lg:justify-self-end"}>
              <div className="relative max-w-[520px]">
                <p className="relative z-10 animate-[fadeIn_420ms_ease-out] text-[24px] italic leading-tight text-[#1A1108] lg:text-[28px]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {t.quote}
                </p>
              </div>
            </div>

            <div key={`c-${t.id}`} className={isOdd ? "order-2 lg:justify-self-end" : "order-1"}>
              <div className="w-full max-w-[380px] animate-[fadeIn_520ms_ease-out] rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-4">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full text-xl font-extrabold ${t.avatarClass}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[18px] font-extrabold text-primary">{t.name}</div>
                    <div className="mt-1 text-sm font-medium text-[#6B6560]">
                      {t.flag} {t.uni}
                    </div>
                    <div className="mt-3 inline-flex rounded-pill bg-brand/15 px-3 py-1 text-xs font-bold text-brand">
                      Зачислен(а) в 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToIndex(currentIndex - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D4CC] bg-white text-primary transition-colors hover:border-brand hover:text-brand"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goToIndex(currentIndex + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D4CC] bg-white text-primary transition-colors hover:border-brand hover:text-brand"
                aria-label="Следующий отзыв"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`h-2.5 w-2.5 rounded-full border ${
                    idx === currentIndex ? "border-brand bg-brand" : "border-[#CFCBC3] bg-transparent"
                  }`}
                  aria-label={`Перейти к отзыву ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
