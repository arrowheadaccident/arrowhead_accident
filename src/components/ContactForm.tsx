"use client";

import { useId, useState, useSyncExternalStore, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { business, telHref } from "@/config/business";
import { MESSAGE_MAX, contactSchema, fieldErrors, type ContactField, type FieldErrors } from "@/lib/contact-schema";
import { track, type FormLocation } from "@/lib/track";

type Variant = "card" | "inline" | "compact";

type Props = {
  /** card: home hero (name, phone, accident date) · inline: contact page (all fields) · compact: sidebar (name, phone). */
  variant: Variant;
  location: FormLocation;
  /** Visible heading inside the form; pass null when the page already provides one. */
  title?: string | null;
  headingLevel?: "h2" | "h3";
  id?: string;
};

const FIELD_ORDER: ContactField[] = ["name", "phone", "email", "accidentDate", "message", "consent"];

const inputBase =
  "block w-full rounded-lg border border-field bg-white px-3.5 text-base text-ink transition-colors duration-150 placeholder:text-muted/80 hover:border-navy-700 focus:border-navy-500 aria-[invalid=true]:border-error";

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "");
  return {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    accidentDate: text("accidentDate"),
    message: text("message"),
    consent: data.get("consent") === "on",
    website: text("website"),
  };
}

function validate(form: HTMLFormElement): FieldErrors {
  const result = contactSchema.safeParse(readForm(form));
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

export function ContactForm({ variant, location, title = "Request a call back", headingLevel = "h2", id }: Props) {
  const uid = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const today = useSyncExternalStore(noopSubscribe, todayIso, () => null);

  const compact = variant === "compact";
  const full = variant === "inline";
  const fieldId = (name: string) => `${uid}-${name}`;
  const Heading = headingLevel;

  function onBlur(event: FocusEvent<HTMLFormElement>) {
    const field = (event.target as unknown as HTMLInputElement).name as ContactField | "";
    if (!field || field === "website" || !event.currentTarget.contains(event.target)) return;
    // Validate on blur, but don't scold an empty field the person only tabbed through.
    const value = (event.target as unknown as HTMLInputElement).value;
    if (field !== "consent" && value === "" && !errors[field]) return;
    const next = validate(event.currentTarget);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
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
        body: JSON.stringify(readForm(form)),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; errors?: FieldErrors & { form?: string } } | null;
      if (res.ok && body?.ok) {
        setStatus("sent");
        track("generate_lead", { form_location: location });
        return;
      }
      const { form: message, ...serverErrors } = body?.errors ?? {};
      setErrors(serverErrors);
      setFormError(
        message ??
          (Object.keys(serverErrors).length
            ? null
            : `We couldn't send your request. Please try again or call us at ${business.phone.display}.`),
      );
      focusFirstInvalid(form, serverErrors);
    } catch {
      setFormError(`We couldn't reach our server. Check your connection and try again, or call us at ${business.phone.display}.`);
    }
    setStatus("idle");
  }

  const shell =
    variant === "card"
      ? "rounded-2xl border border-line bg-white p-5 shadow-[0_24px_48px_-24px_rgb(7_26_51/0.35)] sm:p-7"
      : variant === "compact"
        ? "rounded-card border border-line bg-white p-5"
        : "";

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
            <strong className="block font-display text-lg text-navy-900">Thank you, we&apos;ll call you shortly.</strong>
            Need help now? Call{" "}
            <a href={telHref} data-cta-location={location === "sidebar" ? "sidebar" : "content"} className="font-semibold text-navy-500 underline underline-offset-4">
              {business.phone.display}
            </a>
            .
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
      aria-labelledby={title ? `${uid}-title` : undefined}
      className={shell}
    >
      {title ? (
        <div className="mb-5">
          <Heading id={`${uid}-title`} className="font-display text-xl font-extrabold text-navy-900 md:text-2xl">
            {title}
          </Heading>
          {!compact ? <p className="mt-1 text-[0.9375rem] text-muted">It takes less than a minute. Fields without “optional” are required.</p> : null}
        </div>
      ) : null}

      {formError ? (
        <p role="alert" className="mb-4 flex gap-2 rounded-lg border border-error/30 bg-[#fdf0ef] p-3 text-[0.9375rem] text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {formError}
        </p>
      ) : null}

      <div className={`grid gap-4 ${full ? "md:grid-cols-2" : ""}`}>
        <Field id={fieldId("name")} label="Full name" error={errors.name}>
          {(describedBy) => (
            <input
              id={fieldId("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputBase} h-12`}
            />
          )}
        </Field>

        <Field id={fieldId("phone")} label="Phone" error={errors.phone}>
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
          <Field id={fieldId("email")} label="Email" optional error={errors.email}>
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
          <Field id={fieldId("accidentDate")} label="Date of accident" optional error={errors.accidentDate}>
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

        {full ? (
          <Field id={fieldId("message")} label="How can we help?" optional error={errors.message} className="md:col-span-2">
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
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
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
            I agree to be contacted by phone, text or email about my request.
          </label>
        </div>
        {errors.consent ? <FieldError id={`${fieldId("consent")}-error`}>{errors.consent}</FieldError> : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-navy-700 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          "Request a call back"
        )}
      </button>
      <p className="mt-3 text-sm text-muted">Please don&apos;t include medical details. We&apos;ll call you back during business hours.</p>
    </form>
  );
}

function Field({
  id,
  label,
  optional = false,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-semibold text-navy-900">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
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
