import { createFileRoute, redirect } from "@tanstack/react-router";

// /service has no page of its own: send visitors to the Services page instead of a 404
export const Route = createFileRoute("/service/")({
  beforeLoad: () => { throw redirect({ to: "/services", statusCode: 301 }); },
});
