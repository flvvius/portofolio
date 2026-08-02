"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Project } from "@/data/site";

/**
 * The panel behind a shelf object. Story first, stack as a footnote at the
 * bottom, the way a record sleeve tells you what the session was like before
 * it lists who played bass.
 *
 * Enhancement only: without JS the same content is already on the page as
 * plain sections (see TheShelf), and the shelf objects are ordinary anchors
 * pointing at them.
 */
export function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => onClose(), [onClose]);

  /*
   * Mount/unmount concerns only, so this runs exactly once. Focus is restored
   * in the cleanup rather than in the close handler: React unmounts the panel
   * after the handler returns, and removing a focused subtree drops focus to
   * <body>, which would undo an earlier restore.
   */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep tabbing inside the panel while it's open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="close project"
        onClick={close}
        className="absolute inset-0 cursor-default bg-ink/35"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-${project.slug}-title`}
        tabIndex={-1}
        className="panel-in relative max-h-[88vh] w-full max-w-[640px] overflow-y-auto bg-paper-warm shadow-paper-ink outline-none sm:max-h-[82vh]"
        style={{ border: "1px solid rgba(43, 33, 26, 0.6)" }}
      >
        {/* nothing left in this bar but the way out, so it sits to the right */}
        <div className="sticky top-0 flex items-start justify-end gap-4 bg-paper-warm px-6 pb-3 pt-6 sm:px-9 sm:pt-8">
          <button
            type="button"
            onClick={close}
            className="-mt-1 shrink-0 font-mono text-caption text-ink-soft transition-colors duration-[180ms] hover:text-accent"
          >
            close ✕
          </button>
        </div>

        <div className="px-6 pb-9 sm:px-9">
          <h3
            id={`case-${project.slug}-title`}
            className="font-display-section text-[clamp(1.7rem,4vw,2.4rem)] text-ink"
          >
            {project.title}
          </h3>

          <p className="mt-3 font-mono text-caption italic text-ink-soft">
            {project.caption}
          </p>

          {/*
            The way out to the actual thing, above the fold of the panel. The
            story is worth reading, but nobody should have to scroll a wall of
            it to find out the project is live and clickable.
          */}
          {project.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ink-link font-mono text-[1.05rem]"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}

          <div
            aria-hidden="true"
            className="my-6 h-px w-full bg-ink/20"
          />

          <div className="measure space-y-4 font-mono text-[1.05rem] leading-[1.75] text-ink">
            {project.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {/* the stack is a footnote, not a headline, and never an empty one */}
          {project.stack.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-ink-soft">
                personnel
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border border-ink/60 px-2.5 py-1 font-mono text-[0.83rem] text-ink-soft"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
