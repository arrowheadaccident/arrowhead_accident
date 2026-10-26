// Launch readiness rules (SITE-BRIEF §15, docs/SEO-AUDIT.md C1). Plain ESM so both the build
// guard in src/lib/seo.ts and `npm run check:launch` (scripts/check-launch.mjs) use the same rules.

const SAMPLE = /\b(example|sample|doe)\b/i;

/**
 * Placeholder data still in src/config/business.ts. Any entry blocks the launch.
 * @param {{ business: { url: string, email: string, address: { street: string }, geo: unknown, mapEmbedUrl: unknown }, team: readonly { name: string, bio: string, isPlaceholder: boolean }[] }} data
 * @returns {string[]}
 */
export function placeholderProblems({ business, team }) {
  const problems = [];
  if (SAMPLE.test(business.address.street)) problems.push(`address is a placeholder ("${business.address.street}")`);
  if (/@example\./i.test(business.email)) problems.push(`email is a placeholder ("${business.email}")`);
  if (!business.geo) problems.push("geo is not set");
  if (!business.mapEmbedUrl) problems.push("mapEmbedUrl is not set");
  if (/^https?:\/\/(localhost|127\.0\.0\.1)\b/.test(business.url)) problems.push(`site URL is ${business.url}`);
  if (team.length === 0) problems.push("team is empty");
  for (const member of team) {
    if (member.isPlaceholder) problems.push(`team member "${member.name}" has isPlaceholder: true`);
    else if (SAMPLE.test(member.name) || /^sample bio/i.test(member.bio)) problems.push(`team member "${member.name}" looks like sample data`);
  }
  return problems;
}

/**
 * Not blocking, but worth fixing at or soon after launch.
 * @param {{ business: { sameAs: readonly string[] }, team: readonly { name: string, photo: string | null, isPlaceholder: boolean }[] }} data
 * @returns {string[]}
 */
export function launchWarnings({ business, team }) {
  const warnings = [];
  if (business.sameAs.length === 0) warnings.push("sameAs is empty: add the Google Business Profile URL once it is verified");
  for (const member of team) {
    if (!member.isPlaceholder && !member.photo) warnings.push(`no photo for ${member.name}`);
  }
  return warnings;
}
