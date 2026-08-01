import { setlist } from "@/data/site";
import { Container, Section, SectionHead } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { TapedNote } from "@/components/art/Paper";

/**
 * The setlist: the running order of what's been played, and where.
 *
 * Structurally the opposite of the shelf on purpose — that section is objects
 * in space, this one is a strict chronological column. Two adjacent sections
 * that share a layout would read as a template.
 *
 * No scribbles here. The shelf's "click me" is close enough overhead that
 * adding one would push the viewport over the two-mark budget.
 */
export function TheSetlist() {
  return (
    <Section id="the-setlist">
      <Container>
        <SectionHead title="the setlist" intro={setlist.intro} />

        <ol className="mt-16 border-t border-ink/20">
          {setlist.gigs.map((gig, index) => (
            <Rise
              as="li"
              key={`${gig.place}-${gig.period}`}
              delay={index * 60}
              className="grid-12 gap-x-8 gap-y-3 border-b border-ink/20 py-8"
            >
              {/* when */}
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">
                  {gig.period}
                </p>
                {gig.current && (
                  <p className="mt-2 inline-block border border-ink/40 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-soft">
                    on now
                  </p>
                )}
              </div>

              {/* what */}
              <div className="col-span-12 md:col-span-9">
                <h3 className="font-mono text-[1.05rem] leading-snug text-ink">
                  {gig.role}
                </h3>
                <p className="mt-0.5 font-mono text-caption text-ink-soft">
                  {gig.place}
                </p>

                <div className="measure mt-4 space-y-2.5">
                  {gig.lines.map((line) => (
                    <p
                      key={line.slice(0, 24)}
                      className="font-mono text-[0.95rem] leading-[1.75] text-ink-soft"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* the stack stays a footnote here too */}
                <p className="mt-4 font-mono text-[0.72rem] text-ink-soft/80">
                  {gig.stack.join(" · ")}
                </p>
              </div>
            </Rise>
          ))}
        </ol>

        {/* the section's one physical object, overhanging the grid to the right */}
        <Rise delay={80} className="mt-12 flex justify-end">
          <TapedNote tilt={-2} className="md:mr-[-6%]">
            {setlist.education.map((line, index) => (
              <span
                key={line}
                className={index === 0 ? "block text-ink" : "block"}
              >
                {line}
              </span>
            ))}
          </TapedNote>
        </Rise>
      </Container>
    </Section>
  );
}
