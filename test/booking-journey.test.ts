import { describe, it, expect } from "vitest";
import { SandboxBookingAdapter } from "../src/lib/booking/sandbox-adapter";
import { getSandboxBookings } from "../src/lib/db/store";
import { sendBookingNotification } from "../src/lib/notifications/email";

describe("[P1] Complete Booking Journey, Duplicate Prevention & Notifications", () => {
  const adapter = new SandboxBookingAdapter();

  it("verifies availability step across dates and slots", async () => {
    const days = await adapter.getAvailability(
      "botox-cosmetic",
      "beverly-hills",
      "dr-elena-vance",
      "2026-12-01",
      5
    );

    expect(days.length).toBeGreaterThan(0);
    expect(days[0].slots.length).toBeGreaterThan(0);
    expect(days[0].slots[0].time).toBeDefined();
  });

  it("completes booking reservation and accurately persists record", async () => {
    const rand = Math.floor(Math.random() * 900000) + 100000;
    const uniqueEmail = `patient-${rand}@example.com`;
    const uniqueSlot = `09:${(rand % 50) + 10} AM`;
    const uniqueDate = `2028-05-${String((rand % 25) + 1).padStart(2, "0")}`;
    const booking = {
      treatmentSlug: "botox-cosmetic",
      treatmentName: "Precision Neuromodulators",
      locationSlug: "beverly-hills",
      providerSlug: "dr-elena-vance",
      appointmentDate: uniqueDate,
      timeSlot: uniqueSlot,
      patientName: "Gwen Stacy",
      patientEmail: uniqueEmail,
      patientPhone: "3105559988",
      policyConsent: true,
      notes: "First time visit",
    };

    const result = await adapter.createBooking(booking);
    expect(result.success).toBe(true);
    expect(result.referenceNumber).toContain("BIO-BKG-");
    expect(result.details?.treatmentName).toBe("Precision Neuromodulators");

    // Verify database persistence
    const all = await getSandboxBookings();
    const stored = all.find((b) => b.reference_number === result.referenceNumber);
    expect(stored).toBeDefined();
    expect(stored?.patient_email).toBe(uniqueEmail);
  });

  it("prevents duplicate bookings for the same slot and provider", async () => {
    const rand = Math.floor(Math.random() * 900000) + 100000;
    const uniqueDate = `2028-06-${String((rand % 25) + 1).padStart(2, "0")}`;
    const uniqueSlot = `11:${(rand % 50) + 10} AM`;

    // 1st booking
    const firstResult = await adapter.createBooking({
      treatmentSlug: "hydrafacial-platinum",
      treatmentName: "Botanical Hydrafacial",
      locationSlug: "tribeca",
      providerSlug: "sarah-lin",
      appointmentDate: uniqueDate,
      timeSlot: uniqueSlot,
      patientName: "Patient One",
      patientEmail: `p1-${rand}@example.com`,
      patientPhone: "2125550111",
      policyConsent: true,
    });
    expect(firstResult.success).toBe(true);

    // 2nd booking attempt for the exact same slot and provider
    const duplicateResult = await adapter.createBooking({
      treatmentSlug: "botox-cosmetic",
      treatmentName: "Precision Neuromodulators",
      locationSlug: "tribeca",
      providerSlug: "sarah-lin",
      appointmentDate: uniqueDate,
      timeSlot: uniqueSlot,
      patientName: "Patient Two",
      patientEmail: `p2-${rand}@example.com`,
      patientPhone: "2125550222",
      policyConsent: true,
    });

    expect(duplicateResult.success).toBe(false);
    expect(duplicateResult.error).toBe("DUPLICATE_BOOKING");
    expect(duplicateResult.message).toContain("already reserved");
  });


  it("dispatches booking confirmation notification safely in demonstration mode", async () => {
    const notif = await sendBookingNotification({
      referenceNumber: "BIO-BKG-2026-99999",
      recipientEmail: "client@example.com",
      recipientName: "Test Client",
      treatmentName: "Morpheus8 RF Remodeling",
      locationName: "Beverly Hills Flagship",
      appointmentDate: "2026-12-05",
      timeSlot: "02:45 PM",
      isDemonstration: true,
    });

    expect(notif.delivered).toBe(true);
    expect(notif.deliveryStatus).toBe("simulated");
    expect(notif.providerUsed).toContain("Sandbox");
  });
});
