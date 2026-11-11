import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site";

export const Route = createFileRoute("/service-policies")({
  head: () => ({ meta: [
    { title: "Payment, Cancellation & Refund Policy — Umbreen Private Services" },
    { name: "description", content: "Prepayment, 48-hour cancellation and rescheduling, refund, no-show and chargeback policy for appointments with Umbreen Private Services." },
    ...seo("/service-policies").meta,
  ], links: seo("/service-policies").links }),
  component: ServicePolicies,
});

const sections: LegalSection[] = [
  { id: "prepayment", title: "Prepayment & Appointment Confirmation", body: <ul>
    <li>Full prepayment is required to secure and confirm all appointments.</li>
    <li>An appointment is not considered confirmed until payment has been successfully received.</li>
    <li>Unpaid appointments may be released to other clients.</li>
    <li>Once payment is received, the appointment date and time are secured.</li>
    <li>By completing payment, clients acknowledge their acceptance of the applicable booking and payment policies.</li>
  </ul> },
  { id: "cancellation", title: "Cancellation & Refund Policy", body: <ul>
    <li>A minimum of 48 hours’ notice is required for all appointment cancellations.</li>
    <li>Cancellations made at least 48 hours before the scheduled appointment are eligible for either a refund or a transfer of the payment to a future appointment.</li>
    <li>Approved refunds will be returned to the original payment method. Processing times depend on the payment provider.</li>
    <li>Cancellations made less than 48 hours before the scheduled appointment will result in forfeiture of the full prepayment.</li>
    <li>Refunds are not available for late cancellations or no-shows, except where required by applicable law.</li>
  </ul> },
  { id: "rescheduling", title: "Rescheduling & Payment Transfer Policy", body: <ul>
    <li>Clients may request to reschedule with at least 48 hours’ notice.</li>
    <li>Payments may be transferred in full to a new appointment, subject to availability.</li>
    <li>A payment transfer means the amount already paid will be credited toward the new appointment instead of being refunded.</li>
    <li>Each appointment may be rescheduled once without an additional booking fee, provided the required notice is given.</li>
    <li>Any difference in service price must be settled before the new appointment is confirmed.</li>
    <li>Rescheduling requests made less than 48 hours before the appointment will be treated as late cancellations, and the full prepayment will be forfeited.</li>
    <li>All rescheduled appointments must be confirmed by Umbreen Private Services.</li>
  </ul> },
  { id: "no-show", title: "No-Show Policy", body: <ul>
    <li>A no-show occurs when a client fails to attend their scheduled appointment without prior notice.</li>
    <li>Failure to attend will result in forfeiture of the full prepayment.</li>
    <li>Payments for missed appointments cannot be transferred to future bookings.</li>
    <li>Clients who miss an appointment must submit a new full prepayment to secure another booking.</li>
  </ul> },
  { id: "chargebacks", title: "Chargeback & Payment Dispute Policy", body: <>
    <p>Umbreen Private Services values transparency and fairness in all payment transactions. Clients are encouraged to contact us directly to resolve payment concerns before initiating a payment dispute.</p>
    <ul>
      <li><strong>Authorized Payments:</strong> By submitting payment, clients acknowledge and authorize the transaction for their selected service and appointment.</li>
      <li><strong>Booking Confirmation:</strong> Once payment has been successfully processed, the appointment is secured in accordance with our booking policy.</li>
      <li><strong>Payment Concerns:</strong> Clients who believe a payment was made in error, duplicated, or processed without authorization should contact Umbreen Private Services promptly.</li>
      <li><strong>Chargeback Investigations:</strong> In the event of a chargeback or payment dispute, Umbreen Private Services reserves the right to provide relevant supporting documentation to the payment processor or financial institution.</li>
      <li><strong>Supporting Documentation:</strong> This may include payment receipts, booking confirmations, signed client agreements, appointment records, cancellation notices, and relevant client communications.</li>
      <li><strong>Resolution of Errors:</strong> Legitimate billing errors and eligible refunds will be addressed in accordance with our refund policy and applicable consumer-protection laws.</li>
      <li><strong>Client Rights:</strong> Nothing in this policy limits a client’s legal right to dispute unauthorized transactions or pursue remedies available under applicable law.</li>
    </ul>
  </> },
  { id: "acknowledgment", title: "Client Acknowledgment & Agreement", body: <>
    <p>By booking and submitting payment for services with Umbreen Private Services, I acknowledge that:</p>
    <ul>
      <li>I have read and understood the prepayment requirements.</li>
      <li>I understand the 48-hour cancellation and rescheduling policy.</li>
      <li>I understand the refund and payment transfer conditions.</li>
      <li>I understand that late cancellations and no-shows result in forfeiture of the full prepayment, subject to applicable law.</li>
      <li>I understand the chargeback and payment dispute procedures.</li>
      <li>I agree to comply with the policies outlined above.</li>
    </ul>
    <p>Thank you for choosing Umbreen Private Services. We appreciate your understanding, cooperation, and respect for our appointment policies.</p>
  </> },
];

function ServicePolicies() {
  return <LegalPage
    kicker="Umbreen Private Services"
    title={<>Payment, Cancellation<br />&amp; Refund Policy</>}
    intro="To ensure a smooth booking experience and respect the time reserved for every client, Umbreen Private Services requires clients to review and agree to the following policies before completing payment. This policy covers payment, cancellation, refunds, rescheduling and chargebacks."
    effective="November 10, 2026"
    sections={sections}
  />;
}
