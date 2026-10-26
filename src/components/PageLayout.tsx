import type { ReactNode } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { getI18n } from "@/i18n/server";
import { hoursSummary } from "@/lib/hours";

/** Breadcrumbs + the page's only H1 on a tinted band. */
export function PageHeader({ crumbs, title, lead, children }: { crumbs: Crumb[]; title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="wrap py-8 md:py-12">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 max-w-4xl text-[2rem] leading-[1.08] font-extrabold tracking-[-0.015em] md:text-5xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-lg text-muted md:text-xl">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}

/** lg+ sticky sidebar for condition/service pages: call card, hours, compact form. */
export async function ContentSidebar() {
  const { locale, t } = await getI18n();
  return (
    <aside aria-label={t.sidebar.label} className="hidden lg:block">
      <div className="sticky top-28 grid gap-4">
        <div className="on-dark rounded-card bg-navy-900 p-5">
          <p className="font-display text-xl font-extrabold leading-snug">{t.sidebar.title}</p>
          <CallButton location="sidebar" className="mt-4 w-full" />
          <div className="mt-4 flex gap-2.5 text-sm text-navy-200">
            <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-lane" />
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              {hoursSummary(locale, t.hours.closed).map((row) => (
                <div key={row.days} className="contents">
                  <dt className="font-semibold text-white">{row.days}</dt>
                  <dd className="tabular-nums">{row.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <ContactForm variant="compact" location="sidebar" headingLevel="h2" locale={locale} labels={t.form} />
      </div>
    </aside>
  );
}

/** Closes every condition page: links to FAQ and the no-cost page (§9.4 internal links). */
export async function CostAndQuestions({ faqHref, noCostHref }: { faqHref: string; noCostHref: string }) {
  const { t } = await getI18n();
  return (
    <div className="mt-12 grid gap-3 rounded-card border border-line bg-surface p-5 sm:grid-cols-2 md:p-6">
      <p className="text-base sm:col-span-2">
        <strong className="font-display text-lg text-navy-900">{t.costAndQuestions.title}</strong>
      </p>
      <Link href={noCostHref} className="font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2">
        {t.costAndQuestions.noCost}
      </Link>
      <Link href={faqHref} className="font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2">
        {t.costAndQuestions.faq}
      </Link>
    </div>
  );
}
