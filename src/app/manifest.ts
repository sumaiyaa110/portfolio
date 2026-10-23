import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.role}`,
    short_name: profile.name,
    description: profile.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#f8fafa",
    theme_color: "#047857",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
