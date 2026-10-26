"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { clinicStatus } from "@/lib/hours";

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60_000);
const serverMinute = () => null;

type Props = {
  /** Rendered on the server and before hydration (the page is static, so "today" is unknown there). */
  fallback: ReactNode;
  className?: string;
  onDark?: boolean;
};

/** "Open today until 7:00 PM" in the clinic's time zone. */
export function OpenStatus({ fallback, className = "", onDark = false }: Props) {
  const minute = useSyncExternalStore(subscribe, currentMinute, serverMinute);
  if (minute === null) return <span className={className}>{fallback}</span>;

  const status = clinicStatus(new Date(minute * 60_000));
  const openDot = onDark ? "bg-[#3ccf7e]" : "bg-success";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`inline-block size-2 shrink-0 rounded-full ${status.open ? openDot : "bg-current opacity-60"}`}
      />
      {status.text}
    </span>
  );
}
