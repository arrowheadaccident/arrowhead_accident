import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { SiteShell } from "@/components/SiteShell";
import { LOCALES, LOCALE_INFO, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ogImage, robots } from "@/lib/seo";

/** Every language is prerendered; /en/… URLs are redirected to the unprefixed English ones (next.config.ts). */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(business.url),
    title: { default: t.meta.homeTitle, template: "%s" },
    description: t.meta.homeDescription,
    applicationName: business.name,
    robots,
    openGraph: { siteName: business.name, locale: LOCALE_INFO[lang].ogLocale, type: "website", images: [ogImage(lang)] },
    twitter: { card: "summary_large_image", images: [ogImage(lang).url] },
    // Setting `icons` here makes Next skip the file-based icon.svg link, so it is listed too.
    // favicon.ico is still linked automatically.
    icons: {
      icon: { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b2545",
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <SiteShell locale={lang}>{children}</SiteShell>;
}
