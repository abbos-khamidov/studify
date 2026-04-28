import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { playfairDisplay, plusJakartaSans } from "@/lib/fonts";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

const ChatWidget = dynamic(() => import("@/components/sections/ChatWidget").then((mod) => mod.ChatWidget), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studify.uz"),
  title: "Studify — Учись за рубежом | Поступление в университеты мира из Узбекистана",
  description:
    "Подберём университет, оформим документы и подготовим к поступлению. 200+ вузов в 12 странах. 95% зачислений.",
  openGraph: {
    title: "Studify — Учись за рубежом | Поступление в университеты мира из Узбекистана",
    description:
      "Подберём университет, оформим документы и подготовим к поступлению. 200+ вузов в 12 странах. 95% зачислений.",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630, alt: "Studify" }],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Studify",
    url: "https://studify.uz",
    telephone: "+998939492000",
    description:
      "Подберём университет, оформим документы и подготовим к поступлению. 200+ вузов в 12 странах. 95% зачислений.",
    areaServed: "UZ",
  };

  return (
    <html lang="ru" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased text-primary selection:bg-brand selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main className="flex-1">
          <LenisProvider>{children}</LenisProvider>
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
