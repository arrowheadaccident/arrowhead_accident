import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { business, founder, team } from "@/config/business";
import { CtaBand } from "@/components/CtaBand";
import { ConditionGrid } from "@/components/Cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MdxContent } from "@/components/Mdx";
import { ContentSidebar, CostAndQuestions, PageHeader } from "@/components/PageLayout";
import { TeamGrid, initials } from "@/components/Team";
import { isLocale, localePath } from "@/i18n/config";
import { fill } from "@/i18n/fill";
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

/** About opens with the founder's story; the team grid below leaves the founder out. */
function AboutTemplate({ entry, t }: { entry: Entry; t: Dictionary }) {
  return (
    <>
      <FounderStory t={t} />
      <div className="wrap py-12 md:py-16">
        <MdxContent source={entry.body} />
      </div>
      <section id="team" aria-labelledby="team-title" className="scroll-mt-28 border-t border-line bg-surface">
        <div className="wrap py-12 md:py-20">
          <h2 id="team-title" className="text-2xl font-extrabold md:text-3xl">
            {t.page.ourDoctors}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t.page.aboutTeamLead}</p>
          <TeamGrid members={team.filter((member) => member !== founder)} className="mt-8" />
        </div>
      </section>
    </>
  );
}

/** The home page card links here (#vaughn-movses). Phone: small portrait beside the name, then story, quote and
    credentials. lg: portrait and credentials on the left across every row; the empty 1fr row takes up the
    difference in height, so the right column never spreads out. */
function FounderStory({ t }: { t: Dictionary }) {
  return (
    <section id={founder.slug} aria-labelledby="founder-title" className="scroll-mt-28 border-b border-line">
      <div className="wrap grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-6 py-12 md:py-16 lg:grid-cols-[17rem_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto_1fr] lg:items-start lg:gap-x-14">
        <div className="col-start-2 row-start-1 min-w-0">
          <p className="font-display text-lg font-bold text-navy-500">{t.founder.eyebrow}</p>
          <h2 id="founder-title" className="mt-1 text-2xl font-extrabold md:text-4xl">{founder.name}</h2>
          <p className="mt-1 text-[0.9375rem] font-semibold text-muted">{founder.postNominals}</p>
        </div>
        <div className="col-span-2 grid max-w-[68ch] gap-4 text-lg leading-relaxed text-ink lg:col-span-1 lg:col-start-2">
          {t.founder.story.map((paragraph) => (
            <p key={paragraph}>{fill(paragraph, { street: business.address.street })}</p>
          ))}
        </div>
        <figure className="col-span-2 max-w-[68ch] border-l-2 border-navy-500 pl-5 lg:col-span-1 lg:col-start-2">
          <blockquote className="text-lg leading-relaxed font-semibold text-navy-900 md:text-xl">
            <p>{t.founder.quote}</p>
          </blockquote>
          <figcaption className="mt-3 text-[0.9375rem] text-muted">{founder.name}</figcaption>
        </figure>
        <div className="contents lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:block">
          <div className="relative col-start-1 row-start-1 aspect-[4/5] w-24 overflow-hidden rounded-card ring-4 ring-sky-100 sm:w-36 lg:w-full">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                preload
                sizes="(min-width: 1024px) 272px, (min-width: 640px) 144px, 96px"
                className="object-cover object-top"
              />
            ) : (
              // Initials until a real, consented photo exists (photo === null).
              <span
                aria-hidden="true"
                className="flex size-full items-center justify-center bg-navy-900 font-display text-2xl font-extrabold text-white sm:text-4xl lg:text-6xl"
              >
                {initials(founder.name)}
              </span>
            )}
          </div>
          <div className="col-span-2 rounded-card border border-line bg-surface p-5 lg:mt-6">
            <h3 className="font-display text-lg font-bold text-navy-900">{t.founder.credentialsTitle}</h3>
            <ul className="mt-3 grid gap-2.5">
              {t.founder.credentials.map((credential) => (
                <li key={credential} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
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
