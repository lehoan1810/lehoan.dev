import type { SectionMeta } from "@/types";

export const stackSection: SectionMeta = {
  id: "stack",
  index: "04",
  eyebrow: "Stack",
  title: "Công cụ mỗi ngày và những thứ đang học",
  description: "Những gì mình dùng thành thạo, cùng phần đang luyện thêm cho chặng fullstack.",
};

/** Names match `techStack` in ./tech-stack.ts (icons); unknown names render as text chips. */
export const stack = {
  daily: [
    "HTML",
    "CSS",
    "Sass",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Vite",
    "Git",
    "Figma",
    "Vercel",
  ],
  learning: ["Node.js", "PostgreSQL", "Prisma", "MongoDB", "Docker"],
  ai: {
    tool: "Claude",
    note: "Mình dùng AI để đi nhanh hơn ở phần lặp lại. Kiến trúc, review và chất lượng cuối cùng vẫn là việc của mình.",
  },
};
