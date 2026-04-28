// components/features/country/Universities.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Country } from "@/lib/countries";

export function Universities({ country }: { country: Country }) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-brand text-white rounded-[3rem] lg:rounded-[5rem] my-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black tracking-tight mb-16"
        >
          Топ университеты
        </motion.h2>

        <div className="flex flex-col">
          {country.topUniversities.map((uni, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 last:border-0 cursor-pointer"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-white/80 transition-colors duration-300 group-hover:text-white mb-4 md:mb-0">
                {uni}
              </span>
              <div className="flex items-center gap-3 text-white opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <span className="font-bold uppercase tracking-wider text-sm">Подробнее</span>
                <div className="bg-white text-brand p-2 rounded-full">
                  <ArrowUpRight size={20} strokeWidth={3} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}