export interface TimeSlot {
  id: string;
  time: string; // e.g. "09:30 AM"
  available: boolean;
  is_demonstration_slot: boolean;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

export interface BookingSubmission {
  treatmentSlug: string;
  treatmentName: string;
  locationSlug: string;
  providerSlug: string;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
  policyConsent?: boolean;
  isDemonstration?: boolean;
}

export interface BookingResult {
  success: boolean;
  referenceNumber: string;
  isDemonstration: boolean;
  message: string;
  details?: {
    treatmentName: string;
    appointmentDate: string;
    timeSlot: string;
    locationName: string;
    providerName: string;
  };
  error?: string;
}

export interface IBookingAdapter {
  getAvailability(
    serviceSlug: string,
    locationSlug: string,
    providerSlug: string,
    startDate: string,
    daysAhead?: number
  ): Promise<DayAvailability[]>;

  createBooking(submission: BookingSubmission): Promise<BookingResult>;

  cancelBooking(referenceNumber: string): Promise<boolean>;

  ping(): Promise<{ ok: boolean; message: string }>;
}
