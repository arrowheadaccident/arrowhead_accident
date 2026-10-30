import Image from "next/image";
import { team, type TeamMember } from "@/config/business";
import type { Dictionary } from "@/i18n";
import { getI18n } from "@/i18n/server";

export function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DoctorCard({ member, t, translated }: { member: TeamMember; t: Dictionary; translated: boolean }) {
  // Real bios are English until the clinic sends translations; placeholder bios get a translated stand-in.
  const bio = translated && member.isPlaceholder ? t.team.sampleBio : member.bio;
  return (
    <article id={member.slug} className="flex h-full flex-col rounded-card border border-line bg-white p-5">
      <div className="flex items-center gap-4">
        {member.photo ? (
          <Image
            src={member.photo}
            alt=""
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-full object-cover object-top ring-4 ring-sky-100"
          />
        ) : (
          // Initials avatar until a real, consented photo exists (photo === null).
          <span
            aria-hidden="true"
            className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-xl font-extrabold text-white ring-4 ring-sky-100"
          >
            {initials(member.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold leading-snug text-navy-900">
            {member.name}, {member.postNominals ?? member.credential}
          </h3>
          <p className="text-[0.9375rem] text-muted">{t.team.roles[member.role] ?? member.role}</p>
        </div>
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{bio}</p>
      {member.isPlaceholder ? (
        <p className="mt-auto pt-4">
          <span className="inline-flex items-center rounded-md border border-dashed border-field px-2 py-0.5 text-[0.8125rem] font-semibold text-muted">
            {t.team.sampleTag}
          </span>
        </p>
      ) : null}
    </article>
  );
}

export async function TeamGrid({ members = team, className = "" }: { members?: TeamMember[]; className?: string }) {
  const { locale, t } = await getI18n();
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {members.map((member) => (
        <li key={member.slug}>
          <DoctorCard member={member} t={t} translated={locale !== "en"} />
        </li>
      ))}
    </ul>
  );
}
