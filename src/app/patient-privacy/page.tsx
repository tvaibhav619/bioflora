import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock } from "lucide-react";

export const metadata = {
  title: "Notice of Privacy Practices (HIPAA) | Bioflora",
  description:
    "Bioflora's formal Notice of Privacy Practices governing the confidential use and disclosure of protected health information.",
};

export default function PatientPrivacyPage() {
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
            Health Insurance Portability and Accountability Act
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Notice of Privacy Practices
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Effective Date: October 2026 &bull; Medical Director: Dr. Elena Vance, MD
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <div className="p-4 bg-sage-light/60 rounded-xl border border-sage flex items-start gap-3">
            <Lock className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <p className="text-xs text-charcoal leading-relaxed">
              <strong>Important Notice:</strong> THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. Our Legal Duty Regarding Health Information
            </h2>
            <p>
              Under the Health Insurance Portability and Accountability Act of 1996 (HIPAA), BIOFLORA Medical Spa is required by law to maintain the privacy of your Protected Health Information (&ldquo;PHI&rdquo;) and to provide you with notice of our legal duties and privacy practices with respect to PHI.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Permitted Uses and Disclosures
            </h2>
            <p>
              We may use and disclose your health information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
              <li>
                <strong>Treatment:</strong> To provide, coordinate, or manage your aesthetic medical care, including consultations, injections, laser procedures, and post-procedure follow-ups.
              </li>
              <li>
                <strong>Payment:</strong> To process payments, deposits, and statements for services rendered at our clinics.
              </li>
              <li>
                <strong>Healthcare Operations:</strong> For clinical quality improvement, peer review, licensure verification, and clinical safety compliance audits.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Uses Requiring Your Explicit Written Authorization
            </h2>
            <p>
              We will never use or disclose your medical photography, clinical outcomes, before-and-after imagery, or treatment notes for marketing, promotional campaigns, or social media publications without your prior, explicit, written Informed Consent and Media Release Authorization.
            </p>
            <p>
              You have the right to revoke such authorization at any time in writing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              4. Your Patient Health Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-charcoal-muted">
              <li>Inspect and receive an electronic or paper copy of your medical record.</li>
              <li>Request an amendment to your health records if you believe information is inaccurate.</li>
              <li>Request confidential communications via an alternate telephone number or secure email address.</li>
              <li>Receive an accounting of disclosures made of your health information.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              5. Questions or Complaints
            </h2>
            <p>
              If you believe your privacy rights have been violated, you may file a complaint with our Privacy Officer or with the Secretary of the U.S. Department of Health and Human Services (HHS). We will never retaliate against any patient for filing a complaint.
            </p>
            <p className="pt-2 text-charcoal-muted">
              Bioflora Privacy Officer &bull; Telephone: (800) 555-0198 &bull; Email: compliance@bioflora-medspa.example.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
