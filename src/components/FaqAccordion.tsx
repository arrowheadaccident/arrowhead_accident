import { Plus } from "lucide-react";

type Faq = { q: string; a: string };

/** Native <details>/<summary>: works without JS and with the keyboard (SITE-BRIEF §6.3). */
export function FaqAccordion({ faqs, headingLevel = "h2" }: { faqs: Faq[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex min-h-14 list-none items-start justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
            <Heading className="font-display text-lg font-bold leading-snug text-navy-900 md:text-xl">{faq.q}</Heading>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-navy-900 transition-transform duration-200 group-open:rotate-45"
            >
              <Plus className="size-5" strokeWidth={2.25} />
            </span>
          </summary>
          <div className="max-w-[70ch] space-y-3 pb-6 text-ink">
            {faq.a
              .trim()
              .split(/\n\s*\n/)
              .map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
          </div>
        </details>
      ))}
    </div>
  );
}
