import type { ReactNode } from "react";

export function PageHead({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return <header className="page-head">
    <span className="pillars-kicker">{kicker}</span>
    <h1 className="display">{title}</h1>
    {children && <p className="serif">{children}</p>}
  </header>;
}
