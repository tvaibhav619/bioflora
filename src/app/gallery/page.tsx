import Link from "next/link";
import { ShieldAlert, Sparkles, Camera, Eye, Calendar } from "lucide-react";

export const metadata = {
  title: "Sanctuary Environments & Gallery | Bioflora",
  description:
    "Explore Bioflora's clinical suites, FDA-cleared aesthetic technologies, and private botanical treatment environments in Beverly Hills and Tribeca.",
};

export default function GalleryPage() {
  const images = [
    {
      title: "Beverly Hills Main Treatment Suite",
      category: "Sanctuary Interior",
      description: "Ergonomic medical treatment table with ambient biophilic lighting and botanical soundscapes.",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Tribeca Penthouse Private Reception",
      category: "Sanctuary Interior",
      description: "Quiet arrivals lounge designed with natural limestone, white oak, and private waiting alcoves.",
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Sterile Procedure Preparation Lounge",
      category: "Clinical Environment",
      description: "Medical-grade sterilization and cross-polarized skin imaging diagnostic station.",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Botanical Hydrafacial Suite",
      category: "Procedure Suites",
      description: "Vortex hydro-dermabrasion and medical LED photomodulation setup.",
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Cellular Longevity & IV Lounge",
      category: "Wellness Suite",
      description: "Restorative infusion loungers with heated organic blankets and vital monitoring.",
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Aesthetic Laser Calibration Bay",
      category: "Technology",
      description: "Chilled Sciton BBL HERO and Morpheus8 fractional RF workstations.",
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Visual Architecture
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Sanctuary Environments
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            A visual glimpse into Bioflora&apos;s clean clinical sanctuaries, FDA-cleared technologies, and private consultation rooms.
          </p>
        </div>

        {/* Clinical Safeguard Notice */}
        <div className="bg-sage-light/70 border border-sage p-5 rounded-2xl max-w-3xl mx-auto flex items-start gap-3.5 text-xs text-charcoal-muted leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-forest shrink-0 mt-0.5" />
          <div>
            <strong className="text-forest block mb-0.5">Clinical Imagery &amp; Patient Privacy Safeguard:</strong>
            Bioflora strictly upholds patient medical confidentiality and does not publish unverified stock photographs as actual patient outcomes. Before-and-after clinical photographic documentation is presented exclusively during private in-office medical consultations with documented patient consent.
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((item, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="h-64 w-full relative overflow-hidden bg-stone-light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-forest/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif-luxury text-xl font-medium text-forest">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-champagne" />
            <span>Tour Our Sanctuaries In Person</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
