import {
  ArrowDown,
  ArrowUp,
  ArrowUpFromLine,
  Check,
  Clock,
  House,
  MonitorSmartphone,
  Settings,
  Smartphone,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { FileThumb, type FileKind } from '../FileThumb';
import { LogoMark } from '../Logo';

// Miniature copies of the laptop app's screens, drawn at 720×450 for LaptopFrame.

const SIDEBAR_ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: House, label: 'Home' },
  { icon: ArrowUp, label: 'Send' },
  { icon: ArrowDown, label: 'Receive' },
  { icon: Clock, label: 'Activity' },
  { icon: MonitorSmartphone, label: 'Devices' },
  { icon: Settings, label: 'Settings' },
];

function ConnectedChip() {
  return (
    <span className="flex h-[17px] items-center gap-[4px] rounded-[4px] bg-cyan/12 px-[6px] text-[9px] font-medium text-cyan">
      <span className="size-[5px] rounded-full bg-cyan" />
      Connected
    </span>
  );
}

function Sidebar({ active }: { active: string }) {
  return (
    <div className="flex w-[150px] flex-col gap-[2px] border-r border-line bg-surface px-[10px] py-[14px]">
      <div className="mb-[14px] flex items-center gap-[6px] px-[6px]">
        <LogoMark size={18} />
        <span className="text-[14px] font-bold tracking-[-0.04em]">sharely</span>
      </div>
      {SIDEBAR_ITEMS.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`flex h-[28px] items-center gap-[8px] rounded-[6px] px-[8px] text-[11px] font-medium ${label === active ? 'bg-elevated text-fg' : 'text-muted'}`}
        >
          <Icon size={13} className={label === active ? 'text-cyan' : ''} />
          {label}
        </div>
      ))}
      <div className="mt-auto flex items-center gap-[8px] rounded-[8px] border border-line bg-[#0A2139] p-[8px]">
        <span className="flex size-[22px] items-center justify-center rounded-full bg-elevated text-[10px] font-semibold text-aqua">
          S
        </span>
        <span className="flex flex-col">
          <span className="text-[10px] font-semibold">Satyam</span>
          <span className="flex items-center gap-[4px] text-[9px] text-cyan">
            <span className="size-[5px] rounded-full bg-cyan" />
            Connected
          </span>
        </span>
      </div>
    </div>
  );
}

function DesktopShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="flex h-full bg-ink text-fg">
      <Sidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col gap-[14px] p-[20px]">{children}</div>
    </div>
  );
}

function TargetDeviceHeader({ overline = 'Send files to' }: { overline?: string }) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-[3px]">
        <span className="text-[10px] font-medium text-muted">{overline}</span>
        <span className="flex items-center gap-[7px] text-[20px] font-bold tracking-[-0.03em]">
          <Smartphone size={17} className="text-cyan" />
          Satyam's Phone
        </span>
      </div>
      <div className="flex flex-col items-end gap-[3px]">
        <ConnectedChip />
        <span className="flex items-center gap-[4px] text-[9px] text-muted">
          <Wifi size={9} />
          Same Wi-Fi
        </span>
      </div>
    </div>
  );
}

const RECENT_TRANSFERS: {
  kind: FileKind;
  tone: number;
  name: string;
  meta: string;
  wasSent: boolean;
}[] = [
  { kind: 'image', tone: 0, name: 'IMG_2051.jpg', meta: '2.4 MB · 8:42 PM', wasSent: true },
  { kind: 'pdf', tone: 0, name: 'Project.pdf', meta: '1.8 MB · 8:39 PM', wasSent: true },
  { kind: 'video', tone: 1, name: 'Lecture.mp4', meta: '342 MB · 7:21 PM', wasSent: false },
];

function RecentTransfers({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-[12px] border border-line bg-surface p-[6px]">
      <div className="px-[6px] pt-[2px] pb-[4px] text-[10px] font-semibold">Recent</div>
      {RECENT_TRANSFERS.slice(0, rows).map((transfer) => (
        <div key={transfer.name} className="flex items-center gap-[8px] px-[6px] py-[4px]">
          <FileThumb kind={transfer.kind} tone={transfer.tone} size={22} radius={5} />
          <span className="flex-1 truncate text-[10px] font-medium">{transfer.name}</span>
          <span className="font-mono text-[9px] text-muted">{transfer.meta}</span>
          <span
            className={`flex items-center gap-[3px] text-[9px] font-medium ${transfer.wasSent ? 'text-success' : 'text-cyan'}`}
          >
            {transfer.wasSent ? (
              <Check size={9} strokeWidth={3} />
            ) : (
              <ArrowDown size={9} strokeWidth={3} />
            )}
            {transfer.wasSent ? 'Sent' : 'Received'}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DesktopHomeScreen({ dragOver = false }: { dragOver?: boolean }) {
  const zoneClasses = dragOver
    ? 'scale-[1.01] border-solid border-cyan bg-cyan/8'
    : 'border-dashed border-[#2E6390] bg-[#0B2139]';
  const iconClasses = dragOver ? '-translate-y-[4px] bg-cyan text-ink' : 'bg-elevated text-cyan';

  return (
    <DesktopShell active="Home">
      <TargetDeviceHeader />
      <div
        className={`flex flex-1 flex-col items-center justify-center gap-[8px] rounded-[12px] border-[1.5px] transition-all duration-200 ${zoneClasses}`}
      >
        <span
          className={`mb-[4px] flex size-[44px] items-center justify-center rounded-[11px] transition-all duration-200 ${iconClasses}`}
        >
          <ArrowUpFromLine size={20} />
        </span>
        <span className="text-[18px] font-bold tracking-[-0.03em]">
          {dragOver ? 'Drop to send' : 'Drop anything here'}
        </span>
        <span className="text-[10px] text-muted">
          {dragOver ? "Release to send to Satyam's Phone" : 'Drag & drop files or folders'}
        </span>
        {!dragOver && (
          <div className="mt-[6px] flex gap-[6px]">
            <span className="flex h-[24px] items-center rounded-[6px] bg-cyan px-[10px] text-[10px] font-semibold text-ink">
              Choose files
            </span>
            <span className="flex h-[24px] items-center rounded-[6px] border border-line-strong bg-elevated px-[10px] text-[10px] font-medium">
              Choose folder
            </span>
          </div>
        )}
      </div>
      <RecentTransfers rows={2} />
    </DesktopShell>
  );
}

type QueueState = 'done' | 'sending' | 'waiting';

const SEND_QUEUE: { kind: FileKind; tone: number; name: string; size: string; state: QueueState }[] =
  [
    { kind: 'image', tone: 0, name: 'IMG_2051.jpg', size: '2.4 MB', state: 'done' },
    { kind: 'pdf', tone: 0, name: 'Project.pdf', size: '1.8 MB', state: 'done' },
    { kind: 'video', tone: 1, name: 'Lecture.mp4', size: '3.4 GB', state: 'sending' },
    { kind: 'zip', tone: 0, name: 'Dataset.zip', size: '1.6 GB', state: 'waiting' },
  ];

const QUEUE_STATE_STYLE: Record<QueueState, { label: string; classes: string }> = {
  done: { label: '✓ Completed', classes: 'text-success' },
  sending: { label: '↗ Sending 91%', classes: 'text-cyan' },
  waiting: { label: 'Waiting', classes: 'text-muted' },
};

const TRANSFER_STATS = [
  ['Transferred', '3.1 / 5.0 GB'],
  ['Speed', '24.8 MB/s'],
  ['Time left', '~1 min 18 s'],
  ['Destination', "Satyam's Phone"],
];

function TransferSummary() {
  return (
    <div className="flex flex-col gap-[12px] rounded-[12px] border border-line bg-surface p-[14px]">
      <div className="flex items-baseline gap-[8px]">
        <span className="text-[40px] leading-none font-bold tracking-[-0.04em] tabular-nums">
          62<span className="text-[20px] text-muted">%</span>
        </span>
        <span className="text-[10px] text-muted">Sending Lecture.mp4</span>
      </div>
      <div className="h-[6px] overflow-hidden rounded-full bg-elevated">
        <div className="h-full w-[62%] rounded-full bg-cyan" />
      </div>
      <div className="grid grid-cols-4 gap-[8px]">
        {TRANSFER_STATS.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-[2px]">
            <span className="text-[9px] text-muted">{label}</span>
            <span className="font-mono text-[11px]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DesktopSendingScreen() {
  return (
    <DesktopShell active="Send">
      <TargetDeviceHeader overline="Sending to" />
      <TransferSummary />
      <div className="rounded-[12px] border border-line bg-surface p-[6px]">
        {SEND_QUEUE.map((file) => (
          <div
            key={file.name}
            className={`flex items-center gap-[8px] rounded-[6px] px-[6px] py-[4px] ${file.state === 'sending' ? 'bg-elevated' : ''}`}
          >
            <FileThumb kind={file.kind} tone={file.tone} size={22} radius={5} />
            <span className="flex-1 truncate text-[10px] font-medium">{file.name}</span>
            <span className="w-[50px] text-right font-mono text-[9px] text-muted">{file.size}</span>
            <span
              className={`w-[70px] text-right text-[9px] font-medium ${QUEUE_STATE_STYLE[file.state].classes}`}
            >
              {QUEUE_STATE_STYLE[file.state].label}
            </span>
          </div>
        ))}
      </div>
    </DesktopShell>
  );
}

function IncomingOfferToast() {
  return (
    <div className="absolute right-[14px] bottom-[14px] flex w-[250px] flex-col gap-[8px] rounded-[10px] border border-[#2E6390] bg-elevated p-[10px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
      <span className="flex items-center gap-[5px] text-[9px] text-muted">
        <LogoMark size={11} />
        Sharely · now
      </span>
      <span className="flex items-center gap-[8px]">
        <span className="flex size-[26px] items-center justify-center rounded-[6px] bg-ink text-cyan">
          <Smartphone size={13} />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold">Satyam's Phone</span>
          <span className="text-[9px] text-muted">wants to send 3 files · 1.0 GB</span>
        </span>
      </span>
      <span className="flex gap-[4px]">
        <FileThumb kind="image" size={22} radius={5} />
        <FileThumb kind="pdf" size={22} radius={5} />
        <FileThumb kind="video" tone={1} size={22} radius={5} />
      </span>
      <span className="flex gap-[6px]">
        <span className="flex h-[24px] flex-1 items-center justify-center rounded-[6px] border border-[#2E6390] bg-[#174068] text-[10px] font-medium">
          Decline
        </span>
        <span className="flex h-[24px] flex-[2] items-center justify-center rounded-[6px] bg-cyan text-[10px] font-semibold text-ink">
          Accept
        </span>
      </span>
    </div>
  );
}

export function DesktopIncomingScreen() {
  return (
    <div className="relative h-full">
      <DesktopHomeScreen />
      <IncomingOfferToast />
    </div>
  );
}

export function DesktopConnectedScreen() {
  return (
    <DesktopShell active="Devices">
      <div className="flex flex-1 flex-col items-center justify-center gap-[10px] text-center">
        <span className="flex size-[64px] items-center justify-center rounded-full bg-cyan/8 ring-1 ring-line">
          <span className="flex size-[42px] items-center justify-center rounded-full bg-cyan text-ink">
            <Check size={22} strokeWidth={2.8} />
          </span>
        </span>
        <ConnectedChip />
        <span className="text-[22px] font-bold tracking-[-0.03em]">Satyam's Phone is ready</span>
        <span className="flex items-center gap-[6px] text-[10px] text-muted">
          <Wifi size={11} /> Wi-Fi · Android
        </span>
        <span className="mt-[6px] flex h-[26px] items-center rounded-[6px] bg-cyan px-[12px] text-[10px] font-semibold text-ink">
          Start sending
        </span>
      </div>
    </DesktopShell>
  );
}
