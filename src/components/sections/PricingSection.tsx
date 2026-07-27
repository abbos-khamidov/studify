"use client";

import * as React from "react";
import Link from "next/link";
import { Check, FileText, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { buttonVariants } from "@/components/ui/Button";
import { useLocale, type Locale } from "@/hooks/useLocale";

const plans = [
  {
    name: "Консультация",
    price: "Бесплатно",
    note: "для старта",
    features: ["разбор целей и бюджета", "рекомендация стран", "план следующих шагов"],
  },
  {
    name: "Подбор вуза",
    price: "от $150",
    note: "shortlist программ",
    featured: true,
    features: ["3-5 подходящих университетов", "оценка шансов", "дедлайны и требования"],
  },
  {
    name: "Полное сопровождение",
    price: "от $600",
    note: "до зачисления",
    features: ["документы и подача", "мотивационное письмо", "поддержка до оффера"],
  },
];

const pricingCopy: Record<Locale, {
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  plans: typeof plans;
}> = {
  uz: {
    tag: "Narxlar",
    title: "Narx davlat, dastur va kuzatuv hajmiga bog'liq",
    subtitle: "Quyida asosiy paketlar. Aniq narxni bepul konsultatsiyadan keyin, deadline va universitetlar ro'yxati ma'lum bo'lganda aytamiz.",
    cta: "Narxni bilish",
    plans: [
      { name: "Konsultatsiya", price: "Bepul", note: "boshlash uchun", features: ["maqsad va budjet tahlili", "davlat tavsiyasi", "keyingi qadamlar rejasi"] },
      { name: "Universitet tanlash", price: "from $150", note: "dasturlar shortlisti", featured: true, features: ["3-5 mos universitet", "qabul imkoniyatini baholash", "deadline va talablar"] },
      { name: "To'liq kuzatuv", price: "from $600", note: "qabulgacha", features: ["hujjatlar va ariza", "motivatsiya xati", "offergacha yordam"] },
    ],
  },
  ru: { tag: "Прайслист", title: "Стоимость зависит от страны, программы и объёма сопровождения", subtitle: "Ниже базовые пакеты. Точную цену называем после бесплатной консультации, когда понятны дедлайны и список вузов.", cta: "Узнать цену", plans },
  en: {
    tag: "Pricing",
    title: "The price depends on country, program and support scope",
    subtitle: "Below are base packages. We give the exact price after a free consultation, once deadlines and universities are clear.",
    cta: "Get price",
    plans: [
      { name: "Consultation", price: "Free", note: "to start", features: ["goals and budget review", "country recommendation", "next steps plan"] },
      { name: "University matching", price: "from $150", note: "program shortlist", featured: true, features: ["3-5 suitable universities", "chance assessment", "deadlines and requirements"] },
      { name: "Full support", price: "from $600", note: "until admission", features: ["documents and application", "motivation letter", "support until offer"] },
    ],
  },
};

export function PricingSection() {
  const locale = useLocale();
  const t = pricingCopy[locale];

  return (
    <section id="pricing" className="bg-[#FAFAFA] py-20 lg:py-[120px]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionTag className="mb-5">{t.tag}</SectionTag>
          <h2 className="text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-secondary">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {t.plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 ${
                plan.featured
                  ? "border-brand bg-white shadow-[0_18px_48px_rgba(255,130,37,0.18)]"
                  : "border-neutral-100 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-extrabold text-primary">{plan.name}</h3>
                {plan.featured ? (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <FileText className="h-4 w-4" />
                  </span>
                )}
              </div>
              <div className="mt-6">
                <div className="text-4xl font-extrabold text-primary">{plan.price}</div>
                <div className="mt-1 text-sm font-bold text-secondary">{plan.note}</div>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm font-semibold text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contacts" className={buttonVariants({ className: "mt-7 w-full rounded-xl" })}>
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
