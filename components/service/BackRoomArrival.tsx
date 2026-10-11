"use client";
import { useEffect } from "react";
export function BackRoomArrival() {
  useEffect(() => {
    function redirect() {
      const hash = location.hash.slice(1);
      if (hash === "projects" || hash.startsWith("note-")) {
        location.replace(
          `/projects${hash.startsWith("note-") ? `#${hash}` : ""}`,
        );
        return;
      }
      if (hash === "experience") {
        location.replace("/experience");
        return;
      }
      const retired = [
        "interests",
        "books",
        "film",
        "art",
        "places",
        "aesthetics",
      ];
      if (
        new URLSearchParams(location.search).get("from") === "back-room" ||
        retired.includes(hash)
      ) {
        history.replaceState(null, "", "/about");
        document.getElementById("main")?.focus({ preventScroll: true });
      }
    }
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, []);
  return null;
}
