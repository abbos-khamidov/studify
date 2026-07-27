"use client";

import * as React from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale, type Locale } from "@/hooks/useLocale";

interface Message {
  id: string;
  isBot: boolean;
  text: string;
  from?: "left" | "right";
}

type SuggestionKey = "koreaCost" | "documents" | "scholarships" | "noIelts";

const chatCopy: Record<Locale, {
  tooltip: string;
  title: string;
  close: string;
  placeholder: string;
  initial: string;
  fallback: string;
  suggestions: Record<SuggestionKey, string>;
  responses: Record<SuggestionKey, string>;
}> = {
  uz: {
    tooltip: "Salom! Yordam kerakmi?",
    title: "Studify AI konsultanti",
    close: "Chatni yopish",
    placeholder: "Xabar yozing...",
    initial: "Salom! Men Studify AI konsultantiman. Universitet tanlash, davlatlar va narxlar bo'yicha yordam beraman. Nimani bilmoqchisiz?",
    fallback: "Savolingiz uchun rahmat! Menejerimiz tez orada siz bilan bog'lanadi. Hozircha davlat tanlash uchun quizdan o'tishingiz mumkin.",
    suggestions: {
      koreaCost: "Koreyada narxlar",
      documents: "Hujjatlar",
      scholarships: "Stipendiyalar",
      noIelts: "IELTSsiz",
    },
    responses: {
      koreaCost: "Janubiy Koreyada ta'lim yiliga $3,000 dan boshlanadi. Xarajatlarni 100% gacha qoplaydigan GKS stipendiyasi ham bor.",
      documents: "Asosiy paket: attestat/diplom, baholar transkripti, motivatsion xat, tavsiyalar va til sertifikati. Hujjatlarni kalit topshirishgacha tayyorlaymiz.",
      scholarships: "Ko'p davlatlarda grantlar bor: masalan, Turkiya Burslari va Germaniyada DAAD. Grant uchun yuqori GPA va kuchli motivatsion xat muhim.",
      noIelts: "IELTSsiz Malayziyaga ichki test orqali yoki Turkiya/Koreya kabi mahalliy tilda o'qitiladigan yo'nalishlarga kirish mumkin.",
    },
  },
  ru: {
    tooltip: "Привет! Нужна помощь?",
    title: "AI-Консультант Studify",
    close: "Закрыть чат",
    placeholder: "Напишите сообщение...",
    initial: "Привет! Я AI-консультант Studify. Помогу подобрать университет, расскажу про страны и стоимость. О чём хочешь узнать?",
    fallback: "Спасибо за вопрос! Наш менеджер скоро свяжется с вами, чтобы обсудить это подробнее. Пока можете пройти Quiz для подбора страны.",
    suggestions: {
      koreaCost: "Стоимость в Корее",
      documents: "Документы",
      scholarships: "Стипендии",
      noIelts: "Без IELTS",
    },
    responses: {
      koreaCost: "Обучение в Южной Корее начинается от $3,000 в год. Также есть стипендия GKS, покрывающая до 100% расходов.",
      documents: "Базовый пакет: аттестат/диплом, транскрипт оценок, мотивационное письмо, рекомендации и сертификат языка. Мы помогаем собрать всё под ключ.",
      scholarships: "Многие страны предлагают гранты: например, Turkiye Burslari и DAAD в Германии. Для гранта важен высокий средний балл и сильное мотивационное письмо.",
      noIelts: "Без IELTS можно поступить в Малайзию через внутренний тест или выбрать страны с обучением на местном языке, например Турцию или Корею.",
    },
  },
  en: {
    tooltip: "Hi! Need help?",
    title: "Studify AI Consultant",
    close: "Close chat",
    placeholder: "Write a message...",
    initial: "Hi! I am the Studify AI consultant. I can help choose a university and explain countries and costs. What would you like to know?",
    fallback: "Thanks for the question. Our manager will contact you soon to discuss it. You can also take the quiz to choose a country.",
    suggestions: {
      koreaCost: "Cost in Korea",
      documents: "Documents",
      scholarships: "Scholarships",
      noIelts: "No IELTS",
    },
    responses: {
      koreaCost: "Study in South Korea starts from $3,000 per year. The GKS scholarship can cover up to 100% of costs.",
      documents: "The basic package includes certificate/diploma, transcript, motivation letter, recommendations and a language certificate. We prepare it end to end.",
      scholarships: "Many countries offer grants, including Turkiye Burslari and DAAD in Germany. Strong GPA and a clear motivation letter matter most.",
      noIelts: "Without IELTS, you can consider Malaysia with an internal test or countries with local-language tracks, such as Turkey or Korea.",
    },
  },
};

const DEFAULT_SUGGESTIONS: SuggestionKey[] = ["koreaCost", "documents", "scholarships", "noIelts"];

function getSuggestionKey(text: string, locale: Locale): SuggestionKey | null {
  const clean = text.trim();
  const found = DEFAULT_SUGGESTIONS.find((key) => chatCopy[locale].suggestions[key] === clean);
  return found ?? null;
}

export function ChatWidget() {
  const locale = useLocale();
  const t = chatCopy[locale];
  const [isOpen, setIsOpen] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isThinking, setIsThinking] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<SuggestionKey[]>(DEFAULT_SUGGESTIONS);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "init",
      isBot: true,
      text: chatCopy.uz.initial,
      from: "left",
    }
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const tooltipTimerRef = React.useRef<number | null>(null);
  const tooltipHideTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  React.useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0].id !== "init") return prev;
      return [{ ...prev[0], text: t.initial }];
    });
  }, [t.initial]);

  React.useEffect(() => {
    tooltipTimerRef.current = window.setTimeout(() => {
      setShowTooltip(true);
      tooltipHideTimerRef.current = window.setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 10000);

    return () => {
      if (tooltipTimerRef.current) window.clearTimeout(tooltipTimerRef.current);
      if (tooltipHideTimerRef.current) window.clearTimeout(tooltipHideTimerRef.current);
    };
  }, []);

  const updateSuggestions = React.useCallback((source: string) => {
    const normalized = source.toLowerCase();
    if (normalized.includes("коре") || normalized.includes("korea") || normalized.includes("koreya")) {
      setSuggestions(["koreaCost", "scholarships", "documents"]);
      return;
    }
    if (normalized.includes("документ") || normalized.includes("hujjat") || normalized.includes("document")) {
      setSuggestions(["documents", "noIelts", "scholarships"]);
      return;
    }
    if (normalized.includes("стипенд") || normalized.includes("grant") || normalized.includes("scholar") || normalized.includes("stipend")) {
      setSuggestions(["scholarships", "koreaCost", "noIelts"]);
      return;
    }
    setSuggestions(DEFAULT_SUGGESTIONS);
  }, []);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setShowTooltip(false);
    const clean = text.trim();
    const userMsg: Message = { id: Date.now().toString(), isBot: false, text: clean, from: "right" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      const key = getSuggestionKey(clean, locale);
      const responseText = key ? t.responses[key] : t.fallback;
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), isBot: true, text: responseText, from: "left" }
      ]);
      updateSuggestions(clean);
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="absolute bottom-[72px] right-0 max-w-[180px] rounded-xl bg-white px-3 py-2 text-xs font-semibold text-primary shadow-[0_10px_24px_rgba(26,17,8,0.16)]"
            >
              {t.tooltip}
              <span className="absolute -bottom-2 right-5 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full border transition-transform hover:scale-110",
            isOpen
              ? "bg-brand text-white border-brand shadow-md"
              : "bg-white text-brand border-brand/20 shadow-[0_8px_24px_rgba(26,17,8,0.12)]"
          )}
        >
          {!isOpen && <span className="chat-ring pointer-events-none absolute inset-0 rounded-full border-2 border-brand/55" />}
          {isOpen ? <X className="relative z-10 h-6 w-6" /> : <MessageCircle className="relative z-10 h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1, borderRadius: "999px", transformOrigin: "bottom right", x: 26, y: 16 }}
            animate={{ opacity: 1, scale: 1, borderRadius: "24px", x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.1, borderRadius: "999px", transformOrigin: "bottom right", x: 26, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, duration: 0.4 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-32px)] md:w-[400px] h-[70vh] md:h-[560px] max-h-[800px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand font-extrabold text-sm">
                  AI
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-[2.5px] border-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm tracking-tight">{t.title}</h3>
                <p className="text-xs text-secondary font-medium">Online</p>
              </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-secondary transition-colors hover:border-brand hover:text-brand"
                aria-label={t.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-tertiary">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, x: msg.isBot ? -12 : 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={cn(
                    "px-4 py-3 text-sm max-w-[85%] font-medium leading-relaxed",
                    msg.isBot
                      ? "self-start bg-white border border-gray-100 text-primary rounded-2xl rounded-bl-sm shadow-sm"
                      : "self-end bg-brand text-white rounded-2xl rounded-br-sm shadow-sm"
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isThinking && (
                <div className="self-start rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#9C9590]" />
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#9C9590]" style={{ animationDelay: "0.15s" }} />
                    <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#9C9590]" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-5 py-3 flex flex-wrap gap-2 bg-white border-t border-gray-50">
              <AnimatePresence initial={false}>
                {suggestions.map((chip, index) => (
                  <motion.button
                  key={chip}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleSend(t.suggestions[chip])}
                  className="text-xs font-semibold px-3 py-2 rounded-full bg-brand-light text-brand hover:bg-brand hover:text-white transition-colors border border-brand/10"
                >
                  {t.suggestions[chip]}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-gray-100 bg-white flex gap-3 items-center">
              <input
                type="text"
                placeholder={t.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                className="flex-1 bg-tertiary rounded-full px-5 py-3 text-sm outline-none border border-transparent focus:border-brand/30 focus:bg-white transition-all font-medium"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                className="w-11 h-11 rounded-full bg-brand flex flex-shrink-0 items-center justify-center text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-sm"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .chat-ring {
          animation: chat-ring 3s ease-out infinite;
        }
        .chat-dot {
          animation: chat-dot 0.7s ease-in-out infinite;
        }
        @keyframes chat-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes chat-dot {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </>
  );
}
