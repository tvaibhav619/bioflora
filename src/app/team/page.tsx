import Link from "next/link";
import { getProviders } from "@/lib/db/store";
import { ShieldCheck, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Clinical Team & Medical Practitioners | Bioflora",
  description:
    "Meet Bioflora's board-certified medical director and aesthetic nurse specialists. Master injectors dedicated to natural anatomical precision.",
};

export default async function TeamPage() {
  const providers = await getProviders();

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Clinical Leadership
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Meet Our Practitioners
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Every injectable and laser treatment at Bioflora is performed by certified medical professionals with rigorous academic training and aesthetic restraint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {providers.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-80 w-full relative overflow-hidden bg-stone-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo_url}
                    alt={p.full_name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {p.is_demonstration_profile && (
                    <span className="absolute bottom-3 left-3 bg-charcoal/80 text-ivory text-[9px] uppercase font-mono px-2 py-0.5 rounded">
                      Illustrative Profile
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="font-serif-luxury text-2xl font-medium text-forest">
                    {p.full_name}
                  </h2>
                  <p className="text-xs text-champagne-dark font-medium">
                    {p.title}
                  </p>
                  <p className="text-xs text-charcoal-muted font-mono">
                    {p.credentials.split("|")[0]}
                  </p>
                  <p className="text-xs text-charcoal leading-relaxed pt-2 line-clamp-3">
                    {p.bio}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block mb-1">
                      Areas of Practice:
                    </span>
                    <ul className="text-xs text-charcoal space-y-1">
                      {p.areas_of_practice.slice(0, 3).map((area, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-champagne-dark">&bull;</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone/30 mt-4 flex items-center justify-between">
                <Link
                  href={`/team/${p.slug}`}
                  className="text-xs font-semibold text-forest underline hover:text-champagne-dark"
                >
                  Full Biography &rarr;
                </Link>

                <Link
                  href={`/booking?provider=${p.slug}`}
                  className="px-4 py-2 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book with {p.full_name.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
