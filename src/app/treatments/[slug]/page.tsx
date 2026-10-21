import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  MapPin,
  HelpCircle,
} from "lucide-react";
import {
  getTreatmentBySlug,
  getTreatments,
  getProviders,
  getLocations,
} from "@/lib/db/store";
import FaqAccordion from "@/components/home/FaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return { title: "Treatment Not Found" };

  return {
    title: `${treatment.name} | Bioflora Medical Spa`,
    description: treatment.summary,
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);

  if (!treatment) {
    notFound();
  }

  const [allTreatments, allProviders, allLocations] = await Promise.all([
    getTreatments(),
    getProviders(),
    getLocations(),
  ]);

  const relatedTreatments = allTreatments
    .filter(
      (t) =>
        t.slug !== treatment.slug &&
        (t.category_slug === treatment.category_slug ||
          t.target_goals.some((g) => treatment.target_goals.includes(g)))
    )
    .slice(0, 3);

  const assignedProviders = allProviders.filter((p) =>
    treatment.available_locations.some((loc) => p.locations.includes(loc))
  );

  const assignedLocations = allLocations.filter((l) =>
    treatment.available_locations.includes(l.slug)
  );

  return (
    <div className="py-10 sm:py-14 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-charcoal-muted font-mono">
          <Link href="/" className="hover:text-forest">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/treatments" className="hover:text-forest">
            Treatments
          </Link>{" "}
          /{" "}
          <Link
            href={`/treatments/category/${treatment.category_slug}`}
            className="hover:text-forest"
          >
            {treatment.category_slug.replace("-", " ")}
          </Link>{" "}
          / <span className="text-forest font-semibold">{treatment.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark bg-champagne-light px-3 py-1 rounded-full border border-champagne/40">
                {treatment.category_slug.replace("-", " ")}
              </span>

              {treatment.reviewed_by_clinician && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-sage text-forest px-2.5 py-0.5 rounded-full font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Clinically Reviewed by {treatment.reviewed_by_clinician}
                </span>
              )}
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-forest leading-tight">
              {treatment.name}
            </h1>

            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              {treatment.summary}
            </p>

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white border border-stone rounded-xl">
              <div>
                <span className="block text-[11px] text-charcoal-muted uppercase font-mono">
                  Duration
                </span>
                <span className="font-serif-luxury text-lg text-forest font-semibold flex items-center gap-1 mt-0.5">
                  <Clock className="w-4 h-4 text-champagne-dark" />
                  {treatment.typical_duration_minutes} Mins
                </span>
              </div>

              <div>
                <span className="block text-[11px] text-charcoal-muted uppercase font-mono">
                  Pricing
                </span>
                <span className="font-serif-luxury text-lg text-forest font-semibold mt-0.5 block">
                  {treatment.price_amount ? (
                    <>
                      {treatment.price_type === "starting_at" ? "From " : ""}
                      ${treatment.price_amount}
                      {treatment.is_sample_pricing && (
                        <span className="text-[10px] text-champagne-dark ml-1 font-sans">
                          (Sample)
                        </span>
                      )}
                    </>
                  ) : (
                    "Consultation"
                  )}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[11px] text-charcoal-muted uppercase font-mono">
                  Recovery
                </span>
                <span className="text-xs text-forest font-medium mt-1 block">
                  {treatment.recovery_downtime.split(".")[0]}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={`/booking?treatment=${treatment.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
              >
                <Calendar className="w-4 h-4 text-champagne" />
                <span>Book This Treatment</span>
              </Link>

              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 border border-stone text-charcoal hover:bg-sage-light px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Request Clinical Consultation</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-stone shadow-xl bg-stone-light aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] relative">
              <Image
                src={treatment.hero_image}
                alt={treatment.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Detailed Medical Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-stone/40">
          {/* Main Clinical Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Procedure */}
            <section className="bg-white border border-stone p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
              <h2 className="font-serif-luxury text-2xl text-forest font-medium">
                Clinical Overview &amp; What It Involves
              </h2>
              <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                {treatment.overview}
              </p>
              <div className="p-4 bg-ivory rounded-xl border border-stone/50 text-xs sm:text-sm text-charcoal leading-relaxed">
                <strong className="text-forest font-semibold block mb-1">
                  The Procedure Experience:
                </strong>
                {treatment.what_it_involves}
              </div>
            </section>

            {/* How It Works (Mechanism) */}
            <section className="bg-white border border-stone p-6 sm:p-8 rounded-2xl shadow-sm space-y-3">
              <h2 className="font-serif-luxury text-2xl text-forest font-medium">
                Biological Mechanism of Action
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {treatment.clinical_mechanism}
              </p>
            </section>

            {/* Candidacy & Contraindications */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-forest">
                  <CheckCircle2 className="w-5 h-5 text-forest" />
                  <h3 className="font-serif-luxury text-lg font-semibold">
                    Ideal Candidacy
                  </h3>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {treatment.candidacy}
                </p>
                <p className="text-[11px] text-charcoal-muted italic pt-2 border-t border-stone/30">
                  Note: Precise candidacy and tissue suitability are established during an individualized medical consultation.
                </p>
              </div>

              <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-700" />
                  <h3 className="font-serif-luxury text-lg font-semibold text-red-900">
                    Contraindications
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-charcoal-muted">
                  {treatment.contraindications.map((contra, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-700 shrink-0">&bull;</span>
                      <span>{contra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Preparation & Aftercare Protocols */}
            <section className="bg-white border border-stone p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="font-serif-luxury text-2xl text-forest font-medium">
                Care Protocols
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-forest mb-2">
                    Pre-Treatment Preparation
                  </h3>
                  <ul className="space-y-2 text-xs text-charcoal-muted">
                    {treatment.preparation_guidance.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-champagne-dark font-mono font-semibold shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-forest mb-2">
                    Post-Procedure Aftercare
                  </h3>
                  <ul className="space-y-2 text-xs text-charcoal-muted">
                    {treatment.aftercare_instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Recovery & Potential Risks */}
            <section className="bg-white border border-stone p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
              <h2 className="font-serif-luxury text-2xl text-forest font-medium">
                Recovery Timeline &amp; Safety Risks
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-charcoal leading-relaxed">
                <p>
                  <strong className="text-forest">Downtime &amp; Healing:</strong> {treatment.recovery_downtime}
                </p>
                <p>
                  <strong className="text-forest">Expected Clinical Onset:</strong> {treatment.expected_timeframe}
                </p>
                <p>
                  <strong className="text-forest">Recommended Sessions:</strong> {treatment.recommended_sessions}
                </p>
              </div>

              <div className="pt-3 border-t border-stone/30">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                  Potential Side Effects &amp; Rare Risks
                </h4>
                <ul className="space-y-1.5 text-xs text-charcoal-muted">
                  {treatment.risks_and_side_effects.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-stone-dark">&bull;</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Treatment FAQs */}
            {treatment.faqs && treatment.faqs.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif-luxury text-2xl text-forest font-medium">
                  Frequently Asked Questions About {treatment.name}
                </h2>
                <FaqAccordion items={treatment.faqs} />
              </section>
            )}
          </div>

          {/* Right Sidebar: Location Availability & Providers */}
          <div className="lg:col-span-4 space-y-6">
            {/* Clinical Governance Card */}
            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-forest">
                <ShieldCheck className="w-5 h-5 text-champagne-dark" />
                <h3 className="font-serif-luxury text-lg font-semibold">
                  Medical Governance
                </h3>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Reviewed by: <strong>{treatment.reviewed_by_clinician}</strong>
                <br />
                Credentials: {treatment.clinician_license}
                <br />
                Last Reviewed: {treatment.last_clinical_review_date}
              </p>
            </div>

            {/* Available Locations */}
            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-serif-luxury text-lg font-semibold text-forest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-champagne-dark" />
                Available Sanctuaries
              </h3>
              <div className="space-y-2 text-xs">
                {assignedLocations.map((loc) => (
                  <div key={loc.id} className="p-3 bg-ivory rounded-lg border border-stone/40">
                    <p className="font-medium text-forest">{loc.name}</p>
                    <p className="text-charcoal-muted text-[11px] mt-0.5">{loc.city}, {loc.state}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Providers performing this treatment */}
            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-lg font-semibold text-forest flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-champagne-dark" />
                Qualified Clinicians
              </h3>
              <div className="space-y-3">
                {assignedProviders.map((p) => (
                  <Link
                    key={p.id}
                    href={`/team/${p.slug}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sage-light transition-colors group"
                  >
                    <Image
                      src={p.photo_url}
                      alt={p.full_name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border border-stone"
                    />
                    <div>
                      <p className="text-xs font-semibold text-forest group-hover:text-champagne-dark">
                        {p.full_name}
                      </p>
                      <p className="text-[11px] text-charcoal-muted">{p.title.split("&")[0]}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Booking CTA card */}
            <div className="bg-forest text-ivory p-6 rounded-2xl shadow-lg space-y-4 text-center">
              <Sparkles className="w-6 h-6 text-champagne mx-auto" />
              <h4 className="font-serif-luxury text-xl font-light">
                Ready to Begin?
              </h4>
              <p className="text-xs text-ivory/80 leading-relaxed">
                Reserve your consultation or booking online in a few clicks.
              </p>
              <Link
                href={`/booking?treatment=${treatment.slug}`}
                className="w-full inline-block py-3 px-4 bg-champagne hover:bg-champagne-light text-forest rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Related Treatments */}
        {relatedTreatments.length > 0 && (
          <div className="pt-12 border-t border-stone/40 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-luxury text-2xl text-forest font-medium">
                Related Aesthetic Services
              </h2>
              <Link
                href="/treatments"
                className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-champagne-dark"
              >
                Browse All Treatments &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTreatments.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/treatments/${rel.slug}`}
                  className="bg-white border border-stone rounded-2xl p-5 hover:border-champagne-dark transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-champagne-dark">
                      {rel.category_slug.replace("-", " ")}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-medium text-forest group-hover:text-champagne-dark">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-semibold text-forest flex items-center justify-between">
                    <span>Explore Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
