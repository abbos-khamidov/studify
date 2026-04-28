"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, X, ChevronRight, FileText, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";


const SEARCH_INDEX = [
  {
    id: "s1",
    title: "Обучение в США",
    description: "Университеты, визы и гранты в Америке",
    href: "/#countries",
    keywords: ["сша", "америка", "usa", "штаты", "нью йорк", "гарвард", "учеба в сша"],
    icon: Globe,
  },
  {
    id: "s2",
    title: "Обучение в Великобритании",
    description: "Топовые вузы Лондона и Англии",
    href: "/#countries",
    keywords: ["англия", "великобритания", "лондон", "uk", "британский", "оксфорд"],
    icon: Globe,
  },
  {
    id: "s3",
    title: "Подбор программы (Квиз)",
    description: "Пройди тест и узнай куда поступить",
    href: "/quiz",
    keywords: ["квиз", "тест", "подбор", "программа", "куда поступить", "найти вуз", "выбор"],
    icon: FileText,
  },
  {
    id: "s4",
    title: "Отзывы студентов",
    description: "Истории успеха наших учеников",
    href: "/reviews",
    keywords: ["отзывы", "истории", "студенты", "мнения", "результаты", "кейс", "опыт"],
    icon: MessageCircle,
  },
  {
    id: "s5",
    title: "Как это работает",
    description: "Процесс поступления шаг за шагом",
    href: "/#how-it-works",
    keywords: ["процесс", "шаги", "поступление", "инструкция", "этапы", "как начать"],
    icon: FileText,
  },
  {
    id: "s6",
    title: "Контакты",
    description: "Свяжитесь с нами для консультации",
    href: "/#footer",
    keywords: ["контакты", "связь", "телефон", "адрес", "написать", "позвонить", "поддержка"],
    icon: MessageCircle,
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<"ru" | "uz">("ru");
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState<string>("");
  
  const pathname = usePathname();
  const mobileLinkRefs = React.useRef<Array<HTMLAnchorElement | null>>([]);
  const desktopSearchRef = React.useRef<HTMLDivElement>(null);

  // --- Логика поиска ---
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchKeywords;
    });
  }, [query]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      setScrollProgress((window.scrollY / scrollable) * 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (pathname.startsWith("/#countries")) { setActiveSection("countries"); return; }
    if (pathname.startsWith("/reviews")) { setActiveSection("testimonials"); return; }
    if (pathname === "/quiz") { setActiveSection("quiz"); return; }

    if (pathname === "/") {
      const sectionIds = ["countries", "how-it-works", "testimonials", "footer"];
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
          const id = (visible.target as HTMLElement).id;
          if (id) setActiveSection(id);
        },
        { root: null, rootMargin: "-40% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] }
      );

      elements.forEach((item) => observer.observe(item.el));
      return () => observer.disconnect();
    } else {
      setActiveSection("");
    }
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const links = mobileLinkRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!links.length) return;
    gsap.fromTo(
      links,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power3.out" }
    );
  }, [mobileMenuOpen, pathname]);

  const navLinks = [
    { name: "Страны", href: "/#countries", sectionId: "countries" },
    { name: "Как это работает", href: "/#how-it-works", sectionId: "how-it-works" },
    { name: "Подбор", href: "/quiz", sectionId: "quiz" },
    { name: "Отзывы", href: "/reviews", sectionId: "testimonials" },
    { name: "Контакты", href: "/#footer", sectionId: "footer" },
  ];

  const handleResultClick = () => {
    setQuery("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[rgba(232,230,225,0.5)] bg-[rgba(255,255,255,0.85)] py-4 backdrop-blur-xl"
            : "bg-white/80 py-6 backdrop-blur-sm"
        )}
      >
        <Container className="flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              "font-extrabold text-brand tracking-tight transition-all duration-300",
              scrolled ? "text-lg" : "text-xl"
            )}
          >
            Studify
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative pb-2 text-sm font-semibold transition-colors",
                  activeSection === link.sectionId ? "text-brand" : "text-secondary hover:text-primary"
                )}
              >
                {link.name}
                {activeSection === link.sectionId && (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Десктопный поиск */}
            <div className="relative hidden xl:block" ref={desktopSearchRef}>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/70" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Поиск"
                className="h-11 w-[280px] rounded-pill border border-gray-200 bg-white pl-9 pr-4 text-sm font-medium text-primary outline-none transition-all placeholder:text-secondary/70 focus:border-brand focus:ring-4 focus:ring-brand/10"
                aria-label="Поиск по сайту"
              />

              {/* Выпадашка десктопного поиска */}
              {searchOpen && query.trim().length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                  {searchResults.length > 0 ? (
                    <ul className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                      {searchResults.map((res) => {
                        const Icon = res.icon;
                        return (
                          <li key={res.id}>
                            <Link
                              href={res.href}
                              onClick={handleResultClick}
                              className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <h4 className="truncate text-sm font-semibold text-primary group-hover:text-brand transition-colors">
                                  {res.title}
                                </h4>
                                <p className="truncate text-xs text-secondary/70">{res.description}</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-sm text-secondary">
                      Ничего не найдено по запросу <span className="font-semibold text-primary">«{query}»</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="inline-flex h-11 items-center rounded-pill border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setLanguage("ru")}
                className={cn(
                  "rounded-pill px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
                  language === "ru" ? "bg-brand text-white" : "text-secondary hover:text-primary"
                )}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setLanguage("uz")}
                className={cn(
                  "rounded-pill px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
                  language === "uz" ? "bg-brand text-white" : "text-secondary hover:text-primary"
                )}
              >
                UZ
              </button>
            </div>

            <Button variant="primary">Консультация</Button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-primary"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </Container>
        <div className="absolute bottom-0 left-0 h-[2px] bg-[#FF8225] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#1A1108] px-6 pb-8 pt-6 lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <Link href="/" className="font-extrabold text-2xl text-brand tracking-tight" onClick={() => setMobileMenuOpen(false)}>
              Studify
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-brand transition-colors hover:text-[#ff9b4f]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col flex-1">
            {/* Мобильный поиск */}
            <div className="w-full relative z-10 mb-8">
              <label htmlFor="mobile-search" className="sr-only">Поиск по сайту</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  id="mobile-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти страну или программу..."
                  className="h-14 w-full rounded-2xl border border-white/15 bg-white/5 pl-11 pr-4 text-base font-medium text-white outline-none transition-all placeholder:text-white/40 focus:border-brand focus:bg-white/10"
                  autoComplete="off"
                />
              </div>

              {/* Выпадашка мобильного поиска */}
              {query.trim().length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#24170D] shadow-2xl">
                  {searchResults.length > 0 ? (
                    <ul className="max-h-[250px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
                      {searchResults.map((res) => {
                        const Icon = res.icon;
                        return (
                          <li key={res.id}>
                            <Link
                              href={res.href}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/5 active:bg-white/10"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <h4 className="truncate text-base font-semibold text-white">
                                  {res.title}
                                </h4>
                                <p className="truncate text-sm text-white/50">{res.description}</p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-sm text-white/50">
                      Ничего не найдено по запросу <br/> <span className="font-semibold text-white">«{query}»</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Скрываем основное меню на мобилке, если пользователь активно ищет */}
            {query.trim().length === 0 && (
              <nav className="flex flex-col gap-6 items-center justify-center flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="inline-flex h-12 items-center rounded-pill border border-white/20 bg-white/5 p-1 mb-4">
                  <button
                    type="button"
                    onClick={() => setLanguage("ru")}
                    className={cn(
                      "rounded-pill px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all",
                      language === "ru" ? "bg-brand text-white shadow-lg" : "text-white/60 hover:text-white"
                    )}
                  >
                    RU
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("uz")}
                    className={cn(
                      "rounded-pill px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all",
                      language === "uz" ? "bg-brand text-white shadow-lg" : "text-white/60 hover:text-white"
                    )}
                  >
                    UZ
                  </button>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    ref={(el) => {
                      mobileLinkRefs.current[navLinks.findIndex((l) => l.name === link.name)] = el;
                    }}
                    className={cn(
                      "text-3xl font-bold transition-colors",
                      activeSection === link.sectionId ? "text-brand" : "text-white/90 hover:text-brand"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-8 w-full max-w-xs">
                  <Button variant="primary" className="w-full h-14 text-lg" size="lg" onClick={() => setMobileMenuOpen(false)}>
                    Консультация
                  </Button>
                </div>
              </nav>
            )}
          </div>
        </div>
      )}
    </>
  );
}