import { business } from "@/config/business";
import { LOCALE_INFO, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/fill";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];

/** Strings for the hours and open/closed status (Dictionary["hours"]). */
export type HoursLabels = {
  closed: string;
  openUntil: string;
  opensToday: string;
  opensTomorrow: string;
  opensOn: string;
  closedNow: string;
};

/** "Monday" in the page's language. 2024-01-01 was a Monday. */
export function dayName(day: Day, locale: Locale, width: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat(LOCALE_INFO[locale].intl, { weekday: width, timeZone: "UTC" }).format(
    Date.UTC(2024, 0, 1 + DAYS.indexOf(day)),
  );
}

/** For row headings: Spanish weekday names are lowercase in a sentence. */
const capitalized = (text: string) => text.charAt(0).toLocaleUpperCase() + text.slice(1);

/** "19:00" -> "7:00 PM" (en), "19:00" (de), "下午7:00" (zh). */
export function formatTime(hhmm: string, locale: Locale): string {
  const [h, m] = hhmm.split(":").map(Number);
  return new Intl.DateTimeFormat(LOCALE_INFO[locale].intl, { hour: "numeric", minute: "2-digit", timeZone: "UTC" })
    .format(Date.UTC(2024, 0, 1, h, m))
    .replace(/ /g, " ");
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function hoursFor(day: Day) {
  return business.hours.find((row) => (row.days as readonly string[]).includes(day)) ?? null;
}

const range = (opens: string, closes: string, locale: Locale) => `${formatTime(opens, locale)} – ${formatTime(closes, locale)}`;

/** One row per day, Monday first. */
export function weeklyHours(locale: Locale, closed: string) {
  return DAYS.map((day) => {
    const row = hoursFor(day);
    return { day: capitalized(dayName(day, locale)), label: row ? range(row.opens, row.closes, locale) : closed };
  });
}

/** Grouped rows: "Mon – Fri", "Sat", "Sun". */
export function hoursSummary(locale: Locale, closed: string) {
  const short = (day: Day) => capitalized(dayName(day, locale, "short"));
  const open = business.hours.map((row) => ({
    days: row.days.length > 1 ? `${short(row.days[0])} – ${short(row.days[row.days.length - 1])}` : short(row.days[0]),
    label: range(row.opens, row.closes, locale),
    closed: false,
  }));
  const closedDays = DAYS.filter((day) => !hoursFor(day)).map((day) => ({ days: short(day), label: closed, closed: true }));
  return [...open, ...closedDays];
}

/** "Mon – Fri 7:00 AM – 7:00 PM, Sat 8:00 AM – 1:00 PM": what OpenStatus shows before it knows today's date. */
export function openHoursText(locale: Locale, closed: string): string {
  return hoursSummary(locale, closed)
    .filter((row) => !row.closed)
    .map((row) => `${row.days} ${row.label}`)
    .join(", ");
}

export type ClinicStatus = { open: boolean; text: string };

/** Open/closed status in the clinic's time zone. Call only in the browser. */
export function clinicStatus(now: Date, locale: Locale, labels: HoursLabels): ClinicStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: business.timeZone,
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday") as Day;
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  const today = hoursFor(weekday);
  if (today && minutes < toMinutes(today.closes)) {
    return minutes < toMinutes(today.opens)
      ? { open: false, text: fill(labels.opensToday, { time: formatTime(today.opens, locale) }) }
      : { open: true, text: fill(labels.openUntil, { time: formatTime(today.closes, locale) }) };
  }

  const index = DAYS.indexOf(weekday);
  for (let offset = 1; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const row = hoursFor(day);
    if (row) {
      const time = formatTime(row.opens, locale);
      return offset === 1
        ? { open: false, text: fill(labels.opensTomorrow, { time }) }
        : { open: false, text: fill(labels.opensOn, { day: dayName(day, locale), time }) };
    }
  }
  return { open: false, text: labels.closedNow };
}
