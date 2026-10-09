import { Download } from 'lucide-react';
import type { MouseEvent } from 'react';
import { ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import type { DesktopPlatform } from '../config/platforms';
import { pageMeta } from '../config/site';
import { usePlatform } from '../lib/PlatformContext';
import { useMeta } from '../lib/useMeta';
import { getInstallGuide } from './install/guides';
import { GuideStepItem } from './install/GuideStepItem';
import type { GuideSection } from './install/guideTypes';
import { PlatformTabs } from './install/PlatformTabs';

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
  // Scrolling by hand keeps the section anchor out of the router's history.
  event.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView();
}

function GuideOutline({ sections }: { sections: GuideSection[] }) {
  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <ol className="sticky top-24 flex flex-col gap-1 border-l border-line">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => scrollToSection(event, section.id)}
              className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-muted hover:border-cyan hover:text-fg"
            >
              <span className="font-mono text-xs text-cyan">{index + 1}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface GuideSectionCardProps {
  section: GuideSection;
  number: number;
  platform: DesktopPlatform;
}

function GuideSectionCard({ section, number, platform }: GuideSectionCardProps) {
  return (
    <li
      id={section.id}
      className="scroll-mt-24 rounded-card border border-line bg-surface p-6 sm:p-8"
    >
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em]">
        <span className="flex size-9 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-cyan">
          {number}
        </span>
        {section.title}
      </h2>
      <ol className="flex flex-col gap-7">
        {section.steps.map((step) => (
          <GuideStepItem key={step.title} step={step} />
        ))}
      </ol>
      {section.id === 'download' && (
        <ButtonLink to={`/download?os=${platform.id}`} className="mt-6">
          <Download size={16} aria-hidden="true" />
          Go to {platform.name} downloads
        </ButtonLink>
      )}
    </li>
  );
}

export default function Install() {
  useMeta(pageMeta.install);
  const { selected } = usePlatform();
  const sections = getInstallGuide(selected.id);

  return (
    <Container className="flex flex-col gap-10 py-14 md:py-20">
      <header className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>Installation guide</Eyebrow>
        <h1 className="text-balance text-[40px] leading-[1.05] font-bold tracking-[-0.04em] sm:text-[56px]">
          From download to first file.
        </h1>
        <p className="text-lg text-muted">
          Install Sharely, pair your phone, and send something — usually in a few minutes.
        </p>
      </header>
      <PlatformTabs />
      <div
        id="install-panel"
        role="tabpanel"
        aria-labelledby={`install-tab-${selected.id}`}
        className="grid gap-10 lg:grid-cols-[220px_1fr]"
      >
        <GuideOutline sections={sections} />
        <ol className="flex min-w-0 flex-col gap-6">
          {sections.map((section, index) => (
            <GuideSectionCard
              key={section.id}
              section={section}
              number={index + 1}
              platform={selected}
            />
          ))}
        </ol>
      </div>
    </Container>
  );
}
