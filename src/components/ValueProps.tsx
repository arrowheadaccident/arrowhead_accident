import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { CalendarCheck, Handshake, Languages, Receipt, Scale, ShieldCheck, Stethoscope, Wallet, type LucideIcon } from "lucide-react";

/** One icon per item, in the order of the About page's benefits list (same order in every language). */
const ICONS: LucideIcon[] = [CalendarCheck, ShieldCheck, Wallet, Receipt, Handshake, Scale, Stethoscope, Languages];

type WithChildren = ReactElement<{ children?: ReactNode }>;

/** Wraps a Markdown list in content/*.mdx and shows it as a two-column grid with an icon per item:
    <ValueProps>

    - Same Day Appointment

    </ValueProps> */
export function ValueProps({ children, className = "" }: { children: ReactNode; className?: string }) {
  const items = Children.toArray(children)
    .filter((child): child is WithChildren => isValidElement(child) && child.type === "ul")
    .flatMap((list) => Children.toArray(list.props.children).filter((item): item is WithChildren => isValidElement(item)));

  return (
    <ul className={`not-prose grid gap-x-8 gap-y-5 sm:grid-cols-2 ${className}`}>
      {items.map((item, i) => {
        const Icon = ICONS[i] ?? ShieldCheck;
        return (
          <li key={i} className="flex items-center gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-navy-500">
              <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
            </span>
            <span className="font-display text-lg leading-snug font-bold text-navy-900">{item.props.children}</span>
          </li>
        );
      })}
    </ul>
  );
}
