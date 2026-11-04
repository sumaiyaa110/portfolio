import Image from "next/image";

import { profile } from "@/data/profile";

// The photo is shown whole, in a 3:4 portrait frame. Change these if you use
// a photo with a different shape.
const WIDTH = 288;
const HEIGHT = 384;

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
            width={WIDTH}
            height={HEIGHT}
            priority
            // Served as the original file, so it never depends on Vercel's
            // image optimisation being available.
            unoptimized
            className="aspect-[3/4] w-40 rounded-[calc(1.5rem-3px)] object-cover sm:w-56 lg:w-72"
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
