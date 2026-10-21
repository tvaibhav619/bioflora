import { getCategories, getGoals, getTreatments } from "@/lib/db/store";
import TreatmentCatalogueClient from "@/components/treatments/TreatmentCatalogueClient";
import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";

export const metadata = {
  title: "Clinical Treatment Catalogue",
  description:
    "Explore Bioflora's complete catalogue of doctor-led aesthetic treatments, including precision neuromodulators, RF microneedling, and laser phototherapy.",
};

export default async function TreatmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; goal?: string }>;
}) {
  const params = await searchParams;
  const [categories, goals, treatments] = await Promise.all([
    getCategories(),
    getGoals(),
    getTreatments(),
  ]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Titles */}
        <div className="space-y-3">
          <nav aria-label="Breadcrumb" className="text-xs text-charcoal-muted font-mono">
            <Link href="/" className="hover:text-forest">
              Home
            </Link>{" "}
            / <span className="text-forest font-semibold">Treatments</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
                Clinical Services
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest mt-1">
                Treatment Catalogue
              </h1>
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center gap-2 self-start md:self-auto bg-forest hover:bg-forest-dark text-ivory px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-champagne" />
              <span>Book Consultation</span>
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            Every procedure is personalized to your distinct anatomical profile. Explore our doctor-directed offerings below, complete with clinical descriptions, downtime expectations, and transparent sample pricing.
          </p>
        </div>

        {/* Interactive Filterable Catalogue */}
        <TreatmentCatalogueClient
          treatments={treatments}
          categories={categories}
          goals={goals}
          initialCategory={params.category || "all"}
          initialGoal={params.goal || "all"}
        />
      </div>
    </div>
  );
}
