"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Treatment, Location, Provider } from "@/lib/db/types";
import { DayAvailability } from "@/lib/booking/types";

interface BookingWizardClientProps {
  treatments: Treatment[];
  locations: Location[];
  providers: Provider[];
  initialTreatmentSlug?: string;
  initialLocationSlug?: string;
  initialProviderSlug?: string;
}

export default function BookingWizardClient({
  treatments,
  locations,
  providers,
  initialTreatmentSlug,
  initialLocationSlug,
  initialProviderSlug,
}: BookingWizardClientProps) {
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    initialTreatmentSlug || treatments[0]?.slug || ""
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    initialLocationSlug || locations[0]?.slug || ""
  );
  const [selectedProvider, setSelectedProvider] = useState<string>(
    initialProviderSlug || providers[0]?.slug || ""
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Contact info
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false);

  // States
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch slots when step 4 is reached or location/provider changes
  useEffect(() => {
    if (step === 4) {
      setLoadingAvailability(true);
      fetch(
        `/api/booking?service=${selectedTreatment}&location=${selectedLocation}&provider=${selectedProvider}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.availability) {
            setAvailability(data.availability);
            if (data.availability.length > 0) {
              setSelectedDate(data.availability[0].date);
            }
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingAvailability(false));
    }
  }, [step, selectedTreatment, selectedLocation, selectedProvider]);

  const currentTreatmentObj = treatments.find((t) => t.slug === selectedTreatment);
  const currentLocationObj = locations.find((l) => l.slug === selectedLocation);
  const currentProviderObj = providers.find((p) => p.slug === selectedProvider);

  const currentDaySlots =
    availability.find((d) => d.date === selectedDate)?.slots || [];

  const handleNextStep = () => {
    setErrorMessage(null);
    if (step === 1 && !selectedTreatment) {
      setErrorMessage("Please select a service or consultation.");
      return;
    }
    if (step === 2 && !selectedLocation) {
      setErrorMessage("Please select a clinic location.");
      return;
    }
    if (step === 3 && !selectedProvider) {
      setErrorMessage("Please select a provider.");
      return;
    }
    if (step === 4 && (!selectedDate || !selectedSlot)) {
      setErrorMessage("Please select an available appointment time slot.");
      return;
    }
    if (step === 5) {
      if (!patientName.trim() || !patientEmail.trim() || !patientPhone.trim()) {
        setErrorMessage("Please complete all required contact fields.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = async () => {
    if (!policyAccepted) {
      setErrorMessage("Please accept the 48-hour cancellation policy to proceed.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatmentSlug: selectedTreatment,
          treatmentName: currentTreatmentObj?.name || "Consultation",
          locationSlug: selectedLocation,
          providerSlug: selectedProvider,
          appointmentDate: selectedDate,
          timeSlot: selectedSlot,
          patientName,
          patientEmail,
          patientPhone,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingResult(data);
        setStep(7); // Confirmation
      } else {
        setErrorMessage(data.message || "Failed to confirm reservation.");
      }
    } catch (err) {
      setErrorMessage("Network error occurred while reserving appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-stone rounded-3xl shadow-sm overflow-hidden max-w-4xl mx-auto">
      {/* Top Wizard Step Tracker */}
      <div className="bg-forest text-ivory p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-champagne">
              Guided Reservation
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light mt-0.5">
              {step === 7 ? "Reservation Confirmed" : "Book Your Clinical Appointment"}
            </h2>
          </div>
          {step < 7 && (
            <span className="text-xs font-mono bg-ivory/10 px-3 py-1 rounded-full text-champagne">
              Step {step} of 6
            </span>
          )}
        </div>

        {step < 7 && (
          <div className="w-full bg-ivory/20 h-1.5 rounded-full overflow-hidden mt-6">
            <div
              className="bg-champagne h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Step Body */}
      <div className="p-6 sm:p-10">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-forest font-medium">
                1. Select Treatment or Clinical Consultation
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Choose a specific procedure or an initial comprehensive facial diagnostic.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {treatments.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTreatment(t.slug)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedTreatment === t.slug
                      ? "border-forest bg-sage-light/60 ring-1 ring-forest"
                      : "border-stone hover:bg-ivory/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-forest">{t.name}</span>
                    <span className="text-xs font-mono text-champagne-dark">
                      {t.typical_duration_minutes}m
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">
                    {t.summary}
                  </p>
                  <div className="mt-2 text-[11px] font-medium text-forest">
                    {t.price_amount ? (
                      <>
                        {t.price_type === "starting_at" ? "From " : ""}
                        ${t.price_amount}
                      </>
                    ) : (
                      "Consultation Required"
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Location Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-forest font-medium">
                2. Choose Your Sanctuary Location
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Select your preferred coast or boutique suite.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc.slug)}
                  className={`text-left p-5 rounded-2xl border transition-all ${
                    selectedLocation === loc.slug
                      ? "border-forest bg-sage-light/60 ring-1 ring-forest"
                      : "border-stone hover:bg-ivory/50"
                  }`}
                >
                  <div className="flex items-center gap-2 text-forest mb-2">
                    <MapPin className="w-4 h-4 text-champagne-dark" />
                    <span className="font-semibold text-sm">{loc.name}</span>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {loc.address_line1}, {loc.city}, {loc.state} {loc.postal_code}
                  </p>
                  <p className="text-[11px] text-forest font-medium mt-3">
                    Valet &amp; ADA Accessibility Available
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Provider Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-forest font-medium">
                3. Select Clinical Practitioner
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Choose a board-certified physician or senior aesthetic nurse injector.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {providers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProvider(p.slug)}
                  className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    selectedProvider === p.slug
                      ? "border-forest bg-sage-light/60 ring-1 ring-forest"
                      : "border-stone hover:bg-ivory/50"
                  }`}
                >
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photo_url}
                      alt={p.full_name}
                      className="w-16 h-16 rounded-full object-cover mb-3 border border-stone"
                    />
                    <h4 className="font-serif-luxury text-base font-semibold text-forest">
                      {p.full_name}
                    </h4>
                    <p className="text-[11px] text-champagne-dark font-medium mt-0.5">
                      {p.title.split("&")[0]}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone/30 text-[10px] text-charcoal-muted">
                    {p.credentials.split("|")[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Date & Slot Picker */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-forest font-medium">
                4. Select Date &amp; Appointment Time Slot
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Live availability loaded from clinical scheduling engine.
              </p>
            </div>

            {loadingAvailability ? (
              <div className="py-12 text-center text-xs text-charcoal-muted">
                Loading available clinical time slots...
              </div>
            ) : (
              <div className="space-y-6">
                {/* Date Chips */}
                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-2 font-mono">
                    Available Dates
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {availability.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(day.date);
                          setSelectedSlot("");
                        }}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-mono shrink-0 transition-all ${
                          selectedDate === day.date
                            ? "bg-forest text-ivory border-forest"
                            : "bg-ivory border-stone hover:border-forest text-charcoal"
                        }`}
                      >
                        <span className="block text-[10px] uppercase text-ivory/70">
                          {new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="font-bold">
                          {new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-2 font-mono">
                    Available Times for {selectedDate}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {currentDaySlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`py-3 px-3 rounded-xl border text-xs text-center transition-all ${
                          !slot.available
                            ? "bg-stone/20 text-stone-dark border-stone/30 cursor-not-allowed opacity-50"
                            : selectedSlot === slot.time
                            ? "bg-forest text-ivory border-forest font-semibold"
                            : "bg-white border-stone hover:border-forest text-charcoal"
                        }`}
                      >
                        {slot.time}
                        {slot.is_demonstration_slot && (
                          <span className="block text-[9px] text-champagne-dark mt-0.5">
                            Demonstration
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Patient Details */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-forest font-medium">
                5. Patient Information
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Enter your contact information for appointment confirmation.
              </p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Claire Dupont"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Telephone Number *
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="(310) 555-0199"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Special Notes or Focus (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Attending a wedding next month, first time treatment"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
                <span className="block text-[10px] text-charcoal-muted mt-1">
                  Please do not disclose medical history or prescription diagnoses here.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Policy Confirmation */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl text-forest font-medium">
                6. Review Appointment Details &amp; Policies
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Please verify your reservation details prior to confirmation.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-ivory border border-stone p-6 rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between border-b border-stone/40 pb-2">
                <span className="text-charcoal-muted">Procedure:</span>
                <span className="font-semibold text-forest">{currentTreatmentObj?.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone/40 pb-2">
                <span className="text-charcoal-muted">Sanctuary:</span>
                <span className="font-semibold text-forest">{currentLocationObj?.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone/40 pb-2">
                <span className="text-charcoal-muted">Clinician:</span>
                <span className="font-semibold text-forest">{currentProviderObj?.full_name}</span>
              </div>
              <div className="flex justify-between border-b border-stone/40 pb-2">
                <span className="text-charcoal-muted">Date &amp; Time:</span>
                <span className="font-semibold text-forest">
                  {selectedDate} at {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-muted">Patient:</span>
                <span className="font-semibold text-forest">
                  {patientName} ({patientEmail})
                </span>
              </div>
            </div>

            {/* Policy Checkbox */}
            <div className="p-4 bg-sage-light/60 rounded-xl border border-sage space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-charcoal leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  checked={policyAccepted}
                  onChange={(e) => setPolicyAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-forest"
                />
                <span>
                  I understand and accept Bioflora&apos;s <strong>48-Hour Cancellation Policy</strong> and agree that this reservation runs under <em>Portfolio Demonstration Mode</em> without committing an actual medical booking.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 7: Confirmation Screen */}
        {step === 7 && bookingResult && (
          <div className="text-center py-6 space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto text-forest">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase bg-champagne-light text-forest px-3 py-1 rounded-full font-semibold">
                Reference Code: {bookingResult.referenceNumber}
              </span>
              <h3 className="font-serif-luxury text-3xl text-forest font-medium mt-3">
                Appointment Reservation Recorded
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mt-2 leading-relaxed">
                {bookingResult.message}
              </p>
            </div>

            <div className="p-5 bg-ivory border border-stone rounded-2xl max-w-md mx-auto text-left text-xs space-y-2">
              <p>
                <strong className="text-forest">Service:</strong> {currentTreatmentObj?.name}
              </p>
              <p>
                <strong className="text-forest">Location:</strong> {currentLocationObj?.name}
              </p>
              <p>
                <strong className="text-forest">Practitioner:</strong> {currentProviderObj?.full_name}
              </p>
              <p>
                <strong className="text-forest">Scheduled Slot:</strong> {selectedDate} at {selectedSlot}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="/treatments"
                className="px-6 py-2.5 border border-forest text-forest rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest hover:text-ivory transition-colors"
              >
                Browse Other Treatments
              </Link>
              <Link
                href="/admin"
                className="px-6 py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-dark transition-colors shadow-sm"
              >
                Inspect in Admin Portal
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        {step < 7 && (
          <div className="pt-8 border-t border-stone/40 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone rounded-full text-xs font-semibold text-charcoal hover:bg-ivory transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitBooking}
                className="inline-flex items-center gap-2 px-8 py-3 bg-champagne hover:bg-champagne-light text-forest rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-md disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? "Processing..." : "Confirm Reservation"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
