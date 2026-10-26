import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Languages, MapPin, Phone as PhoneIcon } from "lucide-react";
import { business, telHref } from "@/config/business";
import { Address, Hours } from "@/components/BusinessInfo";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageLayout";
import { LOCALES, isLocale, localePath, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/fill";
import { getDictionary } from "@/i18n";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const contactAlternates = Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale, "/contact/")])) as Record<Locale, string>;

const description = (locale: Locale) => fill(getDictionary(locale).contact.description, { phone: business.phone.display });

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata({
    locale: lang,
    title: getDictionary(lang).contact.title,
    description: description(lang),
    path: contactAlternates[lang],
    alternates: contactAlternates,
  });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang: locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const path = contactAlternates[locale];
  const crumbs = [
    { name: t.common.home, path: localePath(locale, "/") },
    { name: t.contact.h1, path },
  ];

  return (
    <>
      <JsonLd data={buildGraph({ locale, path, title: t.contact.title, description: description(locale), crumbs })} />
      <PageHeader crumbs={crumbs} title={t.contact.h1}>
        <a
          href={telHref}
          data-cta-location="content"
          className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full font-display text-[2rem] font-extrabold tracking-[-0.01em] text-cta-600 underline-offset-8 hover:underline md:text-5xl"
        >
          <PhoneIcon aria-hidden="true" className="size-8 md:size-10" strokeWidth={2.25} />
          {business.phone.display}
        </a>
        <p className="mt-3 max-w-xl text-muted">{t.contact.lead}</p>
      </PageHeader>

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <section aria-labelledby="form-title" id="form" className="scroll-mt-28">
          <h2 id="form-title" className="text-2xl font-extrabold md:text-3xl">
            {t.contact.formTitle}
          </h2>
          <p className="mt-2 mb-6 text-muted">{t.contact.required}</p>
          <ContactForm variant="inline" location="contact" title={null} locale={locale} labels={t.form} />
        </section>

        <div className="grid content-start gap-10">
          <section aria-labelledby="hours-title">
            <h2 id="hours-title" className="text-2xl font-extrabold">
              {t.common.officeHours}
            </h2>
            <Hours className="mt-4" />
          </section>

          <section aria-labelledby="visit-title">
            <h2 id="visit-title" className="text-2xl font-extrabold">
              {t.contact.visit}
            </h2>
            <div className="mt-4 flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-navy-500" />
              <Address />
            </div>
            {business.mapEmbedUrl ? (
              <iframe
                title={fill(t.contact.mapTitle, { name: business.name })}
                src={business.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-5 aspect-[4/3] w-full rounded-card border border-line"
              />
            ) : (
              <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-card border-2 border-dashed border-field bg-surface p-6 text-center text-muted">
                {t.contact.mapPlaceholder}
              </div>
            )}
          </section>

          <section aria-labelledby="es-title" lang={t.spoken.lang} className="on-dark rounded-card bg-navy-900 p-6">
            <h2 id="es-title" className="flex items-center gap-3 text-2xl font-extrabold">
              <Languages aria-hidden="true" className="size-6 text-lane" />
              {t.spoken.title}
            </h2>
            <p className="mt-2 text-navy-200">{t.spoken.text}</p>
            {t.spoken.interpreter ? <p className="mt-2 text-navy-200">{t.spoken.interpreter}</p> : null}
          </section>
        </div>
      </div>
    </>
  );
}
