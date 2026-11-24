import type { CommandItem, NavItem, NowItem } from "@/types";

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
  knowsAbout: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
  ],
};

export const socials: { github: string; email?: string; linkedin?: string } = {
  github: `https://github.com/${githubUsername}`,
  // TODO: điền để hiện nút liên hệ tương ứng (để trống thì tự ẩn).
  email: "",
  linkedin: "",
};

export const hero = {
  greeting: "Xin chào, mình là Hoàn.",
  headline: { lead: "Frontend developer,", highlight: "đang build dần thành Fullstack" },
  description:
    "Mình làm giao diện web với React, Next.js và TypeScript, từng tham gia các sản phẩm như Preny.ai và Askany. Hiện tại mình học thêm backend để tự làm trọn một sản phẩm: từ giao diện tới API và database.",
};

/** The "Now" card. Update monthly — it is what makes the page feel alive. */
export const now: { updatedAt: string; status: string; items: NowItem[] } = {
  updatedAt: "11/2026",
  status: "Đang học Fullstack",
  items: [
    { label: "Đang build", value: "Portfolio này, bằng Next.js 16 và Cache Components" },
    { label: "Đang học", value: "Node.js · PostgreSQL · Prisma · Docker" },
    { label: "Mục tiêu", value: "Tự ship một sản phẩm fullstack từ A tới Z" },
  ],
};

/** Shown when the GitHub API is unavailable (values from the public profile). */
export const githubFallback = {
  bio: "AI writes the code, I take the blame 🤖",
  location: "0.0.0.0/0",
  publicRepos: 32,
  followers: 6,
  createdYear: 2020,
};

export const mainNav: NavItem[] = [
  { label: "Dự án", href: "#du-an" },
  { label: "Changelog", href: "#changelog" },
  { label: "GitHub", href: "#github" },
  { label: "Stack", href: "#stack" },
  { label: "Hỏi đáp", href: "#hoi-dap" },
];

export const commandItems: CommandItem[] = [
  ...mainNav.map((item) => ({
    id: `nav-${item.href}`,
    label: item.label,
    group: "Đi tới",
    action: { type: "link" as const, href: item.href },
  })),
  { id: "nav-contact", label: "Liên hệ", group: "Đi tới", action: { type: "link", href: "#lien-he" } },
  {
    id: "theme",
    label: "Đổi giao diện sáng / tối",
    group: "Thao tác",
    keywords: "theme dark light toi sang",
    action: { type: "theme" },
  },
  {
    id: "github",
    label: "Mở GitHub",
    group: "Liên kết",
    keywords: githubUsername,
    action: { type: "link", href: socials.github },
  },
  {
    id: "copy-github",
    label: "Copy link GitHub",
    group: "Thao tác",
    action: { type: "copy", text: socials.github },
  },
  ...(socials.email
    ? [
        {
          id: "copy-email",
          label: "Copy email",
          group: "Thao tác",
          keywords: "mail lien he",
          action: { type: "copy" as const, text: socials.email },
        },
      ]
    : []),
];
