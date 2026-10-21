import Link from "next/link";
import { CheckCircle2, ArrowLeft, MessageSquareHeart } from "lucide-react";

export const metadata = {
  title: "Accessibility Statement | Bioflora Medical Spa",
  description:
    "Bioflora's commitment to digital accessibility conforming to WCAG 2.2 Level AA standards.",
};

export default function AccessibilityPage() {
  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Universal Inclusivity
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Accessibility Statement
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Conforming with Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. Our Digital Accessibility Commitment
            </h2>
            <p>
              BIOFLORA Medical Spa is dedicated to ensuring that digital information, treatment discovery tools, and booking workflows are accessible to all individuals, including people with sensory, cognitive, and mobility disabilities. We continuously audit our web application to conform with the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Key Accessibility Features Implemented
            </h2>
            <ul className="space-y-2 text-charcoal-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Keyboard Navigation &amp; Visible Focus:</strong> All interactive elements, menus, forms, and accordions are operable via keyboard tab controls with clear 2px focus indicators.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Semantic HTML Hierarchy:</strong> Structured heading tags (H1-H4) and ARIA landmarks to ensure effortless screen reader navigation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Color Contrast Compliance:</strong> High-contrast botanical palette designed to satisfy the 4.5:1 ratio for normal body text and 3:1 for large display elements.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Reduced Motion Support:</strong> Respects the system preference (<code className="bg-ivory px-1 rounded">prefers-reduced-motion</code>), neutralizing animations for sensitive individuals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Responsive Zoom Compatibility:</strong> Fully readable and operable up to 200% browser zoom without layout breakage or horizontal scrollbars.
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-stone/40 pt-6">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Ongoing Feedback &amp; Assistance
            </h2>
            <p>
              If you encounter any accessibility barrier or have difficulty reserving an appointment on this site, our team is standing by to assist you directly:
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/accessibility/feedback"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-dark transition-colors shadow-sm"
              >
                <MessageSquareHeart className="w-4 h-4 text-champagne" />
                <span>Submit Accessibility Feedback</span>
              </Link>

              <a
                href="tel:8005550198"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest underline hover:text-champagne-dark"
              >
                Direct Phone Assistance: (800) 555-0198
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
