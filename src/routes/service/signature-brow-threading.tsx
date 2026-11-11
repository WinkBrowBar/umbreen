import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL: permanently redirect to /services/signature-brow-threading
export const Route = createFileRoute("/service/signature-brow-threading")({
  beforeLoad: () => { throw redirect({ to: "/services/signature-brow-threading", statusCode: 301 }); },
});
