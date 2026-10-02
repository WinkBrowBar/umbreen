import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({ meta: [
    { title: "Terms of Service — Umbreen Sheikh" },
    { name: "description", content: "Terms governing use of umbreen.com and services provided by Azuna Global LLC d/b/a Umbreen." },
  ] }),
  component: Terms,
});

const sections: LegalSection[] = [
  { id: "services", title: "Services", body: <>
    <p>Azuna Global LLC d/b/a Umbreen provides permanent makeup (PMU) and aesthetic services. All services are subject to consultation approval and availability.</p>
    <p>We reserve the right to refuse service where medically or professionally appropriate.</p>
  </> },
  { id: "appointments", title: "Appointments & Payments", body: <>
    <ul>
      <li>Full payment or a deposit may be required to secure appointments.</li>
      <li>Follow-up appointments are subject to our service terms.</li>
      <li>Cancellation and rescheduling policies apply as stated at the time of booking.</li>
    </ul>
    <p>No refunds are issued for completed services.</p>
  </> },
  { id: "client", title: "Client Responsibility", body: <>
    <p>Clients must:</p>
    <ul>
      <li>Provide an accurate medical history</li>
      <li>Follow pre-care and post-care instructions</li>
      <li>Disclose any contraindications</li>
    </ul>
    <p>We are not responsible for outcomes where instructions are not followed.</p>
  </> },
  { id: "ip", title: "Intellectual Property", body: <p>All content on this Website, including logos, branding, and materials, is owned by Azuna Global LLC d/b/a Umbreen and may not be copied or reproduced without permission.</p> },
  { id: "liability", title: "Limitation of Liability", body: <>
    <p>To the fullest extent permitted by law, Azuna Global LLC d/b/a Umbreen is not liable for:</p>
    <ul>
      <li>Indirect or incidental damages</li>
      <li>Service dissatisfaction beyond the corrective remedies offered</li>
      <li>Technical website interruptions</li>
    </ul>
  </> },
  { id: "sms", title: "SMS Terms", body: <>
    <p>By opting in to SMS communications:</p>
    <ul>
      <li>You agree to receive service-related text messages.</li>
      <li>Message frequency varies.</li>
      <li>Message and data rates may apply.</li>
      <li>Reply STOP to opt out. Reply HELP for assistance.</li>
    </ul>
    <p>You can cancel the SMS service at any time. Just text "STOP" to 646.846.5041. After you send "STOP", we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.</p>
    <p>If you are experiencing issues with the messaging program, you can reply with the keyword HELP for more assistance, or get help directly at <a href="mailto:hello@umbreen.com">hello@umbreen.com</a>.</p>
    <p>Carriers are not liable for delayed or undelivered messages. As always, message and data rates may apply for any messages sent to you from us and to us from you. You will receive limited messages. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.</p>
    <p>If you have any questions regarding privacy, please read our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
    <p>Consent is not a condition of purchase.</p>
  </> },
  { id: "modifications", title: "Modifications", body: <p>We may update these Terms at any time. Continued use of the Website constitutes acceptance of the updated Terms.</p> },
  { id: "law", title: "Governing Law", body: <p>These Terms are governed by the laws of the State of New York.</p> },
  { id: "carrier", title: "Carrier Liability Disclaimer", body: <p>Carriers are not liable for delayed or undelivered messages. Message delivery is subject to effective transmission by your mobile carrier and is not guaranteed by Azuna Global LLC d/b/a Umbreen.</p> },
  { id: "age", title: "Age Requirement", body: <p>Our services are intended for individuals 18 years of age or older. By using this Website, booking a consultation, or opting in to SMS communications, you represent that you are at least 18 years old.</p> },
  { id: "contact", title: "Contact", body: <>
    <p>Azuna Global LLC d/b/a Umbreen<br />418 Broadway, STE N<br />Albany, NY 12207, USA</p>
    <p>Phone: <a href="tel:+16468465041">(646) 846-5041</a><br />Email: <a href="mailto:hello@umbreen.com">hello@umbreen.com</a></p>
    <p>Concierge: Monday–Sunday, 2:00 PM – 7:00 PM EST. Messages received outside of these hours will be responded to promptly during concierge hours. For press, media, general and appointment-related inquiries, contact hello@umbreen.com.</p>
  </> },
];

function Terms() {
  return <LegalPage
    kicker="Legal"
    title={<>Terms of<br />Service</>}
    intro="These Terms govern your use of umbreen.com and services provided by Azuna Global LLC d/b/a Umbreen. By using this Website or booking services, you agree to these Terms."
    effective="January 1, 2026"
    sections={sections}
  />;
}