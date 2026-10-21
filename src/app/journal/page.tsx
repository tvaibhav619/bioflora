import Link from "next/link";
import { getJournalArticles } from "@/lib/db/store";
import { BookOpen, Clock, ShieldCheck, ArrowRight, User } from "lucide-react";

export const metadata = {
  title: "Clinical Journal & Skincare Science | Bioflora",
  description:
    "Evidence-based dermatological insights, biostimulator mechanics, and barrier health guidance authored and reviewed by licensed clinicians.",
};

export default async function JournalPage() {
  const articles = await getJournalArticles();

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Clinical Insights
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            The Bioflora Journal
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Rigorous dermatological science translated for thoughtful patients. Every piece is authored or medically reviewed by our clinical staff.
          </p>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-stone rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-champagne-dark transition-all duration-300"
            >
              <div>
                <div className="h-64 w-full relative overflow-hidden bg-stone-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.cover_image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-forest/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-charcoal-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-champagne-dark" />
                      {art.read_time_minutes} min read
                    </span>
                    <span>&bull;</span>
                    <span>{art.published_at}</span>
                  </div>

                  <h2 className="font-serif-luxury text-2xl font-medium text-forest group-hover:text-champagne-dark transition-colors">
                    <Link href={`/journal/${art.slug}`}>{art.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-stone/30 text-[11px] text-charcoal-muted">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {art.author_name}
                    </span>
                    {art.medical_reviewer_name && (
                      <span className="text-forest font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-champagne-dark" />
                        Medically Reviewed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href={`/journal/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest underline hover:text-champagne-dark"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
