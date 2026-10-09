import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import {
  DesktopConnectedScreen,
  DesktopHomeScreen,
  DesktopIncomingScreen,
  DesktopSendingScreen,
} from '../components/mock/DesktopScreens';
import { LaptopFrame, PhoneFrame } from '../components/mock/DeviceFrames';
import {
  PhoneConnectedScreen,
  PhoneHomeScreen,
  PhoneIncomingScreen,
  PhoneSendingScreen,
} from '../components/mock/PhoneScreens';
import { ScaledStage } from '../components/mock/ScaledStage';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

interface ShowcaseView {
  id: string;
  tab: string;
  caption: string;
  desktop: ReactNode;
  phone: ReactNode;
}

const VIEWS: ShowcaseView[] = [
  {
    id: 'connected',
    tab: 'Connected',
    caption: 'Pair once. Both devices show who they are connected to, all the time.',
    desktop: <DesktopConnectedScreen />,
    phone: <PhoneConnectedScreen />,
  },
  {
    id: 'drop',
    tab: 'Drag & drop',
    caption: 'Drop files anywhere on Home. The whole window becomes the target.',
    desktop: <DesktopHomeScreen dragOver />,
    phone: <PhoneHomeScreen />,
  },
  {
    id: 'progress',
    tab: 'Progress',
    caption: 'Speed, time left, and every file in the queue — on both screens.',
    desktop: <DesktopSendingScreen />,
    phone: <PhoneSendingScreen />,
  },
  {
    id: 'incoming',
    tab: 'Incoming',
    caption: 'Nothing arrives unannounced. You see the files first, then accept or decline.',
    desktop: <DesktopIncomingScreen />,
    phone: <PhoneIncomingScreen />,
  },
];

const STAGE_WIDTH = 940;
const STAGE_HEIGHT = 560;

interface ViewTabsProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

function ViewTabs({ activeIndex, onSelect }: ViewTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveWithArrowKeys = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const nextIndex = (activeIndex + step + VIEWS.length) % VIEWS.length;
    onSelect(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="App screens"
      onKeyDown={moveWithArrowKeys}
      className="flex gap-1 overflow-x-auto rounded-btn border border-line bg-surface p-1"
    >
      {VIEWS.map((view, index) => (
        <button
          key={view.id}
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
          role="tab"
          id={`tab-${view.id}`}
          aria-selected={index === activeIndex}
          aria-controls="showcase-panel"
          tabIndex={index === activeIndex ? 0 : -1}
          onClick={() => onSelect(index)}
          className={`h-10 shrink-0 rounded-[7px] px-4 text-sm font-medium transition-colors duration-150 ${index === activeIndex ? 'bg-elevated text-fg' : 'text-muted hover:text-fg'}`}
        >
          {view.tab}
        </button>
      ))}
    </div>
  );
}

function DevicePair({ view }: { view: ShowcaseView }) {
  return (
    <ScaledStage
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      label={`${view.tab}: ${view.caption}`}
    >
      <div className="relative" style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}>
        <div className="absolute top-0 left-0 origin-top-left" style={{ transform: 'scale(0.95)' }}>
          <LaptopFrame>{view.desktop}</LaptopFrame>
        </div>
        <div
          className="absolute top-[110px] left-[700px] origin-top-left"
          style={{ transform: 'scale(0.82)' }}
        >
          <PhoneFrame>{view.phone}</PhoneFrame>
        </div>
      </div>
    </ScaledStage>
  );
}

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeView = VIEWS[activeIndex];

  return (
    <section aria-labelledby="showcase-title" className="py-24 md:py-32">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="showcase-title"
            eyebrow="The app"
            title="Two screens. One conversation."
            lead="Your computer and your phone always agree on what's happening."
          />
          <ViewTabs activeIndex={activeIndex} onSelect={setActiveIndex} />
        </div>
        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeView.id}`}
          className="overflow-hidden rounded-card border border-line bg-linear-to-b from-surface to-ink px-4 pt-8 sm:px-10 sm:pt-12"
        >
          {/* The key restarts the rise animation when the tab changes. */}
          <div key={activeView.id} className="mx-auto max-w-[940px] animate-rise">
            <DevicePair view={activeView} />
          </div>
          <p className="mx-auto max-w-xl border-t border-line py-6 text-center text-muted">
            {activeView.caption}
          </p>
        </div>
      </Container>
    </section>
  );
}
