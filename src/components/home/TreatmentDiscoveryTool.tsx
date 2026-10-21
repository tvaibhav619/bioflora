"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

interface QuestionStep {
  id: string;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
  }[];
}

const steps: QuestionStep[] = [
  {
    id: "primary_goal",
    question: "What is your primary aesthetic or skin wellness aspiration?",
    subtitle: "Select the area or quality you wish to address first.",
    options: [
      {
        label: "Fine Lines & Facial Softening",
        description: "Smooth forehead lines, crow's feet, and expression creases naturally.",
        value: "fine-lines-wrinkles",
      },
      {
        label: "Volume Restoration & Contouring",
        description: "Replenish midface volume, define the jawline, or enhance lip shape.",
        value: "volume-loss-contour",
      },
      {
        label: "Tone, Clarity & Sun Damage",
        description: "Clear stubborn hyperpigmentation, redness, or solar freckles.",
        value: "hyperpigmentation-sun-damage",
      },
      {
        label: "Skin Tightening & Firmness",
        description: "Improve laxity along the lower face, neck, and periorbital tissue.",
        value: "skin-laxity-elasticity",
      },
      {
        label: "Radiance & Deep Cellular Hydration",
        description: "Decongest pores, eliminate dullness, and revive skin barrier glow.",
        value: "dullness-dehydration",
      },
    ],
  },
  {
    id: "timeline",
    question: "What is your preferred recovery and downtime timeframe?",
    subtitle: "Every treatment has distinct recovery characteristics.",
    options: [
      {
        label: "Zero Downtime (Event Ready)",
        description: "Immediate glow with no visible redness; ideal before special occasions.",
        value: "zero",
      },
      {
        label: "Mild Downtime (24 to 48 Hours)",
        description: "Minimal pinkness or mild swelling easily concealed with mineral makeup.",
        value: "mild",
      },
      {
        label: "Deep Regenerative (3 to 5 Days)",
        description: "Intense structural remodeling where deeper cellular renewal is prioritized.",
        value: "deep",
      },
    ],
  },
];

const treatmentRecommendations: Record<
  string,
  {
    title: string;
    slug: string;
    category: string;
    description: string;
    downtime: string;
    image: string;
  }[]
> = {
  "fine-lines-wrinkles": [
    {
      title: "Precision Neuromodulators (Botox Cosmetic)",
      slug: "botox-cosmetic",
      category: "Neuromodulators",
      description: "Subtle vector micro-dosing to soften dynamic lines while preserving natural expressive animation.",
      downtime: "Near Zero (15-30 mins minor redness)",
      image: "/images/treatments/botox-cosmetic.jpg",
    },
    {
      title: "Morpheus8 RF Remodeling",
      slug: "rf-microneedling-morpheus",
      category: "Skin Rejuvenation",
      description: "Fractional radiofrequency delivering deep neocollagenesis to firm skin and smooth texture.",
      downtime: "2-4 days mild redness",
      image: "/images/treatments/rf-microneedling-morpheus.jpg",
    },
  ],
  "volume-loss-contour": [
    {
      title: "Sculptra PLLA Biostimulator",
      slug: "sculptra-biostimulator",
      category: "Biostimulators",
      description: "Gradual neocollagenesis that stimulates your fibroblasts to restore structural facial architecture.",
      downtime: "2-3 days minor tenderness",
      image: "/images/treatments/sculptra-biostimulator.jpg",
    },
    {
      title: "Micro-Cannula Lip Sculpting",
      slug: "restylane-kysse-lip-sculpting",
      category: "Dermal Fillers",
      description: "Flexible hyaluronic acid contouring prioritizing natural mucosal kinetics and vermilion definition.",
      downtime: "48-72 hours swelling",
      image: "/images/treatments/restylane-kysse-lip-sculpting.jpg",
    },
  ],
  "hyperpigmentation-sun-damage": [
    {
      title: "Sciton BBL HERO Photofacial",
      slug: "broadband-light-bbl-hero",
      category: "Phototherapy",
      description: "Dual-filtered broad-spectrum light that coagulates broken capillaries and clears solar lentigines.",
      downtime: "2-6 hours redness (pigment flakes in 5-7 days)",
      image: "/images/treatments/broadband-light-bbl-hero.jpg",
    },
  ],
  "skin-laxity-elasticity": [
    {
      title: "Morpheus8 Subdermal Remodeling",
      slug: "rf-microneedling-morpheus",
      category: "RF Microneedling",
      description: "Penetrates up to 4mm to heat the fibroseptal network and stimulate rapid tissue contraction.",
      downtime: "2-4 days moderate erythema",
      image: "/images/treatments/rf-microneedling-morpheus.jpg",
    },
  ],
  "dullness-dehydration": [
    {
      title: "Bioflora Botanical Hydrafacial",
      slug: "bioflora-signature-hydrafacial",
      category: "Clinical Facials",
      description: "Vortex vacuum extraction paired with low-molecular-weight hyaluronic acid and peptide saturation.",
      downtime: "Zero downtime (instant glass-skin glow)",
      image: "/images/treatments/bioflora-signature-hydrafacial.jpg",
    },
    {
      title: "NAD+ Longevity Infusion",
      slug: "nad-cellular-longevity-infusion",
      category: "Cellular Wellness",
      description: "Direct intravenous coenzyme replenishment to fuel mitochondrial repair and systemic vitality.",
      downtime: "Zero downtime",
      image: "/images/treatments/nad-cellular-longevity-infusion.jpg",
    },
  ],
};

export default function TreatmentDiscoveryTool() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = steps[currentStepIndex];

  const handleSelectOption = (value: string) => {
    if (currentStep.id === "primary_goal") {
      setSelectedGoal(value);
      setCurrentStepIndex(1);
    } else if (currentStep.id === "timeline") {
      setSelectedTimeline(value);
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedGoal(null);
    setSelectedTimeline(null);
    setIsCompleted(false);
  };

  const recommendations = selectedGoal
    ? treatmentRecommendations[selectedGoal] || treatmentRecommendations["fine-lines-wrinkles"]
    : [];

  return (
    <div className="bg-white border border-stone rounded-2xl shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone/50 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
            Guided Treatment Discovery
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-forest mt-1">
            Explore Personalized Treatment Options
          </h3>
        </div>

        {(selectedGoal || isCompleted) && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Explorer</span>
          </button>
        )}
      </div>

      {!isCompleted ? (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2 font-mono">
            <span>Step {currentStepIndex + 1} of 2</span>
            <span>{currentStep.id === "primary_goal" ? "Primary Goal" : "Downtime Tolerance"}</span>
          </div>

          <div className="w-full bg-sage-light h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-forest h-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / 2) * 100}%` }}
            />
          </div>

          <div>
            <h4 className="font-serif-luxury text-xl sm:text-2xl text-forest font-medium">
              {currentStep.question}
            </h4>
            <p className="text-xs text-charcoal-muted mt-1">{currentStep.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(opt.value)}
                className="text-left p-4 rounded-xl border border-stone bg-ivory/50 hover:bg-sage-light hover:border-forest transition-all duration-200 group focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-forest group-hover:text-champagne-dark">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone group-hover:text-forest transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-xs text-charcoal-muted mt-1.5 leading-relaxed">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-charcoal-muted border-t border-stone/40">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-forest" />
              Educational explorer &bull; No health details stored
            </span>
            <Link href="/treatments" className="text-forest underline hover:text-champagne-dark">
              Skip and browse catalogue &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6 animate-in fade-in duration-300">
          <div className="bg-sage-light/60 p-4 rounded-xl border border-sage flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div className="text-xs text-charcoal-muted leading-relaxed">
              <strong className="text-forest font-semibold">Educational Exploration Result:</strong> Based on your interest in addressing aesthetic goals with your preferred recovery pace, the following doctor-directed treatments serve as relevant starting points for your consultation.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {recommendations.map((rec) => (
              <div
                key={rec.slug}
                className="border border-stone rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-stone-light">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-forest/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {rec.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h5 className="font-serif-luxury text-lg font-semibold text-forest">
                      {rec.title}
                    </h5>
                    <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="mt-3 text-[11px] text-charcoal font-medium flex items-center gap-1">
                      <span className="text-champagne-dark font-semibold">Typical Recovery:</span>{" "}
                      {rec.downtime}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-3">
                  <Link
                    href={`/treatments/${rec.slug}`}
                    className="flex-1 text-center py-2 px-3 border border-forest text-forest rounded-lg text-xs font-semibold hover:bg-forest hover:text-ivory transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/booking?treatment=${rec.slug}`}
                    className="flex-1 text-center py-2 px-3 bg-forest text-ivory rounded-lg text-xs font-semibold hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone/40 text-xs">
            <span className="text-charcoal-muted">
              Individual suitability is determined during a one-on-one medical consultation.
            </span>
            <Link
              href="/treatments"
              className="text-forest underline font-semibold hover:text-champagne-dark"
            >
              View all treatments in catalogue &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
