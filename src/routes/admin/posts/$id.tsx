import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, adminHead } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/posts/$id")({
  ssr: false,
  head: adminHead("Edit post"),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  return <AdminShell title="Edit post">{() => <PostEditor key={id} id={id} />}</AdminShell>;
}
