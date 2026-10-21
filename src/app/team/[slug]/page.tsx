import { notFound } from "next/navigation";
import Link from "next/link";
import { getProviderBySlug, getLocations, getTreatments } from "@/lib/db/store";
import { ArrowLeft, ShieldCheck, MapPin, Calendar, Award } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) return { title: "Provider Not Found" };

  return {
    title: `${provider.full_name} | Bioflora Clinical Leadership`,
    description: provider.bio,
  };
}

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const allLocations = await getLocations();
  const providerLocations = allLocations.filter((l) =>
    provider.locations.includes(l.slug)
  );

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Clinical Team</span>
        </Link>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone shadow-xl bg-stone-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={provider.photo_url}
                alt={provider.full_name}
                className="w-full h-full object-cover"
              />
            </div>

            {provider.is_demonstration_profile && (
              <div className="mt-4 p-3 bg-sage-light/60 border border-sage rounded-xl text-[11px] text-charcoal-muted leading-relaxed">
                <strong>Demonstration Profile:</strong> This profile represents an illustrative clinical practitioner for portfolio demonstration. Real credentials will be populated in Client Production Mode.
              </div>
            )}
          </div>

          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark font-mono">
                Practitioner Dossier
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-forest mt-1">
                {provider.full_name}
              </h1>
              <p className="text-sm font-medium text-champagne-dark mt-1">
                {provider.title}
              </p>
              <p className="text-xs text-charcoal-muted font-mono mt-1">
                {provider.credentials}
              </p>
              {provider.license_number && (
                <p className="text-xs text-forest font-mono mt-0.5">
                  {provider.license_number}
                </p>
              )}
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-charcoal leading-relaxed border-t border-stone/40 pt-4">
              <h3 className="font-serif-luxury text-lg text-forest font-medium">
                Clinical Biography &amp; Practice Focus
              </h3>
              <p>{provider.bio}</p>
            </div>

            <div className="space-y-3 border-t border-stone/40 pt-4">
              <h3 className="font-serif-luxury text-lg text-forest font-medium">
                Specialized Areas of Practice
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal">
                {provider.areas_of_practice.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-stone/40">
                    <Award className="w-3.5 h-3.5 text-champagne-dark shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t border-stone/40 pt-4">
              <h3 className="font-serif-luxury text-lg text-forest font-medium">
                Available Locations
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {providerLocations.map((loc) => (
                  <span
                    key={loc.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone rounded-lg text-forest font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5 text-champagne-dark" />
                    {loc.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/booking?provider=${provider.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <Calendar className="w-4 h-4 text-champagne" />
                <span>Book With {provider.full_name.split(" ")[0]}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
