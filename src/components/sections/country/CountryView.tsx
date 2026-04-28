// components/features/country/CountryView.tsx
"use client";

import { CountryHero } from "./CountryHero";
import { CountryStats } from "./CountryStats";
import { WhyChoose } from "./CountryWhyChoose";
import { Universities } from "./CountryUnivercities";
import { Scholarships } from "./CountryScholarships";
import { Country } from "@/lib/countries";
import { CTASection } from "../CTASection";



interface CountryViewProps {
  country: Country;
}

export function CountryView({ country }: CountryViewProps) {
  return (
    <article className="relative w-full overflow-hidden">
      <CountryHero country={country} />
      <div className="relative z-20 bg-white rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-10 md:-mt-20 pt-10 md:pt-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <CountryStats country={country} />
        <WhyChoose country={country} />
        <Universities country={country} />
        <Scholarships country={country} />
        <CTASection />
      </div>
    </article>
  );
}