import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail, serviceHead } from "@/components/service/ServiceDetail";
import { lamination } from "@/components/service/content";

export const Route = createFileRoute("/service/eyebrow-lamination")({
  head: () => serviceHead(lamination),
  component: () => <ServiceDetail c={lamination} />,
});