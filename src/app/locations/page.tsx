import Link from "next/link";
import { getLocations } from "@/lib/db/store";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Sanctuary Locations & Directions | Bioflora",
  description:
    "Visit Bioflora's clinical sanctuaries in Beverly Hills and Tribeca. Valet parking, ADA accessibility, and private treatment suites.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Our Sanctuaries
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Clinic Locations &amp; Directions
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Thoughtfully designed treatment suites engineered for patient privacy, absolute clinical sterility, and restorative calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white border border-stone rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-72 w-full relative overflow-hidden bg-stone-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.image_url}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-forest/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    {loc.is_flagship ? "Flagship Sanctuary" : "Boutique Atelier"}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div>
                    <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-forest">
                      {loc.name}
                    </h2>
                    <p className="text-xs text-charcoal-muted mt-1">
                      {loc.address_line1}, {loc.address_line2 ? `${loc.address_line2}, ` : ""}{loc.city}, {loc.state} {loc.postal_code}
                    </p>
                  </div>

                  <div className="space-y-3 text-xs text-charcoal border-t border-stone/40 pt-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-champagne-dark" />
                      <a href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`} className="hover:underline font-semibold">
                        {loc.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-champagne-dark" />
                      <a href={`mailto:${loc.email}`} className="hover:underline">
                        {loc.email}
                      </a>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <Clock className="w-4 h-4 text-champagne-dark shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        {loc.hours.map((h, i) => (
                          <div key={i}>
                            <strong>{h.days}:</strong> {h.hours}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-ivory rounded-xl border border-stone/50 text-xs text-charcoal-muted space-y-2">
                    <p>
                      <strong className="text-forest">Parking &amp; Valet:</strong> {loc.parking_info}
                    </p>
                    <p>
                      <strong className="text-forest">Accessibility:</strong> {loc.accessibility_info}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-stone/30 mt-4 flex items-center justify-between gap-4">
                <a
                  href={loc.map_query_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-forest underline hover:text-champagne-dark flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps &amp; Directions</span>
                </a>

                <Link
                  href={`/booking?location=${loc.slug}`}
                  className="px-6 py-2.5 bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold rounded-full uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book In {loc.city}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
