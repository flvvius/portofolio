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
    "full-stack, mostly typescript, occasionally too invested in the details.",
    "based in bucharest.",
    "currently: shipping things, breaking things, writing about both.",
  ],
  ctaPrimary: "pull up a chair",
  ctaSecondary: "or just say hi",
  turntableScribble: "always spinning",
};

/**
 * The strip along the bottom of the hero: the things left lying on the
 * counter. Two things only — a note and an object — because the strip sits
 * directly under the headline and a row of four gave the eye nowhere to land.
 */
export const counter = {
  special: {
    title: "today's special",
    line: "a tiny interaction, polished. a paper on sleep, half read.",
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
  /** Why it exists, what actually happened. Story before stack. */
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
      "the name is the whole thesis. miez is the core of a thing, what's left once you take the crust off.",
      "the feed is the problem, not the news. so miez reads widely, condenses, and then stops: a finite thing you can actually get to the end of.",
      "most of the work is the pipeline. pulling from a lot of sources on a schedule, transforming them all into one shape, and keeping the whole thing cheap enough to just run, continuously, without anyone watching it.",
      "web and mobile come out of a single turborepo, which was the other thing i wanted to find out: how much of a product two platforms can genuinely share before the abstraction costs more than it saves. this is the biggest thing i've built, and the one still changing most weeks.",
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
      "adobe's hackathon gave us twelve hours. that isn't enough time to design anything twice, so every decision had to be the one that shipped.",
      "a social platform for companies: real-time feed, messages, notifications: three features that are each individually easy and collectively a state-management problem.",
      "we leaned hard on agentic tooling to move at that pace, which turns the job into something closer to editing than typing. it won first place, which i'm choosing to read as evidence the approach holds up under a clock.",
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
      "i led a twenty-person engineering team building the platform for sisc, and it taught me that the hard part of a big team is almost never the code.",
      "twenty-odd concurrent contributors means the git history is the real architecture. i spent more time on delivery cycles, review flow and merge strategy than on any single feature in the thing.",
      "what i'm actually proudest of isn't in the repo: people who had never shipped anything shipped something, and most of them stayed.",
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
      "romanian farmers are not going to install your app. they already have whatsapp open all day, so that is where the tool had to live.",
      "it answers the things that actually change a day's work: weather for the specific crop, live cereal prices, and a plant diagnosis from a photo you just took in the field.",
      "it runs on cloudflare workers, which keeps it close to free, and that matters more than it sounds. a useful tool with running costs and no revenue quietly dies, and this one shouldn't.",
    ],
    stack: [
      "typescript",
      "hono",
      "drizzle",
      "cloudflare workers",
      "gemini api",
    ],
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
      "you're shown something ordinary and told where in the world it's being sold. you guess what it costs there. that's the entire game.",
      "wordle's shape, because wordle's shape is the right one for this: one a day, everyone gets the same one, and a guess that's close has to feel different from a guess that's nowhere near. being 4% off and being 400% off are not the same kind of wrong, and the game has to say so.",
      "it turned out not to be a game about prices. it's a game about how expensive you think a place is, which is a thing everyone has an opinion on and almost nobody has ever checked.",
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
      "my internship project at ubisoft: a chatbot that takes a keyword and returns a joke about it. the brief was genuinely that.",
      "it was the first time i'd wired a model into a product rather than read about people doing it, and the useful lesson was how much of the work sits after the api call: the times it returns nothing, or something strange, or something you can't ship.",
      "shipped in docker, which was also a first. small project, disproportionate amount learned.",
    ],
    stack: ["react", "openai api", "docker"],
    links: [],
    tilt: -2,
  },
];

export const shelf = {
  intro: ["a few things i've made."],
  stickyNote:
    "built with curiosity, caffeine before noon, and a bit of recklessness.",
  breakScribble: "time for a break?",
  moreSoon: "more soon, promise.",
  thanks: ["thanks for stopping by."],
};

/* -------------------------------------------------------------------------
 * the record player: the notes, and the tab
 * ---------------------------------------------------------------------- */

export const recordPlayer = {
  intro: [
    "random notes of mine, and four jobs told the way",
    "you'd tell them at the bar, not on a cv.",
    "the reading pile is half engineering, half how the body works.",
  ],
};

/**
 * The roles, told as a bar tab rather than a CV.
 *
 * Each job is a line item with a story instead of a bullet list, because the
 * bullet list is the thing every portfolio already has. It's a tab in the
 * wording and the tally, not in the paper. The page already has a house
 * style, and a printed receipt sitting in the middle of it is a costume.
 */
export type TabItem = {
  /** What you'd call it if you were being funny about it. */
  line: string;
  place: string;
  date: string;
  /** The story. One short paragraph. This is a line on a tab, not a CV entry. */
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
        "react and next on top, spring boot and fastapi arguing over kafka underneath, and keycloak at the door deciding who's allowed in. i now know exactly what a real permissions model costs.",
      duration: "still open",
    },
    {
      line: "my own tab",
      place: "solo, building my own things",
      date: "ongoing",
      story:
        "my own products, built and run end to end. miez.news is the one furthest along: nobody briefed it, so every call in it is mine to make and mine to get wrong. the parts you'd normally hand to someone else are the parts i've had to learn, and most of what i know about shipping came from doing exactly that.",
      duration: "nights and weekends",
    },
    {
      line: "the deep end",
      place: "sisc, cybernetics students' union",
      date: "oct 2023",
      story:
        "started on the back end in node, ended up leading twenty people, most of whom had never shipped anything before. spent more evenings in the git history than in any feature. nobody got lost. some merges did.",
      duration: "20 months",
    },
    {
      line: "the internship",
      place: "ubisoft romania",
      date: "mar 2023",
      story:
        "they asked for a chatbot that tells jokes. i learned that the api call is the easy ten percent and everything after it is the job.",
      duration: "3 months",
    },
  ] satisfies TabItem[],
  totals: [
    { label: "subtotal", value: "4 roles, 1 team of twenty" },
    { label: "service", value: "included, always" },
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
    "i'm flavius. i write software, mostly full-stack, mostly typescript, and i've never quite shaken the feeling that the details are the whole job.",
    "i've led a twenty-person dev team, i spend my day job deep in a platform that a lot of people depend on, and everything left over goes into products of my own. the thread through all of it: i like the part where something confusing becomes obvious.",
    "away from the keyboard it's hiking, chess i'm too emotionally invested in, and music loud enough to count as a personality trait.",
    "the other thing i'm properly deep in is health. sleep, training, what food actually does: i read the papers rather than the headlines about the papers, and most of what i've learned so far is how often the claim is bigger than the study. same instinct as the code, honestly. i want to know why a thing works, not just that someone said it does.",
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
 * music rather than reporting last.fm.
 *
 * Its sleeve markings are fixed rather than derived like the others, because
 * there is only ever one of it. "no end" instead of a track number is the
 * literal truth: the loop is generated and never reaches a run-out groove.
 */
export const houseRecord = {
  track: "the house record",
  artist: "played live by your browser",
  side: "a",
  position: "no end",
};

/**
 * The rotation. Deliberately not sorted by band. The chip steps through this
 * in order every nine seconds, and four songs from neighbouring corners of the
 * same scene in a row reads as a playlist somebody generated rather than a
 * shelf somebody keeps.
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
