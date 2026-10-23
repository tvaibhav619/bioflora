import { getSettings } from "@/lib/db/store";
import { OperatingMode } from "@/lib/db/types";

export interface ModeIsolationPolicy {
  currentMode: OperatingMode;
  isDemonstration: boolean;
  isProduction: boolean;
  canProcessLivePayment: boolean;
  canDispatchLiveEmail: boolean;
  canBookLivePractitioner: boolean;
}

/**
 * Returns the authoritative server-side mode isolation policy.
 * Mode is governed solely by the server database configuration and cannot
 * be altered or overridden by client payloads or HTTP headers.
 */
export async function getServerAuthoritativeMode(): Promise<ModeIsolationPolicy> {
  const settings = await getSettings();
  const currentMode: OperatingMode = settings.operating_mode || "demonstration";
  const isDemonstration = currentMode === "demonstration";

  return {
    currentMode,
    isDemonstration,
    isProduction: !isDemonstration,
    // Live payments strictly blocked in demo mode
    canProcessLivePayment: !isDemonstration && settings.stripe_configured === true,
    // Live emails blocked in demo mode (simulated instead)
    canDispatchLiveEmail: !isDemonstration && settings.email_provider_configured === true,
    // Live scheduling provider blocked in demo mode
    canBookLivePractitioner: !isDemonstration && settings.booking_provider_configured === true,
  };
}

/**
 * Validates that live payment attempts are never processed in demonstration mode.
 * Throws or returns an error response if client attempts real payment in demo mode.
 */
export async function guardPaymentProcessing(paymentAttempt: {
  amountCents?: number;
  paymentMethodId?: string;
  isLiveRequested?: boolean;
}): Promise<{ allowed: boolean; reason?: string }> {
  const policy = await getServerAuthoritativeMode();

  if (policy.isDemonstration) {
    return {
      allowed: false,
      reason:
        "Demonstration Isolation Enforcement: Live monetary transactions and payment captures are strictly prohibited while Bioflora operates in portfolio demonstration mode.",
    };
  }

  if (!policy.canProcessLivePayment) {
    return {
      allowed: false,
      reason:
        "Production Gateway Unconfigured: Stripe merchant credentials are not currently configured in the clinic settings.",
    };
  }

  return { allowed: true };
}
