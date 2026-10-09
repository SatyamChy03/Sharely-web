import { isFormatAvailable, type DownloadFormat } from '../../config/platforms';
import { formatBytes } from '../../lib/format';
import { ARCHITECTURE_LABELS } from './labels';

interface FormatOptionProps {
  format: DownloadFormat;
  isChecked: boolean;
  onPick: () => void;
}

export function FormatOption({ format, isChecked, onPick }: FormatOptionProps) {
  const cardClasses = isChecked
    ? 'border-cyan bg-cyan/8'
    : 'border-line bg-ink hover:border-line-strong';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      onClick={onPick}
      className={`flex w-full items-start gap-3 rounded-zone border p-4 text-left transition-colors duration-150 ${cardClasses}`}
    >
      <span
        className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 ${isChecked ? 'border-cyan' : 'border-line-strong'}`}
        aria-hidden="true"
      >
        {isChecked && <span className="size-2 rounded-full bg-cyan" />}
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2 font-medium">
          {format.label}
          {format.recommended && <span className="text-xs text-cyan">Recommended</span>}
        </span>
        <span className="text-sm text-muted">{format.summary}</span>
        <span className="flex flex-wrap gap-x-3 font-mono text-xs text-muted">
          {format.arch && <span>{ARCHITECTURE_LABELS[format.arch]}</span>}
          {format.sizeBytes ? <span>{formatBytes(format.sizeBytes)}</span> : null}
          {!isFormatAvailable(format) && <span>Not yet available</span>}
        </span>
      </span>
    </button>
  );
}
