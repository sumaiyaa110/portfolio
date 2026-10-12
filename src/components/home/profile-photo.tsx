import Image from "next/image";

import { profile } from "@/data/profile";

const SIZE = 288;

/** Your photo, or your initials until `profile.photo` is set. */
export function ProfilePhoto() {
  return (
    <div className="relative w-fit">
      {/* Soft accent glow behind the frame. */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-primary/40 to-(--primary-2)/30 blur-2xl"
      />
      <div className="relative rounded-3xl bg-linear-to-br from-primary to-(--primary-2) p-[3px] shadow-lg">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={SIZE}
            height={SIZE}
            priority
            className="size-40 rounded-[calc(1.5rem-3px)] object-cover sm:size-56 lg:size-72"
          />
        ) : (
          <div
            role="img"
            aria-label={profile.name}
            className="flex size-40 items-center justify-center rounded-[calc(1.5rem-3px)] bg-card font-heading text-5xl font-bold sm:size-56 sm:text-7xl lg:size-72"
          >
            <span className="text-gradient">{profile.initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}
