import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt = "Flavius. Your app works. Let's make it feel finished. Design and code for React apps.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const font = await readFile(path.join(process.cwd(), "app/fonts/Inter-OG.ttf"));
  return new ImageResponse(<div style={{ background: "#fcfcfa", color: "#0e0a07", width: "100%", height: "100%", padding: 72, display: "flex", flexDirection: "column", fontFamily: "Inter" }}><div style={{ fontSize: 26, color: "#68625e", display: "flex", justifyContent: "space-between" }}><span>Flavius</span><span>Design engineer · Bucharest</span></div><div style={{ fontSize: 70, lineHeight: 1.08, letterSpacing: "-3px", fontWeight: 600, display: "flex", flexDirection: "column", marginTop: 80 }}><span>Your app works.</span><span>Let's make it feel finished.</span></div><div style={{ width: 360, height: 3, background: "#d96b2b", marginTop: 22 }} /><div style={{ display: "flex", marginTop: "auto", fontSize: 25, color: "#68625e" }}>React codebase redesigns. Reviewable pull requests.</div></div>, { ...size, fonts: [{ name: "Inter", data: font, style: "normal", weight: 600 }] });
}
