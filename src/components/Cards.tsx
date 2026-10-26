import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContentIcon } from "@/components/icons";
import { LOCALE_INFO, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import type { Entry } from "@/lib/content";

/** Condition / treatment card: icon, title, excerpt, whole card is the link. */
export function ConditionCard({ entry, featured = false }: { entry: Entry; featured?: boolean }) {
  const { frontmatter } = entry;
  return (
    <Link
      href={entry.url}
      className={`group relative flex h-full gap-4 rounded-card border p-5 transition-colors duration-150 md:p-6 ${
        featured
          ? "on-dark border-navy-900 bg-navy-900 text-white hover:bg-navy-700 sm:items-center"
          : "border-line bg-white hover:border-navy-500"
      }`}
    >
      <span
        className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${
          featured ? "bg-white/10 text-lane" : "bg-sky-100 text-navy-500"
        }`}
      >
        <ContentIcon name={frontmatter.icon} className="size-6" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={`font-display text-lg font-bold leading-snug underline-offset-4 group-hover:underline ${
            featured ? "text-white md:text-xl" : "text-navy-900"
          }`}
        >
          {frontmatter.navLabel ?? frontmatter.h1}
        </span>
        <span className={`mt-1.5 text-[0.9375rem] leading-relaxed ${featured ? "text-navy-200" : "text-muted"}`}>
          {frontmatter.excerpt}
        </span>
      </span>
      <ChevronRight
        aria-hidden="true"
        className={`mt-1 size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${featured ? "text-lane sm:mt-0" : "text-navy-500"}`}
      />
    </Link>
  );
}

export function ConditionGrid({ entries, className = "" }: { entries: Entry[]; className?: string }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {entries.map((entry) => (
        <li key={entry.slug}>
          <ConditionCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_INFO[locale].intl, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

export async function PostCard({ entry, headingLevel = "h3" }: { entry: Entry; headingLevel?: "h2" | "h3" }) {
  const { t } = await getI18n();
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors duration-150 hover:border-navy-500">
      <p className="text-sm text-muted">
        <time dateTime={entry.frontmatter.published}>{formatDate(entry.frontmatter.published, entry.locale)}</time>
      </p>
      <Heading className="mt-2 font-display text-xl font-bold leading-snug text-navy-900">
        <Link href={entry.url} className="underline-offset-4 after:absolute after:inset-0 group-hover:underline">
          {entry.frontmatter.h1}
        </Link>
      </Heading>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{entry.frontmatter.excerpt}</p>
      <p aria-hidden="true" className="mt-auto pt-5 text-[0.9375rem] font-semibold text-navy-500">
        {t.cards.readArticle}
      </p>
    </article>
  );
}
