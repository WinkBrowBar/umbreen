/** Blog API: address + fetch client. Used by /blog pages, the services journal and the /admin CMS. */

/**
 * Global API address — change it here only.
 * Override per environment with VITE_BLOG_API_URL (browser) / BLOG_API_URL (server rendering).
 */
export const API_URL = "https://api.umbreen.com";

/**
 * Where the API lives.
 * - Production build: https://api.umbreen.com (browser and server rendering).
 * - `npm run dev`: browser uses the Vite proxy (/api → localhost:4000), server rendering calls localhost:4000.
 */
export function apiBase(): string {
  const prod = import.meta.env.PROD;
  if (typeof window !== "undefined") {
    const v = import.meta.env["VITE_BLOG_API_URL"] as string | undefined;
    return (v ?? (prod ? API_URL : "")).replace(/\/+$/, "");
  }
  const env = typeof process !== "undefined" ? process.env : {};
  return (env["BLOG_API_URL"] || (prod ? API_URL : "http://127.0.0.1:4000")).replace(/\/+$/, "");
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public details?: Record<string, string[]>) { super(message); }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = typeof FormData !== "undefined" && init.body instanceof FormData;
  const res = await fetch(`${apiBase()}${path}`, {
    credentials: "include",
    ...init,
    headers: { ...(init.body && !isForm ? { "content-type": "application/json" } : {}), ...(init.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error ?? `Request failed (${res.status})`, data.details);
  return data as T;
}
