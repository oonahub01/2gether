"use client";

import { useEffect, useMemo, useState } from "react";
import {
  circleActivity,
  feed,
  goals,
  img,
  laterGoals,
  participant,
  rewards,
} from "@/lib/data";
import { Icon } from "./Icons";
import { PhoneFrame } from "./PhoneFrame";
import { Avatar, Photo } from "./Photo";

type Tab = "today" | "goals" | "group" | "rewards" | "me";
type Mode = "ready" | "walking" | "done" | "missed";
type GroupPage = "feed" | "people" | "circle" | "share";
type MePage = "home" | "sponsor" | "impact";
type RewardPage = "catalog" | "milestone" | "code";

const reactions = ["Celebrate", "Encourage", "Support", "Keep going", "I’ll join you"];

export function MobileApp() {
  const [onboard, setOnboard] = useState(0);
  const [tab, setTab] = useState<Tab>("today");
  const [mode, setMode] = useState<Mode>("ready");
  const [seconds, setSeconds] = useState(20 * 60);
  const [streak, setStreak] = useState(participant.streak);
  const [points, setPoints] = useState(participant.points);
  const [reacted, setReacted] = useState<Record<string, string>>({});
  const [recovered, setRecovered] = useState(false);
  const [snooze, setSnooze] = useState(false);
  const [groupPage, setGroupPage] = useState<GroupPage>("feed");
  const [mePage, setMePage] = useState<MePage>("home");
  const [rewardPage, setRewardPage] = useState<RewardPage>("catalog");
  const [code, setCode] = useState<string | null>(null);
  const [caughtUp, setCaughtUp] = useState(false);

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

  if (onboard < 3) {
    return (
      <PhoneFrame time="6:48">
        <Onboard step={onboard} onNext={() => setOnboard((n) => n + 1)} />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame time={clock}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          {tab === "today" && (
            <Today
              mode={mode}
              seconds={seconds}
              streak={streak}
              snooze={snooze}
              recovered={recovered}
              onStart={() => {
                setSnooze(false);
                setSeconds(20 * 60);
                setMode("walking");
              }}
              onMiss={() => {
                setSnooze(false);
                setMode("missed");
              }}
              onSnooze={() => setSnooze(true)}
              onRecover={() => {
                setRecovered(true);
                setMode("done");
                setStreak(9);
                setPoints((p) => p + 30);
              }}
              onReset={() => {
                setRecovered(false);
                setSnooze(false);
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
              page={groupPage}
              setPage={setGroupPage}
              reacted={reacted}
              onReact={(id, label) => setReacted((r) => ({ ...r, [id]: label }))}
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
            <Rewards
              points={points}
              page={rewardPage}
              setPage={setRewardPage}
              code={code}
              onRedeem={(id) => {
                setCode(id.toUpperCase() + "-FM26");
                setRewardPage("code");
              }}
            />
          )}
          {tab === "me" && (
            <Me
              points={points}
              streak={streak}
              page={mePage}
              setPage={setMePage}
            />
          )}
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

function Onboard({ step, onNext }: { step: number; onNext: () => void }) {
  const slides = [
    {
      photo: img.circle,
      kicker: "JOIN PROGRAM",
      title: "Father Movement",
      body: "Spring Cohort · 14 men. Enroll, then 2gether turns goals into timed real-world wins.",
      cta: "Join this cohort",
    },
    {
      photo: img.walk,
      kicker: "ACTIVE GOALS · 3–5",
      title: "Choose what matters now",
      body: "Health, money, relationship, family. Extra goals wait in Later — home never shows all of them.",
      cta: "Set weekly commitments",
    },
    {
      photo: img.family,
      kicker: "FIRST RIGHT NOW",
      title: "Tomorrow at 7:00 AM",
      body: "20-minute walk. Open the app, act, celebrate, leave. Staff see the same events as you.",
      cta: "Enter Today",
    },
  ];
  const s = slides[step];
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <Photo src={s.photo} alt="" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
      <div className="relative mt-auto p-6 pb-10 text-white">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--gold-2)]">
          {s.kicker}
        </p>
        <h2 className="display mt-2 text-[34px] leading-tight">{s.title}</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-white/80">{s.body}</p>
        <div className="mt-5 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full ${i === step ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/30"}`}
            />
          ))}
        </div>
        <button
          onClick={onNext}
          className="press mt-5 w-full rounded-2xl bg-[var(--gold)] py-3.5 text-sm font-semibold text-[var(--ink)]"
        >
          {s.cta}
        </button>
      </div>
    </div>
  );
}

function Brand({ kicker }: { kicker: string }) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <div className="display text-[26px] leading-none font-semibold">2gether</div>
        <p className="mt-1.5 text-[13px] text-[var(--muted)]">{kicker}</p>
      </div>
      <Avatar src={img.chris} alt="Chris" size={40} />
    </div>
  );
}

function Today({
  mode,
  seconds,
  streak,
  snooze,
  recovered,
  onStart,
  onMiss,
  onSnooze,
  onRecover,
  onReset,
}: {
  mode: Mode;
  seconds: number;
  streak: number;
  snooze: boolean;
  recovered: boolean;
  onStart: () => void;
  onMiss: () => void;
  onSnooze: () => void;
  onRecover: () => void;
  onReset: () => void;
}) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (mode === "walking") {
    return (
      <div className="relative min-h-full">
        <Photo src={img.walk} alt="Morning walk" className="h-[420px] w-full" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-t from-[var(--cream)] via-transparent to-black/25" />
        <div className="relative -mt-16 px-5 pb-6">
          <div className="card rounded-[28px] p-5 text-center">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--leaf)]">
              RIGHT NOW · IN MOTION
            </p>
            <p className="mt-4 font-mono text-[52px] tracking-tight">
              {mm}:{ss}
            </p>
            <p className="text-sm text-[var(--muted)]">Demo completes the win in seconds.</p>
            <div className="progress mt-4">
              <span style={{ width: `${Math.min(100, ((20 * 60 - seconds) / 8) * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div>
        <Photo src={img.walk} alt="" className="h-44 w-full" />
        <div className="px-5 pb-6 pt-4">
          <Brand kicker="Morning win complete" />
          <div className="card burst rounded-[28px] bg-[linear-gradient(180deg,#e9f6ee,#fffaf2)] p-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--leaf)] text-white">
              <Icon name="check" />
            </div>
            <h2 className="display mt-4 text-[26px] leading-tight">20-minute walk</h2>
            <p className="mt-1 text-[12px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
              COMPLETED
            </p>
            <p className="mt-3 text-sm">
              {streak}-day momentum · +{recovered ? 30 : 50} points
            </p>
            <p className="display mt-4 text-[22px]">You’re done for now.</p>
          </div>
          <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
            NEXT WIN
          </p>
          <div className="card overflow-hidden rounded-[22px]">
            <Photo src={img.partner} alt="" className="h-28 w-full" />
            <div className="p-4">
              <p className="font-semibold">Partner check-in</p>
              <p className="text-[13px] text-[var(--muted)]">
                Relationship · 7:00 PM · we’ll remind you.
              </p>
            </div>
          </div>
          <div className="card mt-3 rounded-[22px] p-4">
            <p className="text-sm font-semibold">1 of 3 wins complete · Minimum day met</p>
            <div className="progress mt-3">
              <span style={{ width: "33%" }} />
            </div>
          </div>
          <button onClick={onReset} className="mt-4 w-full text-[12px] text-[var(--muted)]">
            Reset demo loop
          </button>
        </div>
      </div>
    );
  }

  if (mode === "missed") {
    return (
      <div className="px-5 pb-6 pt-4">
        <Brand kicker="Let’s adjust the plan" />
        <div className="card rounded-[28px] p-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--clay)]">
            MISSED WINDOW
          </p>
          <h2 className="display mt-2 text-[26px] leading-tight">
            Morning got away from you.
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Honest check-in. Smaller recovery win — not punishment.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl">
            <Photo src={img.walk} alt="" className="h-28 w-full" />
            <div className="bg-[var(--foam)] p-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--leaf)]">
                AI SUGGESTION
              </p>
              <p className="mt-1 font-semibold">10-minute recovery walk at 6 PM</p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">
                You complete shorter evening walks more often than missed mornings.
              </p>
            </div>
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
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <Photo src={img.walk} alt="Right now walk" className="h-52 w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cream)] via-black/10 to-black/25" />
        <p className="absolute bottom-8 left-5 text-[11px] font-semibold tracking-[0.18em] text-white">
          RIGHT NOW · 7:00 AM
        </p>
      </div>
      <div className="relative -mt-4 px-5 pb-6">
        <Brand kicker={`Good morning, ${participant.name}`} />
        <div className="card rounded-[28px] p-5">
          <h2 className="display text-[28px] leading-tight">20-minute walk</h2>
          <p className="text-[13px] text-[var(--muted)]">Health · specific time today</p>
          <button
            onClick={onStart}
            className="press mt-4 w-full rounded-2xl bg-[var(--leaf)] py-3.5 text-sm font-semibold text-white"
          >
            Start walk
          </button>
          <div className="mt-3 flex justify-between text-[13px]">
            <span className="font-semibold">{streak}-day momentum</span>
            <span className="text-[var(--leaf)]">+50 pts</span>
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">Can’t do it now?</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={onSnooze}
              className="flex-1 rounded-full bg-[var(--cream)] py-2.5 text-[13px] font-medium"
            >
              Snooze
            </button>
            <button
              onClick={onMiss}
              className="flex-1 rounded-full bg-[var(--cream)] py-2.5 text-[13px] font-medium"
            >
              I missed it
            </button>
          </div>
          {snooze && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {["30 minutes", "Later today", "Choose a time", "Suggested 6 PM"].map((t) => (
                <button
                  key={t}
                  onClick={onStart}
                  className="rounded-xl bg-[var(--foam)] py-2 text-[12px] font-medium"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
          NEXT UP
        </p>
        <div className="card overflow-hidden rounded-[22px]">
          <Photo src={img.lunch} alt="Healthy lunch" className="h-24 w-full" />
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">Healthy lunch</p>
              <p className="text-[13px] text-[var(--muted)]">Time window · 12:00–1:00 PM</p>
            </div>
            <span className="text-[13px] text-[var(--leaf)]">Later</span>
          </div>
        </div>
        <p className="mt-3 text-[13px] text-[var(--muted)]">
          Later today · family activity (event cue) · 1 anytime win
        </p>
      </div>
    </div>
  );
}

function Goals() {
  return (
    <div className="px-5 pb-6 pt-4">
      <Brand kicker="Life goals → weekly commitments → timed wins." />
      <div className="space-y-3">
        {goals.map((g) => (
          <div key={g.id} className="card overflow-hidden rounded-[22px]">
            <Photo src={g.photo} alt={g.title} className="h-[92px] w-full" />
            <div className="p-4">
              <p className="text-[12px] font-semibold text-[var(--leaf)]">{g.area}</p>
              <p className="display text-[22px] leading-tight">{g.title}</p>
              <div className="mt-1 flex justify-between text-[13px] text-[var(--muted)]">
                <span>{g.commitment}</span>
                <span>{g.wins} wins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
        LATER GOALS
      </p>
      {laterGoals.map((g) => (
        <div key={g.title} className="card mb-2 rounded-[18px] p-4">
          <p className="font-semibold">{g.title}</p>
          <p className="text-[12px] text-[var(--muted)]">
            {g.area} · {g.note}
          </p>
        </div>
      ))}
    </div>
  );
}

function Group({
  page,
  setPage,
  reacted,
  onReact,
  caughtUp,
  setCaughtUp,
  onStartWalk,
}: {
  page: GroupPage;
  setPage: (p: GroupPage) => void;
  reacted: Record<string, string>;
  onReact: (id: string, label: string) => void;
  caughtUp: boolean;
  setCaughtUp: (v: boolean) => void;
  onStartWalk: () => void;
}) {
  const tabs: [GroupPage, string][] = [
    ["feed", "Feed"],
    ["people", "People"],
    ["circle", "Circle"],
    ["share", "Share"],
  ];

  return (
    <div className="px-5 pb-6 pt-4">
      <Brand kicker="Social home · not a content feed" />
      <div className="mb-4 flex gap-1 rounded-full bg-[var(--cream)] p-1">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex-1 rounded-full py-1.5 text-[11px] font-semibold ${
              page === id ? "bg-white text-[var(--ink)] shadow-sm" : "text-[var(--muted)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {page === "feed" && (
        <>
          <div className="relative overflow-hidden rounded-[22px]">
            <Photo src={img.walk} alt="" className="h-36 w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10 p-4 text-white">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--gold-2)]">
                RIGHT NOW
              </p>
              <p className="display mt-1 text-[22px]">20-minute walk</p>
              <p className="text-[12px] text-white/80">17 in Walking Circle are active.</p>
              <button
                onClick={onStartWalk}
                className="mt-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--forest)]"
              >
                Start walk
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {feed.map((item) => (
              <div key={item.id} className="card rounded-[22px] p-4">
                <div className="flex gap-3">
                  <Avatar src={item.avatar} alt={item.name} />
                  <div>
                    <p className="font-semibold">
                      {item.name} {item.title}
                    </p>
                    <p className="text-[13px] text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
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
            <p className="font-semibold">{caughtUp ? "You’re caught up" : "Mark as caught up"}</p>
            <p className="mt-1 text-[13px] text-[var(--muted)]">
              Finite feed. Go enjoy your morning.
            </p>
          </button>
          <p className="mt-3 text-center text-[10px] text-[var(--muted)]">
            {reactions.join(" · ")}
          </p>
        </>
      )}

      {page === "people" && (
        <>
          <div className="card overflow-hidden rounded-[22px]">
            <Photo src={img.circle} alt="Cohort" className="h-32 w-full" />
            <div className="p-4">
              <p className="text-[11px] font-semibold text-[var(--leaf)]">MY GROUP</p>
              <p className="display text-[22px]">Father Movement · Spring</p>
              <p className="text-[13px] text-[var(--muted)]">14 members · your social home</p>
            </div>
          </div>
          <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
            MY CIRCLES
          </p>
          {[
            ["Walking & Fitness", "483 members · 17 active now"],
            ["Saving Money", "217 members · 8 wins today"],
            ["Intentional Fatherhood", "326 members · 12 active today"],
          ].map(([t, d]) => (
            <div key={t} className="card mb-2 rounded-[18px] p-4">
              <p className="font-semibold">{t}</p>
              <p className="text-[12px] text-[var(--leaf)]">{d}</p>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-3 rounded-[22px] bg-[var(--foam)] p-4">
            <Avatar src={img.marcus} alt="Marcus" size={48} />
            <div>
              <p className="text-[11px] font-semibold text-[var(--leaf)]">ACCOUNTABILITY PARTNER</p>
              <p className="display text-xl">Marcus</p>
              <p className="text-[12px] text-[var(--muted)]">Also working on morning walks</p>
            </div>
          </div>
        </>
      )}

      {page === "circle" && (
        <>
          <div className="overflow-hidden rounded-[22px] bg-[var(--forest)] text-white">
            <Photo src={img.walk} alt="" className="h-28 w-full opacity-80" />
            <div className="p-4">
              <p className="text-[11px] tracking-[0.16em] text-[var(--gold-2)]">WALKING CIRCLE</p>
              <p className="display text-[24px]">42 completed · 17 active</p>
              <p className="text-[13px] text-white/70">Your goal: walk 20 minutes</p>
            </div>
          </div>
          <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
            CIRCLE ACTIVITY
          </p>
          {circleActivity.map((a) => (
            <div key={a.title} className="card mb-2 flex items-center gap-3 rounded-[18px] p-3">
              <Avatar src={a.avatar} alt={a.name} />
              <div>
                <p className="text-sm font-semibold">
                  {a.name} {a.title}
                </p>
                <p className="text-[12px] text-[var(--muted)]">{a.meta}</p>
              </div>
            </div>
          ))}
          <button className="mt-2 w-full rounded-2xl bg-[var(--cream)] py-3 text-sm font-semibold">
            I need support
          </button>
        </>
      )}

      {page === "share" && (
        <>
          <p className="mb-3 text-sm text-[var(--muted)]">
            No blank “what’s on your mind.” Every post supports a behavior.
          </p>
          {[
            ["Share a win", "Celebrate progress you’ve made"],
            ["Make a commitment", "Tell your people what you’ll do"],
            ["Ask for support", "Get encouragement or advice"],
            ["Share something helpful", "Help someone else succeed"],
            ["Ask the group", "Start a focused discussion"],
          ].map(([t, d]) => (
            <button
              key={t}
              onClick={() => setPage("feed")}
              className="card mb-2 w-full rounded-[18px] p-4 text-left"
            >
              <p className="font-semibold">{t}</p>
              <p className="text-[13px] text-[var(--muted)]">{d}</p>
            </button>
          ))}
        </>
      )}
    </div>
  );
}

function Rewards({
  points,
  page,
  setPage,
  code,
  onRedeem,
}: {
  points: number;
  page: RewardPage;
  setPage: (p: RewardPage) => void;
  code: string | null;
  onRedeem: (id: string) => void;
}) {
  if (page === "milestone") {
    return (
      <div className="px-5 pb-6 pt-4">
        <button onClick={() => setPage("catalog")} className="mb-3 text-[13px] text-[var(--leaf)]">
          ← Catalog
        </button>
        <Brand kicker="Sponsored milestone · medium verification" />
        <Photo src={img.walk} alt="" className="mb-4 h-36 w-full rounded-[22px]" />
        <div className="card rounded-[22px] p-4">
          <p className="text-[11px] font-semibold text-[var(--gold)]">30-DAY HEALTH CONSISTENCY</p>
          <p className="mt-1 text-sm">Complete at least 80% of scheduled health wins.</p>
          <div className="progress mt-3">
            <span style={{ width: "76%" }} />
          </div>
          <p className="mt-2 text-[12px]">76% · 6 days remaining · $25 when unlocked</p>
        </div>
        <div className="card mt-3 rounded-[22px] p-4 text-sm">
          Most wins are self-reported. Higher-value rewards may need activity evidence.
          Be honest — we adjust the plan, we don’t punish.
        </div>
      </div>
    );
  }

  if (page === "code") {
    return (
      <div className="px-5 pb-6 pt-4">
        <Brand kicker="Redemption" />
        <div className="card rounded-[24px] p-6 text-center">
          <p className="text-[12px] text-[var(--muted)]">Show this at checkout</p>
          <p className="display mt-2 text-3xl tracking-wide">{code}</p>
          <p className="mt-3 text-sm">Reward pool attributed to Healthy Families Challenge.</p>
        </div>
        <button
          onClick={() => setPage("catalog")}
          className="mt-4 w-full rounded-2xl bg-[var(--leaf)] py-3 text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-6 pt-4">
      <Brand kicker="Points reinforce. Milestones unlock." />
      <div className="rounded-[22px] bg-[var(--forest)] p-5 text-white">
        <p className="text-[11px] tracking-[0.16em] text-[var(--gold-2)]">LEDGER</p>
        <p className="display mt-1 text-[34px]">{points.toLocaleString()} pts</p>
        <p className="text-[13px] text-white/70">12-day momentum · 84% weekly</p>
        <button
          onClick={() => setPage("milestone")}
          className="mt-3 text-[13px] text-[var(--gold-2)]"
        >
          Next milestone in 3 wins →
        </button>
      </div>
      <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
        REWARD CATALOG
      </p>
      {rewards.map((r) => (
        <button
          key={r.id}
          onClick={() => onRedeem(r.id)}
          className="card mb-3 flex w-full gap-3 overflow-hidden rounded-[20px] p-0 text-left"
        >
          <Photo src={r.photo} alt={r.title} className="h-[88px] w-[88px] shrink-0" />
          <div className="flex flex-1 items-center justify-between py-3 pr-4">
            <div>
              <p className="font-semibold">{r.title}</p>
              <p className="text-[12px] text-[var(--muted)]">{r.meta}</p>
            </div>
            <span className="text-[13px] font-semibold text-[var(--leaf)]">{r.pts}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function Me({
  points,
  streak,
  page,
  setPage,
}: {
  points: number;
  streak: number;
  page: MePage;
  setPage: (p: MePage) => void;
}) {
  if (page === "sponsor") {
    return (
      <div className="px-5 pb-6 pt-4">
        <button onClick={() => setPage("home")} className="mb-3 text-[13px] text-[var(--leaf)]">
          ← Profile
        </button>
        <Brand kicker="Healthy Families Challenge · aggregates only" />
        <Photo src={img.family} alt="" className="mb-4 h-36 w-full rounded-[22px]" />
        <div className="rounded-[22px] bg-[var(--foam)] p-4">
          <p className="text-[11px] font-semibold text-[var(--leaf)]">$25,000 COMMITTED</p>
          <p className="display text-[28px]">482 participants</p>
          <p className="text-sm">8,421 positive actions · 327 milestones</p>
        </div>
        {[
          ["Fatherhood", "2,210"],
          ["Relationships", "1,482"],
          ["Health", "3,107"],
          ["Financial wellness", "1,622"],
        ].map(([k, n]) => (
          <div key={k} className="card mt-2 flex justify-between rounded-[16px] p-3 text-sm">
            <span>{k}</span>
            <span className="text-[var(--leaf)]">{n} actions</span>
          </div>
        ))}
      </div>
    );
  }

  if (page === "impact") {
    return (
      <div className="px-5 pb-6 pt-4">
        <button onClick={() => setPage("home")} className="mb-3 text-[13px] text-[var(--leaf)]">
          ← Profile
        </button>
        <Brand kicker="Impact feed · no identities" />
        {[
          ["Another milestone reached", "30-day financial wellness", img.savings],
          ["72 parenting wins this week", "Intentional fatherhood actions", img.family],
          ["116 health wins this week", "Reward pool reinforced routines", img.walk],
        ].map(([t, d, p]) => (
          <div key={t} className="card mb-3 overflow-hidden rounded-[20px]">
            <Photo src={p} alt="" className="h-24 w-full" />
            <div className="p-4">
              <p className="font-semibold">{t}</p>
              <p className="text-[13px] text-[var(--muted)]">{d}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="px-5 pb-6 pt-4">
      <div className="flex items-center gap-3">
        <Avatar src={img.chris} alt="Chris" size={64} />
        <div>
          <p className="display text-2xl">Chris</p>
          <p className="text-[13px] text-[var(--muted)]">{participant.program}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          [String(streak), "Streak"],
          ["84%", "Week"],
          [points.toLocaleString(), "Points"],
        ].map(([v, k]) => (
          <div key={k} className="card rounded-2xl p-3 text-center">
            <p className="display text-[22px]">{v}</p>
            <p className="text-[11px] text-[var(--muted)]">{k}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage("sponsor")}
        className="card mt-4 w-full overflow-hidden rounded-[22px] p-0 text-left"
      >
        <Photo src={img.family} alt="" className="h-24 w-full" />
        <div className="p-4">
          <p className="font-semibold">Sponsor impact</p>
          <p className="text-[13px] text-[var(--muted)]">Aggregates only · privacy protected</p>
        </div>
      </button>
      <button
        onClick={() => setPage("impact")}
        className="card mt-3 w-full rounded-[22px] p-4 text-left"
      >
        <p className="font-semibold">Impact feed</p>
        <p className="text-[13px] text-[var(--muted)]">What support made possible this week</p>
      </button>
    </div>
  );
}
