import { notFound } from "next/navigation";
import Link from "next/link";
import { getJournalArticleBySlug, getJournalArticles } from "@/lib/db/store";
import { ArrowLeft, Clock, ShieldCheck, User, Calendar, Share2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getJournalArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Bioflora Journal`,
    description: article.summary,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getJournalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getJournalArticles();
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-champagne-light text-forest px-3 py-0.5 rounded-full border border-champagne/40">
              {article.category}
            </span>
            <span className="text-xs text-charcoal-muted font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-champagne-dark" />
              {article.read_time_minutes} min read &bull; {article.published_at}
            </span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-forest leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-serif-luxury italic">
            {article.summary}
          </p>

          {/* Author & Medical Reviewer Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-stone rounded-2xl text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-forest font-bold">
                {article.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-forest">{article.author_name}</p>
                <p className="text-[11px] text-charcoal-muted">{article.author_role}</p>
              </div>
            </div>

            {article.medical_reviewer_name && (
              <div className="flex items-center gap-2 text-forest bg-sage-light px-3 py-1.5 rounded-xl border border-sage">
                <ShieldCheck className="w-4 h-4 text-champagne-dark" />
                <div>
                  <p className="text-[11px] font-semibold">
                    Medically Reviewed by {article.medical_reviewer_name}
                  </p>
                  <p className="text-[10px] text-charcoal-muted">
                    {article.medical_reviewer_title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-stone shadow-xl bg-stone-light">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm prose prose-stone max-w-none text-charcoal text-xs sm:text-sm leading-relaxed space-y-6">
          <div className="whitespace-pre-line leading-relaxed">
            {article.body_markdown}
          </div>

          {/* Tag Chips */}
          <div className="pt-6 border-t border-stone/30 flex flex-wrap gap-2 not-prose">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-ivory text-charcoal-muted border border-stone/50 px-2.5 py-1 rounded-md text-[11px]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Consultation Callout */}
        <div className="bg-forest text-ivory p-8 rounded-3xl text-center space-y-4">
          <h3 className="font-serif-luxury text-2xl font-light">
            Questions Regarding Clinical Protocols?
          </h3>
          <p className="text-xs text-ivory/80 max-w-md mx-auto">
            Schedule a diagnostic assessment with our medical staff to tailor an evidence-based roadmap for your skin.
          </p>
          <Link
            href="/consultation"
            className="inline-block px-6 py-2.5 bg-champagne hover:bg-champagne-light text-forest rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow"
          >
            Inquire With Clinician
          </Link>
        </div>
      </article>
    </div>
  );
}
