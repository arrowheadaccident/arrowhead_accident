"use client";

import { usePathname } from "next/navigation";
import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { DEFAULT_LOCALE, localePath, splitLocale, type Locale } from "@/i18n/config";
import { useDismiss } from "@/components/useDismiss";

export type LanguageOption = {
  locale: Locale;
  /** Native name: "Español". */
  name: string;
  /** lang attribute for the name. */
  lang: string;
  hrefLang: string;
  /** The language's home page. */
  home: string;
};

/** From getSitePages(): every page's English path, and per language the ones that aren't translated. */
export type SitePages = { paths: string[]; untranslated: Partial<Record<Locale, string[]>> };

const noopSubscribe = () => () => {};

/**
 * The current page in each language. The layout doesn't know the page, so this reads the pathname once the
 * page has hydrated; the static HTML links to each language's home page. Pages that don't exist in a
 * language (the legal pages, and any URL on the 404 page) link to that language's home page too.
 */
export function useLanguageLinks(languages: LanguageOption[], pages: SitePages) {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  // splitLocale() also strips the /en/ prefix of the rewritten English routes.
  const path = hydrated ? splitLocale(pathname).path : null;
  return languages.map((language) => {
    const exists =
      path !== null &&
      pages.paths.includes(path) &&
      (language.locale === DEFAULT_LOCALE || !pages.untranslated[language.locale]?.includes(path));
    return { ...language, href: exists ? localePath(language.locale, path) : language.home };
  });
}

type Props = {
  locale: Locale;
  languages: LanguageOption[];
  pages: SitePages;
  /** "Language", for screen readers. */
  label: string;
  /** Rendered on the server so lucide icons stay out of the client bundle. */
  icon: ReactNode;
};

/** Top bar language dropdown (md+). Below xl the mobile menu lists the languages too. */
export function LanguageMenu({ locale, languages, pages, label, icon }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const links = useLanguageLinks(languages, pages);
  const current = languages.find((language) => language.locale === locale);
  useDismiss(open, setOpen, rootRef, buttonRef);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-10 items-center gap-2 rounded-md font-semibold text-navy-200 transition-colors duration-150 hover:text-white"
      >
        {icon}
        <span className="sr-only">{label}: </span>
        <span lang={current?.lang}>{current?.name}</span>
        <ChevronDown aria-hidden="true" className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={2.5} />
      </button>
      <ul
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 z-50 mt-1 w-48 rounded-card border border-line bg-white p-1.5 shadow-[0_18px_40px_-12px_rgb(7_26_51/0.28)] [--focus-ring:var(--color-navy-500)]"
      >
        {links.map((link) => (
          <li key={link.locale}>
            <a
              href={link.href}
              hrefLang={link.hrefLang}
              lang={link.lang}
              aria-current={link.locale === locale ? "true" : undefined}
              className="flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] font-semibold text-navy-900 transition-colors duration-150 hover:bg-sky-100 aria-[current=true]:bg-sky-100 aria-[current=true]:text-navy-500"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
