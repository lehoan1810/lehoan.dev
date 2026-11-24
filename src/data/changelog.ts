import type { ChangelogEntry, SectionMeta } from "@/types";

export const changelogSection: SectionMeta = {
  id: "changelog",
  index: "02",
  eyebrow: "Changelog",
  title: "Mình nâng cấp bản thân như ship một sản phẩm",
  description:
    "Mỗi giai đoạn là một phiên bản, kèm các repo trên GitHub làm bằng chứng. Bản tiếp theo đang ở dạng beta.",
};

/** Newest first. Repo names link to github.com/<username>/<repo>. */
export const changelog: ChangelogEntry[] = [
  {
    version: "v4.0-beta",
    period: "Đang phát triển",
    title: "Fullstack",
    description:
      "Học backend một cách có hệ thống: tự viết API, thiết kế database, xác thực người dùng và deploy trọn một sản phẩm.",
    beta: true,
    checklist: [
      { label: "REST API với Node.js và Express", state: "done" },
      { label: "PostgreSQL và Prisma", state: "doing" },
      { label: "Auth, phân quyền, bảo mật API", state: "doing" },
      { label: "Docker và CI/CD", state: "next" },
      { label: "Ship một side project fullstack", state: "next" },
    ],
  },
  {
    version: "v3.0",
    // TODO: chỉnh lại mốc thời gian đi làm cho đúng.
    period: "2023 – nay",
    title: "Sản phẩm thật",
    description:
      "Làm frontend cho Preny.ai và Askany: codebase lớn, làm việc cùng team và người dùng thật. Song song là các bản demo để thử công nghệ mới.",
    repos: ["waterbus-landing", "strapi-recruitment"],
  },
  {
    version: "v2.0",
    period: "2022",
    title: "TypeScript, Sass và lần đầu chạm backend",
    description:
      "Chuyển sang TypeScript, viết CSS có hệ thống hơn với Sass và làm thử một trang thương mại điện tử MERN đầu tiên.",
    repos: ["learn-typecript", "Web_Ecommerce_MERN", "lofi-music", "Landing-Page-TRVL"],
  },
  {
    version: "v1.0",
    period: "2020 – 2021",
    title: "Hello world",
    description:
      "Bắt đầu từ HTML, CSS, JavaScript thuần rồi tới React và Redux, học bằng cách clone lại những ứng dụng mình hay dùng.",
    repos: ["Instagram-Reactjs", "Admin_Dashboard_Reactjs", "Learn-Redux", "App_Music_Javascript"],
  },
];
