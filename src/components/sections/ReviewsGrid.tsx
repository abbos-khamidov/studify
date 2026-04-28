// components/features/reviews/ReviewsGrid.tsx
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  id: number;
  name: string;
  uni: string;
  flag: string;
  quote: string;
  initials: string;
  avatarClass: string;
  year: string;
}

export function ReviewsGrid({ items }: { items: Testimonial[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };


 

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
    >
      {items.map((t) => (
        <Link href={`/reviews/${t.id}`} key={t.id} className="block">
          <motion.div
            className="break-inside-avoid relative rounded-[2rem] border border-[#E8E6E1] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-brand/20 group"
          >
            <Quote 
              size={40} 
            className="absolute top-6 right-6 text-neutral-100 rotate-180 transition-colors duration-300 group-hover:text-brand/10" 
          />
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${t.avatarClass}`}>
              {t.initials}
            </div>
            <div>
              <div className="text-lg font-extrabold text-primary leading-tight">
                {t.name}
              </div>
              <div className="mt-1 text-sm font-semibold text-secondary flex items-center gap-1.5">
                <span className="text-base">{t.flag}</span>
                {t.uni}
              </div>
            </div>
          </div>

          <p className="text-[#1A1108] text-lg leading-relaxed relative z-10 font-medium" style={{ fontFamily: "var(--font-playfair), serif" }}>
            «{t.quote}»
          </p>

          <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-between">
            <div className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
              Зачислен(а) в {t.year}
            </div>
            <div className="flex text-yellow-400 text-sm">
              ★★★★★
            </div>
          </div>
        </motion.div>
      </Link>
      ))}
    </motion.div>
  );
}