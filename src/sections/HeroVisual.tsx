import { useEffect, useState, type CSSProperties } from 'react';
import { FileThumb, type FileKind } from '../components/FileThumb';
import { DesktopHomeScreen } from '../components/mock/DesktopScreens';
import { LaptopFrame, PhoneFrame } from '../components/mock/DeviceFrames';
import { PhoneHomeScreen } from '../components/mock/PhoneScreens';
import { ScaledStage } from '../components/mock/ScaledStage';
import { useReducedMotion } from '../lib/useReducedMotion';

const STAGE_WIDTH = 680;
const STAGE_HEIGHT = 520;
/** The arc files travel along, from the laptop's screen to the phone's. */
const FLOW_PATH = 'M 330 150 C 410 30, 540 40, 575 152';
const DRAG_TOGGLE_MS = 3200;

interface FloatingFileProps {
  kind: FileKind;
  tone: number;
  name: string;
  size: string;
  style: CSSProperties;
}

function FloatingFile({ kind, tone, name, size, style }: FloatingFileProps) {
  return (
    <div
      className="absolute flex items-center gap-2 rounded-[10px] border border-line-strong bg-elevated py-1.5 pr-3 pl-1.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)]"
      style={style}
    >
      <FileThumb kind={kind} tone={tone} size={28} radius={6} />
      <span className="flex flex-col leading-tight">
        <span className="text-[12px] font-medium">{name}</span>
        <span className="font-mono text-[10px] text-muted">{size}</span>
      </span>
    </div>
  );
}

function FlowArc() {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      aria-hidden="true"
    >
      <path
        d={FLOW_PATH}
        fill="none"
        stroke="#71C9CE"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
      <circle cx="330" cy="150" r="5" fill="#F5FAFC" />
      <circle cx="575" cy="152" r="5" fill="#71C9CE" />
    </svg>
  );
}

function TravellingFiles() {
  const alongArc: CSSProperties = { offsetPath: `path('${FLOW_PATH}')`, offsetRotate: '0deg' };
  return (
    <>
      <div className="absolute top-0 left-0 animate-flow-right" style={alongArc}>
        <div className="-translate-x-1/2 -translate-y-1/2 rounded-[8px] ring-2 ring-cyan/70">
          <FileThumb kind="pdf" size={30} radius={7} />
        </div>
      </div>
      <div className="absolute top-0 left-0 animate-flow-left" style={alongArc}>
        <div className="-translate-x-1/2 -translate-y-1/2 rounded-[8px] ring-2 ring-aqua/70">
          <FileThumb kind="image" tone={1} size={30} radius={7} />
        </div>
      </div>
    </>
  );
}

/** Alternates the laptop's drop zone between idle and "drop to send". */
function useDragOverDemo(isPaused: boolean): boolean {
  const [isDragOver, setIsDragOver] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setIsDragOver((current) => !current), DRAG_TOGGLE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);
  return isDragOver;
}

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const isDragOver = useDragOverDemo(prefersReducedMotion);

  return (
    <ScaledStage
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      label="Sharely on a laptop and a phone, with a photo, a PDF and a video moving between them in both directions."
    >
      <div className="relative" style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}>
        <div className="absolute top-[40px] left-[380px] h-[200px] w-[260px] rounded-full bg-cyan/10 blur-3xl" />
        <div
          className="absolute top-[70px] left-0 origin-top-left"
          style={{ transform: 'scale(0.7)' }}
        >
          <LaptopFrame>
            <DesktopHomeScreen dragOver={isDragOver} />
          </LaptopFrame>
        </div>
        <div
          className="absolute top-[150px] left-[488px] origin-top-left"
          style={{ transform: 'scale(0.62)' }}
        >
          <PhoneFrame>
            <PhoneHomeScreen />
          </PhoneFrame>
        </div>
        <FlowArc />
        {!prefersReducedMotion && <TravellingFiles />}
        <FloatingFile
          kind="image"
          tone={0}
          name="IMG_2051.jpg"
          size="2.4 MB"
          style={{ left: 330, top: 6 }}
        />
        <FloatingFile
          kind="video"
          tone={1}
          name="Lecture.mp4"
          size="342 MB"
          style={{ left: 300, top: 440 }}
        />
      </div>
    </ScaledStage>
  );
}
