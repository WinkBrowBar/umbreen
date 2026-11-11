import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, adminHead } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/posts/new")({
  ssr: false,
  head: adminHead("New post"),
  component: () => <AdminShell title="New post">{() => <PostEditor />}</AdminShell>,
});
