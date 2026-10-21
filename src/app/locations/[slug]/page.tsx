import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocationBySlug, getTreatments, getProviders } from "@/lib/db/store";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Calendar, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return { title: "Location Not Found" };

  return {
    title: `${location.name} | Bioflora Medical Spa`,
    description: `Visit Bioflora's ${location.city} sanctuary located at ${location.address_line1}. Doctor-led aesthetic treatments.`,
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const [allTreatments, allProviders] = await Promise.all([
    getTreatments({ locationSlug: slug }),
    getProviders(),
  ]);

  const locationProviders = allProviders.filter((p) =>
    p.locations.includes(slug)
  );

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/locations"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Locations</span>
        </Link>

        {/* Hero */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            {location.is_flagship ? "Flagship Sanctuary" : "Boutique Atelier"}
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            {location.name}
          </h1>
          <p className="text-sm text-charcoal-muted">
            {location.address_line1}, {location.address_line2 ? `${location.address_line2}, ` : ""}{location.city}, {location.state} {location.postal_code}
          </p>
        </div>

        {/* Image & Quick Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-stone shadow-xl bg-stone-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={location.image_url}
                alt={location.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-5 bg-white border border-stone p-6 rounded-3xl shadow-sm space-y-5 text-xs text-charcoal">
            <h3 className="font-serif-luxury text-xl font-medium text-forest">
              Sanctuary Logistics
            </h3>

            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne-dark" />
                <a href={`tel:${location.phone}`} className="font-semibold hover:underline">
                  {location.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne-dark" />
                <a href={`mailto:${location.email}`} className="hover:underline">
                  {location.email}
                </a>
              </p>
              <div className="pt-2 border-t border-stone/30">
                <span className="font-semibold text-forest block mb-1">Hours of Care:</span>
                {location.hours.map((h, i) => (
                  <div key={i} className="text-charcoal-muted">
                    {h.days}: {h.hours}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone/30 space-y-2">
              <p>
                <strong className="text-forest">Valet &amp; Parking:</strong> {location.parking_info}
              </p>
              <p>
                <strong className="text-forest">Accessibility:</strong> {location.accessibility_info}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/booking?location=${location.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-champagne" />
                <span>Reserve At This Location</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Practitioners at this location */}
        <div className="space-y-6 pt-6 border-t border-stone/40">
          <h2 className="font-serif-luxury text-2xl text-forest font-medium">
            Clinical Practitioners at {location.city}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {locationProviders.map((p) => (
              <Link
                key={p.id}
                href={`/team/${p.slug}`}
                className="bg-white border border-stone rounded-2xl p-5 hover:border-champagne-dark transition-all group flex items-center gap-3.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photo_url}
                  alt={p.full_name}
                  className="w-14 h-14 rounded-full object-cover border border-stone"
                />
                <div>
                  <h4 className="font-serif-luxury text-base font-semibold text-forest group-hover:text-champagne-dark">
                    {p.full_name}
                  </h4>
                  <p className="text-[11px] text-charcoal-muted">{p.title.split("&")[0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
