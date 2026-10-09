import { Link } from 'react-router-dom';
import { PlatformIcon } from '../components/PlatformIcon';
import { Container } from '../components/ui/Container';
import { desktopPlatforms, hasDownload, mobilePlatforms } from '../config/platforms';

function PhoneApps() {
  return (
    <p className="flex items-center gap-2.5 text-sm text-muted">
      <span>Phone app:</span>
      {mobilePlatforms.map((platform) => (
        <span key={platform.id} className="flex items-center gap-1.5 text-fg">
          <PlatformIcon id={platform.id} size={16} className="text-muted" />
          {platform.name}
          {!platform.url && <span className="text-xs text-muted">· coming soon</span>}
        </span>
      ))}
    </p>
  );
}

export function PlatformStrip() {
  return (
    <section aria-label="Supported platforms" className="border-y border-line bg-ink-deep">
      <Container className="flex flex-col items-start gap-5 py-6 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {desktopPlatforms.map((platform) => (
            <li key={platform.id}>
              <Link
                to={`/download?os=${platform.id}`}
                className="group flex items-center gap-2.5 rounded-lg text-fg"
              >
                <PlatformIcon
                  id={platform.id}
                  size={20}
                  className="text-muted transition-colors group-hover:text-fg"
                />
                <span className="font-medium">{platform.name}</span>
                {!hasDownload(platform) && (
                  <span className="text-xs text-muted">Coming soon</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {mobilePlatforms.length > 0 && <PhoneApps />}
      </Container>
    </section>
  );
}
