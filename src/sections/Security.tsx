import { BellRing, History, Link2, Unlink, type LucideIcon } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { facts } from '../config/facts';

const CONTROLS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Link2,
    title: 'You choose what connects',
    body: `Devices pair only when you pair them. ${facts.pairing}`,
  },
  {
    icon: BellRing,
    title: 'Every transfer asks first',
    body: 'Incoming files show up as a request with names and sizes. Accept or decline — “Always accept” is opt-in, per device.',
  },
  {
    icon: History,
    title: 'A clear record',
    body: 'Activity lists what was sent, received, failed or cancelled, with the device and time.',
  },
  {
    icon: Unlink,
    title: 'Unpair any time',
    body: 'Remove a device from the Devices page and it can no longer send to you.',
  },
];

const TRANSFER_MODEL_PENDING =
  "A detailed description of how files travel between your devices — and how they're protected along the way — will be published with the first release. We'd rather explain it precisely than make claims we haven't documented yet.";

export function Security() {
  return (
    <section
      aria-labelledby="security-title"
      className="border-y border-line bg-ink-deep py-24 md:py-32"
    >
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="security-title"
            eyebrow="Privacy & control"
            title="Sharing should feel simple. And safe."
            lead="Sharely keeps you in charge of which devices connect and what they're allowed to send."
          />
          <div className="rounded-card border border-line bg-surface p-6">
            <h3 className="text-base font-semibold">How transfers work</h3>
            <p className="mt-2 leading-relaxed text-muted">
              {facts.transferModel ?? TRANSFER_MODEL_PENDING}
            </p>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {CONTROLS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6"
            >
              <Icon size={22} className="text-cyan" aria-hidden="true" />
              <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
