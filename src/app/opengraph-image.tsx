import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

// The preview image shown when the site is shared on social media or in chat.
export const alt = `${profile.name}: ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fbf9f5",
          color: "#2b2622",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#1f6b6f",
          }}
        >
          {profile.role} · {profile.university}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 600 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.4,
              color: "#6b635c",
              maxWidth: 960,
            }}
          >
            {profile.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            borderTop: "3px dashed #cfc8bd",
          }}
        />
      </div>
    ),
    size,
  );
}
