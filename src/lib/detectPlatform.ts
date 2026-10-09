import type { PlatformId } from '../config/platforms';

export type DetectedPlatform = PlatformId | 'unknown';

interface NavigatorWithHints extends Navigator {
  userAgentData?: { platform?: string };
}

/** Best guess at the visitor's operating system; only used to preselect a download. */
export function detectPlatform(
  nav: NavigatorWithHints | undefined = globalThis.navigator,
): DetectedPlatform {
  if (!nav) return 'unknown';
  const hinted = (nav.userAgentData?.platform ?? '').toLowerCase();
  const userAgent = (nav.userAgent ?? '').toLowerCase();
  const combined = `${hinted} ${userAgent}`;

  if (/android/.test(combined)) return 'android';
  if (/iphone|ipad|ipod/.test(combined)) return 'ios';
  if (/win/.test(hinted) || /windows nt/.test(userAgent)) return 'windows';
  // iPadOS reports itself as a Mac; touch points tell them apart.
  if (/mac/.test(combined)) return nav.maxTouchPoints > 1 ? 'ios' : 'macos';
  if (/linux|x11|cros/.test(combined)) return 'linux';
  return 'unknown';
}

export const isMobilePlatform = (platform: DetectedPlatform): boolean =>
  platform === 'android' || platform === 'ios';
