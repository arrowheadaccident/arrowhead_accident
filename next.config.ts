import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is plain SSG (SITE-BRIEF §2). Cache Components is off so pages
  // that read content files or the build date stay fully static without
  // "use cache" / Suspense plumbing.
  cacheComponents: false,
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
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
    ];
  },
};

export default nextConfig;
