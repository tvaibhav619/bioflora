import Link from "next/link";
import { getMemberships } from "@/lib/db/store";
import { Crown, CheckCircle2, ShieldCheck, Sparkles, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Flora Society VIP Memberships | Bioflora",
  description:
    "Join The Flora Society for bespoke monthly facial curation, priority reservations, and preferred pricing on all injectables and retail homecare.",
};

export default async function MembershipsPage() {
  const memberships = await getMemberships();

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            VIP Wellness Curation
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            The Flora Society
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Consistent monthly maintenance engineered for sustained barrier vitality, preventative collagen preservation, and dedicated concierge access.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {memberships.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.tier_level === 2
                  ? "bg-forest text-ivory shadow-xl ring-2 ring-champagne scale-105 relative"
                  : "bg-white border border-stone text-charcoal shadow-sm"
              }`}
            >
              {tier.tier_level === 2 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-champagne text-forest text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Most Preferred
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider font-mono ${
                      tier.tier_level === 2 ? "text-champagne" : "text-champagne-dark"
                    }`}
                  >
                    Tier 0{tier.tier_level}
                  </span>
                  <h2
                    className={`font-serif-luxury text-2xl font-medium mt-1 ${
                      tier.tier_level === 2 ? "text-ivory" : "text-forest"
                    }`}
                  >
                    {tier.name}
                  </h2>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      tier.tier_level === 2 ? "text-ivory/80" : "text-charcoal-muted"
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-current/20">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif-luxury text-4xl font-semibold">
                      ${tier.price_monthly}
                    </span>
                    <span className="text-xs opacity-75">/ month</span>
                  </div>
                </div>

                {/* Included Treatments */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    Included Every Month:
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {tier.included_monthly_treatments.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            tier.tier_level === 2 ? "text-champagne" : "text-forest"
                          }`}
                        />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perks */}
                <div className="space-y-2 pt-2 border-t border-current/20">
                  <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    Exclusive Privileges:
                  </h3>
                  <ul className="space-y-1.5 text-xs opacity-85">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-champagne">&bull;</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-current/20 mt-6 space-y-3">
                <Link
                  href={`/consultation?membership=${tier.slug}`}
                  className={`w-full inline-flex items-center justify-center py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm ${
                    tier.tier_level === 2
                      ? "bg-champagne hover:bg-champagne-light text-forest"
                      : "bg-forest hover:bg-forest-dark text-ivory"
                  }`}
                >
                  Inquire For Membership
                </Link>

                <p className="text-[10px] text-center opacity-70">
                  30-day cancellation notice &bull; Non-transferable credits
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Policies & FAQ Notice */}
        <div className="bg-white border border-stone p-6 sm:p-8 rounded-3xl shadow-sm space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-forest">
            <ShieldCheck className="w-5 h-5 text-champagne-dark" />
            <h3 className="font-serif-luxury text-xl font-medium">
              Membership Terms &amp; Clinical Governance
            </h3>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            All memberships require a clinical suitability review by an authorized provider to ensure chosen monthly treatments match your skin barrier tolerance. Unused monthly service credits roll over in accordance with specific tier terms. Memberships may be paused or cancelled with 30 days written notice to our concierge team.
          </p>
        </div>
      </div>
    </div>
  );
}
