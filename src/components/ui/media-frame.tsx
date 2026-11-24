import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Media } from "@/types";
import { cn } from "@/lib/utils";

/** Double-ring frame around a media block (outer tinted frame + inner rounded surface). */
export function MediaFrame({
  children,
  aspectClassName,
  className,
}: {
  children: ReactNode;
  aspectClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl bg-frame p-1.5 ring-1 ring-border-card", className)}>
      <div
        className={cn(
          "group/media relative overflow-hidden rounded-xl bg-surface ring-1 ring-border",
          aspectClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Placeholder shown when a Media item has no `src` yet. */
export function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-hatch absolute inset-0 grid place-items-center p-4 text-center">
      <div className="flex flex-col items-center gap-2 text-faint">
        <ImageIcon aria-hidden className="size-6" />
        <span className="line-clamp-2 max-w-[28ch] font-mono text-[11px] leading-4">{label}</span>
      </div>
    </div>
  );
}

/** Fills its (relative) parent with either the image or a placeholder. */
export function MediaImage({
  media,
  sizes,
  zoomOnHover = true,
  className,
}: {
  media: Media;
  sizes: string;
  zoomOnHover?: boolean;
  className?: string;
}) {
  if (!media.src) return <MediaPlaceholder label={media.alt} />;

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      placeholder={typeof media.src === "object" ? "blur" : "empty"}
      style={{ objectPosition: media.position ?? "center" }}
      className={cn(
        "object-cover",
        zoomOnHover &&
          "transition-transform duration-500 ease-out motion-safe:group-hover/media:scale-[1.03]",
        className,
      )}
    />
  );
}
