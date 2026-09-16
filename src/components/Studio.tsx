"use client";

import { useState } from "react";
import { AdminApp } from "./AdminApp";
import { MobileApp } from "./MobileApp";

export function Studio() {
  const [view, setView] = useState<"participant" | "ops">("participant");

  return (
    <div className="grain relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col px-6 py-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--gold-2)]">
              FATHER MOVEMENT · MVP DEMO
            </p>
            <h1 className="display text-3xl text-white md:text-4xl">2gether</h1>
          </div>
          <div className="flex rounded-full bg-white/8 p-1 ring-1 ring-white/10">
            {(
              [
                ["participant", "Participant app"],
                ["ops", "Admin + funder"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  view === id
                    ? "bg-[var(--gold)] text-[var(--ink)]"
                    : "text-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {view === "participant" ? (
          <div className="mt-8 grid flex-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl text-white">
              <p className="text-[13px] tracking-[0.2em] text-[var(--gold-2)]">
                OPEN → ACT → ACCOMPLISH → CELEBRATE → LEAVE
              </p>
              <h2 className="display mt-4 text-5xl leading-[1.05] md:text-6xl">
                The next useful action.
                <span className="block text-[var(--mint)]">Then go live it.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
                Interactive MVP slice: Right Now wins, miss/recovery coaching,
                finite progress feed, milestone rewards, and a Program Pulse for
                staff and funders — from the same behavioral data.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li>Start the 7:00 AM walk (demo completes in seconds)</li>
                <li>Or tap “I missed it” for a constrained AI recovery</li>
                <li>React in Group, redeem Rewards, then switch to Ops</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <MobileApp />
            </div>
          </div>
        ) : (
          <div className="mt-8 flex-1">
            <AdminApp />
          </div>
        )}
      </div>
    </div>
  );
}
