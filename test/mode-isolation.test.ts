import { describe, it, expect } from "vitest";
import {
  getServerAuthoritativeMode,
  guardPaymentProcessing,
} from "../src/lib/security/mode-isolation";
import { getSettings, updateSettings } from "../src/lib/db/store";

describe("[P0] Demo / Production Mode Isolation", () => {

  it("authoritatively retrieves mode from server settings", async () => {
    const policy = await getServerAuthoritativeMode();
    expect(policy.currentMode).toBeDefined();
    expect(policy.isDemonstration).toBe(policy.currentMode === "demonstration");
    expect(policy.isProduction).toBe(policy.currentMode === "production");
  });

  it("strictly blocks live monetary payments in demonstration mode", async () => {
    const originalSettings = await getSettings();
    await updateSettings({ operating_mode: "demonstration" });

    const paymentAttempt = await guardPaymentProcessing({
      amountCents: 50000,
      paymentMethodId: "pm_card_visa",
      isLiveRequested: true,
    });

    expect(paymentAttempt.allowed).toBe(false);
    expect(paymentAttempt.reason).toContain("Demonstration Isolation Enforcement");

    await updateSettings({ operating_mode: originalSettings.operating_mode });
  });

  it("prohibits unconfigured Stripe gateway in production mode", async () => {
    const originalSettings = await getSettings();
    await updateSettings({ operating_mode: "production", stripe_configured: false });

    const paymentAttempt = await guardPaymentProcessing({
      amountCents: 50000,
      paymentMethodId: "pm_card_visa",
      isLiveRequested: true,
    });

    expect(paymentAttempt.allowed).toBe(false);
    expect(paymentAttempt.reason).toContain("Production Gateway Unconfigured");

    await updateSettings({
      operating_mode: originalSettings.operating_mode,
      stripe_configured: originalSettings.stripe_configured,
    });
  });
});

