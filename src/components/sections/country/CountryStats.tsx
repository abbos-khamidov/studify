// components/features/country/Stats.tsx
"use client";

import { motion } from "framer-motion";
import { Country } from "@/lib/countries";

export function CountryStats({ country }: { country: Country }) {
  const stats = [
    { label: "Средний бюджет", value: country.price },
    { label: "Ждут тебя", value: country.uniCount },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24 lg:mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto -mt-24 md:-mt-32 relative z-30">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/50 transition-all shadow-brand-light hover:shadow-brand hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-bold uppercase tracking-wider text-neutral-500">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}