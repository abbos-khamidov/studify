"use client";

import { motion } from "framer-motion";
import { Country } from "@/lib/countries";

export function WhyChoose({ country }: { country: Country }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-6">
            Почему <span className="text-brand">{country.name}?</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {country.whyReasons.map((reason, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="group flex items-start gap-6 rounded-3xl bg-white p-8 border border-neutral-100 transition-all hover:shadow-md hover:shadow-brand-active hover:border-brand/20"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-xl font-black text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                0{idx + 1}
              </div>
              <p className="mt-3 text-lg font-bold leading-tight text-neutral-800">
                {reason}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}