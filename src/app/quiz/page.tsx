"use client";

import * as React from "react";
import Link from "next/link";
import { quizQuestions } from "@/lib/quiz-data";
import { countries } from "@/lib/countries";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<{ qId: number; optionIdx: number }[]>([]);
  const [showResult, setShowResult] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const question = quizQuestions[currentQuestion];

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    const existingIdx = newAnswers.findIndex((a) => a.qId === question.id);
    if (existingIdx >= 0) {
      newAnswers[existingIdx] = { qId: question.id, optionIdx: idx };
    } else {
      newAnswers.push({ qId: question.id, optionIdx: idx });
    }
    setAnswers(newAnswers);
  };

  const currentAnswer = answers.find((a) => a.qId === question?.id);

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResults = () => {
    const tagCounts: Record<string, number> = {};
    answers.forEach((ans) => {
      const q = quizQuestions.find((qu) => qu.id === ans.qId);
      if (q) {
        const option = q.options[ans.optionIdx];
        option.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
    const top3Slugs = sortedTags.slice(0, 3).map((t) => t[0]);
    
    return top3Slugs.map((slug) => {
      const country = countries.find((c) => c.slug === slug);
      const score = Math.round((tagCounts[slug] / quizQuestions.length) * 100);
      return { country, score };
    }).filter(r => r.country);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto mt-12 px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-sm font-bold text-secondary hover:text-primary transition-colors">Отмена</Link>
        </div>

        {!showResult ? (
          <div>
            <div className="flex gap-2 mb-10">
              {quizQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    idx <= currentQuestion ? "bg-brand" : "bg-brand-light"
                  )}
                />
              ))}
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-primary max-w-2xl min-h-[80px]">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {question.options.map((opt, idx) => {
                const isSelected = currentAnswer?.optionIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      "flex items-center gap-4 p-8 rounded-2xl border text-left cursor-pointer transition-all hover:-translate-y-1 hover:shadow-sm group",
                      isSelected ? "border-brand bg-brand-light shadow-sm shadow-brand" : "border-gray-200 bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-lg font-bold transition-colors",
                      isSelected ? "bg-brand text-white" : "bg-secondary/10 text-secondary group-hover:bg-brand-light group-hover:text-brand"
                    )}>
                      {isSelected ? <h1>✓</h1> : String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-bold text-primary">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="bg-brand text-white font-bold h-14 px-10 rounded-pill hover:bg-brand-hover hover:shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none"
              >
                {currentQuestion === quizQuestions.length - 1 ? "Показать результат \u2192" : "Далее \u2192"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-16 animate-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">Мы подобрали для вас!</h3>
            <p className="text-lg text-secondary mt-4 mb-16 font-medium">На основе ваших ответов:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {getResults().map((res, idx) => res.country && (
                <Link
                  href={`/countries/${res.country.slug}`}
                  key={idx}
                  className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-brand hover:-translate-y-2 hover:border-brand-light transition-all group duration-500 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${res.country.gradient}`} />
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left duration-500">{res.country.flag}</div>
                  <h4 className="font-extrabold text-2xl mb-2 text-primary">{res.country.name}</h4>
                  <div className="text-brand font-bold text-sm mb-4 bg-brand-light px-3 py-1 rounded-full w-fit">
                  Совпадение: {res.score}%
                </div>
                <p className="text-sm text-secondary font-medium leading-relaxed">{res.country.description}</p>
              </Link>
            ))}
          </div>

            <div className="mt-20 max-w-md mx-auto">
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="relative flex flex-col md:flex-row items-center gap-3 p-2 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-neutral-100 focus-within:border-brand/30 focus-within:shadow-[0_20px_50px_rgba(var(--brand-rgb),0.1)] transition-all duration-500"
              >
                <div className="flex-1 w-full px-4">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="tel" 
                    placeholder="Ваш номер телефона"
                    className="w-full disabled:opacity-50 h-12 bg-transparent border-none outline-none text-neutral-900 font-bold placeholder:text-neutral-400 placeholder:font-medium"
                  />
                </div>
                
                <button 
                  disabled={inputValue.trim() === ''}
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-black h-14 px-8 rounded-[1.5rem] hover:bg-brand transition-all active:scale-95 shrink-0"
                >
                  <span>Обсудить</span>
                  <ArrowRight size={18} />
                </button>
              </form>
              
              <p className="mt-4 text-xs text-neutral-400 font-medium">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
