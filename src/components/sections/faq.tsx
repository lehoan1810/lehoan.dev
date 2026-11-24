import { Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { faqs, faqSection } from "@/data/faq";

export function Faq() {
  return (
    <Section id={faqSection.id} labelled>
      <SectionHeader {...faqSection} />
      <div className="line-t">
        {faqs.map((faq) => (
          <details key={faq.question} className="group not-last:line-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-6 text-base font-medium text-foreground transition-colors hover:bg-surface sm:px-10 sm:text-lg [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                aria-hidden
                className="size-5 shrink-0 text-muted transition-transform group-open:rotate-45"
              />
            </summary>
            <p className="max-w-[70ch] px-5 pt-5 pb-7 text-base leading-relaxed text-muted sm:px-10">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
