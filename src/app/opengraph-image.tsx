import { profile } from "@/data/profile";
import { ogImageSize, socialImage } from "@/lib/og-image";

// The preview image shown when the site is shared on social media or in chat.
export const alt = `${profile.name}: ${profile.role}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return socialImage({
    eyebrow: `${profile.role} · ${profile.university}`,
    title: profile.name,
    description: profile.tagline,
  });
}
