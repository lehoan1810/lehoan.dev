import { Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { faqs, faqSection } from "@/data/faq";

export function Faq() {
  return (
    <Section id={faqSection.id} labelled>
      <SectionHeader {...faqSection} />
      <div className="flex flex-col gap-3 md:pl-[calc(7rem+2rem)]">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group reveal rounded-2xl border border-border-card transition-colors open:bg-surface"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-base font-medium text-foreground sm:px-6 [&::-webkit-details-marker]:hidden">
              <span aria-hidden className="font-mono text-xs text-faint tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">{faq.question}</span>
              <Plus
                aria-hidden
                className="size-5 shrink-0 text-muted transition-transform group-open:rotate-45 group-open:text-brand"
              />
            </summary>
            <p className="max-w-[70ch] px-5 pb-6 pl-[3.25rem] text-sm leading-7 text-muted sm:pr-6 sm:pl-[3.5rem]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
