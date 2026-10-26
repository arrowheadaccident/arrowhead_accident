import { LOCALES, LOCALE_INFO, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import type { LanguageOption } from "@/components/LanguageMenu";
import { FAQ_SLUG, NO_COST_SLUG, getTreatments, type Frontmatter } from "@/lib/content";

export type NavLink = { href: string; label: string; icon?: Frontmatter["icon"] };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export function getTreatmentLinks(locale: Locale): NavLink[] {
  return getTreatments(locale).map((entry) => ({
    href: entry.url,
    label: entry.frontmatter.navLabel ?? entry.frontmatter.h1,
    icon: entry.frontmatter.icon,
  }));
}

/** Main nav, SITE-BRIEF §5: About · Accident Treatments ▾ · Pain Management · No Out-of-Pocket Cost · FAQ · Blog · Contact */
export function getMainNav(locale: Locale, t: Dictionary): NavItem[] {
  const href = (path: string) => localePath(locale, path);
  return [
    { href: href("/about-us/"), label: t.nav.about },
    { label: t.nav.treatments, children: getTreatmentLinks(locale) },
    { href: href("/pain-management/"), label: t.nav.painManagement },
    { href: href(`/${NO_COST_SLUG}/`), label: t.nav.noCost },
    { href: href(`/${FAQ_SLUG}/`), label: t.nav.faq },
    { href: href("/blog/"), label: t.nav.blog },
    { href: href("/contact/"), label: t.nav.contact },
  ];
}

/** The legal pages are in English only, so every language links to the English URLs. */
export function getLegalLinks(t: Dictionary): NavLink[] {
  return [
    { href: "/terms-of-use/", label: t.legal.terms + t.legal.englishOnly },
    { href: "/privacy-policy/", label: t.legal.privacy + t.legal.englishOnly },
    { href: "/disclosure-policy/", label: t.legal.disclosure + t.legal.englishOnly },
  ];
}

/** Every language with its home page, in the switcher's order. */
export function getLanguageOptions(): LanguageOption[] {
  return LOCALES.map((locale) => ({
    locale,
    name: LOCALE_INFO[locale].name,
    lang: LOCALE_INFO[locale].htmlLang,
    hrefLang: LOCALE_INFO[locale].hreflang,
    home: localePath(locale, "/"),
  }));
}
