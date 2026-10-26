import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ConditionGrid } from "@/components/Cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MdxContent } from "@/components/Mdx";
import { ContentSidebar, CostAndQuestions, PageHeader } from "@/components/PageLayout";
import { TeamGrid } from "@/components/Team";
import { FAQ_SLUG, NO_COST_SLUG, getRelated, getTopLevelEntries, getTopLevelEntry, type Entry } from "@/lib/content";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Pages, conditions and legal pages, all served at /<slug>/.
export const dynamicParams = false;

export function generateStaticParams() {
  return getTopLevelEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getTopLevelEntry(slug);
  if (!entry) return {};
  return pageMetadata({ title: entry.frontmatter.title, description: entry.frontmatter.description, path: entry.url });
}

export default async function ContentPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const entry = getTopLevelEntry(slug);
  if (!entry) notFound();

  const { frontmatter: fm, template } = entry;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: fm.navLabel ?? fm.h1, path: entry.url },
  ];
  const graph = buildGraph({
    path: entry.url,
    title: fm.title,
    description: fm.description,
    crumbs,
    kind: template === "condition" ? "condition" : template === "faq" ? "faq" : "page",
    faqs: fm.faqs,
    published: fm.published,
    updated: fm.updated,
    withTeam: template === "about" || fm.showTeam,
  });

  return (
    <>
      <JsonLd data={graph} />
      <PageHeader crumbs={crumbs} title={fm.h1} />
      {template === "faq" ? (
        <FaqTemplate entry={entry} />
      ) : template === "about" ? (
        <AboutTemplate entry={entry} />
      ) : template === "legal" ? (
        <div className="wrap py-12 md:py-16">
          <MdxContent source={entry.body} />
        </div>
      ) : (
        <ServiceTemplate entry={entry} />
      )}
      <CtaBand />
    </>
  );
}

/** Condition and service pages (SITE-BRIEF §6.4). */
function ServiceTemplate({ entry }: { entry: Entry }) {
  const related = getRelated(entry);
  return (
    <>
      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="min-w-0">
          <MdxContent source={entry.body} />
          {entry.template === "condition" ? <CostAndQuestions faqHref={`/${FAQ_SLUG}/`} noCostHref={`/${NO_COST_SLUG}/`} /> : null}
        </div>
        <ContentSidebar />
      </div>

      {entry.frontmatter.showTeam ? (
        <section aria-labelledby="team-title" className="border-t border-line bg-surface">
          <div className="wrap py-12 md:py-16">
            <h2 id="team-title" className="text-2xl font-extrabold md:text-3xl">
              Our doctors
            </h2>
            <TeamGrid className="mt-8" />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line">
          <div className="wrap py-12 md:py-16">
            <h2 id="related-title" className="text-2xl font-extrabold md:text-3xl">
              Related injuries
            </h2>
            <ConditionGrid entries={related} className="mt-8" />
          </div>
        </section>
      ) : null}
    </>
  );
}

function AboutTemplate({ entry }: { entry: Entry }) {
  return (
    <>
      <div className="wrap py-12 md:py-16">
        <MdxContent source={entry.body} />
      </div>
      <section id="team" aria-labelledby="team-title" className="scroll-mt-28 border-t border-line bg-surface">
        <div className="wrap py-12 md:py-20">
          <h2 id="team-title" className="text-2xl font-extrabold md:text-3xl">
            Our doctors
          </h2>
          <p className="mt-3 max-w-2xl text-muted">Chiropractic physicians and a pain management medical doctor, working together in one clinic.</p>
          <TeamGrid className="mt-8" />
        </div>
      </section>
    </>
  );
}

function FaqTemplate({ entry }: { entry: Entry }) {
  return (
    <div className="wrap py-12 md:py-16">
      <MdxContent source={entry.body} className="mb-10" />
      <FaqAccordion faqs={entry.frontmatter.faqs} />
    </div>
  );
}
