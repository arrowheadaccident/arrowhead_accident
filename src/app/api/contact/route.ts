import { Resend } from "resend";
import { business } from "@/config/business";
import { contactSchema, fieldErrors, normalizeUsPhone, type ContactData } from "@/lib/contact-schema";

export const runtime = "nodejs";

// 5 requests per 10 minutes per IP. In memory, so per server instance (SITE-BRIEF §8).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_REQUESTS;
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function formatPhone(raw: string): string {
  const d = normalizeUsPhone(raw) ?? raw;
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw;
}

function emailText(data: ContactData): string {
  return [
    `Name: ${data.name}`,
    `Phone: ${formatPhone(data.phone)}`,
    `Email: ${data.email || "-"}`,
    `Date of accident: ${data.accidentDate || "-"}`,
    "",
    "How can we help?",
    data.message?.trim() || "-",
    "",
    `Sent from the call-back form on ${business.url}`,
  ].join("\n");
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, errors: { form: "Send the form as JSON." } }, 400);
  }

  // Honeypot filled: pretend it worked and send nothing.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return json({ ok: false, errors: { form: `Too many requests. Please call us at ${business.phone.display}.` } }, 429);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 400);
  const data = parsed.data;

  // Never log personal data in production.
  console.info("Contact request received");

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
    const resend = new Resend(RESEND_API_KEY);
    const subjectName = data.name.replace(/[\r\n]+/g, " ").slice(0, 80);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      replyTo: data.email || undefined,
      subject: `New call-back request: ${subjectName}`,
      text: emailText(data),
    });
    if (error) {
      console.error("Contact email failed:", error.name);
      return json(
        { ok: false, errors: { form: `We couldn't send your request. Please call us at ${business.phone.display}.` } },
        502,
      );
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[dev] call-back request (Resend not configured):\n" + emailText(data));
  } else {
    console.warn("Contact email not sent: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing");
  }

  return json({ ok: true });
}
