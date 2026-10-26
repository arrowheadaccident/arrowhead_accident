import type { Metadata } from "next";
import { Languages, MapPin, Phone as PhoneIcon } from "lucide-react";
import { business, telHref } from "@/config/business";
import { Address, Hours } from "@/components/BusinessInfo";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageLayout";
import { buildGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Contact Us | Glendale Car Accident Chiropractor";
const DESCRIPTION =
  "Call (623) 400-6362 or request a call back. Same-day appointments for car accident injuries in Glendale, AZ. Hablamos Español.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact/" });

export default function ContactPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact/" },
  ];

  return (
    <>
      <JsonLd data={buildGraph({ path: "/contact/", title: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHeader crumbs={crumbs} title="Contact Us">
        <a
          href={telHref}
          data-cta-location="content"
          className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full font-display text-[2rem] font-extrabold tracking-[-0.01em] text-cta-600 underline-offset-8 hover:underline md:text-5xl"
        >
          <PhoneIcon aria-hidden="true" className="size-8 md:size-10" strokeWidth={2.25} />
          {business.phone.display}
        </a>
        <p className="mt-3 max-w-xl text-muted">Call for a same-day appointment, or send the form and we&apos;ll call you back.</p>
      </PageHeader>

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <section aria-labelledby="form-title" id="form" className="scroll-mt-28">
          <h2 id="form-title" className="text-2xl font-extrabold md:text-3xl">
            Request a call back
          </h2>
          <p className="mt-2 mb-6 text-muted">Fields without “optional” are required.</p>
          <ContactForm variant="inline" location="contact" title={null} />
        </section>

        <div className="grid content-start gap-10">
          <section aria-labelledby="hours-title">
            <h2 id="hours-title" className="text-2xl font-extrabold">
              Office hours
            </h2>
            <Hours className="mt-4" />
          </section>

          <section aria-labelledby="visit-title">
            <h2 id="visit-title" className="text-2xl font-extrabold">
              Visit us
            </h2>
            <div className="mt-4 flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-navy-500" />
              <Address />
            </div>
            {business.mapEmbedUrl ? (
              <iframe
                title={`Map to ${business.name}`}
                src={business.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-5 aspect-[4/3] w-full rounded-card border border-line"
              />
            ) : (
              <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-card border-2 border-dashed border-field bg-surface p-6 text-center text-muted">
                Map will appear once the address is confirmed
              </div>
            )}
          </section>

          <section aria-labelledby="es-title" lang="es" className="on-dark rounded-card bg-navy-900 p-6">
            <h2 id="es-title" className="flex items-center gap-3 text-2xl font-extrabold">
              <Languages aria-hidden="true" className="size-6 text-lane" />
              Hablamos Español
            </h2>
            <p className="mt-2 text-navy-200">Nuestros médicos y asistentes hablan español.</p>
          </section>
        </div>
      </div>
    </>
  );
}
