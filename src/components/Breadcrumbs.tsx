import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getI18n } from "@/i18n/server";

export type Crumb = { name: string; path: string };

/** Visible trail. The matching BreadcrumbList is part of the page's JSON-LD graph (lib/schema.ts). */
export async function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const { t } = await getI18n();
  return (
    <nav aria-label={t.common.breadcrumb} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-navy-900">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="underline-offset-4 hover:text-navy-500 hover:underline">
                    {crumb.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
