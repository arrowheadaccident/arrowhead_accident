import { business } from "@/config/business";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];

const SHORT: Record<Day, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

/** "19:00" -> "7:00 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function hoursFor(day: Day) {
  return business.hours.find((row) => (row.days as readonly string[]).includes(day)) ?? null;
}

/** One row per day, Monday first. */
export const weeklyHours = DAYS.map((day) => {
  const row = hoursFor(day);
  return { day, label: row ? `${formatTime(row.opens)} – ${formatTime(row.closes)}` : "Closed" };
});

/** Grouped rows: "Mon – Fri", "Sat", "Sun". */
export const hoursSummary = (() => {
  const open = business.hours.map((row) => ({
    days: row.days.length > 1 ? `${SHORT[row.days[0]]} – ${SHORT[row.days[row.days.length - 1]]}` : SHORT[row.days[0]],
    label: `${formatTime(row.opens)} – ${formatTime(row.closes)}`,
  }));
  const closed = DAYS.filter((day) => !hoursFor(day)).map((day) => ({ days: SHORT[day], label: "Closed" }));
  return [...open, ...closed];
})();

export type ClinicStatus = { open: boolean; text: string };

/** Open/closed status in the clinic's time zone. Call only in the browser. */
export function clinicStatus(now: Date): ClinicStatus {
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
      ? { open: false, text: `Opens today at ${formatTime(today.opens)}` }
      : { open: true, text: `Open today until ${formatTime(today.closes)}` };
  }

  const index = DAYS.indexOf(weekday);
  for (let offset = 1; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const row = hoursFor(day);
    if (row) {
      const when = offset === 1 ? "tomorrow" : day;
      return { open: false, text: `Closed now. Opens ${when} at ${formatTime(row.opens)}` };
    }
  }
  return { open: false, text: "Closed now" };
}
