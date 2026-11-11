import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/blog";
import { DialogProvider } from "./Dialog";

export type AdminUser = { id: string; email: string; name: string; role: string };

/** Wraps every admin screen: checks the session, shows the top bar. */
export function AdminShell({ children, title, actions }: { children: (user: AdminUser) => ReactNode; title: string; actions?: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    api<{ user: AdminUser }>("/api/auth/me")
      .then((r) => setUser(r.user))
      .catch(() => navigate({ to: "/admin/login", replace: true }));
  }, [navigate]);

  const logout = async () => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    navigate({ to: "/admin/login", replace: true });
  };

  if (!user) return <div className="adm adm-loading">Loading…</div>;
  return <DialogProvider><div className="adm">
    <header className="adm-bar">
      <Link to="/admin" className="adm-brand">Umbreen <span>Journal CMS</span></Link>
      <div className="adm-bar-links">
        <Link to="/admin">Posts</Link>
        <Link to="/admin/posts/new">New post</Link>
        <Link to="/admin/categories">Categories</Link>
        <a href="/blog" target="_blank" rel="noreferrer">View blog ↗</a>
        <button type="button" onClick={logout}>Sign out</button>
      </div>
    </header>
    <div className="adm-page">
      <div className="adm-page-head"><h1>{title}</h1>{actions}</div>
      {children(user)}
    </div>
  </div></DialogProvider>;
}

export const adminHead = (title: string) => () => ({
  meta: [{ title: `${title} | Umbreen CMS` }, { name: "robots", content: "noindex, nofollow" }],
});
