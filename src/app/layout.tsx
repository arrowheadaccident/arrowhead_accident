import type { Metadata, Viewport } from "next";
import { Inter, Overpass } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { business } from "@/config/business";
import { CallTracker } from "@/components/CallTracker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { TopBar } from "@/components/TopBar";
import { HOME_DESCRIPTION, HOME_TITLE, ogImage, robots } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

// Headings: an open-source descendant of the US "Highway Gothic" road-sign lettering (docs/DESIGN.md).
const overpass = Overpass({ subsets: ["latin"], display: "swap", variable: "--font-overpass" });

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: HOME_TITLE, template: "%s" },
  description: HOME_DESCRIPTION,
  applicationName: business.name,
  robots,
  // Defaults for pages without pageMetadata (the 404).
  openGraph: { siteName: business.name, locale: "en_US", type: "website", images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  // Setting `icons` here makes Next skip the file-based icon.svg link, so it is listed too.
  // favicon.ico is still linked automatically.
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  viewportFit: "cover",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${inter.variable} ${overpass.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-navy-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <TopBar />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <CallTracker />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
