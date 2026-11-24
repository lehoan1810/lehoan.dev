import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Hobbies } from "@/components/sections/hobbies";
import { Journey } from "@/components/sections/journey";
import { Products } from "@/components/sections/products";
import { ScrollMarquee } from "@/components/sections/scroll-marquee-section";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { scrollMarqueeRows } from "@/data/site";
import { homeJsonLd, JsonLd } from "@/lib/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <TechMarquee />
      <Journey />
      <Products />
      <ScrollMarquee rows={scrollMarqueeRows} />
      <Hobbies />
      <Faq />
      <Cta />
    </>
  );
}
