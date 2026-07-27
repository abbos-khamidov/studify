import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { blogPosts, getBlogPost } from "@/lib/blog";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "ru_RU",
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Studify",
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Studify",
    },
    mainEntityOfPage: `https://studify.uz/blog/${post.slug}`,
  };

  return (
    <main className="bg-white pt-28 selection:bg-brand selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold text-brand">
              <ArrowLeft className="h-4 w-4" />
              Все статьи
            </Link>
            <SectionTag className="mb-5">{post.category}</SectionTag>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-6xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-bold text-secondary">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("ru-RU")}
              </span>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-10 space-y-6 text-lg font-medium leading-relaxed text-secondary">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 rounded-2xl bg-[#FFF8F2] p-6">
              <h2 className="text-2xl font-extrabold text-primary">Нужен план поступления?</h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-secondary">
                Оставьте заявку, и консультант Studify разберёт ваш случай по стране, бюджету и срокам.
              </p>
              <Link
                href="/contacts"
                className="mt-5 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-brand-hover"
              >
                Получить консультацию
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}
