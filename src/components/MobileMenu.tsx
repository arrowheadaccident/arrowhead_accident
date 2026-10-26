"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/nav";

const rowLink =
  "flex min-h-12 items-center rounded-md px-3 text-base font-semibold text-navy-900 hover:bg-sky-100 aria-[current=page]:bg-sky-100 aria-[current=page]:text-navy-500";

/** Disclosure menu below xl. Treatments are listed inline (no second dropdown on touch screens). */
export function MobileMenu({ items, icons }: { items: NavItem[]; icons: Record<string, ReactNode> }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-12 items-center justify-center rounded-full border border-line text-navy-900 transition-colors duration-150 hover:bg-sky-100"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-8.5rem-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain md:max-h-[calc(100dvh-4.5rem)] border-b border-line bg-white shadow-[0_24px_40px_-24px_rgb(7_26_51/0.35)]"
      >
        <ul
          className="wrap grid gap-0.5 py-3"
          onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}
        >
          {items.map((item) =>
            "children" in item ? (
              <li key={item.label} className="py-2">
                <p className="px-3 pb-1 text-sm font-semibold text-muted">{item.label}</p>
                <ul className="grid gap-0.5 sm:grid-cols-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        className={`${rowLink} gap-3`}
                      >
                        {icons[child.href]}
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={rowLink}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  );
}
