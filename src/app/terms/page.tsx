import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Bioflora Medical Spa",
  description: "Terms and conditions governing the use of Bioflora's website and online services.",
};

export default function TermsPage() {
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
            Legal Terms
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Terms of Use
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Effective: October 2026 &bull; BIOFLORA Medical Spa
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Use, our Privacy Policy, and our Medical Disclaimer. If you do not agree, please discontinue use of the site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Intellectual Property
            </h2>
            <p>
              All trademarks, service marks, editorial content, clinical descriptions, photographic compositions, and software architecture are the proprietary intellectual property of Bioflora or its licensors. Unauthorized scraping, reproduction, or commercial redistribution is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Online Reservations &amp; Inquiries
            </h2>
            <p>
              Submissions made through online consultation forms or booking wizards constitute requests for appointments and do not guarantee appointment confirmation until reviewed and confirmed by our clinical coordination staff.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              4. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
