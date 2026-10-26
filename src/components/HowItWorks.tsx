import { getI18n } from "@/i18n/server";

/**
 * The page's one bold moment (docs/DESIGN.md): four stops joined by a dashed lane line.
 * The line draws in on scroll via CSS (globals.css .lane-line); no JS.
 */
export async function HowItWorks() {
  const { t } = await getI18n();
  return (
    <section aria-labelledby="how-title" className="on-dark relative overflow-hidden bg-navy-950">
      <div className="wrap py-14 md:py-20">
        <h2 id="how-title" className="max-w-2xl text-[1.75rem] font-extrabold leading-tight tracking-[-0.01em] md:text-[2.5rem]">
          {t.howItWorks.title}
        </h2>
        <p className="mt-3 max-w-2xl text-navy-200">{t.howItWorks.lead}</p>

        <ol className="relative mt-10 grid gap-10 md:mt-14 lg:grid-cols-4 lg:gap-8">
          {/* Lane marking: vertical on small screens, horizontal from lg. */}
          <span
            aria-hidden="true"
            className="lane-line pointer-events-none absolute top-6 bottom-6 left-[1.4375rem] w-[3px] bg-[repeating-linear-gradient(to_bottom,var(--color-lane)_0_14px,transparent_14px_26px)] lg:top-[1.4375rem] lg:right-[12%] lg:bottom-auto lg:left-[3rem] lg:h-[3px] lg:w-auto lg:bg-[repeating-linear-gradient(to_right,var(--color-lane)_0_18px,transparent_18px_32px)]"
          />
          {t.howItWorks.steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-x-5 lg:block">
              <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border-[3px] border-lane bg-navy-950 font-display text-xl font-extrabold text-white">
                {i + 1}
              </span>
              <div className="lg:mt-6">
                <h3 className="text-xl font-bold leading-snug">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-200 md:text-base">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
