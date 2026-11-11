import { useRef, useState } from "react";
import { checkImageUrl, probeImage, uploadImage } from "./upload";
import { useDialog } from "./Dialog";

export function ImageField({ label, url, alt, onChange, hint, withAlt = true }: {
  label: string; url: string; alt?: string; hint?: string; withAlt?: boolean;
  onChange: (v: { url: string; alt: string }) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const dialog = useDialog();
  const [linkOpen, setLinkOpen] = useState(false);
  const [link, setLink] = useState("");
  const [linkErr, setLinkErr] = useState("");
  const useLink = async () => {
    setLinkErr("");
    try {
      const u = checkImageUrl(link);
      setBusy(true);
      await probeImage(u);
      onChange({ url: u, alt: alt ?? "" }); setLink(""); setLinkOpen(false);
    } catch (e) { setLinkErr((e as Error).message); }
    setBusy(false);
  };
  const pick = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    try { onChange({ url: await uploadImage(f), alt: alt ?? "" }); } catch (e) { dialog.alert("Upload failed", (e as Error).message); }
    setBusy(false);
    if (ref.current) ref.current.value = "";
  };
  return <div className="adm-field adm-image">
    <span className="adm-label">{label}</span>
    {url ? <img src={url} alt="" /> : <div className="adm-image-empty">No image</div>}
    <div className="adm-image-actions">
      <button type="button" className="adm-btn" onClick={() => ref.current?.click()} disabled={busy}>{busy ? "Uploading…" : url ? "Replace" : "Upload"}</button>
      <button type="button" className="adm-btn adm-btn--ghost" onClick={() => { setLinkOpen((o) => !o); setLinkErr(""); }} disabled={busy}>From link</button>
      {url && <button type="button" className="adm-btn adm-btn--ghost" onClick={() => onChange({ url: "", alt: "" })}>Remove</button>}
    </div>
    {linkOpen && <div className="adm-image-link">
      <input type="url" value={link} placeholder="https://example.com/photo.jpg" autoFocus
        onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); useLink(); } }} />
      <button type="button" className="adm-btn" onClick={useLink} disabled={busy || !link.trim()}>{busy ? "Checking…" : "Use"}</button>
    </div>}
    {linkErr && <small className="adm-error">{linkErr}</small>}
    {withAlt && url && <label className="adm-field">Alt text<input value={alt ?? ""} maxLength={160} placeholder="Describe the image, e.g. Close-up of laminated brows" onChange={(e) => onChange({ url, alt: e.target.value })} /></label>}
    {hint && <small className="adm-hint">{hint}</small>}
    <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => pick(e.target.files?.[0])} />
  </div>;
}
