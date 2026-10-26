import { CallButton, CallbackLink } from "@/components/Button";
import { getI18n } from "@/i18n/server";

export async function CtaBand() {
  const { t } = await getI18n();
  return (
    <section aria-labelledby="cta-band-title" className="on-dark bg-navy-900">
      <div className="wrap grid gap-8 py-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-band-title" className="text-2xl font-extrabold tracking-[-0.01em] md:text-[2.25rem] md:leading-[1.1]">
            {t.ctaBand.title}
          </h2>
          <p className="mt-3 text-navy-200">{t.ctaBand.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CallButton location="content" />
          <CallbackLink onDark />
        </div>
      </div>
    </section>
  );
}
