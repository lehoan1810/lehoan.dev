import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS, rendered once at build time. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fa5d19",
          color: "#fff",
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: -6,
          paddingBottom: 12,
        }}
      >
        h
      </div>
    ),
    size,
  );
}
