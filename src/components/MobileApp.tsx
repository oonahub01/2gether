"use client";

import { useEffect, useMemo, useState } from "react";
import { feed, goals, participant, rewards } from "@/lib/data";
import { Icon } from "./Icons";
import { PhoneFrame } from "./PhoneFrame";

type Tab = "today" | "goals" | "group" | "rewards" | "me";
type Mode = "ready" | "walking" | "done" | "missed";

const reactions = ["Celebrate", "Encourage", "Support", "Keep going", "I’ll join you"];

export function MobileApp() {
  const [tab, setTab] = useState<Tab>("today");
  const [mode, setMode] = useState<Mode>("ready");
  const [seconds, setSeconds] = useState(20 * 60);
  const [streak, setStreak] = useState(participant.streak);
  const [points, setPoints] = useState(participant.points);
  const [reacted, setReacted] = useState<Record<string, string>>({});
  const [shareOpen, setShareOpen] = useState(false);
  const [redeemed, setRedeemed] = useState<string | null>(null);
  const [caughtUp, setCaughtUp] = useState(false);
  const [recovered, setRecovered] = useState(false);

  useEffect(() => {
    if (mode !== "walking") return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 20 * 60 - 8) {
          setRecovered(false);
          setMode("done");
          setStreak(9);
          setPoints((p) => p + 50);
          return s;
        }
        return s - 1;
      });
    }, 180);
    return () => clearInterval(id);
  }, [mode]);

  const clock = useMemo(() => {
    if (mode === "done") return "7:24";
    if (mode === "missed") return "8:15";
    if (mode === "walking") return "7:08";
    return "7:00";
  }, [mode]);

  return (
    <PhoneFrame time={clock}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-3">
          {tab === "today" && (
            <Today
              mode={mode}
              seconds={seconds}
              streak={streak}
              onStart={() => {
                setSeconds(20 * 60);
                setMode("walking");
              }}
              onMiss={() => setMode("missed")}
              recovered={recovered}
              onRecover={() => {
                setRecovered(true);
                setMode("done");
                setStreak(9);
                setPoints((p) => p + 30);
              }}
              onReset={() => {
                setRecovered(false);
                setMode("ready");
                setSeconds(20 * 60);
                setStreak(participant.streak);
                setPoints(participant.points);
              }}
            />
          )}
          {tab === "goals" && <Goals />}
          {tab === "group" && (
            <Group
              reacted={reacted}
              onReact={(id, label) => setReacted((r) => ({ ...r, [id]: label }))}
              shareOpen={shareOpen}
              setShareOpen={setShareOpen}
              caughtUp={caughtUp}
              setCaughtUp={setCaughtUp}
              onStartWalk={() => {
                setTab("today");
                setSeconds(20 * 60);
                setMode("walking");
              }}
            />
          )}
          {tab === "rewards" && (
            <Rewards points={points} redeemed={redeemed} onRedeem={setRedeemed} />
          )}
          {tab === "me" && <Me points={points} streak={streak} />}
        </div>
        <nav className="grid grid-cols-5 border-t border-[var(--line)] bg-[var(--paper)] px-1 pb-3 pt-2">
          {(
            [
              ["today", "home", "Today"],
              ["goals", "target", "Goals"],
              ["group", "users", "Group"],
              ["rewards", "star", "Rewards"],
              ["me", "user", "Me"],
            ] as const
          ).map(([id, icon, label]) => {
            const on = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
                  on ? "text-[var(--leaf)]" : "text-[var(--muted)]"
                }`}
              >
                <Icon name={icon} size={20} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </PhoneFrame>
  );
}

function Brand({ kicker }: { kicker: string }) {
  return (
    <div className="mb-4">
      <div className="display text-[28px] leading-none font-semibold tracking-tight">
        2gether
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--muted)]">{kicker}</p>
    </div>
  );
}

function Today({
  mode,
  seconds,
  streak,
  onStart,
  onMiss,
  recovered,
  onRecover,
  onReset,
}: {
  mode: Mode;
  seconds: number;
  streak: number;
  onStart: () => void;
  onMiss: () => void;
  recovered: boolean;
  onRecover: () => void;
  onReset: () => void;
}) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (mode === "walking") {
    return (
      <div className="rise">
        <Brand kicker="You’re in it. Leave when you’re done." />
        <div className="card relative overflow-hidden rounded-[28px] p-5">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--mint)]/50 blur-2xl" />
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--leaf)]">
            RIGHT NOW
          </p>
          <h2 className="display mt-2 text-[30px] leading-tight">Morning walk</h2>
          <p className="mt-8 text-center font-mono text-[52px] tracking-tight">
            {mm}:{ss}
          </p>
          <p className="mb-6 text-center text-sm text-[var(--muted)]">
            Demo speeds this up so you can complete the loop.
          </p>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--foam)]">
            <div
              className="h-full bg-[var(--leaf)] transition-all"
              style={{ width: `${((20 * 60 - seconds) / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div className="rise">
        <Brand kicker="Morning win complete" />
        <div className="card burst rounded-[28px] bg-[linear-gradient(180deg,#e9f6ee,#fffaf2)] p-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--leaf)] text-white">
            <Icon name="check" />
          </div>
          <h2 className="display mt-4 text-[28px] leading-tight">20-minute walk</h2>
          <p className="mt-1 text-[12px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
            COMPLETED
          </p>
          <p className="mt-4 text-sm">
            {streak}-day momentum · +{recovered ? 30 : 50} points
          </p>
          <p className="display mt-5 text-[22px]">You’re done for now.</p>
        </div>
        <section className="mt-5">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
            NEXT WIN
          </p>
          <div className="card rounded-[22px] p-4">
            <p className="text-sm font-semibold">Partner check-in</p>
            <p className="text-[13px] text-[var(--muted)]">
              Relationship · 7:00 PM · we’ll remind you.
            </p>
          </div>
        </section>
        <div className="card mt-4 rounded-[22px] p-4">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
            TODAY’S PROGRESS
          </p>
          <p className="mt-2 text-sm font-semibold">1 of 3 wins complete</p>
          <div className="progress mt-3">
            <span style={{ width: "33%" }} />
          </div>
        </div>
        <button
          onClick={onReset}
          className="mt-4 w-full text-center text-[12px] text-[var(--muted)]"
        >
          Reset demo loop
        </button>
      </div>
    );
  }

  if (mode === "missed") {
    return (
      <div className="rise">
        <Brand kicker="Let’s adjust the plan" />
        <div className="card rounded-[28px] p-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--clay)]">
            MISSED WINDOW
          </p>
          <h2 className="display mt-2 text-[26px] leading-tight">
            Morning got away from you.
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            You still have time for today’s health win. Want to make it easier?
          </p>
          <div className="mt-4 rounded-2xl bg-[var(--foam)] p-4">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
              AI SUGGESTION
            </p>
            <p className="mt-1 font-semibold">10-minute recovery walk at 6 PM</p>
          </div>
          <button
            onClick={onRecover}
            className="press mt-4 w-full rounded-2xl bg-[var(--leaf)] py-3.5 text-sm font-semibold text-white"
          >
            Sounds good
          </button>
          <button className="mt-2 w-full rounded-2xl bg-[var(--cream)] py-3.5 text-sm font-semibold">
            Choose another time
          </button>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-[var(--muted)]">
          Why this suggestion? You complete shorter evening walks more often than
          missed morning windows.
        </p>
      </div>
    );
  }

  return (
    <div className="rise">
      <Brand kicker={`Good morning, ${participant.name}`} />
      <div className="card relative overflow-hidden rounded-[28px] p-5">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[var(--gold-2)]/40 blur-2xl" />
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--leaf)]">
          RIGHT NOW
        </p>
        <div className="mt-3 flex items-start gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--foam)] text-[var(--leaf)]">
            <Icon name="walk" />
          </div>
          <div>
            <h2 className="display text-[28px] leading-tight">20-minute walk</h2>
            <p className="text-[13px] text-[var(--muted)]">Health · today at 7:00 AM</p>
          </div>
        </div>
        <button
          onClick={onStart}
          className="press mt-5 w-full rounded-2xl bg-[var(--leaf)] py-3.5 text-sm font-semibold tracking-wide text-white"
        >
          Start walk
        </button>
        <div className="mt-4 flex items-center justify-between text-[13px]">
          <span className="font-semibold">{streak}-day momentum</span>
          <span className="text-[var(--leaf)]">+50 points when completed</span>
        </div>
        <p className="mt-4 text-[12px] text-[var(--muted)]">Can’t do it now?</p>
        <div className="mt-2 flex gap-2">
          <button className="flex-1 rounded-full bg-[var(--cream)] py-2.5 text-[13px] font-medium">
            Snooze
          </button>
          <button
            onClick={onMiss}
            className="flex-1 rounded-full bg-[var(--cream)] py-2.5 text-[13px] font-medium"
          >
            I missed it
          </button>
        </div>
      </div>
      <p className="mb-2 mt-6 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
        NEXT UP
      </p>
      <div className="card flex items-center justify-between rounded-[22px] p-4">
        <div>
          <p className="font-semibold">Healthy lunch</p>
          <p className="text-[13px] text-[var(--muted)]">12:00 PM</p>
        </div>
        <span className="text-[13px] text-[var(--leaf)]">Later</span>
      </div>
      <p className="mt-4 text-[13px] text-[var(--muted)]">Later today · 2 more wins</p>
    </div>
  );
}

function Goals() {
  const icons = {
    Health: "leaf",
    Money: "wallet",
    Relationship: "heart",
    Family: "family",
  } as const;
  return (
    <div className="rise">
      <Brand kicker="Your goals become timed wins — not a to-do list." />
      <div className="space-y-3">
        {goals.map((g) => (
          <div key={g.id} className="card rounded-[22px] p-4">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--leaf)]">
              <Icon name={icons[g.area as keyof typeof icons]} size={16} />
              {g.area}
            </div>
            <div className="mt-1 flex items-end justify-between">
              <div>
                <p className="display text-[22px] leading-tight">{g.title}</p>
                <p className="mt-1 text-[13px] text-[var(--muted)]">{g.commitment}</p>
              </div>
              <p className="text-[12px] text-[var(--muted)]">{g.wins} wins</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Group({
  reacted,
  onReact,
  shareOpen,
  setShareOpen,
  caughtUp,
  setCaughtUp,
  onStartWalk,
}: {
  reacted: Record<string, string>;
  onReact: (id: string, label: string) => void;
  shareOpen: boolean;
  setShareOpen: (v: boolean) => void;
  caughtUp: boolean;
  setCaughtUp: (v: boolean) => void;
  onStartWalk: () => void;
}) {
  if (shareOpen) {
    return (
      <div className="rise">
        <button
          onClick={() => setShareOpen(false)}
          className="mb-3 text-[13px] text-[var(--leaf)]"
        >
          ← Back
        </button>
        <Brand kicker="Choose what kind of support you want." />
        {[
          ["Share a win", "Celebrate progress you’ve made"],
          ["Make a commitment", "Tell your people what you’ll do"],
          ["Ask for support", "Get encouragement or advice"],
          ["Share something helpful", "Help someone else succeed"],
          ["Ask the group", "Start a focused discussion"],
        ].map(([t, d]) => (
          <button
            key={t}
            onClick={() => setShareOpen(false)}
            className="card mb-3 w-full rounded-[20px] p-4 text-left"
          >
            <p className="font-semibold">{t}</p>
            <p className="text-[13px] text-[var(--muted)]">{d}</p>
          </button>
        ))}
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
          No blank “what’s on your mind” composer. Every post supports progress.
        </p>
      </div>
    );
  }

  return (
    <div className="rise">
      <Brand kicker="Progress feed · Father Movement" />
      <div className="rounded-[22px] bg-[linear-gradient(135deg,#1f6f54,#14352c)] p-4 text-white">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold-2)]">
          RIGHT NOW
        </p>
        <p className="display mt-1 text-[22px]">20-minute walk</p>
        <p className="mt-1 text-[13px] text-white/75">
          17 people in your Walking Circle are active this morning.
        </p>
        <button
          onClick={onStartWalk}
          className="press mt-3 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[var(--forest)]"
        >
          Start walk
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
          YOUR GROUP
        </p>
        <button
          onClick={() => setShareOpen(true)}
          className="text-[12px] font-semibold text-[var(--leaf)]"
        >
          Share
        </button>
      </div>
      <div className="mt-2 space-y-3">
        {feed.map((item) => (
          <div key={item.id} className="card rounded-[22px] p-4">
            <p className="font-semibold">
              {item.name} {item.title}
            </p>
            <p className="mt-1 text-[13px] text-[var(--muted)]">{item.detail}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(reacted[item.id] ? [reacted[item.id]] : item.actions).map((a) => (
                <button
                  key={a}
                  onClick={() => onReact(item.id, a)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                    reacted[item.id]
                      ? "bg-[var(--foam)] text-[var(--leaf)]"
                      : "bg-[var(--cream)]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setCaughtUp(true)}
        className="card mt-3 w-full rounded-[22px] p-5 text-center"
      >
        <p className="font-semibold">
          {caughtUp ? "You’re caught up" : "Mark as caught up"}
        </p>
        <p className="mt-1 text-[13px] text-[var(--muted)]">
          Finite feed. Go enjoy your morning.
        </p>
      </button>
      <p className="mt-3 text-center text-[11px] text-[var(--muted)]">
        Reactions: {reactions.join(" · ")}
      </p>
    </div>
  );
}

function Rewards({
  points,
  redeemed,
  onRedeem,
}: {
  points: number;
  redeemed: string | null;
  onRedeem: (id: string) => void;
}) {
  return (
    <div className="rise">
      <Brand kicker="Points reinforce behavior. Milestones unlock rewards." />
      <div className="rounded-[22px] bg-[var(--forest)] p-5 text-white">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold-2)]">
          YOUR PROGRESS
        </p>
        <p className="display mt-1 text-[34px]">{points.toLocaleString()} pts</p>
        <p className="text-[13px] text-white/70">
          12-day momentum · 84% weekly completion
        </p>
        <p className="mt-3 text-[13px] text-[var(--gold-2)]">
          Next milestone reward in 3 wins
        </p>
      </div>
      <div className="card mt-4 rounded-[22px] p-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold)]">
          SPONSORED MILESTONE
        </p>
        <p className="display mt-1 text-[20px]">30-day health consistency</p>
        <p className="text-[13px] text-[var(--muted)]">
          Complete at least 80% of scheduled health wins.
        </p>
        <div className="progress mt-3">
          <span style={{ width: "76%" }} />
        </div>
        <p className="mt-2 text-[12px]">76% complete · 6 days remaining</p>
      </div>
      <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
        REWARD CATALOG
      </p>
      {rewards.map((r) => (
        <button
          key={r.id}
          onClick={() => onRedeem(r.id)}
          className="card mb-3 flex w-full items-center justify-between rounded-[20px] p-4 text-left"
        >
          <div>
            <p className="font-semibold">{r.title}</p>
            <p className="text-[12px] text-[var(--muted)]">
              {redeemed === r.id ? "Redemption code ready" : r.meta}
            </p>
          </div>
          <span className="text-[13px] font-semibold text-[var(--leaf)]">
            {r.pts} pts
          </span>
        </button>
      ))}
    </div>
  );
}

function Me({ points, streak }: { points: number; streak: number }) {
  return (
    <div className="rise">
      <Brand kicker="Chris · Father Movement" />
      <div className="grid grid-cols-3 gap-2">
        {[
          [String(streak), "Streak"],
          ["84%", "This week"],
          [points.toLocaleString(), "Points"],
        ].map(([v, k]) => (
          <div key={k} className="card rounded-2xl p-3 text-center">
            <p className="display text-[22px]">{v}</p>
            <p className="text-[11px] text-[var(--muted)]">{k}</p>
          </div>
        ))}
      </div>
      <div className="card mt-4 rounded-[22px] p-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
          ACCOUNTABILITY
        </p>
        <p className="display mt-1 text-[22px]">Marcus</p>
        <p className="text-[13px] text-[var(--muted)]">Also working on morning walks</p>
        <button className="mt-3 rounded-full bg-[var(--foam)] px-4 py-2 text-[13px] font-semibold text-[var(--leaf)]">
          Check in
        </button>
      </div>
      <div className="mt-4 rounded-[22px] bg-[var(--foam)] p-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
          PRIVACY
        </p>
        <p className="mt-1 text-sm leading-relaxed">
          Sponsors see aggregated outcomes — never your private feed or identity.
        </p>
      </div>
    </div>
  );
}
