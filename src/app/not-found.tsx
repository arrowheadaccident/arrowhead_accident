import type { Metadata } from "next";
import Link from "next/link";
import { CallButton, buttonStyles } from "@/components/Button";
import { business } from "@/config/business";

// Without this the 404 inherits the home page title and description. Next adds noindex on 404s.
export const metadata: Metadata = {
  title: `Page Not Found | ${business.name}`,
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <section className="bg-surface">
      <div className="wrap py-16 md:py-28">
        <p className="font-display text-lg font-bold text-navy-500">Page not found</p>
        <h1 className="mt-2 max-w-3xl text-[2rem] leading-tight font-extrabold tracking-[-0.015em] md:text-5xl">
          This page took a wrong turn
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. If you were hurt in a car accident, you can
          still call us now or start from the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CallButton location="content" />
          <Link href="/" className={buttonStyles.secondary}>
            Go to the home page
          </Link>
          <Link href="/contact/" className={buttonStyles.secondary}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
