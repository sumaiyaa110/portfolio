import { Entry, EntryList, Highlights } from "@/components/shared/entry";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import {
  achievements,
  activities,
  courses,
  experience,
  publications,
} from "@/data/experience";
import { createMetadata } from "@/lib/seo";
import type { Experience, Publication } from "@/types/content";

const description =
  "Research publications, shared-task results, awards, training and activities from my time as an undergraduate.";

export const metadata = createMetadata({
  title: "Experience",
  description,
  path: "/experience",
});

function PublicationEntries({ items }: { items: Publication[] }) {
  return (
    <EntryList>
      {items.map((item) => {
        const href = item.doi ? `https://doi.org/${item.doi}` : item.link;
        return (
          <Entry
            key={item.title}
            period={item.year}
            title={item.title}
            subtitle={item.venue}
          >
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link font-mono text-xs"
              >
                {item.doi ? `DOI: ${item.doi}` : "View paper"}
              </a>
            )}
          </Entry>
        );
      })}
    </EntryList>
  );
}

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
  const workshopPapers = publications.filter((item) => item.kind === "workshop");
  const conferencePapers = publications.filter(
    (item) => item.kind === "conference",
  );
  const research = experience.filter((item) => item.kind === "research");
  const internships = experience.filter((item) => item.kind === "internship");

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Research & experience"
        description={description}
      />

      {publications.length > 0 && (
        <Section title="Publications" id="publications" className="pt-0">
          <div className="space-y-10">
            {workshopPapers.length > 0 && (
              <div>
                <h3 className="mb-5 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
                  Workshop papers
                </h3>
                <PublicationEntries items={workshopPapers} />
              </div>
            )}
            {conferencePapers.length > 0 && (
              <div>
                <h3 className="mb-5 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
                  Conference papers
                </h3>
                <PublicationEntries items={conferencePapers} />
              </div>
            )}
          </div>
        </Section>
      )}

      {research.length > 0 && (
        <Section title="Research" id="research">
          <ExperienceEntries items={research} />
        </Section>
      )}

      {internships.length > 0 && (
        <Section title="Internships" id="internships">
          <ExperienceEntries items={internships} />
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

      {courses.length > 0 && (
        <Section title="Courses & training" id="courses">
          <EntryList>
            {courses.map((course) => (
              <Entry
                key={`${course.provider}-${course.title}`}
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

      {activities.length > 0 && (
        <Section title="Activities" id="activities">
          <ul className="max-w-2xl list-disc space-y-2 pl-5 leading-7 marker:text-muted-foreground">
            {activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
