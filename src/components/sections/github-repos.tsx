import { BookMarked, Star } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { githubSection } from "@/data/github";
import { getGitHubData, type RepoCard } from "@/lib/queries";

function Repo({ repo }: { repo: RepoCard }) {
  return (
    <BentoCard className="reveal flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-2 text-sm">
        <BookMarked aria-hidden className="size-4 shrink-0 text-faint" />
        <h3 className="truncate font-mono font-semibold text-foreground">
          {/* Whole card is clickable via the stretched ::after. */}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0 after:rounded-3xl hover:text-brand-ink focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand/50"
          >
            {repo.name}
          </a>
        </h3>
      </div>
      <p className="line-clamp-2 flex-1 text-sm leading-6 text-muted">
        {repo.description ?? "Chưa có mô tả."}
      </p>
      <div className="flex items-center gap-4 font-mono text-[11px] text-muted">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
            />
            {repo.language}
          </span>
        ) : null}
        <span className="flex items-center gap-1" aria-label={`${repo.stars} sao`}>
          <Star aria-hidden className="size-3" />
          {repo.stars}
        </span>
        <span className="ml-auto">{repo.updated}</span>
      </div>
    </BentoCard>
  );
}

export async function GitHubRepos() {
  const { profile, repos, live, updatedLabel } = await getGitHubData();

  return (
    <Section id={githubSection.id} labelled>
      <SectionHeader
        {...githubSection}
        aside={
          <TextLink href={`${profile.url}?tab=repositories`} className="shrink-0">
            Xem tất cả {profile.publicRepos} repo
          </TextLink>
        }
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <li key={repo.name}>
            <Repo repo={repo} />
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-[11px] text-faint">
        {live
          ? `Dữ liệu từ GitHub API · cập nhật ${updatedLabel}`
          : "GitHub API tạm thời không phản hồi, đang hiển thị dữ liệu lưu sẵn."}
      </p>
    </Section>
  );
}
