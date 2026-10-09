// Writes src/config/release.json from the newest GitHub release of the app,
// so the download buttons point at real files. Runs before every build.
//
// A failed lookup keeps the file as it is, so an offline build still works.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const REPO = process.env.SHARELY_REPO ?? 'SatyamChy03/Sharely';
const OUTPUT = fileURLToPath(new URL('../src/config/release.json', import.meta.url));
const DOWNLOAD_PREFIX = `https://github.com/${REPO}/releases/download/`;

/** Asset key in release.json → the file name ending the release workflow uses. */
const ASSET_SUFFIXES = {
  windowsZip: '-windows.zip',
  linuxDeb: '-linux-amd64.deb',
  linuxTar: '-linux-x64.tar.gz',
  androidApk: '-android.apk',
};

const EMPTY_RELEASE = {
  version: null,
  date: null,
  changelogUrl: null,
  prerelease: false,
  assets: {},
};

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'sharely-web' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function fetchReleases() {
  const response = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`, {
    headers: githubHeaders(),
  });
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
  return response.json();
}

function matchAssets(release) {
  const matched = {};
  for (const [key, suffix] of Object.entries(ASSET_SUFFIXES)) {
    const asset = release.assets.find(
      (candidate) =>
        candidate.name.startsWith('sharely-') &&
        candidate.name.endsWith(suffix) &&
        candidate.browser_download_url.startsWith(DOWNLOAD_PREFIX),
    );
    if (asset) matched[key] = asset;
  }
  return matched;
}

/** Reads "<hash>  <file>" lines from the release's SHA256SUMS.txt. */
async function fetchChecksums(release) {
  const sums = release.assets.find((asset) => asset.name === 'SHA256SUMS.txt');
  if (!sums) return new Map();
  const response = await fetch(sums.browser_download_url);
  if (!response.ok) return new Map();
  const lines = (await response.text()).split('\n');
  const pairs = lines
    .map((line) => line.trim().match(/^([0-9a-f]{64})\s+\*?(.+)$/i))
    .filter(Boolean)
    .map((match) => [match[2], match[1].toLowerCase()]);
  return new Map(pairs);
}

function checksumOf(asset, checksums) {
  const fromFile = checksums.get(asset.name);
  if (fromFile) return fromFile;
  const digest = typeof asset.digest === 'string' ? asset.digest : '';
  return digest.startsWith('sha256:') ? digest.slice('sha256:'.length) : null;
}

async function describeRelease(release, matched) {
  const checksums = await fetchChecksums(release);
  const assets = {};
  for (const [key, asset] of Object.entries(matched)) {
    assets[key] = {
      fileName: asset.name,
      url: asset.browser_download_url,
      sizeBytes: asset.size,
      sha256: checksumOf(asset, checksums),
    };
  }
  return {
    version: release.tag_name,
    date: (release.published_at ?? release.created_at ?? '').slice(0, 10) || null,
    changelogUrl: release.html_url,
    prerelease: Boolean(release.prerelease),
    assets,
  };
}

async function findLatestRelease() {
  const releases = await fetchReleases();
  for (const release of releases) {
    if (release.draft) continue;
    const matched = matchAssets(release);
    if (Object.keys(matched).length > 0) return describeRelease(release, matched);
  }
  return EMPTY_RELEASE;
}

try {
  const release = await findLatestRelease();
  writeFileSync(OUTPUT, `${JSON.stringify(release, null, 2)}\n`);
  const found = Object.keys(release.assets);
  console.log(
    release.version
      ? `Release ${release.version}: ${found.join(', ')}`
      : `No published release with downloads in ${REPO} yet.`,
  );
} catch (error) {
  console.warn(`Could not read releases (${error.message}); keeping the current release.json.`);
}
