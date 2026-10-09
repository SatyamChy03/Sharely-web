import { release, type ReleaseAssetKey } from './release';

export type DesktopPlatformId = 'windows' | 'macos' | 'linux';
export type MobilePlatformId = 'android' | 'ios';
export type PlatformId = DesktopPlatformId | MobilePlatformId;
export type PlatformStatus = 'released' | 'planned' | 'hidden';
export type Architecture = 'x64' | 'arm64' | 'universal';

export interface DownloadFormat {
  id: string;
  label: string;
  summary: string;
  arch?: Architecture;
  url: string | null;
  fileName?: string;
  sizeBytes?: number;
  sha256?: string | null;
  recommended?: boolean;
}

export interface DesktopPlatform {
  id: DesktopPlatformId;
  name: string;
  requirements: string | null;
  status: PlatformStatus;
  formats: DownloadFormat[];
}

export interface MobilePlatform {
  id: MobilePlatformId;
  name: string;
  storeLabel: string;
  status: PlatformStatus;
  url: string | null;
  requirements: string | null;
}

type FormatDetails = Omit<DownloadFormat, 'url' | 'fileName' | 'sizeBytes' | 'sha256'>;

function formatFromRelease(details: FormatDetails, assetKey?: ReleaseAssetKey): DownloadFormat {
  const asset = assetKey ? release.assets[assetKey] : undefined;
  if (!asset) return { ...details, url: null };
  return {
    ...details,
    url: asset.url,
    fileName: asset.fileName,
    sizeBytes: asset.sizeBytes,
    sha256: asset.sha256,
  };
}

function desktopPlatform(
  details: Omit<DesktopPlatform, 'status'>,
  status?: PlatformStatus,
): DesktopPlatform {
  const isPublished = details.formats.some(isFormatAvailable);
  return { ...details, status: status ?? (isPublished ? 'released' : 'planned') };
}

export const isFormatAvailable = (format: DownloadFormat): boolean =>
  typeof format.url === 'string' && format.url.length > 0;

export const hasDownload = (platform: DesktopPlatform): boolean =>
  platform.formats.some(isFormatAvailable);

const allDesktopPlatforms: DesktopPlatform[] = [
  desktopPlatform({
    id: 'windows',
    name: 'Windows',
    requirements: 'Windows 10 or later · 64-bit',
    formats: [
      formatFromRelease(
        {
          id: 'win-zip',
          label: 'Portable app (.zip)',
          summary: 'Unzip it anywhere and run sharely.exe. Nothing to install.',
          arch: 'x64',
          recommended: true,
        },
        'windowsZip',
      ),
    ],
  }),
  desktopPlatform({
    id: 'macos',
    name: 'macOS',
    requirements: null,
    formats: [
      formatFromRelease({
        id: 'mac-dmg',
        label: 'Disk image (.dmg)',
        summary: 'Drag Sharely into Applications.',
        arch: 'universal',
        recommended: true,
      }),
    ],
  }),
  desktopPlatform({
    id: 'linux',
    name: 'Linux',
    requirements: 'Ubuntu 22.04 or newer · 64-bit',
    formats: [
      formatFromRelease(
        {
          id: 'linux-deb',
          label: 'Debian package (.deb)',
          summary: 'For Ubuntu, Debian, Linux Mint and Pop!_OS. Adds Sharely to your app menu.',
          arch: 'x64',
          recommended: true,
        },
        'linuxDeb',
      ),
      formatFromRelease(
        {
          id: 'linux-tar',
          label: 'Portable archive (.tar.gz)',
          summary: 'For other distributions. Unpack it anywhere and run it.',
          arch: 'x64',
        },
        'linuxTar',
      ),
    ],
  }),
];

const androidApk = release.assets.androidApk;

const allMobilePlatforms: MobilePlatform[] = [
  {
    id: 'android',
    name: 'Android',
    storeLabel: 'APK download',
    status: androidApk ? 'released' : 'planned',
    url: androidApk?.url ?? null,
    requirements: 'Android 8 or later',
  },
  {
    id: 'ios',
    name: 'iPhone',
    storeLabel: 'App Store',
    status: 'hidden',
    url: null,
    requirements: null,
  },
];

export const desktopPlatforms = allDesktopPlatforms.filter(
  (platform) => platform.status !== 'hidden',
);

export const mobilePlatforms = allMobilePlatforms.filter(
  (platform) => platform.status !== 'hidden',
);

export const isDesktopPlatformId = (id: string | null): id is DesktopPlatformId =>
  desktopPlatforms.some((platform) => platform.id === id);

export const getDesktopPlatform = (id: string): DesktopPlatform =>
  desktopPlatforms.find((platform) => platform.id === id) ?? desktopPlatforms[0];

/** The format a "Download" button should offer first. */
export const getDefaultFormat = (platform: DesktopPlatform): DownloadFormat =>
  platform.formats.find((format) => format.recommended && isFormatAvailable(format)) ??
  platform.formats.find(isFormatAvailable) ??
  platform.formats.find((format) => format.recommended) ??
  platform.formats[0];
