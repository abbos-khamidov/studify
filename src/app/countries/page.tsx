import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { countries } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Страны для обучения за рубежом",
  description:
    "Выберите страну для обучения за рубежом после школы: Южная Корея, Германия, Великобритания, Турция, Малайзия и Франция.",
  alternates: {
    canonical: "/countries",
  },
};

export default function CountriesPage() {
  return (
    <main className="bg-white pt-28 selection:bg-brand selection:text-white">
      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <SectionTag className="mb-5">Страны</SectionTag>
            <h1 className="text-5xl font-extrabold tracking-tight text-primary lg:text-7xl">
              Страны для обучения за рубежом
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-secondary">
              Подберите направление по бюджету, языку обучения, грантам и перспективам после выпуска.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group rounded-2xl border border-neutral-100 bg-[#FAFAFA] p-6 transition-all hover:border-brand/30 hover:bg-white hover:shadow-[0_16px_44px_rgba(255,130,37,0.12)]"
              >
                <div className="text-5xl">{country.flag}</div>
                <h2 className="mt-5 text-2xl font-extrabold text-primary group-hover:text-brand">{country.name}</h2>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-secondary">{country.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-pill bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{country.uniCount}</span>
                  <span className="rounded-pill bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{country.price}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-brand">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
