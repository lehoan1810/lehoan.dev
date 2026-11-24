import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

/**
 * Generated at build time (static metadata route) and served as /opengraph-image.png
 * with an immutable, content-hashed URL. Twitter falls back to og:image automatically.
 */
export const alt = `${siteConfig.author} (${siteConfig.alternateName}) · ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs ttf/otf/woff (not woff2); the default font has no Vietnamese glyphs.
const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "BeVietnamPro-Regular.ttf")),
  readFile(join(fontDir, "BeVietnamPro-SemiBold.ttf")),
]);

export default async function OpengraphImage() {
  const [regular, semibold] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#030712",
          color: "#f9fafb",
          fontFamily: "Be Vietnam Pro",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(250,93,25,0.35), transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          evon<span style={{ color: "#9ca3af" }}>.dev</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2.5 }}>
            Xin chào, mình là Tuấn
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2.5, color: "#fa5d19" }}>
            evondev · Frontend Developer
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#d1d5db", maxWidth: 900 }}>
            {siteConfig.shortDescription}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Be Vietnam Pro", data: regular, weight: 400, style: "normal" },
        { name: "Be Vietnam Pro", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
