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
  email: "flaviuscojocaru19@gmail.com",
  url: "https://flavius.pro",
};

export const nav = [
  { label: "the bar", href: "#the-bar" },
  { label: "the shelf", href: "#the-shelf" },
  { label: "the record player", href: "#the-record-player" },
  { label: "the door", href: "#the-door" },
];

/* -------------------------------------------------------------------------
 * the bar
 * ---------------------------------------------------------------------- */

export const bar = {
  // TheBar renders these as three separate nodes, lead → underline → tail, and
  // puts the hand-drawn orange stroke on `underline` itself. It is the only
  // underlined word on the page. `headlineTail` may be empty.
  headlineLead: "i build software that",
  underline: "matters",
  headlineTail: "",
  intro: [
    "full-stack, mostly typescript, too invested in the details.",
    "bucharest. shipping things, breaking things.",
  ],
  ctaPrimary: "pull up a chair",
  ctaSecondary: "or just say hi",
};

/**
 * The strip along the bottom of the hero: the things left lying on the
 * counter. A note and an object, nothing else.
 */
export const counter = {
  special: {
    title: "today's special",
    // Split link → tail so the anchor wraps only the name, which is the part
    // you can actually go to. The comma belongs to the sentence, not the link.
    linkLabel: "miez.news",
    href: "https://miez.news",
    lineTail: ", still warm.",
  },
  /**
   * The label under the bookshelf drawing. The drawing is the link; this is
   * here because a picture with no words under it doesn't read as clickable,
   * however good the cursor is.
   */
  backRoom: {
    label: "the back room",
    aria: "the back room: books, film, art and places i like",
  },
};

/* -------------------------------------------------------------------------
 * the shelf: projects as objects
 * ---------------------------------------------------------------------- */

export type ShelfObjectKind =
  | "record"
  | "book"
  | "cassette"
  | "coffee"
  | "notebook"
  | "jar";

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
      "miez is the core of a thing, what's left once you take the crust off. that's the whole thesis: read widely, condense, then stop. a feed you can actually get to the end of.",
      "most of it is pipeline, kept cheap enough to just run without anyone watching. web and mobile come out of one turborepo. biggest thing i've built, still changing most weeks.",
    ],
    stack: ["typescript", "tanstack start", "convex", "better auth", "vercel"],
    links: [{ label: "live", href: "https://miez.news" }],
    tilt: -2,
  },
  {
    slug: "commit-ink",
    object: "cassette",
    label: "commit.ink",
    title: "commit.ink, a social platform for companies",
    caption: "twelve hours, one take, first place",
    story: [
      "adobe's hackathon gave us twelve hours, which isn't enough time to design anything twice. every decision had to be the one that shipped.",
      "feed, messages, notifications: three easy features and one state-management problem. we leaned hard on agentic tooling to hold that pace, and it won first place.",
    ],
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
      "i led twenty engineers on this, and the hard part was never the code. at that size the git history is the real architecture, so that's where the evenings went.",
      "what i'm proudest of isn't in the repo: people who had never shipped anything shipped something, and most of them stayed.",
    ],
    stack: ["react", "node.js", "git"],
    links: [{ label: "live", href: "https://hope.sisc.ro" }],
    tilt: -1,
  },
  {
    slug: "agrobot",
    object: "coffee",
    label: "agrobot",
    title: "agrobot, a whatsapp bot for romanian farmers",
    caption: "a photo of a sick plant goes out, an answer comes back",
    story: [
      "romanian farmers are not going to install your app. whatsapp is already open all day, so that's where the tool had to live.",
      "weather for the specific crop, live cereal prices, a plant diagnosis from a photo taken in the field. it runs on cloudflare workers, close to free, which is how a tool with no revenue survives.",
    ],
    stack: ["typescript", "hono", "drizzle", "cloudflare workers", "gemini api"],
    links: [{ label: "github", href: "https://github.com/flvvius/Agro-Bot" }],
    tilt: 2,
  },
  {
    slug: "pricele",
    object: "jar",
    label: "pricele.online",
    title: "pricele.online, a daily price-guessing game",
    caption: "an item, a country, one number to get right",
    story: [
      "something ordinary, sold somewhere specific. guess what it costs there. that's the entire game.",
      "wordle's shape, because being 4% off and being 400% off are not the same kind of wrong and the game has to say so. turns out it isn't about prices, it's about how expensive you think a place is.",
    ],
    // TODO: fill in the stack. Left empty on purpose rather than guessed:
    // both the panel and the no-js write-up skip the personnel line when it is.
    stack: [],
    links: [{ label: "live", href: "https://pricele.online" }],
    tilt: -1,
  },
  {
    slug: "joke-bot",
    object: "notebook",
    label: "the joke bot",
    title: "a chatbot that tells jokes on request",
    caption: "give it a word, it gives you a bad joke about it",
    story: [
      "my internship project at ubisoft: give it a keyword, get a joke back. the brief was genuinely that.",
      "first time i'd wired a model into a product, and the lesson was how much of the job sits after the api call. shipped in docker, also a first.",
    ],
    stack: ["react", "openai api", "docker"],
    links: [],
    tilt: -2,
  },
];

export const shelf = {
  intro: ["a few things i've made."],
  stickyNote: "curiosity, caffeine, a bit of recklessness.",
  moreSoon: "more soon, promise.",
};

/* -------------------------------------------------------------------------
 * the record player: the notes, and the tab
 * ---------------------------------------------------------------------- */

export const recordPlayer = {
  intro: [
    "notes to myself, and four jobs told the way",
    "you'd tell them at the bar, not on a cv.",
  ],
};

/**
 * The roles, told as a bar tab rather than a CV.
 *
 * A story instead of a bullet list, because the bullet list is the thing every
 * portfolio already has. It's a tab in the wording and the tally, not in the
 * paper: a printed receipt in the middle of this page would be a costume.
 */
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

export type Social = {
  label: string;
  href: string;
  /** Resting rotation of the coaster, -3deg..+3deg. */
  tilt: number;
  /** The handwritten aside beside it. At most one of these is ever set. */
  nudge?: string;
};

export const socials: Social[] = [
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
 * now playing: fallback rotation when last.fm isn't configured
 * ---------------------------------------------------------------------- */

/**
 * The house record: what the chip says while the site is playing its own
 * music rather than reporting last.fm. "no end" instead of a track number is
 * literal, the loop is generated and never reaches a run-out groove.
 */
export const houseRecord = {
  track: "the house record",
  artist: "played live by your browser",
  side: "a",
  position: "no end",
};

/**
 * The rotation. Deliberately not sorted by band: the chip steps through this in
 * order, and four songs from the same corner of a scene in a row read as a
 * generated playlist rather than a shelf somebody keeps.
 */
export const fallbackTracks = [
  { track: "Starless", artist: "King Crimson" },
  { track: "Cockroach King", artist: "Haken" },
  { track: "Panic Attack", artist: "Dream Theater" },
  { track: "Anesthetize", artist: "Porcupine Tree" },
  { track: "Cousin Dupree", artist: "Steely Dan" },
  { track: "Ashes", artist: "Pain of Salvation" },
  { track: "Sing to God", artist: "Cardiacs" },
  { track: "The Price", artist: "Leprous" },
  { track: "Ants of the Sky", artist: "Between the Buried and Me" },
];
