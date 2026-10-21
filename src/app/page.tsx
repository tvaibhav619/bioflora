import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Calendar,
  ArrowRight,
  Check,
  Star,
  Users,
  Compass,
  FileCheck2,
} from "lucide-react";
import TreatmentDiscoveryTool from "@/components/home/TreatmentDiscoveryTool";
import FaqAccordion from "@/components/home/FaqAccordion";
import {
  getCategories,
  getFeaturedTreatments,
  getProviders,
  getLocations,
  getReviews,
  getSettings,
} from "@/lib/db/store";

export const metadata = {
  title: "BIOFLORA — Luxury Medical Spa & Aesthetic Sanctuary",
  description:
    "Refined aesthetic medicine and botanical skin wellness guided by board-certified dermatologists. Locations in Beverly Hills and Tribeca.",
};

export default async function HomePage() {
  const [categories, featuredTreatments, providers, locations, reviews, settings] =
    await Promise.all([
      getCategories(),
      getFeaturedTreatments(),
      getProviders(),
      getLocations(),
      getReviews(),
      getSettings(),
    ]);

  const faqs = [
    {
      question: "How do consultations work at Bioflora?",
      answer:
        "Every journey begins with an unhurried, 45-minute clinical consultation. Your provider conducts digital skin imaging, reviews your medical history, discusses your aesthetic goals, and presents an honest, personalized treatment plan with transparent pricing.",
    },
    {
      question: "Will my results look natural or 'over-done'?",
      answer:
        "Preserving your authentic anatomical harmony is the core foundation of Bioflora. We believe in micro-dosing, biostimulatory cellular therapies, and gradual structural restoration. Our goal is for people to notice your radiance, never the procedure.",
    },
    {
      question: "What is your cancellation and deposit policy?",
      answer:
        "To honor our clinicians' dedicated time, we require 48 hours notice for any rescheduling or cancellation. Deposits for appointments cancelled with at least 48 hours notice are completely refunded or held on file for future treatments.",
    },
    {
      question: "How should I prepare for my first appointment?",
      answer:
        "For injectable and laser treatments, we recommend avoiding NSAIDs, alcohol, and blood-thinning supplements for 3 to 5 days prior. Arrive with clean skin free of heavy makeup. Your provider will review full pre-care guidelines when you book.",
    },
    {
      question: "Do you offer membership plans or packages?",
      answer:
        "Yes. The Flora Society offers three tiers of monthly wellness curation (The Flora Tier, The Botanica Reserve, and The Clinical Elixir Society) offering inclusive monthly treatments, preferred pricing on injectables, and priority scheduling.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Optional Configurable Announcement Bar */}
      {settings.announcement_active && (
        <section
          aria-label="Clinic Announcement"
          className="bg-forest text-ivory text-xs py-1.5 px-4 text-center border-b border-champagne/20"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="text-champagne font-semibold tracking-wider uppercase text-[10px] bg-champagne/10 px-2 py-0.5 rounded">
              Welcome
            </span>
            <span>{settings.announcement_text}</span>
            {settings.announcement_link && (
              <Link
                href={settings.announcement_link}
                className="underline text-champagne hover:text-ivory ml-1 font-medium"
              >
                Learn More &rarr;
              </Link>
            )}
          </div>
        </section>
      )}

      {/* 2. Premium Hero Section */}
      <section className="relative bg-ivory pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 overflow-hidden border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage rounded-full text-xs font-semibold uppercase tracking-widest text-forest border border-sage-dark/50">
                <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
                <span>Doctor-Guided Aesthetic Medicine</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-forest leading-[1.15] tracking-tight">
                Refined care. <br />
                <span className="italic font-light text-forest/90">Naturally confident.</span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-xl">
                Discover personalized aesthetic medicine and restorative botanical skincare, guided by your individual anatomy and unhurried clinical care.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-champagne" />
                  <span>Book a Consultation</span>
                </Link>

                <Link
                  href="/treatments"
                  className="inline-flex items-center justify-center gap-2 border border-forest text-forest hover:bg-sage-light px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200"
                >
                  <span>Explore Treatments</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Key Trust Signals Under CTA */}
              <div className="pt-4 border-t border-stone/50 grid grid-cols-3 gap-2 sm:gap-4 text-left">
                <div>
                  <span className="block font-serif-luxury text-xl sm:text-2xl text-forest font-semibold">
                    100%
                  </span>
                  <span className="text-[11px] text-charcoal-muted uppercase tracking-wider">
                    Physician Led
                  </span>
                </div>
                <div>
                  <span className="block font-serif-luxury text-xl sm:text-2xl text-forest font-semibold">
                    45 Min
                  </span>
                  <span className="text-[11px] text-charcoal-muted uppercase tracking-wider">
                    Full Diagnostics
                  </span>
                </div>
                <div>
                  <span className="block font-serif-luxury text-xl sm:text-2xl text-forest font-semibold">
                    2 Suites
                  </span>
                  <span className="text-[11px] text-charcoal-muted uppercase tracking-wider">
                    BH &amp; Tribeca
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone shadow-2xl bg-stone-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80"
                    alt="Bioflora luxury treatment suite with natural botanical light"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Reassurance & Clinical Standards Strip */}
      <section className="bg-white py-6 sm:py-8 border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-sage rounded-lg text-forest shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-forest">
                  Clinical Governance
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  FDA-cleared medical technologies and licensed physician oversight.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-sage rounded-lg text-forest shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-forest">
                  Clinician-Guided Care
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  Evaluations and injectable procedures performed exclusively by board-certified practitioners.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-sage rounded-lg text-forest shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-forest">
                  Transparent Information
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  Clear breakdowns of procedure downtime, candidate criteria, realistic outcomes, and fees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-sage rounded-lg text-forest shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-forest">
                  Bespoke Formulations
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  Medical-grade active infusions paired with soothing botanical extracts for barrier restoration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-sage rounded-lg text-forest shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-forest">
                  Unhurried Sessions
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  Dedicated appointment slots allowing ample time for complete facial analysis and comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Explore Treatment Categories */}
      <section className="py-10 sm:py-12 bg-ivory border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
                Clinical Offerings
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal mt-1">
                Explore Treatment Categories
              </h2>
            </div>
            <Link
              href="/treatments"
              className="text-xs font-semibold uppercase tracking-widest text-forest hover:text-champagne-dark flex items-center gap-1.5"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/treatments/category/${cat.slug}`}
                className="group luxury-card luxury-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-stone-light">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.hero_image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif-luxury text-xl font-medium text-forest group-hover:text-champagne-dark transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-forest group-hover:text-champagne-dark">
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Treatments Grid */}
      <section className="py-10 sm:py-12 bg-white border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
              Signature Experiences
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
              Featured Clinical Treatments
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Carefully calibrated procedures combining medical evidence with exquisite patient comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTreatments.slice(0, 3).map((treatment) => (
              <div
                key={treatment.id}
                className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-stone-light">
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

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-charcoal-muted font-mono">
                      <span>{treatment.typical_duration_minutes} Minutes</span>
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
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone/30 mt-3 flex items-center justify-between gap-3">
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="text-xs font-semibold text-forest hover:text-champagne-dark underline"
                  >
                    View Details
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

          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 border border-stone px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-sage-light transition-colors"
            >
              <span>Browse All Services &amp; Starting Rates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Guided Treatment Discovery Tool (Interactive) */}
      <section className="py-10 sm:py-12 bg-ivory border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentDiscoveryTool />
        </div>
      </section>

      {/* 7. The Bioflora Approach & Clinical Process */}
      <section className="py-10 sm:py-12 bg-white border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
              The Journey
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
              The Bioflora Approach
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              We replace transactional procedures with a structured, clinician-guided journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-ivory/60 border border-stone p-6 rounded-2xl relative space-y-3">
              <span className="font-serif-luxury text-4xl text-champagne font-light">01</span>
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                Comprehensive Diagnostic
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We begin with multi-spectral digital skin imaging and kinetic muscle assessment to understand your baseline dermal architecture and unique facial dynamics.
              </p>
            </div>

            <div className="bg-ivory/60 border border-stone p-6 rounded-2xl relative space-y-3">
              <span className="font-serif-luxury text-4xl text-champagne font-light">02</span>
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                Tailored Treatment Blueprint
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Your board-certified doctor or senior nurse specialist designs an evidence-based roadmap outlining exact sessions, downtime, contraindications, and upfront costs.
              </p>
            </div>

            <div className="bg-ivory/60 border border-stone p-6 rounded-2xl relative space-y-3">
              <span className="font-serif-luxury text-4xl text-champagne font-light">03</span>
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                Subtle Precision &amp; Aftercare
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Treatments are performed with micro-dosed anatomical precision. You receive clinic-dispensed post-procedure recovery formulations and ongoing follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Meet The Clinical Team */}
      <section className="py-10 sm:py-12 bg-ivory border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
                Clinical Excellence
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal mt-1">
                Meet the Clinical Team
              </h2>
            </div>
            <Link
              href="/team"
              className="text-xs font-semibold uppercase tracking-widest text-forest hover:text-champagne-dark flex items-center gap-1.5"
            >
              <span>View All Provider Biographies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 sm:h-64 w-full relative overflow-hidden bg-stone-light">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={provider.photo_url}
                      alt={provider.full_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {provider.is_demonstration_profile && (
                      <span className="absolute bottom-3 left-3 bg-charcoal/80 text-ivory text-[9px] uppercase font-mono px-2 py-0.5 rounded">
                        Illustrative Profile
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif-luxury text-xl font-medium text-forest">
                      {provider.full_name}
                    </h3>
                    <p className="text-xs text-champagne-dark font-medium">
                      {provider.title}
                    </p>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed pt-2 line-clamp-3">
                      {provider.bio}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone/30 mt-3 flex items-center justify-between">
                  <Link
                    href={`/team/${provider.slug}`}
                    className="text-xs font-semibold text-forest hover:text-champagne-dark underline"
                  >
                    View Credentials
                  </Link>

                  <Link
                    href={`/booking?provider=${provider.slug}`}
                    className="text-xs font-medium text-charcoal-muted hover:text-forest"
                  >
                    Book with {provider.full_name.split(" ")[0]} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Verified Patient Proof & Experiences */}
      <section className="py-10 sm:py-12 bg-white border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
              Verified Feedback
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
              Patient Experiences
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Authentic reflections from clients who have experienced Bioflora&apos;s clinical care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-ivory/50 border border-stone p-6 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-champagne-dark">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="border-t border-stone/40 pt-4 text-xs">
                  <p className="font-semibold text-forest">{rev.author_name}</p>
                  <p className="text-charcoal-muted text-[11px] mt-0.5">
                    {rev.treatment_received} &bull; {rev.location_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Curated Sanctuary Gallery Preview */}
      <section className="py-10 sm:py-12 bg-ivory border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
                The Environment
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal mt-1">
                Treatment Sanctuaries
              </h2>
            </div>
            <Link
              href="/locations"
              className="text-xs font-semibold uppercase tracking-widest text-forest hover:text-champagne-dark flex items-center gap-1.5"
            >
              <span>Explore Locations &amp; Parking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone bg-stone-light relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="Beverly Hills clinical treatment suite with private lounge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-ivory font-serif-luxury text-lg">
                  Beverly Hills VIP Suite
                </span>
              </div>
            </div>

            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone bg-stone-light relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="Tribeca botanical waiting lounge with natural lighting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-ivory font-serif-luxury text-lg">
                  Tribeca Penthouse Atelier
                </span>
              </div>
            </div>

            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone bg-stone-light relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                alt="Sterile clinical preparation suite with FDA-cleared devices"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-ivory font-serif-luxury text-lg">
                  Sterile Clinical Prep Room
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Locations Quick Access */}
      <section className="py-10 sm:py-12 bg-white border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
              Flagship Sanctuaries
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
              Two Coastline Locations
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Designed for serene privacy, complete clinical sterility, and unhurried appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="luxury-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-sage px-2 py-0.5 rounded text-forest font-semibold">
                      {loc.is_flagship ? "Flagship Sanctuary" : "Boutique Atelier"}
                    </span>
                    <span className="text-xs text-charcoal-muted">{loc.city}, {loc.state}</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-medium text-forest">
                    {loc.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-charcoal-muted">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-champagne-dark shrink-0 mt-0.5" />
                      <span>{loc.address_line1}, {loc.address_line2 ? `${loc.address_line2}, ` : ""}{loc.city}, {loc.state} {loc.postal_code}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-champagne-dark shrink-0" />
                      <span>Mon–Fri: 9:00 AM – 6:30 PM &bull; Sat: 10:00 AM – 5:00 PM</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone/40">
                  <a
                    href={loc.map_query_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-forest underline hover:text-champagne-dark"
                  >
                    Directions &amp; Valet
                  </a>

                  <Link
                    href={`/booking?location=${loc.slug}`}
                    className="px-4 py-2 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Select Location
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Frequently Asked Questions (Accessible Accordion) */}
      <section className="py-10 sm:py-12 bg-ivory border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
              Clarity &amp; Policies
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Transparent answers regarding bookings, preparation, consultations, and our clinical protocols.
            </p>
          </div>

          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* 13. Final CTA Banner */}
      <section className="bg-forest text-ivory py-12 sm:py-14 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">
            Begin Your Care
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-ivory leading-tight">
            Reserve Your Personalized <br />
            <span className="italic">Clinical Assessment</span>
          </h2>

          <p className="text-xs sm:text-sm text-ivory/80 max-w-lg mx-auto leading-relaxed">
            Experience unhurried medical aesthetic curation. Choose your service or meet with our team for an evidence-based roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-champagne hover:bg-champagne-light text-forest px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-4 h-4 text-forest" />
              <span>Book Consultation Online</span>
            </Link>

            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-ivory/40 hover:bg-ivory/10 text-ivory px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
            >
              <span>Submit General Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
