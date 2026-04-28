// app/countries/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { countries } from "@/lib/countries";
import { Navbar } from "@/components/sections/Navbar";
import { CountryView } from "@/components/sections/country/CountryView";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = countries.find((c) => c.slug === params.slug);

  if (!country) {
    return {
      title: "Страна не найдена | Образование за рубежом",
    };
  }

  return {
    title: `Обучение в ${country.name} | Поступление, гранты, топ вузы`,
    description: country.description,
    openGraph: {
      title: `Обучение в ${country.name}`,
      description: country.description,
      type: "website",
      locale: "ru_RU",
    },
    alternates: {
      canonical: `/countries/${country.slug}`,
    },
  };
}

export default function CountryPage({ params }: Props) {
  const country = countries.find((c) => c.slug === params.slug);

  if (!country) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Обучение в ${country.name}`,
    description: country.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "StudyAbroad Agency",
    },
    mainEntity: {
      "@type": "Article",
      headline: `Все об обучении в ${country.name}`,
      abstract: country.description,
    },
  };
  console.log("GRADIENT:", country.gradient);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className={`bg-gradient-to-br ${country.gradient} selection:bg-brand selection:text-white`}>
        <CountryView country={country} />
      </main>
    </>
  );
}