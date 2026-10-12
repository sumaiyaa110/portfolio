import { Entry, EntryList, Highlights } from "@/components/shared/entry";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { achievements, courses, experience } from "@/data/experience";
import { createMetadata } from "@/lib/seo";
import type { Experience } from "@/types/content";

const description =
  "Research, internships, courses and achievements from my time as an undergraduate.";

export const metadata = createMetadata({
  title: "Experience",
  description,
  path: "/experience",
});

function ExperienceEntries({ items }: { items: Experience[] }) {
  return (
    <EntryList>
      {items.map((item) => (
        <Entry
          key={`${item.organization}-${item.role}`}
          period={item.period}
          title={item.role}
          subtitle={item.organization}
          meta={item.location}
        >
          <p>{item.summary}</p>
          <Highlights items={item.highlights} />
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-sm"
            >
              Learn more
            </a>
          )}
        </Entry>
      ))}
    </EntryList>
  );
}

export default function ExperiencePage() {
  const research = experience.filter((item) => item.kind === "research");
  const internships = experience.filter((item) => item.kind === "internship");

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Experience"
        description={description}
      />

      {research.length > 0 && (
        <Section title="Research" id="research" className="pt-0">
          <ExperienceEntries items={research} />
        </Section>
      )}

      {internships.length > 0 && (
        <Section title="Internships" id="internships">
          <ExperienceEntries items={internships} />
        </Section>
      )}

      {courses.length > 0 && (
        <Section title="Courses" id="courses">
          <EntryList>
            {courses.map((course) => (
              <Entry
                key={course.title}
                period={course.year}
                title={course.title}
                subtitle={course.provider}
              >
                {course.link && (
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-sm"
                  >
                    View certificate
                  </a>
                )}
              </Entry>
            ))}
          </EntryList>
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements" id="achievements">
          <EntryList>
            {achievements.map((achievement) => (
              <Entry
                key={achievement.title}
                period={achievement.year}
                title={achievement.title}
                subtitle={achievement.issuer}
              >
                {achievement.description && <p>{achievement.description}</p>}
              </Entry>
            ))}
          </EntryList>
        </Section>
      )}
    </>
  );
}
