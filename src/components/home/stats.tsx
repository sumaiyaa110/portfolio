import Link from "next/link";

import { achievements, publications } from "@/data/experience";
import { projects } from "@/data/projects";

/** Headline numbers, counted from the data files so they never go stale. */
export function Stats() {
  const stats = [
    {
      value: publications.length,
      label: "Research papers",
      href: "/experience#publications",
    },
    {
      value: achievements.length,
      label: "Awards & shared-task results",
      href: "/experience#achievements",
    },
    { value: projects.length, label: "Software projects", href: "/projects" },
  ].filter((stat) => stat.value > 0);

  if (stats.length === 0) return null;

  return (
    <ul className="grid gap-3 py-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <li key={stat.label}>
          <Link
            href={stat.href}
            className="surface surface-hover flex h-full items-center gap-4 p-5"
          >
            <span className="text-gradient font-heading text-4xl font-bold tabular-nums">
              {stat.value}
            </span>
            <span className="text-sm font-medium leading-snug text-muted-foreground">
              {stat.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
