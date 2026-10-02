import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Umbreen Sheikh" },
    { name: "description", content: "How Azuna Global LLC d/b/a Umbreen collects, uses, and protects your information." },
  ] }),
  component: Privacy,
});

const sections: LegalSection[] = [
  { id: "collect", title: "Information We Collect", body: <>
    <p>We may collect:</p>
    <ul>
      <li>Name</li>
      <li>Email address</li>
      <li>Phone number</li>
      <li>Appointment details</li>
      <li>Photos submitted for consultation</li>
      <li>Payment information (processed via third-party providers)</li>
      <li>Website usage data (via cookies and analytics tools)</li>
    </ul>
    <p>We collect information when you:</p>
    <ul>
      <li>Submit a consultation form</li>
      <li>Book an appointment</li>
      <li>Contact us</li>
      <li>Opt in to receive SMS communications</li>
    </ul>
  </> },
  { id: "use", title: "How We Use Your Information", body: <>
    <p>We use your information to:</p>
    <ul>
      <li>Schedule and manage appointments</li>
      <li>Account Verifications</li>
      <li>Provide PMU and aesthetic services</li>
      <li>Send appointment confirmations and reminders</li>
      <li>Provide pre-care and post-care instructions</li>
      <li>Communicate regarding services</li>
      <li>Process payments</li>
      <li>Improve our services</li>
    </ul>
    <p>We do not sell or rent your personal information.</p>
  </> },
  { id: "sms", title: "SMS Communications", body: <>
    <p>If you provide your phone number and consent to receive SMS messages:</p>
    <ul>
      <li>Message frequency varies based on appointment activity.</li>
      <li>Message and data rates may apply.</li>
      <li>Reply STOP to opt out.</li>
      <li>Reply HELP for assistance.</li>
    </ul>
    <p>SMS consent is not shared with third parties or affiliates for marketing purposes.</p>
  </> },
  { id: "sharing", title: "Sharing of Information", body: <>
    <p>We may share information with:</p>
    <ul>
      <li>Payment processors</li>
      <li>Scheduling software providers</li>
      <li>SMS and communication service providers</li>
      <li>Legal or regulatory authorities if required</li>
    </ul>
    <p>These providers are only given information necessary to perform services on our behalf. No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
  </> },
  { id: "security", title: "Data Security", body: <p>We implement reasonable security measures to protect your information. However, no system is 100% secure.</p> },
  { id: "cookies", title: "Cookies & Analytics", body: <p>We may use cookies and analytics tools to improve website functionality and user experience.</p> },
  { id: "rights", title: "Your Rights", body: <>
    <p>You may request to:</p>
    <ul>
      <li>Access your personal data</li>
      <li>Correct inaccurate data</li>
      <li>Request deletion (subject to legal obligations)</li>
    </ul>
    <p>Contact: <a href="mailto:hello@umbreen.com">hello@umbreen.com</a></p>
  </> },
  { id: "contact", title: "Contact Information", body: <>
    <p>Umbreen®<br />194 Court Street #5<br />Brooklyn, NY 11201</p>
    <p>Email: <a href="mailto:hello@umbreen.com">hello@umbreen.com</a><br />Phone: <a href="tel:+16468465041">646.846.5041</a></p>
  </> },
];

function Privacy() {
  return <LegalPage
    kicker="Legal"
    title={<>Privacy<br />Policy</>}
    intro="Umbreen.com (“Website”) is operated by Azuna Global LLC d/b/a Umbreen® (“Company,” “we,” “our,” or “us”). This Privacy Policy explains how we collect, use, and protect your information."
    effective="January 1, 2026"
    sections={sections}
  />;
}