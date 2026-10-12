import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/shared/page-header";
import { skillCategories } from "@/data/skills";
import { createMetadata } from "@/lib/seo";

const description =
  "The languages and tools I work with, and an honest note on how well I know each one.";

export const metadata = createMetadata({
  title: "Skills",
  description,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Skills" title="Skills" description={description} />

      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <FadeIn key={category.title} delay={Math.min(index, 4) * 0.05}>
            <section>
              <h2 className="border-b border-dashed border-rule pb-3 text-2xl font-medium">
                {category.title}
              </h2>
              {category.description && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
              <ul className="divide-y">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span>{skill.name}</span>
                    {skill.note && (
                      <span className="text-right font-mono text-xs text-muted-foreground">
                        {skill.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
