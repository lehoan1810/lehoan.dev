import type { LinkItem, NavItem, Stat } from "@/types";

export const siteConfig = {
  name: "evon.dev",
  title: "evondev · Frontend Developer",
  description:
    "Trần Anh Tuấn (evondev) – Frontend Developer từ 2016. Viết blog, làm YouTube và làm công cụ giúp code cùng AI hiệu quả hơn.",
  shortDescription: "Frontend Developer từ 2016 · AI · Coding · English · YouTube",
  author: "Trần Anh Tuấn",
  alternateName: "evondev",
  jobTitle: "Frontend Developer",
  locale: "vi",
  ogLocale: "vi_VN",
  keywords: [
    "evondev",
    "Trần Anh Tuấn",
    "Frontend Developer",
    "học lập trình",
    "HTML CSS",
    "JavaScript",
    "React",
    "Next.js",
    "AI coding",
    "evondevKit",
    "VS Code theme",
  ],
  knowsAbout: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "UI/UX"],
};

export const socials = {
  youtube: "https://www.youtube.com/@evondevfrontend",
  youtubeVideos: "https://www.youtube.com/@evondevfrontend/videos",
  tiktok: "https://www.tiktok.com/@evon.dev",
  blog: "https://evondev.com",
} as const;

export const announcement = {
  label: "Mới",
  text: "evondevKit UI/UX đã ra mắt",
  href: "https://evondev-uiux.vercel.app/ui-ux",
};

export const mainNav: NavItem[] = [
  { label: "Hành trình", href: "#hanh-trinh" },
  { label: "Khóa học", href: "#khoa-hoc" },
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "VS Code", href: "#vscode" },
  { label: "Sở thích", href: "#so-thich" },
  { label: "Cảm nhận", href: "#cam-nhan" },
];

export const stats: Stat[] = [
  {
    value: "41.5K",
    label: "subscriber YouTube",
    handle: "@evondevfrontend",
    href: socials.youtube,
  },
  {
    value: "22.4K",
    label: "follower TikTok",
    handle: "@evon.dev",
    href: socials.tiktok,
  },
  {
    value: "516",
    label: "video đã đăng",
    handle: "youtube.com/@evondevfrontend",
    href: socials.youtubeVideos,
  },
];

export const footerColumns: { title: string; links: LinkItem[] }[] = [
  {
    title: "Sản phẩm",
    links: [
      { label: "evondevKit UI/UX", href: "https://evondev-uiux.vercel.app/ui-ux" },
      { label: "Teach Template", href: "https://speaknowenglish.org/teach-template" },
      { label: "SpeakNow", href: "https://speaknowenglish.org" },
      { label: "Personal Tracker", href: "https://speaknowenglish.org/personal-tracker" },
    ],
  },
  {
    title: "Kênh",
    links: [
      { label: "YouTube", href: socials.youtube },
      { label: "TikTok", href: socials.tiktok },
      { label: "Blog", href: socials.blog },
    ],
  },
];

export const tagline = "AI · Coding · English · YouTube";

export const scrollMarqueeRows = [
  "AI · Coding · English · YouTube ·",
  "Viết blog · Làm video · Cầu lông · Học mỗi ngày ·",
];
