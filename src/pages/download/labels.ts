import type { Architecture, DesktopPlatformId } from '../../config/platforms';

export const ARCHITECTURE_LABELS: Record<Architecture, string> = {
  x64: '64-bit (x64)',
  arm64: 'ARM64',
  universal: 'Apple silicon & Intel',
};

/** Shown under a platform's name when it lists no system requirements. */
export const PLATFORM_FALLBACK_SUMMARIES: Record<DesktopPlatformId, string> = {
  windows: 'For Windows PCs and laptops',
  macos: 'For Mac computers',
  linux: 'For desktop Linux',
};

/** The command that prints a file's SHA-256 checksum on each system. */
export const CHECKSUM_COMMANDS: Record<DesktopPlatformId, (fileName: string) => string> = {
  windows: (fileName) => `Get-FileHash .\\${fileName} -Algorithm SHA256`,
  macos: (fileName) => `shasum -a 256 ${fileName}`,
  linux: (fileName) => `sha256sum ${fileName}`,
};
