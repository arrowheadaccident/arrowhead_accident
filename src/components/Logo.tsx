import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

/** Road-sign arrowhead over a lane dash. Also used for the favicon (src/app/icon.svg). */
export function LogoMark({ className = "size-9", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill={onDark ? "#ffffff" : "#0b2545"} />
      <path
        d="M9 18.5 16 10l7 8.5"
        fill="none"
        stroke={onDark ? "#0b2545" : "#ffffff"}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 22v3" stroke="#f5b700" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

/** The brand name stays in English in every language. */
export async function Logo({ onDark = false }: { onDark?: boolean }) {
  const locale = await getLocale();
  return (
    <Link href={localePath(locale, "/")} className="group inline-flex min-h-11 items-center gap-2.5 rounded-md">
      <LogoMark onDark={onDark} />
      <span className="flex flex-col whitespace-nowrap">
        <span
          className={`font-display text-[1.375rem] font-extrabold leading-none tracking-[-0.01em] ${onDark ? "text-white" : "text-navy-900"}`}
        >
          Arrowhead
        </span>
        <span className={`mt-1 text-[0.75rem] font-semibold leading-none ${onDark ? "text-navy-200" : "text-muted"}`}>
          Car Accident Chiropractor
        </span>
      </span>
    </Link>
  );
}
