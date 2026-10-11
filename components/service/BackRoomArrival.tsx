"use client";
import { useEffect } from "react";
export function BackRoomArrival() {
  useEffect(() => {
    if (new URLSearchParams(location.search).get("from") !== "back-room")
      return;
    const fragment = location.hash || "#interests";
    history.replaceState(null, "", `/about${fragment}`);
    const target = document.getElementById(fragment.slice(1));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView();
    }
  }, []);
  return null;
}
