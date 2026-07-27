"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useLocale, type Locale } from "@/hooks/useLocale";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { key: "countries", href: "/countries", sectionId: "countries" },
  { key: "process", href: "/how-it-works", sectionId: "how-it-works" },
  { key: "matching", href: "/quiz", sectionId: "quiz-section" },
  { key: "about", href: "/about", sectionId: "about" },
  { key: "pricing", href: "/pricing", sectionId: "pricing" },
  { key: "blog", href: "/blog", sectionId: "blog" },
] as const;

const labels: Record<Locale, Record<string, string>> = {
  uz: {
    countries: "Davlatlar",
    process: "Jarayon",
    matching: "Tanlash",
    about: "Biz haqimizda",
    pricing: "Narxlar",
    blog: "Blog",
    contact: "Bog'lanish",
  },
  ru: {
    countries: "Страны",
    process: "Процесс",
    matching: "Подбор",
    about: "Про нас",
    pricing: "Прайс",
    blog: "Блог",
    contact: "Связаться",
  },
  en: {
    countries: "Countries",
    process: "Process",
    matching: "Match",
    about: "About",
    pricing: "Pricing",
    blog: "Blog",
    contact: "Contact",
  },
};

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "uz", label: "UZ" },
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState("");
  const [selectedLocale, setSelectedLocale] = React.useState<Locale>("uz");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      setScrollProgress((window.scrollY / scrollable) * 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => setSelectedLocale(locale), [locale]);

  function changeLocale(nextLocale: Locale) {
    setSelectedLocale(nextLocale);
    window.localStorage.setItem("studify-locale", nextLocale);
    document.documentElement.lang = nextLocale;
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0];
    const pathWithoutLocale = currentLocale === "uz" || currentLocale === "ru" || currentLocale === "en"
      ? segments.slice(1)
      : segments;
    router.push(`/${[nextLocale, ...pathWithoutLocale].join("/")}`);
  }

  React.useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const routePath = segments[0] === "uz" || segments[0] === "ru" || segments[0] === "en"
      ? `/${segments.slice(1).join("/")}`
      : pathname;

    if (routePath.startsWith("/blog")) {
      setActiveSection("blog");
      return;
    }
    if (routePath.startsWith("/countries")) {
      setActiveSection("countries");
      return;
    }
    if (routePath.startsWith("/how-it-works")) {
      setActiveSection("how-it-works");
      return;
    }
    if (routePath.startsWith("/about")) {
      setActiveSection("about");
      return;
    }
    if (routePath.startsWith("/pricing")) {
      setActiveSection("pricing");
      return;
    }
    if (routePath === "/quiz") {
      setActiveSection("quiz-section");
      return;
    }
    if (routePath !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["countries", "how-it-works", "quiz-section", "about", "contact-form", "pricing"];
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveSection((visible.target as HTMLElement).id);
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    elements.forEach((item) => observer.observe(item.el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-white/95 py-3 shadow-[0_8px_30px_rgba(26,17,8,0.06)] backdrop-blur-xl" : "bg-white/80 py-5 backdrop-blur-md"
        )}
      >
        <Container>
          <div className="flex h-12 items-center justify-between gap-6">
          <BrandLogo />

          <nav className="hidden items-center gap-5 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "relative whitespace-nowrap py-3 text-sm font-bold text-secondary transition-colors hover:text-primary",
                  activeSection === link.sectionId && "text-primary"
                )}
              >
                {labels[locale][link.key]}
                <span
                  className={cn(
                    "absolute bottom-1 left-0 h-0.5 rounded-full bg-brand transition-all duration-300",
                    activeSection === link.sectionId ? "w-full" : "w-0"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <div className="inline-flex h-11 items-center rounded-xl border border-neutral-200 bg-white p-1">
              {localeOptions.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => changeLocale(item.value)}
                  className={cn(
                    "h-8 rounded-lg px-3 text-xs font-extrabold transition-colors",
                    selectedLocale === item.value ? "bg-brand text-white" : "text-secondary hover:bg-neutral-50 hover:text-primary"
                  )}
                  aria-pressed={selectedLocale === item.value}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Link href="/contacts" className={buttonVariants({ size: "sm", className: "h-11 gap-2 px-5" })}>
              {labels[locale].contact}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-primary shadow-sm xl:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="h-6 w-6" />
          </button>
          </div>
        </Container>
        {scrolled ? (
          <div className="absolute bottom-0 left-0 h-[2px] bg-brand transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
        ) : null}
      </header>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[60] bg-white xl:hidden">
          <div className="flex items-center justify-between">
            <div className="px-6 py-5">
              <BrandLogo onClick={() => setMobileMenuOpen(false)} />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="mr-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-primary transition-colors hover:bg-neutral-50"
              aria-label="Закрыть меню"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 pb-5">
            <div className="inline-flex h-12 w-full items-center rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-1">
              {localeOptions.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => changeLocale(item.value)}
                  className={cn(
                    "h-10 flex-1 rounded-xl text-sm font-extrabold transition-colors",
                    selectedLocale === item.value ? "bg-brand text-white" : "text-secondary"
                  )}
                  aria-pressed={selectedLocale === item.value}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <nav className="border-y border-neutral-100">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "flex items-center justify-between border-b border-neutral-100 px-6 py-5 text-xl font-extrabold transition-colors last:border-b-0",
                  activeSection === link.sectionId ? "text-brand" : "text-primary hover:bg-[#FFF8F2]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{labels[locale][link.key]}</span>
                <ArrowUpRight className="h-5 w-5 text-brand" />
              </Link>
            ))}
          </nav>

          <div className="px-6 py-6">
            <a href="tel:+998939492000" className="block text-sm font-bold text-secondary">
              +998 93 949 20 00
            </a>
            <Link
              href="/contacts"
              className={buttonVariants({ size: "lg", className: "mt-4 h-14 w-full gap-2 text-lg" })}
              onClick={() => setMobileMenuOpen(false)}
            >
              {labels[locale].contact}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
