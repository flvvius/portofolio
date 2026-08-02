"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { CuckooClock } from "@/components/art/Logo";
import { HouseRecordToggle } from "@/components/HouseRecordToggle";
import { HandUnderline } from "@/components/ink/Underline";
import { MenuSheet, holdPage } from "@/components/MenuSheet";

/**
 * The top of the page, which is deliberately not a navbar.
 *
 * No bar, no blur, no rule underneath, no shadow. The links sit directly on
 * the paper like the labels written along the top of a page, and the only
 * background is the same `--paper` the body already has. A solid fill in the
 * page's own colour is invisible as chrome but still stops body text sliding
 * up behind the words, which is the one thing a transparent sticky header
 * cannot do.
 *
 * Every label is underscored by hand. The active one is the only orange thing
 * up here, which is the rule of the whole site in miniature: orange means
 * "this, right here". Five orange scribbles would spend the page's entire
 * allowance of it before you had read a word.
 *
 * It gets out of the way going down and comes back coming up, because on the
 * way down you are reading and on the way up you are looking for something.
 *
 * The four labels run to about 500px of type, so below `md` they are not up
 * here at all. The header keeps the mark, the record and one word, and the
 * sections move into the sheet (see MenuSheet). Which means this row never has
 * to squeeze, wrap or scroll sideways at any width.
 */

/** Above this, the header is always shown, since a bounce at the top can't latch it shut. */
const REVEAL_AT = 80;

/** Scroll noise below this is ignored, so a trackpad twitch can't flap the header. */
const JITTER = 6;

export function Nav() {
  /*
   * Empty until the observer has actually seen something. Seeding it with the
   * first section marked the bar orange on the blog, where none of these
   * sections exist to disagree.
   */
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const home = pathname === "/";

  const button = useRef<HTMLButtonElement>(null);
  /** Read by the scroll handler, which must not run while the sheet is up. */
  const isOpen = useRef(false);

  useEffect(() => {
    isOpen.current = open;
  }, [open]);

  const close = useCallback((returnFocus?: boolean) => {
    setOpen(false);
    // The sheet lifts its own hold on the page when its effect tears down,
    // which is a beat later than the link in this header may need it.
    holdPage(false);
    if (returnFocus) button.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever tracked section covers the most of the viewport wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const sync = () => {
      frame = 0;
      const y = window.scrollY;

      // While the sheet is up this header holds the only way to close it, and
      // the scroll that reaches here is the sheet's own. Leave it alone.
      if (isOpen.current) return;

      if (y < REVEAL_AT) {
        setHidden(false);
        last = y;
        return;
      }

      const delta = y - last;
      // Deliberately not updating `last` here: small movements accumulate
      // until they add up to a real direction, instead of being discarded.
      if (Math.abs(delta) < JITTER) return;

      setHidden(delta > 0);
      last = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(sync);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /*
   * Turning a phone sideways can cross into the width where the links are back
   * in the header and the sheet is `display: none`. Closing on the way past
   * keeps that from leaving a page that is scroll-locked by an invisible menu.
   */
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <header
        /*
         * A keyboard user tabbing into a header that scrolled away would be
         * chasing focus around an invisible element, so focus brings it back.
         * This is also why the links are never `inert` while hidden: inert
         * would stop focus from ever arriving to un-hide it.
         */
        onFocusCapture={() => setHidden(false)}
        className={`chrome sticky top-0 z-50 bg-paper ${
          hidden && !open ? "chrome-hidden" : ""
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1180px] items-start justify-between gap-4 px-5 pb-5 pt-5 sm:gap-6 sm:px-8 sm:pb-6">
          {/* The mark, with the name written under it rather than beside it. */}
          <a
            href={home ? "#the-bar" : "/"}
            onClick={() => close()}
            className="flex shrink-0 flex-col items-start gap-1 no-underline"
            aria-label={`${site.name}, back to the top`}
          >
            <CuckooClock className="h-9 w-auto text-ink sm:h-11" />
            <span
              aria-hidden="true"
              className="hidden font-hand text-[1.15rem] leading-[0.9] text-ink-soft sm:block"
            >
              flavius
              <br />
              studio
            </span>
          </a>

          {/*
            The links appear at the width where all four fit on one line with
            the mark and the record still beside them, and not one pixel
            before. Below that they live in the sheet and this is
            `display: none`, so the duplicate set is never in the tab order or
            read out twice.
          */}
          <nav
            aria-label="sections"
            className="hidden min-w-0 flex-1 pt-1.5 md:block"
          >
            <ul className="flex items-center justify-center gap-6 whitespace-nowrap lg:gap-9">
              {nav.map((item, index) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.href} className="shrink-0">
                    <a
                      href={home ? item.href : `/${item.href}`}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "group relative inline-block pb-2 font-mono text-[1rem] no-underline lg:text-[1.1rem]",
                        "transition-colors duration-[180ms]",
                        isActive ? "text-accent" : "text-ink hover:text-accent",
                      ].join(" ")}
                    >
                      {item.label}
                      <HandUnderline
                        seed={index}
                        className={[
                          "absolute inset-x-0 bottom-0 h-[6px] w-full",
                          "transition-colors duration-[180ms]",
                          isActive
                            ? "text-accent"
                            : "text-ink/40 group-hover:text-accent",
                        ].join(" ")}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-5 pt-1.5 sm:gap-6">
            {/* the sign in the window, and the switch that puts a record on */}
            <HouseRecordToggle />

            {/*
              One word, underlined by the same hand as the links it stands in
              for, not a hamburger. There is not a single icon anywhere else on
              this site, and the top of the page is not the place to start.
            */}
            <button
              ref={button}
              type="button"
              onClick={() => (open ? close(true) : setOpen(true))}
              aria-expanded={open}
              aria-controls="menu-sheet"
              // The name stays "menu" in both states, and `aria-expanded` is what
              // says which way it is, and a control that renames itself is a
              // control screen-reader users have to find again.
              aria-label="menu"
              className="group relative inline-block pb-2 font-mono text-[1rem] lowercase text-ink transition-colors duration-[180ms] hover:text-accent md:hidden"
            >
              {/*
                Both words in one grid cell, so the cell is always as wide as
                "close" and the record beside it never shifts when the label
                changes. Same trick, same reason, as the sign on the toggle.
              */}
              <span aria-hidden="true" className="grid">
                <span
                  className={`needle-label col-start-1 row-start-1 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                >
                  menu
                </span>
                <span
                  className={`needle-label col-start-1 row-start-1 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  close
                </span>
              </span>
              <HandUnderline
                seed={2}
                className={`absolute inset-x-0 bottom-0 h-[6px] w-full transition-colors duration-[180ms] ${
                  open ? "text-accent" : "text-ink/40 group-hover:text-accent"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/*
        Outside the header on purpose: the header takes a transform when it
        scrolls away, and a transformed ancestor would make the sheet's
        `fixed` positioning relative to *it* rather than to the viewport.
      */}
      <MenuSheet open={open} active={active} onClose={close} />
    </>
  );
}
