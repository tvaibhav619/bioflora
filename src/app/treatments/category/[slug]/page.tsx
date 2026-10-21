import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getCategories, getTreatments, getGoals } from "@/lib/db/store";
import TreatmentCatalogueClient from "@/components/treatments/TreatmentCatalogueClient";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | Bioflora Treatments`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [allCategories, allGoals, allTreatments] = await Promise.all([
    getCategories(),
    getGoals(),
    getTreatments({ categorySlug: slug }),
  ]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation & Breadcrumb */}
        <div className="space-y-4">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Treatments</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
                Treatment Category
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest mt-1">
                {category.name}
              </h1>
            </div>

            <Link
              href={`/booking?category=${category.slug}`}
              className="inline-flex items-center gap-2 self-start md:self-auto bg-forest hover:bg-forest-dark text-ivory px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-champagne" />
              <span>Book In This Category</span>
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Filtered Catalogue */}
        <TreatmentCatalogueClient
          treatments={allTreatments}
          categories={allCategories}
          goals={allGoals}
          initialCategory={slug}
        />
      </div>
    </div>
  );
}
