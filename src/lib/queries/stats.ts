import { cacheLife, cacheTag } from "next/cache";
import { stats as fallbackStats } from "@/data/site";
import type { Stat } from "@/types";
import { cacheTags } from "./cache-tags";
import { FETCH_TIMEOUT_MS, formatCompact } from "./format";

type YouTubeChannelResponse = {
  items?: { statistics?: { subscriberCount?: string; videoCount?: string } }[];
};

/**
 * Follower stats for the "Đang theo dõi" strip.
 *
 * Cached with "use cache" so the result is baked into the prerendered page and
 * refreshed in the background (stale-while-revalidate) — no request ever waits
 * on the YouTube API. Without YOUTUBE_API_KEY it returns the static numbers.
 */
export async function getStats(): Promise<Stat[]> {
  "use cache";
  cacheTag(cacheTags.stats);

  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!key || !channelId) {
    cacheLife("days");
    return fallbackStats;
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/channels");
    url.search = new URLSearchParams({ part: "statistics", id: channelId, key }).toString();
    const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);

    const stats = ((await res.json()) as YouTubeChannelResponse).items?.[0]?.statistics;
    const subscribers = Number(stats?.subscriberCount);
    const videos = Number(stats?.videoCount);
    if (!Number.isFinite(subscribers) || !Number.isFinite(videos)) throw new Error("No stats");

    cacheLife("hours");
    const [youtube, tiktok, videoStat] = fallbackStats;
    return [
      { ...youtube, value: formatCompact(subscribers) },
      tiktok,
      { ...videoStat, value: String(videos) },
    ];
  } catch (error) {
    console.warn("[getStats] falling back to static data:", error);
    // Retry soon instead of pinning the fallback for hours.
    cacheLife("minutes");
    return fallbackStats;
  }
}
