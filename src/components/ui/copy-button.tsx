"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Icons are passed in pre-rendered by a Server Component, keeping lucide out of the client bundle. */
export function CopyButton({
  text,
  icon,
  copiedIcon,
}: {
  text: string;
  icon: ReactNode;
  copiedIcon: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Đã copy" : "Copy lệnh"}
      className="inline-flex min-h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-transparent px-2.5 py-1.5 font-mono text-xs font-semibold text-code-muted transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    >
      {copied ? copiedIcon : icon}
      {copied ? "Đã copy" : "Copy"}
    </button>
  );
}
