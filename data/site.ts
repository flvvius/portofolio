/**
 * All the words on the site live here.
 *
 * Voice: warm, lowercase-friendly, lightly funny. Suggest, don't explain.
 * Captions are one evocative line, never a feature list. Stacks are footnotes
 * inside the story, never a headline.
 */

export const site = {
  name: "flavius cojocaru",
  role: "full-stack engineer",
  location: "Bucharest",
  email: "flaviuscojocaru19@gmail.com",
  url: "https://flavius.pro",
};

export const nav = [
  { label: "the bar", href: "#the-bar" },
  { label: "the shelf", href: "#the-shelf" },
  { label: "the setlist", href: "#the-setlist" },
  { label: "the record player", href: "#the-record-player" },
  { label: "the door", href: "#the-door" },
];

/* -------------------------------------------------------------------------
 * the bar
 * ---------------------------------------------------------------------- */

export const bar = {
  // `underline` must appear verbatim inside `headlineTail` — it gets the
  // hand-drawn orange stroke, and it is the only underlined word on the page.
  headlineLead: "i build software that",
  underline: "sits well",
  headlineTail: "with people.",
  intro: [
    "full-stack, mostly typescript, occasionally too invested in the details.",
    "based in bucharest, raised on prog rock and long compile times.",
    "currently: shipping things, breaking things, writing about both.",
  ],
  ctaPrimary: "pull up a chair",
  ctaSecondary: "or just say hi",
  scribbleMargin: "comfy web things live here",
};

/* -------------------------------------------------------------------------
 * the shelf — projects as objects
 * ---------------------------------------------------------------------- */

export type ShelfObjectKind =
  | "record"
  | "book"
  | "cassette"
  | "coffee"
  | "notebook";

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
  /** Liner notes: why it exists, what actually happened. Story before stack. */
  story: string[];
  /** The honest bit. Every record has a b-side. */
  bSide: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** Exactly one project carries the "click me" scribble. */
  nudge?: boolean;
  /** Resting rotation, -3deg..+3deg. */
  tilt: number;
};

export const projects: Project[] = [
  {
    slug: "miez",
    object: "record",
    label: "miez.news",
    title: "miez.news — an ai news aggregator",
    caption: "reads the news all day so you don't have to scroll it",
    story: [
      "the name is the whole thesis. miez is the core of a thing — what's left once you take the crust off.",
      "the feed is the problem, not the news. so miez reads widely, condenses, and then stops: a finite thing you can actually get to the end of.",
      "most of the work is the pipeline. pulling from a lot of sources on a schedule, transforming them all into one shape, and keeping the whole thing cheap enough to just run, continuously, without anyone watching it.",
      "web and mobile come out of a single turborepo, which was the other thing i wanted to find out — how much of a product two platforms can genuinely share before the abstraction costs more than it saves. this is the biggest thing i've built, and the one still changing most weeks.",
    ],
    bSide:
      "it has opinions about what matters that it didn't entirely earn. deciding what deserves a slot is an ongoing argument with myself.",
    stack: ["typescript", "tanstack start", "convex", "better auth", "vercel"],
    links: [{ label: "live", href: "https://miez.news" }],
    nudge: true,
    tilt: -2,
  },
  {
    slug: "commit-ink",
    object: "cassette",
    label: "commit.ink",
    title: "commit.ink — a social platform for companies",
    caption: "twelve hours, one take, first place",
    story: [
      "adobe's hackathon gave us twelve hours. that isn't enough time to design anything twice, so every decision had to be the one that shipped.",
      "a social platform for companies: real-time feed, messages, notifications — three features that are each individually easy and collectively a state-management problem.",
      "we leaned hard on agentic tooling to move at that pace, which turns the job into something closer to editing than typing. it won first place, which i'm choosing to read as evidence the approach holds up under a clock.",
    ],
    bSide:
      "twelve hours means twelve hours. there are decisions in there i'd take back given a day and a nap.",
    stack: ["typescript", "next.js", "convex", "clerk", "openai api"],
    links: [{ label: "live", href: "https://commit.ink/" }],
    tilt: 1,
  },
  {
    slug: "sisc",
    object: "book",
    label: "the sisc platform",
    title: "the sisc platform, built by twenty people",
    caption: "twenty people, one repo, nobody lost",
    story: [
      "i led a twenty-person engineering team building the platform for sisc, and it taught me that the hard part of a big team is almost never the code.",
      "twenty-odd concurrent contributors means the git history is the real architecture. i spent more time on delivery cycles, review flow and merge strategy than on any single feature in the thing.",
      "what i'm actually proudest of isn't in the repo: people who had never shipped anything shipped something, and most of them stayed.",
    ],
    bSide:
      "we optimised for everyone being able to contribute, not for the tidiest possible result. i'd make that trade again — but it is a trade.",
    stack: ["react", "node.js", "git"],
    links: [],
    tilt: -1,
  },
  {
    slug: "agrobot",
    object: "coffee",
    label: "agrobot",
    title: "agrobot — a whatsapp bot for romanian farmers",
    caption: "a photo of a sick plant goes out, an answer comes back",
    story: [
      "romanian farmers are not going to install your app. they already have whatsapp open all day, so that is where the tool had to live.",
      "it answers the things that actually change a day's work: weather for the specific crop, live cereal prices, and a plant diagnosis from a photo you just took in the field.",
      "it runs on cloudflare workers, which keeps it close to free — and that matters more than it sounds. a useful tool with running costs and no revenue quietly dies, and this one shouldn't.",
    ],
    bSide:
      "the diagnosis is a confident guess, not an agronomist. it says so, but confidence reads as certainty and that still worries me.",
    stack: ["typescript", "hono", "drizzle", "cloudflare workers", "gemini api"],
    links: [{ label: "github", href: "https://github.com/flvvius/Agro-Bot" }],
    tilt: 2,
  },
  {
    slug: "joke-bot",
    object: "notebook",
    label: "the joke bot",
    title: "a chatbot that tells jokes on request",
    caption: "give it a word, it gives you a bad joke about it",
    story: [
      "my internship project at ubisoft: a chatbot that takes a keyword and returns a joke about it. the brief was genuinely that.",
      "it was the first time i'd wired a model into a product rather than read about people doing it, and the useful lesson was how much of the work sits after the api call — the times it returns nothing, or something strange, or something you can't ship.",
      "shipped in docker, which was also a first. small project, disproportionate amount learned.",
    ],
    bSide:
      "the jokes were, on average, bad. i've made my peace with this being mostly the model's fault.",
    stack: ["react", "openai api", "docker"],
    links: [],
    tilt: -2,
  },
];

export const shelf = {
  intro: [
    "a few things i've made.",
    "each one has a story attached, some more flattering than others.",
    "pick one off the shelf.",
  ],
  stickyNote: "built with curiosity, caffeine and a bit of recklessness.",
};

/* -------------------------------------------------------------------------
 * the setlist — where i've actually worked
 * ---------------------------------------------------------------------- */

export type Gig = {
  role: string;
  place: string;
  period: string;
  /** Two short lines. What the job actually was, then what it taught. */
  lines: string[];
  stack: string[];
  /** The current one gets a marker. Only ever one. */
  current?: boolean;
};

export const setlist = {
  intro: [
    "where i've played, most recent first.",
    "a couple of these were the whole education,",
    "and one of them was mostly other people.",
  ],
  gigs: [
    {
      role: "full-stack developer",
      place: "RASIROM R.A.",
      period: "jun 2025 — now",
      lines: [
        "data-driven frontends in react and next, with tanstack query holding the state and ssr plus caching doing the part users actually notice.",
        "underneath, a microservices architecture in spring boot and fastapi talking over kafka, with keycloak and properly granular roles deciding who gets to see what.",
      ],
      stack: ["react", "next.js", "tanstack query", "spring boot", "fastapi", "kafka", "keycloak"],
      current: true,
    },
    {
      role: "team lead, it department",
      place: "SiSC — Sindicatul Studenților din Cibernetică",
      period: "oct 2023 — jun 2025",
      lines: [
        "twenty engineers, one platform, and twenty-odd people committing at once — which meant the git history needed more care than any feature in it. i fixed a great deal of merge hell.",
        "started on the back end in node and express and ended up leading. the technical growth turned out to be the smaller half of it; the rest was learning how to talk to people so things actually ship.",
      ],
      stack: ["react", "node.js", "express", "git"],
    },
    {
      role: "web development intern",
      place: "Ubisoft Romania",
      period: "mar 2023 — may 2023",
      lines: [
        "three months of react, apis, monitoring and docker, and the first time i put a model inside a product instead of reading about someone else doing it.",
        "mostly i watched people who had been doing this for years, and took a lot of notes.",
      ],
      stack: ["react", "openai api", "docker"],
    },
    {
      role: "freelance developer",
      place: "for actual clients",
      period: "alongside the rest",
      lines: [
        "a website and a mobile app shipped for a paying client — next.js on the web, react native on both phones.",
        "solo, which is a different job entirely: nobody else to catch it, and nobody else to ask.",
      ],
      stack: ["next.js", "react native"],
    },
  ] satisfies Gig[],
  education: [
    "ASE Bucharest, Faculty of Cybernetics",
    "msc e-business (2024—2026) · bsc computer science (2021—2024)",
  ],
};

/* -------------------------------------------------------------------------
 * the record player — notes, experiments, on rotation
 * ---------------------------------------------------------------------- */

export const experiments = [
  {
    title: "a cli that rates my commit messages",
    note: "works. is unkind. i deserve it.",
    state: "half-baked",
  },
  {
    title: "chess opening trainer, sicilian only",
    note: "built the trainer, still lose the same way.",
    state: "stalled",
  },
  {
    title: "this site's illustration set",
    note: "hand-drawn svg, redrawn four times, will be redrawn again.",
    state: "ongoing",
  },
];

export const onRotation = [
  {
    kind: "album",
    title: "In the Court of the Crimson King",
    by: "King Crimson",
    line: "prog rock's opening argument, still undefeated.",
  },
  {
    kind: "book",
    title: "A Philosophy of Software Design",
    by: "John Ousterhout",
    line: "short, opinionated, quietly ruined a few of my habits.",
  },
  {
    kind: "tool",
    title: "Zed",
    by: "editor",
    line: "fast enough that i stopped noticing the editor. that's the whole review.",
  },
];

export const recordPlayer = {
  intro: [
    "the part of the site that changes between project launches.",
    "notes i've written, things i started and haven't finished,",
    "and whatever is currently on repeat.",
  ],
};

/* -------------------------------------------------------------------------
 * the door
 * ---------------------------------------------------------------------- */

export const door = {
  about: [
    "i'm flavius. i write software, mostly full-stack, mostly typescript, and i've never quite shaken the feeling that the details are the whole job.",
    "i've led a twenty-person dev team, interned at ubisoft, and shipped things solo for real clients. the thread through all of it: i like the part where something confusing becomes obvious.",
    "away from the keyboard it's hiking, chess i'm too emotionally invested in, and music loud enough to count as a personality trait.",
  ],
  // Must appear verbatim in one of the paragraphs above.
  underline: "the details are the whole job",
  mascotScribble: "that's me",
  tapedNote: "open late (probably)",
  footer: "brewed in Bucharest",
};

export const socials = [
  { label: "github", href: "https://github.com/flvvius", tilt: -3 },
  { label: "x", href: "https://x.com/flaviuscj1", tilt: 2 },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/flavius-cojocaru-20834a246/",
    tilt: -1,
  },
  { label: "email", href: `mailto:${site.email}`, tilt: 3, nudge: "say hi" },
];

/* -------------------------------------------------------------------------
 * now playing — fallback rotation when last.fm isn't configured
 * ---------------------------------------------------------------------- */

export const fallbackTracks = [
  { track: "Starless", artist: "King Crimson" },
  { track: "Panic Attack", artist: "Dream Theater" },
  { track: "Cousin Dupree", artist: "Steely Dan" },
  { track: "Sing to God", artist: "Cardiacs" },
  { track: "Ants of the Sky", artist: "Between the Buried and Me" },
];
