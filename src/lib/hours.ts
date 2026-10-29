import { business } from "@/config/business";
import { LOCALE_INFO, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/fill";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];

/** Strings for the hours and open/closed status (Dictionary["hours"]). */
export type HoursLabels = {
  closed: string;
  openUntil: string;
  openUntilReopens: string;
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

/** "9:00 AM – 12:00 PM", "2:00 PM – 6:30 PM": one entry per interval, or [closed]. */
function intervalLabels(row: ReturnType<typeof hoursFor>, locale: Locale, closed: string): string[] {
  return row ? row.intervals.map((interval) => range(interval.opens, interval.closes, locale)) : [closed];
}

/** ["Monday", "Tuesday", "Thursday"] -> "Mon, Tue, Thu"; ["Friday", "Saturday", "Sunday"] -> "Fri – Sun". */
function dayList(days: readonly Day[], locale: Locale): string {
  const short = (day: Day) => capitalized(dayName(day, locale, "short"));
  const runs: Day[][] = [];
  for (const day of [...days].sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b))) {
    const run = runs.at(-1);
    if (run && DAYS.indexOf(day) === DAYS.indexOf(run[run.length - 1]) + 1) run.push(day);
    else runs.push([day]);
  }
  return runs
    .flatMap((run) => (run.length > 2 ? [`${short(run[0])} – ${short(run[run.length - 1])}`] : run.map(short)))
    .join(locale === "zh" ? "、" : ", ");
}

/** One row per day, Monday first. */
export function weeklyHours(locale: Locale, closed: string) {
  return DAYS.map((day) => ({ day: capitalized(dayName(day, locale)), lines: intervalLabels(hoursFor(day), locale, closed) }));
}

/** Grouped rows: "Mon, Tue, Thu" with their intervals, then the closed days in one row. */
export function hoursSummary(locale: Locale, closed: string) {
  const open = business.hours.map((row) => ({
    days: dayList(row.days, locale),
    lines: intervalLabels(row, locale, closed),
    closed: false,
  }));
  const closedDays = DAYS.filter((day) => !hoursFor(day));
  return closedDays.length ? [...open, { days: dayList(closedDays, locale), lines: [closed], closed: true }] : open;
}

/** "Mon, Tue, Thu 9:00 AM – 12:00 PM, 2:00 PM – 6:30 PM": what OpenStatus shows before it knows today's date. */
export function openHoursText(locale: Locale, closed: string): string {
  return hoursSummary(locale, closed)
    .filter((row) => !row.closed)
    .map((row) => `${row.days} ${row.lines.join(", ")}`)
    .join("; ");
}

export type ClinicStatus = { open: boolean; text: string };

/** Open/closed status in the clinic's time zone, lunch break included. Call only in the browser. */
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

  const intervals = hoursFor(weekday)?.intervals ?? [];
  const index = intervals.findIndex((interval) => minutes < toMinutes(interval.closes));
  if (index !== -1) {
    const current = intervals[index];
    if (minutes < toMinutes(current.opens)) {
      return { open: false, text: fill(labels.opensToday, { time: formatTime(current.opens, locale) }) };
    }
    const time = formatTime(current.closes, locale);
    const reopens = intervals[index + 1];
    return {
      open: true,
      text: reopens
        ? fill(labels.openUntilReopens, { time, reopen: formatTime(reopens.opens, locale) })
        : fill(labels.openUntil, { time }),
    };
  }

  const dayIndex = DAYS.indexOf(weekday);
  for (let offset = 1; offset <= 7; offset++) {
    const day = DAYS[(dayIndex + offset) % 7];
    const row = hoursFor(day);
    if (row) {
      const time = formatTime(row.intervals[0].opens, locale);
      return offset === 1
        ? { open: false, text: fill(labels.opensTomorrow, { time }) }
        : { open: false, text: fill(labels.opensOn, { day: dayName(day, locale), time }) };
    }
  }
  return { open: false, text: labels.closedNow };
}
