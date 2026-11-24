import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { cacheTags, isCacheTag } from "@/lib/queries";

/**
 * On-demand cache invalidation (e.g. from a cron job or webhook):
 *
 *   curl -X POST "$SITE/api/revalidate?tag=stats" -H "Authorization: Bearer $REVALIDATE_SECRET"
 *
 * Uses the "max" profile: visitors keep getting the cached page while it
 * regenerates in the background (stale-while-revalidate).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag");
  if (!isCacheTag(tag)) {
    return Response.json(
      { revalidated: false, message: `Unknown tag. Use one of: ${Object.values(cacheTags).join(", ")}` },
      { status: 400 },
    );
  }

  revalidateTag(tag, "max");
  return Response.json({ revalidated: true, tag });
}
