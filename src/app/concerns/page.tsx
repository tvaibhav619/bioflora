import Link from "next/link";
import { getGoals, getTreatments } from "@/lib/db/store";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Skin Concerns & Aesthetic Goals | Bioflora",
  description:
    "Explore treatments organized by aesthetic focus: fine lines, volume loss, sun damage, skin laxity, and cellular hydration.",
};

export default async function ConcernsPage() {
  const [goals, treatments] = await Promise.all([getGoals(), getTreatments()]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Breadcrumbs */}
        <div className="space-y-3">
          <nav aria-label="Breadcrumb" className="text-xs text-charcoal-muted font-mono">
            <Link href="/" className="hover:text-forest">
              Home
            </Link>{" "}
            / <span className="text-forest font-semibold">Skin Concerns</span>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Goal-Oriented Discovery
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Aesthetic Concerns &amp; Goals
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            Every facial journey begins with understanding your unique dermal priorities. Explore our clinical methodologies categorized by specific aesthetic goals.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal) => {
            const recommended = treatments.filter((t) =>
              goal.recommended_treatments.includes(t.slug)
            );

            return (
              <div
                key={goal.id}
                className="bg-white border border-stone rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-champagne-dark">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Concern Focus
                    </span>
                  </div>

                  <h2 className="font-serif-luxury text-2xl font-medium text-forest">
                    {goal.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {goal.short_description}
                  </p>

                  <div className="pt-2">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                      Clinician-Recommended Procedures:
                    </h3>
                    <div className="space-y-2">
                      {recommended.map((t) => (
                        <Link
                          key={t.id}
                          href={`/treatments/${t.slug}`}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-ivory/60 hover:bg-sage-light text-xs font-medium text-forest transition-colors"
                        >
                          <span>{t.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-champagne-dark" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone/30 flex items-center justify-between">
                  <Link
                    href={`/concerns/${goal.slug}`}
                    className="text-xs font-semibold text-forest underline hover:text-champagne-dark"
                  >
                    Read In-Depth Clinical Guide &rarr;
                  </Link>

                  <Link
                    href={`/treatments?goal=${goal.slug}`}
                    className="text-xs text-charcoal-muted hover:text-forest"
                  >
                    View in Catalogue
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
