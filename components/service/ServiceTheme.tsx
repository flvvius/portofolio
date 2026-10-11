"use client";

import { useState, type ReactNode } from "react";

export function ServiceTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("auto");
  return (
    <div className="service-site" data-theme={theme}>
      <div className="service-container">
        <div className="service-theme">
          <label htmlFor="service-theme">Flavius / Design foundation</label>
          <select id="service-theme" value={theme} onChange={(event) => { setTheme(event.target.value); document.documentElement.dataset.theme = event.target.value; }} aria-label="Color theme">
            <option value="auto">System theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        {children}
      </div>
    </div>
  );
}
