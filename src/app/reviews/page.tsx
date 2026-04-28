// app/reviews/page.tsx
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Navbar } from "@/components/sections/Navbar";
import { ReviewsGrid } from "@/components/sections/ReviewsGrid";

// Данные вынесены для использования в SSR (SEO) и клиентском компоненте
export const testimonials = [
  {
    id: 1,
    name: "Малика Каримова",
    uni: "Yonsei University",
    flag: "🇰🇷",
    quote: "Думала, поступить в корейский вуз невозможно без знания языка. Studify доказали обратное — за 2 месяца я получила оффер!",
    initials: "МК",
    avatarClass: "bg-rose-100 text-rose-700",
    year: "2024"
  },
  {
    id: 2,
    name: "Достон Ахмедов",
    uni: "TU Berlin",
    flag: "🇩🇪",
    quote: "Сэкономил кучу времени и нервов. Ребята подготовили все документы, помогли с визой. Сейчас учусь бесплатно!",
    initials: "ДА",
    avatarClass: "bg-amber-100 text-amber-700",
    year: "2024"
  },
  {
    id: 3,
    name: "Нигора Рашидова",
    uni: "UCSI University",
    flag: "🇲🇾",
    quote: "Получила стипендию 70% в Малайзии через Studify. Консультант был на связи 24/7.",
    initials: "НР",
    avatarClass: "bg-sky-100 text-sky-700",
    year: "2023"
  },
  {
    id: 4,
    name: "Жавлон Назаров",
    uni: "Bilkent University",
    flag: "🇹🇷",
    quote: "Подали заявки в 4 университета Турции — все приняли. Выбрал лучший вариант с грантом на 50%.",
    initials: "ЖН",
    avatarClass: "bg-orange-100 text-orange-700",
    year: "2024"
  },
  {
    id: 5,
    name: "Сабина Алиева",
    uni: "University of Oxford",
    flag: "🇬🇧",
    quote: "Мечта стала реальностью! Подготовка к интервью и написание мотивационного письма были на высшем уровне.",
    initials: "СА",
    avatarClass: "bg-indigo-100 text-indigo-700",
    year: "2023"
  },
  {
    id: 6,
    name: "Тимур Исмаилов",
    uni: "Sorbonne University",
    flag: "🇫🇷",
    quote: "Без знания тонкостей французской бюрократии я бы не справился. Спасибо команде за полное сопровождение.",
    initials: "ТИ",
    avatarClass: "bg-teal-100 text-teal-700",
    year: "2024"
  }
];

export const metadata: Metadata = {
  title: "Отзывы студентов | Studify",
  description: "Более 500+ историй успеха. Узнайте, как наши студенты поступили в топовые университеты мира со стипендиями.",
  openGraph: {
    title: "Отзывы студентов | Истории успеха Studify",
    description: "Читайте реальные отзывы студентов, поступивших в университеты США, Европы и Азии с нашей помощью.",
    type: "website",
    locale: "ru_RU",
  },
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  // Schema.org JSON-LD для отзывов
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Studify",
    url: "https://studify.uz", // Замените на ваш домен
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "524",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      datePublished: `${t.year}-01-01`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: t.quote,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#FAFAFA] selection:bg-brand selection:text-white pt-[100px]">
        {/* Header Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <Container className="relative z-10 text-center max-w-3xl">
            <SectionTag className="mb-6 mx-auto bg-white shadow-sm border-neutral-100">
              Истории успеха
            </SectionTag>
            <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight mb-6">
              Что говорят <br />
              <span className="text-brand">наши студенты</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary font-medium leading-relaxed">
              Мы помогли более 500 студентам поступить в вузы мечты по всему миру. 
              Вот лишь некоторые из их историй.
            </p>
          </Container>
        </section>

        {/* Grid Section */}
        <section className="pb-32 relative z-20">
          <Container>
            <ReviewsGrid items={testimonials} />
          </Container>
        </section>
      </main>
    </>
  );
}