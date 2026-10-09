import { Info } from 'lucide-react';
import { CopyButton } from '../../components/ui/CopyButton';
import type { GuideStep } from './guideTypes';

function TerminalBlock({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-btn border border-line bg-ink">
      <div className="flex items-center justify-between border-b border-line py-1 pr-1 pl-4">
        <span className="font-mono text-xs text-muted">Terminal</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-aqua">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function GuideStepItem({ step }: { step: GuideStep }) {
  return (
    <li className="flex flex-col gap-3">
      <h4 className="font-semibold">{step.title}</h4>
      <p className="leading-relaxed text-muted">{step.body}</p>
      {step.code && <TerminalBlock code={step.code} />}
      {step.note && (
        <p className="flex items-start gap-2 text-sm text-muted">
          <Info size={15} className="mt-0.5 shrink-0 text-aqua" aria-hidden="true" />
          {step.note}
        </p>
      )}
    </li>
  );
}
