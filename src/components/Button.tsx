import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import type { CtaLocation } from "@/lib/track";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-tight whitespace-nowrap transition-colors duration-150 ease-out";

// Size and display live here, never in a caller's className, so utilities don't fight each other.
const sizes = {
  sm: "min-h-11 px-5 text-[0.9375rem]",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-12 px-7 text-[1.0625rem]",
} as const;

export const buttonStyles = {
  /** Red is reserved for call buttons (SITE-BRIEF §6.1). */
  call: `${base} ${sizes.md} bg-cta-600 text-white hover:bg-cta-700 active:bg-cta-700`,
  secondary: `${base} ${sizes.md} border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white`,
  secondaryOnDark: `${base} ${sizes.md} border-2 border-white/85 text-white hover:bg-white hover:text-navy-950`,
} as const;

type CallButtonProps = {
  location: CtaLocation;
  size?: keyof typeof sizes;
  /** Layout only (margins, width). */
  className?: string;
  /** Visible text; the number is always part of it so people can dial by hand. */
  label?: string;
};

export function CallButton({ location, size = "md", className = "", label = `Call ${business.phone.display}` }: CallButtonProps) {
  return (
    <a
      href={telHref}
      data-cta-location={location}
      className={`${base} ${sizes[size]} bg-cta-600 text-white hover:bg-cta-700 active:bg-cta-700 ${className}`}
    >
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
