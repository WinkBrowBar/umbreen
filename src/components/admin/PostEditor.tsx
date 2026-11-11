import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { api, ApiError } from "@/lib/blog";
import { RichEditor } from "./RichEditor";
import { ImageField } from "./ImageField";
import { SeoPanel } from "./SeoPanel";
import { slugify } from "./upload";
import { useDialog } from "./Dialog";
import { loadCategories, saveCategory, type AdminCategory } from "./categories";

export type PostForm = {
  title: string; slug: string; excerpt: string; content: string;
  coverImage: { url: string; alt: string }; category: string; tags: string; authorName: string;
  status: "draft" | "published"; publishedAt: string; // datetime-local value
  seo: { metaTitle: string; metaDescription: string; focusKeyword: string; canonicalUrl: string; ogImage: string; noindex: boolean };
};

const empty: PostForm = {
  title: "", slug: "", excerpt: "", content: "", coverImage: { url: "", alt: "" }, category: "", tags: "", authorName: "Umbreen Sheikh",
  status: "draft", publishedAt: "", seo: { metaTitle: "", metaDescription: "", focusKeyword: "", canonicalUrl: "", ogImage: "", noindex: false },
};

/** ISO <-> <input type="datetime-local"> (local time, no seconds) */
const toLocalInput = (iso?: string) => { if (!iso) return ""; const d = new Date(iso); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };
const fromLocalInput = (v: string) => (v ? new Date(v).toISOString() : null);

export function PostEditor({ id }: { id?: string }) {
  const navigate = useNavigate();
  const dialog = useDialog();
  const [form, setForm] = useState<PostForm>(empty);
  const [saved, setSaved] = useState<string>(JSON.stringify(empty));
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [loading, setLoading] = useState(!!id);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string; fields?: Record<string, string[]> | undefined } | null>(null);
  const [options, setOptions] = useState<{ tags: string[] }>({ tags: [] });
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  useEffect(() => {
    api<{ tags: string[] }>("/api/admin/tags").then(setOptions).catch(() => {});
    loadCategories().then(setCategories).catch(() => {});
  }, []);

  const newCategory = async () => {
    const r = await dialog.form({ title: "New category", confirmLabel: "Create category",
      fields: [{ name: "name", label: "Name", placeholder: "e.g. Brow Care", hint: "It appears on the Journal page once a published post uses it." }] });
    if (!r || !(r["name"] ?? "").trim()) return;
    try {
      const c = await saveCategory({ name: r["name"] ?? "" });
      setCategories((cs) => [...cs, { ...c, posts: 0, live: 0 }]);
      set({ category: c.name });
    } catch (e) { dialog.alert("Couldn’t create category", (e as Error).message); }
  };

  useEffect(() => {
    if (!id) return;
    api<{ post: any }>(`/api/admin/posts/${id}`).then(({ post: p }) => {
      const f: PostForm = {
        title: p.title, slug: p.slug, excerpt: p.excerpt ?? "", content: p.content ?? "",
        coverImage: { url: p.coverImage?.url ?? "", alt: p.coverImage?.alt ?? "" }, category: p.category ?? "",
        tags: (p.tags ?? []).join(", "), authorName: p.authorName ?? "Umbreen Sheikh", status: p.status,
        publishedAt: toLocalInput(p.publishedAt), seo: { ...empty.seo, ...(p.seo ?? {}) },
      };
      setForm(f); setSaved(JSON.stringify(f)); setLoading(false);
    }).catch((e) => { setMsg({ kind: "err", text: e.message }); setLoading(false); });
  }, [id]);

  const dirty = useMemo(() => JSON.stringify(form) !== saved, [form, saved]);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (patch: Partial<PostForm>) => setForm((f) => ({ ...f, ...patch }));
  const setTitle = (title: string) => set({ title, ...(slugTouched ? {} : { slug: slugify(title) }) });

  const save = async (status: PostForm["status"]) => {
    if (!form.title.trim()) { setMsg({ kind: "err", text: "Add a title first." }); return; }
    setBusy(true); setMsg(null);
    const body = {
      ...form, status,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      publishedAt: status === "published" ? fromLocalInput(form.publishedAt) : fromLocalInput(form.publishedAt) ?? null,
    };
    try {
      const r = id
        ? await api<{ post: any }>(`/api/admin/posts/${id}`, { method: "PUT", body: JSON.stringify(body) })
        : await api<{ post: any }>("/api/admin/posts", { method: "POST", body: JSON.stringify(body) });
      const next: PostForm = { ...form, status: r.post.status, slug: r.post.slug, excerpt: r.post.excerpt, publishedAt: toLocalInput(r.post.publishedAt) };
      setForm(next); setSaved(JSON.stringify(next)); setSlugTouched(true);
      const scheduled = r.post.status === "published" && new Date(r.post.publishedAt) > new Date();
      setMsg({ kind: "ok", text: r.post.status === "draft" ? "Draft saved." : scheduled ? "Scheduled — it will go live automatically." : "Published — the post is live." });
      if (!id) navigate({ to: "/admin/posts/$id", params: { id: r.post._id }, replace: true });
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof ApiError ? e.message : "Could not save", fields: e instanceof ApiError ? e.details : undefined });
    } finally { setBusy(false); }
  };

  const duplicate = async () => {
    if (!id) return;
    const ok = await dialog.confirm("Duplicate this post?", dirty
      ? "You have unsaved changes. The copy is made from the last saved version, so those changes won’t be included."
      : "A copy will be created as a draft and opened in the editor.", { confirmLabel: "Duplicate" });
    if (!ok) return;
    setBusy(true);
    try {
      const { post } = await api<{ post: { _id: string } }>(`/api/admin/posts/${id}/duplicate`, { method: "POST" });
      setSaved(JSON.stringify(form)); // don't trigger the unsaved-changes guard
      navigate({ to: "/admin/posts/$id", params: { id: post._id } });
      setMsg({ kind: "ok", text: "Copy created as a draft." });
    } catch (e) { setMsg({ kind: "err", text: e instanceof ApiError ? e.message : "Could not duplicate" }); }
    finally { setBusy(false); }
  };

  if (loading) return <p className="adm-muted">Loading…</p>;
  const isLive = form.status === "published";
  const fieldErr = (k: string) => msg?.fields?.[k]?.[0];

  return <div className="adm-editor-layout">
    <div className="adm-main">
      <label className="adm-field adm-title-field">
        <span className="sr-only">Title</span>
        <input value={form.title} maxLength={140} placeholder="Post title" onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="adm-field adm-slug-field">URL
        <div className="adm-slug-input"><span>umbreen.com/blog/</span>
          <input value={form.slug} maxLength={120} onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) || e.target.value.toLowerCase() }); }} /></div>
        {fieldErr("slug") && <small className="adm-error">{fieldErr("slug")}</small>}
        {isLive && id && <small className="adm-hint">Changing the URL of a live post is safe: the old address will redirect here.</small>}
      </label>
      <RichEditor value={form.content} onChange={(content) => set({ content })} />
      <label className="adm-field">Excerpt <span className="adm-count">{form.excerpt.length}/300</span>
        <textarea rows={3} maxLength={300} value={form.excerpt} placeholder="One or two sentences shown on the blog page and under the title. Left empty, it's taken from the article." onChange={(e) => set({ excerpt: e.target.value })} /></label>
    </div>

    <aside className="adm-side">
      <section className="adm-card">
        <div className="adm-card-head"><h2>Publish</h2><span className={`adm-pill adm-pill--${isLive ? "published" : "draft"}`}>{isLive ? "Live" : "Draft"}</span></div>
        <label className="adm-field">Publish date<input type="datetime-local" value={form.publishedAt} onChange={(e) => set({ publishedAt: e.target.value })} />
          <small className="adm-hint">Leave empty to publish now. A future date schedules the post.</small></label>
        {msg && <p className={msg.kind === "ok" ? "adm-ok" : "adm-error"} role="status">{msg.text}</p>}
        <div className="adm-publish-actions">
          <button type="button" className="adm-btn" disabled={busy} onClick={() => save("draft")}>{isLive ? "Unpublish" : "Save draft"}</button>
          <button type="button" className="adm-btn adm-btn--primary" disabled={busy} onClick={() => save("published")}>{busy ? "Saving…" : isLive ? "Update" : form.publishedAt && new Date(form.publishedAt) > new Date() ? "Schedule" : "Publish"}</button>
        </div>
        {dirty && <small className="adm-hint">Unsaved changes</small>}
        {isLive && id && <a className="adm-view" href={`/blog/${form.slug}`} target="_blank" rel="noreferrer">View post ↗</a>}
        {id && <button type="button" className="adm-view adm-linkbtn" disabled={busy} onClick={duplicate}>Duplicate post</button>}
      </section>

      <section className="adm-card">
        <h2>Details</h2>
        <ImageField label="Cover image" url={form.coverImage.url} alt={form.coverImage.alt} hint="Shown at the top of the post and when shared. Landscape, at least 1200px wide." onChange={(coverImage) => set({ coverImage })} />
        <div className="adm-field">
          <label htmlFor="adm-category">Category</label>
          <div className="adm-cat-pick">
            <select id="adm-category" value={form.category} onChange={(e) => set({ category: e.target.value })}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
              {form.category && !categories.some((c) => c.name === form.category) && <option value={form.category}>{form.category}</option>}
            </select>
            <button type="button" className="adm-btn" onClick={newCategory}>+ New</button>
          </div>
          <small className="adm-hint">Filters the Journal page. <a href="/admin/categories" target="_blank" rel="noreferrer">Manage categories ↗</a></small>
        </div>
        <label className="adm-field">Tags<input value={form.tags} placeholder="threading, lamination, aftercare" onChange={(e) => set({ tags: e.target.value })} />
          <small className="adm-hint">Comma separated.{options.tags.length > 0 && <> Used before: {options.tags.slice(0, 8).join(", ")}</>}</small></label>
        <label className="adm-field">Author<input value={form.authorName} maxLength={80} onChange={(e) => set({ authorName: e.target.value })} /></label>
      </section>

      <SeoPanel form={form} set={(seo) => set({ seo: { ...form.seo, ...seo } })} />

      <section className="adm-card">
        <h2>Social share image</h2>
        <ImageField label="" url={form.seo.ogImage} withAlt={false} hint="Optional. Defaults to the cover image. 1200×630 works best." onChange={({ url }) => set({ seo: { ...form.seo, ogImage: url } })} />
      </section>
      <Link to="/admin" className="adm-back">← All posts</Link>
    </aside>
  </div>;
}
