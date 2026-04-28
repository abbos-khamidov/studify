import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer id="footer" className="bg-dark text-on-dark pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:pr-8">
            <Link href="/" className="text-2xl font-extrabold text-brand tracking-tight mb-6 block">
              Studify
            </Link>
            <p className="text-sm text-on-dark/60 max-w-[280px] leading-relaxed font-medium">
              Помогаем студентам из Узбекистана поступить в лучшие университеты мира.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-on-dark/40 mb-6 font-bold">Направления</h4>
            <ul className="flex flex-col gap-4">
              {["Южная Корея", "Турция", "Германия", "Великобритания", "Малайзия"].map((item) => (
                <li key={item}>
                  <Link href={`/#countries`} className="text-sm text-on-dark/60 hover:text-on-dark transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-on-dark/40 mb-6 font-bold">Услуги</h4>
            <ul className="flex flex-col gap-4">
              {["Подбор вуза", "Документы", "Визовая поддержка", "Подготовка к IELTS"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-on-dark/60 hover:text-on-dark transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-on-dark/40 mb-6 font-bold">Контакты</h4>
            <ul className="flex flex-col gap-4 text-sm text-on-dark/60 font-medium">
              <li>
                <a href="tel:+998901234567" className="hover:text-on-dark transition-colors">+998 90 123 45 67</a>
              </li>
              <li>
                <a href="mailto:info@studify.uz" className="hover:text-on-dark transition-colors">info@studify.uz</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">Telegram</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-dark/40 font-medium">
          <p>© 2026 Studify. Все права защищены.</p>
          <p>Сделано с ❤️ в Ташкенте</p>
        </div>
      </Container>
    </footer>
  );
}
