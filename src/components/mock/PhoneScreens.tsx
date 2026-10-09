import {
  ArrowDown,
  Bell,
  Check,
  ClipboardList,
  FileText,
  Image,
  Laptop,
  Link2,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import { FileThumb, type FileKind } from '../FileThumb';

// Miniature copies of the phone app's screens, drawn to fit PhoneFrame.

const SEND_TILES: { icon: LucideIcon; label: string }[] = [
  { icon: Image, label: 'Photos' },
  { icon: FileText, label: 'Files' },
  { icon: Link2, label: 'Links' },
  { icon: ClipboardList, label: 'Clipboard' },
];

const RECENT_TRANSFERS: {
  kind: FileKind;
  tone: number;
  name: string;
  meta: string;
  wasSent: boolean;
}[] = [
  { kind: 'image', tone: 0, name: 'IMG_2051.jpg', meta: '2.4 MB', wasSent: true },
  { kind: 'pdf', tone: 0, name: 'Assignment.pdf', meta: '1.8 MB', wasSent: true },
  { kind: 'video', tone: 1, name: 'Lecture.mp4', meta: '342 MB', wasSent: false },
];

const OFFERED_FILES: { kind: FileKind; tone: number; name: string; size: string }[] = [
  { kind: 'image', tone: 0, name: 'IMG_2051.jpg', size: '2.4 MB' },
  { kind: 'pdf', tone: 0, name: 'Project_report.pdf', size: '1.8 MB' },
  { kind: 'video', tone: 1, name: 'Lecture.mp4', size: '1.0 GB' },
];

function ConnectedLaptopCard() {
  return (
    <div className="flex items-center gap-[10px] rounded-[14px] border border-line bg-surface p-[11px]">
      <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-elevated text-cyan">
        <Laptop size={17} />
      </span>
      <span className="flex flex-1 flex-col gap-[2px]">
        <span className="text-[12px] font-semibold">Satyam's Laptop</span>
        <span className="flex items-center gap-[4px] text-[9px] font-medium text-cyan">
          <span className="size-[5px] rounded-full bg-cyan" />
          Connected <span className="font-normal text-muted">· Wi-Fi</span>
        </span>
      </span>
      <span className="flex h-[24px] items-center rounded-[6px] border border-line-strong bg-elevated px-[8px] text-[9px] font-medium">
        Change
      </span>
    </div>
  );
}

function RecentTransferList() {
  return (
    <div className="flex flex-col gap-[5px]">
      {RECENT_TRANSFERS.map((transfer) => (
        <div
          key={transfer.name}
          className="flex items-center gap-[8px] rounded-[7px] bg-surface p-[5px]"
        >
          <FileThumb kind={transfer.kind} tone={transfer.tone} size={26} radius={6} />
          <span className="flex flex-1 flex-col">
            <span className="text-[10px] font-medium">{transfer.name}</span>
            <span className="font-mono text-[8px] text-muted">{transfer.meta}</span>
          </span>
          <span
            className={`flex items-center gap-[2px] text-[8px] font-medium ${transfer.wasSent ? 'text-success' : 'text-cyan'}`}
          >
            {transfer.wasSent ? (
              <Check size={8} strokeWidth={3} />
            ) : (
              <ArrowDown size={8} strokeWidth={3} />
            )}
            {transfer.wasSent ? 'Sent' : 'Received'}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PhoneHomeScreen() {
  return (
    <div className="flex flex-col gap-[12px] px-[14px] pt-[40px]">
      <div className="flex items-center justify-between">
        <span className="flex flex-col">
          <span className="text-[9px] text-muted">Thursday, 8 Oct</span>
          <span className="text-[16px] font-bold tracking-[-0.03em]">Good evening, Satyam</span>
        </span>
        <span className="flex size-[28px] items-center justify-center rounded-[7px] bg-surface">
          <Bell size={13} />
        </span>
      </div>
      <ConnectedLaptopCard />
      <span className="text-[11px] font-semibold">What do you want to send?</span>
      <div className="grid grid-cols-2 gap-[7px]">
        {SEND_TILES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex h-[64px] flex-col justify-between rounded-[11px] border border-line bg-surface p-[9px]"
          >
            <span className="flex size-[22px] items-center justify-center rounded-[6px] bg-cyan/12 text-cyan">
              <Icon size={12} />
            </span>
            <span className="text-[11px] font-semibold">{label}</span>
          </div>
        ))}
      </div>
      <span className="text-[11px] font-semibold">Recent</span>
      <RecentTransferList />
    </div>
  );
}

export function PhoneConnectedScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[10px] px-[20px] text-center">
      <span className="flex size-[78px] items-center justify-center rounded-full bg-cyan/8 ring-1 ring-line">
        <span className="flex size-[50px] items-center justify-center rounded-full bg-cyan text-ink">
          <Check size={26} strokeWidth={2.8} />
        </span>
      </span>
      <span className="mt-[6px] flex h-[18px] items-center gap-[4px] rounded-[4px] bg-cyan/12 px-[6px] text-[9px] font-medium text-cyan">
        <span className="size-[5px] rounded-full bg-cyan" />
        Connected
      </span>
      <span className="text-[20px] font-bold tracking-[-0.03em]">Satyam's Laptop</span>
      <span className="flex items-center gap-[5px] text-[10px] text-muted">
        <Wifi size={11} /> Wi-Fi
      </span>
      <span className="mt-[30px] flex h-[34px] w-full items-center justify-center rounded-[8px] bg-cyan text-[11px] font-semibold text-ink">
        Start sending
      </span>
    </div>
  );
}

function IncomingOfferSheet() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[10px] rounded-t-[18px] border-t border-line-strong bg-surface px-[14px] pt-[8px] pb-[18px]">
      <span className="mx-auto h-[3px] w-[30px] rounded-full bg-line-strong" />
      <span className="flex flex-col items-center gap-[6px]">
        <span className="flex size-[38px] items-center justify-center rounded-[10px] bg-elevated text-cyan">
          <Laptop size={18} />
        </span>
        <span className="text-[14px] font-bold">Satyam's Laptop</span>
        <span className="text-[10px] text-muted">wants to send 3 files</span>
      </span>
      <div className="rounded-[9px] border border-line bg-ink p-[4px]">
        {OFFERED_FILES.map((file) => (
          <div key={file.name} className="flex items-center gap-[7px] p-[4px]">
            <FileThumb kind={file.kind} tone={file.tone} size={22} radius={5} />
            <span className="flex-1 truncate text-[10px]">{file.name}</span>
            <span className="font-mono text-[9px] text-muted">{file.size}</span>
          </div>
        ))}
      </div>
      <span className="flex gap-[6px]">
        <span className="flex h-[32px] flex-1 items-center justify-center rounded-[8px] border border-line-strong bg-elevated text-[11px] font-medium">
          Decline
        </span>
        <span className="flex h-[32px] flex-[2] items-center justify-center rounded-[8px] bg-cyan text-[11px] font-semibold text-ink">
          Accept
        </span>
      </span>
    </div>
  );
}

export function PhoneIncomingScreen() {
  return (
    <div className="relative h-full">
      <div className="opacity-40">
        <PhoneHomeScreen />
      </div>
      <div className="absolute inset-0 bg-[#030C16]/60" />
      <IncomingOfferSheet />
    </div>
  );
}

const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const SENT_FRACTION = 0.62;

function ProgressRing() {
  return (
    <div className="relative mx-auto size-[130px]">
      <svg viewBox="0 0 130 130" className="size-full -rotate-90">
        <circle cx="65" cy="65" r={RING_RADIUS} fill="none" stroke="#123556" strokeWidth="8" />
        <circle
          cx="65"
          cy="65"
          r={RING_RADIUS}
          fill="none"
          stroke="#71C9CE"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${RING_LENGTH * SENT_FRACTION} ${RING_LENGTH}`}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[30px] font-bold tracking-[-0.04em]">62%</span>
        <span className="font-mono text-[8px] text-muted">3.1 / 5.0 GB</span>
      </span>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col rounded-[8px] border border-line bg-surface p-[7px]">
      <span className="text-[8px] text-muted">{label}</span>
      <span className="font-mono text-[11px]">{value}</span>
    </span>
  );
}

export function PhoneSendingScreen() {
  return (
    <div className="flex h-full flex-col gap-[14px] px-[16px] pt-[44px]">
      <span className="flex items-center justify-between">
        <span className="text-[15px] font-bold">Sending</span>
        <span className="flex h-[20px] items-center gap-[4px] rounded-[5px] border border-line bg-surface px-[6px] text-[9px]">
          <Laptop size={10} className="text-cyan" /> To Satyam's Laptop
        </span>
      </span>
      <ProgressRing />
      <div className="grid grid-cols-2 gap-[6px]">
        <StatTile label="Speed" value="24.8 MB/s" />
        <StatTile label="Time left" value="~1 min 18 s" />
      </div>
    </div>
  );
}
