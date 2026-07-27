import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Прайслист",
  description:
    "Прайслист Studify: бесплатная консультация, подбор университета и полное сопровождение поступления за рубеж.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="pt-20">
      <PricingSection />
      <CTASection />
    </main>
  );
}
