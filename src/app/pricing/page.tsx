import Link from "next/link";
import { getTreatments, getOffers, getCategories } from "@/lib/db/store";
import { Calendar, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Service Pricing & Fee Transparency | Bioflora",
  description:
    "Review Bioflora's transparent treatment pricing guide, initial consultation fees, and seasonal package rates.",
};

export default async function PricingPage() {
  const [treatments, offers, categories] = await Promise.all([
    getTreatments(),
    getOffers(),
    getCategories(),
  ]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Honest Aesthetic Medicine
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Treatment Pricing &amp; Fees
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            We believe in upfront, transparent clinical fees. All pricing is finalized with your practitioner following your comprehensive anatomical assessment.
          </p>
        </div>

        {/* Diagnostic Fee Structure Banner */}
        <div className="bg-white border border-stone p-6 sm:p-8 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-dark font-mono">
              Initial Assessment
            </span>
            <h2 className="font-serif-luxury text-2xl text-forest font-medium">
              45-Minute Comprehensive Clinical Diagnostic
            </h2>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Includes cross-polarized 3D skin imaging, muscle vector assessment, and a bespoke treatment blueprint created by a board-certified doctor or senior nurse specialist.
            </p>
          </div>

          <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-stone/40 pt-4 md:pt-0 md:pl-6 space-y-2">
            <span className="font-serif-luxury text-3xl font-semibold text-forest block">
              $150
            </span>
            <span className="text-[11px] text-charcoal-muted block">
              100% credited toward any same-day or planned treatment package.
            </span>
            <Link
              href="/consultation"
              className="inline-block mt-2 px-5 py-2 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
            >
              Book Diagnostic
            </Link>
          </div>
        </div>

        {/* Pricing Table by Category */}
        <div className="space-y-10">
          <h2 className="font-serif-luxury text-3xl text-forest font-normal text-center">
            Standard Clinical Services Schedule
          </h2>

          <div className="space-y-8">
            {categories.map((cat) => {
              const catTreatments = treatments.filter(
                (t) => t.category_slug === cat.slug
              );
              if (catTreatments.length === 0) return null;

              return (
                <div
                  key={cat.id}
                  className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="bg-sage-light/60 px-6 py-4 border-b border-stone/40 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif-luxury text-lg font-semibold text-forest">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-charcoal-muted">{cat.tagline}</p>
                    </div>
                    <Link
                      href={`/treatments/category/${cat.slug}`}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      View Category &rarr;
                    </Link>
                  </div>

                  <div className="divide-y divide-stone/30">
                    {catTreatments.map((t) => (
                      <div
                        key={t.id}
                        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-ivory/30 transition-colors"
                      >
                        <div className="space-y-1 max-w-lg">
                          <Link
                            href={`/treatments/${t.slug}`}
                            className="font-serif-luxury text-lg font-medium text-forest hover:text-champagne-dark"
                          >
                            {t.name}
                          </Link>
                          <p className="text-xs text-charcoal-muted line-clamp-2">
                            {t.summary}
                          </p>
                          <div className="text-[11px] text-charcoal-muted font-mono pt-1">
                            Duration: {t.typical_duration_minutes} Mins
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                          <span className="font-serif-luxury text-xl font-semibold text-forest">
                            {t.price_amount ? (
                              <>
                                {t.price_type === "starting_at" ? "From " : ""}
                                ${t.price_amount}
                                {t.is_sample_pricing && (
                                  <span className="text-[10px] text-champagne-dark font-sans ml-1 block sm:inline">
                                    (Sample)
                                  </span>
                                )}
                              </>
                            ) : (
                              "Consultation"
                            )}
                          </span>

                          <Link
                            href={`/booking?treatment=${t.slug}`}
                            className="px-4 py-1.5 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Seasonal Packages Link */}
        <div className="bg-forest text-ivory p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne">
            Curated Bundles
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light">
            Explore Seasonal Treatment Packages
          </h2>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-lg mx-auto leading-relaxed">
            Discover bundled transformational series for Morpheus8 RF remodeling and photofacial clearing with transparent multi-session savings.
          </p>
          <div className="pt-2">
            <Link
              href="/offers"
              className="inline-block px-8 py-3.5 bg-champagne hover:bg-champagne-light text-forest rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow"
            >
              View Active Offers &amp; Packages &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
