import Link from "next/link";
import { Clock, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Cancellation & Deposit Policy | Bioflora",
  description:
    "Review Bioflora's 48-hour cancellation, deposit, and rescheduling policies.",
};

export default function CancellationPolicyPage() {
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
            Appointment Governance
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Cancellation &amp; Deposit Policy
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Designed to Respect Dedicated Clinical Time and Preserve Access
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. The 48-Hour Notice Standard
            </h2>
            <p>
              At Bioflora, our practitioners reserve comprehensive, unhurried appointment windows specifically for your clinical care. Because our clinical suites and sterile equipment are dedicated exclusively to you, we require a minimum of <strong>48 hours notice</strong> to cancel or reschedule any scheduled procedure or diagnostic assessment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Consultation &amp; Procedure Deposits
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-charcoal-muted">
              <li>
                <strong>Clinical Consultations:</strong> A $50 booking deposit is collected upon reservation. This deposit is 100% credited toward your clinical diagnostic or any procedure scheduled on the day of assessment.
              </li>
              <li>
                <strong>Laser &amp; Advanced RF Procedures (Morpheus8, BBL HERO):</strong> A $150 deposit is required due to extended suite reservation time.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Late Cancellations &amp; Missed Visits
            </h2>
            <p>
              Cancellations or rescheduling requests provided with <strong>less than 48 hours notice</strong>, as well as missed appointments (&ldquo;no-shows&rdquo;), will forfeit the reservation deposit.
            </p>
            <p>
              If an emergency or acute illness arises, please notify our concierge as early as possible so our medical director may review exceptions on a compassionate, case-by-case basis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              4. How to Reschedule
            </h2>
            <p>
              Appointments may be rescheduled directly through your online confirmation link or by telephoning our clinic directly at{" "}
              <a href="tel:8005550198" className="text-forest underline font-semibold">
                (800) 555-0198
              </a>{" "}
              during normal operating hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
