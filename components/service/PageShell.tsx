import type { ReactNode } from "react";
import { ServiceNav } from "./ServiceNav";
import { SiteFooter } from "./SiteFooter";
export function PageShell({ children }: { children: ReactNode }) {
  return <><ServiceNav /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /></>;
}
