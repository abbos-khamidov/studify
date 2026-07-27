"use client";

import * as React from "react";
import { CheckCircle2, GraduationCap, MapPinned, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { useLocale, type Locale } from "@/hooks/useLocale";

const metrics = [
  { value: "500+", label: "студентов поступили" },
  { value: "12", label: "стран для обучения" },
  { value: "95%", label: "зачислений по заявкам" },
];

const principles = [
  {
    icon: GraduationCap,
    title: "Подбираем по шансам",
    text: "Смотрим оценки, язык, бюджет и дедлайны, чтобы не тратить время на неподходящие вузы.",
  },
  {
    icon: MapPinned,
    title: "Ведём до переезда",
    text: "Помогаем с документами, подачей, визой и базовой подготовкой к адаптации в новой стране.",
  },
  {
    icon: Users,
    title: "Работаем с родителями",
    text: "Объясняем стоимость, сроки и риски понятным языком, чтобы решение было спокойным.",
  },
];

const copy: Record<Locale, {
  tag: string;
  title: string;
  text: string;
  metrics: typeof metrics;
  principles: typeof principles;
}> = {
  uz: {
    tag: "Biz haqimizda",
    title: "Studify maktabdan keyin chet el universitetiga kirishga yordam beradi",
    text: "O'zbekistondagi abituriyentlarni davlat va dastur tanlashdan offer, viza va ko'chishga tayyorgarlikkacha kuzatamiz. Asosiy e'tibor - real reja, shaffof budjet va kuchli hujjatlar.",
    metrics: [
      { value: "500+", label: "talaba qabul qilindi" },
      { value: "12", label: "ta'lim davlatlari" },
      { value: "95%", label: "arizalar bo'yicha qabul" },
    ],
    principles: [
      { icon: GraduationCap, title: "Imkoniyatga qarab tanlaymiz", text: "Baholar, til, budjet va deadline'larni tekshirib, mos bo'lmagan universitetlarga vaqt sarflamaymiz." },
      { icon: MapPinned, title: "Ko'chishgacha kuzatamiz", text: "Hujjatlar, topshirish, viza va yangi davlatga moslashishga tayyorgarlikda yordam beramiz." },
      { icon: Users, title: "Ota-onalar bilan ishlaymiz", text: "Narx, muddat va risklarni tushunarli qilib aytamiz, qaror xotirjam bo'lishi uchun." },
    ],
  },
  ru: { tag: "Про нас", title: "Studify помогает поступить в университет за рубежом после школы", text: "Мы сопровождаем абитуриентов из Узбекистана: от выбора страны и программы до оффера, визы и подготовки к переезду. Главный фокус - реалистичный план поступления, прозрачный бюджет и сильные документы.", metrics, principles },
  en: {
    tag: "About",
    title: "Studify helps students enter universities abroad after school",
    text: "We guide applicants from Uzbekistan from choosing a country and program to the offer, visa and relocation preparation. The focus is a realistic plan, clear budget and strong documents.",
    metrics: [
      { value: "500+", label: "students admitted" },
      { value: "12", label: "study countries" },
      { value: "95%", label: "admission rate" },
    ],
    principles: [
      { icon: GraduationCap, title: "We match by chances", text: "We review grades, language, budget and deadlines, so you do not waste time on unsuitable universities." },
      { icon: MapPinned, title: "We guide until relocation", text: "We help with documents, applications, visa and basic preparation for life in a new country." },
      { icon: Users, title: "We work with parents", text: "We explain costs, timelines and risks clearly, so the decision is calm and informed." },
    ],
  },
};

export function AboutSection() {
  const locale = useLocale();
  const t = copy[locale];

  return (
    <section id="about" className="bg-white py-20 lg:py-[120px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
          <div>
            <SectionTag className="mb-5">{t.tag}</SectionTag>
            <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
              {t.title}
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-secondary">
              {t.text}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {t.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-brand/15 bg-[#FFF8F2] p-4">
                  <div className="text-2xl font-extrabold text-brand lg:text-3xl">{metric.value}</div>
                  <div className="mt-1 text-xs font-bold leading-snug text-secondary">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {t.principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-neutral-100 bg-[#FAFAFA] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      <h3 className="text-lg font-extrabold text-primary">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-secondary">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
