import Link from "next/link";
import { Languages, MapPin, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { Logo } from "@/components/Logo";
import { Address } from "@/components/BusinessInfo";
import { getMainNav, getTreatmentLinks, legalLinks, type NavLink } from "@/lib/nav";
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

export function Footer() {
  const clinicLinks = getMainNav().filter((item): item is NavLink => "href" in item);
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
          <p className="flex items-center gap-3" lang="es">
            <Languages aria-hidden="true" className="size-4 shrink-0 text-lane" />
            Hablamos Español
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-white">Office hours</h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            {hoursSummary.map((row) => (
              <div key={row.days} className="contents">
                <dt className="font-semibold text-white">{row.days}</dt>
                <dd className="tabular-nums">{row.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <LinkList title="Accident treatments" links={getTreatmentLinks()} />
        <LinkList title="Our clinic" links={clinicLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="wrap grid gap-4 py-8 text-sm leading-relaxed">
          <p>
            The information on this website is general information, not medical or legal advice, and does not create a
            doctor–patient relationship. If you have a medical emergency, call 911.
          </p>
          <p>This website is not associated in any way with Dr. Vaughn Movses or Arrowhead Accident Group.</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {business.name}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-10 items-center underline-offset-4 hover:text-white hover:underline">
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
