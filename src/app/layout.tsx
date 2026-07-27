import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { playfairDisplay, plusJakartaSans } from "@/lib/fonts";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LocaleDomTranslator } from "@/components/providers/LocaleDomTranslator";

const ChatWidget = dynamic(() => import("@/components/sections/ChatWidget").then((mod) => mod.ChatWidget), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studify.uz"),
  title: {
    default: "Studify — обучение за рубежом после школы | Поступление в университеты",
    template: "%s | Studify",
  },
  description:
    "Studify помогает поступить в университет за рубежом после школы: подбор страны и вуза, документы, гранты, виза и сопровождение до зачисления.",
  keywords: [
    "Studify",
    "Стадифай",
    "обучение за рубежом",
    "учеба за границей",
    "университет после школы",
    "поступить в университет за рубежом",
    "образование за рубежом из Узбекистана",
    "поступление в зарубежные вузы",
    "подбор университета за границей",
    "гранты на обучение за рубежом",
    "учеба в Корее",
    "учеба в Германии",
    "учеба в Великобритании",
    "университеты после 11 класса",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Studify — обучение за рубежом после школы",
    description:
      "Подбор университета, оформление документов, гранты и сопровождение до зачисления в зарубежный вуз.",
    url: "https://studify.uz",
    siteName: "Studify",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630, alt: "Studify" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studify — обучение за рубежом после школы",
    description: "Помогаем поступить в университет за рубежом из Узбекистана.",
    images: ["/og-placeholder.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Studify",
    alternateName: ["Стадифай", "Studify Uzbekistan"],
    url: "https://studify.uz",
    telephone: "+998939492000",
    description:
      "Studify помогает студентам из Узбекистана поступить в университеты за рубежом после школы: подбор страны, программы, документов, грантов и сопровождение до зачисления.",
    areaServed: "UZ",
    knowsAbout: [
      "обучение за рубежом",
      "учеба за границей",
      "университет после школы",
      "поступление в зарубежные вузы",
      "гранты на обучение",
    ],
    sameAs: ["https://t.me/studify_uz"],
    makesOffer: {
      "@type": "Offer",
      name: "Бесплатная консультация по обучению за рубежом",
      category: "Education consulting",
    },
  };

  return (
    <html lang="uz" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased text-primary selection:bg-brand selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <LocaleDomTranslator />
        <main className="flex-1">
          <LenisProvider>{children}</LenisProvider>
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
