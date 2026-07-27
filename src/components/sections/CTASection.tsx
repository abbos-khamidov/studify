"use client";

import * as React from "react";
import { Phone, Send, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLocale, type Locale } from "@/hooks/useLocale";

function formatPhoneInput(value: string) {
  const trimmed = value.trimStart();
  return trimmed.startsWith("+") ? trimmed : `+${trimmed.replace(/^\+/, "")}`;
}

const copy: Record<Locale, {
  title: string;
  subtitle: string;
  name: string;
  phone: string;
  submit: string;
  error: string;
  message: string;
  messageName: string;
  messagePhone: string;
}> = {
  uz: {
    title: "Hayotingizni o'zgartirishga tayyormisiz?",
    subtitle: "Kontaktlaringizni qoldiring - konsultant qabul bo'yicha savolingizga javob beradi.",
    name: "Ismingiz",
    phone: "Telefon raqami",
    submit: "Savol berish",
    error: "Ism va telefon raqamini kiriting",
    message: "Assalomu alaykum! O'qishga kirish bo'yicha savol bermoqchiman.",
    messageName: "Ism",
    messagePhone: "Telefon",
  },
  ru: {
    title: "Готов изменить свою жизнь?",
    subtitle: "Оставь контакты — консультант ответит на вопрос по поступлению.",
    name: "Ваше имя",
    phone: "Номер телефона",
    submit: "Задать вопрос",
    error: "Введите имя и номер телефона",
    message: "Здравствуйте! Хочу задать вопрос по поступлению.",
    messageName: "Имя",
    messagePhone: "Телефон",
  },
  en: {
    title: "Ready to change your future?",
    subtitle: "Leave your contacts and a consultant will answer your admission question.",
    name: "Your name",
    phone: "Phone number",
    submit: "Ask a question",
    error: "Enter your name and phone number",
    message: "Hello! I want to ask a question about admission.",
    messageName: "Name",
    messagePhone: "Phone",
  },
};

export function CTASection() {
  const locale = useLocale();
  const t = copy[locale];
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("+998 ");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !subtitleRef.current || !formRef.current) return;
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const form = formRef.current;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(section, { backgroundColor: "#FF8225" });
        gsap.fromTo(
          [heading, subtitle, form],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
        return;
      }

      gsap.set(section, { backgroundColor: "#FFFFFF" });
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=200",
        end: "center center",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(section, {
            backgroundColor: `rgb(${Math.round(255)}, ${Math.round(255 - 125 * p)}, ${Math.round(255 - 218 * p)})`,
          });
        },
      });

      gsap.fromTo(
        heading,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.82,
          delay: 0.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        form,
        { opacity: 0, y: -100, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.86,
          delay: 0.4,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || phone.replace(/\D/g, "").length < 9) {
      setError(t.error);
      return;
    }

    setError("");
    const message = encodeURIComponent(
      `${t.message} ${t.messageName}: ${name.trim()}. ${t.messagePhone}: ${phone}`
    );
    window.open(`https://wa.me/998939492000?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact-form" ref={sectionRef} className="relative w-full scroll-mt-24 overflow-hidden py-20 lg:py-24">
      <div className="cta-float-circle absolute -left-20 top-8 h-[220px] w-[220px] rounded-full bg-[#FFA54D] opacity-15" />
      <div className="cta-float-circle absolute right-[-90px] top-12 h-[340px] w-[340px] rounded-full bg-[#FFA54D] opacity-15 [animation-delay:1.2s]" />
      <div className="cta-float-circle absolute left-1/3 bottom-[-140px] h-[280px] w-[280px] rounded-full bg-[#FFA54D] opacity-15 [animation-delay:2.3s]" />
      <div className="cta-float-circle absolute right-1/4 bottom-[-120px] h-[200px] w-[200px] rounded-full bg-[#FFA54D] opacity-15 [animation-delay:0.7s]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 ref={headingRef} className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t.title}
          </h2>
          <p ref={subtitleRef} className="text-white/85 text-lg mt-6 font-medium">
            {t.subtitle}
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 rounded-2xl bg-white p-3 text-left shadow-[0_16px_48px_rgba(26,17,8,0.2)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
          >
            <label className="flex min-h-14 items-center rounded-xl border border-neutral-200 bg-neutral-50 px-4 focus-within:border-brand focus-within:bg-white">
              <User className="mr-3 h-4 w-4 shrink-0 text-brand" />
              <span className="sr-only">{t.name}</span>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (error) setError("");
                }}
                placeholder={t.name}
                className="min-w-0 flex-1 bg-transparent text-base font-semibold text-primary outline-none placeholder:text-secondary/70"
              />
            </label>
            <label className="flex min-h-14 items-center rounded-xl border border-neutral-200 bg-neutral-50 px-4 focus-within:border-brand focus-within:bg-white">
              <Phone className="mr-3 h-4 w-4 shrink-0 text-brand" />
              <span className="sr-only">{t.phone}</span>
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(formatPhoneInput(event.target.value));
                  if (error) setError("");
                }}
                placeholder="+998 90 123 45 67"
                className="min-w-0 flex-1 bg-transparent text-base font-semibold text-primary outline-none placeholder:text-secondary/70"
                aria-invalid={Boolean(error)}
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-extrabold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Send className="h-4 w-4" />
              {t.submit}
            </button>
            {error ? <p className="px-1 text-sm font-semibold text-red-600 md:col-span-3">{error}</p> : null}
          </form>
        </div>
      </Container>
    </section>
  );
}
