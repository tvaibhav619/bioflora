import Link from "next/link";
import { getOffers } from "@/lib/db/store";
import { Sparkles, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Seasonal Offers & Packages | Bioflora",
  description:
    "Explore approved clinical packages and first-time patient diagnostic experiences with clear terms and transparent pricing.",
};

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Approved Curation
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Packages &amp; Special Experiences
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Every clinical package is designed around biological timelines for sustained collagen synthesis and deep tissue remodeling.
          </p>
        </div>

        <div className="space-y-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white border border-stone rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row justify-between gap-8"
            >
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-champagne-light text-forest px-2.5 py-0.5 rounded border border-champagne/40">
                    {offer.category === "first_time" ? "New Patient Special" : "Clinical Series"}
                  </span>
                  {offer.savings_display && (
                    <span className="text-[10px] font-mono text-champagne-dark font-semibold">
                      {offer.savings_display}
                    </span>
                  )}
                </div>

                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-forest">
                  {offer.title}
                </h2>

                <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                  {offer.description}
                </p>

                <div className="pt-2">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted mb-1.5">
                    Package Terms &amp; Eligibility:
                  </h3>
                  <ul className="text-xs text-charcoal-muted space-y-1">
                    {offer.terms.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-champagne-dark">&bull;</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone/40 pt-4 md:pt-0 md:pl-8 space-y-4">
                <div>
                  <span className="text-[10px] uppercase text-charcoal-muted font-mono block">
                    Package Price
                  </span>
                  <span className="font-serif-luxury text-3xl font-semibold text-forest block mt-0.5">
                    {offer.price_display}
                  </span>
                  {offer.valid_until && (
                    <span className="text-[10px] text-charcoal-muted block mt-1">
                      Valid through: {offer.valid_until}
                    </span>
                  )}
                </div>

                <Link
                  href={offer.booking_link}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-champagne" />
                  <span>Reserve Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
