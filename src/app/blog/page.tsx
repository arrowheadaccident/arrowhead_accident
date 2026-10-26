import type { Metadata } from "next";
import { PostCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageLayout";
import { getPosts } from "@/lib/content";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Car Accident Injury Articles | Glendale Chiropractor";
const DESCRIPTION =
  "Articles on car accident injuries, chiropractic care and insurance myths from our Glendale, Arizona auto injury clinic.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/blog/" });

export default function BlogIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
  ];
  return (
    <>
      <JsonLd data={buildGraph({ path: "/blog/", title: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHeader crumbs={crumbs} title="Car Accident Injury Articles" lead="Research and plain answers about car accident injuries, chiropractic care and insurance." />
      <div className="wrap py-12 md:py-16">
        <ul className="grid gap-4 md:grid-cols-2">
          {getPosts().map((post) => (
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
