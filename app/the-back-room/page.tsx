import type { Metadata } from "next";
import Link from "next/link";
import { backRoom, backRoomShelves, type BackRoomShelf } from "@/data/backRoom";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/sections/Section";
import { Rise } from "@/components/ink/Rise";
import { ScribbleNote } from "@/components/ink/Arrow";
import { TapedNote } from "@/components/art/Paper";
import { Bookshelf } from "@/components/art/Props";

const baseUrl = "https://flavius.pro";

const description =
  "the room off the main floor: the books, films, art and places i didn't make but keep coming back to.";

export const metadata: Metadata = {
  title: "the back room",
  description,
  alternates: { canonical: `${baseUrl}/the-back-room` },
  openGraph: {
    title: "the back room | Flavius Cojocaru",
    description,
    url: `${baseUrl}/the-back-room`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/main.png`,
        width: 1200,
        height: 630,
        alt: "Flavius Cojocaru, the back room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "the back room | Flavius Cojocaru",
    description,
    images: [`${baseUrl}/main.png`],
  },
};

/**
 * One shelf: a heading with its small print, then the things on it.
 *
 * Set exactly like the tab in the record player, because it is the same kind
 * of object: a running list with a rule between the lines and never a box
 * around them. Five bordered cards would turn a room into a pinterest board.
 */
function Shelf({ shelf, delay }: { shelf: BackRoomShelf; delay: number }) {
  return (
    <Rise delay={delay}>
      <section id={shelf.slug} aria-labelledby={`shelf-${shelf.slug}`}>
        <div className="flex items-baseline justify-between gap-4 border-b border-ink/20 pb-2">
          <h2
            id={`shelf-${shelf.slug}`}
            className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink"
          >
            {shelf.label}
          </h2>
          <p className="font-mono text-[0.72rem] text-ink-soft">{shelf.aside}</p>
        </div>

        <ul className="mt-6">
          {shelf.entries.map((entry, index) => (
            <li
              key={entry.title}
              className={index === 0 ? "" : "mt-6 border-t border-ink/15 pt-6"}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono text-[1.05rem] leading-snug text-ink">
                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="ink-link"
                    >
                      {entry.title}
                    </a>
                  ) : (
                    entry.title
                  )}
                </h3>
                {entry.by && (
                  <span className="shrink-0 text-right font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft">
                    {entry.by}
                  </span>
                )}
              </div>

              {entry.note && (
                <p className="measure mt-2 font-mono text-caption leading-[1.75] text-ink-soft">
                  {entry.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Rise>
  );
}

export default function BackRoom() {
  return (
    <>
      <Nav />
      <main
        id="main"
        tabIndex={-1}
        className="min-h-[70svh] py-rhythm lg:py-rhythm-lg"
      >
        <Container>
          <div className="grid-12 items-end gap-x-8 gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <Rise as="h1" className="font-display-section text-section text-ink">
                {backRoom.title}
              </Rise>

              <Rise delay={60} className="mt-5 block">
                <p className="measure font-mono text-ink-soft">
                  {backRoom.intro.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </Rise>
            </div>

            {/*
              The same bookshelf you clicked to get here, which is the whole
              reason it's on this page: the drawing has to be the door and the
              room, or the click was a link that happened to sit near a picture.
            */}
            <Rise delay={120} className="col-span-12 lg:col-span-5">
              <div className="flex items-end justify-start gap-2 lg:justify-end">
                <ScribbleNote
                  variant="right"
                  seed={37}
                  arrowClassName="w-10"
                  className="mb-6 max-w-[6rem]"
                  labelFirst
                >
                  {backRoom.scribble}
                </ScribbleNote>
                <Bookshelf className="h-auto w-full max-w-[240px] text-ink" />
              </div>
            </Rise>
          </div>

          {/*
            Two columns of shelves rather than one long one: these are five
            unrelated lists, and stacked in a single column the eye reads them
            as one list with headings in it.
          */}
          <div className="mt-16 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:mt-20">
            {backRoomShelves.map((shelf, index) => (
              <Shelf key={shelf.slug} shelf={shelf} delay={index * 60} />
            ))}
          </div>

          <Rise delay={80} className="mt-20 block">
            <TapedNote tilt={-1.5}>{backRoom.note}</TapedNote>
          </Rise>

          <p className="mt-16">
            <Link href="/" className="ink-link font-mono text-[0.95rem]">
              {backRoom.back}
            </Link>
          </p>
        </Container>
      </main>
    </>
  );
}
