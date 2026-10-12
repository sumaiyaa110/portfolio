import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { SocialLinks } from "@/components/shared/social-links";
import { TagList } from "@/components/shared/tag";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";

import { ProfilePhoto } from "./profile-photo";

export function Intro() {
  return (
    <section className="grid gap-10 pt-12 pb-8 sm:pt-20 md:grid-cols-[1fr_auto] md:items-center md:gap-14">
      <div className="max-w-2xl space-y-6">
        <p className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs">
          <MapPinIcon className="size-3.5 text-primary" />
          {profile.location}
        </p>

        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-balance sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="font-heading text-xl font-medium text-foreground/80 sm:text-2xl">
            {profile.role} at {profile.university}
          </p>
        </div>

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
          <Link
            href="/projects"
            className={buttonVariants({
              size: "lg",
              className: "h-11 px-5 text-base shadow-md shadow-primary/25",
            })}
          >
            View projects
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link
            href="/resume"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 px-5 text-base",
            })}
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className: "h-11 px-5 text-base",
            })}
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
