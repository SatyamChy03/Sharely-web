import { BookOpen, ExternalLink, Info } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DownloadButton } from '../../components/DownloadButton';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import {
  getDefaultFormat,
  hasDownload,
  isFormatAvailable,
  type DesktopPlatform,
  type DownloadFormat,
} from '../../config/platforms';
import { release } from '../../config/release';
import { fileNameFromUrl, formatBytes, formatReleaseDate } from '../../lib/format';
import { ChecksumBlock } from './ChecksumBlock';
import { FormatOption } from './FormatOption';
import { ARCHITECTURE_LABELS } from './labels';

function InfoNote({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p
      id={id}
      className="flex items-start gap-2.5 rounded-btn border border-line bg-ink p-4 text-sm leading-relaxed text-muted"
    >
      <Info size={16} className="mt-0.5 shrink-0 text-aqua" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function releaseFacts(platform: DesktopPlatform, format: DownloadFormat): [string, string][] {
  const facts: [string, string][] = [];
  if (release.version) facts.push(['Version', release.version]);
  if (format.arch) facts.push(['Architecture', ARCHITECTURE_LABELS[format.arch]]);
  if (format.sizeBytes) facts.push(['File size', formatBytes(format.sizeBytes)]);
  if (release.date) facts.push(['Released', formatReleaseDate(release.date)]);
  if (platform.requirements) facts.push(['Requires', platform.requirements]);
  return facts;
}

function ReleaseFacts({ facts }: { facts: [string, string][] }) {
  if (facts.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
      {facts.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1">
          <dt className="text-xs text-muted">{label}</dt>
          <dd className="font-mono text-sm">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function AvailabilityBadge({ platform }: { platform: DesktopPlatform }) {
  if (hasDownload(platform)) return <Badge tone="success">Available</Badge>;
  return <Badge tone="muted">{platform.status === 'planned' ? 'Planned' : 'Not yet available'}</Badge>;
}

interface DownloadActionsProps {
  platform: DesktopPlatform;
  format: DownloadFormat;
}

function DownloadActions({ platform, format }: DownloadActionsProps) {
  const isAvailable = isFormatAvailable(format);
  const unavailableNoteId = `unavailable-${platform.id}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <DownloadButton
          platform={platform}
          format={format}
          describedBy={isAvailable ? undefined : unavailableNoteId}
        />
        <Link
          to={`/install?os=${platform.id}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-btn px-4 font-medium text-cyan hover:bg-elevated"
        >
          <BookOpen size={18} aria-hidden="true" />
          Installation instructions
        </Link>
      </div>
      {!isAvailable && (
        <InfoNote id={unavailableNoteId}>
          The {platform.name} build ({format.label}) hasn't been published yet, so there's nothing
          to download right now. This button will start the real download as soon as the build is
          released.
        </InfoNote>
      )}
      {isAvailable && platform.formats.length === 1 && (
        <p className="text-sm text-muted">
          {format.label} · {format.summary}
        </p>
      )}
      {isAvailable && release.prerelease && (
        <InfoNote>
          This is a pre-release build and isn't code-signed yet, so your system may warn you before
          opening it. Check the file against the checksum below before you run it.
        </InfoNote>
      )}
      {release.changelogUrl && (
        <a
          href={release.changelogUrl}
          className="inline-flex items-center gap-1.5 text-sm text-cyan hover:text-cyan-hover"
        >
          What's new in {release.version ?? 'this release'}{' '}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function PlatformDownloadCard({ platform }: { platform: DesktopPlatform }) {
  const [formatId, setFormatId] = useState(() => getDefaultFormat(platform).id);
  const format =
    platform.formats.find((candidate) => candidate.id === formatId) ?? getDefaultFormat(platform);

  return (
    <Card className="flex flex-col gap-8 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Sharely for {platform.name}</h2>
        <AvailabilityBadge platform={platform} />
      </div>
      {platform.formats.length > 1 && (
        <div
          role="radiogroup"
          aria-label={`${platform.name} installer format`}
          className="grid gap-3 md:grid-cols-2"
        >
          {platform.formats.map((candidate) => (
            <FormatOption
              key={candidate.id}
              format={candidate}
              isChecked={candidate.id === format.id}
              onPick={() => setFormatId(candidate.id)}
            />
          ))}
        </div>
      )}
      <ReleaseFacts facts={releaseFacts(platform, format)} />
      <DownloadActions platform={platform} format={format} />
      {format.url && format.sha256 && (
        <ChecksumBlock
          sha256={format.sha256}
          fileName={format.fileName ?? fileNameFromUrl(format.url)}
          platformId={platform.id}
        />
      )}
    </Card>
  );
}
