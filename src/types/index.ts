import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
  handle: string;
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

export type JourneyItem = {
  year: string;
  title: string;
  description: string;
  links?: LinkItem[];
  media: Media[];
  /** Highlights the milestone as the current one (brand dot + ping). */
  current?: boolean;
};

export type Course = {
  title: string;
  description: string;
  students: string;
  lessons: number;
  image: Media;
};

export type ProductStatus = "new" | "free" | "live" | "soon";

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

export type VSCodeItem = {
  type: "Theme" | "Extension";
  name: string;
  description: string;
  installs: string;
  rating: string;
  href: string;
  image: Media;
};

export type Hobby = {
  icon: "play" | "pen" | "languages" | "badminton" | "code";
  title: string;
  description: string;
  link?: LinkItem;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
