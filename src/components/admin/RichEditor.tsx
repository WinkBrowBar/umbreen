import { useEffect, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import { checkImageUrl, probeImage, uploadImage } from "./upload";
import { useDialog } from "./Dialog";

/** Article body editor. Headings start at H2 because the post title is the page's H1. */
export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({ placeholder: "Start writing… Use H2 for sections and H3 for sub-points." }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "adm-prose" } },
  });

  // Load content that arrives after the editor was created (editing an existing post).
  const loaded = useRef(false);
  useEffect(() => {
    if (editor && !loaded.current && value) { editor.commands.setContent(value, { emitUpdate: false }); loaded.current = true; }
  }, [editor, value]);

  return <div className="adm-editor">
    {editor && <Toolbar editor={editor} />}
    <EditorContent editor={editor} />
  </div>;
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const dialog = useDialog();
  const ALT_HINT = "Describes the image for Google and screen readers.";
  const btn = (label: string, active: boolean, run: () => void, title = label) =>
    <button type="button" title={title} aria-label={title} aria-pressed={active} className={active ? "is-active" : ""} onMouseDown={(e) => e.preventDefault()} onClick={run}>{label}</button>;

  const setLink = async () => {
    const prev = editor.getAttributes("link")["href"] as string | undefined;
    const r = await dialog.form({ title: prev ? "Edit link" : "Add link", confirmLabel: "Save link",
      fields: [{ name: "url", label: "Link URL", value: prev ?? "https://", hint: "Use /services/… for pages on this site. Leave empty to remove the link." }] });
    if (!r) { editor.commands.focus(); return; }
    const url = r["url"] ?? "";
    if (url.trim() === "" || url.trim() === "https://") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const onFile = async (f?: File) => {
    if (!f) return;
    if (fileRef.current) fileRef.current.value = "";
    const r = await dialog.form({ title: "Image description", confirmLabel: "Upload image",
      fields: [{ name: "alt", label: "Alt text", placeholder: "e.g. Close-up of laminated brows", hint: ALT_HINT }] });
    if (!r) return;
    const alt = r["alt"] ?? "";
    try {
      const src = await uploadImage(f);
      editor.chain().focus().setImage({ src, alt }).run();
    } catch (e) { dialog.alert("Upload failed", (e as Error).message); }
  };

  const onLink = async () => {
    const r = await dialog.form({ title: "Insert image from link", confirmLabel: "Insert image",
      fields: [
        { name: "url", label: "Image URL", type: "url", placeholder: "https://example.com/photo.jpg", hint: "A direct link to a .jpg, .png or .webp file." },
        { name: "alt", label: "Alt text", placeholder: "e.g. Close-up of laminated brows", hint: ALT_HINT },
      ] });
    if (!r || !(r["url"] ?? "").trim()) return;
    try {
      const src = checkImageUrl(r["url"] ?? "");
      await probeImage(src);
      editor.chain().focus().setImage({ src, alt: r["alt"] ?? "" }).run();
    } catch (e) { dialog.alert("Couldn’t add image", (e as Error).message); }
  };

  return <div className="adm-editor-bar" role="toolbar" aria-label="Formatting">
    {btn("H2", editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "Section heading (H2)")}
    {btn("H3", editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "Sub-heading (H3)")}
    {btn("¶", editor.isActive("paragraph"), () => editor.chain().focus().setParagraph().run(), "Paragraph")}
    <span className="adm-sep" />
    {btn("B", editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), "Bold")}
    {btn("I", editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), "Italic")}
    {btn("U", editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), "Underline")}
    {btn("Link", editor.isActive("link"), setLink)}
    <span className="adm-sep" />
    {btn("• List", editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), "Bullet list")}
    {btn("1. List", editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), "Numbered list")}
    {btn("“ Quote", editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), "Quote")}
    {btn("—", false, () => editor.chain().focus().setHorizontalRule().run(), "Divider")}
    {btn("Image", false, () => fileRef.current?.click(), "Upload image")}
    {btn("Image link", false, onLink, "Insert image from a link")}
    <span className="adm-sep" />
    {btn("↶", false, () => editor.chain().focus().undo().run(), "Undo")}
    {btn("↷", false, () => editor.chain().focus().redo().run(), "Redo")}
    <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" hidden onChange={(e) => onFile(e.target.files?.[0])} />
  </div>;
}
