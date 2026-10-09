import { Download } from 'lucide-react';
import {
  getDefaultFormat,
  isFormatAvailable,
  type DesktopPlatform,
  type DownloadFormat,
} from '../config/platforms';
import { PlatformIcon } from './PlatformIcon';
import { Button, ButtonAnchor, ButtonLink, type ButtonSize } from './ui/Button';

interface DownloadButtonProps {
  platform: DesktopPlatform;
  format?: DownloadFormat;
  size?: ButtonSize;
  className?: string;
  /** `route` sends the visitor to the download page instead of starting a download. */
  mode?: 'direct' | 'route';
  /** Id of the text explaining why the button is disabled. */
  describedBy?: string;
}

export function DownloadButton({
  platform,
  format,
  size = 'lg',
  className,
  mode = 'direct',
  describedBy,
}: DownloadButtonProps) {
  const chosenFormat = format ?? getDefaultFormat(platform);
  const label = `Download for ${platform.name}`;
  const platformIcon = <PlatformIcon id={platform.id} size={18} />;

  if (mode === 'route') {
    return (
      <ButtonLink to={`/download?os=${platform.id}`} size={size} className={className}>
        {platformIcon}
        {label}
      </ButtonLink>
    );
  }

  if (isFormatAvailable(chosenFormat) && chosenFormat.url) {
    return (
      <ButtonAnchor href={chosenFormat.url} download size={size} className={className}>
        <Download size={18} aria-hidden="true" />
        {label}
      </ButtonAnchor>
    );
  }

  return (
    <Button disabled size={size} className={className} aria-describedby={describedBy}>
      {platformIcon}
      {label}
    </Button>
  );
}
