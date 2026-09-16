"use client";

import { useState } from "react";
import { attention, funnel, funder, img, insights } from "@/lib/data";
import { Avatar, Photo } from "./Photo";

const nav = [
  "Program Pulse",
  "Participants",
  "Groups",
  "Interventions",
  "Rewards",
  "Reports",
  "Intelligence",
  "Funder View",
  "Impact Studio",
] as const;

type Nav = (typeof nav)[number];

export function AdminApp() {
  const [page, setPage] = useState<Nav>("Program Pulse");
  const [selected, setSelected] = useState(0);
  const [assigned, setAssigned] = useState(false);
  const [ask, setAsk] = useState("Why is Cohort C performing worse?");
  const [asked, setAsked] = useState(false);
  const [proof, setProof] = useState(false);
  const [audience, setAudience] = useState("Funder");

  return (
    <div className="flex min-h-[760px] overflow-hidden rounded-[28px] border border-white/10 bg-[var(--cream)] shadow-[0_30px_80px_rgba(0,0,0,.35)]">
      <aside className="w-[200px] shrink-0 bg-[var(--ink)] px-3 py-6 text-white">
        <div className="display px-2 text-2xl">2gether</div>
        <p className="mt-1 px-2 text-[10px] tracking-[0.16em] text-white/45">PROGRAM OPS</p>
        <nav className="mt-6 space-y-0.5">
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`block w-full rounded-xl px-3 py-2 text-left text-[12px] ${
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
      <div className="scroll-thin min-w-0 flex-1 overflow-y-auto p-6">
        {page === "Program Pulse" && <Pulse />}
        {page === "Participants" && (
          <Attention
            selected={selected}
            setSelected={setSelected}
            assigned={assigned}
            setAssigned={setAssigned}
          />
        )}
        {page === "Groups" && <Groups />}
        {page === "Interventions" && <Interventions />}
        {page === "Rewards" && <RewardOps />}
        {page === "Reports" && (
          <Reports audience={audience} setAudience={setAudience} />
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
      <div className="relative overflow-hidden rounded-[22px]">
        <Photo src={img.circle} alt="Cohort" className="h-36 w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 p-5 text-white">
          <p className="text-[11px] tracking-[0.16em] text-[var(--gold-2)]">FATHERHOOD INITIATIVE</p>
          <h1 className="display text-3xl">Program Pulse</h1>
          <p className="text-sm text-white/75">Current cohort · same events as the participant app</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {[
          ["124", "Active participants"],
          ["78%", "Weekly win completion"],
          ["82%", "Engagement"],
          ["31", "Goals achieved"],
        ].map(([n, l]) => (
          <div key={l} className="card rounded-2xl p-4">
            <p className="display text-3xl">{n}</p>
            <p className="mt-1 text-[12px] text-[var(--muted)]">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
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
          <div className="mt-3 space-y-2 text-[13px]">
            {[
              "Contact 6 participants at risk",
              "Recognize 9 milestone achievers",
              "Match 8 accountability partners",
              "Review Thursday group: completion ↓18%",
            ].map((t) => (
              <div key={t} className="rounded-xl bg-[var(--foam)] px-3 py-2">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card mt-3 rounded-2xl p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
          FUNNEL · REFERRED → OUTCOME
        </p>
        <div className="mt-3 flex gap-2">
          {funnel.map(([l, n]) => (
            <div key={l} className="flex-1 rounded-xl bg-[var(--foam)] p-2 text-center">
              <p className="display text-lg">{n}</p>
              <p className="text-[10px] text-[var(--muted)]">{l}</p>
            </div>
          ))}
        </div>
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
      <h1 className="display text-3xl">Needs Attention</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Explainable triggers. Every signal says why they were surfaced.
      </p>
      <div className="mt-5 grid grid-cols-[1.05fr_.95fr] gap-4">
        <div className="card overflow-hidden rounded-2xl">
          {attention.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center gap-3 border-b border-[var(--line)] px-4 py-3 text-left ${
                i === selected ? "bg-[var(--foam)]" : ""
              }`}
            >
              <Avatar src={p.avatar} alt={p.name} size={40} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="truncate text-[12px] text-[var(--muted)]">{p.signal}</p>
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
          <div className="flex items-center gap-3">
            <Avatar src={row.avatar} alt={row.name} size={52} />
            <div>
              <p className="display text-xl">{row.name}</p>
              <p className="text-[12px] text-[var(--muted)]">Timeline · goals, wins, interventions</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{row.why}</p>
          <ul className="mt-3 space-y-1 text-[13px] text-[var(--muted)]">
            {row.timeline.map((t) => (
              <li key={t}>· {t}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">Suggested: {row.action} · {row.owner} · due today</p>
          <button
            onClick={() => setAssigned(true)}
            className="press mt-4 w-full rounded-xl bg-[var(--leaf)] py-3 text-sm font-semibold text-white"
          >
            {assigned ? "Assigned · follow-up in 48h" : "Assign / take action"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Groups() {
  return (
    <div className="rise">
      <h1 className="display text-3xl">Groups</h1>
      <p className="text-sm text-[var(--muted)]">Organization group is the social home.</p>
      <Photo src={img.circle} alt="" className="mt-4 h-44 w-full rounded-[22px]" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Spring Cohort", "14 members · 78% completion"],
          ["Thursday evening", "11 members · 61% completion"],
          ["Walking Circle", "483 across programs"],
          ["Intentional Fatherhood", "326 members"],
        ].map(([t, d]) => (
          <div key={t} className="card rounded-2xl p-4">
            <p className="font-semibold">{t}</p>
            <p className="text-[13px] text-[var(--muted)]">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Interventions() {
  return (
    <div className="rise">
      <h1 className="display text-3xl">Interventions</h1>
      <p className="text-sm text-[var(--muted)]">
        Alert → assign → contact/adjust/refer → track response.
      </p>
      <div className="mt-4 space-y-3">
        {[
          ["Marcus Johnson", "Check-in SMS", "Open", img.marcus],
          ["David R.", "Facilitator call", "Due today", img.david],
          ["James T.", "Accountability match", "Queued", img.james],
        ].map(([n, a, s, av]) => (
          <div key={n} className="card flex items-center justify-between rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Avatar src={av} alt={n} />
              <div>
                <p className="font-semibold">{n}</p>
                <p className="text-[13px] text-[var(--muted)]">{a}</p>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[var(--leaf)]">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RewardOps() {
  return (
    <div className="rise">
      <h1 className="display text-3xl">Reward pool</h1>
      <p className="text-sm text-[var(--muted)]">
        Budget caps, sponsor attribution, verification levels.
      </p>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {["smoothie", "movie", "fitness", "savings"].map((k) => {
          const r = {
            smoothie: [img.smoothie, "Smoothie", "42 left"],
            movie: [img.movie, "Movie night", "18 left"],
            fitness: [img.fitness, "Fitness class", "9 left"],
            savings: [img.savings, "$25 boost", "Cap $2,500"],
          }[k]!;
          return (
            <div key={k} className="card overflow-hidden rounded-2xl">
              <Photo src={r[0]} alt={r[1]} className="h-28 w-full" />
              <div className="p-3">
                <p className="font-semibold">{r[1]}</p>
                <p className="text-[12px] text-[var(--muted)]">{r[2]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Reports({
  audience,
  setAudience,
}: {
  audience: string;
  setAudience: (v: string) => void;
}) {
  return (
    <div className="rise">
      <h1 className="display text-3xl">Reports</h1>
      <p className="text-sm text-[var(--muted)]">Audience views over the same governed metrics.</p>
      <div className="mt-4 flex gap-2">
        {["Program Admin", "Funder", "Donor", "Business"].map((a) => (
          <button
            key={a}
            onClick={() => setAudience(a)}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${
              audience === a ? "bg-[var(--foam)] text-[var(--leaf)]" : "bg-white"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="card mt-4 rounded-2xl p-5">
        <p className="text-[11px] font-semibold text-[var(--leaf)]">
          {audience.toUpperCase()} OUTCOME SUMMARY
        </p>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            ["1,200", "Enrolled"],
            ["892", "Completed"],
            ["18,421", "Positive actions"],
            ["642", "Goals achieved"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="display text-2xl">{n}</p>
              <p className="text-[12px] text-[var(--muted)]">{l}</p>
            </div>
          ))}
        </div>
        {[
          ["Average consistency", "76%"],
          ["30+ day maintenance", "72%"],
          ["Program completion", "74%"],
          ["Goal achievement", "54%"],
        ].map(([l, n]) => (
          <div key={l} className="mt-3">
            <div className="flex justify-between text-[13px]">
              <span>{l}</span>
              <span>{n}</span>
            </div>
            <div className="progress mt-1">
              <span style={{ width: n }} />
            </div>
          </div>
        ))}
        <p className="mt-4 text-[12px] text-[var(--muted)]">
          Investment $500,000 · $416 per enrolled · $779 per achieved goal
        </p>
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
      <h1 className="display text-3xl">Program Intelligence</h1>
      <p className="text-sm text-[var(--muted)]">
        Structured metrics first. Ask 2gether stays explainable.
      </p>
      <div className="mt-4 flex gap-2">
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
          Thursday groups complete 61% of planned wins vs 78% Monday/Tuesday. Attendance is
          similar; the drop is after the meeting, in Right Now follow-through. Recommendation:
          same-night recovery win.
        </div>
      )}
      <h2 className="mt-6 text-lg font-semibold">3 things you should know this week</h2>
      <div className="mt-3 space-y-3">
        {insights.map((i) => (
          <div key={i.n} className="card rounded-2xl p-5">
            <p className="text-[12px] font-semibold text-[var(--gold)]">{i.n}</p>
            <p className="display mt-1 text-xl">{i.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{i.body}</p>
            <p className="mt-2 text-sm font-medium text-[var(--leaf)]">Recommendation: {i.rec}</p>
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
      <h1 className="display text-3xl">Funder View</h1>
      <p className="text-sm text-[var(--muted)]">Five questions. Claims trace to Proof Cards.</p>
      <Photo src={img.family} alt="" className="mt-4 h-36 w-full rounded-[22px]" />
      <div className="mt-4 space-y-2">
        {cards.map(([k, q, a], i) => (
          <button
            key={k}
            onClick={() => i === 2 && setProof(true)}
            className="card flex w-full items-start gap-4 rounded-2xl p-4 text-left"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">{k}</p>
              <p className="display text-lg">{q}</p>
              <p className="text-sm text-[var(--muted)]">{a}</p>
            </div>
          </button>
        ))}
      </div>
      {proof && (
        <div className="card mt-3 rounded-2xl p-5 text-sm leading-relaxed">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold)]">
            PROOF CARD · BEHAVIOR LIFT
          </p>
          Definition: change in planned positive-behavior completion between baseline weeks 1–2
          and weeks 9–10. Population: Spring Cohort n=124. Source: win_completed. Missing data
          excluded. Evidence: observational. Updated 16 Sep 2026.
        </div>
      )}
    </div>
  );
}

function Impact() {
  const steps = [
    ["$100,000", "Invested"],
    ["200", "Participants"],
    ["8,420", "Actions"],
    ["162", "Completions"],
    ["127", "Goals"],
    ["98", "Sustained"],
  ];
  return (
    <div className="rise">
      <h1 className="display text-3xl">Impact Studio</h1>
      <p className="text-sm text-[var(--muted)]">Investment → behavior → outcome → sustained change</p>
      <Photo src={img.forest} alt="" className="mt-4 h-36 w-full rounded-[22px]" />
      <div className="mt-4 grid grid-cols-6 gap-2">
        {steps.map(([n, l]) => (
          <div key={l} className="card rounded-2xl p-3 text-center">
            <p className="display text-base">{n}</p>
            <p className="text-[11px] text-[var(--muted)]">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-[var(--forest)] p-6 text-white">
        <p className="text-[11px] tracking-[0.16em] text-[var(--gold-2)]">WHY THIS MATTERS</p>
        <p className="display mt-2 text-3xl leading-tight">The program does not stop at attendance.</p>
        <p className="mt-3 max-w-xl text-sm text-white/75">
          2gether shows what participants did, what changed, whether it lasted, and how funding
          connected to real-world progress. Forecasts labeled as estimates.
        </p>
      </div>
    </div>
  );
}
