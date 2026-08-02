"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { nav, socials } from "@/data/site";
import { HandUnderline } from "@/components/ink/Underline";

/**
 * Hold the page still behind the sheet, or let it go again.
 *
 * Module scope rather than a closure inside the component because it is called
 * from three places on three different clocks: the effect below, the links in
 * the sheet, and the header, which owns a link of its own.
 */
export function holdPage(hold: boolean) {
  document.body.style.overflow = hold ? "hidden" : "";
}

/**
 * The menu, for a phone.
 *
 * Four section names do not fit across a 390px screen at any size worth
 * reading, and the sideways-scrolling strip that used to hold them was the
 * worst of both: the last two labels were off the edge with nothing to say so,
 * and the first two were small enough to be a caption rather than a choice.
 *
 * So on a phone the sections stop pretending to be a bar and become what the
 * rest of the site already is: a menu, printed on the same paper, one item per
 * line, at a size you can read from a table. The sheet drops from under the
 * header rather than covering it, so the mark and the record are still there
 * while you decide; the paper is the page's own `--paper`, so nothing about it
 * reads as a panel that flew in from off-screen.
 *
 * It is a disclosure, not a dialog: the button that opens it stays visible,
 * keeps `aria-expanded`, and is where focus goes back to. The page behind it
 * goes `inert` so nothing under the paper can be tabbed into or read out.
 */
export function MenuSheet({
  open,
  active,
  onClose,
}: {
  open: boolean;
  /** id of the section currently on screen, or "" if none is being tracked */
  active: string;
  /** `true` puts focus back on the button that opened this, for Escape and not links */
  onClose: (returnFocus?: boolean) => void;
}) {
  const first = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const home = pathname === "/";

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose(true);
    };

    const main = document.querySelector("main");

    document.addEventListener("keydown", onKey);
    holdPage(true);
    main?.setAttribute("inert", "");
    first.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKey);
      holdPage(false);
      main?.removeAttribute("inert");
    };
  }, [open, onClose]);

  /**
   * Close, and get out of the link's way.
   *
   * The hold is released here by hand rather than left to the effect's cleanup,
   * which runs a beat later, after the browser has already acted on the link,
   * and a page that is still held cannot scroll to the section you just asked
   * for. Released here, the link is an ordinary link: the browser does the
   * scrolling, with the page's own `scroll-padding-top` and `scroll-behavior`,
   * and works the same whether the section is on this page or back on the home
   * page. Nothing is intercepted.
   */
  const leave = () => {
    onClose();
    holdPage(false);
  };

  return (
    <div
      id="menu-sheet"
      /*
       * Kept in the DOM and hidden with `visibility` rather than unmounted, so
       * it can fade both ways. Hidden visibility also takes the links out of
       * the tab order and out of the accessibility tree, which `opacity: 0`
       * alone would not.
       */
      className={[
        "fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-paper md:hidden",
        "transition-[opacity,transform,visibility] duration-[240ms] ease-panel",
        open
          ? "menu-sheet-open visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0",
      ].join(" ")}
    >
      <nav
        aria-label="menu"
        className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-5 pb-12 pt-24 sm:px-8"
      >
        <p className="font-hand text-[1.45rem] leading-none text-ink-soft">
          what&apos;s where
        </p>

        <ul className="mt-7 flex flex-col">
          {nav.map((item, index) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  ref={index === 0 ? first : undefined}
                  href={home ? item.href : `/${item.href}`}
                  onClick={leave}
                  aria-current={isActive ? "true" : undefined}
                  className="menu-item flex items-baseline gap-4 py-3.5 no-underline"
                  style={{ ["--stagger" as string]: `${index * 45}ms` }}
                >
                  {/* the line number on a menu, and the thing that lines the
                      labels up with each other rather than with the edge */}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-[0.83rem] text-ink-soft"
                  >
                    0{index + 1}
                  </span>

                  <span className="relative inline-block pb-2">
                    <span
                      className={[
                        "font-display-section text-[clamp(1.6rem,7.5vw,2.6rem)]",
                        isActive ? "text-accent" : "text-ink",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                    <HandUnderline
                      seed={index}
                      className={[
                        "absolute inset-x-0 bottom-0 h-[6px] w-full",
                        isActive ? "text-accent" : "text-ink/35",
                      ].join(" ")}
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Pushed to the bottom of the sheet, the small print on a menu. */}
        <div className="mt-auto pt-12">
          <p className="font-mono text-[0.83rem] lowercase text-ink-soft">
            or find me at
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => {
              const mail = social.href.startsWith("mailto:");
              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target={mail ? undefined : "_blank"}
                    rel={mail ? undefined : "noreferrer noopener"}
                    onClick={leave}
                    className="ink-link font-mono text-caption"
                  >
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
