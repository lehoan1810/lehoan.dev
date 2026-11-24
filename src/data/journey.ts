import type { JourneyItem, LinkItem } from "@/types";
import { githubUsername, socials } from "./site";

export const journeySection = {
  id: "changelog",
  eyebrow: "Changelog",
  title: "Mình nâng cấp bản thân như ship một sản phẩm",
  description:
    "Mỗi giai đoạn là một phiên bản, kèm các repo trên GitHub làm bằng chứng. Bản tiếp theo đang ở dạng beta.",
};

const repos = (...names: string[]): LinkItem[] =>
  names.map((name) => ({ label: name, href: `https://github.com/${githubUsername}/${name}` }));

/** Newest first. */
export const journey: JourneyItem[] = [
  {
    year: "v4.0-beta",
    period: "Đang phát triển",
    title: "Fullstack",
    description:
      "Học backend một cách có hệ thống: tự viết API, thiết kế database, xác thực người dùng và deploy trọn một sản phẩm.",
    checklist: [
      { label: "REST API với Node.js và Express", state: "done" },
      { label: "PostgreSQL và Prisma", state: "doing" },
      { label: "Auth, phân quyền, bảo mật API", state: "doing" },
      { label: "Docker và CI/CD", state: "next" },
      { label: "Ship một side project fullstack", state: "next" },
    ],
    current: true,
  },
  {
    year: "v3.0",
    // TODO: chỉnh lại mốc thời gian đi làm cho đúng.
    period: "2023 – nay",
    title: "Sản phẩm thật",
    description:
      "Làm frontend cho Preny.ai và Askany: codebase lớn, làm việc cùng team và người dùng thật. Song song là các bản demo để thử công nghệ mới.",
    links: repos("waterbus-landing", "strapi-recruitment"),
  },
  {
    year: "v2.0",
    period: "2022",
    title: "TypeScript, Sass và lần đầu chạm backend",
    description:
      "Chuyển sang TypeScript, viết CSS có hệ thống hơn với Sass và làm thử một trang thương mại điện tử MERN đầu tiên.",
    links: repos("learn-typecript", "Web_Ecommerce_MERN", "lofi-music", "Landing-Page-TRVL"),
  },
  {
    year: "v1.0",
    period: "2020 – 2021",
    title: "Hello world",
    description:
      "Bắt đầu từ HTML, CSS, JavaScript thuần rồi tới React và Redux, học bằng cách clone lại những ứng dụng mình hay dùng.",
    links: repos("Instagram-Reactjs", "Admin_Dashboard_Reactjs", "Learn-Redux", "App_Music_Javascript"),
  },
];

export const journeyOutro = {
  title: "Còn tiếp...",
  description:
    "Bản tiếp theo đang được build. Các repo mới sẽ lên GitHub trước khi được ghi lại ở đây.",
  cta: { label: "Xem GitHub", href: socials.github },
};
