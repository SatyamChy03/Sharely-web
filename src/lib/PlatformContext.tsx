import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  desktopPlatforms,
  getDesktopPlatform,
  isDesktopPlatformId,
  type DesktopPlatform,
  type DesktopPlatformId,
} from '../config/platforms';
import { detectPlatform, type DetectedPlatform } from './detectPlatform';

interface PlatformContextValue {
  detected: DetectedPlatform;
  selected: DesktopPlatform;
  /** True once the visitor has picked a platform themselves. */
  manual: boolean;
  select: (id: DesktopPlatformId) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);
const STORAGE_KEY = 'sharely:platform';

function readStoredPlatform(): DesktopPlatformId | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isDesktopPlatformId(stored) ? stored : null;
  } catch {
    return null;
  }
}

function initialPlatformId(detected: DetectedPlatform): DesktopPlatformId {
  const fromUrl = new URLSearchParams(globalThis.location?.search ?? '').get('os');
  if (isDesktopPlatformId(fromUrl)) return fromUrl;
  return readStoredPlatform() ?? (isDesktopPlatformId(detected) ? detected : desktopPlatforms[0].id);
}

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [detected] = useState(() => detectPlatform());
  const [selectedId, setSelectedId] = useState(() => initialPlatformId(detected));
  const [manual, setManual] = useState(false);

  const select = useCallback((id: DesktopPlatformId) => {
    setSelectedId(id);
    setManual(true);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Private windows can refuse storage; the choice still holds for this visit.
    }
  }, []);

  const value = useMemo(
    () => ({ detected, selected: getDesktopPlatform(selectedId), manual, select }),
    [detected, selectedId, manual, select],
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform(): PlatformContextValue {
  const value = useContext(PlatformContext);
  if (!value) throw new Error('usePlatform must be used inside <PlatformProvider>');
  return value;
}
