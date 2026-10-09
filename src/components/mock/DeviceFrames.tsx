import type { ReactNode } from 'react';

export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-[18px] border border-[#2A527A] bg-[#0A1C30] p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
        <div className="overflow-hidden rounded-[8px]" style={{ width: 720, height: 450 }}>
          {children}
        </div>
      </div>
      <div className="h-[14px] w-[800px] rounded-b-[14px] border border-t-0 border-[#2A527A] bg-linear-to-b from-[#1A3C5E] to-[#0E2640]" />
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-[40px] border border-[#2A527A] bg-[#0A1C30] p-[8px] shadow-[0_30px_70px_-16px_rgba(0,0,0,0.75)]"
      style={{ width: 280, height: 580 }}
    >
      <div className="relative h-full overflow-hidden rounded-[32px] bg-ink text-fg">
        <div className="absolute top-[8px] left-1/2 z-10 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-[#030B14]" />
        {children}
      </div>
    </div>
  );
}
