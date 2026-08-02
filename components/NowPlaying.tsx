"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { fallbackTracks, houseRecord } from "@/data/site";
import { MiniRecord } from "@/components/art/Turntable";
import { houseRecordState } from "@/lib/vinyl";

type Track = { track: string; artist: string; nowPlaying?: boolean };

/**
 * The "now playing" chip above the turntable.
 *
 * Three states, in order of precedence:
 *
 *  1. The house record is on. Then this chip says so, because something is
 *     genuinely coming out of the speakers and it is not the thing last.fm
 *     last saw. A chip naming one track while a different one audibly plays is
 *     the only outright lie the page is capable of telling.
 *  2. LASTFM_API_KEY / LASTFM_USER are set, so what's actually on, polled. No
 *     OAuth, no user gesture.
 *  3. Neither. It quietly cycles the hardcoded list, which is indistinguishable
 *     to a visitor and means the section is never empty.
 */
export function NowPlaying() {
  const [track, setTrack] = useState<Track>(fallbackTracks[0]);
  const [live, setLive] = useState(false);

  const houseRecordOn = useSyncExternalStore(
    houseRecordState.subscribe,
    houseRecordState.get,
    houseRecordState.getServerSnapshot
  );

  // Fallback rotation. Runs until (and unless) last.fm answers, and holds
  // still while the house record has the platter, so that stopping the music
  // doesn't drop you three tracks further down a list you never saw moving.
  useEffect(() => {
    if (live || houseRecordOn) return;
    const id = setInterval(() => {
      setTrack((current) => {
        const index = fallbackTracks.findIndex((t) => t.track === current.track);
        return fallbackTracks[(index + 1) % fallbackTracks.length];
      });
    }, 9000);
    return () => clearInterval(id);
  }, [live, houseRecordOn]);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const data = (await res.json()) as Track | { configured: false };
        if (cancelled || !("track" in data)) return;
        setTrack(data);
        setLive(true);
      } catch {
        // Offline, blocked, or last.fm is having a day. The rotation covers it.
      }
    };

    poll();
    const id = setInterval(poll, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  /*
   * The house record wins outright while it is on. It is the only source here
   * that is actually audible in the room, so it outranks a report of what was
   * playing somewhere else an hour ago.
   */
  const shown = houseRecordOn ? houseRecord : track;
  const derived = sleeveOf(track.track);
  const sleeve = houseRecordOn
    ? { side: houseRecord.side, position: houseRecord.position }
    : { side: derived.side, position: `track ${derived.track}` };

  return (
    <div className="inline-flex max-w-full items-start gap-3">
      <MiniRecord className="mt-1 h-7 w-7 shrink-0 text-ink" />
      <div className="min-w-0">
        <span className="inline-block bg-ink px-2 py-0.5 font-mono text-[0.94rem] uppercase tracking-[0.14em] text-paper">
          {houseRecordOn || (live && track.nowPlaying)
            ? "now playing"
            : "on the platter"}
        </span>
        <p
          className="mt-1.5 truncate font-mono text-[1.26rem] leading-snug text-accent"
          aria-live="polite"
        >
          {shown.track}
        </p>
        <p className="truncate font-mono text-caption text-ink-soft">
          {shown.artist}
        </p>
        {/* the small print on the sleeve, see sleeveOf */}
        <p aria-hidden="true" className="font-mono text-caption text-ink-soft/80">
          side {sleeve.side} · {sleeve.position}
        </p>
      </div>
    </div>
  );
}

/**
 * Which side of the record, and which track on it.
 *
 * Derived from the title rather than stored, so it is stable for a given song
 * and survives whatever last.fm hands back. It is set dressing and is marked
 * aria-hidden accordingly, and deliberately *not* a playback position, because a
 * counter ticking against a record nobody is actually spinning is a lie the
 * rest of this page doesn't tell.
 */
function sleeveOf(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) % 997;
  }
  return {
    side: hash % 2 === 0 ? "a" : "b",
    track: String((hash % 6) + 1).padStart(2, "0"),
  };
}
