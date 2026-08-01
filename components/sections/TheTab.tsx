import { tab } from "@/data/site";
import { Container, Section, SectionHead } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { PAPER_WARM } from "@/components/art/ink";

/**
 * The roles, printed as a bar tab.
 *
 * Deliberately not a list of jobs. Every portfolio has that section and it
 * reads the same everywhere; a receipt lets each role be a story someone told
 * you at the bar, with the dates reduced to the small print they actually are.
 *
 * Composition-wise this is the one centred section on the page — everything
 * else anchors left or right — so it lands as an object left on the table
 * rather than another column of content.
 */

/**
 * Torn-off bottom edge. A receipt is never cut straight.
 *
 * The zigzag is generated rather than hand-written so it spans the full width
 * exactly — a hand-authored path has to be recounted every time the viewBox
 * changes, and gets it wrong quietly. The teeth are uneven but deterministic,
 * so server and client render identically.
 */
const TEETH = Array.from({ length: 50 }, (_, i) => {
  const x = 300 - i * 6;
  // Alternating depth with a slight limp, so it reads torn rather than pinked.
  const y = i % 2 === 0 ? 3.5 : 8.5 - (i % 4 === 1 ? 1.2 : 0);
  return `${x} ${y}`;
});

const TEAR = `M300 ${TEETH[0].split(" ")[1]} ${TEETH.slice(1)
  .map((point) => `L${point}`)
  .join(" ")}`;

function TornEdge() {
  return (
    <svg
      viewBox="0 0 300 10"
      preserveAspectRatio="none"
      className="ink-art ink-art-plain block h-2.5 w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* the paper itself, unstroked so the receipt's sides stay open */}
      <path d={`M0 0 H300 ${TEAR.slice(1)} Z`} fill={PAPER_WARM} stroke="none" />
      {/* only the tear gets a line */}
      <path d={TEAR} />
    </svg>
  );
}

/** The dashed rules a thermal printer leaves between blocks. */
function Perforation() {
  return (
    <div
      aria-hidden="true"
      className="my-4 border-t border-dashed border-ink/35"
    />
  );
}

export function TheTab() {
  return (
    <Section id="the-tab">
      <Container>
        <SectionHead eyebrow={tab.eyebrow} title="the tab" intro={tab.intro} />

        <div className="mt-16 flex justify-center">
          <Rise className="relative w-full max-w-[30rem]">
            {/* the receipt body — square edges, hard shadow, no blur */}
            {/* tighter gutters on a phone, so the pre-broken lines don't re-wrap */}
            <div className="bg-paper-warm px-4 pb-6 pt-8 shadow-paper-lg sm:px-9">
              {/* header */}
              <div className="text-center">
                <p className="font-mono text-[0.95rem] uppercase tracking-[0.4em] text-ink">
                  {tab.header.title}
                </p>
                <p className="mt-3 font-mono text-caption text-ink-soft">
                  {tab.header.who}
                </p>
                <p className="font-mono text-[0.72rem] text-ink-soft">
                  {tab.header.where}
                </p>
              </div>

              <Perforation />

              {/* line items */}
              <ol>
                {tab.items.map((item, index) => (
                  <li key={item.line} className={index === 0 ? "" : "mt-7"}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-mono text-[0.95rem] text-ink">
                        <span aria-hidden="true" className="text-ink-soft">
                          1×{" "}
                        </span>
                        {item.line}
                      </h3>
                      <span className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-soft">
                        {item.date}
                      </span>
                    </div>

                    <p className="mt-0.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-soft">
                      {item.place}
                    </p>

                    {/*
                      Pre-broken lines, so the story keeps a receipt's ragged
                      right edge instead of justifying into a paragraph.
                    */}
                    <p className="mt-2.5 font-mono text-[0.72rem] leading-[1.7] text-ink-soft sm:text-caption sm:leading-[1.65]">
                      {item.story.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>

                    <p className="mt-2 text-right font-mono text-[0.72rem] text-ink-soft">
                      ······ {item.duration}
                    </p>
                  </li>
                ))}
              </ol>

              <Perforation />

              {/* totals */}
              <dl className="space-y-1.5">
                {tab.totals.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft">
                      {row.label}
                    </dt>
                    <dd className="text-right font-mono text-caption text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Perforation />

              {/* the bit at the bottom of every receipt nobody reads */}
              <div className="text-center">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft">
                  {tab.education.title}
                </p>
                {tab.education.lines.map((line) => (
                  <p
                    key={line}
                    className="whitespace-pre font-mono text-[0.72rem] text-ink-soft"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <p className="mt-7 text-center font-mono text-[0.72rem] text-ink-soft">
                {tab.footer}
              </p>
            </div>

            <TornEdge />

            {/*
              The stamp is the one rotated thing here — a physical mark, not a
              text block, and the section's element that breaks its column.
            */}
            <p
              aria-label={tab.stamp}
              className="absolute -right-3 bottom-10 border-2 border-ink/70 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/70 sm:-right-8"
              style={{ transform: "rotate(-8deg)" }}
            >
              {tab.stamp}
            </p>
          </Rise>
        </div>
      </Container>
    </Section>
  );
}
