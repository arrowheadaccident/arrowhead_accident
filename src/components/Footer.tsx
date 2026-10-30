import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { Logo } from "@/components/Logo";
import { Address } from "@/components/BusinessInfo";
import { ContactForm } from "@/components/ContactForm";
import { fill } from "@/i18n/fill";
import { getI18n } from "@/i18n/server";
import { getLanguageOptions, getLegalLinks, getTreatmentLinks } from "@/lib/nav";
import { hoursSummary } from "@/lib/hours";

/** The phone number inside a footer sentence. */
function InlinePhone() {
  return (
    <a href={telHref} data-cta-location="footer" className="font-semibold whitespace-nowrap text-white underline underline-offset-4">
      {business.phone.display}
    </a>
  );
}

const columnTitle = "font-display text-xl font-extrabold";
const inlineLink = "inline-flex min-h-10 items-center underline-offset-4 hover:text-white hover:underline";

export async function Footer() {
  const { locale, t } = await getI18n();
  // Build-time year: the site is rebuilt on every deploy.
  const year = new Date().getFullYear();
  // Chinese sentences follow each other without a space.
  const gap = locale === "zh" ? "" : " ";

  return (
    <footer className="on-dark bg-navy-950 text-[0.9375rem] text-navy-200">
      {/* The clinic's own footer: about the care, the map, and where to reach us. */}
      <div className="wrap grid gap-12 py-12 md:grid-cols-2 md:py-16 lg:grid-cols-3 lg:gap-10">
        <section aria-labelledby="footer-about">
          <h2 id="footer-about" className={columnTitle}>
            {t.footer.aboutTitle}
          </h2>
          <div className="mt-4 grid gap-4 leading-relaxed">
            <p>
              <strong className="font-bold text-white">{t.footer.noCostLead}</strong>
              {gap}
              {fill(t.footer.noCost, { name: business.name })}
            </p>
            <p>{t.footer.experience}</p>
            <p>
              {t.footer.appointments}
              {gap}
              <InlinePhone />
            </p>
            <p lang={t.spoken.lang} className="font-bold text-white">
              {t.spoken.text}
            </p>
            <p>
              {t.footer.painManagement}
              {gap}
              {t.footer.callUs}
              {gap}
              <InlinePhone />
            </p>
          </div>
        </section>

        {/* Clinic details above the map; from md the map fills the rest of the column's height. */}
        <section aria-labelledby="footer-visit" className="flex flex-col">
          <h2 id="footer-visit" className={columnTitle}>
            {t.contact.visit}
          </h2>
          <div className="mt-4">
            <h3 className="font-semibold text-white">{t.footer.clinicTitle}</h3>
            <div className="mt-3 grid gap-2">
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
              <div className="flex gap-3">
                <Clock aria-hidden="true" className="mt-1 size-4 shrink-0 text-lane" />
                <h4 className="sr-only">{t.common.officeHours}</h4>
                <dl className="grid gap-2">
                  {hoursSummary(locale, t.hours.closed).map((row) => (
                    <div key={row.days}>
                      <dt className="font-semibold text-white">{row.days}</dt>
                      {/* Wraps between the morning and afternoon hours, never inside one range. */}
                      <dd className="tabular-nums">
                        {row.lines.map((line, i) => (
                          <span key={line}>
                            {i > 0 ? ", " : null}
                            <span className="whitespace-nowrap">{line}</span>
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          {business.mapEmbedUrl ? (
            <iframe
              title={fill(t.contact.mapTitle, { name: business.name })}
              src={business.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 aspect-[4/3] w-full rounded-card border border-white/10 bg-navy-900 md:aspect-auto md:min-h-72 md:flex-1"
            />
          ) : null}
        </section>

        {/* A white card on the dark footer: the form keeps its normal colors and focus ring. With the
            message field it is about as tall as the map column, and h-full lines its bottom up with the map. */}
        <div className="[--focus-ring:var(--color-navy-500)]">
          <ContactForm
            variant="compact"
            location="footer"
            title={t.footer.contactTitle}
            headingLevel="h2"
            locale={locale}
            labels={t.form}
            withMessage
            className="h-full"
          />
        </div>
      </div>

      {/* Logo and treatment links on the left; languages, legal links and © on the right. */}
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-6 py-8 text-sm lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
            <Logo onDark />
            <nav aria-label={t.footer.treatments} className="max-w-xl">
              <ul className="flex flex-wrap gap-x-5">
                {getTreatmentLinks(locale).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={inlineLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex shrink-0 flex-col gap-1 lg:items-end">
            {/* Every language's home page, for visitors and crawlers; the top bar and mobile menu link to the same page. */}
            <nav aria-label={t.footer.languages}>
              <ul className="flex flex-wrap gap-x-5 lg:justify-end">
                {getLanguageOptions().map((language) => (
                  <li key={language.locale}>
                    <a
                      href={language.home}
                      hrefLang={language.hrefLang}
                      lang={language.lang}
                      aria-current={language.locale === locale ? "true" : undefined}
                      className={`${inlineLink} font-semibold aria-[current=true]:text-white`}
                    >
                      {language.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="flex flex-wrap gap-x-5 lg:justify-end">
              {getLegalLinks(t).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} hrefLang={locale === "en" ? undefined : "en"} className={inlineLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="pt-2">
              © {year} {business.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
