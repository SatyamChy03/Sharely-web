const BYTE_UNITS = ['B', 'KB', 'MB', 'GB'];

export function formatBytes(bytes: number): string {
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1000 && unitIndex < BYTE_UNITS.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }
  const rounded = value >= 100 || unitIndex === 0 ? Math.round(value) : value.toFixed(1);
  return `${rounded} ${BYTE_UNITS[unitIndex]}`;
}

/** Formats a `YYYY-MM-DD` date without shifting it across time zones. */
export function formatReleaseDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function fileNameFromUrl(url: string): string {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop() ?? url);
  } catch {
    return url.split('/').pop() ?? url;
  }
}

const joinNames = (names: string[], lastSeparator: string): string =>
  names.length <= 1
    ? names.join('')
    : `${names.slice(0, -1).join(', ')}${lastSeparator}${names[names.length - 1]}`;

export const listWithOxfordAnd = (names: string[]): string => joinNames(names, ', and ');

export const listWithAnd = (names: string[]): string => joinNames(names, ' and ');
