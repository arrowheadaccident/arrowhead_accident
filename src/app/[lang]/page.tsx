import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Languages } from "lucide-react";
import { founder } from "@/config/business";
import { ServiceAreas } from "@/components/BusinessInfo";
import { CallButton, buttonStyles } from "@/components/Button";
import { ConditionCard, ConditionGrid, PostCard } from "@/components/Cards";
import { ContactForm } from "@/components/ContactForm";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { OpenStatus } from "@/components/OpenStatus";
import { initials } from "@/components/Team";
import { LOCALES, isLocale, localePath, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/fill";
import { getDictionary } from "@/i18n";
import { FAQ_SLUG, NO_COST_SLUG, getEntry, getPosts, getTreatments } from "@/lib/content";
import { openHoursText } from "@/lib/hours";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const homeAlternates = Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale, "/")])) as Record<Locale, string>;

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({
    locale: lang,
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    path: homeAlternates[lang],
    alternates: homeAlternates,
  });
}

/** FAQ teaser: the questions people ask first (emergency visit, minor damage, who pays). */
const TEASER_QUESTIONS = [1, 3, 5];

function SectionHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="text-[1.75rem] leading-tight font-extrabold tracking-[-0.01em] md:text-[2.5rem]">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-muted">{lead}</p> : null}
    </div>
  );
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang: locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const href = (path: string) => localePath(locale, path);
  const [emergency, ...conditions] = getTreatments(locale);
  const faqs = getEntry("pages", FAQ_SLUG, locale)?.frontmatter.faqs ?? [];
  const posts = getPosts(locale).slice(0, 2);

  return (
    <>
      <JsonLd
        data={buildGraph({
          locale,
          path: href("/"),
          title: t.meta.homeTitle,
          description: t.meta.homeDescription,
          crumbs: [{ name: t.common.home, path: href("/") }],
        })}
      />

      {/* 1. Hero: no image, the H1 is the LCP element. */}
      <section className="border-b border-line bg-surface">
        <div className="wrap grid gap-10 pt-6 pb-12 md:pt-14 md:pb-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-14">
          <div>
            <h1 className="text-[2rem] leading-[1.06] font-extrabold tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.5rem]">
              {t.home.h1}
            </h1>
            <p className="mt-4 max-w-[60ch] text-ink md:mt-5 md:text-xl md:leading-relaxed">{t.home.intro}</p>
            <ul className="mt-5 grid gap-2 md:mt-6 md:gap-2.5">
              {t.home.heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 font-semibold text-navy-900">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                    <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-8">
              <CallButton location="hero" size="lg" />
              <div className="grid gap-1 text-[0.9375rem] text-muted">
                <OpenStatus fallback={openHoursText(locale, t.hours.closed)} locale={locale} labels={t.hours} />
                <span lang={t.spoken.lang} className="inline-flex items-center gap-2">
                  <Languages aria-hidden="true" className="size-4 text-navy-500" />
                  {t.spoken.badge}
                </span>
              </div>
            </div>
          </div>

          <ContactForm variant="card" location="home_hero" id="callback" locale={locale} labels={t.form} />
        </div>
      </section>

      {/* 2. How it works */}
      <HowItWorks />

      {/* 3. The founder. Phone: small portrait beside the name. sm: portrait beside name and credentials.
          lg: full-height portrait flush with the card's left edge | name and credentials | quote (keeps the card low). */}
      <section aria-labelledby="founder-title" className="border-b border-line">
        <div className="wrap py-12 md:py-20">
          <article className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-5 overflow-hidden rounded-card border border-line bg-surface p-6 sm:items-start sm:gap-x-7 sm:gap-y-4 md:p-8 lg:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-5 lg:p-10">
            <div className="relative aspect-[4/5] w-20 overflow-hidden rounded-card ring-4 ring-sky-100 sm:row-span-2 sm:w-40 lg:-my-10 lg:-ml-10 lg:aspect-auto lg:w-auto lg:self-stretch lg:rounded-none lg:ring-0">
              {founder.photo ? (
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 160px, 80px"
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
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              <p className="font-display text-lg font-bold text-navy-500">{t.founder.eyebrow}</p>
              <h2 id="founder-title" className="mt-1 text-2xl font-extrabold md:text-3xl">{founder.name}</h2>
              <p className="mt-1 text-[0.9375rem] font-semibold text-muted">{founder.postNominals}</p>
            </div>
            <ul className="col-span-2 grid gap-2 sm:col-span-1 sm:col-start-2 lg:row-start-2">
              {t.founder.credentials.map((credential) => (
                <li key={credential} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
                  {credential}
                </li>
              ))}
            </ul>
            <div className="col-span-2 flex flex-col sm:mt-4 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
              <figure className="border-l-2 border-navy-500 pl-5">
                <blockquote className="text-lg leading-relaxed font-semibold text-navy-900 md:text-xl lg:text-lg">
                  <p>{t.founder.quote}</p>
                </blockquote>
                <figcaption className="mt-3 text-[0.9375rem] text-muted">{founder.name}</figcaption>
              </figure>
              <Link
                href={href(`/about-us/#${founder.slug}`)}
                className="mt-5 inline-flex min-h-11 items-center self-end font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2"
              >
                {t.founder.link}
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* 4. Injuries we treat */}
      <section aria-labelledby="injuries-title">
        <div className="wrap py-12 md:py-20">
          <SectionHeading
            id="injuries-title"
            title={t.home.injuriesTitle}
            lead={t.home.injuriesLead}
          />
          {emergency ? (
            <div className="mt-8">
              <ConditionCard entry={emergency} featured />
            </div>
          ) : null}
          <ConditionGrid entries={conditions} className="mt-4" />
        </div>
      </section>

      {/* 5. No out-of-pocket cost */}
      <section aria-labelledby="cost-title" className="bg-sky-100">
        <div className="wrap grid gap-8 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="cost-title" title={t.home.costTitle} />
            <p className="mt-4 max-w-[60ch]">{t.home.costText}</p>
            <Link href={href(`/${NO_COST_SLUG}/`)} className={`${buttonStyles.secondary} mt-6`}>
              {t.home.costLink}
            </Link>
          </div>
          <ul className="grid content-start gap-3">
            {t.home.billingPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-card bg-white p-4 font-semibold text-navy-900">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. FAQ teaser */}
      <section aria-labelledby="faq-title">
        <div className="wrap grid gap-8 py-12 md:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" title={t.home.faqTitle} lead={t.home.faqLead} />
            <Link
              href={href(`/${FAQ_SLUG}/`)}
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2"
            >
              {fill(t.home.faqLink, { count: faqs.length })}
            </Link>
          </div>
          <FaqAccordion faqs={TEASER_QUESTIONS.map((i) => faqs[i]).filter(Boolean)} headingLevel="h3" />
        </div>
      </section>

      {/* 7. Areas we serve */}
      <section aria-labelledby="areas-title" className="border-t border-line bg-surface">
        <div className="wrap py-12 md:py-20">
          <SectionHeading
            id="areas-title"
            title={t.home.areasTitle}
            lead={t.home.areasLead}
          />
          <ServiceAreas className="mt-8" />
        </div>
      </section>

      {/* 8. From the blog */}
      {posts.length ? (
        <section aria-labelledby="blog-title">
          <div className="wrap py-12 md:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionHeading id="blog-title" title={t.home.blogTitle} />
              <Link href={href("/blog/")} className="inline-flex min-h-11 items-center font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2">
                {t.home.blogLink}
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard entry={post} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 9. */}
      <CtaBand />
    </>
  );
}
