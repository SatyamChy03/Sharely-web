import { ArrowDown, Smartphone } from 'lucide-react';
import { DownloadButton } from '../components/DownloadButton';
import { ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { hasDownload } from '../config/platforms';
import { availabilitySummary } from '../lib/availability';
import { isMobilePlatform } from '../lib/detectPlatform';
import { usePlatform } from '../lib/PlatformContext';
import { HeroVisual } from './HeroVisual';

function PhoneVisitorNote() {
  return (
    <span className="flex items-start gap-2 rounded-btn border border-line bg-surface p-3 text-fg">
      <Smartphone size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
      Sharely installs on your computer first. Open this page there to download, then pair your
      phone.
    </span>
  );
}

export function Hero() {
  const { selected, detected } = usePlatform();
  const canDownloadNow = hasDownload(selected);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 pt-12 pb-16 md:pt-20 lg:grid-cols-[1fr_1.25fr] lg:gap-10 lg:pb-24">
        <div className="flex animate-rise flex-col gap-6">
          <Eyebrow>File sharing, simplified</Eyebrow>
          <h1
            id="hero-title"
            className="text-balance text-[44px] leading-[1.02] font-bold tracking-[-0.045em] sm:text-[60px] xl:text-[68px]"
          >
            Your files. Across devices. <span className="text-cyan">Instantly.</span>
          </h1>
          <p className="max-w-[520px] text-lg leading-relaxed text-muted">
            Send photos, videos, documents, and more between your phone and laptop. No complicated
            workflow. Just connect and share.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <DownloadButton platform={selected} mode={canDownloadNow ? 'direct' : 'route'} />
            <ButtonLink to="/#how-it-works" variant="secondary" size="lg">
              See how it works
              <ArrowDown size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <span>{availabilitySummary()}</span>
            {isMobilePlatform(detected) && <PhoneVisitorNote />}
          </div>
        </div>
        <div className="relative -mx-2 sm:mx-0">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
