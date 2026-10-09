import { useRef, type KeyboardEvent } from 'react';
import { PlatformIcon } from '../../components/PlatformIcon';
import { desktopPlatforms } from '../../config/platforms';
import { usePlatform } from '../../lib/PlatformContext';

export function PlatformTabs() {
  const { selected, select } = usePlatform();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveWithArrowKeys = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const currentIndex = desktopPlatforms.findIndex((platform) => platform.id === selected.id);
    const nextIndex = (currentIndex + step + desktopPlatforms.length) % desktopPlatforms.length;
    select(desktopPlatforms[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Operating system"
      onKeyDown={moveWithArrowKeys}
      className="flex w-full gap-1 overflow-x-auto rounded-btn border border-line bg-surface p-1 sm:w-fit"
    >
      {desktopPlatforms.map((platform, index) => {
        const isSelected = platform.id === selected.id;
        return (
          <button
            key={platform.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            role="tab"
            id={`install-tab-${platform.id}`}
            aria-selected={isSelected}
            aria-controls="install-panel"
            tabIndex={isSelected ? 0 : -1}
            onClick={() => select(platform.id)}
            className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-[7px] px-5 text-sm font-medium transition-colors duration-150 sm:flex-none ${isSelected ? 'bg-elevated text-fg' : 'text-muted hover:text-fg'}`}
          >
            <PlatformIcon id={platform.id} size={16} />
            {platform.name}
          </button>
        );
      })}
    </div>
  );
}
