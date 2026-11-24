import { cacheLife, cacheTag } from "next/cache";
import { featuredRepos, languageColors } from "@/data/github";
import { githubFallback, githubUsername } from "@/data/site";
import { cacheTags } from "./cache-tags";
import { FETCH_TIMEOUT_MS, formatDateVi } from "./format";

export type RepoCard = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string;
  stars: number;
  updated: string;
};

export type LanguageShare = { name: string; percent: number; color: string };

/** 0 = no contributions … 4 = most active quartile. Columns are weeks, rows are weekdays. */
export type ContributionCalendar = { total: number; weeks: number[][] };

export type GitHubData = {
  profile: {
    url: string;
    bio: string;
    location: string;
    publicRepos: number;
    followers: number;
    createdYear: number;
  };
  repos: RepoCard[];
  languages: LanguageShare[];
  contributions: ContributionCalendar | null;
  /** True when values come from the API, false when using the static fallback. */
  live: boolean;
  updatedLabel: string;
};

type ApiUser = {
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const API = "https://api.github.com";
const profileUrl = `https://github.com/${githubUsername}`;
const OTHER_COLOR = "#9ca3af";
const REPO_LIMIT = 6;

const colorOf = (language: string | null) =>
  (language && languageColors[language]) || OTHER_COLOR;

const toCard = (repo: ApiRepo): RepoCard => ({
  name: repo.name,
  description: repo.description,
  url: repo.html_url,
  language: repo.language,
  languageColor: colorOf(repo.language),
  stars: repo.stargazers_count,
  updated: formatDateVi(new Date(repo.pushed_at)),
});

/** Featured repos first (in the configured order), topped up with the most recently pushed ones. */
function pickRepos(repos: ApiRepo[]): RepoCard[] {
  const own = repos.filter(
    (r) => !r.fork && !r.archived && r.name.toLowerCase() !== githubUsername.toLowerCase(),
  );
  const byName = new Map(own.map((r) => [r.name.toLowerCase(), r]));
  const featured = featuredRepos
    .map((name) => byName.get(name.toLowerCase()))
    .filter((r): r is ApiRepo => Boolean(r));
  const rest = own
    .filter((r) => !featured.includes(r))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
  return [...featured, ...rest].slice(0, REPO_LIMIT).map(toCard);
}

/** Share of repos per primary language: top 5 + "Khác". */
function languageShares(counts: Record<string, number>): LanguageShare[] {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, n]) => sum + n, 0);
  if (!total) return [];

  const top = entries.slice(0, 5);
  const other = entries.slice(5).reduce((sum, [, n]) => sum + n, 0);
  const shares = top.map(([name, n]) => ({ name, percent: (n / total) * 100, color: colorOf(name) }));
  if (other) shares.push({ name: "Khác", percent: (other / total) * 100, color: OTHER_COLOR });
  return shares;
}

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Contribution calendar needs the GraphQL API, which requires a token (any read-only PAT). */
async function fetchContributions(token: string): Promise<ContributionCalendar | null> {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionLevel}}}}}}`;
  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "portfolio" },
    body: JSON.stringify({ query, variables: { login: githubUsername } }),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

  type Calendar = {
    totalContributions: number;
    weeks: { contributionDays: { contributionLevel: string }[] }[];
  };
  const json = (await res.json()) as {
    data?: { user?: { contributionsCollection?: { contributionCalendar?: Calendar } } };
  };
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((w) => w.contributionDays.map((d) => LEVELS[d.contributionLevel] ?? 0)),
  };
}

const fallbackRepos: ApiRepo[] = [
  {
    name: "waterbus-landing",
    description:
      "A demo landing page showcasing Waterbus, an open-source WebRTC stack for scalable real-time communication.",
    language: "TypeScript",
    stargazers_count: 0,
    pushed_at: "2025-10-19T17:03:01Z",
  },
  {
    name: "shopping-cart-demo",
    description:
      "An interactive Nike shopping cart demo featuring product selection, quantity management, item removal, and real-time total price calculation",
    language: "CSS",
    stargazers_count: 1,
    pushed_at: "2022-01-11T12:28:46Z",
  },
  { name: "Web_Ecommerce_MERN", description: null, language: "JavaScript", stargazers_count: 1, pushed_at: "2022-06-29T17:17:37Z" },
  { name: "strapi-recruitment", description: null, language: "JavaScript", stargazers_count: 0, pushed_at: "2023-12-12T02:21:58Z" },
  { name: "lofi-music", description: null, language: "JavaScript", stargazers_count: 1, pushed_at: "2022-06-01T08:25:30Z" },
  { name: "Instagram-Reactjs", description: null, language: "JavaScript", stargazers_count: 1, pushed_at: "2021-10-15T04:59:18Z" },
].map((r) => ({ ...r, html_url: `${profileUrl}/${r.name}`, fork: false, archived: false }));

const fallbackLanguageCounts = { JavaScript: 14, CSS: 4, TypeScript: 2, SCSS: 2, HTML: 2, Java: 2, "C#": 1, Handlebars: 1 };

function fallbackData(): GitHubData {
  return {
    profile: { url: profileUrl, ...githubFallback },
    repos: pickRepos(fallbackRepos),
    languages: languageShares(fallbackLanguageCounts),
    contributions: null,
    live: false,
    updatedLabel: formatDateVi(new Date()),
  };
}

/**
 * Profile, featured repos, language mix and (with GITHUB_TOKEN) the contribution calendar.
 *
 * One cached unit: baked into the prerendered page and refreshed in the background every
 * hour, so visitors never wait on GitHub and the unauthenticated rate limit (60 req/h) is
 * never an issue. `POST /api/revalidate?tag=github` refreshes it on demand.
 */
export async function getGitHubData(): Promise<GitHubData> {
  "use cache";
  cacheTag(cacheTags.github);

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const get = async <T,>(path: string): Promise<T> => {
    const res = await fetch(`${API}${path}`, { headers, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) throw new Error(`GitHub ${path} ${res.status}`);
    return res.json() as Promise<T>;
  };

  try {
    const [user, repos, contributions] = await Promise.all([
      get<ApiUser>(`/users/${githubUsername}`),
      get<ApiRepo[]>(`/users/${githubUsername}/repos?per_page=100&sort=pushed`),
      // The calendar is a nice-to-have: never let it fail the whole section.
      token ? fetchContributions(token).catch(() => null) : Promise.resolve(null),
    ]);

    const counts: Record<string, number> = {};
    for (const repo of repos) {
      if (!repo.fork && repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }

    cacheLife("hours");
    return {
      profile: {
        url: user.html_url,
        bio: user.bio?.trim() || githubFallback.bio,
        location: user.location?.trim() || githubFallback.location,
        publicRepos: user.public_repos,
        followers: user.followers,
        createdYear: new Date(user.created_at).getFullYear(),
      },
      repos: pickRepos(repos),
      languages: languageShares(counts),
      contributions,
      live: true,
      updatedLabel: formatDateVi(new Date()),
    };
  } catch (error) {
    console.warn("[getGitHubData] falling back to static data:", error);
    // Retry soon instead of pinning the fallback for hours.
    cacheLife("minutes");
    return fallbackData();
  }
}
