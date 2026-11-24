/** Cache tags used with cacheTag() / revalidateTag(). One place so they never drift. */
export const cacheTags = {
  stats: "stats",
  vscode: "vscode",
} as const;

export type CacheTag = (typeof cacheTags)[keyof typeof cacheTags];

export const isCacheTag = (value: unknown): value is CacheTag =>
  typeof value === "string" && (Object.values(cacheTags) as string[]).includes(value);
