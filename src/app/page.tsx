import type { Metadata } from "next";
import Link from "next/link";
import { Check, Languages, Pill } from "lucide-react";
import { business, telHref } from "@/config/business";
import { ServiceAreas } from "@/components/BusinessInfo";
import { CallButton, buttonStyles } from "@/components/Button";
import { ConditionCard, ConditionGrid, PostCard } from "@/components/Cards";
import { ContactForm } from "@/components/ContactForm";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { OpenStatus } from "@/components/OpenStatus";
import { TeamGrid } from "@/components/Team";
import { FAQ_SLUG, NO_COST_SLUG, getEntry, getPosts, getTreatments } from "@/lib/content";
import { hoursSummary } from "@/lib/hours";
import { buildGraph } from "@/lib/schema";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

const HERO_POINTS = [
  "Same-day appointments",
  "No out-of-pocket cost when another driver is at fault",
  "No health insurance needed",
];

const BILLING_POINTS = [
  "We bill the at-fault person's insurance and wait for payment.",
  "Health insurance is not necessary.",
  "If you have an attorney, we work on a lien and wait for payment.",
  "All paperwork is handled for you.",
];

/** FAQ teaser: the questions people ask first (emergency visit, minor damage, who pays). */
const TEASER_QUESTIONS = [1, 3, 5];

function SectionHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="text-[1.75rem] leading-tight font-extrabold tracking-[-0.01em] md:text-[2.5rem]">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-muted">{lead}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const [emergency, ...conditions] = getTreatments();
  const faqs = getEntry("pages", FAQ_SLUG)?.frontmatter.faqs ?? [];
  const posts = getPosts().slice(0, 2);
  const hoursFallback = hoursSummary
    .filter((row) => row.label !== "Closed")
    .map((row) => `${row.days} ${row.label}`)
    .join(", ");

  return (
    <>
      <JsonLd
        data={buildGraph({ path: "/", title: HOME_TITLE, description: HOME_DESCRIPTION, crumbs: [{ name: "Home", path: "/" }] })}
      />

      {/* 1. Hero: no image, the H1 is the LCP element. */}
      <section className="border-b border-line bg-surface">
        <div className="wrap grid gap-10 pt-6 pb-12 md:pt-14 md:pb-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-14">
          <div>
            <h1 className="text-[2rem] leading-[1.06] font-extrabold tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.5rem]">
              Glendale Arizona Car Accident Injury Chiropractor
            </h1>
            <p className="mt-4 max-w-[60ch] text-ink md:mt-5 md:text-xl md:leading-relaxed">
              If you or a loved one has been in a car collision, you owe it to yourself to get a thorough chiropractic
              exam to find any underlying injuries that could affect you years from now. The worst thing you can do is
              wait and see if the pain goes away. Call today for a same-day or next-day appointment.
            </p>
            <ul className="mt-5 grid gap-2 md:mt-6 md:gap-2.5">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 font-semibold text-navy-900">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                    <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-8">
              <CallButton location="hero" size="lg" />
              <div className="grid gap-1 text-[0.9375rem] text-muted">
                <OpenStatus fallback={hoursFallback} />
                <span lang="es" className="inline-flex items-center gap-2">
                  <Languages aria-hidden="true" className="size-4 text-navy-500" />
                  Hablamos Español
                </span>
              </div>
            </div>
          </div>

          <ContactForm variant="card" location="home_hero" id="callback" />
        </div>
      </section>

      {/* 2. How it works */}
      <HowItWorks />

      {/* 3. Injuries we treat */}
      <section aria-labelledby="injuries-title">
        <div className="wrap py-12 md:py-20">
          <SectionHeading
            id="injuries-title"
            title="Car accident injuries we treat"
            lead="Our chiropractors and medical doctors treat only car accident and work injuries. Pick your symptom to learn more."
          />
          {emergency ? (
            <div className="mt-8">
              <ConditionCard entry={emergency} featured />
            </div>
          ) : null}
          <ConditionGrid entries={conditions} className="mt-4" />
        </div>
      </section>

      {/* 4. No out-of-pocket cost */}
      <section aria-labelledby="cost-title" className="bg-sky-100">
        <div className="wrap grid gap-8 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="cost-title" title="No out-of-pocket cost when you're not at fault" />
            <p className="mt-4 max-w-[60ch]">
              If your accident was caused by another person, our clinic bills the at-fault person&apos;s insurance and
              waits for payment. Our office has over 10 years of experience caring for accident victims with no
              out-of-pocket costs.
            </p>
            <Link href={`/${NO_COST_SLUG}/`} className={`${buttonStyles.secondary} mt-6`}>
              How no out-of-pocket cost works
            </Link>
          </div>
          <ul className="grid content-start gap-3">
            {BILLING_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-card bg-white p-4 font-semibold text-navy-900">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Pain management + Hablamos Español */}
      <section aria-label="Pain management and Spanish-speaking care">
        <div className="wrap grid gap-6 py-12 md:py-20 lg:grid-cols-2">
          <div className="rounded-card border border-line p-6 md:p-8">
            <Pill aria-hidden="true" className="size-7 text-navy-500" />
            <h2 className="mt-4 text-2xl font-extrabold md:text-3xl">Pain management in the same clinic</h2>
            <p className="mt-3">
              We offer pain management for your injuries with medical physicians, orthopedic physicians and pain
              management physicians, with no out-of-pocket cost when another driver is at fault. Emergency appointments
              are available: call today and see the doctor today.
            </p>
            <Link href="/pain-management/" className="mt-5 inline-flex min-h-11 items-center font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2">
              About pain management
            </Link>
          </div>
          <div lang="es" className="on-dark rounded-card bg-navy-900 p-6 md:p-8">
            <Languages aria-hidden="true" className="size-7 text-lane" />
            <h2 className="mt-4 text-2xl font-extrabold md:text-3xl">Hablamos Español</h2>
            <p className="mt-3 text-navy-200">
              Nuestros médicos y asistentes hablan español. Llámenos hoy para una cita el mismo día.
            </p>
            <a href={telHref} data-cta-location="content" className={`${buttonStyles.call} mt-6`}>
              Llame al {business.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* 6. Team */}
      <section aria-labelledby="team-title" className="border-t border-line bg-surface">
        <div className="wrap py-12 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="team-title"
              title="Chiropractors and a medical doctor, under one roof"
              lead="Four chiropractic physicians and a pain management physician who treat car accident injuries every day."
            />
            <Link href="/about-us/#team" className="inline-flex min-h-11 shrink-0 items-center font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2">
              More about our clinic
            </Link>
          </div>
          <TeamGrid className="mt-8" />
        </div>
      </section>

      {/* 7. FAQ teaser */}
      <section aria-labelledby="faq-title">
        <div className="wrap grid gap-8 py-12 md:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" title="Questions after a car accident" lead="Straight answers about ER visits, minor damage and who pays." />
            <Link
              href={`/${FAQ_SLUG}/`}
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2"
            >
              Read all 8 questions
            </Link>
          </div>
          <FaqAccordion faqs={TEASER_QUESTIONS.map((i) => faqs[i]).filter(Boolean)} headingLevel="h3" />
        </div>
      </section>

      {/* 8. Areas we serve */}
      <section aria-labelledby="areas-title" className="border-t border-line bg-surface">
        <div className="wrap py-12 md:py-20">
          <SectionHeading
            id="areas-title"
            title="Areas we serve"
            lead="Car accident patients come to us from Glendale, Arrowhead Ranch and these nearby neighborhoods."
          />
          <ServiceAreas className="mt-8" />
        </div>
      </section>

      {/* 9. From the blog */}
      {posts.length ? (
        <section aria-labelledby="blog-title">
          <div className="wrap py-12 md:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionHeading id="blog-title" title="From the blog" />
              <Link href="/blog/" className="inline-flex min-h-11 items-center font-semibold text-navy-500 underline underline-offset-4 hover:decoration-2">
                All articles
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard entry={post} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 10. */}
      <CtaBand />
    </>
  );
}
