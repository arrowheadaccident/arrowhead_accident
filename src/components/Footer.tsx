import Link from "next/link";
import { Languages, MapPin, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { Logo } from "@/components/Logo";
import { Address } from "@/components/BusinessInfo";
import { getI18n } from "@/i18n/server";
import { getLanguageOptions, getLegalLinks, getMainNav, getTreatmentLinks, type NavLink } from "@/lib/nav";
import { hoursSummary } from "@/lib/hours";

function LinkList({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="text-base font-bold text-white">{title}</h2>
      <ul className="mt-3 grid gap-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-10 items-center text-navy-200 underline-offset-4 hover:text-white hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const { locale, t } = await getI18n();
  const clinicLinks = getMainNav(locale, t).filter((item): item is NavLink => "href" in item);
  // Build-time year: the site is rebuilt on every deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-navy-950 text-[0.9375rem] text-navy-200">
      <div className="wrap grid gap-10 py-12 md:grid-cols-2 md:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <Logo onDark />
          <div className="flex gap-3">
            <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-lane" />
            <Address />
          </div>
          <a
            href={telHref}
            data-cta-location="footer"
            className="flex min-h-10 items-center gap-3 font-semibold text-white underline-offset-4 hover:underline"
          >
            <Phone aria-hidden="true" className="size-4 shrink-0 text-lane" />
            {business.phone.display}
          </a>
          <p className="flex items-center gap-3" lang={t.spoken.lang}>
            <Languages aria-hidden="true" className="size-4 shrink-0 text-lane" />
            {t.spoken.badge}
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-white">{t.common.officeHours}</h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            {hoursSummary(locale, t.hours.closed).map((row) => (
              <div key={row.days} className="contents">
                <dt className="font-semibold text-white">{row.days}</dt>
                <dd className="tabular-nums">{row.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <LinkList title={t.footer.treatments} links={getTreatmentLinks(locale)} />
        <LinkList title={t.footer.clinic} links={clinicLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="wrap grid gap-4 py-8 text-sm leading-relaxed">
          {/* Every language's home page, for visitors and crawlers; the top bar and mobile menu link to the same page. */}
          <nav aria-label={t.footer.languages}>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {getLanguageOptions().map((language) => (
                <li key={language.locale}>
                  <a
                    href={language.home}
                    hrefLang={language.hrefLang}
                    lang={language.lang}
                    aria-current={language.locale === locale ? "true" : undefined}
                    className="inline-flex min-h-10 items-center font-semibold underline-offset-4 hover:text-white hover:underline aria-[current=true]:text-white"
                  >
                    {language.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p>{t.footer.disclaimer}</p>
          <p>{t.footer.notAssociated}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {business.name}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {getLegalLinks(t).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    hrefLang={locale === "en" ? undefined : "en"}
                    className="inline-flex min-h-10 items-center underline-offset-4 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
