import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { business } from "@/config/business";
import { Address, CallCta, Hours, Phone, ServiceAreas } from "@/components/BusinessInfo";
import { ValueProps } from "@/components/ValueProps";
import { localePath, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

function BusinessName({ legal = false }: { legal?: boolean }) {
  return <>{legal ? business.legalName : business.name}</>;
}

/** Components content authors can use in content/*.mdx. Each one reads business.ts. */
const components = { Phone, Address, Hours, ServiceAreas, CallCta, BusinessName, ValueProps };

/** Translations link with English paths ("/whiplash-injury/"); this adds the page's language prefix. */
function localizedLink(locale: Locale) {
  return function LocalizedLink({ href = "", ...props }: ComponentProps<"a">) {
    return <a href={href.startsWith("/") ? localePath(locale, href) : href} {...props} />;
  };
}

export async function MdxContent({ source, className = "" }: { source: string; className?: string }) {
  const locale = await getLocale();
  return (
    <div className={`prose prose-arrowhead ${className}`}>
      <MDXRemote source={source} components={{ ...components, a: localizedLink(locale) }} />
    </div>
  );
}
