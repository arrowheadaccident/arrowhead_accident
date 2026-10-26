import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { MdxContent } from "@/components/Mdx";
import { PageHeader } from "@/components/PageLayout";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getAlternates, getCollection, getEntry } from "@/lib/content";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  return getCollection("blog", params.lang).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = isLocale(lang) ? getEntry("blog", slug, lang) : undefined;
  if (!post) return {};
  const fm = post.frontmatter;
  return pageMetadata({
    locale: post.locale,
    title: fm.title,
    description: fm.description,
    path: post.url,
    alternates: getAlternates(post),
    type: "article",
    publishedTime: fm.published,
    modifiedTime: fm.updated,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  const post = isLocale(lang) ? getEntry("blog", slug, lang) : undefined;
  if (!post) notFound();

  const { frontmatter: fm, locale } = post;
  const t = getDictionary(locale);
  const crumbs = [
    { name: t.common.home, path: localePath(locale, "/") },
    { name: t.blog.crumb, path: localePath(locale, "/blog/") },
    { name: fm.h1, path: post.url },
  ];

  return (
    <>
      <JsonLd
        data={buildGraph({
          locale,
          path: post.url,
          title: fm.title,
          description: fm.description,
          crumbs,
          kind: "post",
          published: fm.published,
          updated: fm.updated,
        })}
      />
      <PageHeader crumbs={crumbs} title={fm.h1}>
        <p className="mt-4 text-[0.9375rem] text-muted">
          {t.blog.published} <time dateTime={fm.published}>{formatDate(fm.published, locale)}</time> · {t.blog.updated}{" "}
          <time dateTime={fm.updated}>{formatDate(fm.updated, locale)}</time>
        </p>
      </PageHeader>
      <article className="wrap py-12 md:py-16">
        <MdxContent source={post.body} />
      </article>
      <CtaBand />
    </>
  );
}
