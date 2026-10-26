import { Clock, Languages, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { OpenStatus } from "@/components/OpenStatus";
import { hoursSummary } from "@/lib/hours";

export function TopBar() {
  const fallback = hoursSummary
    .filter((row) => row.label !== "Closed")
    .map((row) => `${row.days} ${row.label}`)
    .join(", ");

  return (
    <div className="on-dark hidden bg-navy-950 text-sm md:block">
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between gap-6 px-6 text-navy-200">
        <p className="flex items-center gap-2">
          <Clock aria-hidden="true" className="size-4 text-lane" />
          <OpenStatus fallback={fallback} onDark />
        </p>
        <p className="flex items-center gap-2" lang="es">
          <Languages aria-hidden="true" className="size-4 text-lane" />
          Hablamos Español
        </p>
        <a
          href={telHref}
          data-cta-location="header"
          className="flex min-h-10 items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
        >
          <Phone aria-hidden="true" className="size-4 text-lane" />
          {business.phone.display}
        </a>
      </div>
    </div>
  );
}
