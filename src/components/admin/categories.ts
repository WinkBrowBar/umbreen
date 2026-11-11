import { api } from "@/lib/blog";

export type AdminCategory = { _id: string; name: string; slug: string; description: string; order: number; posts: number; live: number };

export const loadCategories = () => api<{ categories: AdminCategory[] }>("/api/admin/categories").then((r) => r.categories);

export const saveCategory = (body: { name: string; slug?: string; description?: string }, id?: string) =>
  api<{ category: AdminCategory }>(id ? `/api/admin/categories/${id}` : "/api/admin/categories", { method: id ? "PUT" : "POST", body: JSON.stringify(body) })
    .then((r) => r.category);
