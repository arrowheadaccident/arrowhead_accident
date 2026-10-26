import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { CallButton } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { DesktopNav } from "@/components/NavDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { getMainNav } from "@/lib/nav";

export function Header() {
  const items = getMainNav();
  return (
    <header className="relative z-40 border-b border-line bg-white md:sticky md:top-0">
      {/* Wider than the content container so the full nav + call button fit on one line at xl. */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
        <Logo />
        <DesktopNav items={items} />
        <div className="flex items-center gap-2">
          <CallButton location="header" className="hidden min-h-11 px-5 text-[0.9375rem] md:inline-flex" />
          <a
            href={telHref}
            data-cta-location="header"
            aria-label={`Call ${business.phone.display}`}
            className="inline-flex size-12 items-center justify-center rounded-full bg-cta-600 text-white transition-colors duration-150 hover:bg-cta-700 md:hidden"
          >
            <Phone aria-hidden="true" className="size-5" strokeWidth={2.25} />
          </a>
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}
