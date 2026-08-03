import { houseRules } from "@/data/site";
import { Container, Section } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { Marked, StepRing, Strike, Trail } from "@/components/ink/Drawn";

/**
 * The sign behind the bar.
 *
 * This is the only section that leads with a negative, and the layout leans on
 * it: a struck-through list, then one line of what is left, then the three
 * steps that follow from it. Nothing here is a card. A rules board is written
 * on, not laid out in boxes, so the whole section is centred type and drawn
 * marks and the grid only shows up once, to make the steps walk.
 *
 * It sits between the record player and the door on purpose. By this point a
 * visitor has seen the work and the roles; this is the paragraph they read
 * while deciding whether to knock, so it ends pointing at the door.
 */
export function TheHouseRules() {
  return (
    <Section id="the-house-rules" className="relative">
      <Container>
        <div className="mx-auto max-w-[52rem] text-center">
          <Rise as="h2" className="font-display-section text-section text-ink">
            {houseRules.title}
          </Rise>

          {/*
            The one orange mark in the section's top half. It goes here rather
            than on the title because "there aren't many" is the actual claim —
            the title is just the sign it's written on.
          */}
          <Rise delay={60} className="mt-6 block">
            <p className="font-display-section text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-ink">
              <Marked seed={2} delay={400}>
                {houseRules.statement}
              </Marked>
            </p>
          </Rise>

          <Rise delay={120} className="mt-8 block">
            <p className="mx-auto max-w-[38ch] font-mono text-ink-soft">
              {houseRules.intro.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Rise>
        </div>

        {/* ---- what isn't on offer ---- */}

        {/*
          `<s>` rather than a span with a line drawn over it. The element already
          means "no longer applies" to a screen reader, so the drawing on top is
          free to be decoration — which is the only reason it's allowed to be the
          thing that animates. The native line-through comes off because we draw
          our own; the meaning stays in the markup either way.
        */}
        <Rise delay={80} pop className="mt-14 block lg:mt-16">
          <ul
            aria-label="not on offer"
            className="mx-auto flex max-w-[46rem] flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-11"
          >
            {houseRules.notOnOffer.map((item, index) => (
              <li key={item} className="relative inline-block">
                <s className="font-display-section text-[clamp(1.3rem,2.6vw,2rem)] leading-none text-ink-soft [text-decoration:none]">
                  {item}
                </s>
                {/*
                  Struck in reading order, ~110ms apart, so the row crosses
                  itself off left to right rather than all at once. All at once
                  reads as a state; one after another reads as a decision.
                */}
                <Strike
                  seed={index}
                  delay={index * 110}
                  className="top-1/2 h-[0.6em] -translate-y-1/2 text-accent"
                />
              </li>
            ))}
          </ul>
        </Rise>

        <Rise delay={140} className="mt-14 block">
          <p className="measure mx-auto text-center font-mono text-ink-soft">
            {houseRules.instead}
          </p>
        </Rise>

        {/* ---- how it goes ---- */}
        <Steps />

        {/* ---- the open slot ---- */}
        <Rise delay={80} pop className="mt-16 block lg:mt-20">
          <div className="flex justify-center">
            <a
              href={houseRules.openSlot.href}
              className="slot-open straighten sketch-box-alt block max-w-[22rem] px-8 py-6 text-center no-underline"
              style={{ ["--rest-tilt" as string]: "-1.2deg" }}
            >
              <span className="block font-display-section text-[1.6rem] leading-tight text-ink">
                {houseRules.openSlot.title}
              </span>
              <span className="mt-1 block font-mono text-caption text-ink-soft">
                {houseRules.openSlot.line}
              </span>
            </a>
          </div>
        </Rise>
      </Container>
    </Section>
  );
}

/*
 * Three steps that walk across the page instead of stacking.
 *
 * Six columns, each step spanning two of them at a different offset, so the
 * eye goes left → right → middle rather than straight down a list. The trail is
 * drawn behind them and stretched over the whole block, which is why it is one
 * long curve: it has to survive being scaled to whatever height the three rows
 * come out at.
 *
 * Below `md` the whole conceit is dropped. Three staggered two-column items at
 * 375px is a zig-zag nobody can see, so it becomes one column and the trail —
 * whose entire job was to connect things that are far apart — goes away.
 */
function Steps() {
  return (
    <div className="relative mt-16 lg:mt-24">
      {/* Spans the whole block, because the path is authored in that box's own coordinates. */}
      <Trail
        delay={260}
        className="absolute inset-0 hidden h-full w-full text-ink-soft md:block"
      />

      <ol className="relative grid gap-y-12 md:grid-cols-6 md:gap-y-16">
        {houseRules.steps.map((step, index) => (
          <li
            key={step.title}
            className={[
              "straighten text-center md:text-left",
              /*
                Row *and* column are both explicit. Left to auto-placement,
                steps one and two both land in row one — they don't share a
                column, so the grid has no reason to move the second one down —
                and the walk collapses into a triangle. Each step owning a row
                is what makes it descend.
              */
              index === 0
                ? "md:col-span-2 md:col-start-1 md:row-start-1"
                : index === 1
                  ? "md:col-span-2 md:col-start-5 md:row-start-2"
                  : "md:col-span-2 md:col-start-3 md:row-start-3",
            ].join(" ")}
            style={{
              ["--rest-tilt" as string]: `${[-1.4, 1.1, -0.7][index]}deg`,
            }}
          >
            {/*
              The number sits inside its own ring, so the ring is positioned
              against the number rather than against the column. Grid rather
              than flex to centre it: one cell, one item, no baseline to fight.
            */}
            <span className="relative mb-3 inline-grid h-[52px] w-[52px] place-items-center text-accent">
              <StepRing delay={200 + index * 140} />
              <span className="font-display-section text-[1.5rem] leading-none">
                {index + 1}
              </span>
            </span>

            <h3 className="font-display-section text-[1.6rem] leading-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-1.5 max-w-[20rem] font-mono text-caption text-ink-soft max-md:mx-auto">
              {step.line}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
