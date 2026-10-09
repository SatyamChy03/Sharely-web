import { desktopPlatforms, hasDownload } from '../config/platforms';
import { listWithOxfordAnd } from './format';

/** One line saying which desktop builds exist today and which are still to come. */
export function availabilitySummary(): string {
  const available = desktopPlatforms.filter(hasDownload).map((platform) => platform.name);
  const upcoming = desktopPlatforms
    .filter((platform) => !hasDownload(platform))
    .map((platform) => platform.name);

  if (available.length && upcoming.length) {
    return `Available for ${listWithOxfordAnd(available)} · coming to ${listWithOxfordAnd(upcoming)}`;
  }
  if (available.length) return `Available for ${listWithOxfordAnd(available)}`;
  return `Coming to ${listWithOxfordAnd(upcoming)}`;
}
