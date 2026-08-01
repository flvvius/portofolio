"use client";

import { useState } from "react";
import { projects, shelf, type Project } from "@/data/site";
import { Container, Section, SectionHead } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { ScribbleNote } from "@/components/ink/Arrow";
import { StickyNote, TapedNote } from "@/components/art/Paper";
import { HangingCuckoo, MokaPot } from "@/components/art/Props";
import {
  Bracket,
  OBJECT_HEIGHT,
  Plank,
  ShelfObject,
} from "@/components/art/ShelfObjects";
import { CaseStudy } from "@/components/CaseStudy";

/**
 * Two wooden shelves. Objects stand on them at their own heights, so the row
 * has a real silhouette rather than the even rhythm of a card grid.
 *
 * The objects are anchors, not divs: with JS off they jump to the plain liner
 * notes at the bottom of this section. With JS, the same click opens the panel.
 *
 * Below `sm` the shelf metaphor is dropped entirely — three objects on a plank
 * at 375px is a diorama nobody can read. The same projects become a plain
 * stacked list, with the objects kept small beside them.
 */

/*
 * Three heights that have to agree, or the objects stop standing on the shelf:
 *
 *   NOTE_BAND  the annotation strip above the objects
 *   ART_AREA   tall enough for the tallest object (the book, 246px at lg)
 *   PLANK_TOP  NOTE_BAND + ART_AREA — where the plank is absolutely placed
 *
 * If you change either of the first two, change the third to match. Tailwind
 * can't add these for us, so they are spelled out and kept next to each other.
 */
const NOTE_BAND = "h-[92px] lg:h-[104px]";
const ART_AREA = "h-[210px] lg:h-[248px]";
const PLANK_TOP = "top-[302px] lg:top-[352px]";

type OpenHandler = (project: Project) => void;

/** Shared click behaviour: enhance to the panel, but stay a real link. */
function objectLinkProps(project: Project, onOpen: OpenHandler) {
  return {
    href: `#note-${project.slug}`,
    "aria-haspopup": "dialog" as const,
    onClick: (event: React.MouseEvent) => {
      // Modified clicks keep working as an ordinary link.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      onOpen(project);
    },
  };
}

function ShelfRow({
  items,
  onOpen,
  delayOffset = 0,
}: {
  items: Project[];
  onOpen: OpenHandler;
  delayOffset?: number;
}) {
  return (
    <div className="relative hidden sm:block">
      <ul className="relative z-10 flex items-stretch">
        {items.map((project, index) => {
          // Annotations alternate which side the arrow hangs off, so three of
          // them in a row read as a hand working across the shelf rather than
          // as a table of captions.
          const leaning = index % 2 === 0;

          return (
          <li
            key={project.slug}
            className="relative flex w-1/3 shrink-0 flex-col items-center"
          >
            {/*
              The annotation band. Every object gets one — this is the caption,
              moved off the shelf and up into the margin where a note about a
              thing belongs. Ink, not orange: six orange arrows would spend the
              whole page's supply of orange on captions.
            */}
            <div className={`flex w-full items-start justify-center px-2 ${NOTE_BAND}`}>
              <Rise delay={delayOffset + index * 60}>
                <ScribbleNote
                  tone="ink"
                  variant={leaning ? "down-right" : "down-left"}
                  seed={11 + index * 3}
                  labelFirst={leaning}
                  arrowClassName="w-8 shrink-0"
                  className="max-w-[15rem] text-center"
                >
                  {project.caption}
                </ScribbleNote>
              </Rise>
            </div>

            {/* the section's only orange scribble, on the one object that asks */}
            {project.nudge && (
              <ScribbleNote
                variant="down-left"
                seed={21}
                arrowClassName="w-9"
                className="absolute left-0 top-[86px] z-20 -translate-x-1/3"
                labelFirst
              >
                click me
              </ScribbleNote>
            )}

            <Rise
              delay={delayOffset + index * 60}
              className={`flex w-full items-end justify-center ${ART_AREA}`}
            >
              <a
                {...objectLinkProps(project, onOpen)}
                // No `h-full` — the anchor must hug the art so `items-end` on
                // the row lands the object's feet exactly on the plank.
                className="group block cursor-shelf no-underline"
              >
                <span
                  className={`shelf-object object-art block text-ink ${OBJECT_HEIGHT[project.object]}`}
                  style={{ ["--rest-tilt" as string]: `${project.tilt}deg` }}
                >
                  <ShelfObject kind={project.object} />
                </span>
                <span className="sr-only">
                  {project.title} — read the liner notes
                </span>
              </a>
            </Rise>

            {/* the plank's thickness, so the label clears it */}
            <span aria-hidden="true" className="h-[18px] w-full shrink-0" />

            {/* taped label, sitting on the shelf edge */}
            <span
              className="relative z-10 -mt-1.5 max-w-[92%] bg-paper-warm px-2.5 py-1 text-center font-mono text-[0.72rem] leading-tight text-ink shadow-paper"
              style={{ transform: `rotate(${project.tilt * -0.6}deg)` }}
            >
              {project.label}
            </span>
          </li>
          );
        })}
      </ul>

      {/* the plank, drawn behind the objects so they stand on it */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 ${PLANK_TOP}`}
      >
        <Plank className="h-[18px] w-full text-ink" />
        {/* brackets sit out at the ends, clear of the taped labels */}
        <div className="-mt-px flex justify-between px-[2%]">
          <Bracket className="h-8 w-auto text-ink" />
          <Bracket className="h-8 w-auto -scale-x-100 text-ink" />
        </div>
      </div>
    </div>
  );
}

/** Below `sm`: same projects, same links, no diorama. */
function ShelfList({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: OpenHandler;
}) {
  return (
    <ul className="space-y-8 sm:hidden">
      {items.map((project, index) => (
        <li key={project.slug}>
          <Rise delay={index * 50}>
            <a
              {...objectLinkProps(project, onOpen)}
              className="group flex items-center gap-5 no-underline"
            >
              <span
                className="shelf-object object-art flex h-[96px] w-[84px] shrink-0 items-end justify-center text-ink"
                style={{ ["--rest-tilt" as string]: `${project.tilt}deg` }}
              >
                <ShelfObject kind={project.object} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.95rem] leading-snug text-ink transition-colors duration-[180ms] group-hover:text-accent">
                  {project.label}
                </span>
                <span className="mt-1.5 block font-mono text-caption leading-snug text-ink-soft">
                  {project.caption}
                </span>
              </span>
            </a>
          </Rise>
        </li>
      ))}
      <li aria-hidden="true">
        <Plank className="h-[14px] w-full text-ink" />
      </li>
    </ul>
  );
}

export function TheShelf() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="the-shelf" className="relative">
      <Container>
        {/*
          The clock on the wall, hung from the top edge of the section. It is
          the only thing on the page that overhangs a section boundary, which
          is the point — a wall clock belongs to the room, not to the shelf.
        */}
        {/*
          Stacked, not side by side — the scribble sat level with the third
          object's annotation and the two ran into each other. Above the clock
          it is clear of the whole annotation band.
        */}
        <Rise className="pointer-events-none absolute right-0 top-0 z-10 hidden flex-col items-end lg:flex">
          <ScribbleNote
            variant="down-right"
            seed={41}
            arrowClassName="w-9"
            className="mr-4 max-w-[7rem]"
            labelFirst
          >
            {shelf.breakScribble}
          </ScribbleNote>
          <HangingCuckoo className="-mt-2 h-36 w-auto text-ink xl:h-44" />
        </Rise>

        <div className="grid-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <SectionHead
              eyebrow={shelf.eyebrow}
              title="the shelf"
              intro={shelf.intro}
            />

            <Rise delay={120} className="mt-10 inline-block">
              <StickyNote tilt={-2.5}>{shelf.stickyNote}</StickyNote>
            </Rise>

            {/* the corner of the room the shelf lives in */}
            <Rise delay={180} className="mt-14 hidden items-end gap-3 lg:flex">
              <MokaPot className="h-32 w-auto shrink-0 text-ink" />
              <ScribbleNote
                variant="down-left"
                seed={37}
                arrowClassName="w-9"
                className="mb-6 max-w-[8rem]"
              >
                {shelf.moreSoon}
              </ScribbleNote>
            </Rise>
          </div>

          <div className="col-span-12 space-y-14 lg:col-span-8 lg:space-y-16">
            <ShelfRow items={projects.slice(0, 3)} onOpen={setOpen} />
            <ShelfRow items={projects.slice(3)} onOpen={setOpen} delayOffset={60} />
            <ShelfList items={projects} onOpen={setOpen} />

            {/* the note left on the counter on your way past */}
            <Rise delay={120} className="hidden justify-end sm:flex">
              <TapedNote tilt={2.5} className="max-w-[13rem]">
                {shelf.thanks.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span aria-hidden="true" className="mt-1 block text-accent">
                  ♥
                </span>
              </TapedNote>
            </Rise>
          </div>
        </div>
      </Container>

      {/*
        No-JS fallback. Hidden the moment the page confirms it has JS, so
        nobody sees both the shelf and a duplicate wall of text.
      */}
      <div className="no-js-only">
        <Container className="mt-24">
          <h3 className="font-display-section text-[1.6rem] text-ink">
            liner notes
          </h3>
          <div className="mt-8 space-y-14">
            {projects.map((project) => (
              <article key={project.slug} id={`note-${project.slug}`}>
                <h4 className="font-display-section text-[1.4rem] text-ink">
                  {project.title}
                </h4>
                <p className="mt-2 font-mono text-caption italic text-ink-soft">
                  {project.caption}
                </p>
                <div className="measure mt-4 space-y-3 font-mono text-[0.95rem] text-ink">
                  {project.story.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
                <p className="measure mt-4 border-l-2 border-accent pl-4 font-mono text-caption text-ink-soft">
                  {project.bSide}
                </p>
                <p className="mt-4 font-mono text-caption text-ink-soft">
                  {project.stack.join(" · ")}
                </p>
                {project.links.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="ink-link font-mono text-caption"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Container>
      </div>

      {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}
