import { ReactNode } from "react";

export function PhoneFrame({
  time,
  children,
}: {
  time: string;
  children: ReactNode;
}) {
  return (
    <div className="phone-bezel relative h-[760px] w-[372px] rounded-[46px] p-[10px]">
      <div className="pointer-events-none absolute left-1/2 top-[12px] z-20 h-[26px] w-[118px] -translate-x-1/2 rounded-full bg-black" />
      <div className="phone-screen relative flex h-full flex-col overflow-hidden rounded-[36px]">
        <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold tracking-wide text-[var(--ink)]/70">
          <span>{time}</span>
          <span className="pr-1">5G · 84%</span>
        </div>
        {children}
      </div>
    </div>
  );
}
