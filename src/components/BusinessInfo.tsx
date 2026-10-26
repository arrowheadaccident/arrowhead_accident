// MDX-usable components that read src/config/business.ts. Content never hard-codes NAP data.
import { Phone as PhoneIcon } from "lucide-react";
import { business, serviceAreas, telHref } from "@/config/business";
import { CallButton } from "@/components/Button";
import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { weeklyHours } from "@/lib/hours";
import type { CtaLocation } from "@/lib/track";

export function Phone({ location = "content" }: { location?: CtaLocation }) {
  return (
    <a href={telHref} data-cta-location={location} className="whitespace-nowrap">
      {business.phone.display}
    </a>
  );
}

export function Address({ className = "" }: { className?: string }) {
  const { street, city, region, postalCode } = business.address;
  return (
    <address className={`not-italic ${className}`}>
      {street}
      <br />
      {city}, {region} {postalCode}
    </address>
  );
}

export async function Hours({ className = "" }: { className?: string }) {
  const { locale, t } = await getI18n();
  return (
    <table className={`w-full max-w-sm text-left ${className}`}>
      <caption className="sr-only">{t.common.officeHours}</caption>
      <tbody>
        {weeklyHours(locale, t.hours.closed).map((row) => (
          <tr key={row.day} className="border-b border-current/15 last:border-0">
            <th scope="row" className="py-2 pr-4 font-semibold">
              {row.day}
            </th>
            <td className="py-2 tabular-nums">{row.label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ServiceAreas({ className = "" }: { className?: string }) {
  return (
    <ul className={`not-prose flex flex-wrap gap-2 ${className}`}>
      {serviceAreas.map((area) => (
        <li key={area} className="rounded-md border border-line bg-white px-3 py-1.5 text-[0.9375rem] text-ink">
          {area}
        </li>
      ))}
    </ul>
  );
}

/** In-content call prompt; replaces the old "Call Now 1(623) 444-1111" headings. */
export async function CallCta() {
  const { locale, t } = await getI18n();
  return (
    <aside
      aria-label={t.callCta.label}
      className="not-prose my-10 flex flex-col gap-4 rounded-card border border-sky-100 bg-sky-100/70 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy-500">
          <PhoneIcon aria-hidden="true" className="size-5" />
        </span>
        <p className="text-base leading-snug text-navy-900">
          <strong className="block font-display text-lg">{t.callCta.title}</strong>
          {t.callCta.before}
          <Link href={localePath(locale, "/contact/#form")} className="font-semibold text-navy-500 underline underline-offset-4">
            {t.callCta.link}
          </Link>
          {t.callCta.after}
        </p>
      </div>
      <CallButton location="content" className="shrink-0" />
    </aside>
  );
}
