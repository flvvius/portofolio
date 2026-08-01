import { NextResponse } from "next/server";

/**
 * Last.fm recent tracks, polled. No OAuth, no token refresh, no client secret
 * in the browser — just an API key on the server.
 *
 * Set LASTFM_API_KEY and LASTFM_USER to turn this on. Without them the route
 * reports itself unconfigured and the chip falls back to a hardcoded rotation,
 * which is the intended behaviour, not a failure state.
 */

export const revalidate = 30;

type LastFmTrack = {
  name: string;
  artist: { "#text": string };
  "@attr"?: { nowplaying?: string };
};

export async function GET() {
  const key = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER;

  if (!key || !user) {
    return NextResponse.json({ configured: false }, { status: 200 });
  }

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", user);
  url.searchParams.set("api_key", key);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) {
      return NextResponse.json({ configured: false }, { status: 200 });
    }

    const data = await res.json();
    const recent: LastFmTrack | undefined = data?.recenttracks?.track?.[0];
    if (!recent) {
      return NextResponse.json({ configured: false }, { status: 200 });
    }

    return NextResponse.json({
      track: recent.name,
      artist: recent.artist["#text"],
      nowPlaying: recent["@attr"]?.nowplaying === "true",
    });
  } catch {
    return NextResponse.json({ configured: false }, { status: 200 });
  }
}
