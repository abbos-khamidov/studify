import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { CheckCircle2, Calendar, GraduationCap, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    slug: "malika-karimova-yonsei",
    name: "Малика Каримова",
    uni: "Yonsei University",
    country: "Южная Корея",
    flag: "🇰🇷",
    program: "Business Administration",
    grant: "100% (GKS Scholarship)",
    prepTime: "6 месяцев",
    ielts: "7.5",
    topQuote: "Путь в SKY-университет казался невозможным, но стратегия подачи решила всё.",
    story: "Малика обратилась к нам с целью поступить в один из трех лучших вузов Кореи. Основной сложностью было отсутствие корейского языка, поэтому мы сделали упор на сильное мотивационное письмо и академические достижения.",
    achievements: [
      "Полное покрытие обучения",
      "Ежемесячная стипендия $900",
      "Бесплатные курсы языка при вузе"
    ],
    timeline: [
      { date: "Сентябрь 2023", event: "Первая консультация и выбор стратегии" },
      { date: "Ноябрь 2023", event: "Подготовка эссе и сбор документов" },
      { date: "Февраль 2024", event: "Подача заявки в Yonsei" },
      { date: "Май 2024", event: "Получение оффера и гранта" }
    ]
  }
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const review = reviews.find((r) => r.slug === params.slug);
  if (!review) return { title: "Кейс не найден" };

  return {
    title: `Как ${review.name} поступила в ${review.uni} | Studify`,
    description: review.topQuote,
  };
}

export async function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export default function ReviewDetailsPage({ params }: { params: { slug: string } }) {
  const data = reviews.find((r) => r.slug === params.slug);

  if (!data) return notFound();

  return (
    <>
      <Navbar />
      <main className="bg-white pt-32 pb-20">
        <Container>
          <Link href="/reviews" className="inline-flex items-center gap-2 text-neutral-400 hover:text-brand font-bold mb-12 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Назад к отзывам
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <SectionTag className="mb-6">{data.country}</SectionTag>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 mb-8 leading-tight">
                История успеха: <br />
                <span className="text-brand">{data.name}</span>
              </h1>
              
              <p className="text-2xl md:text-3xl italic font-medium text-neutral-800 mb-12 leading-snug border-l-4 border-brand pl-8 py-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                «{data.topQuote}»
              </p>

              <div className="prose prose-lg max-w-none text-neutral-600 font-medium leading-relaxed">
                <h3 className="text-2xl font-black text-neutral-900 mb-4">Как это было</h3>
                <p className="mb-6">{data.story}</p>
                
                <div className="bg-[#FAFAFA] rounded-[2rem] p-8 my-12 border border-neutral-100">
                  <h4 className="text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                    <Trophy className="text-brand" /> Результаты зачисления
                  </h4>
                  <ul className="space-y-4">
                    {data.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-800 font-bold">
                        <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="text-2xl font-black text-neutral-900 mb-8">Хронология поступления</h3>
                <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-100">
                  {data.timeline.map((step, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-9 h-9 bg-white border-2 border-brand rounded-full flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-brand rounded-full" />
                      </div>
                      <div className="text-sm font-black text-brand uppercase tracking-widest mb-1">{step.date}</div>
                      <div className="text-lg font-bold text-neutral-900">{step.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="bg-white border-2 border-neutral-900 rounded-[2.5rem] p-8 shadow-[10px_10px_0px_#FF8225]">
                  <div className="text-6xl mb-6">{data.flag}</div>
                  <h4 className="text-2xl font-black text-neutral-900 mb-6">{data.uni}</h4>
                  
                  <div className="space-y-6">
                    <StatItem icon={<GraduationCap size={20}/>} label="Программа" value={data.program} />
                    <StatItem icon={<Trophy size={20}/>} label="Грант" value={data.grant} />
                    <StatItem icon={<Calendar size={20}/>} label="Подготовка" value={data.prepTime} />
                    <StatItem icon={<CheckCircle2 size={20}/>} label="IELTS Score" value={data.ielts} />
                  </div>

                  <hr className="my-8 border-neutral-100" />
                  
                  <button className="w-full bg-brand text-white font-black h-16 rounded-2xl hover:bg-brand transition-colors">
                    Хочу так же
                  </button>
                </div>

                <div className="bg-neutral-900 rounded-[2.5rem] p-8 text-white">
                  <h5 className="font-black text-lg mb-4 text-brand">Бесплатный разбор</h5>
                  <p className="text-white/60 text-sm font-medium leading-relaxed mb-6">
                    Мы проанализируем ваш кейс и скажем, в какие вузы у вас есть шансы поступить на грант.
                  </p>
                  <input 
                    type="tel" 
                    placeholder="+998" 
                    className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 mb-3 text-white outline-none focus:border-brand transition-colors"
                  />
                  <button className="w-full bg-white text-neutral-900 font-black h-12 rounded-xl text-sm">
                    Жду звонка
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">{label}</div>
        <div className="text-sm font-black text-neutral-900 leading-tight">{value}</div>
      </div>
    </div>
  );
}