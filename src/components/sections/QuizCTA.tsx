import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { buttonVariants } from "@/components/ui/Button";

export function QuizCTA() {
  return (
    <section className="py-20 lg:py-[120px] bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <SectionTag className="mb-6">AI-подбор</SectionTag>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-primary mb-5">
            Найди свой университет за 60 секунд
          </h2>
          <p className="text-lg text-secondary mb-10 font-medium">
            Ответь на 5 вопросов и получи персональные рекомендации
          </p>
          <Link href="/quiz" className={buttonVariants({ size: "lg", className: "px-10 h-14 text-lg" })}>
            Начать подбор &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
