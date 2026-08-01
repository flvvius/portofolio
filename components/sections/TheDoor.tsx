import { door, socials } from "@/data/site";
import { Container, Section } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { Scribble } from "@/components/ink/Scribble";
import { ScribbleNote } from "@/components/ink/Arrow";
import { TapedNote } from "@/components/art/Paper";
import { CuckooHeadphones } from "@/components/art/Cuckoo";
import { Coaster, Counter } from "@/components/art/Bar";

type Glyph = "github" | "x" | "linkedin" | "email";

const GLYPHS: Record<string, Glyph> = {
  github: "github",
  x: "x",
  linkedin: "linkedin",
  email: "email",
};

/**
 * Closing time. About on the left with the mascot, socials as coasters stacked
 * on the counter on the right.
 *
 * Two hand-drawn marks live in this section and no more: the underline in the
 * about copy, and "say hi" on the email coaster. The mascot's "that's me" is
 * typeset, not scribbled, precisely so it doesn't become a third.
 */
export function TheDoor() {
  const [firstParagraph, ...restParagraphs] = door.about;
  const [beforeMark, afterMark] = firstParagraph.includes(door.underline)
    ? firstParagraph.split(door.underline)
    : [firstParagraph, ""];

  return (
    <Section id="the-door" className="relative pb-20 lg:pb-24">
      <Container>
        <Rise as="h2" className="font-display-section text-section text-ink">
          the door
        </Rise>

        <div className="mt-14 grid-12 gap-x-8 gap-y-16">
          {/* ---- about ---- */}
          <div className="col-span-12 lg:col-span-6">
            <Rise delay={60}>
              <div className="measure space-y-5 font-mono text-[0.95rem] leading-[1.8] text-ink">
                <p>
                  {beforeMark}
                  {afterMark !== "" && (
                    <Scribble type="underline" delay={200} strokeWidth={2} multiline>
                      {door.underline}
                    </Scribble>
                  )}
                  {afterMark}
                </p>
                {restParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Rise>

            {/* mascot, appearance four of five */}
            <Rise delay={140} className="mt-12 block">
              <div className="flex items-end gap-4">
                <CuckooHeadphones className="h-24 w-auto text-ink sm:h-28" />
                <p
                  aria-hidden="true"
                  className="mb-3 font-mono text-caption text-ink-soft"
                >
                  ← {door.mascotScribble}
                </p>
              </div>
            </Rise>
          </div>

          {/* ---- coasters on the counter ---- */}
          <div className="relative col-span-12 lg:col-span-6">
            <Rise delay={100}>
              <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-soft">
                pick a coaster
              </h3>

              <ul className="mt-8 flex flex-col items-center">
                {socials.map((social, index) => (
                  <li
                    key={social.href}
                    /*
                     * A slumped stack: each coaster overlaps the one below and
                     * slides sideways. The overlap stops short of the label —
                     * the point of a coaster here is that you can read it.
                     */
                    className={[
                      "relative",
                      index === 0 ? "" : "-mt-[46px] sm:-mt-[56px]",
                      index % 2 === 0
                        ? "-translate-x-7 sm:-translate-x-11"
                        : "translate-x-7 sm:translate-x-11",
                    ].join(" ")}
                    style={{ zIndex: index + 1 }}
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={
                        social.href.startsWith("mailto:")
                          ? undefined
                          : "noreferrer noopener"
                      }
                      className="coaster relative block w-[142px] text-ink no-underline sm:w-[166px]"
                      style={{ ["--rest-tilt" as string]: `${social.tilt}deg` }}
                    >
                      <Coaster glyph={GLYPHS[social.label]} className="w-full" />
                      <span className="absolute inset-x-0 bottom-[26%] text-center font-mono text-[0.8rem] lowercase">
                        {social.label}
                      </span>
                    </a>

                    {social.nudge && (
                      <ScribbleNote
                        variant="down-left"
                        seed={31}
                        arrowClassName="w-10"
                        className="absolute -right-2 top-1/2 hidden -translate-y-1/2 translate-x-full sm:inline-flex"
                        labelFirst={false}
                      >
                        {social.nudge}
                      </ScribbleNote>
                    )}
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise delay={180} className="mt-12 block">
              <div className="flex justify-center sm:justify-end">
                <TapedNote tilt={2}>{door.tapedNote}</TapedNote>
              </div>
            </Rise>
          </div>
        </div>
      </Container>

      {/* the counter the whole section rests on */}
      <div aria-hidden="true" className="mt-16 lg:mt-20">
        <Counter className="h-14 w-full text-ink" />
      </div>

      <footer className="pt-8">
        {/* the hearts stay ink — nothing decorative gets the accent */}
        <p className="text-center font-mono text-caption text-ink-soft">
          <span aria-hidden="true">♥</span> {door.footer}{" "}
          <span aria-hidden="true">♥</span>
        </p>
      </footer>
    </Section>
  );
}
