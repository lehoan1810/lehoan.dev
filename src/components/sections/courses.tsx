import { CirclePlay, Sparkles, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { MediaFrame, MediaImage } from "@/components/ui/media-frame";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { archivedCoursesNote, courses, coursesSection, upcomingCourse } from "@/data/courses";
import { socials } from "@/data/site";
import type { Course } from "@/types";

function CourseCard({ course }: { course: Course }) {
  return (
    <Spotlight className="bg-background">
      <article className="flex h-full flex-col p-5 sm:p-6">
        <MediaFrame aspectClassName="aspect-video">
          <MediaImage
            media={course.image}
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 300px"
          />
        </MediaFrame>
        <h3 className="mt-5 min-h-[2lh] text-lg leading-snug font-semibold tracking-tight text-foreground">
          {course.title}
        </h3>
        <p className="mt-2 min-h-[3lh] text-sm leading-6 text-muted">{course.description}</p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 font-mono text-xs text-muted">
          <li className="inline-flex items-center gap-1.5">
            <Users aria-hidden className="size-3.5" />
            {course.students} học viên
          </li>
          <li className="inline-flex items-center gap-1.5">
            <CirclePlay aria-hidden className="size-3.5" />
            {course.lessons} bài học
          </li>
        </ul>
      </article>
    </Spotlight>
  );
}

export function Courses() {
  return (
    <Section id={coursesSection.id} labelled>
      <SectionHeader {...coursesSection} />

      {/* Upcoming course banner */}
      <div className="line-t grid grid-cols-1 items-center gap-6 bg-surface px-5 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div className="min-w-0">
          <Eyebrow className="inline-flex items-center gap-2">
            <Sparkles aria-hidden className="size-3.5" />
            {upcomingCourse.eyebrow}
          </Eyebrow>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            {upcomingCourse.title}
          </h3>
          <p className="mt-2 max-w-[68ch] text-base leading-7 text-muted">
            {upcomingCourse.description}
          </p>
        </div>
        <ButtonLink href={socials.youtube} className="self-start lg:self-center">
          {upcomingCourse.cta}
        </ButtonLink>
      </div>

      <div>
        <div className="line-t px-5 py-5 sm:px-10">
          <p className="font-mono text-xs font-semibold tracking-widest text-muted uppercase">
            {archivedCoursesNote.title}
          </p>
          <p className="mt-1.5 max-w-[70ch] text-sm leading-6 text-muted">
            {archivedCoursesNote.description}
          </p>
        </div>
        <div className="line-t grid grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </div>
    </Section>
  );
}
