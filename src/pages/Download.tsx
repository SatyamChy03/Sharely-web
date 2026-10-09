import { Smartphone } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { pageMeta } from '../config/site';
import { isMobilePlatform } from '../lib/detectPlatform';
import { usePlatform } from '../lib/PlatformContext';
import { useMeta } from '../lib/useMeta';
import { MobileApps } from './download/MobileApps';
import { PlatformDownloadCard } from './download/PlatformDownloadCard';
import { PlatformPicker } from './download/PlatformPicker';

export default function Download() {
  useMeta(pageMeta.download);
  const { selected, detected } = usePlatform();

  return (
    <Container className="flex flex-col gap-12 py-14 md:py-20">
      <header className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>Download center</Eyebrow>
        <h1 className="text-balance text-[40px] leading-[1.05] font-bold tracking-[-0.04em] sm:text-[56px]">
          Get Sharely for your computer.
        </h1>
        <p className="text-lg text-muted">
          Choose your operating system to get started. We've preselected the one this browser
          reports — switch any time.
        </p>
      </header>
      {isMobilePlatform(detected) && (
        <p className="flex items-start gap-3 rounded-card border border-line bg-surface p-5 text-sm leading-relaxed">
          <Smartphone size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
          You're on a phone. The builds below are for your computer — open this page on it to
          download, or scroll down for the phone app.
        </p>
      )}
      <PlatformPicker />
      {/* The key resets the chosen format when the platform changes. */}
      <PlatformDownloadCard key={selected.id} platform={selected} />
      <MobileApps />
    </Container>
  );
}
