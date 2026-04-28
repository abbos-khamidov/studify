"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Country } from "@/lib/countries";
import { cn } from "@/lib/utils";

export function CountryHero({ country }: { country: Country }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex h-[85vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        country.gradient
      )}
    >
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('/noise.png')]" />
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 h-[40vh] w-[40vh] rounded-full bg-white/30 blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-white/20 blur-[150px]" 
      />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/50 px-5 py-2.5 backdrop-blur-md shadow-sm"
        >
          <span className="text-2xl drop-shadow-sm">{country.flag}</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900/80">
            Обучение в
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] leading-[0.85] tracking-tighter md:text-[8vw] font-black text-neutral-900 mix-blend-color-burn drop-shadow-sm"
        >
          {country.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg font-medium text-neutral-800 md:text-xl lg:text-2xl leading-relaxed"
        >
          {country.description}
        </motion.p>
      </motion.div>
    </section>
  );
}