import { Check } from 'lucide-react';
import { useRef, type KeyboardEvent } from 'react';
import { PlatformIcon } from '../../components/PlatformIcon';
import { desktopPlatforms, hasDownload, type DesktopPlatform } from '../../config/platforms';
import { usePlatform } from '../../lib/PlatformContext';
import { PLATFORM_FALLBACK_SUMMARIES } from './labels';

const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const PREVIOUS_KEYS = ['ArrowLeft', 'ArrowUp'];

interface PlatformOptionProps {
  platform: DesktopPlatform;
  isSelected: boolean;
  showDetected: boolean;
  onSelect: () => void;
  buttonRef: (element: HTMLButtonElement | null) => void;
}

function PlatformOption({
  platform,
  isSelected,
  showDetected,
  onSelect,
  buttonRef,
}: PlatformOptionProps) {
  const cardClasses = isSelected
    ? 'border-cyan bg-cyan/8'
    : 'border-line bg-surface hover:border-line-strong';

  return (
    <button
      ref={buttonRef}
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      className={`relative flex items-center gap-4 rounded-card border p-5 text-left transition-[border-color,background-color] duration-200 ease-soft sm:flex-col sm:items-start ${cardClasses}`}
    >
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-zone ${isSelected ? 'bg-cyan text-ink' : 'bg-elevated text-fg'}`}
      >
        <PlatformIcon id={platform.id} size={24} />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2 text-lg font-semibold">
          {platform.name}
          {showDetected && <span className="text-xs font-normal text-muted">Detected</span>}
        </span>
        <span className="text-sm text-muted">
          {platform.requirements ?? PLATFORM_FALLBACK_SUMMARIES[platform.id]}
        </span>
        {!hasDownload(platform) && <span className="text-xs text-muted">Not yet available</span>}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border-2 ${isSelected ? 'border-cyan bg-cyan text-ink' : 'border-line-strong'}`}
      >
        {isSelected && <Check size={12} strokeWidth={3.5} />}
      </span>
    </button>
  );
}

export function PlatformPicker() {
  const { selected, detected, manual, select } = usePlatform();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveWithArrowKeys = (event: KeyboardEvent) => {
    const step = NEXT_KEYS.includes(event.key) ? 1 : PREVIOUS_KEYS.includes(event.key) ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const currentIndex = desktopPlatforms.findIndex((platform) => platform.id === selected.id);
    const nextIndex = (currentIndex + step + desktopPlatforms.length) % desktopPlatforms.length;
    select(desktopPlatforms[nextIndex].id);
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Operating system"
      onKeyDown={moveWithArrowKeys}
      className="grid gap-3 sm:grid-cols-3"
    >
      {desktopPlatforms.map((platform, index) => (
        <PlatformOption
          key={platform.id}
          platform={platform}
          isSelected={platform.id === selected.id}
          showDetected={platform.id === detected && !manual}
          onSelect={() => select(platform.id)}
          buttonRef={(element) => {
            optionRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
