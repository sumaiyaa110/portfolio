import { ImageResponse } from "next/og";

/** Size of every social preview image. */
export const ogImageSize = { width: 1200, height: 630 };

interface SocialImageInput {
  /** Small accent line at the top. */
  eyebrow: string;
  title: string;
  description: string;
}

/**
 * The preview image shown when a page is shared on social media or in chat.
 * Used by the site-wide image and by each project page.
 */
export function socialImage({ eyebrow, title, description }: SocialImageInput) {
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
          background: "#0b0f17",
          color: "#f1f5f4",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#34d399",
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 28 ? 72 : 96,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.4,
              color: "#a3adb8",
              maxWidth: 960,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            borderTop: "6px solid #34d399",
          }}
        />
      </div>
    ),
    ogImageSize,
  );
}
