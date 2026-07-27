"use client";

import * as React from "react";
import { useLocale, type Locale } from "@/hooks/useLocale";

type TranslationSet = Partial<Record<Locale, string>>;

const PHRASES: Record<string, TranslationSet> = {
  "Страны": { uz: "Davlatlar", en: "Countries" },
  "Процесс": { uz: "Jarayon", en: "Process" },
  "Подбор": { uz: "Tanlash", en: "Matching" },
  "Про нас": { uz: "Biz haqimizda", en: "About us" },
  "Прайс": { uz: "Narxlar", en: "Pricing" },
  "Прайслист": { uz: "Narxlar", en: "Price list" },
  "Блог": { uz: "Blog", en: "Blog" },
  "Контакты": { uz: "Kontaktlar", en: "Contacts" },
  "Связаться": { uz: "Bog'lanish", en: "Contact" },
  "Бесплатная консультация": { uz: "Bepul konsultatsiya", en: "Free consultation" },
  "Задать вопрос": { uz: "Savol berish", en: "Ask a question" },
  "Получить консультацию": { uz: "Konsultatsiya olish", en: "Get a consultation" },
  "Узнать больше": { uz: "Batafsil", en: "Learn more" },
  "Узнать больше →": { uz: "Batafsil →", en: "Learn more →" },
  "Подробнее": { uz: "Batafsil", en: "Details" },
  "Читать": { uz: "O'qish", en: "Read" },
  "Все статьи": { uz: "Barcha maqolalar", en: "All articles" },
  "Отмена": { uz: "Bekor qilish", en: "Cancel" },
  "Далее →": { uz: "Keyingi →", en: "Next →" },
  "Показать результат →": { uz: "Natijani ko'rsatish →", en: "Show result →" },
  "Ваш номер телефона": { uz: "Telefon raqamingiz", en: "Your phone number" },
  "Ваше имя": { uz: "Ismingiz", en: "Your name" },
  "Номер телефона": { uz: "Telefon raqami", en: "Phone number" },
  "Оставьте заявку": { uz: "Ariza qoldiring", en: "Leave a request" },
  "Отправить заявку": { uz: "Ariza yuborish", en: "Send request" },
  "Заявка отправлена!": { uz: "Ariza yuborildi!", en: "Request sent!" },
  "Отправить ещё одну заявку": { uz: "Yana bitta ariza yuborish", en: "Send another request" },
  "Мы всегда на связи": { uz: "Biz doimo aloqadamiz", en: "We are always in touch" },
  "Адрес": { uz: "Manzil", en: "Address" },
  "Телефоны": { uz: "Telefonlar", en: "Phones" },
  "Социальные сети": { uz: "Ijtimoiy tarmoqlar", en: "Social media" },
  "Режим работы": { uz: "Ish vaqti", en: "Working hours" },
  "Посмотреть на карте →": { uz: "Xaritada ko'rish →", en: "View on map →" },
  "Написать сейчас →": { uz: "Hozir yozish →", en: "Message now →" },
  "Быстрый ответ в Telegram": { uz: "Telegramda tezkor javob", en: "Fast reply on Telegram" },
  "Все права защищены.": { uz: "Barcha huquqlar himoyalangan.", en: "All rights reserved." },
  "© 2026 Studify. Все права защищены.": { uz: "© 2026 Studify. Barcha huquqlar himoyalangan.", en: "© 2026 Studify. All rights reserved." },
  "Направления": { uz: "Yo'nalishlar", en: "Destinations" },
  "Услуги": { uz: "Xizmatlar", en: "Services" },
  "Документы": { uz: "Hujjatlar", en: "Documents" },
  "Визовая поддержка": { uz: "Viza yordami", en: "Visa support" },
  "Подбор вуза": { uz: "Universitet tanlash", en: "University matching" },
  "Как это работает": { uz: "Bu qanday ishlaydi", en: "How it works" },
  "Консультация": { uz: "Konsultatsiya", en: "Consultation" },
  "Подача": { uz: "Topshirish", en: "Application" },
  "Зачисление": { uz: "Qabul", en: "Enrollment" },
  "4 шага к мечте": { uz: "Orzuga 4 qadam", en: "4 steps to your goal" },
  "AI-подбор": { uz: "AI tanlov", en: "AI matching" },
  "Найди свой университет за 60 секунд": { uz: "Universitetingizni 60 soniyada toping", en: "Find your university in 60 seconds" },
  "Ответь на 5 вопросов и получи персональные рекомендации": { uz: "5 savolga javob bering va shaxsiy tavsiyalar oling", en: "Answer 5 questions and get personal recommendations" },
  "Начать подбор →": { uz: "Tanlashni boshlash →", en: "Start matching →" },
  "Мы подобрали для вас!": { uz: "Siz uchun tanladik!", en: "We found matches for you!" },
  "На основе ваших ответов:": { uz: "Javoblaringiz asosida:", en: "Based on your answers:" },
  "Обсудить": { uz: "Muhokama qilish", en: "Discuss" },
  "Совпадение:": { uz: "Moslik:", en: "Match:" },
  "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности": { uz: "Tugmani bosish orqali maxfiylik siyosatiga rozilik bildirasiz", en: "By clicking the button, you agree to the privacy policy" },
  "Мнения, советы и новости про обучение за рубежом": { uz: "Chet elda ta'lim haqida fikrlar, maslahatlar va yangiliklar", en: "Opinions, tips and news about studying abroad" },
  "Пишем о поступлении после школы, выборе университета, грантах, документах и реальных решениях для": { uz: "Maktabdan keyin qabul, universitet tanlash, grantlar, hujjatlar va amaliy yechimlar haqida yozamiz", en: "We write about admission after school, university choice, grants, documents and practical decisions for" },
  "студентов из Узбекистана.": { uz: "O'zbekistonlik talabalar uchun.", en: "students from Uzbekistan." },
  "Мнения": { uz: "Fikrlar", en: "Opinions" },
  "Советы": { uz: "Maslahatlar", en: "Tips" },
  "Новости": { uz: "Yangiliklar", en: "News" },
  "5 минут": { uz: "5 daqiqa", en: "5 min" },
  "4 минуты": { uz: "4 daqiqa", en: "4 min" },
  "6 минут": { uz: "6 daqiqa", en: "6 min" },
  "3 минуты": { uz: "3 daqiqa", en: "3 min" },
  "Университет за рубежом после школы: с чего начать": { uz: "Maktabdan keyin chet el universiteti: nimadan boshlash kerak", en: "University abroad after school: where to start" },
  "Как выбрать страну для обучения за рубежом": { uz: "Chet elda o'qish uchun davlatni qanday tanlash kerak", en: "How to choose a country for studying abroad" },
  "Гранты и документы: что влияет на шанс поступления": { uz: "Grantlar va hujjatlar: qabul imkoniyatiga nima ta'sir qiladi", en: "Grants and documents: what affects admission chances" },
  "Новости поступления: почему дедлайны нужно проверять заранее": { uz: "Qabul yangiliklari: nega dedlaynlarni oldindan tekshirish kerak", en: "Admission news: why deadlines must be checked early" },
  "Пошаговый разбор для абитуриентов и родителей: страна, бюджет, язык, документы и дедлайны.": { uz: "Abituriyent va ota-onalar uchun bosqichma-bosqich yo'l: davlat, byudjet, til, hujjatlar va muddatlar.", en: "A step-by-step guide for applicants and parents: country, budget, language, documents and deadlines." },
  "Наше мнение: страна должна подходить не только по рейтингу вузов, но и по бюджету, визе и рынку труда.": { uz: "Bizning fikrimiz: davlat faqat reyting bo'yicha emas, byudjet, viza va mehnat bozori bo'yicha ham mos kelishi kerak.", en: "Our view: a country should fit not only rankings, but also budget, visa rules and the job market." },
  "Какие документы усиливают заявку и почему мотивационное письмо нельзя писать в последний день.": { uz: "Qaysi hujjatlar arizani kuchaytiradi va motivatsion xatni nega oxirgi kuni yozmaslik kerak.", en: "Which documents strengthen an application and why a motivation letter should not be written last minute." },
  "Дедлайны, требования и правила подачи меняются. Как не пропустить окно поступления в зарубежный вуз.": { uz: "Dedlaynlar, talablar va topshirish qoidalari o'zgaradi. Chet el universitetiga qabul oynasini o'tkazib yubormaslik yo'li.", en: "Deadlines, requirements and application rules change. How not to miss the admission window abroad." },
  "Нужен план поступления?": { uz: "Qabul rejasi kerakmi?", en: "Need an admission plan?" },
  "Оставьте заявку, и консультант Studify разберёт ваш случай по стране, бюджету и срокам.": { uz: "Ariza qoldiring, Studify konsultanti davlatingiz, byudjetingiz va muddatlaringiz bo'yicha holatingizni ko'rib chiqadi.", en: "Leave a request and a Studify consultant will review your country, budget and timing." },
  "Страны для обучения за рубежом": { uz: "Chet elda o'qish uchun davlatlar", en: "Countries for studying abroad" },
  "Подберите направление по бюджету, языку обучения, грантам и перспективам после выпуска.": { uz: "Byudjet, ta'lim tili, grantlar va bitirgandan keyingi imkoniyatlarga qarab yo'nalish tanlang.", en: "Choose a destination by budget, study language, grants and post-graduation prospects." },
  "Топ университеты": { uz: "Top universitetlar", en: "Top universities" },
  "Средний бюджет": { uz: "O'rtacha byudjet", en: "Average budget" },
  "Ждут тебя": { uz: "Sizni kutmoqda", en: "Waiting for you" },
  "Гранты и финансирование": { uz: "Grantlar va moliyalashtirish", en: "Grants and funding" },
  "Почему": { uz: "Nega", en: "Why" },
  "Обучение в": { uz: "Ta'lim:", en: "Study in" },
  "Южная Корея": { uz: "Janubiy Koreya", en: "South Korea" },
  "Турция": { uz: "Turkiya", en: "Turkey" },
  "Германия": { uz: "Germaniya", en: "Germany" },
  "Великобритания": { uz: "Buyuk Britaniya", en: "United Kingdom" },
  "Малайзия": { uz: "Malayziya", en: "Malaysia" },
  "Франция": { uz: "Fransiya", en: "France" },
  "Польша": { uz: "Polsha", en: "Poland" },
  "Чехия": { uz: "Chexiya", en: "Czech Republic" },
  "Австралия": { uz: "Avstraliya", en: "Australia" },
  "Канада": { uz: "Kanada", en: "Canada" },
  "ОАЭ": { uz: "BAA", en: "UAE" },
  "Другая страна": { uz: "Boshqa davlat", en: "Other country" },
  "университетов": { uz: "universitet", en: "universities" },
  "Передовые технологии, K-культура и доступные цены.": { uz: "Ilg'or texnologiyalar, K-madaniyat va qulay narxlar.", en: "Advanced technology, K-culture and affordable costs." },
  "Стипендии, культурная близость и доступное образование.": { uz: "Stipendiyalar, madaniy yaqinlik va qulay ta'lim.", en: "Scholarships, cultural closeness and affordable education." },
  "Бесплатное обучение в государственных университетах.": { uz: "Davlat universitetlarida bepul ta'lim.", en: "Free study at public universities." },
  "Престиж, английский язык и дипломы с мировым признанием.": { uz: "Prestij, ingliz tili va dunyo tan oladigan diplomlar.", en: "Prestige, English-language study and globally recognized degrees." },
  "Обучение на английском, тропики и доступная жизнь.": { uz: "Ingliz tilida ta'lim, tropik muhit va qulay yashash.", en: "English-language study, tropical climate and affordable living." },
  "Низкая стоимость обучения, искусство, дизайн и бизнес.": { uz: "Arzon ta'lim, san'at, dizayn va biznes.", en: "Low tuition, art, design and business." },
  "Гранты и стипендии": { uz: "Grantlar va stipendiyalar", en: "Grants and scholarships" },
  "Стипендии GKS": { uz: "GKS stipendiyalari", en: "GKS scholarships" },
  "Стипендии DAAD": { uz: "DAAD stipendiyalari", en: "DAAD scholarships" },
  "Стипендии Chevening": { uz: "Chevening stipendiyalari", en: "Chevening scholarships" },
  "Стипендии Türkiye": { uz: "Türkiye stipendiyalari", en: "Türkiye scholarships" },
  "Стипендии MIS": { uz: "MIS stipendiyalari", en: "MIS scholarships" },
  "Стипендии Eiffel": { uz: "Eiffel stipendiyalari", en: "Eiffel scholarships" },
  "Какой бюджет на обучение в год?": { uz: "Yiliga ta'lim uchun byudjetingiz qancha?", en: "What is your annual study budget?" },
  "Бюджет не важен": { uz: "Byudjet muhim emas", en: "Budget does not matter" },
  "Какое направление интересует?": { uz: "Qaysi yo'nalish qiziqtiradi?", en: "Which field interests you?" },
  "IT и программирование": { uz: "IT va dasturlash", en: "IT and programming" },
  "Бизнес и менеджмент": { uz: "Biznes va menejment", en: "Business and management" },
  "Медицина": { uz: "Tibbiyot", en: "Medicine" },
  "Дизайн и искусство": { uz: "Dizayn va san'at", en: "Design and art" },
  "На каком языке хочешь учиться?": { uz: "Qaysi tilda o'qimoqchisiz?", en: "Which language do you want to study in?" },
  "Английский": { uz: "Ingliz tili", en: "English" },
  "Немецкий": { uz: "Nemis tili", en: "German" },
  "Французский": { uz: "Fransuz tili", en: "French" },
  "Не важно": { uz: "Muhim emas", en: "Does not matter" },
  "Какой климат предпочитаешь?": { uz: "Qanday iqlimni afzal ko'rasiz?", en: "What climate do you prefer?" },
  "Тёплый": { uz: "Iliq", en: "Warm" },
  "Умеренный": { uz: "Mo'tadil", en: "Moderate" },
  "Тропический": { uz: "Tropik", en: "Tropical" },
  "Что важнее всего?": { uz: "Eng muhimi nima?", en: "What matters most?" },
  "Низкая стоимость": { uz: "Arzon narx", en: "Low cost" },
  "Престиж диплома": { uz: "Diplom nufuzi", en: "Degree prestige" },
  "Стипендии и гранты": { uz: "Stipendiyalar va grantlar", en: "Scholarships and grants" },
  "Простота поступления": { uz: "Qabulning soddaligi", en: "Easy admission" },
  "Привет! Нужна помощь?": { uz: "Salom! Yordam kerakmi?", en: "Hi! Need help?" },
  "AI-Консультант Studify": { uz: "Studify AI konsultanti", en: "Studify AI Consultant" },
  "Напишите сообщение...": { uz: "Xabar yozing...", en: "Write a message..." },
  "Закрыть чат": { uz: "Chatni yopish", en: "Close chat" },
  "Открыть меню": { uz: "Menyuni ochish", en: "Open menu" },
  "Закрыть меню": { uz: "Menyuni yopish", en: "Close menu" },
  "Русский": { uz: "Ruscha", en: "Russian" },
  "English": { uz: "Inglizcha", en: "English" },
  "O'zbek": { uz: "O'zbek", en: "Uzbek" },
};

const sourceByValue = new Map<string, string>();

for (const [source, translations] of Object.entries(PHRASES)) {
  sourceByValue.set(source, source);
  for (const value of Object.values(translations)) {
    if (value) sourceByValue.set(value, source);
  }
}

const textOriginals = new WeakMap<Text, string>();
const ATTRS = ["placeholder", "aria-label", "title"] as const;
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

function translateValue(value: string, locale: Locale) {
  const trimmed = value.trim();
  const source = sourceByValue.get(trimmed);
  if (source) {
    const translated = locale === "ru" ? source : PHRASES[source]?.[locale] ?? source;
    return value.replace(trimmed, translated);
  }

  if (locale === "ru") return value;

  let translatedValue = value;
  const phrases = Object.keys(PHRASES).sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    const translated = PHRASES[phrase]?.[locale];
    if (!translated || !translatedValue.includes(phrase)) continue;
    translatedValue = translatedValue.split(phrase).join(translated);
  }

  return translatedValue;
}

function translateElement(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  for (const node of textNodes) {
    const original = textOriginals.get(node) ?? node.textContent ?? "";
    if (!textOriginals.has(node)) textOriginals.set(node, original);
    node.textContent = translateValue(original, locale);
  }

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(root.querySelectorAll("*"));
  for (const element of elements) {
    if (SKIP_TAGS.has(element.tagName)) continue;

    for (const attr of ATTRS) {
      const current = element.getAttribute(attr);
      if (!current) continue;
      const dataAttr = `data-i18n-original-${attr}`;
      const original = element.getAttribute(dataAttr) ?? current;
      if (!element.hasAttribute(dataAttr)) element.setAttribute(dataAttr, original);
      element.setAttribute(attr, translateValue(original, locale));
    }
  }
}

export function LocaleDomTranslator() {
  const locale = useLocale();

  React.useEffect(() => {
    let running = false;
    const apply = () => {
      if (running) return;
      running = true;
      translateElement(document.body, locale);
      window.setTimeout(() => { running = false; }, 0);
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });
    return () => observer.disconnect();
  }, [locale]);

  return null;
}
