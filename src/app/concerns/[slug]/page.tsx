import { notFound } from "next/navigation";
import Link from "next/link";
import { getGoalBySlug, getTreatments } from "@/lib/db/store";
import { ArrowLeft, Sparkles, Calendar, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goal = await getGoalBySlug(slug);
  if (!goal) return { title: "Concern Not Found" };

  return {
    title: `${goal.name} | Bioflora Clinical Guidance`,
    description: goal.short_description,
  };
}

export default async function ConcernDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goal = await getGoalBySlug(slug);

  if (!goal) {
    notFound();
  }

  const allTreatments = await getTreatments();
  const recommended = allTreatments.filter((t) =>
    goal.recommended_treatments.includes(t.slug)
  );

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/concerns"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Concerns</span>
        </Link>

        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Clinical Concern Guide
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            {goal.name}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            {goal.short_description}
          </p>
        </div>

        {/* Detailed Clinical Overview Card */}
        <div className="bg-white border border-stone p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <h2 className="font-serif-luxury text-2xl text-forest font-medium">
            Pathophysiology &amp; Treatment Methodology
          </h2>
          <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
            {goal.detailed_overview}
          </p>
        </div>

        {/* Recommended Treatments List */}
        <div className="space-y-6">
          <h2 className="font-serif-luxury text-2xl text-forest font-medium">
            Doctor-Recommended Clinical Treatments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommended.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-stone rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-champagne-dark">
                    {t.category_slug.replace("-", " ")}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-medium text-forest">
                    {t.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {t.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone/30 flex items-center justify-between">
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-xs font-semibold text-forest underline hover:text-champagne-dark"
                  >
                    View Details
                  </Link>

                  <Link
                    href={`/booking?treatment=${t.slug}`}
                    className="px-4 py-2 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Book Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-forest text-ivory p-8 rounded-2xl text-center space-y-4">
          <h3 className="font-serif-luxury text-2xl font-light">
            Unsure Which Protocol Suits Your Skin?
          </h3>
          <p className="text-xs text-ivory/80 max-w-md mx-auto">
            Schedule an unhurried clinical diagnostic with our medical team for personalized imaging and advice.
          </p>
          <Link
            href="/consultation"
            className="inline-block px-6 py-3 bg-champagne hover:bg-champagne-light text-forest rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow"
          >
            Request Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
