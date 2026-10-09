import { CopyButton } from '../../components/ui/CopyButton';
import type { DesktopPlatformId } from '../../config/platforms';
import { CHECKSUM_COMMANDS } from './labels';

interface ChecksumBlockProps {
  sha256: string;
  fileName: string;
  platformId: DesktopPlatformId;
}

export function ChecksumBlock({ sha256, fileName, platformId }: ChecksumBlockProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-6">
      <h3 className="font-semibold">Verify your download</h3>
      <p className="text-sm text-muted">
        Compare the SHA-256 checksum of the file you downloaded with this one.
      </p>
      <div className="flex items-center gap-2 rounded-btn border border-line bg-ink p-2 pl-3">
        <code className="flex-1 overflow-x-auto font-mono text-xs break-all text-fg">{sha256}</code>
        <CopyButton text={sha256} />
      </div>
      <pre className="overflow-x-auto rounded-btn bg-ink p-3 font-mono text-xs text-aqua">
        <code>{CHECKSUM_COMMANDS[platformId](fileName)}</code>
      </pre>
    </div>
  );
}
