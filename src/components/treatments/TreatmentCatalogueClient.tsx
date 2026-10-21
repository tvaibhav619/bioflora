"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Filter, ArrowUpDown, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Treatment, TreatmentCategory, TreatmentGoal } from "@/lib/db/types";

interface TreatmentCatalogueClientProps {
  treatments: Treatment[];
  categories: TreatmentCategory[];
  goals: TreatmentGoal[];
  initialCategory?: string;
  initialGoal?: string;
}

export default function TreatmentCatalogueClient({
  treatments,
  categories,
  goals,
  initialCategory = "all",
  initialGoal = "all",
}: TreatmentCatalogueClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGoal, setSelectedGoal] = useState(initialGoal);
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "duration">("name");

  const filteredTreatments = useMemo(() => {
    return treatments
      .filter((treatment) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = treatment.name.toLowerCase().includes(q);
          const matchSummary = treatment.summary.toLowerCase().includes(q);
          const matchTagline = treatment.tagline.toLowerCase().includes(q);
          if (!matchName && !matchSummary && !matchTagline) return false;
        }

        // Category filter
        if (selectedCategory !== "all" && treatment.category_slug !== selectedCategory) {
          return false;
        }

        // Goal filter
        if (selectedGoal !== "all" && !treatment.target_goals.includes(selectedGoal)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price-asc") return (a.price_amount || 0) - (b.price_amount || 0);
        if (sortBy === "price-desc") return (b.price_amount || 0) - (a.price_amount || 0);
        if (sortBy === "duration") return a.typical_duration_minutes - b.typical_duration_minutes;
        return 0;
      });
  }, [treatments, searchQuery, selectedCategory, selectedGoal, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedCategory !== "all" || selectedGoal !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedGoal("all");
    setSortBy("name");
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Control Bar */}
      <div className="bg-white border border-stone p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments, goals, keywords..."
              className="w-full pl-10 pr-9 py-2.5 bg-ivory/60 border border-stone rounded-xl text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal p-1"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 bg-ivory/60 border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Goal / Concern Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full py-2.5 px-3 bg-ivory/60 border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
            >
              <option value="all">All Concerns</option>
              {goals.map((g) => (
                <option key={g.id} value={g.slug}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-ivory/60 border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
            >
              <option value="name">Sort: A to Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone/30 text-xs">
            <span className="text-charcoal-muted font-medium">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 bg-sage text-forest px-2.5 py-1 rounded-md text-[11px] font-medium">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("all")} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGoal !== "all" && (
              <span className="inline-flex items-center gap-1 bg-sage text-forest px-2.5 py-1 rounded-md text-[11px] font-medium">
                Concern: {goals.find((g) => g.slug === selectedGoal)?.name}
                <button onClick={() => setSelectedGoal("all")} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-sage text-forest px-2.5 py-1 rounded-md text-[11px] font-medium">
                Search: &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} className="p-0.5 hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-charcoal-muted hover:text-forest underline ml-auto"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-charcoal-muted font-mono px-1">
        <span>Showing {filteredTreatments.length} clinical treatments</span>
        <span>All services clinician-guided</span>
      </div>

      {/* Treatment Grid */}
      {filteredTreatments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-champagne-dark transition-all duration-300"
            >
              <div>
                <div className="h-56 w-full relative overflow-hidden bg-stone-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={treatment.hero_image}
                    alt={treatment.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-forest/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                    {treatment.category_slug.replace("-", " ")}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-charcoal-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-champagne-dark" />
                      {treatment.typical_duration_minutes} Mins
                    </span>
                    <span>
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

                  <h3 className="font-serif-luxury text-xl font-medium text-forest">
                    {treatment.name}
                  </h3>

                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                    {treatment.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {treatment.target_goals.map((g) => (
                      <span
                        key={g}
                        className="bg-ivory text-charcoal-muted border border-stone/50 px-2 py-0.5 rounded text-[10px]"
                      >
                        {g.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone/30 mt-4 flex items-center justify-between gap-3">
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="text-xs font-semibold text-forest hover:text-champagne-dark underline"
                >
                  View Clinical Profile
                </Link>

                <Link
                  href={`/booking?treatment=${treatment.slug}`}
                  className="px-4 py-2 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-stone rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center mx-auto text-forest">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-forest font-medium">
            No Treatments Found
          </h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            No treatments match your current filter selections. Try broadening your search or resetting filters to view all services.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 bg-forest text-ivory text-xs font-semibold rounded-full uppercase tracking-wider hover:bg-forest-dark transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
