import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
const limit = 16000;
function reply(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json({ message, errors }, { status, headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return reply("This request must come from the intake page.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("Please submit the form on this site.", 415);
  if (Number(request.headers.get("content-length") || 0) > limit) return reply("Your details are too long.", 413);
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  for (const [id, entry] of attempts) if (entry.expires < now) attempts.delete(id);
  if (attempts.size > 5000) return reply("Please try again later.", 429);
  const entry = attempts.get(key) || { count: 0, expires: now + 600000 };
  entry.count++; attempts.set(key, entry);
  if (entry.count > 5) return reply("Too many attempts. Please try again in 10 minutes or email me.", 429);
  let data: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("No details received.", 400);
    let text = ""; let bytes = 0; const decoder = new TextDecoder();
    for (;;) { const result = await reader.read(); if (result.done) break; bytes += result.value.length; if (bytes > limit) { await reader.cancel(); return reply("Your details are too long.", 413); } text += decoder.decode(result.value, { stream: true }); }
    text += decoder.decode();
    data = JSON.parse(text);
    if (!data || Array.isArray(data) || typeof data !== "object") throw new Error("Invalid body");
  } catch { return reply("We couldn't read your details. Please try again.", 400); }
  if (data.website) return reply("Please submit the form without filling the hidden field.", 400);
  if (data.kind !== "intake" && data.kind !== "waitlist") return reply("Choose an intake or waitlist request.", 400);
  const required = data.kind === "intake" ? ["name", "email", "company", "appUrl", "flow", "goal", "stack", "contact"] : ["email"];
  const fields = data.kind === "intake" ? [...required, "repoUrl", "loomUrl"] : required;
  const errors: Record<string, string> = {}; const clean: Record<string, string> = {};
  for (const field of fields) {
    const raw = data[field]; const value = typeof raw === "string" ? raw.trim() : "";
    clean[field] = value;
    if (required.includes(field) && !value) errors[field] = "Please fill in this field.";
    const max = field === "email" ? 254 : ["flow", "goal"].includes(field) ? 2000 : 500;
    if (value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) errors[field] = "Please shorten or check this field.";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[field] = "Enter a valid email address.";
    if (field.endsWith("Url") && value) { try { const url = new URL(value); if (!["https:", "http:"].includes(url.protocol)) throw new Error(); } catch { errors[field] = "Enter a full HTTP or HTTPS URL."; } }
  }
  if (Object.keys(errors).length) return reply("Please check the highlighted fields.", 422, errors);
  const { RESEND_API_KEY, FORM_FROM_EMAIL, FORM_TO_EMAIL, RESEND_API_URL } = process.env;
  if (!RESEND_API_KEY || !FORM_FROM_EMAIL || !FORM_TO_EMAIL) return reply("Email delivery is awaiting setup. Please send your details by email.", 503);
  try {
    const endpoint = RESEND_API_URL || "https://api.resend.com/emails";
    const url = new URL(endpoint);
    if (url.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && url.hostname === "127.0.0.1")) return reply("Email delivery is unavailable.", 503);
    const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: FORM_FROM_EMAIL, to: [FORM_TO_EMAIL], reply_to: clean.email, subject: data.kind === "intake" ? "Taste audit intake" : "Design partner waitlist", text: fields.map(field => `${field}: ${clean[field]}`).join("\n\n") }), signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    if (!response.ok || !result.id) return reply("We couldn't send your details. Please try again or email me.", 502);
    return reply("Your details have been sent.", 200);
  } catch { return reply("We couldn't send your details. Please try again or email me.", 502); }
}
