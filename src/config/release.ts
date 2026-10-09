import releaseData from './release.json';

export type ReleaseAssetKey = 'windowsZip' | 'linuxDeb' | 'linuxTar' | 'androidApk';

export interface ReleaseAsset {
  fileName: string;
  url: string;
  sizeBytes: number;
  sha256: string | null;
}

export interface Release {
  version: string | null;
  date: string | null;
  changelogUrl: string | null;
  prerelease: boolean;
  assets: Partial<Record<ReleaseAssetKey, ReleaseAsset>>;
}

/** The newest published build, written by `npm run sync-release`. */
export const release: Release = releaseData;

/** The tag as file names carry it, or a placeholder before the first release. */
export const versionLabel = release.version ?? '<version>';
