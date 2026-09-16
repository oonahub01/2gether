"use client";

import { useState } from "react";
import { attention, funder, insights } from "@/lib/data";

const nav = [
  "Program Pulse",
  "Needs Attention",
  "Intelligence",
  "Funder View",
  "Impact Studio",
] as const;

type Nav = (typeof nav)[number];

export function AdminApp() {
  const [page, setPage] = useState<Nav>("Program Pulse");
  const [selected, setSelected] = useState(0);
  const [assigned, setAssigned] = useState(false);
  const [ask, setAsk] = useState("Why is Thursday evening weaker?");
  const [asked, setAsked] = useState(false);
  const [proof, setProof] = useState(false);

  return (
    <div className="flex min-h-[720px] overflow-hidden rounded-[28px] border border-white/10 bg-[var(--cream)] shadow-[0_30px_80px_rgba(0,0,0,.35)]">
      <aside className="w-[210px] shrink-0 bg-[var(--ink)] px-4 py-6 text-white">
        <div className="display px-2 text-2xl">2gether</div>
        <p className="mt-1 px-2 text-[11px] tracking-wide text-white/45">
          PROGRAM OPS
        </p>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`block w-full rounded-xl px-3 py-2.5 text-left text-[13px] ${
                page === item
                  ? "bg-white/10 text-[var(--gold-2)]"
                  : "text-white/65 hover:bg-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <div className="scroll-thin min-w-0 flex-1 overflow-y-auto p-7">
        {page === "Program Pulse" && <Pulse />}
        {page === "Needs Attention" && (
          <Attention
            selected={selected}
            setSelected={setSelected}
            assigned={assigned}
            setAssigned={setAssigned}
          />
        )}
        {page === "Intelligence" && (
          <Intel ask={ask} setAsk={setAsk} asked={asked} setAsked={setAsked} />
        )}
        {page === "Funder View" && <Funder proof={proof} setProof={setProof} />}
        {page === "Impact Studio" && <Impact />}
      </div>
    </div>
  );
}

function Pulse() {
  return (
    <div className="rise">
      <h1 className="display text-4xl">Program Pulse</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Fatherhood Initiative · current cohort
      </p>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {[
          ["124", "Active participants"],
          ["78%", "Weekly win completion"],
          ["82%", "Program engagement"],
          ["31", "Goals achieved"],
        ].map(([n, l]) => (
          <div key={l} className="card rounded-2xl p-4">
            <p className="display text-3xl">{n}</p>
            <p className="mt-1 text-[12px] text-[var(--muted)]">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="card rounded-2xl p-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--clay)]">
            NEEDS ATTENTION
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>6 high dropout risk</li>
            <li>5 no win completed in 7 days</li>
            <li>3 missed two sessions</li>
            <li>8 need accountability match</li>
          </ul>
        </div>
        <div className="card rounded-2xl p-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
            RECOMMENDED ACTIONS
          </p>
          <div className="mt-3 space-y-2">
            {[
              "Contact 6 participants at risk",
              "Recognize 9 milestone achievers",
              "Match 8 accountability partners",
              "Review Thursday group: completion ↓18%",
            ].map((t) => (
              <div
                key={t}
                className="rounded-xl bg-[var(--foam)] px-3 py-2 text-[13px]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card mt-3 rounded-2xl p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
          PROGRAM TREND
        </p>
        <svg viewBox="0 0 520 90" className="mt-3 h-20 w-full">
          <path
            d="M0 70 C40 68 70 62 110 58 C150 54 180 60 220 42 C260 24 300 38 340 30 C380 22 420 28 460 18 C490 12 510 16 520 14"
            fill="none"
            stroke="#1f6f54"
            strokeWidth="3"
          />
          <path
            d="M0 70 C40 68 70 62 110 58 C150 54 180 60 220 42 C260 24 300 38 340 30 C380 22 420 28 460 18 C490 12 510 16 520 14 L520 90 L0 90 Z"
            fill="url(#g)"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1f6f54" />
              <stop offset="1" stopColor="#1f6f54" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <p className="display mt-1 text-xl">Completion is up 6% this week</p>
        <p className="text-sm text-[var(--muted)]">
          27 participants improved · 9 milestones · 3 re-engaged
        </p>
      </div>
    </div>
  );
}

function Attention({
  selected,
  setSelected,
  assigned,
  setAssigned,
}: {
  selected: number;
  setSelected: (n: number) => void;
  assigned: boolean;
  setAssigned: (v: boolean) => void;
}) {
  const row = attention[selected];
  return (
    <div className="rise">
      <h1 className="display text-4xl">Needs Attention</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Explainable triggers. Assign, contact, resolve.
      </p>
      <div className="mt-6 grid grid-cols-[1.1fr_.9fr] gap-4">
        <div className="card overflow-hidden rounded-2xl">
          {attention.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center justify-between border-b border-[var(--line)] px-4 py-3.5 text-left ${
                i === selected ? "bg-[var(--foam)]" : ""
              }`}
            >
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-[12px] text-[var(--muted)]">{p.signal}</p>
              </div>
              <span
                className={`text-[11px] font-bold ${
                  p.priority === "HIGH" ? "text-[var(--clay)]" : "text-[var(--gold)]"
                }`}
              >
                {p.priority}
              </span>
            </button>
          ))}
        </div>
        <div className="card rounded-2xl p-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
            PARTICIPANT TIMELINE
          </p>
          <p className="display mt-1 text-2xl">{row.name}</p>
          <p className="mt-2 text-sm leading-relaxed">{row.why}</p>
          <div className="mt-4 space-y-2 text-[13px]">
            <p>Suggested: {row.action}</p>
            <p>Owner: {row.owner}</p>
            <p>Due: today</p>
          </div>
          <button
            onClick={() => setAssigned(true)}
            className="press mt-5 w-full rounded-xl bg-[var(--leaf)] py-3 text-sm font-semibold text-white"
          >
            {assigned ? "Assigned · follow-up in 48h" : "Assign / take action"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Intel({
  ask,
  setAsk,
  asked,
  setAsked,
}: {
  ask: string;
  setAsk: (v: string) => void;
  asked: boolean;
  setAsked: (v: boolean) => void;
}) {
  return (
    <div className="rise">
      <h1 className="display text-4xl">Program Intelligence</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Structured metrics first. Conversational Ask 2gether later.
      </p>
      <div className="mt-5 flex gap-2">
        <input
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          className="card flex-1 rounded-xl border-0 px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={() => setAsked(true)}
          className="rounded-xl bg-[var(--leaf)] px-5 text-sm font-semibold text-white"
        >
          Ask
        </button>
      </div>
      {asked && (
        <div className="card mt-3 rounded-2xl p-4 text-sm leading-relaxed">
          Thursday groups complete 61% of planned wins vs 78% Monday/Tuesday.
          Attendance is similar; the drop is after the meeting, in Right Now
          follow-through. Recommendation: move check-ins earlier or add a same-night
          recovery win.
        </div>
      )}
      <h2 className="mt-8 text-lg font-semibold">3 things you should know this week</h2>
      <div className="mt-3 space-y-3">
        {insights.map((i) => (
          <div key={i.n} className="card rounded-2xl p-5">
            <p className="text-[12px] font-semibold text-[var(--gold)]">{i.n}</p>
            <p className="display mt-1 text-xl">{i.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{i.body}</p>
            <p className="mt-2 text-sm font-medium text-[var(--leaf)]">
              Recommendation: {i.rec}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Funder({
  proof,
  setProof,
}: {
  proof: boolean;
  setProof: (v: boolean) => void;
}) {
  const cards = [
    ["THE NEED", "Who needs this and why?", `${funder.enrolled} fathers enrolled · 41% entered with low baseline consistency`],
    ["THE CHANGE", "What changed?", `${funder.lift} Behavior Lift · 214 milestones reached`],
    ["THE PROOF", "How do we know?", `${funder.actions} recorded positive actions · ${funder.sustained} sustained at 60-day follow-up`],
    ["YOUR IMPACT", "What did funding enable?", `${funder.investment} → 200 participants → ${funder.goals} goals achieved`],
    ["THE OPPORTUNITY", "What can the next investment enable?", "$50K expansion target → ~100 additional participants (estimate)"],
  ];
  return (
    <div className="rise">
      <h1 className="display text-4xl">Funder View</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        A funding case in five questions — claims trace to Proof Cards.
      </p>
      <div className="mt-6 space-y-3">
        {cards.map(([k, q, a], i) => (
          <button
            key={k}
            onClick={() => i === 2 && setProof(true)}
            className="card flex w-full items-start gap-4 rounded-2xl p-5 text-left"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
                {k}
              </p>
              <p className="display text-xl">{q}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{a}</p>
            </div>
          </button>
        ))}
      </div>
      {proof && (
        <div className="card mt-4 rounded-2xl p-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold)]">
            PROOF CARD · BEHAVIOR LIFT
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            Definition: change in planned positive-behavior completion between
            baseline weeks 1–2 and weeks 9–10. Numerator: completed wins.
            Denominator: scheduled wins. Population: enrolled Spring Cohort
            (n=124). Source: win_completed events. Missing data: excluded, not
            imputed. Evidence strength: observational. Last updated: 16 Sep 2026.
          </p>
        </div>
      )}
    </div>
  );
}

function Impact() {
  const steps = [
    ["$100,000", "Invested"],
    ["200", "Participants"],
    ["8,420", "Positive actions"],
    ["162", "Completions"],
    ["127", "Goals achieved"],
    ["98", "Sustained"],
  ];
  return (
    <div className="rise">
      <h1 className="display text-4xl">Impact Studio</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Investment → behavior → outcome → sustained change
      </p>
      <div className="mt-6 grid grid-cols-6 gap-2">
        {steps.map(([n, l]) => (
          <div key={l} className="card rounded-2xl p-3 text-center">
            <p className="display text-lg">{n}</p>
            <p className="text-[11px] text-[var(--muted)]">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-[var(--forest)] p-6 text-white">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold-2)]">
          WHY THIS MATTERS
        </p>
        <p className="display mt-2 text-3xl leading-tight">
          The program does not stop at attendance.
        </p>
        <p className="mt-3 max-w-xl text-sm text-white/75">
          2gether shows what participants did, what changed, whether it lasted,
          and how funding connected to real-world progress.
        </p>
      </div>
      <p className="mt-4 text-[12px] text-[var(--muted)]">
        Forecasts are labeled as estimates. Outcomes are never guaranteed.
        Sponsors see aggregates only.
      </p>
    </div>
  );
}
