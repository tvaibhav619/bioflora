import { IBookingAdapter } from "./types";
import { SandboxBookingAdapter } from "./sandbox-adapter";
import { getSettings } from "@/lib/db/store";

export async function getActiveBookingAdapter(): Promise<{
  adapter: IBookingAdapter;
  mode: "demonstration" | "production";
  providerName: string;
  isLiveConfigured: boolean;
}> {
  const settings = await getSettings();
  const isDemo = settings.operating_mode === "demonstration";

  if (isDemo || !settings.booking_provider_configured) {
    return {
      adapter: new SandboxBookingAdapter(),
      mode: isDemo ? "demonstration" : "production",
      providerName: isDemo ? "Sandbox Demonstration Engine" : "Unconfigured Live Provider",
      isLiveConfigured: settings.booking_provider_configured,
    };
  }

  // When live provider credentials are provided, return live adapter here.
  // Default fallback for safe demonstration:
  return {
    adapter: new SandboxBookingAdapter(),
    mode: "demonstration",
    providerName: "Sandbox Demonstration Engine",
    isLiveConfigured: false,
  };
}
