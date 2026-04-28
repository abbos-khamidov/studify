"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Консультация",
    desc: "Бесплатно подберём страну и университет на основе ваших целей и бюджета. Разработаем индивидуальную стратегию поступления, учитывая ваши сильные стороны.",
  },
  {
    num: "02",
    title: "Документы",
    icon: "📄",
    desc: "Подготовим полный пакет документов. Наш редактор поможет составить сильное мотивационное письмо и грамотные рекомендации, которые выделят вас среди других.",
  },
  {
    num: "03",
    title: "Подача",
    desc: "Отправим заявки в 3-5 вузов одновременно. Контролируем каждый этап: от оплаты регистрационного взноса до финального подтверждения от вуза.",
  },
  {
    num: "04",
    title: "Зачисление",
    desc: "Получите долгожданный оффер. Мы поможем оформить визу, подготовим к переезду и дадим все необходимые инструкции для адаптации в новой стране.",
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section id="how-it-works" className="py-16 lg:py-[120px] bg-white">
      <Container>
        <div className="text-center mb-16">
          <SectionTag className="mb-4">Процесс</SectionTag>
          <SectionTitle accentWord="мечте">4 шага к мечте</SectionTitle>
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
                  Узнать больше о {steps[activeTab].title.toLowerCase()} →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}