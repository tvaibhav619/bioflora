"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const headingId = `faq-heading-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div
            key={idx}
            className="border border-stone rounded-xl bg-white overflow-hidden transition-all duration-200"
          >
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-sage-light/40 transition-colors"
              >
                <span className="font-serif-luxury text-base sm:text-lg font-medium text-forest pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-champagne-dark shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-stone/30 animate-in fade-in duration-150"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
