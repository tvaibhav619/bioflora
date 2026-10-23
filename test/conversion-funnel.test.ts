import { describe, it, expect } from "vitest";
import {
  getFunnelMetrics,
  recordFunnelEvent,
} from "../src/lib/db/store";

describe("[P3] Conversion Funnel & Privacy-Conscious Telemetry", () => {
  it("initializes and retrieves anonymous funnel counters", async () => {
    const metrics = await getFunnelMetrics();
    expect(metrics).toBeDefined();
    expect(typeof metrics.consultation_views).toBe("number");
    expect(typeof metrics.consultation_submits).toBe("number");
    expect(typeof metrics.booking_views).toBe("number");
    expect(typeof metrics.booking_confirmed).toBe("number");
  });

  it("increments funnel milestone counters upon user journey actions", async () => {
    const initial = await getFunnelMetrics();
    const countBefore = initial.consultation_views;

    const updated = await recordFunnelEvent("consultation_views");
    expect(updated.consultation_views).toBe(countBefore + 1);

    const bookingBefore = updated.booking_step_1;
    const afterStep1 = await recordFunnelEvent("booking_step_1");
    expect(afterStep1.booking_step_1).toBe(bookingBefore + 1);
  });
});
