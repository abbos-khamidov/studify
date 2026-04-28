// components/features/country/Scholarships.tsx
"use client";

import { motion } from "framer-motion";
import { Country } from "@/lib/countries";

export function Scholarships({ country }: { country: Country }) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand/10 to-brand/5 p-10 md:p-16 border border-brand/10"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-brand shadow-lg shadow-brand/30">
              <span className="text-4xl font-black text-white">$</span>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4 tracking-tight">
                Гранты и финансирование
              </h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-neutral-600 max-w-2xl">
                {country.scholarships}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}