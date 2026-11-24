import { CirclePlay, CodeXml, Languages, PenLine } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { Hobby } from "@/types";

type IconProps = { className?: string; "aria-hidden"?: boolean };

/** Shuttlecock — not available in lucide, drawn in the same stroke style. */
export function BadmintonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.5 17h7" />
      <path d="M8.5 17a3.5 3.5 0 0 0 7 0" />
      <path d="M8.5 17 5 3h14l-3.5 14" />
      <path d="M12 17V3" />
      <path d="M6.8 10h10.4" />
    </svg>
  );
}

export const hobbyIcons: Record<Hobby["icon"], ComponentType<IconProps>> = {
  play: CirclePlay,
  pen: PenLine,
  languages: Languages,
  badminton: BadmintonIcon,
  code: CodeXml,
};

/** Single-path brand icon (Simple Icons format). */
export function BrandIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
