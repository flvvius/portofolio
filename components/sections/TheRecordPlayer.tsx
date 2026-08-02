import Link from "next/link";
import { recordPlayer, tab } from "@/data/site";
import { getAllBlogPosts } from "@/data/blog";
import { Container, Section, SectionHead } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { ScribbleNote } from "@/components/ink/Arrow";
import { IndexCard } from "@/components/art/Paper";

/**
 * The table the site keeps between project launches: the notes on one side,
 * the tab on the other.
 *
 * The roles are deliberately not a list of jobs. Every portfolio has that
 * section and it reads the same everywhere; a tab lets each role be a story
 * someone told you at the bar, with the dates reduced to the small print they
 * actually are.
 *
 * It is a tab in the wording and the tally, not in the paper. Printing it as
 * an actual receipt (torn edge, perforations, rubber stamp) made it the one
 * object on the page wearing a costume, and a costume reads as a sticker
 * however well it's drawn. So it is set the way the rest of the site is set:
 * hairline rules, mono, one hand-drawn mark, and the dates in the margin.
 */

/** A column heading: label on the left, its aside on the right, rule beneath. */
function ColumnHead({ label, aside }: { label: string; aside: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/20 pb-2">
      <h3 className="font-mono text-[0.96rem] uppercase tracking-[0.18em] text-ink">
        {label}
      </h3>
      <p className="font-mono text-[0.96rem] text-ink-soft">{aside}</p>
    </div>
  );
}

/** The roles, itemised. One line each, the way a tab is written up. */
function TheTab() {
  return (
    <Rise delay={80}>
      <ColumnHead label={tab.label} aside={tab.aside} />

      <ol className="mt-8">
        {tab.items.map((item, index) => (
          <li
            key={item.line}
            // A hairline between lines, never around them: the tab is one
            // running list, not four cards.
            className={
              index === 0 ? "" : "mt-8 border-t border-ink/15 pt-8"
            }
          >
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-mono text-[1.38rem] leading-snug text-ink">
                {item.line}
              </h4>
              <span className="shrink-0 font-mono text-[0.96rem] uppercase tracking-[0.12em] text-ink-soft">
                {item.date}
              </span>
            </div>

            <p className="mt-1 font-mono text-caption text-ink-soft">
              {item.place}
              <span aria-hidden="true"> · </span>
              {item.duration}
            </p>

            <p className="measure mt-3 font-mono text-[1.26rem] leading-[1.75] text-ink-soft">
              {item.story}
            </p>
          </li>
        ))}
      </ol>

      {/* the tally at the bottom of the tab */}
      <dl className="mt-10 space-y-2 border-t border-ink/20 pt-5">
        {tab.totals.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4"
          >
            <dt className="shrink-0 font-mono text-[0.96rem] uppercase tracking-[0.12em] text-ink-soft">
              {row.label}
            </dt>
            <dd className="text-right font-mono text-caption text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* the one handwritten mark in the section, pointing at the total */}
      <div className="mt-1 flex justify-end pr-2">
        <ScribbleNote variant="up-right" seed={29} arrowClassName="w-10" labelFirst>
          {tab.scribble}
        </ScribbleNote>
      </div>

      {/* school, kept where a footnote belongs */}
      <div className="mt-8">
        <p className="font-mono text-[0.96rem] uppercase tracking-[0.12em] text-ink-soft">
          {tab.education.title}
        </p>
        <ul className="mt-2 space-y-1">
          {tab.education.lines.map((line) => (
            <li
              key={line.title}
              className="flex items-baseline justify-between gap-4 font-mono text-caption text-ink-soft"
            >
              <span>{line.title}</span>
              <span className="shrink-0">{line.years}</span>
            </li>
          ))}
        </ul>
      </div>
    </Rise>
  );
}

/** The notes, on index cards, because that is what a note is. */
function TheNotes() {
  const posts = getAllBlogPosts();

  return (
    <Rise>
      <ColumnHead label="notes" aside={`${posts.length} so far`} />

      <ul className="mt-6 space-y-5">
        {posts.slice(0, 4).map((post, index) => (
          <li key={post.id}>
            <IndexCard tilt={index % 2 === 0 ? -1.5 : 1.5}>
              <Link href={`/blog/${post.id}`} className="group block no-underline">
                <p className="font-mono text-[0.94rem] uppercase tracking-[0.12em] text-ink-soft">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {" · "}
                  {post.readTime}
                </p>
                <p className="mt-1.5 font-mono text-[1.26rem] leading-snug text-ink transition-colors duration-[180ms] group-hover:text-accent">
                  {post.title}
                </p>
                <p className="mt-2 font-mono text-caption leading-snug text-ink-soft">
                  {post.excerpt.length > 120
                    ? `${post.excerpt.slice(0, 117)}…`
                    : post.excerpt}
                </p>
              </Link>
            </IndexCard>
          </li>
        ))}
      </ul>

      <p className="mt-6">
        <Link href="/blog" className="ink-link font-mono text-caption">
          all the notes →
        </Link>
      </p>
    </Rise>
  );
}

export function TheRecordPlayer() {
  return (
    <Section id="the-record-player" className="bg-paper">
      <Container>
        {/* this section anchors right, the shelf anchored left */}
        <SectionHead
          title="the record player"
          intro={recordPlayer.intro}
          align="right"
        />

        {/* Column five is left empty: the two halves are separate things. */}
        <div className="mt-16 grid-12 items-start gap-x-8 gap-y-16">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <TheNotes />
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <TheTab />
          </div>
        </div>
      </Container>
    </Section>
  );
}
