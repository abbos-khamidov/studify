"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import { useLocale, type Locale } from "@/hooks/useLocale";

const copy: Record<Locale, {
  tag: string;
  title: string;
  accent: string;
  more: string;
  steps: Array<{ num: string; title: string; desc: string }>;
}> = {
  uz: {
    tag: "Jarayon",
    title: "Orzuga 4 qadam",
    accent: "orzuga",
    more: "Batafsil:",
    steps: [
      { num: "01", title: "Konsultatsiya", desc: "Maqsad va byudjetingizga qarab davlat va universitet tanlaymiz. Kuchli tomonlaringizni hisobga olib individual qabul strategiyasini tuzamiz." },
      { num: "02", title: "Hujjatlar", desc: "To'liq hujjatlar paketini tayyorlaymiz. Motivatsion xat va tavsiyalarni kuchli qilib yozishga yordam beramiz." },
      { num: "03", title: "Topshirish", desc: "Bir vaqtning o'zida 3-5 ta universitetga ariza yuboramiz. Ro'yxatdan o'tish to'lovidan yakuniy javobgacha jarayonni nazorat qilamiz." },
      { num: "04", title: "Qabul", desc: "Offer olganingizdan keyin viza, ko'chishga tayyorgarlik va yangi davlatga moslashish bo'yicha yo'l-yo'riq beramiz." },
    ],
  },
  ru: {
    tag: "Процесс",
    title: "4 шага к мечте",
    accent: "мечте",
    more: "Узнать больше о",
    steps: [
      { num: "01", title: "Консультация", desc: "Бесплатно подберём страну и университет на основе ваших целей и бюджета. Разработаем индивидуальную стратегию поступления, учитывая ваши сильные стороны." },
      { num: "02", title: "Документы", desc: "Подготовим полный пакет документов. Наш редактор поможет составить сильное мотивационное письмо и грамотные рекомендации, которые выделят вас среди других." },
      { num: "03", title: "Подача", desc: "Отправим заявки в 3-5 вузов одновременно. Контролируем каждый этап: от оплаты регистрационного взноса до финального подтверждения от вуза." },
      { num: "04", title: "Зачисление", desc: "Получите долгожданный оффер. Мы поможем оформить визу, подготовим к переезду и дадим все необходимые инструкции для адаптации в новой стране." },
    ],
  },
  en: {
    tag: "Process",
    title: "4 steps to your goal",
    accent: "goal",
    more: "Learn more about",
    steps: [
      { num: "01", title: "Consultation", desc: "We choose a country and university based on your goals and budget, then build a personal admission strategy around your strengths." },
      { num: "02", title: "Documents", desc: "We prepare the full document package and help write strong motivation letters and recommendations." },
      { num: "03", title: "Application", desc: "We apply to 3-5 universities at the same time and track every step from fees to final university confirmation." },
      { num: "04", title: "Enrollment", desc: "After the offer, we help with the visa, relocation preparation and practical adaptation steps." },
    ],
  },
};

export function HowItWorks() {
  const locale = useLocale();
  const t = copy[locale];
  const steps = t.steps;
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section id="how-it-works" className="py-16 lg:py-[120px] bg-white">
      <Container>
        <div className="text-center mb-16">
          <SectionTag className="mb-4">{t.tag}</SectionTag>
          <SectionTitle accentWord={t.accent}>{t.title}</SectionTitle>
        </div>

        <div className="flex gap-4 mb-16">
          {steps.map((step, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 flex-1 min-w-[140px]",
                  isActive 
                    ? "bg-brand text-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "text-sm font-black tracking-widest mb-3 py-1 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-brand text-white" 
                    : "bg-brand-light text-brand"
                )}>
                  {step.num}
                </div>
                
                <span className={cn(
                  "font-bold text-base lg:text-lg text-center transition-colors leading-tight",
                  isActive ? "text-primary" : "text-secondary"
                )}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-light text-brand font-black text-2xl mb-8">
                {steps[activeTab].num}
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-primary mb-6">
                {steps[activeTab].title}
              </h3>
              <p className="text-xl text-secondary leading-relaxed font-medium">
                {steps[activeTab].desc}
              </p>
              
              <div className="mt-10">
                <button className="text-brand font-bold hover:underline underline-offset-8 transition-all">
                  {t.more} {steps[activeTab].title.toLowerCase()} →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
