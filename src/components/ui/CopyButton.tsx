import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../lib/useCopyToClipboard';

export function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopyToClipboard(text);
  return (
    <button
      type="button"
      onClick={copy}
      className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-elevated hover:text-fg"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
