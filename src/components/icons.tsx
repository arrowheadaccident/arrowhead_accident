import {
  Bone,
  Brain,
  CircleHelp,
  Info,
  Layers,
  PersonStanding,
  Pill,
  Siren,
  Spline,
  Wallet,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import type { Frontmatter } from "@/lib/content";

type IconName = NonNullable<Frontmatter["icon"]>;

const ICONS: Record<IconName, LucideIcon> = {
  siren: Siren,
  whiplash: Spline,
  neck: PersonStanding,
  head: Brain,
  back: Bone,
  ligament: Waypoints,
  multiple: Layers,
  pill: Pill,
  wallet: Wallet,
  question: CircleHelp,
  info: Info,
};

export function ContentIcon({ name, className }: { name: Frontmatter["icon"]; className?: string }) {
  const Icon = ICONS[name ?? "info"];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
}
