import fs from "node:fs";
import path from "node:path";

import { DownloadIcon } from "lucide-react";

import { PrintButton } from "@/components/resume/print-button";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Resume",
  description: `Resume of ${profile.name}: education, experience, projects and skills.`,
  path: "/resume",
});

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="break-inside-avoid-page">
      <h2 className="mb-4 border-b border-border pb-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function ResumeItem({
  title,
  subtitle,
  period,
  children,
}: {
  title: string;
  subtitle?: string;
  period?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-sans text-base font-semibold tracking-normal">
          {title}
        </h3>
        {period && (
          <p className="font-mono text-xs text-muted-foreground">{period}</p>
        )}
      </div>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      {children && (
        <div className="mt-1.5 text-[0.9375rem] leading-6">{children}</div>
      )}
    </div>
  );
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  // The download button only appears once you add the PDF to /public.
  const hasPdf = fs.existsSync(
    path.join(process.cwd(), "public", profile.resumePdf),
  );

  return (
    <div className="mx-auto max-w-3xl pt-10 sm:pt-14 print:max-w-none print:pt-0">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Resume
        </p>
        <div className="flex gap-2">
          {hasPdf && (
            <a
              href={profile.resumePdf}
              download
              className={buttonVariants({ size: "lg" })}
            >
              <DownloadIcon data-icon="inline-start" />
              Download PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <article className="space-y-8 rounded-lg border bg-card p-6 sm:p-10 print:rounded-none print:border-0 print:bg-transparent print:p-0">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold">{profile.name}</h1>
          <p className="text-muted-foreground">
            {profile.role} · {profile.university}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
            <li>
              <a href={`mailto:${resume.contact.email}`} className="hover:text-primary">
                {resume.contact.email}
              </a>
            </li>
            <li>{resume.contact.location}</li>
            {resume.contact.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {link.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <p className="leading-7">{resume.summary}</p>

        <ResumeSection title="Education">
          {resume.education.map((item) => (
            <ResumeItem
              key={`${item.institution}-${item.degree}`}
              title={item.degree}
              subtitle={[item.institution, item.result]
                .filter(Boolean)
                .join(" · ")}
              period={item.period}
            >
              <Bullets items={item.highlights} />
            </ResumeItem>
          ))}
        </ResumeSection>

        {resume.publications.length > 0 && (
          <ResumeSection title="Publications">
            <ul className="list-disc space-y-2 pl-5 text-[0.9375rem] leading-6 marker:text-muted-foreground">
              {resume.publications.map((publication) => (
                <li key={publication.title}>
                  <span className="font-semibold">{publication.title}.</span>{" "}
                  <span className="text-muted-foreground">
                    {publication.venue}
                    {publication.doi && (
                      <>
                        . DOI:{" "}
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {publication.doi}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </ResumeSection>
        )}

        {resume.experience.length > 0 && (
          <ResumeSection title="Experience">
            {resume.experience.map((item) => (
              <ResumeItem
                key={`${item.organization}-${item.role}`}
                title={item.role}
                subtitle={item.organization}
                period={item.period}
              >
                <p>{item.summary}</p>
                <Bullets items={item.highlights} />
              </ResumeItem>
            ))}
          </ResumeSection>
        )}

        {resume.projects.length > 0 && (
          <ResumeSection title="Projects">
            {resume.projects.map((project) => (
              <ResumeItem
                key={project.slug}
                title={project.title}
                subtitle={project.technologies.join(", ")}
                period={project.year}
              >
                {project.highlights.length > 0 ? (
                  <Bullets items={project.highlights} />
                ) : (
                  <p>{project.description}</p>
                )}
              </ResumeItem>
            ))}
          </ResumeSection>
        )}

        <ResumeSection title="Skills">
          <dl className="grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-[12rem_1fr]">
            {resume.skills.map((category) => (
              <div key={category.title} className="contents">
                <dt className="font-semibold">{category.title}</dt>
                <dd className="text-foreground/90">
                  {category.skills.map((skill) => skill.name).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        {resume.achievements.length > 0 && (
          <ResumeSection title="Achievements">
            {resume.achievements.map((achievement) => (
              <ResumeItem
                key={achievement.title}
                title={achievement.title}
                subtitle={[achievement.issuer, achievement.description]
                  .filter(Boolean)
                  .join(" · ")}
                period={achievement.year}
              />
            ))}
          </ResumeSection>
        )}
      </article>
    </div>
  );
}
