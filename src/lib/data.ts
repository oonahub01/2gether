export const participant = {
  name: "Chris",
  program: "Father Movement · Spring Cohort",
  points: 2400,
  streak: 8,
  weekly: 84,
  winsToday: { done: 1, total: 3 },
};

export const goals = [
  {
    id: "health",
    area: "Health",
    title: "Move every morning",
    commitment: "Walk 4× this week",
    wins: 4,
    accent: "#1f6f54",
  },
  {
    id: "money",
    area: "Money",
    title: "Save $5,000",
    commitment: "Transfer $50 Friday",
    wins: 1,
    accent: "#d7a45b",
  },
  {
    id: "rel",
    area: "Relationship",
    title: "Connect intentionally",
    commitment: "2 check-ins this week",
    wins: 2,
    accent: "#c45d38",
  },
  {
    id: "family",
    area: "Family",
    title: "More quality time",
    commitment: "2 activities this week",
    wins: 2,
    accent: "#2d8a68",
  },
];

export const feed = [
  {
    id: "m1",
    kind: "win",
    name: "Marcus",
    title: "got his win",
    detail: "30-minute walk · 6-day streak",
    actions: ["Celebrate", "Encourage"],
  },
  {
    id: "m2",
    kind: "support",
    name: "James",
    title: "could use support",
    detail: "“I missed my workouts three days in a row.”",
    actions: ["Support", "I’ll join you"],
  },
  {
    id: "m3",
    kind: "circle",
    name: "Walking Circle",
    title: "42 people completed today",
    detail: "17 are active this morning",
    actions: ["Keep going"],
  },
];

export const rewards = [
  { id: "r1", title: "Free smoothie", meta: "Health · sponsor", pts: 500 },
  { id: "r2", title: "Movie with the kids", meta: "Family experience", pts: 1000 },
  { id: "r3", title: "Fitness class", meta: "Goal-aligned", pts: 1200 },
  { id: "r4", title: "$25 savings boost", meta: "Financial goal", pts: 2500 },
];

export const attention = [
  {
    name: "Marcus Johnson",
    signal: "Completion 92% → 54%",
    why: "Win completion dropped after week 4. Last check-in 6 days ago.",
    priority: "HIGH",
    action: "Send check-in",
    owner: "Stephen",
  },
  {
    name: "David R.",
    signal: "8 days inactive",
    why: "No win started since Sep 8. Notifications opened, none actioned.",
    priority: "HIGH",
    action: "Call participant",
    owner: "Jason",
  },
  {
    name: "Angela P.",
    signal: "5 of 6 wins rescheduled",
    why: "Morning window failing. Evening recovery rate is 71%.",
    priority: "MED",
    action: "Adjust plan",
    owner: "Mary",
  },
  {
    name: "James T.",
    signal: "Requested support ×3",
    why: "Group asked for help after missed workouts. Partner not assigned.",
    priority: "MED",
    action: "Facilitator follow-up",
    owner: "Pamela",
  },
];

export const insights = [
  {
    n: "01",
    title: "Thursday evening groups are struggling.",
    body: "Win completion is 17% lower than Monday/Tuesday groups.",
    rec: "Review meeting time and facilitator engagement.",
  },
  {
    n: "02",
    title: "Accountability partners appear effective.",
    body: "Participants with partners: 81% completion vs. 63% without.",
    rec: "Offer matching to 37 eligible participants.",
  },
  {
    n: "03",
    title: "Newest cohort is showing early disengagement.",
    body: "Week-two engagement has fallen 21%.",
    rec: "Launch facilitator outreach + a 7-day group challenge.",
  },
];

export const funder = {
  enrolled: 327,
  lift: "+28 pp",
  actions: "8,241",
  sustained: "72%",
  investment: "$100K",
  goals: 127,
};
