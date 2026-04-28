"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  ChevronDown,
} from "lucide-react";
import { SectionTag } from "@/components/ui/SectionTag";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";


// ─── Animation variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

// ─── Contact info data ─────────────────────────────────────────────────────

const COUNTRIES = [
  "Великобритания",
  "США",
  "Германия",
  "Франция",
  "Австралия",
  "Канада",
  "ОАЭ",
  "Южная Корея",
  "Чехия",
  "Польша",
  "Другая страна",
];

// ─── Sub-components ────────────────────────────────────────────────────────

function InfoCard({
  icon,
  title,
  children,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group flex gap-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_24px_rgba(255,130,37,0.12)]"
    >
      {/* Icon bubble */}
      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF8225]/10 text-[#FF8225] transition-colors group-hover:bg-[#FF8225] group-hover:text-white">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {title}
        </p>
        <div className="text-sm text-neutral-700 leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}

function PillInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-3.5 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 transition-all focus:border-[#FF8225] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,130,37,0.12)]"
      />
    </div>
  );
}

function PhoneInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Номер телефона
      </label>
      <div className="flex overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition-all focus-within:border-[#FF8225] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(255,130,37,0.12)]">
        <span className="flex items-center border-r border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-500 select-none">
          +998
        </span>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="90 123 45 67"
          className="flex-1 bg-transparent px-4 py-3.5 text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
        />
      </div>
    </div>
  );
}

function SelectInput({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-3.5 pr-10 text-sm text-neutral-800 outline-none transition-all focus:border-[#FF8225] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,130,37,0.12)]"
        >
          <option value="" disabled>
            Выберите страну…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
        />
      </div>
    </div>
  );
}

// ─── Page component ────────────────────────────────────────────────────────

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", country: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.country) return;
    // TODO: replace with real API call
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pb-16 pt-24">
        <Container>
          <motion.div
            className="flex flex-col items-center gap-4 text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div custom={0}>
              <SectionTag>Контакты</SectionTag>
            </motion.div>

            <motion.div custom={1}>
              <SectionTitle>Мы всегда на связи</SectionTitle>
            </motion.div>

            <motion.p
              custom={2}
              className="max-w-xl text-base text-neutral-500"
            >
              Задайте любой вопрос об обучении за рубежом — наши консультанты
              ответят в течение рабочего дня.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <section className="pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left – contact info */}
            <div className="flex flex-col gap-4">
              {/* Address */}
              <InfoCard
                index={0}
                title="Адрес"
                icon={<MapPin size={20} />}
              >
                <p>г. Ташкент, Узбекистан</p>
                <a
                  href="https://maps.google.com/?q=Tashkent,Uzbekistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[#FF8225] font-medium hover:underline"
                >
                  Посмотреть на карте →
                </a>
              </InfoCard>

              {/* Phone */}
              <InfoCard
                index={1}
                title="Телефоны"
                icon={<Phone size={20} />}
              >
                <a
                  href="tel:+998901234567"
                  className="block hover:text-[#FF8225] transition-colors font-medium"
                >
                  +998 90 123 45 67
                </a>
                <a
                  href="tel:+998712345678"
                  className="block hover:text-[#FF8225] transition-colors font-medium"
                >
                  +998 71 234 56 78
                </a>
              </InfoCard>

              {/* Social */}
              <InfoCard
                index={2}
                title="Социальные сети"
                icon={<MessageCircle size={20} />}
              >
                <div className="flex flex-col gap-1">
                  <a
                    href="https://t.me/studify_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium hover:text-[#FF8225] transition-colors"
                  >
                    <MessageCircle size={14} className="shrink-0" />
                    Telegram: @studify_uz
                  </a>
                  <a
                    href="https://instagram.com/studify.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium hover:text-[#FF8225] transition-colors"
                  >
                    <Instagram size={14} className="shrink-0" />
                    Instagram: @studify.uz
                  </a>
                </div>
              </InfoCard>

              {/* Hours */}
              <InfoCard
                index={3}
                title="Режим работы"
                icon={<Clock size={20} />}
              >
                <p>
                  <span className="font-medium">Пн — Сб:</span> 10:00 — 19:00
                </p>
                <p className="text-neutral-400">Воскресенье — выходной</p>
              </InfoCard>

              {/* Quick CTA strip */}
              <motion.div
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-2 flex items-center gap-3 rounded-2xl border border-[#FF8225]/20 bg-[#FF8225]/5 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF8225] text-white">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">
                    Быстрый ответ в Telegram
                  </p>
                  <a
                    href="https://t.me/studify_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FF8225] hover:underline"
                  >
                    Написать сейчас →
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right – form card */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 shadow-[0_8px_48px_rgba(0,0,0,0.08)] lg:p-10"
            >
              {/* Decorative blob */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FF8225]/8 blur-3xl"
              />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF8225]/10 text-[#FF8225]">
                    <Send size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800">
                    Заявка отправлена!
                  </h3>
                  <p className="max-w-xs text-sm text-neutral-500">
                    Наш консультант свяжется с вами в течение рабочего дня.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", phone: "", country: "" });
                    }}
                    className="mt-2 text-sm font-medium text-[#FF8225] hover:underline"
                  >
                    Отправить ещё одну заявку
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Оставьте заявку
                    </h2>
                    <p className="mt-1.5 text-sm text-neutral-500">
                      Мы перезвоним и бесплатно проконсультируем.
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    <PillInput
                      label="Ваше имя"
                      type="text"
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                    />

                    <PhoneInput
                      value={form.phone}
                      onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                    />

                    <SelectInput
                      label="Страна интереса"
                      options={COUNTRIES}
                      value={form.country}
                      onChange={(v) => setForm((f) => ({ ...f, country: v }))}
                    />

                    {/* Submit */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="mt-2"
                    >
                      <Button
                        onClick={handleSubmit}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF8225] px-6 py-4 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,130,37,0.35)] transition-shadow hover:shadow-[0_6px_24px_rgba(255,130,37,0.45)]"
                      >
                        <Send size={16} />
                        Отправить заявку
                      </Button>
                    </motion.div>

                    <p className="text-center text-xs text-neutral-400">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="/privacy" className="underline hover:text-[#FF8225]">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.10)]"
            style={{ filter: "grayscale(30%)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191953.16890419556!2d69.13298335!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studify на карте — Ташкент, Узбекистан"
            />
          </motion.div>
        </Container>
      </section>
    </main>
  );
}