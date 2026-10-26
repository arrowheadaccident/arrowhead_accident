"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ContentIcon } from "@/components/icons";
import type { NavItem, NavLink } from "@/lib/nav";

const linkBase =
  "inline-flex min-h-11 items-center rounded-md px-2.5 text-[0.9375rem] font-semibold text-navy-900 transition-colors duration-150 hover:bg-sky-100";

/** Desktop nav (xl+). "Accident Treatments" opens on click and keyboard, never on hover alone. */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {items.map((item) =>
          "children" in item ? (
            <li key={item.label}>
              <NavDropdown label={item.label} links={item.children} pathname={pathname} />
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`${linkBase} aria-[current=page]:text-navy-500 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]`}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function NavDropdown({ label, links, pathname }: { label: string; links: NavLink[]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const isActive = links.some((l) => l.href === pathname);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        // Close when keyboard focus leaves the menu entirely.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`${linkBase} gap-1 ${isActive ? "text-navy-500" : ""}`}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 mt-2 w-[22rem] -translate-x-1/2 rounded-card border border-line bg-white p-2 shadow-[0_18px_40px_-12px_rgb(7_26_51/0.28)]"
      >
        <ul onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-[0.9375rem] font-semibold text-navy-900 transition-colors duration-150 hover:bg-sky-100 aria-[current=page]:bg-sky-100"
              >
                <ContentIcon name={link.icon} className="size-5 shrink-0 text-navy-500" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
