"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { business, telHref } from "@/config/business";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { fill } from "@/i18n/fill";
import { MESSAGE_MAX, NAME_MAX, contactSchema, fieldErrors, type ContactField, type FieldErrors } from "@/lib/contact-schema";
import { track, type FormLocation } from "@/lib/track";

type Variant = "card" | "inline" | "compact";

type Props = {
  /** card: home hero (name, phone, accident date) · inline: contact page (all fields) · compact: sidebar and footer (name, phone). */
  variant: Variant;
  location: FormLocation;
  locale: Locale;
  /** The page language's form copy (Dictionary["form"]). */
  labels: Dictionary["form"];
  /** Visible heading inside the form (default: labels.title); pass null when the page already provides one. */
  title?: string | null;
  headingLevel?: "h2" | "h3";
  id?: string;
  /** compact only: also shows the optional "How can we help?" field (footer). */
  withMessage?: boolean;
  /** Extra classes on the outer element, e.g. h-full to match a neighboring column. */
  className?: string;
};

const FIELD_ORDER: ContactField[] = ["name", "phone", "email", "accidentDate", "message", "consent"];

const inputBase =
  "block w-full rounded-lg border border-field bg-white px-3.5 text-base text-ink transition-colors duration-150 placeholder:text-muted/80 hover:border-navy-700 focus:border-navy-500 aria-[invalid=true]:border-error";

function readForm(form: HTMLFormElement, locale: Locale) {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "");
  return {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    accidentDate: text("accidentDate"),
    message: text("message"),
    consent: data.get("consent") === "on",
    locale,
    website: text("website"),
  };
}

function validate(form: HTMLFormElement): FieldErrors {
  // The language does not change validation.
  const result = contactSchema.safeParse(readForm(form, "en"));
  return result.success ? {} : fieldErrors(result.error);
}

function focusFirstInvalid(form: HTMLFormElement, errors: FieldErrors) {
  const first = FIELD_ORDER.find((field) => errors[field]);
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
}

// Today's date only exists in the browser; the static HTML renders without a max.
const noopSubscribe = () => () => {};
const todayIso = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

export function ContactForm({
  variant,
  location,
  locale,
  labels,
  title = labels.title,
  headingLevel = "h2",
  id,
  withMessage = false,
  className = "",
}: Props) {
  const uid = useId();
  /** Error code from contact-schema or the API -> sentence in the page's language. */
  const message = (code: string) =>
    fill(labels.errors[code] ?? code, {
      phone: business.phone.display,
      max: code === "name_long" ? NAME_MAX : MESSAGE_MAX,
    });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const today = useSyncExternalStore(noopSubscribe, todayIso, () => null);

  const compact = variant === "compact";
  const full = variant === "inline";
  const fieldId = (name: string) => `${uid}-${name}`;
  const Heading = headingLevel;

  // A blur caused by pressing inside the form (e.g. tapping the consent box right after typing an
  // email) must not show an error mid-click: the new message would shift the target before
  // pointerup and the click would be lost. Such blur checks wait until the click has landed.
  const pointerDown = useRef(false);
  const pendingBlur = useRef<(() => void) | null>(null);
  useEffect(() => {
    const onPointerUp = () => {
      pointerDown.current = false;
      const run = pendingBlur.current;
      pendingBlur.current = null;
      if (run) window.setTimeout(run, 0);
    };
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
    return () => {
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  function onBlur(event: FocusEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const input = event.target as unknown as HTMLInputElement;
    const field = input.name as ContactField | "";
    if (!field || field === "website" || !form.contains(input)) return;
    // Validate on blur, but don't scold an empty field the person only tabbed through.
    const empty = field === "consent" ? !input.checked : input.value === "";
    if (empty && !errors[field]) return;
    const run = () => {
      const next = validate(form);
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    };
    if (pointerDown.current) pendingBlur.current = run;
    else run();
  }

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const field = (event.target as unknown as HTMLInputElement).name as ContactField;
    if (!errors[field]) return;
    const next = validate(event.currentTarget);
    if (!next[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(form, nextErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(readForm(form, locale)),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; errors?: FieldErrors & { form?: string } } | null;
      if (res.ok && body?.ok) {
        setStatus("sent");
        track("generate_lead", { form_location: location });
        return;
      }
      const { form: formCode, ...serverErrors } = body?.errors ?? {};
      setErrors(serverErrors);
      setFormError(formCode ? message(formCode) : Object.keys(serverErrors).length ? null : message("bad_request"));
      focusFirstInvalid(form, serverErrors);
    } catch {
      setFormError(message("network"));
    }
    setStatus("idle");
  }

  const shell = `${
    variant === "card"
      ? "rounded-2xl border border-line bg-white p-5 shadow-[0_24px_48px_-24px_rgb(7_26_51/0.35)] sm:p-7"
      : variant === "compact"
        ? "rounded-card border border-line bg-white p-5"
        : ""
  } ${className}`;

  if (status === "sent") {
    return (
      <div id={id} className={shell}>
        <div
          role="status"
          tabIndex={-1}
          ref={(el) => el?.focus()}
          className="flex gap-3 rounded-card bg-[#e9f6ef] p-5 text-ink focus:outline-none"
        >
          <CircleCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-success" />
          <p className="text-base">
            <strong className="block font-display text-lg text-navy-900">{labels.sentTitle}</strong>
            {labels.sentBefore}
            <a href={telHref} data-cta-location={location === "sidebar" || location === "footer" ? location : "content"} className="font-semibold text-navy-500 underline underline-offset-4">
              {business.phone.display}
            </a>
            {labels.sentAfter}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      noValidate
      onSubmit={onSubmit}
      onBlur={onBlur}
      onChange={onChange}
      onPointerDownCapture={() => {
        pointerDown.current = true;
      }}
      aria-labelledby={title ? `${uid}-title` : undefined}
      className={shell}
    >
      {title ? (
        <div className="mb-5">
          <Heading id={`${uid}-title`} className="font-display text-xl font-extrabold text-navy-900 md:text-2xl">
            {title}
          </Heading>
          {!compact ? <p className="mt-1 text-[0.9375rem] text-muted">{labels.intro}</p> : null}
        </div>
      ) : null}

      {formError ? (
        <p role="alert" className="mb-4 flex gap-2 rounded-lg border border-error/30 bg-[#fdf0ef] p-3 text-[0.9375rem] text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {formError}
        </p>
      ) : null}

      <div className={`grid gap-4 ${full ? "md:grid-cols-2" : ""}`}>
        <Field id={fieldId("name")} label={labels.name} error={errors.name && message(errors.name)}>
          {(describedBy) => (
            <input
              id={fieldId("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={NAME_MAX}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputBase} h-12`}
            />
          )}
        </Field>

        <Field id={fieldId("phone")} label={labels.phone} error={errors.phone && message(errors.phone)}>
          {(describedBy) => (
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="(623) 555-0123"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputBase} h-12`}
            />
          )}
        </Field>

        {full ? (
          <Field id={fieldId("email")} label={labels.email} optional={labels.optional} error={errors.email && message(errors.email)}>
            {(describedBy) => (
              <input
                id={fieldId("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy}
                className={`${inputBase} h-12`}
              />
            )}
          </Field>
        ) : null}

        {!compact ? (
          <Field
            id={fieldId("accidentDate")}
            label={labels.accidentDate}
            optional={labels.optional}
            error={errors.accidentDate && message(errors.accidentDate)}
          >
            {(describedBy) => (
              <input
                id={fieldId("accidentDate")}
                name="accidentDate"
                type="date"
                max={today ?? undefined}
                aria-invalid={errors.accidentDate ? true : undefined}
                aria-describedby={describedBy}
                className={`${inputBase} h-12`}
              />
            )}
          </Field>
        ) : null}

        {full || withMessage ? (
          <Field
            id={fieldId("message")}
            label={labels.message}
            optional={labels.optional}
            error={errors.message && message(errors.message)}
            className={full ? "md:col-span-2" : ""}
          >
            {(describedBy) => (
              <textarea
                id={fieldId("message")}
                name="message"
                rows={4}
                maxLength={MESSAGE_MAX}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy}
                className={`${inputBase} min-h-24 resize-y py-3`}
              />
            )}
          </Field>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>{labels.honeypot}</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5">
        <div className="flex gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            className="mt-0.5 size-6 shrink-0 cursor-pointer rounded accent-navy-900"
          />
          <label htmlFor={fieldId("consent")} className="cursor-pointer text-[0.9375rem] leading-snug text-ink">
            {labels.consent}
          </label>
        </div>
        {errors.consent ? <FieldError id={`${fieldId("consent")}-error`}>{message(errors.consent)}</FieldError> : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-navy-700 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            {labels.sending}
          </>
        ) : (
          labels.submit
        )}
      </button>
      <p className="mt-3 text-sm text-muted">{labels.note}</p>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  /** "(optional)" in the page's language; leave out for required fields. */
  optional?: string;
  error?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-semibold text-navy-900">
        {label}
        {optional ? <span className="font-normal text-muted"> {optional}</span> : null}
      </label>
      {children(error ? errorId : undefined)}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-error">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}
