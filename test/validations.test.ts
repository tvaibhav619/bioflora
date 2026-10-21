import { describe, it, expect } from "vitest";
import { consultationRequestSchema, bookingSubmissionSchema } from "../src/lib/validations/forms";

describe("Consultation Request Form Validation", () => {
  it("passes validation for complete and valid consultation input", () => {
    const validData = {
      fullName: "Clarissa Dupont",
      email: "clarissa@example.com",
      phone: "3105550198",
      preferredContactMethod: "email" as const,
      serviceInterest: "Neuromodulators & Dermal Sculpting",
      locationPreference: "Beverly Hills Flagship",
      preferredTimeWindow: "afternoon" as const,
      privacyConsent: true as const,
      marketingConsent: true,
    };

    const result = consultationRequestSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when privacy consent is not acknowledged", () => {
    const invalidData = {
      fullName: "Clarissa Dupont",
      email: "clarissa@example.com",
      phone: "3105550198",
      preferredContactMethod: "email" as const,
      serviceInterest: "Neuromodulators",
      locationPreference: "Beverly Hills Flagship",
      preferredTimeWindow: "afternoon" as const,
      privacyConsent: false, // Invalid
    };

    const result = consultationRequestSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.privacyConsent).toBeDefined();
    }
  });

  it("fails on invalid email or short name", () => {
    const invalidData = {
      fullName: "A",
      email: "not-an-email",
      phone: "123",
      preferredContactMethod: "phone" as const,
      serviceInterest: "Facials",
      locationPreference: "Tribeca",
      privacyConsent: true as const,
    };

    const result = consultationRequestSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Booking Submission Form Validation", () => {
  it("validates correct appointment slot booking payload", () => {
    const validBooking = {
      treatmentSlug: "botox-cosmetic",
      treatmentName: "Precision Neuromodulators",
      locationSlug: "beverly-hills",
      providerSlug: "dr-elena-vance",
      appointmentDate: "2026-11-15",
      timeSlot: "10:45 AM",
      patientName: "Julian Hayes",
      patientEmail: "julian@example.com",
      patientPhone: "2125550144",
    };

    const result = bookingSubmissionSchema.safeParse(validBooking);
    expect(result.success).toBe(true);
  });

  it("rejects invalid date format", () => {
    const invalidBooking = {
      treatmentSlug: "botox-cosmetic",
      treatmentName: "Precision Neuromodulators",
      locationSlug: "beverly-hills",
      providerSlug: "dr-elena-vance",
      appointmentDate: "15-11-2026", // Invalid format
      timeSlot: "10:45 AM",
      patientName: "Julian Hayes",
      patientEmail: "julian@example.com",
      patientPhone: "2125550144",
    };

    const result = bookingSubmissionSchema.safeParse(invalidBooking);
    expect(result.success).toBe(false);
  });
});
