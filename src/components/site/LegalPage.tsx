import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PageHead } from "./PageHead";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({ kicker, title, intro, effective, sections }: {
  kicker: string; title: ReactNode; intro: ReactNode; effective: string; sections: LegalSection[];
}) {
  return <main className="v2 v2-legal">
    <Nav />
    <PageHead kicker={kicker} title={title}>{intro}</PageHead>
    <div className="doc">
      <aside className="doc-meta">
        <p>EFFECTIVE · {effective.toUpperCase()}</p>
        <ol>{sections.map((s, i) => <li key={s.id}><a href={`#${s.id}`}><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</a></li>)}</ol>
      </aside>
      <div className="doc-body">
        {sections.map((s, i) => <div className="doc-section" id={s.id} key={s.id}>
          <h2><span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
          {s.body}
        </div>)}
      </div>
    </div>
    <Footer />
  </main>;
}