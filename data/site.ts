import { serviceConfig } from "@/lib/service/config";

function liveLink(url?: string) {
  return url ? [{ label: "live", href: url }] : [];
}

/**
 * All the words on the site live here.
 *
 * Voice: warm, lowercase, lightly funny. Suggest, don't explain. Two short
 * paragraphs beat four good ones. If a line can go, it goes.
 */

export const site = {
  name: "flavius cojocaru",
  role: "full-stack engineer",
  location: "Bucharest",
  email: serviceConfig.email,
  url: serviceConfig.origin,
};

export type ShelfObjectKind =
  "record" | "book" | "cassette" | "coffee" | "notebook" | "jar";

export type Project = {
  slug: string;
  /** Which illustrated object this project sits on the shelf as. */
  object: ShelfObjectKind;
  /** Text on the taped-on paper label. */
  label: string;
  /** Full name, used in the case study. */
  title: string;
  /** One evocative line. Not a feature list. */
  caption: string;
  /** Why it exists, what actually happened. Two paragraphs, hard ceiling. */
  story: string[];
  stack: string[];
  links: { label: string; href: string }[];
  /** Resting rotation, -3deg..+3deg. */
  tilt: number;
};

export const projects: Project[] = [
  {
    slug: "miez",
    object: "record",
    label: "miez.news",
    title: "miez.news, an ai news aggregator",
    caption: "reads the news all day so you don't have to scroll it",
    story: [
      "An AI news feed with an end. I built the pipeline and web/mobile apps in one turborepo, keeping running costs low.",
    ],
    stack: ["typescript", "tanstack start", "convex", "better auth", "vercel"],
    links: liveLink(process.env.NEXT_PUBLIC_MIEZ_URL),
    tilt: -2,
  },
  {
    slug: "commit-ink",
    object: "cassette",
    label: "commit.ink",
    title: "commit.ink, a social platform for companies",
    caption: "twelve hours, one take, first place",
    story: [
      "Built in twelve hours at Adobe's hackathon: feed, messages and notifications. Our team used agentic tooling and won first place.",
    ],
    stack: ["typescript", "next.js", "convex", "clerk", "openai api"],
    links: liveLink(process.env.NEXT_PUBLIC_COMMIT_INK_URL),
    tilt: 1,
  },
  {
    slug: "sisc",
    object: "book",
    label: "the sisc platform",
    title: "the sisc platform, built by twenty people",
    caption: "twenty people, one repo, nobody lost",
    story: [
      "I led twenty engineers, many shipping for the first time. Coordination and Git history mattered as much as the code.",
    ],
    stack: ["react", "node.js", "git"],
    links: liveLink(process.env.NEXT_PUBLIC_SISC_URL),
    tilt: -1,
  },
  {
    slug: "agrobot",
    object: "coffee",
    label: "agrobot",
    title: "agrobot, a whatsapp bot for romanian farmers",
    caption: "a photo of a sick plant goes out, an answer comes back",
    story: [
      "A WhatsApp tool for Romanian farmers: crop weather, cereal prices and plant diagnosis from a photo. Built on Cloudflare Workers.",
    ],
    stack: [
      "typescript",
      "hono",
      "drizzle",
      "cloudflare workers",
      "gemini api",
    ],
    links: process.env.NEXT_PUBLIC_AGROBOT_URL
      ? [{ label: "github", href: process.env.NEXT_PUBLIC_AGROBOT_URL }]
      : [],
    tilt: 2,
  },
  {
    slug: "pricele",
    object: "jar",
    label: "pricele.online",
    title: "pricele.online, a daily price-guessing game",
    caption: "an item, a country, one number to get right",
    story: [
      "Guess what an everyday item costs in a given country. Feedback distinguishes a near miss from a wildly different guess.",
    ],
    // TODO: fill in the stack. Left empty on purpose rather than guessed:
    // both the panel and the no-js write-up skip the personnel line when it is.
    stack: [],
    links: liveLink(process.env.NEXT_PUBLIC_PRICELE_URL),
    tilt: -1,
  },
  {
    slug: "joke-bot",
    object: "notebook",
    label: "the joke bot",
    title: "a chatbot that tells jokes on request",
    caption: "give it a word, it gives you a bad joke about it",
    story: [
      "My Ubisoft internship project: a keyword-driven joke chatbot. My first model integration and Docker deployment.",
    ],
    stack: ["react", "openai api", "docker"],
    links: [],
    tilt: -2,
  },
];

export type TabItem = {
  /** What you'd call it if you were being funny about it. */
  line: string;
  place: string;
  date: string;
  /** The story. Two sentences, three if one of them is short. */
  story: string;
  duration: string;
};

export const tab = {
  label: "the tab",
  aside: "four lines, two still open",
  // Newest first, the way a tab reads: the round you're still drinking is at
  // the top. `my own tab` has no start date to sort by, so it sits under the
  // day job it runs alongside.
  items: [
    {
      line: "the day job",
      place: "rasirom r.a.",
      date: "jun 2025",
      story:
        "react and next on top, spring boot and fastapi arguing over kafka underneath, keycloak at the door. i now know exactly what a real permissions model costs.",
      duration: "still open",
    },
    {
      line: "my own tab",
      place: "solo, building my own things",
      date: "ongoing",
      story:
        "my own products, end to end. nobody briefed miez.news, so every call in it is mine to get wrong, and most of what i know about shipping came from that.",
      duration: "nights and weekends",
    },
    {
      line: "the deep end",
      place: "sisc, cybernetics students' union",
      date: "oct 2023",
      story:
        "started on the back end in node, ended up leading twenty people, most of whom had never shipped anything. nobody got lost. some merges did.",
      duration: "20 months",
    },
    {
      line: "the internship",
      place: "ubisoft romania",
      date: "mar 2023",
      story:
        "they asked for a chatbot that tells jokes. i learned the api call is the easy ten percent.",
      duration: "3 months",
    },
  ] satisfies TabItem[],
  totals: [
    { label: "subtotal", value: "4 roles, 1 team of twenty" },
    { label: "total", value: "three years, one long git log" },
  ],
  education: {
    title: "ase bucharest, cybernetics",
    lines: [
      { title: "bsc computer science", years: "2021-2024" },
      { title: "msc e-business", years: "2024-2026" },
    ],
  },
  /** The one handwritten mark in the section. Kept to two words. */
  scribble: "still open",
};

/* -------------------------------------------------------------------------
 * the door
 * ---------------------------------------------------------------------- */

export const door = {
  about: [
    "i'm flavius. full-stack, mostly typescript, and i've never shaken the feeling that the details are the whole job.",
    "i've led a twenty-person dev team, my day job is deep inside a platform a lot of people lean on, and every hour left over goes into products of my own.",
    "away from the keyboard: hiking, chess i take far too personally, and reading the health papers rather than the headlines about them.",
  ],
  // Must appear verbatim in one of the paragraphs above.
  underline: "the details are the whole job",
  mascotScribble: "that's me",
  tapedNote: "open late (probably)",
  footer: "brewed in Bucharest",
};
