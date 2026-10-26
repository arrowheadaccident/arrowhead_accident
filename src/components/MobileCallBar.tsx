import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { localePath } from "@/i18n/config";
import { fill } from "@/i18n/fill";
import { getI18n } from "@/i18n/server";

/** Fixed call bar below md. <body> reserves its height so it never covers the footer. */
export async function MobileCallBar() {
  const { locale, t } = await getI18n();
  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-950/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-[1.3fr_1fr] gap-2">
        <a
          href={telHref}
          data-cta-location="sticky_bar"
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-cta-600 px-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white active:bg-cta-700"
        >
          <Phone aria-hidden="true" className="size-[1.125rem] shrink-0 max-[379px]:hidden" strokeWidth={2.25} />
          {fill(t.common.call, { phone: business.phone.display })}
        </a>
        <Link
          href={localePath(locale, "/contact/#form")}
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/85 px-3 text-center text-sm leading-tight font-semibold text-white active:bg-white active:text-navy-950"
        >
          {t.common.requestCallback}
        </Link>
      </div>
    </div>
  );
}
