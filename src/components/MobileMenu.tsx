"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { publicPath, type Locale } from "@/i18n/config";
import { useLanguageLinks, type LanguageOption, type SitePages } from "@/components/LanguageMenu";
import { useDismiss } from "@/components/useDismiss";
import type { NavItem } from "@/lib/nav";

const rowLink =
  "flex min-h-12 items-center rounded-md px-3 text-base font-semibold text-navy-900 hover:bg-sky-100 aria-[current=page]:bg-sky-100 aria-[current=page]:text-navy-500";

type Props = {
  items: NavItem[];
  icons: Record<string, ReactNode>;
  locale: Locale;
  languages: LanguageOption[];
  pages: SitePages;
  labels: { open: string; close: string; nav: string; language: string };
};

/** Disclosure menu below xl. Treatments are listed inline (no second dropdown on touch screens), languages last. */
export function MobileMenu({ items, icons, locale, languages, pages, labels }: Props) {
  const [open, setOpen] = useState(false);
  // English pages prerender as /en/…; compare the URL visitors see so server and browser agree.
  const pathname = publicPath(usePathname());
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const languageLinks = useLanguageLinks(languages, pages);
  useDismiss(open, setOpen, rootRef, buttonRef);

  return (
    <div ref={rootRef} className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-12 items-center justify-center rounded-full border border-line text-navy-900 transition-colors duration-150 hover:bg-sky-100"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>

      <nav
        id="mobile-nav"
        aria-label={labels.nav}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-8.5rem-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain md:max-h-[calc(100dvh-4.5rem)] border-b border-line bg-white shadow-[0_24px_40px_-24px_rgb(7_26_51/0.35)]"
      >
        <ul
          className="wrap grid gap-0.5 py-3"
          onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}
        >
          {items.map((item) =>
            "children" in item ? (
              <li key={item.label} className="py-2">
                <p className="px-3 pb-1 text-sm font-semibold text-muted">{item.label}</p>
                <ul className="grid gap-0.5 sm:grid-cols-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        className={`${rowLink} gap-3`}
                      >
                        {icons[child.href]}
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={rowLink}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <div className="wrap border-t border-line py-4">
          <p className="px-3 pb-2 text-sm font-semibold text-muted">{labels.language}</p>
          <ul className="flex flex-wrap gap-2 px-3">
            {languageLinks.map((link) => (
              <li key={link.locale}>
                <a
                  href={link.href}
                  hrefLang={link.hrefLang}
                  lang={link.lang}
                  aria-current={link.locale === locale ? "true" : undefined}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[0.9375rem] font-semibold text-navy-900 hover:bg-sky-100 aria-[current=true]:border-navy-900 aria-[current=true]:bg-navy-900 aria-[current=true]:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
