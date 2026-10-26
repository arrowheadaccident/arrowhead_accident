import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";

/** Fixed call bar below md. <body> reserves its height so it never covers the footer. */
export function MobileCallBar() {
  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-950/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-[1.3fr_1fr] gap-2">
        <a
          href={telHref}
          data-cta-location="sticky_bar"
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-cta-600 px-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white active:bg-cta-700"
        >
          <Phone aria-hidden="true" className="size-[1.125rem] shrink-0 max-[379px]:hidden" strokeWidth={2.25} />
          Call {business.phone.display}
        </a>
        <Link
          href="/contact/#form"
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/85 px-3 text-center text-sm leading-tight font-semibold text-white active:bg-white active:text-navy-950"
        >
          Request a call back
        </Link>
      </div>
    </div>
  );
}
