// These integrations need page locations, never query values or form contents.
export function redactMonitoringUrl<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    url.search = "";
    url.hash = "";
    url.username = "";
    url.password = "";
    return { ...event, url: url.href };
  } catch {
    return null;
  }
}
