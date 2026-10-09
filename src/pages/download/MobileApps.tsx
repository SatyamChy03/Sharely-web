import { ExternalLink } from 'lucide-react';
import { PlatformIcon } from '../../components/PlatformIcon';
import { facts } from '../../config/facts';
import { mobilePlatforms, type MobilePlatform } from '../../config/platforms';

function MobileAppRow({ platform }: { platform: MobilePlatform }) {
  return (
    <li className="flex items-center gap-4 rounded-card border border-line bg-surface p-5">
      <span className="flex size-11 items-center justify-center rounded-zone bg-elevated">
        <PlatformIcon id={platform.id} size={22} />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="font-semibold">Sharely for {platform.name}</span>
        <span className="text-sm text-muted">{platform.requirements ?? platform.storeLabel}</span>
      </span>
      {platform.url ? (
        <a
          href={platform.url}
          className="inline-flex h-10 items-center gap-1.5 rounded-btn border border-line-strong bg-elevated px-3 text-sm font-medium hover:bg-[#174068]"
        >
          Get it <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : (
        <span className="text-sm text-muted">Coming soon</span>
      )}
    </li>
  );
}

export function MobileApps() {
  if (mobilePlatforms.length === 0) return null;
  return (
    <section aria-labelledby="mobile-title" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 id="mobile-title" className="text-2xl font-semibold tracking-[-0.02em]">
          And on your phone
        </h2>
        <p className="text-muted">
          Install Sharely on your phone too, then pair it with your computer. {facts.pairing}
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {mobilePlatforms.map((platform) => (
          <MobileAppRow key={platform.id} platform={platform} />
        ))}
      </ul>
    </section>
  );
}
