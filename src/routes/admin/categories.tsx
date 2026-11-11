import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/blog";
import { AdminShell, adminHead } from "@/components/admin/AdminShell";
import { useDialog } from "@/components/admin/Dialog";
import { loadCategories, saveCategory, type AdminCategory } from "@/components/admin/categories";

export const Route = createFileRoute("/admin/categories")({
  ssr: false,
  head: adminHead("Categories"),
  component: () => <AdminShell title="Categories" actions={<NewButton />}>{() => <CategoryList />}</AdminShell>,
});

// The page header button and the list talk through a window event, so the button can live in the shell header.
const REFRESH = "adm:categories-changed";

function useCategoryForm() {
  const dialog = useDialog();
  return async (c?: AdminCategory) => {
    const r = await dialog.form({
      title: c ? "Edit category" : "New category",
      confirmLabel: c ? "Save" : "Create category",
      message: c && c.posts > 0 ? `Renaming updates all ${c.posts} post${c.posts === 1 ? "" : "s"} in this category.` : undefined,
      fields: [
        { name: "name", label: "Name", value: c?.name ?? "", placeholder: "e.g. Brow Care" },
        { name: "slug", label: "URL", value: c?.slug ?? "", placeholder: "brow-care", hint: "Leave empty to create it from the name. Shown as /blog?category=…" },
        { name: "description", label: "Description (optional)", value: c?.description ?? "", hint: "Shown on the category page and used as its Google description." },
      ],
    });
    if (!r) return false;
    try {
      await saveCategory({ name: r["name"] ?? "", slug: r["slug"] ?? "", description: r["description"] ?? "" }, c?._id);
      window.dispatchEvent(new Event(REFRESH));
      return true;
    } catch (e) { await dialog.alert("Couldn’t save category", (e as Error).message); return false; }
  };
}

function NewButton() {
  const open = useCategoryForm();
  return <button type="button" className="adm-btn adm-btn--primary" onClick={() => open()}>+ New category</button>;
}

function CategoryList() {
  const [rows, setRows] = useState<AdminCategory[] | null>(null);
  const [error, setError] = useState("");
  const dialog = useDialog();
  const edit = useCategoryForm();

  const load = () => loadCategories().then(setRows).catch((e) => setError(e.message));
  useEffect(() => {
    load();
    window.addEventListener(REFRESH, load);
    return () => window.removeEventListener(REFRESH, load);
  }, []);

  const move = async (i: number, dir: -1 | 1) => {
    if (!rows) return;
    const next = [...rows];
    const [item] = next.splice(i, 1);
    next.splice(i + dir, 0, item!);
    setRows(next);
    await api("/api/admin/categories/reorder", { method: "POST", body: JSON.stringify({ ids: next.map((r) => r._id) }) }).catch((e) => { dialog.alert("Couldn’t reorder", (e as Error).message); load(); });
  };

  const remove = async (c: AdminCategory) => {
    const ok = await dialog.confirm(`Delete “${c.name}”?`, c.posts > 0
      ? <>Its <strong>{c.posts} post{c.posts === 1 ? "" : "s"}</strong> won’t be deleted. They’ll just have no category.</>
      : "This category has no posts.", { confirmLabel: "Delete", danger: true });
    if (!ok) return;
    await api(`/api/admin/categories/${c._id}`, { method: "DELETE" }).catch((e) => dialog.alert("Couldn’t delete", (e as Error).message));
    load();
  };

  if (error) return <p className="adm-error">{error}</p>;
  if (!rows) return <p className="adm-muted">Loading…</p>;
  if (rows.length === 0) return <div className="adm-empty"><p>No categories yet.</p><NewButton /></div>;

  return <>
    <p className="adm-muted adm-cat-note">The order here is the order on the Journal page. Categories with no published posts are hidden on the website.</p>
    <table className="adm-table adm-cat-table">
      <thead><tr><th className="adm-cat-order">Order</th><th>Name</th><th>Posts</th><th>On website</th><th /></tr></thead>
      <tbody>{rows.map((c, i) => <tr key={c._id}>
        <td className="adm-cat-order">
          <button type="button" aria-label={`Move ${c.name} up`} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
          <button type="button" aria-label={`Move ${c.name} down`} disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</button>
        </td>
        <td><strong className="adm-title-link">{c.name}</strong><span className="adm-slug">/blog?category={c.slug}</span>{c.description && <span className="adm-sub">{c.description}</span>}</td>
        <td>{c.posts}</td>
        <td>{c.live > 0 ? <span className="adm-pill adm-pill--published">Visible · {c.live}</span> : <span className="adm-pill adm-pill--draft">Hidden (no published posts)</span>}</td>
        <td className="adm-row-actions">
          {c.live > 0 && <a href={`/blog?category=${c.slug}`} target="_blank" rel="noreferrer">View</a>}
          <button type="button" onClick={() => edit(c)}>Edit</button>
          <button type="button" className="adm-danger" onClick={() => remove(c)}>Delete</button>
        </td>
      </tr>)}</tbody>
    </table>
  </>;
}
