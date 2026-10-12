import { LearningTimeline } from "@/components/about/learning-timeline";
import { Entry, EntryList, Highlights } from "@/components/shared/entry";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { education } from "@/data/education";
import { journey } from "@/data/journey";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `Education, background, interests and learning journey of ${profile.name}, ${profile.role} at ${profile.university}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A bit about me"
        description={profile.tagline}
      />

      <Section title="Background" className="pt-0">
        <div className="max-w-2xl space-y-5 text-[1.0625rem] leading-8 text-foreground/90">
          {profile.background.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section title="Education" id="education">
        <EntryList>
          {education.map((item) => (
            <Entry
              key={`${item.institution}-${item.degree}`}
              period={item.period}
              title={item.degree}
              subtitle={item.institution}
              meta={item.location}
            >
              {item.result && (
                <p className="font-mono text-xs text-muted-foreground">
                  {item.result}
                </p>
              )}
              <Highlights items={item.highlights} />
            </Entry>
          ))}
        </EntryList>
      </Section>

      <Section title="Learning journey" id="journey">
        <LearningTimeline entries={journey} />
      </Section>

      <div className="grid gap-x-12 md:grid-cols-2">
        <Section title="Interests">
          <ul className="list-disc space-y-2 pl-5 leading-7 marker:text-muted-foreground">
            {profile.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </Section>

        <Section title="Future goals">
          <ol className="list-decimal space-y-2 pl-5 leading-7 marker:font-mono marker:text-sm marker:text-muted-foreground">
            {profile.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ol>
        </Section>
      </div>
    </>
  );
}
