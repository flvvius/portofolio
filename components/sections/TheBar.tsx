import { bar } from "@/data/site";
import { Container, Section } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { Scribble } from "@/components/ink/Scribble";
import { ScribbleNote } from "@/components/ink/Arrow";
import { Turntable } from "@/components/art/Turntable";
import { NowPlaying } from "@/components/NowPlaying";

/**
 * The bar. Type first — if the headline doesn't hold the page on its own, no
 * amount of illustration will save it.
 *
 * Exactly two orange marks are visible here: the underline under "sits well",
 * and the margin scribble's arrow. That is the ceiling, not a coincidence.
 */
export function TheBar() {
  return (
    <Section id="the-bar" className="relative pt-16 lg:pt-24">
      <Container>
        <div className="grid-12 items-start gap-y-14">
          {/* ---- headline column ---- */}
          <div className="col-span-12 lg:col-span-7">
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
          </div>
        </div>

        {/* the single margin scribble, kept out of the way on small screens */}
        <ScribbleNote
          variant="up-right"
          seed={13}
          labelFirst
          arrowClassName="w-10 mb-1"
          // Only shown once the page is wide enough to have a real margin to
          // scribble in. Below that it would crowd the headline.
          className="absolute left-1 top-[46%] hidden max-w-[8rem] min-[1400px]:inline-flex"
        >
          comfy web
          <br />
          things live here
        </ScribbleNote>
      </Container>
    </Section>
  );
}
