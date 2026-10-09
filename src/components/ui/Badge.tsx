import type { ReactNode } from 'react';

export type BadgeTone = 'cyan' | 'muted' | 'success' | 'danger';

// A filled dot means a settled state, a hollow one a pending state, so
// status never rests on colour alone.
const TONE_CLASSES: Record<BadgeTone, { box: string; dot: string }> = {
  cyan: { box: 'bg-cyan/12 text-cyan', dot: 'bg-cyan border-cyan' },
  muted: { box: 'bg-muted/10 text-muted', dot: 'border-muted' },
  success: { box: 'bg-success/12 text-success', dot: 'bg-success border-success' },
  danger: { box: 'bg-danger/12 text-[#FF8A9C]', dot: 'bg-[#FF8A9C] border-[#FF8A9C]' },
};

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  const classes = TONE_CLASSES[tone];
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-badge px-2 text-xs font-medium ${classes.box}`}
    >
      <span className={`size-1.5 rounded-full border ${classes.dot}`} aria-hidden="true" />
      {children}
    </span>
  );
}
