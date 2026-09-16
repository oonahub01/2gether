export function Icon({
  name,
  size = 20,
  color = "currentColor",
}: {
  name:
    | "home"
    | "target"
    | "users"
    | "star"
    | "user"
    | "walk"
    | "heart"
    | "check"
    | "spark"
    | "clock"
    | "leaf"
    | "wallet"
    | "family";
  size?: number;
  color?: string;
}) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...p}>
          <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "target":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...p}>
          <circle cx="9" cy="9" r="3" />
          <path d="M4 19c.6-3 2.6-5 5-5s4.4 2 5 5" />
          <circle cx="16.5" cy="9.5" r="2.4" />
          <path d="M15 19c.3-2 1.6-3.4 3.4-3.8" />
        </svg>
      );
    case "star":
      return (
        <svg {...p}>
          <path d="m12 3 2.4 5.6L20 9.2l-4.2 3.8 1.2 6L12 16.4 7 19l1.2-6L4 9.2l5.6-.6z" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 20c1.2-3.6 3.6-5.4 7-5.4s5.8 1.8 7 5.4" />
        </svg>
      );
    case "walk":
      return (
        <svg {...p}>
          <circle cx="14" cy="5" r="2" />
          <path d="M11 22l2-7 3 2 3 5M8 13l3 2 3-6 3 1" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12.5 10 17l9-10" />
        </svg>
      );
    case "spark":
      return (
        <svg {...p}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 2" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...p}>
          <path d="M5 19c8-1 14-8 14-14-6 0-13 6-14 14z" />
          <path d="M8 16c3-3 6-6 9-9" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...p}>
          <rect x="3.5" y="7" width="17" height="12" rx="2" />
          <path d="M3.5 10h17M16 13.5h2" />
        </svg>
      );
    case "family":
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="2.2" />
          <circle cx="16" cy="8" r="2.2" />
          <circle cx="12" cy="13" r="1.8" />
          <path d="M4 19c.5-2.6 2.2-4 4-4s3.5 1.4 4 4M12 19c.5-2.2 1.8-3.4 3.6-3.6S20 16.8 20.4 19" />
        </svg>
      );
  }
}
