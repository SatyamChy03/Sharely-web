import { ArrowUpFromLine, Check, QrCode } from 'lucide-react';
import type { ReactNode } from 'react';
import { FileThumb } from '../components/FileThumb';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

interface Step {
  title: string;
  body: string;
  /** A small decorative picture of the step. */
  preview: ReactNode;
}

const STEPS: Step[] = [
  {
    title: 'Connect your devices',
    body: 'Pair your phone and computer using the available connection method.',
    preview: (
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-[10px] bg-fg text-ink">
          <QrCode size={34} strokeWidth={1.6} />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-xs text-muted">or enter code</span>
          <span className="font-mono text-xl tracking-[0.2em]">482 913</span>
        </span>
      </div>
    ),
  },
  {
    title: 'Choose what to send',
    body: 'Select files or drag and drop them into Sharely on your computer.',
    preview: (
      <div className="flex h-[72px] items-center justify-center gap-3 rounded-zone border-[1.5px] border-cyan bg-cyan/8">
        <span className="flex size-8 items-center justify-center rounded-lg bg-cyan text-ink">
          <ArrowUpFromLine size={16} />
        </span>
        <span className="text-sm font-semibold">Drop to send</span>
      </div>
    ),
  },
  {
    title: 'Transfer and continue',
    body: 'Monitor the transfer and find completed items in your activity history.',
    preview: (
      <div className="flex items-center gap-3">
        <FileThumb kind="video" tone={1} size={36} />
        <span className="flex flex-1 flex-col gap-2">
          <span className="flex justify-between text-xs">
            <span className="font-medium">Lecture.mp4</span>
            <span className="flex items-center gap-1 text-success">
              <Check size={12} strokeWidth={3} /> Completed
            </span>
          </span>
          <span className="h-1.5 rounded-full bg-success" />
        </span>
      </div>
    ),
  },
];

function StepItem({ step, number }: { step: Step; number: number }) {
  return (
    <li className="relative flex gap-5 lg:flex-col">
      <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-sm text-cyan lg:mx-auto">
        {number}
      </span>
      <div className="flex flex-1 flex-col gap-5 rounded-card border border-line bg-surface p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
          <p className="leading-relaxed text-muted">{step.body}</p>
        </div>
        <div className="mt-auto rounded-zone border border-line bg-ink p-4" aria-hidden="true">
          {step.preview}
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-title"
      id="how-it-works"
      className="border-y border-line bg-ink-deep py-24 md:py-32"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeading id="how-title" eyebrow="How it works" title="Three steps. That's it." />
        <ol className="relative grid gap-6 lg:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute top-[22px] right-[16%] left-[16%] hidden h-px bg-linear-to-r from-line via-cyan/40 to-line lg:block"
          />
          {STEPS.map((step, index) => (
            <StepItem key={step.title} step={step} number={index + 1} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
