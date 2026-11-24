import { Courses } from "@/components/sections/courses";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Hobbies } from "@/components/sections/hobbies";
import { Journey } from "@/components/sections/journey";
import { Products } from "@/components/sections/products";
import { ScrollMarquee } from "@/components/sections/scroll-marquee-section";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { VSCode } from "@/components/sections/vscode";
import { scrollMarqueeRows } from "@/data/site";
import { homeJsonLd, JsonLd } from "@/lib/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Stats />
      <TechMarquee />
      <Journey />
      <Courses />
      <Products />
      <VSCode />
      <ScrollMarquee rows={scrollMarqueeRows} />
      <Hobbies />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
