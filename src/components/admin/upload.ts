import { api } from "@/lib/blog";

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const r = await api<{ url: string }>("/api/admin/uploads", { method: "POST", body });
  return r.url;
}

/** Accepts https://… image links (and /paths on this site). Returns the cleaned URL or throws. */
export function checkImageUrl(raw: string): string {
  const v = raw.trim();
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  let u: URL;
  try { u = new URL(v); } catch { throw new Error("That doesn't look like a link. Paste a full https:// image URL."); }
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Only http(s) image links are allowed.");
  return u.toString();
}

/** Loads the link in the browser to make sure it really is an image. */
export const probeImage = (src: string) => new Promise<void>((ok, fail) => {
  const img = new Image();
  const t = setTimeout(() => fail(new Error("The image took too long to load.")), 15000);
  img.onload = () => { clearTimeout(t); ok(); };
  img.onerror = () => { clearTimeout(t); fail(new Error("Couldn't load an image from that link. Use a direct image URL (ending in .jpg, .png, .webp…).")); };
  img.src = src;
});

export const slugify = (s: string) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/®|™|©/g, "").replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100).replace(/-+$/g, "");
