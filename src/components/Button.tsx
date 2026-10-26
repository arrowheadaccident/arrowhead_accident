import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import type { CtaLocation } from "@/lib/track";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold leading-tight whitespace-nowrap transition-colors duration-150 ease-out";

export const buttonStyles = {
  /** Red is reserved for call buttons (SITE-BRIEF §6.1). */
  call: `${base} bg-cta-600 text-white hover:bg-cta-700 active:bg-cta-700`,
  secondary: `${base} border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white`,
  secondaryOnDark: `${base} border-2 border-white/85 text-white hover:bg-white hover:text-navy-950`,
} as const;

type CallButtonProps = {
  location: CtaLocation;
  className?: string;
  /** Visible text; the number is always part of it so people can dial by hand. */
  label?: string;
};

export function CallButton({ location, className = "", label = `Call ${business.phone.display}` }: CallButtonProps) {
  return (
    <a href={telHref} data-cta-location={location} className={`${buttonStyles.call} ${className}`}>
      <Phone aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.25} />
      <span>{label}</span>
    </a>
  );
}

type CallbackLinkProps = { onDark?: boolean; className?: string };

export function CallbackLink({ onDark = false, className = "" }: CallbackLinkProps) {
  return (
    <Link href="/contact/#form" className={`${onDark ? buttonStyles.secondaryOnDark : buttonStyles.secondary} ${className}`}>
      Request a call back
    </Link>
  );
}
