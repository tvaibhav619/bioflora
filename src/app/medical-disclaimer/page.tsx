import Link from "next/link";
import { AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Clinical Medical Disclaimer | Bioflora",
  description:
    "Essential disclosures regarding educational content, individual medical suitability, and informed consent.",
};

export default function MedicalDisclaimerPage() {
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
            Regulatory Disclosure
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Clinical Medical Disclaimer
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Mandatory Disclosure for Website Visitors and Prospective Patients
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <div className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-xl space-y-2">
            <h2 className="font-serif-luxury text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-700" />
              Not Medical Advice or Emergency Care
            </h2>
            <p className="text-xs text-red-800 leading-relaxed">
              The content published on this website—including treatment overviews, clinical journal articles, recovery guides, and discovery tool outputs—is presented strictly for educational and informational purposes. It does not constitute formal medical diagnosis, individualized clinical advice, or a physician-patient relationship.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. Individual Assessment Requirement
            </h2>
            <p>
              No aesthetic medical procedure, prescription neuromodulator (Botox, Dysport), dermal filler (Restylane, Juvederm), or ablative/non-ablative laser therapy should ever be undertaken without a comprehensive, in-person clinical diagnostic examination conducted by a licensed medical physician or certified nurse specialist.
            </p>
            <p>
              Anatomy, tissue vascularity, skin thickness, Fitzpatrick phototype, prior scar formation, and systemic health conditions differ substantially across individuals. What is clinically indicated for one patient may be contraindicated for another.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Variability of Clinical Outcomes
            </h2>
            <p>
              Bioflora does not offer guaranteed or uniform clinical outcomes. Dermal neocollagenesis, skin tightening, pigment clearance, and neuromuscular relaxation are physiological processes subject to individual metabolic rate, biological healing cascade, adherence to post-care protocols, and UV shielding.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Demonstration Mode Notice
            </h2>
            <p>
              Bioflora is a fictional demonstration brand created to showcase high-level medical spa web application engineering. Treatment pricing, staff biographies, and appointment availability displayed on this website represent sample demonstration models.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
