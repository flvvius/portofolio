"use client";

import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * For whoever opens devtools. The cuckoo's fifth and final appearance.
 */
export function ConsoleNote() {
  useEffect(() => {
    const bird = String.raw`
        __
      >(o )___
       ( ._> /
        \`---'   flavius cojocaru
    `;

    console.log(
      `%c${bird}`,
      "color:#D96B2B;font-family:ui-monospace,monospace;font-size:12px;line-height:1.3"
    );
    console.log(
      `%chiring, or want to argue about prog rock? ${site.email}`,
      "color:#5C4F43;font-family:ui-monospace,monospace;font-size:12px"
    );
  }, []);

  return null;
}
