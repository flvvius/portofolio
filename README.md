# flavius.pro

A personal portfolio built as a listening bar: paper, ink, hand-drawn marks, and a record you can actually put on.

![the bar](./public/main.png)

Live at **[flavius.pro](https://flavius.pro)**.

---

## The idea

Most engineering portfolios are a hero, a card grid, a timeline, and a contact form. This one is a room you walk into.

- **the bar** — the headline, and whatever's on the platter right now.
- **the shelf** — projects, standing on two wooden planks as illustrated objects (a record, a cassette, a book, a moka pot). Click one and its case study opens behind it.
- **the record player** — writing on one side, the work history on the other, set as a bar tab rather than a list of jobs.
- **the door** — closing time: about, and socials as coasters stacked on the counter.
- **the back room** — a side page for the things I didn't make but keep: books, film, art, places.

Two rules hold the whole thing together: **every mark is drawn, not imported** — there is no icon library, no illustration PNG, no audio file, it's inline SVG and Web Audio all the way down — and **orange means one thing**, so there's a hard budget of accent marks per screen.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Server Components by default) |
| Language | TypeScript |
| Styling | Tailwind CSS 3, with the default palette **replaced** rather than extended |
| Type | Fraunces (display, variable `SOFT`/`WONK` axes), Courier Prime (body), Caveat (margin notes) |
| Drawing | Inline SVG, plus `roughjs` / `react-rough-notation` for hand-drawn strokes |
| Audio | Web Audio API — the house record is composed in code (`lib/vinyl.ts`) |
| Monitoring | Sentry, and Google Analytics 4 if you give it an ID |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run lint:fix   # eslint, with fixes
```

### Environment

All optional. The site runs fine on an empty `.env.local` — the pieces that need keys degrade instead of breaking.

```bash
# app/api/now-playing — the last.fm "on the platter" chip.
# Without these the route reports itself unconfigured and the chip falls
# back to a hardcoded rotation. That's the intended behaviour, not a failure.
LASTFM_API_KEY=
LASTFM_USER=

# Google Analytics 4 (page views + Core Web Vitals).
# Omit it and the script never loads.
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Layout

```
app/
  page.tsx              the bar → the shelf → the record player → the door
  blog/                 index + [id]
  the-back-room/        books, film, art, places
  api/now-playing/      last.fm proxy (key stays server-side, 30s revalidate)
  globals.css           tokens, paper grain, motion
components/
  sections/             the four rooms
  art/                  every drawing: turntable, shelf objects, cuckoo, counter
  ink/                  the hand-drawn marks: underline, arrow, scribble, rise
  Nav.tsx               a header that is deliberately not a navbar
  HouseRecordToggle.tsx the sound switch
  CaseStudy.tsx         the panel behind a shelf object
data/
  site.ts               all the words on the site
  blog.ts               posts
  backRoom.ts           the back room shelves
lib/
  vinyl.ts              the house record, composed in code
```

### Editing content

Copy lives in `data/`, not in components. Adding a project is one object in `projects` (`data/site.ts`); adding a back-room shelf is one object in `backRoom` — no component changes either way. The voice is documented at the top of each data file: lowercase, one evocative line per caption, story before stack.

The palette is locked in `tailwind.config.ts` — five ink-and-paper tones plus two tape values, replacing Tailwind's defaults so no stray blue can creep in. If you're reaching for a colour that isn't in that file, the answer is usually ink at a lower opacity.

## Details worth knowing

- **The house record is generated, not played back.** `lib/vinyl.ts` synthesises a slow four-chord loop in F on an FM Rhodes with upright bass and brushes, then ages it: surface crackle, a thump once per rotation, pitch drift because the platter isn't perfect, highs rolled off at 7k. Nothing is fetched, nothing needs licensing, and there's no mp3 in `/public`.
- **Sound is off until you ask.** The nav toggle is the single switch. The hover and click tones in `RoomTone.tsx` ride one delegated document listener, are mouse-only (a tap would otherwise fire hover and press together), rate-limited, and silent unless the record is already on.
- **It works without JavaScript.** Shelf objects are anchors pointing at plain sections already in the DOM; the case-study panel is enhancement on top of that.
- **`prefers-reduced-motion` is honoured throughout** — the turntable stops spinning, ink marks appear rather than drawing themselves.
- **SEO and a11y are wired up**: per-route metadata and OG images, JSON-LD, `sitemap.ts`, `robots.ts`, and a skip link into `#main` on every page.

## Deploy

Vercel. The build is wrapped in `withSentryConfig`, which uploads source maps when a Sentry auth token is present in the environment and quietly skips the step when it isn't. Client reports are tunnelled through `/monitoring` so ad-blockers don't eat them.

---

Built by [Flavius Cojocaru](https://flavius.pro) in Bucharest. The code is here to read; the drawings, the writing and the house record are mine.
