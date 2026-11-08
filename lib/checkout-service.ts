import { createHash } from "node:crypto";
import type { CheckoutPayload } from "./cart";

export type CheckoutRecord = {
  _id: string;
  _type: "checkoutRequest";
  payloadHash: string;
  reference: string;
  submittedAt: string;
  payload: CheckoutPayload;
  status: "pending_email" | "received";
  ownerEmailId?: string;
  customerEmailId?: string;
};
export type CheckoutDependencies = {
  create: (record: CheckoutRecord) => Promise<CheckoutRecord>;
  update: (id: string, fields: Partial<CheckoutRecord>) => Promise<unknown>;
  send: (
    payload: CheckoutPayload,
    reference: string,
    recipient: "owner" | "customer",
  ) => Promise<string>;
};
export class CheckoutConflict extends Error {}

/** Stable private record + per-recipient idempotency keys make interrupted retries safe. */
export async function fulfillCheckout(
  payload: CheckoutPayload,
  dependencies: CheckoutDependencies,
) {
  const payloadHash = createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
  const reference = `GL-${payload.submissionId.replaceAll("-", "").slice(0, 12).toUpperCase()}`;
  const record = await dependencies.create({
    _id: `checkout.${payload.submissionId}`,
    _type: "checkoutRequest",
    payloadHash,
    reference,
    submittedAt: new Date().toISOString(),
    payload,
    status: "pending_email",
  });
  if (record.payloadHash !== payloadHash)
    throw new CheckoutConflict(
      "This request reference already has different details. Please reload checkout.",
    );
  if (!record.ownerEmailId) {
    const ownerEmailId = await dependencies.send(
      record.payload,
      record.reference,
      "owner",
    );
    await dependencies.update(record._id, { ownerEmailId });
  }
  if (!record.customerEmailId) {
    const customerEmailId = await dependencies.send(
      record.payload,
      record.reference,
      "customer",
    );
    await dependencies.update(record._id, { customerEmailId });
  }
  await dependencies.update(record._id, { status: "received" });
  return { accepted: true, reference: record.reference };
}
