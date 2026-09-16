"use client";

import { useState } from "react";
import { img } from "@/lib/data";
import { AdminApp } from "./AdminApp";
import { MobileApp } from "./MobileApp";
import { Photo } from "./Photo";

export function Studio() {
  const [view, setView] = useState<"participant" | "ops">("participant");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--ink)]">
      <Photo
        src={img.forest}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[var(--ink)]/75 to-[var(--ink)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] flex-col px-6 py-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--gold-2)]">
              FATHER MOVEMENT · COMPLETE MVP DEMO
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
          <div className="mt-8 grid flex-1 items-start gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl text-white">
              <p className="text-[13px] tracking-[0.2em] text-[var(--gold-2)]">
                OPEN → ACT → ACCOMPLISH → CELEBRATE → LEAVE
              </p>
              <h2 className="display mt-4 text-5xl leading-[1.05] md:text-6xl">
                Built from the
                <span className="block text-[var(--mint)]">MVP design doc.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/70">
                Onboarding, Right Now, miss/recovery, 3–5 active goals, finite
                progress feed, circles, structured posts, points, sponsored
                milestones, sponsor aggregates, Program Pulse, Needs Attention,
                reports, Proof Cards, and Impact Studio.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li>Three onboarding plates, then Start walk or I missed it</li>
                <li>Group: Feed · People · Circle · Share</li>
                <li>Rewards catalog photos · milestone verification</li>
                <li>Switch to Ops for pulse, funnel, funder five questions</li>
              </ul>
            </div>
            <div className="flex justify-center pb-8">
              <MobileApp />
            </div>
          </div>
        ) : (
          <div className="mt-8 flex-1 pb-8">
            <AdminApp />
          </div>
        )}
      </div>
    </div>
  );
}
