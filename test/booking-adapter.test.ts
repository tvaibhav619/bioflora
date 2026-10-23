import { describe, it, expect } from "vitest";
import { SandboxBookingAdapter } from "../src/lib/booking/sandbox-adapter";

describe("Sandbox Booking Adapter", () => {
  const adapter = new SandboxBookingAdapter();

  it("generates availability across upcoming days skipping Sundays", async () => {
    const availability = await adapter.getAvailability(
      "botox-cosmetic",
      "beverly-hills",
      "dr-elena-vance",
      "2026-11-02",
      7
    );

    expect(availability.length).toBeGreaterThan(0);
    availability.forEach((day) => {
      const d = new Date(day.date + "T00:00:00");
      expect(d.getDay()).not.toBe(0); // No Sundays
      expect(day.slots.length).toBeGreaterThan(0);
      day.slots.forEach((slot) => {
        expect(slot.is_demonstration_slot).toBe(true);
      });
    });
  });

  it("creates and records a sandbox booking with a reference code", async () => {
    const timestamp = Date.now();
    const result = await adapter.createBooking({
      treatmentSlug: "botox-cosmetic",
      treatmentName: "Precision Neuromodulators",
      locationSlug: "beverly-hills",
      providerSlug: "dr-elena-vance",
      appointmentDate: "2026-11-20",
      timeSlot: `${(timestamp % 12) + 1}:00 PM`,
      patientName: "Sophia Loren",
      patientEmail: `sophia-${timestamp}@example.com`,
      patientPhone: "3105550190",
    });

    expect(result.success).toBe(true);

    expect(result.isDemonstration).toBe(true);
    expect(result.referenceNumber).toContain("BIO-BKG-");
  });

  it("responds successfully to health check ping", async () => {
    const pingRes = await adapter.ping();
    expect(pingRes.ok).toBe(true);
    expect(pingRes.message).toBeDefined();
  });
});
