import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

// Browser tab icon: your initials on the accent colour, matching the header logo.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#047857",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
