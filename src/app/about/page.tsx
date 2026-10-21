import Link from "next/link";
import { ShieldCheck, Award, HeartHandshake, Compass, Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Bioflora | Philosophy & Clinical Standards",
  description:
    "Bioflora represents an uncompromising synthesis of academic dermatology, aesthetic artistry, and quiet botanical luxury.",
};

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Our Philosophy
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-forest leading-tight">
            Anatomical Precision. <br />
            <span className="italic font-light">Natural Aesthetic Restraint.</span>
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-xl mx-auto">
            Founded on the principle that aesthetic medicine should enhance your innate proportions rather than superimpose artificial uniformity.
          </p>
        </div>

        {/* Brand Story Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-stone shadow-xl bg-stone-light">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
              alt="Bioflora clinical sanctuary consultation room"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark font-mono">
              The Genesis
            </span>
            <h2 className="font-serif-luxury text-3xl text-forest font-medium">
              Where Medical Science Meets Serenity
            </h2>
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
              In an aesthetic industry frequently hurried by rapid transactional treatments and aggressive volume over-filling, Bioflora was created as an antidote. We believe the face is dynamic architecture.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Every procedure is curated under the rigorous guidance of board-certified dermatologists. We marry FDA-cleared technologies—from Sciton BBL to Morpheus8 radiofrequency—with clean botanical extracts that soothe the epidermal barrier.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
              Core Principles
            </span>
            <h2 className="font-serif-luxury text-3xl text-forest font-medium">
              Our Four Commitments to Care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
              <ShieldCheck className="w-6 h-6 text-champagne-dark" />
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                1. Physician Oversight Always
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                All clinical protocols, injectable formulations, and laser energy settings are established and overseen by board-certified medical doctors.
              </p>
            </div>

            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
              <Compass className="w-6 h-6 text-champagne-dark" />
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                2. Gradual, Restorative Interventions
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We favor cellular biostimulators (Sculptra) and fractional remodeling over excessive synthetic filler volumes to stimulate your own collagen.
              </p>
            </div>

            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
              <Award className="w-6 h-6 text-champagne-dark" />
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                3. Total Transparency
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Honest counseling regarding downtime, clinical risks, realistic outcomes, and published sample pricing. No hidden fees or surprise up-sells.
              </p>
            </div>

            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-3">
              <HeartHandshake className="w-6 h-6 text-champagne-dark" />
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                4. Private, Unhurried Sanctuaries
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Our suites in Beverly Hills and Tribeca feature staggered appointment schedules, private VIP exits, and dedicated concierge hospitality.
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Notice Banner */}
        <div className="p-6 bg-sage-light/60 rounded-2xl border border-sage text-xs text-charcoal-muted leading-relaxed space-y-2">
          <p className="font-semibold text-forest">
            Portfolio Demonstration Notice:
          </p>
          <p>
            Bioflora is a fictional demonstration brand created to showcase a gold-standard, production-ready website application for luxury medical spas. Staff profiles, clinical descriptions, and facility photos are curated for portfolio demonstration purposes.
          </p>
        </div>

        {/* Next Steps CTA */}
        <div className="text-center pt-4">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Meet Our Clinical Team</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
