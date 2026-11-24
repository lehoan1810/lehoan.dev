import type { StaticImageData } from "next/image";

export type CodeTone = "accent" | "key" | "punctuation" | "string" | "number";
export type CodeToken = { text: string; tone: CodeTone };
export type CodeLine = { indent: number; tokens: CodeToken[] };

export const heroHeading = {
  lead: "Xin chào, mình là Tuấn,",
  highlight: "mọi người hay gọi mình là evondev.",
};

export const heroDescription =
  "Mình làm Frontend từ năm 2016, bắt đầu từ cắt HTML CSS rồi tới JavaScript, React và Next.js. Ngoài giờ code thì mình thích viết blog, làm video YouTube và đang tập nói tiếng Anh mỗi ngày. Mấy năm trước mình làm khá nhiều khóa học lập trình, còn bây giờ thì mình dành thời gian để làm các công cụ giúp code cùng AI cho hiệu quả hơn.";

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
  filename: "evondev.ts",
  lines: [
    { indent: 0, tokens: [{ text: "const ", tone: "accent" }, k("evondev"), p(" = {")] },
    { indent: 1, tokens: [k("name"), p(": "), s("Trần Anh Tuấn"), p(",")] },
    { indent: 1, tokens: [k("nickname"), p(": "), s("evondev"), p(",")] },
    { indent: 1, tokens: [k("role"), p(": "), s("Frontend Developer"), p(",")] },
    { indent: 1, tokens: [k("since"), p(": "), n("2016"), p(",")] },
    {
      indent: 1,
      tokens: [k("stack"), p(": ["), ...list(["React", "Next.js", "TypeScript"]), p("],")],
    },
    {
      indent: 1,
      tokens: [
        k("loves"),
        p(": ["),
        ...list(["YouTube", "Blog", "English", "Badminton", "Family"]),
        p("],"),
      ],
    },
    { indent: 1, tokens: [k("family"), p(": "), s("Wife and son"), p(",")] },
    { indent: 1, tokens: [k("building"), p(": "), s("evondevKit UI/UX"), p(",")] },
    { indent: 0, tokens: [p("};")] },
  ] satisfies CodeLine[],
};
