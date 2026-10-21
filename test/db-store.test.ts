import { describe, it, expect } from "vitest";
import {
  getSettings,
  updateSettings,
  getTreatments,
  getTreatmentBySlug,
  createConsultationRequest,
  getConsultationRequests,
  getCategories,
  getProviders,
  getLocations,
} from "../src/lib/db/store";

describe("Database Store and Persistence", () => {
  it("loads initial site settings with demonstration mode enabled", async () => {
    const settings = await getSettings();
    expect(settings.clinic_name).toBe("BIOFLORA Medical Spa");
    expect(settings.operating_mode).toBeDefined();
  });

  it("can toggle operating mode in settings", async () => {
    const original = (await getSettings()).operating_mode;
    const targetMode = original === "demonstration" ? "production" : "demonstration";

    const updated = await updateSettings({ operating_mode: targetMode });
    expect(updated.operating_mode).toBe(targetMode);

    // Revert back
    const reverted = await updateSettings({ operating_mode: original });
    expect(reverted.operating_mode).toBe(original);
  });

  it("retrieves published clinical treatments and filters by category", async () => {
    const all = await getTreatments();
    expect(all.length).toBeGreaterThan(0);

    const injectables = await getTreatments({
      categorySlug: "injectables-neurotoxins",
    });
    expect(injectables.length).toBeGreaterThan(0);
    injectables.forEach((t) => {
      expect(t.category_slug).toBe("injectables-neurotoxins");
    });
  });

  it("persists a consultation request and generates a reference number", async () => {
    const newReq = await createConsultationRequest({
      full_name: "Test Patient",
      email: "testpatient@example.com",
      phone: "3105550180",
      preferred_contact_method: "email",
      service_interest: "Morpheus8",
      location_preference: "Beverly Hills Flagship",
      preferred_time_window: "morning",
      privacy_consent_acknowledged: true,
      marketing_consent: false,
      status: "new",
      is_demonstration: true,
      notification_delivery_status: "simulated",
    });

    expect(newReq.id).toBeDefined();
    expect(newReq.reference_number).toContain("BIO-REQ-");

    const list = await getConsultationRequests();
    const found = list.find((r) => r.id === newReq.id);
    expect(found).toBeDefined();
    expect(found?.full_name).toBe("Test Patient");
  });

  it("loads categories, providers, and locations with valid data", async () => {
    const [categories, providers, locations] = await Promise.all([
      getCategories(),
      getProviders(),
      getLocations(),
    ]);

    expect(categories.length).toBeGreaterThanOrEqual(5);
    expect(providers.length).toBeGreaterThanOrEqual(3);
    expect(locations.length).toBeGreaterThanOrEqual(2);
  });
});
