import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { countries } from "@/lib/countries";

const baseUrl = "https://studify.uz";
const locales = ["uz", "ru", "en"] as const;
const defaultLastModified = new Date("2026-07-27");

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/countries", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/quiz", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/contacts", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/reviews", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
];

function localizedUrl(path: string, locale: (typeof locales)[number]) {
  return `${baseUrl}/${locale}${path}`;
}

function alternates(path: string) {
  return {
    languages: {
      "x-default": `${baseUrl}${path}`,
      uz: localizedUrl(path, "uz"),
      ru: localizedUrl(path, "ru"),
      en: localizedUrl(path, "en"),
    },
  };
}

function routeEntry(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap[number][] {
  return [
    {
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: alternates(path),
    },
    ...locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified,
      changeFrequency,
      priority: locale === "uz" ? Math.max(priority - 0.02, 0.1) : Math.max(priority - 0.05, 0.1),
      alternates: alternates(path),
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = staticRoutes.flatMap((route) =>
    routeEntry(route.path, defaultLastModified, route.changeFrequency, route.priority)
  );

  const countryRoutes = countries.flatMap((country) =>
    routeEntry(`/countries/${country.slug}`, defaultLastModified, "monthly", 0.85)
  );

  const blogRoutes = blogPosts.flatMap((post) =>
    routeEntry(`/blog/${post.slug}`, new Date(post.date), "monthly", 0.72)
  );

  const reviewRoutes = routeEntry("/reviews/malika-karimova-yonsei", defaultLastModified, "monthly", 0.65);

  return [...routes, ...countryRoutes, ...blogRoutes, ...reviewRoutes];
}
