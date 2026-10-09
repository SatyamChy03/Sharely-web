import type { PlatformId } from '../config/platforms';
import { androidPath, applePath, linuxPath, windowsPath } from './brandPaths';

const PLATFORM_PATHS: Record<PlatformId, string> = {
  windows: windowsPath,
  macos: applePath,
  ios: applePath,
  linux: linuxPath,
  android: androidPath,
};

interface PlatformIconProps {
  id: PlatformId;
  size?: number;
  className?: string;
}

export function PlatformIcon({ id, size = 20, className }: PlatformIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={PLATFORM_PATHS[id]} />
    </svg>
  );
}
