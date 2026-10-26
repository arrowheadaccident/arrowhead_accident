import { CalendarCheck, HandHeart, Languages, Scale, ShieldCheck, Stethoscope, type LucideIcon } from "lucide-react";
import { valueProps } from "@/config/business";

const ICONS: LucideIcon[] = [CalendarCheck, ShieldCheck, HandHeart, Scale, Stethoscope, Languages];

export function ValueProps({ className = "" }: { className?: string }) {
  return (
    <ul className={`not-prose grid gap-x-8 gap-y-6 sm:grid-cols-2 ${className}`}>
      {valueProps.map((prop, i) => {
        const Icon = ICONS[i] ?? ShieldCheck;
        const spanish = prop.title === "Hablamos Español";
        return (
          <li key={prop.title} className="flex gap-4" lang={spanish ? "es" : undefined}>
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-navy-500">
              <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
            </span>
            <span>
              <strong className="block font-display text-lg font-bold text-navy-900">{prop.title}</strong>
              <span className="mt-1 block text-base leading-relaxed text-muted">{prop.text}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
