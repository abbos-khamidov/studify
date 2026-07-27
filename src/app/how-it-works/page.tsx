import type { Metadata } from "next";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Как это работает",
  description:
    "Как Studify помогает поступить в университет за рубежом: консультация, подбор вузов, документы, подача и зачисление.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <main className="pt-20">
      <HowItWorks />
      <CTASection />
    </main>
  );
}
