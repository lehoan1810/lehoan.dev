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
   * Preferred: a static import (`import shot from "@/assets/images/x.png"`) —
   * gets a content-hashed immutable URL, intrinsic size and an automatic blur placeholder.
   * A "/public" path string also works. Leave empty for a placeholder.
   */
  src?: StaticImageData | string;
  alt: string;
  position?: string;
};

export type SectionMeta = {
  id: string;
  /** Editorial number shown next to the heading ("01"). */
  index: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type NowItem = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  name: string;
  url: string;
  kind: string;
  tagline: string;
  description: string;
  /** What the product does (public information). */
  features: string[];
  /** What *you* built on it. Hidden when empty. */
  contributions?: string[];
  role?: string;
  period?: string;
  stack?: string[];
  image: Media;
};

export type ChecklistState = "done" | "doing" | "next";

export type ChangelogEntry = {
  version: string;
  period: string;
  title: string;
  description: string;
  /** The in-progress release: highlighted, with a progress checklist. */
  beta?: boolean;
  checklist?: { label: string; state: ChecklistState }[];
  /** GitHub repo names (under the profile) that shipped in this "version". */
  repos?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CommandAction =
  | { type: "link"; href: string }
  | { type: "theme" }
  | { type: "copy"; text: string };

export type CommandItem = {
  id: string;
  label: string;
  group: string;
  /** Extra search terms (unaccented match is applied automatically). */
  keywords?: string;
  action: CommandAction;
};
