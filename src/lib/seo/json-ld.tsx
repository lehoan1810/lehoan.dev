import { faqs } from "@/data/faq";
import { siteConfig, socials } from "@/data/site";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

const id = (fragment: string) => `${siteUrl}/#${fragment}`;

/** schema.org graph for the home page: who the site is about, the site, the page, its FAQ. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": id("person"),
        name: siteConfig.author,
        alternateName: siteConfig.alternateName,
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        url: siteUrl,
        image: absoluteUrl("/opengraph-image"),
        sameAs: [socials.youtube, socials.tiktok, socials.blog],
        knowsAbout: siteConfig.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: siteUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.locale,
        publisher: { "@id": id("person") },
      },
      {
        "@type": "ProfilePage",
        "@id": id("profile"),
        url: siteUrl,
        name: siteConfig.title,
        inLanguage: siteConfig.locale,
        isPartOf: { "@id": id("website") },
        mainEntity: { "@id": id("person") },
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        isPartOf: { "@id": id("website") },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

/** Escapes `<` so content can never close the script tag (XSS-safe JSON-LD). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
