import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { api, formatDate } from "@/lib/blog";
import { AdminShell, adminHead } from "@/components/admin/AdminShell";
import { useDialog } from "@/components/admin/Dialog";

type Row = { _id: string; title: string; slug: string; status: "draft" | "published"; publishedAt?: string; updatedAt: string; category: string; coverImage?: { url: string } };
type Filter = "all" | "published" | "scheduled" | "draft";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: adminHead("Posts"),
  component: () => <AdminShell title="Posts" actions={<Link to="/admin/posts/new" className="adm-btn adm-btn--primary">+ New post</Link>}>{() => <PostList />}</AdminShell>,
});

const statusOf = (r: Row) => r.status === "draft" ? "Draft" : r.publishedAt && new Date(r.publishedAt) > new Date() ? "Scheduled" : "Published";

function PostList() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Row[]; pages: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const navigate = useNavigate();
  const dialog = useDialog();

  const load = () => {
    const qs = new URLSearchParams({ status: filter, page: String(page), ...(q ? { q } : {}) });
    api<{ items: Row[]; pages: number; total: number }>(`/api/admin/posts?${qs}`).then(setData).catch((e) => setError(e.message));
  };
  useEffect(load, [filter, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const remove = async (r: Row) => {
    if (!await dialog.confirm("Delete this post?", <><strong>{r.title}</strong> will be permanently deleted. This can’t be undone.</>, { confirmLabel: "Delete", danger: true })) return;
    await api(`/api/admin/posts/${r._id}`, { method: "DELETE" }).catch((e) => dialog.alert("Couldn’t delete", (e as Error).message));
    load();
  };

  const duplicate = async (r: Row) => {
    if (!await dialog.confirm("Duplicate this post?", <>A copy of <strong>{r.title}</strong> will be created as a draft and opened in the editor.</>, { confirmLabel: "Duplicate" })) return;
    setBusy(r._id);
    try {
      const { post } = await api<{ post: { _id: string } }>(`/api/admin/posts/${r._id}/duplicate`, { method: "POST" });
      navigate({ to: "/admin/posts/$id", params: { id: post._id } });
    } catch (e) { setBusy(""); dialog.alert("Couldn’t duplicate", (e as Error).message); }
  };

  return <>
    <div className="adm-toolbar">
      <div className="adm-tabs" role="tablist">
        {(["all", "published", "scheduled", "draft"] as Filter[]).map((f) => <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "is-active" : ""} onClick={() => { setFilter(f); setPage(1); }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>)}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setPage(1); load(); }} className="adm-search">
        <input type="search" placeholder="Search titles…" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>
    </div>
    {error && <p className="adm-error">{error}</p>}
    {!data ? <p className="adm-muted">Loading…</p> : data.items.length === 0 ? <div className="adm-empty"><p>No posts yet.</p><Link to="/admin/posts/new" className="adm-btn adm-btn--primary">Write your first post</Link></div> :
      <table className="adm-table">
        <thead><tr><th>Title</th><th>Status</th><th>Category</th><th>Updated</th><th /></tr></thead>
        <tbody>{data.items.map((r) => <tr key={r._id}>
          <td><Link to="/admin/posts/$id" params={{ id: r._id }} className="adm-title-link">{r.title}</Link><span className="adm-slug">/blog/{r.slug}</span></td>
          <td><span className={`adm-pill adm-pill--${statusOf(r).toLowerCase()}`}>{statusOf(r)}</span>{r.publishedAt && r.status === "published" && <span className="adm-sub">{formatDate(r.publishedAt)}</span>}</td>
          <td>{r.category || <span className="adm-muted">—</span>}</td>
          <td>{formatDate(r.updatedAt)}</td>
          <td className="adm-row-actions">
            {statusOf(r) === "Published" && <a href={`/blog/${r.slug}`} target="_blank" rel="noreferrer">View</a>}
            <Link to="/admin/posts/$id" params={{ id: r._id }}>Edit</Link>
            <button type="button" onClick={() => duplicate(r)} disabled={busy === r._id}>{busy === r._id ? "Copying…" : "Duplicate"}</button>
            <button type="button" onClick={() => remove(r)} className="adm-danger">Delete</button>
          </td>
        </tr>)}</tbody>
      </table>}
    {data && data.pages > 1 && <div className="adm-pager">
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button><span>Page {page} of {data.pages}</span><button disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next →</button>
    </div>}
  </>;
}
