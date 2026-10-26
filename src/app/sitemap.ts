import type { MetadataRoute } from "next";
import { getCollection, getPosts, getTopLevelEntries } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const latest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b));

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getTopLevelEntries();
  const posts = getPosts();
  const allUpdated = [...pages, ...getCollection("blog")].map((e) => e.frontmatter.updated);

  return [
    { url: absoluteUrl("/"), lastModified: latest(allUpdated) },
    ...pages.map((entry) => ({ url: absoluteUrl(entry.url), lastModified: entry.frontmatter.updated })),
    { url: absoluteUrl("/contact/"), lastModified: latest(allUpdated) },
    { url: absoluteUrl("/blog/"), lastModified: latest(posts.map((p) => p.frontmatter.updated)) },
    ...posts.map((post) => ({ url: absoluteUrl(post.url), lastModified: post.frontmatter.updated })),
  ];
}
