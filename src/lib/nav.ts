import { FAQ_SLUG, NO_COST_SLUG, getTreatments, type Frontmatter } from "@/lib/content";

export type NavLink = { href: string; label: string; icon?: Frontmatter["icon"] };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export function getTreatmentLinks(): NavLink[] {
  return getTreatments().map((entry) => ({
    href: entry.url,
    label: entry.frontmatter.navLabel ?? entry.frontmatter.h1,
    icon: entry.frontmatter.icon,
  }));
}

/** Main nav, SITE-BRIEF §5: About · Accident Treatments ▾ · Pain Management · No Out-of-Pocket Cost · FAQ · Blog · Contact */
export function getMainNav(): NavItem[] {
  return [
    { href: "/about-us/", label: "About" },
    { label: "Accident Treatments", children: getTreatmentLinks() },
    { href: "/pain-management/", label: "Pain Management" },
    { href: `/${NO_COST_SLUG}/`, label: "No Out-of-Pocket Cost" },
    { href: `/${FAQ_SLUG}/`, label: "FAQ" },
    { href: "/blog/", label: "Blog" },
    { href: "/contact/", label: "Contact" },
  ];
}

export const legalLinks: NavLink[] = [
  { href: "/terms-of-use/", label: "Terms of Use" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/disclosure-policy/", label: "Disclosure Policy" },
];
