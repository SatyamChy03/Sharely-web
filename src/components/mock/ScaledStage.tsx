import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface ScaledStageProps {
  /** The size the children are drawn at, in px. */
  width: number;
  height: number;
  /** What the picture shows, for screen readers. */
  label: string;
  className?: string;
  children: ReactNode;
}

/** Shrinks a fixed-size mock-up to the width available, keeping its proportions. */
export function ScaledStage({ width, height, label, className = '', children }: ScaledStageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const updateScale = () => setScale(frame.clientWidth / width);
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={label}
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
