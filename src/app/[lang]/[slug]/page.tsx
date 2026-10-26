import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ConditionGrid } from "@/components/Cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MdxContent } from "@/components/Mdx";
import { ContentSidebar, CostAndQuestions, PageHeader } from "@/components/PageLayout";
import { TeamGrid } from "@/components/Team";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n";
import { FAQ_SLUG, NO_COST_SLUG, getAlternates, getRelated, getTopLevelEntries, getTopLevelEntry, type Entry } from "@/lib/content";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Pages, conditions and legal pages, served at /<slug>/ and /<locale>/<slug>/. Legal pages are English only.
export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  return getTopLevelEntries(params.lang).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const entry = isLocale(lang) ? getTopLevelEntry(slug, lang) : undefined;
  if (!entry) return {};
  return pageMetadata({
    locale: entry.locale,
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: entry.url,
    alternates: getAlternates(entry),
  });
}

export default async function ContentPage({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  const entry = isLocale(lang) ? getTopLevelEntry(slug, lang) : undefined;
  if (!entry) notFound();

  const { frontmatter: fm, template, locale } = entry;
  const t = getDictionary(locale);
  const crumbs = [
    { name: t.common.home, path: localePath(locale, "/") },
    { name: fm.navLabel ?? fm.h1, path: entry.url },
  ];
  const graph = buildGraph({
    locale,
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
        <AboutTemplate entry={entry} t={t} />
      ) : template === "legal" ? (
        <div className="wrap py-12 md:py-16">
          <MdxContent source={entry.body} />
        </div>
      ) : (
        <ServiceTemplate entry={entry} t={t} />
      )}
      <CtaBand />
    </>
  );
}

/** Condition and service pages (SITE-BRIEF §6.4). */
function ServiceTemplate({ entry, t }: { entry: Entry; t: Dictionary }) {
  const related = getRelated(entry);
  return (
    <>
      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="min-w-0">
          <MdxContent source={entry.body} />
          {entry.template === "condition" ? (
            <CostAndQuestions faqHref={localePath(entry.locale, `/${FAQ_SLUG}/`)} noCostHref={localePath(entry.locale, `/${NO_COST_SLUG}/`)} />
          ) : null}
        </div>
        <ContentSidebar />
      </div>

      {entry.frontmatter.showTeam ? (
        <section aria-labelledby="team-title" className="border-t border-line bg-surface">
          <div className="wrap py-12 md:py-16">
            <h2 id="team-title" className="text-2xl font-extrabold md:text-3xl">
              {t.page.ourDoctors}
            </h2>
            <TeamGrid className="mt-8" />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line">
          <div className="wrap py-12 md:py-16">
            <h2 id="related-title" className="text-2xl font-extrabold md:text-3xl">
              {t.page.relatedInjuries}
            </h2>
            <ConditionGrid entries={related} className="mt-8" />
          </div>
        </section>
      ) : null}
    </>
  );
}

function AboutTemplate({ entry, t }: { entry: Entry; t: Dictionary }) {
  return (
    <>
      <div className="wrap py-12 md:py-16">
        <MdxContent source={entry.body} />
      </div>
      <section id="team" aria-labelledby="team-title" className="scroll-mt-28 border-t border-line bg-surface">
        <div className="wrap py-12 md:py-20">
          <h2 id="team-title" className="text-2xl font-extrabold md:text-3xl">
            {t.page.ourDoctors}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t.page.aboutTeamLead}</p>
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
