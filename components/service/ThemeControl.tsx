"use client";
import { useEffect, useRef } from "react";
export function ThemeControl() {
  const control = useRef<HTMLSelectElement>(null);
  useEffect(() => { if (control.current) control.current.value = document.documentElement.dataset.theme || "auto"; }, []);
  function change(theme: string) { document.documentElement.dataset.theme = theme; try { localStorage.setItem("service-theme", theme); } catch {} }
  return <div className="service-theme-control"><label htmlFor="site-theme">Appearance</label><select ref={control} id="site-theme" defaultValue="auto" onChange={event => change(event.target.value)}><option value="auto">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>;
}
