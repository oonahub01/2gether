export const img = {
  walk: "/images/walk-dawn.png",
  forest: "/images/forest-mist.png",
  family: "/images/family-time.png",
  lunch: "/images/healthy-lunch.png",
  partner: "/images/partner-checkin.png",
  circle: "/images/fathers-circle.png",
  smoothie: "/images/smoothie.png",
  movie: "/images/movie-night.png",
  fitness: "/images/fitness-class.png",
  savings: "/images/savings.png",
  chris: "/images/avatar-chris.png",
  marcus: "/images/avatar-marcus.png",
  james: "/images/avatar-james.png",
  sarah: "/images/avatar-sarah.png",
  david: "/images/avatar-david.png",
  angela: "/images/avatar-angela.png",
};

export const participant = {
  name: "Chris",
  avatar: img.chris,
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
    title: "Lose 20 pounds",
    commitment: "Walk 4× this week",
    wins: 4,
    photo: img.walk,
    active: true,
  },
  {
    id: "money",
    area: "Money",
    title: "Save $5,000",
    commitment: "Transfer $50 Friday",
    wins: 1,
    photo: img.savings,
    active: true,
  },
  {
    id: "rel",
    area: "Relationship",
    title: "Connect intentionally",
    commitment: "2 check-ins this week",
    wins: 2,
    photo: img.partner,
    active: true,
  },
  {
    id: "family",
    area: "Family",
    title: "More quality time",
    commitment: "2 activities this week",
    wins: 2,
    photo: img.family,
    active: true,
  },
];

export const laterGoals = [
  { area: "Personal", title: "Read 12 books", note: "Later · after health streak holds" },
  { area: "Career", title: "Finish certification", note: "Later · not in this cohort" },
];

export const feed = [
  {
    id: "m1",
    kind: "win",
    name: "Marcus",
    avatar: img.marcus,
    title: "got his win",
    detail: "Completed a 30-minute walk · 6-day streak",
    actions: ["Celebrate", "Encourage"],
  },
  {
    id: "m2",
    kind: "support",
    name: "James",
    avatar: img.james,
    title: "could use support",
    detail: "“I missed my workouts three days in a row.”",
    actions: ["Support", "I’ll join you"],
  },
  {
    id: "m3",
    kind: "circle",
    name: "Sarah",
    avatar: img.sarah,
    title: "reached 30 days",
    detail: "Walking Circle consistency milestone",
    actions: ["Celebrate", "Keep going"],
  },
];

export const circleActivity = [
  { name: "Sarah", avatar: img.sarah, title: "reached 30 days", meta: "Consistency milestone" },
  { name: "David", avatar: img.david, title: "completed his walk", meta: "25 minutes · morning win" },
  { name: "Andre", avatar: img.marcus, title: "committed for 6 PM", meta: "20-minute walk" },
];

export const rewards = [
  { id: "r1", title: "Free smoothie", meta: "Health reward", pts: 500, photo: img.smoothie },
  { id: "r2", title: "Movie with the kids", meta: "Family experience", pts: 1000, photo: img.movie },
  { id: "r3", title: "Fitness class", meta: "Goal-aligned", pts: 1200, photo: img.fitness },
  { id: "r4", title: "$25 savings boost", meta: "Financial goal", pts: 2500, photo: img.savings },
];

export const attention = [
  {
    name: "Marcus Johnson",
    avatar: img.marcus,
    signal: "Completion 92% → 54%",
    why: "Win completion dropped after week 4. Last check-in 6 days ago.",
    priority: "HIGH",
    action: "Send check-in",
    owner: "Stephen",
    timeline: [
      "Sep 10 · Missed morning walk",
      "Sep 12 · Snoozed 3× then missed",
      "Sep 14 · Asked group for support",
      "Sep 16 · No win started",
    ],
  },
  {
    name: "David R.",
    avatar: img.david,
    signal: "8 days inactive",
    why: "No win started since Sep 8. Notifications opened, none actioned.",
    priority: "HIGH",
    action: "Call participant",
    owner: "Jason",
    timeline: [
      "Sep 8 · Last completed win",
      "Sep 9–14 · Notifications opened",
      "Sep 16 · Flagged dropout risk",
    ],
  },
  {
    name: "Angela P.",
    avatar: img.angela,
    signal: "5 of 6 wins rescheduled",
    why: "Morning window failing. Evening recovery rate is 71%.",
    priority: "MED",
    action: "Adjust plan",
    owner: "Mary",
    timeline: [
      "Pattern: mornings miss, evenings recover",
      "AI: suggest 6 PM window with approval",
    ],
  },
  {
    name: "James T.",
    avatar: img.james,
    signal: "Requested support ×3",
    why: "Group asked for help after missed workouts. Partner not assigned.",
    priority: "MED",
    action: "Facilitator follow-up",
    owner: "Pamela",
    timeline: [
      "3 support posts this week",
      "Eligible for accountability match",
    ],
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

export const funnel = [
  ["Referred", 186],
  ["Enrolled", 124],
  ["Started", 118],
  ["Active", 109],
  ["Completed", 31],
  ["Outcome", 22],
];
