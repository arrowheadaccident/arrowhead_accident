import { Clock, Globe, Languages, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { LanguageMenu } from "@/components/LanguageMenu";
import { OpenStatus } from "@/components/OpenStatus";
import { getI18n } from "@/i18n/server";
import { getSitePages } from "@/lib/content";
import { openHoursText } from "@/lib/hours";
import { getLanguageOptions } from "@/lib/nav";

export async function TopBar() {
  const { locale, t } = await getI18n();
  return (
    <div className="on-dark hidden bg-navy-950 text-sm md:block">
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between gap-6 px-6 text-navy-200">
        {/* The lunch-break status ("Open until 12:00 PM, reopens at 2:00 PM") needs the room the
            language badge would take below lg; the longer pre-hydration hours line truncates. */}
        <p className="flex min-w-0 items-center gap-2">
          <Clock aria-hidden="true" className="size-4 shrink-0 text-lane" />
          <OpenStatus fallback={openHoursText(locale, t.hours.closed)} locale={locale} labels={t.hours} onDark className="truncate" />
        </p>
        <p className="hidden items-center gap-2 lg:flex" lang={t.spoken.lang}>
          <Languages aria-hidden="true" className="size-4 text-lane" />
          {t.spoken.badge}
        </p>
        <div className="flex shrink-0 items-center gap-6">
          <LanguageMenu
            locale={locale}
            languages={getLanguageOptions()}
            pages={getSitePages()}
            label={t.common.language}
            icon={<Globe aria-hidden="true" className="size-4 text-lane" />}
          />
          <a
            href={telHref}
            data-cta-location="header"
            className="flex min-h-10 items-center gap-2 font-semibold whitespace-nowrap text-white underline-offset-4 hover:underline"
          >
            <Phone aria-hidden="true" className="size-4 text-lane" />
            {business.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
