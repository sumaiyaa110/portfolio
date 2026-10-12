import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { SocialLinks } from "@/components/shared/social-links";
import { TagList } from "@/components/shared/tag";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";

import { ProfilePhoto } from "./profile-photo";

export function Intro() {
  return (
    <section className="grid gap-10 pt-14 pb-10 sm:pt-24 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
      <div className="max-w-2xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          {profile.role} · {profile.university}
        </p>
        <h1 className="text-5xl font-medium text-balance sm:text-6xl">
          Hi, I&apos;m {profile.name}.
        </h1>
        <div className="space-y-4 text-lg leading-8 text-muted-foreground text-pretty">
          {profile.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Academic focus
          </p>
          <TagList tags={profile.focus} />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/projects" className={buttonVariants({ size: "lg" })}>
            View projects
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link
            href="/resume"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            Get in touch
          </Link>
        </div>

        <SocialLinks />
      </div>

      <div className="order-first md:order-none">
        <ProfilePhoto />
      </div>
    </section>
  );
}
