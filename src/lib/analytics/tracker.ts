export type ValidFunnelEvent =
  | "consultation_views"
  | "consultation_starts"
  | "consultation_submits"
  | "booking_views"
  | "booking_step_1"
  | "booking_step_2"
  | "booking_step_3"
  | "booking_step_4"
  | "booking_step_5"
  | "booking_step_6"
  | "booking_confirmed";

export function trackFunnelEvent(event: ValidFunnelEvent): void {
  if (typeof window === "undefined") return;

  try {
    // Respect user cookie preferences: check if analytics consent is granted or not explicitly rejected
    const consentRaw = localStorage.getItem("bioflora_cookie_consent");
    if (consentRaw) {
      const consent = JSON.parse(consentRaw);
      if (consent.analytics === false) {
        // User opted out of analytics tracking
        return;
      }
    }

    // Fire non-blocking anonymous telemetry
    fetch("/api/analytics/funnel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
      keepalive: true,
    }).catch(() => {
      // Silently ignore telemetry transmission failures to not affect user experience
    });
  } catch (e) {
    // Suppress telemetry errors
  }
}
