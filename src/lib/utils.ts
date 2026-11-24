import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "lehoan.dev" → ["lehoan", ".dev"], for logos that dim the TLD. */
export function splitDomain(domain: string): [string, string] {
  const dot = domain.lastIndexOf(".");
  return dot > 0 ? [domain.slice(0, dot), domain.slice(dot)] : [domain, ""];
}
