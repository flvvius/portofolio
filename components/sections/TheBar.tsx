import Link from "next/link";
import { bar, counter } from "@/data/site";
import { Container, Section } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { Marked } from "@/components/ink/Drawn";
import { ScribbleNote } from "@/components/ink/Arrow";
import { Turntable } from "@/components/art/Turntable";
import { Bookshelf } from "@/components/art/Props";
import { TapedNote } from "@/components/art/Paper";
import { NowPlaying } from "@/components/NowPlaying";

/**
 * The bar. Type first: if the headline doesn't hold the page on its own, no
 * amount of illustration will save it.
 *
 * Exactly two orange marks are visible in the headline block: the underline
 * under "matters", and the margin scribble's arrow. That is the ceiling, not a
 * coincidence. The counter strip below gets its own small allowance.
 */
export function TheBar() {
  return (
    <Section id="the-bar" className="relative pt-12 lg:pt-16">
      <Container>
        <div className="relative grid-12 items-start gap-y-14">
          {/* ---- headline column ---- */}
          <div className="col-span-12 lg:col-span-7">
            <Rise as="h1" className="font-display-hero text-hero text-ink">
              {bar.headlineLead}{" "}
              {/*
                This was a rough.js annotation. It is one word, at a size the
                layout already fixes, so there was nothing for rough.js to
                measure that we didn't know — it was rolling a fresh path on
                mount, and again on every resize, to draw one line under one
                word on the largest element on the page.

                A stretched path with `pathLength="1"` does the same job off two
                CSS declarations and no JavaScript at all. The multiline mark in
                the door still goes through Scribble, because a line that has to
                find the ends of a wrapping sentence genuinely does need
                measuring. That is the split: known shape here, measured shape
                there.
              */}
              <Marked seed={1} delay={500}>
                {bar.underline}
              </Marked>{" "}
              {bar.headlineTail}
            </Rise>

            <Rise delay={80} className="mt-8">
              <p className="measure font-mono text-ink-soft">
                {bar.intro.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Rise>

            <Rise delay={140} className="mt-10">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                {/*
                  The box round this used to be a rectangle. It is the same one
                  border, with four corners whose horizontal and vertical radii
                  disagree — which is all it takes to read as drawn round the
                  words rather than laid out around them. Nothing was added to
                  the markup to get it, so the link is still a link and still
                  keeps its own focus ring.
                */}
                <a
                  href="#the-shelf"
                  className="group sketch-box inline-flex items-center gap-2 border-2 border-ink px-6 py-3 font-mono text-[1.26rem] text-ink no-underline transition-colors duration-[180ms] hover:border-accent hover:text-accent"
                >
                  {bar.ctaPrimary}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[180ms] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href="#the-door"
                  className="ink-link font-mono text-[1.26rem]"
                >
                  {bar.ctaSecondary}
                </a>
              </div>
            </Rise>
          </div>

          {/* ---- turntable column ---- */}
          <div className="relative col-span-12 lg:col-span-5">
            {/*
              Indented to stand over the turntable rather than over the column.
              The plinth's left edge is 8% (the overhang below) plus the 6.25%
              the drawing is inset inside its own viewBox, so ~14%. Padding
              rather than a translate: `.rise` animates transform and resets it
              to none, and padding lets a long title truncate instead of
              overflowing the column.
            */}
            <Rise delay={120} className="lg:pl-[14%]">
              <NowPlaying />
            </Rise>

            <Rise delay={200}>
              {/* the one element in this section that overhangs its column */}
              <Turntable className="mt-6 w-full max-w-[420px] text-ink lg:translate-x-[8%] lg:max-w-none" />
            </Rise>

            {/* points at the platter, and only ever means the platter */}
            <ScribbleNote
              variant="up-right"
              seed={17}
              labelFirst
              arrowClassName="w-9 mb-1"
              // Below the plinth, not beside it, because at `bottom-6` the label ran
              // into the corner hatching once the turntable overhangs its column.
              className="absolute -bottom-6 left-0 hidden max-w-[7rem] lg:inline-flex"
            >
              {bar.turntableScribble}
            </ScribbleNote>
          </div>
        </div>
      </Container>

      <TheCounter />
    </Section>
  );
}

/**
 * The strip along the bottom of the hero: the things left out on the counter
 * once the place is open. Two objects, not four. The row used to carry a
 * heading, a blurb and a second note as well, and the eye had nowhere to land;
 * a note and a thing you can pick up is the whole strip now.
 *
 * It sits below a hairline. That rule used to be the second of a pair, with a
 * matching one under the header; the header gave its up when it stopped being
 * a bar, so this one now reads as the edge of the counter itself.
 */
function TheCounter() {
  return (
    <div className="mt-16 lg:mt-24">
      <div aria-hidden="true" className="h-px w-full bg-ink/15" />

      <Container className="pt-9">
        <div className="grid items-center gap-x-8 gap-y-12 sm:grid-cols-2">
          <Rise>
            <TapedNote tilt={-1.5} className="mt-2">
              <span className="mb-1.5 block border-b border-ink/25 pb-1 font-mono text-[1.06rem] text-ink">
                {counter.special.title}
              </span>
              {counter.special.line}
            </TapedNote>
          </Rise>

          {/*
            The one object in this row you can pick up. It behaves like a shelf
            object rather than like a link: same lift, same tilt, same reaching
            cursor, because it *is* one, it just happens to live down here.
          */}
          <Rise delay={60} className="flex justify-center sm:justify-end">
            <Link
              href="/the-back-room"
              aria-label={counter.backRoom.aria}
              className="group block cursor-shelf no-underline"
            >
              <span className="shelf-object block text-ink">
                <Bookshelf className="mx-auto h-auto w-full max-w-[210px]" />
              </span>
              <span
                aria-hidden="true"
                className="mt-3 flex items-center justify-center gap-1.5 font-mono text-caption text-ink-soft transition-colors duration-[180ms] group-hover:text-accent"
              >
                {counter.backRoom.label}
                <span className="transition-transform duration-[180ms] ease-out group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Rise>
        </div>
      </Container>
    </div>
  );
}
