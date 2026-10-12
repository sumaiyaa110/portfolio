import { FadeIn } from "@/components/motion/fade-in";
import { PageHeader } from "@/components/shared/page-header";
import { skillCategories } from "@/data/skills";
import { createMetadata } from "@/lib/seo";

const description =
  "The languages, frameworks and tools I use for research and software projects.";

export const metadata = createMetadata({
  title: "Skills",
  description,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Skills" title="Skills" description={description} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <FadeIn key={category.title} delay={Math.min(index, 5) * 0.05}>
            <section className="surface h-full p-5 sm:p-6">
              <h2 className="text-lg font-bold">{category.title}</h2>
              {category.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-lg border bg-background px-3 py-1.5 text-sm font-medium"
                  >
                    {skill.name}
                    {skill.note && (
                      <span className="ml-1.5 font-normal text-muted-foreground">
                        ({skill.note})
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
