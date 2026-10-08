import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail, serviceHead } from "@/components/service/ServiceDetail";
import { threading } from "@/components/service/content";

export const Route = createFileRoute("/service/signature-brow-threading")({
  head: () => serviceHead(threading, "/service/signature-brow-threading"),
  component: () => <ServiceDetail c={threading} />,
});