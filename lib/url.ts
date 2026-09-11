/**
 * Basic outbound-link safety helpers.
 */

const SAFE_PROTOCOLS = ["https:", "http:", "mailto:", "tel:", "sms:"];

/** Returns true if a URL uses an allowed protocol and parses correctly. */
export function isSafeUrl(url: string): boolean {
  try {
    // Relative paths (e.g. "/privacy") are always fine.
    if (url.startsWith("/")) return true;
    const parsed = new URL(url);
    return SAFE_PROTOCOLS.includes(parsed.protocol);
  } catch {
    return false;
  }
}

/** True for links that should open in a new tab (external http/https links). */
export function isExternalLink(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
