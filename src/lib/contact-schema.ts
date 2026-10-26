// Shared by ContactForm (browser) and POST /api/contact (server), SITE-BRIEF §8.
// zod/mini keeps the client bundle small.
import * as z from "zod/mini";
import { LOCALES } from "@/i18n/config";

/** Digits only; a leading US country code "1" is dropped. Returns null unless exactly 10 digits remain. */
export function normalizeUsPhone(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

/** "YYYY-MM-DD" that is a real date and not in the future (one day of slack for time zones). */
function isPastOrToday(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return !Number.isNaN(time) && time <= Date.now() + 24 * 60 * 60 * 1000;
}

export const NAME_MAX = 80;
export const MESSAGE_MAX = 1000;

// Messages are codes; the form shows them in the page's language (form.errors in src/i18n/dictionaries).
export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "name_short"), z.maxLength(NAME_MAX, "name_long")),
  phone: z.string().check(z.refine((v) => normalizeUsPhone(v) !== null, "phone")),
  email: z.optional(z.union([z.literal(""), z.email("email")])),
  accidentDate: z.optional(z.string().check(z.refine((v) => v === "" || isPastOrToday(v), "accident_date"))),
  message: z.optional(z.string().check(z.maxLength(MESSAGE_MAX, "message_long"))),
  consent: z.literal(true, "consent"),
  /** The language of the page the form was sent from, so the clinic knows who is calling. */
  locale: z.optional(z.enum(LOCALES)),
  /** Honeypot: hidden from people, must stay empty. */
  website: z.optional(z.string()),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

/** First error code per field. */
export function fieldErrors(error: { issues: { path: PropertyKey[]; message: string }[] }): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !out[field]) out[field] = issue.message;
  }
  return out;
}
