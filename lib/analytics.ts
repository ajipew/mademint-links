import { siteConfig } from "@/config/site.config";

/**
 * Minimal, privacy-friendly analytics.
 *
 * No cookies, no personal data, no third-party script required.
 * Every call fires a `window` CustomEvent with a readable name
 * (e.g. "link_click", "facebook_click") so you can wire it up to
 * whatever you already use:
 *
 *   - Plausible: if `window.plausible` exists, we call it automatically.
 *   - Vercel Analytics / GA / PostHog: listen for the CustomEvent
 *     in your own script and forward it.
 *   - Nothing at all: events are still logged to the console in dev.
 *
 * To fully disable analytics, set `analytics.enabled: false` in
 * config/site.config.ts — every function below becomes a no-op.
 */

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: EventProps }) => void;
  }
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function trackEvent(eventName: string, props?: EventProps) {
  if (!siteConfig.analytics.enabled) return;
  if (typeof window === "undefined") return;

  // Forward to Plausible if it's loaded on the page.
  if (typeof window.plausible === "function") {
    window.plausible(eventName, props ? { props } : undefined);
  }

  // Always dispatch a native event so any analytics script can listen:
  //   window.addEventListener("linklanding:event", (e) => { ... e.detail })
  window.dispatchEvent(
    new CustomEvent("linklanding:event", {
      detail: { name: eventName, props: props ?? {}, ts: Date.now() },
    })
  );

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${eventName}`, props ?? {});
  }
}

/** Call once when the landing page mounts. */
export function trackPageView() {
  trackEvent("page_view", { page: "landing" });
}

/** Call when a link button is clicked. Fires both a generic and a specific event. */
export function trackLinkClick(title: string, url: string) {
  const slug = slugify(title);
  trackEvent("link_click", { title, url });
  trackEvent(`${slug}_click`, { url });
}
