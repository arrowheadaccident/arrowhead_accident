import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { CallButton, buttonStyles } from "@/components/Button";
import { SiteShell } from "@/components/SiteShell";
import { business } from "@/config/business";
import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO, localePath } from "@/i18n/config";
import { fill } from "@/i18n/fill";
import { getDictionary } from "@/i18n";

// Every unmatched URL in every language lands here (next.config.ts experimental.globalNotFound): the root
// layout lives in app/[lang], so there is no layout above it to wrap a not-found page. The page is in English,
// with one line per other language pointing to that language's home page. Next adds noindex on 404s.
const t = getDictionary(DEFAULT_LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: fill(t.notFound.title, { name: business.name }),
  description: t.notFound.description,
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  viewportFit: "cover",
};

export default function GlobalNotFound() {
  return (
    <SiteShell locale={DEFAULT_LOCALE}>
      <section className="bg-surface">
        <div className="wrap py-16 md:py-28">
          <p className="font-display text-lg font-bold text-navy-500">{t.notFound.eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-[2rem] leading-tight font-extrabold tracking-[-0.015em] md:text-5xl">{t.notFound.h1}</h1>
          <p className="mt-4 max-w-xl text-muted">{t.notFound.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton location="content" />
            <Link href="/" className={buttonStyles.secondary}>
              {t.notFound.home}
            </Link>
            <Link href="/contact/" className={buttonStyles.secondary}>
              {t.notFound.contact}
            </Link>
          </div>
          <ul className="mt-10 grid gap-1 border-t border-line pt-6 text-[0.9375rem]">
            {LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => {
              const other = getDictionary(locale).notFound;
              return (
                <li key={locale} lang={LOCALE_INFO[locale].htmlLang}>
                  <a
                    href={localePath(locale, "/")}
                    hrefLang={LOCALE_INFO[locale].hreflang}
                    className="inline-flex min-h-11 items-center gap-2 text-ink underline-offset-4 hover:underline"
                  >
                    <span className="font-semibold text-navy-900">{LOCALE_INFO[locale].name}:</span>
                    {other.eyebrow}
                    {locale === "zh" ? "。" : ". "}
                    {other.home}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
