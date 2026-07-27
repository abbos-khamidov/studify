import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Про Studify",
  description:
    "Studify — команда по поступлению в зарубежные университеты после школы: подбор страны, документов, грантов и сопровождение до зачисления.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <AboutSection />
      <Testimonials />
    </main>
  );
}
