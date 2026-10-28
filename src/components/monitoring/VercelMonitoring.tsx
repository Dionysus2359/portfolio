"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { redactMonitoringUrl } from "@/lib/monitoring";

export function VercelMonitoring() {
  return (
    <>
      <Analytics beforeSend={redactMonitoringUrl} />
      <SpeedInsights beforeSend={redactMonitoringUrl} />
    </>
  );
}
