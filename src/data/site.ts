import type { NavItem } from "@/types";

export const githubUsername = "lehoan1810";

export const siteConfig = {
  name: "lehoan.dev",
  title: "Lê Hoàn · Frontend Developer",
  description:
    "Lê Hoàn – Frontend Developer làm việc với React, Next.js và TypeScript, đang học backend để trở thành Fullstack. Từng tham gia các sản phẩm Preny.ai và Askany.",
  shortDescription: "Frontend Developer · React · Next.js · đang trên đường thành Fullstack",
  author: "Lê Hoàn",
  alternateName: githubUsername,
  jobTitle: "Frontend Developer",
  locale: "vi",
  ogLocale: "vi_VN",
  keywords: [
    "Lê Hoàn",
    "lehoan1810",
    "Frontend Developer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Preny.ai",
    "Askany",
    "portfolio",
  ],
  knowsAbout: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
};

export const socials = {
  github: `https://github.com/${githubUsername}`,
  // TODO: điền để hiện nút liên hệ tương ứng ở phần cuối trang (để trống thì tự ẩn).
  email: "",
  linkedin: "",
};

export const announcement = {
  label: "Now",
  text: "Đang học Fullstack",
  href: "#changelog",
};

export const mainNav: NavItem[] = [
  { label: "Changelog", href: "#changelog" },
  { label: "Dự án", href: "#du-an" },
  { label: "Sở thích", href: "#so-thich" },
];

export const tagline = "Frontend → Fullstack";

export const scrollMarqueeRows = [
  "AI · Coding · English · YouTube ·",
  "Viết blog · Làm video · Cầu lông · Học mỗi ngày ·",
];
