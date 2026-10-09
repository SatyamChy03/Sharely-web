export type FileKind = 'image' | 'video' | 'pdf' | 'zip' | 'link';

interface FileThumbProps {
  kind: FileKind;
  /** Picks one of the painted colour sets for photos and videos. */
  tone?: number;
  size?: number;
  radius?: number;
}

const SCENE_TONES = [
  { sky: '#2B5D7C', sun: '#F2C46D', hill: '#173B55' },
  { sky: '#6FA9BE', sun: '#F5FAFC', hill: '#2F6E6B' },
  { sky: '#B98668', sun: '#F6D9A8', hill: '#5E433B' },
  { sky: '#5868A0', sun: '#E9B7C9', hill: '#2C3A68' },
];

type SceneTone = (typeof SCENE_TONES)[number];

function ImageArt({ tone }: { tone: SceneTone }) {
  return (
    <>
      <rect width="40" height="40" fill={tone.sky} />
      <circle cx="28" cy="12" r="5" fill={tone.sun} />
      <path d="M0 40V29l10-11 9 10 6-6 15 14v4z" fill={tone.hill} />
    </>
  );
}

function VideoArt({ tone }: { tone: SceneTone }) {
  return (
    <>
      <rect width="40" height="40" fill="#0A1626" />
      <rect width="40" height="40" fill={tone.sky} opacity=".55" />
      <path d="M0 40V30l12-10 10 9 7-5 11 10v6z" fill={tone.hill} opacity=".7" />
      <circle cx="20" cy="20" r="8.5" fill="#071A2D" opacity=".78" />
      <path d="M17.6 16.3v7.4l6.2-3.7z" fill="#F5FAFC" />
    </>
  );
}

function PdfArt() {
  return (
    <>
      <rect width="40" height="40" fill="#E6EFF3" />
      <rect x="8" y="7" width="18" height="2.4" rx="1.2" fill="#6F8798" />
      <rect x="8" y="12" width="24" height="1.6" rx=".8" fill="#AFC0CC" />
      <rect x="8" y="15.5" width="22" height="1.6" rx=".8" fill="#AFC0CC" />
      <rect x="8" y="19" width="24" height="1.6" rx=".8" fill="#AFC0CC" />
      <rect y="27" width="40" height="13" fill="#E0475F" />
      <text
        x="20"
        y="36.4"
        textAnchor="middle"
        fontFamily="Geist Variable, sans-serif"
        fontSize="8"
        fontWeight="700"
        fill="#fff"
      >
        PDF
      </text>
    </>
  );
}

function GlyphArt({ kind }: { kind: 'zip' | 'link' }) {
  return (
    <>
      <rect width="40" height="40" fill="#123556" />
      <g
        transform="translate(10 10) scale(.8333)"
        fill="none"
        stroke={kind === 'link' ? '#71C9CE' : '#91A9BA'}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === 'zip' ? (
          <>
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
            <path d="M14 2v5h6M10 6h1M10 9h1M10 12h1M9.5 15h2v3h-2z" />
          </>
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </>
        )}
      </g>
    </>
  );
}

/** A small painted thumbnail, matching the ones the app draws for each file type. */
export function FileThumb({ kind, tone = 0, size = 40, radius = 8 }: FileThumbProps) {
  const sceneTone = SCENE_TONES[tone % SCENE_TONES.length];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ borderRadius: radius, flexShrink: 0 }}
      aria-hidden="true"
    >
      {kind === 'image' && <ImageArt tone={sceneTone} />}
      {kind === 'video' && <VideoArt tone={sceneTone} />}
      {kind === 'pdf' && <PdfArt />}
      {(kind === 'zip' || kind === 'link') && <GlyphArt kind={kind} />}
    </svg>
  );
}
