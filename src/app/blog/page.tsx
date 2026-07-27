import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Блог об обучении за рубежом",
  description:
    "Мнения, советы и новости Studify про обучение за рубежом, поступление в университет после школы, гранты и выбор страны.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="bg-white pt-28 selection:bg-brand selection:text-white">
      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <SectionTag className="mb-5">Блог</SectionTag>
            <h1 className="text-5xl font-extrabold tracking-tight text-primary lg:text-7xl">
              Мнения, советы и новости про обучение за рубежом
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-secondary">
              Пишем о поступлении после школы, выборе университета, грантах, документах и реальных решениях для
              студентов из Узбекистана.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-neutral-100 bg-[#FAFAFA] p-6 transition-all hover:border-brand/30 hover:bg-white hover:shadow-[0_16px_44px_rgba(255,130,37,0.12)]"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-secondary">
                  <span className="rounded-pill bg-brand/10 px-3 py-1 text-brand">{post.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("ru-RU")}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-extrabold leading-tight text-primary transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-secondary">{post.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-brand">
                  Читать
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
