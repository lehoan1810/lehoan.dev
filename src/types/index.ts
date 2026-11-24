import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type TechItem = {
  name: string;
  path: string;
};

export type Media = {
  /**
   * Preferred: a static import (`import photo from "@/assets/images/x.jpg"`) —
   * gets a content-hashed immutable URL, intrinsic size and an automatic blur placeholder.
   * A "/public" path string also works. Leave empty for a placeholder.
   */
  src?: StaticImageData | string;
  alt: string;
  position?: string;
};

export type ChecklistState = "done" | "doing" | "next";

export type JourneyItem = {
  /** Big label in the left column, e.g. a version number. */
  year: string;
  /** Small line under `year`, e.g. the time span. */
  period?: string;
  title: string;
  description: string;
  links?: LinkItem[];
  /** Progress list, shown for the in-progress milestone. */
  checklist?: { label: string; state: ChecklistState }[];
  /** Optional screenshots; the media column hides when empty. */
  media?: Media[];
  /** Highlights the milestone as the current one (brand dot + ping). */
  current?: boolean;
};

export type ProductStatus = "new" | "free" | "live" | "soon" | "oss";

export type Product = {
  id: string;
  name: string;
  kind: string;
  tagline: string;
  description: string;
  points: string[];
  status: ProductStatus;
  image: Media;
  commandLabel?: string;
  command?: string;
  cta: LinkItem;
};

export type Hobby = {
  icon: "play" | "pen" | "languages" | "badminton" | "code";
  title: string;
  description: string;
  link?: LinkItem;
};

export type FaqItem = {
  question: string;
  answer: string;
};
