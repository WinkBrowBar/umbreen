import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL: permanently redirect to /services/eyebrow-lamination
export const Route = createFileRoute("/service/eyebrow-lamination")({
  beforeLoad: () => { throw redirect({ to: "/services/eyebrow-lamination", statusCode: 301 }); },
});
