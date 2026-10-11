# Portfolio baseline

Captured on 11 October 2026 from baseline commit `b1ec959`, tagged `v1-portfolio`, before application changes. Local Next.js development server at `http://127.0.0.1:3000`. Capture script is `docs/scripts/capture-before.py` and the detailed results are in `capture-report.json`.

| Viewport | Full page | Opening |
| --- | --- | --- |
| 375 × 812, DPR 1 | [Mobile page](home-375-full.png) | [Mobile hero](home-375-hero.png) |
| 1280 × 900, DPR 1 | [Desktop page](home-1280-full.png) | [Desktop hero](home-1280-hero.png) |

Verified in Chromium 153.0.8010.12: homepage HTTP 200 at both widths; Schoolbell loaded; full pages captured after scrolling through entrance animations. Inspected both opening captures visually. Existing blog, post, back-room, sitemap, robots, now-playing and public image/icon routes returned HTTP 200. `live-sitemap.xml` is the fetched production sitemap and lists the same four content pages as the source.

Failed: both homepage runs raised `Multiple Sentry Session Replay instances are not supported`. The captures retain Next's development indicator, including the desktop issue badge. These are development baseline captures, not clean production marketing assets or Lighthouse evidence. Correct Sentry setup and make clean, same-viewport captures for the final teardown.

Unverified: production visual parity, production monitoring behavior, historical routes absent from current source/sitemap, accessibility and performance scores. The fallback now-playing track can rotate between captures.
