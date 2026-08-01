"use client";

import { useEffect, useState } from "react";
import { fallbackTracks } from "@/data/site";
import { MiniRecord } from "@/components/art/Turntable";

type Track = { track: string; artist: string; nowPlaying?: boolean };

/**
 * The "now playing" chip above the turntable.
 *
 * If LASTFM_API_KEY / LASTFM_USER are set, this shows what's actually playing
 * (polled — no OAuth, no user gesture). If they aren't, it quietly cycles the
 * hardcoded list instead, which is indistinguishable to a visitor and means
 * the section is never empty.
 */
export function NowPlaying() {
  const [track, setTrack] = useState<Track>(fallbackTracks[0]);
  const [live, setLive] = useState(false);

  // Fallback rotation. Runs until (and unless) last.fm answers.
  useEffect(() => {
    if (live) return;
    const id = setInterval(() => {
      setTrack((current) => {
        const index = fallbackTracks.findIndex((t) => t.track === current.track);
        return fallbackTracks[(index + 1) % fallbackTracks.length];
      });
    }, 9000);
    return () => clearInterval(id);
  }, [live]);

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

  return (
    <div className="inline-flex max-w-full items-start gap-3">
      <MiniRecord className="mt-1 h-7 w-7 shrink-0 text-ink" />
      <div className="min-w-0">
        <span className="inline-block bg-ink px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper">
          {live && track.nowPlaying ? "now playing" : "on the platter"}
        </span>
        <p
          className="mt-1.5 truncate font-mono text-[0.95rem] leading-snug text-ink"
          aria-live="polite"
        >
          {track.track}
        </p>
        <p className="truncate font-mono text-caption text-ink-soft">
          {track.artist}
        </p>
      </div>
    </div>
  );
}
