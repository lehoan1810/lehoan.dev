import type { SectionMeta } from "@/types";

export const githubSection: SectionMeta = {
  id: "github",
  index: "03",
  eyebrow: "GitHub",
  title: "Từ GitHub, cập nhật tự động",
  description:
    "Các repo tiêu biểu, lấy trực tiếp từ GitHub API và được cache để trang luôn tải tức thì.",
};

/** Shown in this order. Missing/renamed repos are skipped; the list is topped up with recent ones. */
export const featuredRepos = [
  "waterbus-landing",
  "shopping-cart-demo",
  "Web_Ecommerce_MERN",
  "strapi-recruitment",
  "lofi-music",
  "Instagram-Reactjs",
];

/** GitHub linguist colors for the language bar / repo cards. */
export const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  CSS: "#663399",
  SCSS: "#c6538c",
  HTML: "#e34c26",
  Java: "#b07219",
  "C#": "#178600",
  Handlebars: "#f7931e",
};
