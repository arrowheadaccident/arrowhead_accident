import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageLayout";
import { LOCALES, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getPosts } from "@/lib/content";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const blogAlternates = Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale, "/blog/")])) as Record<Locale, string>;

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({
    locale: lang,
    title: t.blog.title,
    description: t.blog.description,
    path: blogAlternates[lang],
    alternates: blogAlternates,
  });
}

export default async function BlogIndexPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang: locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const crumbs = [
    { name: t.common.home, path: localePath(locale, "/") },
    { name: t.blog.crumb, path: blogAlternates[locale] },
  ];
  return (
    <>
      <JsonLd data={buildGraph({ locale, path: blogAlternates[locale], title: t.blog.title, description: t.blog.description, crumbs })} />
      <PageHeader crumbs={crumbs} title={t.blog.h1} lead={t.blog.lead} />
      <div className="wrap py-12 md:py-16">
        <ul className="grid gap-4 md:grid-cols-2">
          {getPosts(locale).map((post) => (
            <li key={post.slug}>
              <PostCard entry={post} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </div>
      <CtaBand />
    </>
  );
}
