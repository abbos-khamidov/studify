import { Hero } from "@/components/sections/Hero";
import { Countries } from "@/components/sections/Countries";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StudentJourney } from "@/components/sections/StudentJourney";
import { QuizCTA } from "@/components/sections/QuizCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Countries />
      <HowItWorks />
      <StudentJourney />
      <QuizCTA />
      <Testimonials />
      <CTASection />
    </>
  );
}
