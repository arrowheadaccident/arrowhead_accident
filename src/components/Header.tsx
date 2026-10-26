import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { CallButton } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { ContentIcon } from "@/components/icons";
import { DesktopNav } from "@/components/NavDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { fill } from "@/i18n/fill";
import { getI18n } from "@/i18n/server";
import { getSitePages } from "@/lib/content";
import { getLanguageOptions, getMainNav, getTreatmentLinks } from "@/lib/nav";

export async function Header() {
  const { locale, t } = await getI18n();
  const items = getMainNav(locale, t);
  const icons = Object.fromEntries(
    getTreatmentLinks(locale).map((link) => [link.href, <ContentIcon key={link.href} name={link.icon} className="size-5 shrink-0 text-navy-500" />]),
  );
  return (
    <header className="relative z-40 border-b border-line bg-white md:sticky md:top-0">
      {/* Wider than the content container so the full nav + call button fit on one line at xl. */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
        <Logo />
        <DesktopNav items={items} icons={icons} label={t.common.mainNav} />
        <div className="flex items-center gap-2">
          <span className="hidden md:block">
            <CallButton location="header" size="sm" />
          </span>
          <a
            href={telHref}
            data-cta-location="header"
            aria-label={fill(t.common.call, { phone: business.phone.display })}
            className="inline-flex size-12 items-center justify-center rounded-full bg-cta-600 text-white transition-colors duration-150 hover:bg-cta-700 md:hidden"
          >
            <Phone aria-hidden="true" className="size-5" strokeWidth={2.25} />
          </a>
          <MobileMenu
            items={items}
            icons={icons}
            locale={locale}
            languages={getLanguageOptions()}
            pages={getSitePages()}
            labels={{ open: t.common.openMenu, close: t.common.closeMenu, nav: t.common.mainNav, language: t.common.language }}
          />
        </div>
      </div>
    </header>
  );
}
