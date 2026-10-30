import type { NextConfig } from "next";
import { DEFAULT_LOCALE, LOCALES } from "./src/i18n/config";

const prefixed = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).join("|");

const nextConfig: NextConfig = {
  // Every page is plain SSG (SITE-BRIEF §2). Cache Components is off so pages
  // that read content files or the build date stay fully static without
  // "use cache" / Suspense plumbing.
  cacheComponents: false,
  // The root layout is app/[lang]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Thumbnails for <YouTube /> in content.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/neck-pain-whiplash/", destination: "/whiplash-injury/", statusCode: 301 },
      { source: "/mutiple-injuries/", destination: "/multiple-injuries/", statusCode: 301 },
      {
        source: "/2016/06/24/insurance-mantas-myths-concerning-auto-accidents-phoenix-arizona/",
        destination: "/blog/car-accident-insurance-myths/",
        statusCode: 301,
      },
      {
        source:
          "/2016/06/24/phoenix-car-accident-injury-us-military-study-states-youre-better-off-seeing-chiropractor/",
        destination: "/blog/chiropractic-vs-standard-care-study/",
        statusCode: 301,
      },
      { source: "/category/:path*", destination: "/blog/", statusCode: 301 },
      { source: "/author/:path*", destination: "/blog/", statusCode: 301 },
      { source: "/feed/", destination: "/blog/", statusCode: 301 },
      { source: "/sitemap/", destination: "/", statusCode: 301 },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
      // English is served without a prefix; the internal /en/ form never shows up as a second URL.
      { source: `/${DEFAULT_LOCALE}/`, destination: "/", statusCode: 301 },
      { source: `/${DEFAULT_LOCALE}/:path+/`, destination: "/:path+/", statusCode: 301 },
    ];
  },
  async rewrites() {
    return {
      // Every page lives in src/app/[lang]. An English URL (/whiplash-injury/) is served by lang = "en"
      // (/en/whiplash-injury/); /es/…, /de/…, /zh/… and /vi/… match [lang] directly. Not rewritten: those
      // prefixes, /api/, Next internals (_next, __nextjs…) and files (any path with a dot: /og.png, /sitemap.xml).
      beforeFiles: [
        {
          source: `/:path((?!(?:${prefixed}|${DEFAULT_LOCALE}|api)(?:/|$)|_)[^.]*)`,
          destination: `/${DEFAULT_LOCALE}/:path`,
        },
      ],
    };
  },
};

export default nextConfig;
