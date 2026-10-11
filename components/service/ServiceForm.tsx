"use client";
import { useState, useRef, type FormEvent } from "react";
import { track } from "./Analytics";
type Field = { name: string; label: string; type?: string; optional?: boolean; multiline?: boolean; autoComplete?: string };
const intakeFields: Field[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "appUrl", label: "App URL", type: "url" },
  { name: "repoUrl", label: "Repo URL", type: "url", optional: true },
  { name: "flow", label: "The flow to focus on", multiline: true },
  { name: "goal", label: "What would you like to improve?", multiline: true },
  { name: "stack", label: "Stack" },
  { name: "loomUrl", label: "Loom link", type: "url", optional: true },
  { name: "contact", label: "Preferred contact", autoComplete: "off" },
];
export function ServiceForm({ kind, configured, email }: { kind: "intake" | "waitlist"; configured: boolean; email: string }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fields = kind === "intake" ? intakeFields : [{ name: "email", label: "Email", type: "email", autoComplete: "email" }];
  const feedback = useRef<HTMLParagraphElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true); setErrors({}); setStatus("Sending your details...");
    try {
      const response = await fetch("/api/forms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, kind }) });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {}); setStatus(result.message || "We couldn't send your details. Please try again or email me.");
      } else { setStatus(kind === "intake" ? "Your intake has been sent. I'll confirm the agreed flow and receipt of payment by email." : "You're on the waitlist. I'll email you when a place opens."); track(kind === "intake" ? "intake_submit" : "waitlist_submit"); form.reset(); }
    } catch { setStatus("We couldn't send your details. Please try again or email me."); }
    finally { setBusy(false); feedback.current?.focus(); }
  }
  return <form className="service-form" onSubmit={submit} aria-label={kind === "intake" ? "Audit intake" : "Design partner waitlist"}>
    {fields.map(field => <div className="service-field" key={field.name}><label htmlFor={`${kind}-${field.name}`}>{field.label}{field.optional ? " (optional)" : ""}</label>{field.multiline ? <textarea id={`${kind}-${field.name}`} name={field.name} rows={3} required={!field.optional} maxLength={2000} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${kind}-${field.name}-error` : undefined} /> : <input id={`${kind}-${field.name}`} name={field.name} type={field.type || "text"} autoComplete={field.autoComplete} required={!field.optional} maxLength={field.name === "email" ? 254 : 500} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${kind}-${field.name}-error` : undefined} />}{errors[field.name] && <small className="service-error" id={`${kind}-${field.name}-error`}>{errors[field.name]}</small>}</div>)}
    <div className="service-trap" aria-hidden="true"><label htmlFor={`${kind}-website`}>Leave this empty</label><input id={`${kind}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
    <button className="service-button" type="submit" disabled={busy || !configured}>{busy ? "Sending..." : kind === "intake" ? "Send audit intake" : "Join the waitlist"}</button>
    <p ref={feedback} tabIndex={-1} role="status" className="service-caption" style={{ marginTop: 12 }}>{status || (!configured ? "The form is awaiting email setup." : "Your details are used only to respond to this request.")}</p>
    {!configured && <a className="service-link" href={`mailto:${email}?subject=${kind === "intake" ? "Taste%20audit%20intake" : "Design%20partner%20waitlist"}`}>Send your details by email</a>}
    <p className="service-caption" style={{ marginTop: 12 }}>Please don't send credentials or sensitive customer data. <a className="service-link" href="/privacy">How I handle your details</a>.</p>
  </form>;
}
