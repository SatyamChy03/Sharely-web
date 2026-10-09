interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** The Sharely mark: an "S" curve running from one device dot to the other. */
export function LogoMark({ size = 28, className }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path
        d="M16 18 C 54 18, 10 46, 48 46"
        fill="none"
        stroke="#71C9CE"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="18" r="7" fill="#F5FAFC" />
      <circle cx="48" cy="46" r="7" fill="#71C9CE" />
    </svg>
  );
}

export function Logo({ size = 28, className = '' }: LogoMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="text-[21px] font-bold tracking-[-0.04em] text-fg">sharely</span>
    </span>
  );
}
