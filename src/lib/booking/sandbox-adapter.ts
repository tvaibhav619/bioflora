import {
  IBookingAdapter,
  DayAvailability,
  TimeSlot,
  BookingSubmission,
  BookingResult,
} from "./types";
import { createSandboxBooking } from "@/lib/db/store";

export class SandboxBookingAdapter implements IBookingAdapter {
  private defaultHours = [
    "09:30 AM",
    "10:45 AM",
    "12:00 PM",
    "01:30 PM",
    "02:45 PM",
    "04:00 PM",
    "05:15 PM",
  ];

  async getAvailability(
    serviceSlug: string,
    locationSlug: string,
    providerSlug: string,
    startDateStr: string,
    daysAhead: number = 7
  ): Promise<DayAvailability[]> {
    const result: DayAvailability[] = [];
    const baseDate = new Date(startDateStr);

    for (let i = 0; i < daysAhead; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);

      // Skip Sundays (clinic is closed)
      if (d.getDay() === 0) {
        continue;
      }

      const dateStr = d.toISOString().split("T")[0];

      // Generate realistic slot availability (deterministic per date + provider)
      const slots: TimeSlot[] = this.defaultHours.map((time, idx) => {
        // Pseudo-random pattern based on date day + idx
        const isBooked = (d.getDate() + idx * 3) % 4 === 0;
        return {
          id: `slot-${dateStr}-${idx}`,
          time,
          available: !isBooked,
          is_demonstration_slot: true,
        };
      });

      result.push({
        date: dateStr,
        slots,
      });
    }

    return result;
  }

  async createBooking(submission: BookingSubmission): Promise<BookingResult> {
    try {
      const record = await createSandboxBooking({
        treatment_slug: submission.treatmentSlug,
        treatment_name: submission.treatmentName,
        location_slug: submission.locationSlug,
        provider_slug: submission.providerSlug,
        appointment_date: submission.appointmentDate,
        time_slot: submission.timeSlot,
        patient_name: submission.patientName,
        patient_email: submission.patientEmail,
        patient_phone: submission.patientPhone,
        status: "confirmed",
        is_sandbox: true,
        notes: submission.notes || "Demonstration Portfolio Booking",
      });

      return {
        success: true,
        referenceNumber: record.reference_number,
        isDemonstration: true,
        message:
          "Demonstration booking confirmed! This is an illustrative portfolio record saved in the database. No clinical appointment has been scheduled.",
        details: {
          treatmentName: submission.treatmentName,
          appointmentDate: submission.appointmentDate,
          timeSlot: submission.timeSlot,
          locationName: submission.locationSlug,
          providerName: submission.providerSlug,
        },
      };
    } catch (err) {
      console.error("Sandbox booking failed:", err);
      return {
        success: false,
        referenceNumber: "",
        isDemonstration: true,
        message: "Failed to persist sandbox booking record.",
        error: (err as Error).message,
      };
    }
  }

  async cancelBooking(referenceNumber: string): Promise<boolean> {
    // In sandbox, simulate successful cancellation
    return true;
  }

  async ping(): Promise<{ ok: boolean; message: string }> {
    return {
      ok: true,
      message: "Sandbox adapter active and healthy (mock provider response 0ms)",
    };
  }
}
