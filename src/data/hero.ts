import type { StaticImageData } from "next/image";

export type CodeTone = "accent" | "key" | "punctuation" | "string" | "number";
export type CodeToken = { text: string; tone: CodeTone };
export type CodeLine = { indent: number; tokens: CodeToken[] };

export const heroGreeting = "Xin chào, mình là Hoàn.";

export const heroHeading = {
  lead: "Frontend developer,",
  highlight: "đang build dần thành Fullstack",
};

export const heroDescription =
  "Mình làm giao diện web với React, Next.js và TypeScript, từng tham gia các sản phẩm như Preny.ai và Askany. Hiện tại mình học thêm backend để tự làm trọn một sản phẩm: từ giao diện tới API và database.";

export const heroPhoto = {
  // Preferred: `import photo from "@/assets/images/hero.jpg"` then `src: photo`
  // (hashed immutable URL + automatic blur placeholder). A "/public" path also works.
  src: undefined as StaticImageData | string | undefined,
  alt: "Ảnh chân dung",
  position: "50% 38%",
};

const p = (text: string): CodeToken => ({ text, tone: "punctuation" });
const k = (text: string): CodeToken => ({ text, tone: "key" });
const s = (text: string): CodeToken => ({ text: `"${text}"`, tone: "string" });
const n = (text: string): CodeToken => ({ text, tone: "number" });

const list = (items: string[]) =>
  items.flatMap((item, i) => (i === 0 ? [s(item)] : [p(", "), s(item)]));

export const heroCode = {
  filename: "lehoan.ts",
  lines: [
    { indent: 0, tokens: [{ text: "const ", tone: "accent" }, k("lehoan"), p(" = {")] },
    { indent: 1, tokens: [k("name"), p(": "), s("Lê Hoàn"), p(",")] },
    { indent: 1, tokens: [k("github"), p(": "), s("lehoan1810"), p(",")] },
    { indent: 1, tokens: [k("role"), p(": "), s("Frontend Developer"), p(",")] },
    { indent: 1, tokens: [k("since"), p(": "), n("2020"), p(",")] },
    {
      indent: 1,
      tokens: [k("stack"), p(": ["), ...list(["React", "Next.js", "TypeScript"]), p("],")],
    },
    { indent: 1, tokens: [k("products"), p(": ["), ...list(["Preny.ai", "Askany"]), p("],")] },
    {
      indent: 1,
      tokens: [
        k("learning"),
        p(": ["),
        ...list(["Node.js", "PostgreSQL", "Prisma", "Docker"]),
        p("],"),
      ],
    },
    { indent: 1, tokens: [k("next"), p(": "), s("Fullstack"), p(",")] },
    { indent: 0, tokens: [p("};")] },
  ] satisfies CodeLine[],
};
