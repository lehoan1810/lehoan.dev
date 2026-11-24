import { cacheLife, cacheTag } from "next/cache";
import { vscodeItems as fallbackItems, vscodeSection } from "@/data/vscode";
import type { VSCodeItem } from "@/types";
import { cacheTags } from "./cache-tags";
import { FETCH_TIMEOUT_MS, formatDateVi, formatInstalls } from "./format";

const MARKETPLACE_QUERY_URL =
  "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery";
/** ExtensionQueryFilterType.Name = 7, ExtensionQueryFlags.IncludeStatistics = 0x100 */
const FILTER_BY_NAME = 7;
const INCLUDE_STATISTICS = 0x100;

type MarketplaceResponse = {
  results?: {
    extensions?: {
      extensionName: string;
      publisher: { publisherName: string };
      statistics?: { statisticName: string; value: number }[];
    }[];
  }[];
};

export type VSCodeData = { items: VSCodeItem[]; footnote: string };

const extensionId = (href: string) => new URL(href).searchParams.get("itemName") ?? "";

/**
 * Install counts and ratings from the public VS Code Marketplace API.
 * Cached for a day (tag "vscode"); falls back to the static numbers on any error.
 */
export async function getVSCodeData(): Promise<VSCodeData> {
  "use cache";
  cacheTag(cacheTags.vscode);

  const fallback = { items: fallbackItems, footnote: vscodeSection.footnote };

  try {
    const res = await fetch(MARKETPLACE_QUERY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json;api-version=3.0-preview.1",
      },
      body: JSON.stringify({
        filters: [
          {
            criteria: fallbackItems.map((item) => ({
              filterType: FILTER_BY_NAME,
              value: extensionId(item.href),
            })),
            pageSize: fallbackItems.length,
          },
        ],
        flags: INCLUDE_STATISTICS,
      }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Marketplace API ${res.status}`);

    const extensions = ((await res.json()) as MarketplaceResponse).results?.[0]?.extensions ?? [];
    const byId = new Map(
      extensions.map((ext) => [
        `${ext.publisher.publisherName}.${ext.extensionName}`.toLowerCase(),
        ext.statistics ?? [],
      ]),
    );

    let matched = 0;
    const items = fallbackItems.map((item) => {
      const stats = byId.get(extensionId(item.href).toLowerCase());
      const installs = stats?.find((s) => s.statisticName === "install")?.value;
      const rating = stats?.find((s) => s.statisticName === "averagerating")?.value;
      if (installs === undefined) return item;
      matched++;
      return {
        ...item,
        installs: formatInstalls(installs),
        rating: rating ? rating.toFixed(1) : item.rating,
      };
    });
    if (matched === 0) throw new Error("No matching extensions");

    cacheLife("days");
    return {
      items,
      footnote: `Số liệu từ VS Code Marketplace, cập nhật ${formatDateVi(new Date())}`,
    };
  } catch (error) {
    console.warn("[getVSCodeData] falling back to static data:", error);
    cacheLife("minutes");
    return fallback;
  }
}
