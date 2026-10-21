import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Bioflora Medical Spa",
  description:
    "Review Bioflora's privacy commitments, data handling practices, and cookie disclosures.",
};

export default function PrivacyPage() {
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
            Compliance &amp; Governance
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Last Updated: October 2026 &bull; Scope: U.S. Federal &amp; California Privacy Standards
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. Our Uncompromising Commitment to Privacy
            </h2>
            <p>
              BIOFLORA Medical Spa (&ldquo;Bioflora,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates with a primary dedication to patient discretion and confidential clinical care. This Privacy Policy outlines the information we collect through our public website (the &ldquo;Site&rdquo;) and our administrative protocols for protecting personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Protected Health Information (PHI) Distinction
            </h2>
            <p>
              This website serves marketing and informational purposes. <strong>We strictly do not collect, solicit, or transmit protected health information (PHI) through public marketing forms.</strong>
            </p>
            <p>
              When an individual becomes an active patient of our clinics, their clinical treatment records, informed consent documentation, and medical histories are maintained in an independently certified, HIPAA-compliant electronic health record (EHR) system, governed by our{" "}
              <Link href="/patient-privacy" className="text-forest underline font-medium">
                Notice of Privacy Practices
              </Link>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Information We Collect on the Marketing Site
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-charcoal-muted">
              <li>
                <strong>Contact Inquiries:</strong> Full name, email address, telephone number, preferred contact window, and treatment interest submitted via our consultation request or demo booking forms.
              </li>
              <li>
                <strong>Device &amp; Telemetry Data:</strong> Aggregated, pseudonymized technical metrics (browser type, operating system, pages visited) collected solely with prior cookie consent.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              4. How We Use Information
            </h2>
            <p>
              Information submitted via the Site is used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-charcoal-muted">
              <li>Coordinate and schedule requested consultation appointments.</li>
              <li>Respond directly to concierge inquiries.</li>
              <li>Deliver transactional appointment confirmations and reference codes.</li>
              <li>Fulfill optional subscriptions to our clinical journal if marketing consent was explicitly provided.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your contact information to external third parties or data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              5. Third-Party Tracking &amp; Advertising Pixels
            </h2>
            <p>
              In strict accordance with medical privacy best practices and federal regulatory guidance, we do not deploy invasive third-party tracking pixels (such as Meta Pixel or Google Ads tracking) across booking workflows or health concern discovery pages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              6. Your Rights &amp; Contact Information
            </h2>
            <p>
              You may request review, correction, or deletion of your contact records at any time by contacting our Privacy Officer at{" "}
              <a href="mailto:privacy@bioflora-medspa.example.com" className="text-forest underline font-semibold">
                privacy@bioflora-medspa.example.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
