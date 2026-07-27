import * as React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer id="footer" className="bg-dark text-on-dark pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:pr-8">
            <BrandLogo inverse className="mb-6" textClassName="text-2xl text-white group-hover:text-brand" />
            <p className="text-sm text-on-dark/60 max-w-[280px] leading-relaxed font-medium">
              Помогаем студентам из Узбекистана поступить в лучшие университеты мира.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-on-dark/40 mb-6 font-bold">Направления</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Южная Корея", href: "/countries/korea" },
                { name: "Турция", href: "/countries/turkey" },
                { name: "Германия", href: "/countries/germany" },
                { name: "Великобритания", href: "/countries/uk" },
                { name: "Малайзия", href: "/countries/malaysia" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-on-dark/60 hover:text-on-dark transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-on-dark/40 mb-6 font-bold">Услуги</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Подбор вуза", href: "/quiz" },
                { name: "Документы", href: "/how-it-works" },
                { name: "Визовая поддержка", href: "/how-it-works" },
                { name: "Прайслист", href: "/pricing" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-on-dark/60 hover:text-on-dark transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-on-dark/40 mb-6 font-bold">Контакты</h4>
            <ul className="flex flex-col gap-4 text-sm text-on-dark/60 font-medium">
              <li>
                <a href="tel:+998939492000" className="hover:text-on-dark transition-colors">+998 93 949 20 00</a>
              </li>
              <li>
                <a href="mailto:info@studify.uz" className="hover:text-on-dark transition-colors">info@studify.uz</a>
              </li>
              <li>
                <a href="https://t.me/studify_uz" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Telegram</a>
              </li>
              <li>
                <a href="https://instagram.com/studify.uz" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-dark/40 font-medium">
          <p>© 2026 Studify. Все права защищены.</p>
          <p>
            Made by{" "}
            <a
              href="https://aisolution.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark/70 transition-colors hover:text-brand"
            >
              aisolution.uz
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
