import { Changelog } from "@/components/sections/changelog";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { GitHubRepos } from "@/components/sections/github-repos";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { homeJsonLd, JsonLd } from "@/lib/seo/json-ld";

/**
 * Fully prerendered. The GitHub data is a `"use cache"` unit baked into the static
 * shell and revalidated in the background (hourly, or on demand via the `github` tag).
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Projects />
      <Changelog />
      <GitHubRepos />
      <Stack />
      <Faq />
      <Contact />
    </>
  );
}
