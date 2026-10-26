import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { MdxContent } from "@/components/Mdx";
import { PageHeader } from "@/components/PageLayout";
import { getCollection, getEntry } from "@/lib/content";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollection("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getEntry("blog", slug);
  if (!post) return {};
  const fm = post.frontmatter;
  return pageMetadata({
    title: fm.title,
    description: fm.description,
    path: post.url,
    type: "article",
    publishedTime: fm.published,
    modifiedTime: fm.updated,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getEntry("blog", slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: fm.h1, path: post.url },
  ];

  return (
    <>
      <JsonLd
        data={buildGraph({
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
          Published <time dateTime={fm.published}>{formatDate(fm.published)}</time> · Updated{" "}
          <time dateTime={fm.updated}>{formatDate(fm.updated)}</time>
        </p>
      </PageHeader>
      <article className="wrap py-12 md:py-16">
        <MdxContent source={post.body} />
      </article>
      <CtaBand />
    </>
  );
}
