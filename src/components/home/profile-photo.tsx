import Image from "next/image";

import { profile } from "@/data/profile";

const SIZE = 176;

/** Your photo, or your initials until `profile.photo` is set. */
export function ProfilePhoto() {
  if (profile.photo) {
    return (
      <Image
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width={SIZE}
        height={SIZE}
        priority
        className="size-32 rounded-full border object-cover sm:size-44"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={profile.name}
      className="flex size-32 items-center justify-center rounded-full border border-dashed border-rule bg-muted font-serif text-4xl text-muted-foreground sm:size-44 sm:text-5xl"
    >
      {profile.initials}
    </div>
  );
}
