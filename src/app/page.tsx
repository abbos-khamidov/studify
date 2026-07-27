import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const Countries = dynamic(() => import("@/components/sections/Countries").then((mod) => mod.Countries), {
  loading: () => <SectionSkeleton tone="brand" />,
});
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then((mod) => mod.HowItWorks), {
  loading: () => <SectionSkeleton />,
});
const StudentJourney = dynamic(() => import("@/components/sections/StudentJourney").then((mod) => mod.StudentJourney), {
  loading: () => <SectionSkeleton />,
});
const QuizCTA = dynamic(() => import("@/components/sections/QuizCTA").then((mod) => mod.QuizCTA), {
  loading: () => <SectionSkeleton tone="muted" />,
});
const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection), {
  loading: () => <SectionSkeleton />,
});
const CTASection = dynamic(() => import("@/components/sections/CTASection").then((mod) => mod.CTASection), {
  loading: () => <SectionSkeleton tone="brand" />,
});
const PricingSection = dynamic(() => import("@/components/sections/PricingSection").then((mod) => mod.PricingSection), {
  loading: () => <SectionSkeleton tone="muted" />,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((mod) => mod.Testimonials), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton({ tone = "light" }: { tone?: "light" | "muted" | "brand" }) {
  const className =
    tone === "brand" ? "bg-brand" : tone === "muted" ? "bg-[#FAFAFA]" : "bg-white";

  return <div className={`min-h-[420px] ${className}`} aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <Countries />
      <HowItWorks />
      <StudentJourney />
      <QuizCTA />
      <AboutSection />
      <CTASection />
      <PricingSection />
      <Testimonials />
    </>
  );
}
