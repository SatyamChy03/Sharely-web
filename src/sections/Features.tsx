import {
  ArrowLeftRight,
  Laptop,
  ListChecks,
  MousePointerClick,
  Smartphone,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { FileThumb } from '../components/FileThumb';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  /** A small decorative picture of the feature. */
  detail: ReactNode;
}

const SEND_STEPS = ['Choose', 'Device', 'Send'];

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: 'Fast file transfers',
    body: 'Move photos, videos, documents, and folders between connected devices.',
    detail: (
      <div className="flex gap-1.5">
        <FileThumb kind="image" size={34} />
        <FileThumb kind="video" tone={1} size={34} />
        <FileThumb kind="pdf" size={34} />
        <FileThumb kind="zip" size={34} />
      </div>
    ),
  },
  {
    icon: ArrowLeftRight,
    title: 'Phone to laptop. And back.',
    body: 'Send in either direction without changing your workflow.',
    detail: (
      <div className="flex items-center gap-3 text-muted">
        <span className="flex size-9 items-center justify-center rounded-btn bg-elevated text-fg">
          <Smartphone size={18} />
        </span>
        <ArrowLeftRight size={18} className="text-cyan" />
        <span className="flex size-9 items-center justify-center rounded-btn bg-elevated text-fg">
          <Laptop size={18} />
        </span>
      </div>
    ),
  },
  {
    icon: MousePointerClick,
    title: 'A simpler way to share',
    body: 'Choose your files, select your device, and transfer.',
    detail: (
      <ol className="flex items-center gap-1.5 text-xs font-medium">
        {SEND_STEPS.map((step, index) => (
          <li
            key={step}
            className={`rounded-badge px-2 py-1 ${index === SEND_STEPS.length - 1 ? 'bg-cyan text-ink' : 'bg-elevated text-fg'}`}
          >
            {step}
          </li>
        ))}
      </ol>
    ),
  },
  {
    icon: ListChecks,
    title: "Know what's happening",
    body: 'See transfer progress, file status, and recent activity.',
    detail: (
      <div className="flex flex-wrap gap-1.5">
        <Badge tone="success">Completed</Badge>
        <Badge tone="cyan">Sending</Badge>
        <Badge tone="muted">Waiting</Badge>
      </div>
    ),
  },
];

function FeatureCard({ icon: Icon, title, body, detail }: Feature) {
  return (
    <Card className="flex h-full flex-col gap-5 p-6 transition-colors duration-200 hover:border-line-strong">
      <span className="flex size-10 items-center justify-center rounded-btn bg-cyan/12 text-cyan">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="leading-relaxed text-muted">{body}</p>
      </div>
      <div className="mt-auto border-t border-line pt-5" aria-hidden="true">
        {detail}
      </div>
    </Card>
  );
}

export function Features() {
  return (
    <section aria-labelledby="features-title" id="features" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title="Everything moves with you."
          lead="The parts of file sharing you actually use — and nothing that gets in the way."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <FeatureCard {...feature} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
