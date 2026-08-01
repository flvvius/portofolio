import { bar, counter } from "@/data/site";
import { Container, Eyebrow, Section } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { Scribble } from "@/components/ink/Scribble";
import { ScribbleNote } from "@/components/ink/Arrow";
import { Turntable } from "@/components/art/Turntable";
import { Bookshelf } from "@/components/art/Props";
import { TapedNote, PinnedNote } from "@/components/art/Paper";
import { NowPlaying } from "@/components/NowPlaying";

/**
 * The bar. Type first — if the headline doesn't hold the page on its own, no
 * amount of illustration will save it.
 *
 * Exactly two orange marks are visible in the headline block: the underline
 * under "sits well", and the margin scribble's arrow. That is the ceiling, not
 * a coincidence. The counter strip below gets its own small allowance.
 */
export function TheBar() {
  return (
    <Section id="the-bar" className="relative pt-12 lg:pt-16">
      <Container>
        <div className="relative grid-12 items-start gap-y-14">
          {/* ---- headline column ---- */}
          <div className="col-span-12 lg:col-span-7">
            <Rise className="mb-6 block">
              <Eyebrow>{bar.eyebrow}</Eyebrow>
            </Rise>

            <Rise as="h1" className="font-display-hero text-hero text-ink">
              {bar.headlineLead}{" "}
              <Scribble type="underline" delay={500} strokeWidth={3} padding={2}>
                {bar.underline}
              </Scribble>{" "}
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
                <a
                  href="#the-shelf"
                  className="group inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-[0.95rem] text-ink no-underline transition-colors duration-[180ms] hover:border-accent hover:text-accent"
                >
                  {bar.ctaPrimary}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[180ms] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a href="#the-door" className="ink-link font-mono text-[0.95rem]">
                  {bar.ctaSecondary}
                </a>
              </div>
            </Rise>
          </div>

          {/* ---- turntable column ---- */}
          <div className="relative col-span-12 lg:col-span-5">
            <Rise delay={120}>
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
              // Below the plinth, not beside it — at `bottom-6` the label ran
              // into the corner hatching once the turntable overhangs its column.
              className="absolute -bottom-6 left-0 hidden max-w-[7rem] lg:inline-flex"
            >
              {bar.turntableScribble}
            </ScribbleNote>
          </div>

          {/*
            The margin scribble, hung off the outside of the grid rather than
            the section — the section now runs all the way down past the
            counter strip, and a percentage against it landed in the body copy.

            It only appears once the window is wide enough to hold the nav rail
            AND a real margin beside it. Below that there is nowhere to scribble
            that isn't already someone's column.
          */}
          <ScribbleNote
            variant="up-right"
            seed={13}
            labelFirst
            arrowClassName="w-10 mb-1"
            className="absolute left-0 top-[52%] hidden max-w-[8rem] -translate-x-[calc(100%+20px)] min-[1700px]:inline-flex"
          >
            comfy web
            <br />
            things live here
          </ScribbleNote>
        </div>
      </Container>

      <TheCounter />
    </Section>
  );
}

/**
 * The strip along the bottom of the hero: the things left out on the counter
 * once the place is open. Three pieces of paper of three different kinds, plus
 * the shelf itself, so the row reads as objects rather than as three cards.
 *
 * It sits below a hairline, which is the same counter line the header hangs
 * from — the hero is the space between those two rules.
 */
function TheCounter() {
  return (
    <div className="mt-16 lg:mt-24">
      <div aria-hidden="true" className="h-px w-full bg-ink/15" />

      <Container className="pt-9">
        <div className="grid items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <Rise>
            <TapedNote tilt={-1.5} className="mt-2">
              <span className="mb-1.5 block border-b border-ink/25 pb-1 font-mono text-[0.8rem] text-ink">
                {counter.special.title}
              </span>
              {counter.special.line}
            </TapedNote>
          </Rise>

          <Rise delay={60}>
            <h2 className="inline-block border-b-2 border-accent pb-1 font-display-section text-[1.25rem] text-ink">
              {counter.shelf.title}
            </h2>
            <p className="mt-3 font-mono text-caption leading-snug text-ink-soft">
              {counter.shelf.line}
            </p>
            <a
              href="#the-shelf"
              className="group mt-3 inline-flex items-center gap-1.5 font-mono text-caption text-accent no-underline"
            >
              {counter.shelf.cta}
              <span
                aria-hidden="true"
                className="transition-transform duration-[180ms] ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Rise>

          <Rise delay={120} className="flex justify-center">
            <Bookshelf className="h-auto w-full max-w-[210px] text-ink" />
          </Rise>

          <Rise delay={180} className="flex sm:justify-end">
            <PinnedNote tilt={1.5}>
              <span className="mb-1.5 block font-mono text-[0.8rem] text-ink">
                {counter.location.title}
              </span>
              {counter.location.line}
            </PinnedNote>
          </Rise>
        </div>
      </Container>
    </div>
  );
}
