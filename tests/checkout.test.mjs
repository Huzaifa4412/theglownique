import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCheckout, parseCartItems } from "../lib/cart.ts";
import { fulfillCheckout, CheckoutConflict } from "../lib/checkout-service.ts";
import { checkoutEmail } from "../lib/checkout-email.ts";
import {
  trackCartAdded,
  trackCheckoutStarted,
  trackCheckoutSubmitted,
  trackConfiguratorOpen,
} from "../lib/meta-pixel.ts";

const fixture = () => ({
  submissionId: "ab123456-1234-4567-89ab-123456789012",
  consent: true,
  items: [
    {
      id: "cd123456-1234-4567-89ab-123456789012",
      productId: 1,
      signType: "Neon Sign",
      color: "Warm White",
      size: "36 in × 24 in",
      signText: "Our studio",
      usageLocation: "Indoor",
      details: "Wall mounting",
      quantity: 2,
    },
  ],
  customer: {
    name: "Test Customer",
    email: "customer@example.com",
    phone: "",
    country: "United States",
    city: "Austin",
    postalCode: "",
    budget: "",
    timeline: "",
    notes: "",
  },
});
function dependencies() {
  const records = new Map();
  const sent = [];
  let failCustomer = false;
  return {
    records,
    sent,
    fail: () => {
      failCustomer = true;
    },
    create: async (record) => {
      if (!records.has(record._id))
        records.set(record._id, structuredClone(record));
      return structuredClone(records.get(record._id));
    },
    update: async (id, fields) => {
      Object.assign(records.get(id), fields);
    },
    send: async (_, __, recipient) => {
      if (recipient === "customer" && failCustomer) {
        failCustomer = false;
        throw new Error("Simulated provider failure");
      }
      sent.push(recipient);
      return `${recipient}-email-id`;
    },
  };
}
test("normalises customer input and discards client-supplied prices and product names", () => {
  const input = fixture();
  input.customer.email = " Customer@Example.com ";
  input.items[0].price = 0.01;
  input.items[0].name = "Forged product";
  const parsed = parseCheckout(input);
  assert.equal(parsed.customer.email, "customer@example.com");
  assert.equal(parsed.items[0].price, undefined);
  assert.equal(parsed.items[0].name, undefined);
});
test("rejects empty carts, unknown products, duplicate rows and invalid quantities", () => {
  assert.throws(() => parseCheckout({ ...fixture(), items: [] }));
  for (const quantity of [0, -1, 100, 1.5, "2", null]) {
    const input = fixture();
    input.items[0].quantity = quantity;
    assert.throws(() => parseCheckout(input));
  }
  const input = fixture();
  input.items[0].productId = 9999;
  assert.throws(() => parseCheckout(input));
  assert.throws(() => parseCartItems([fixture().items[0], fixture().items[0]]));
});
test("rejects missing consent, malformed input, header injection and oversized notes", () => {
  for (const input of [null, [], {}, { ...fixture(), consent: false }])
    assert.throws(() => parseCheckout(input));
  const input = fixture();
  input.customer.email = "customer@example.com\r\nBcc: attacker@example.com";
  assert.throws(() => parseCheckout(input));
  input.customer.email = "customer@example.com";
  input.customer.notes = "x".repeat(2001);
  assert.throws(() => parseCheckout(input));
});
test("archives privately before sending both emails", async () => {
  const deps = dependencies();
  const result = await fulfillCheckout(parseCheckout(fixture()), deps);
  assert.equal(result.accepted, true);
  assert.deepEqual(deps.sent, ["owner", "customer"]);
  const [record] = deps.records.values();
  assert.match(record._id, /^checkout\./);
  assert.equal(record.status, "received");
});
test("an identical retry does not create a second request or resend either email", async () => {
  const deps = dependencies();
  const payload = parseCheckout(fixture());
  const first = await fulfillCheckout(payload, deps);
  const retry = await fulfillCheckout(payload, deps);
  assert.deepEqual(first, retry);
  assert.equal(deps.records.size, 1);
  assert.deepEqual(deps.sent, ["owner", "customer"]);
});
test("customer email failure preserves the request and retries only the unfinished email", async () => {
  const deps = dependencies();
  deps.fail();
  const payload = parseCheckout(fixture());
  await assert.rejects(fulfillCheckout(payload, deps));
  assert.equal([...deps.records.values()][0].status, "pending_email");
  await fulfillCheckout(payload, deps);
  assert.deepEqual(deps.sent, ["owner", "customer"]);
});
test("reusing a submission ID with changed details is rejected", async () => {
  const deps = dependencies();
  const payload = parseCheckout(fixture());
  await fulfillCheckout(payload, deps);
  payload.customer.city = "Boston";
  await assert.rejects(fulfillCheckout(payload, deps), CheckoutConflict);
});
test("storage failure sends no email", async () => {
  const deps = dependencies();
  deps.create = async () => {
    throw new Error("Storage unavailable");
  };
  await assert.rejects(fulfillCheckout(parseCheckout(fixture()), deps));
  assert.equal(deps.sent.length, 0);
});
test("email escapes customer HTML and includes design details and the Etsy handoff", () => {
  const input = fixture();
  input.items[0].signText = '<img src=x onerror="alert(1)">';
  const email = checkoutEmail(parseCheckout(input), "GL-TEST", false);
  assert.ok(!email.html.includes(input.items[0].signText));
  assert.ok(email.html.includes("&lt;img"));
  assert.match(email.text, /Good Vibes Only × 2/);
  assert.match(email.text, /36 in × 24 in/);
  assert.match(email.html, /Continue on Etsy/);
  assert.match(email.text, /No payment has been taken/);
});

test("Meta reports real cart and checkout actions with stable IDs and no contact details", () => {
  const previous = globalThis.window;
  const calls = [];
  globalThis.window = { fbq: (...args) => calls.push(args) };
  try {
    const payload = parseCheckout(fixture());
    trackConfiguratorOpen("Good Vibes Only", "For Home");
    trackCartAdded(payload.items[0]);
    trackCheckoutStarted(payload.items);
    trackCheckoutSubmitted(payload.items, payload.submissionId);
    assert.deepEqual(
      calls.map((call) => [call[0], call[1]]),
      [
        ["trackCustom", "ConfiguratorOpen"],
        ["track", "AddToCart"],
        ["track", "InitiateCheckout"],
        ["track", "Lead"],
        ["trackCustom", "CheckoutSubmitted"],
      ],
    );
    assert.deepEqual(calls[1][2].contents, [
      { id: "custom-neon-signs", quantity: 2 },
    ]);
    assert.equal(calls[2][2].num_items, 2);
    assert.equal(calls[3][3].eventID, `checkout-${payload.submissionId}`);
    assert.equal(calls[1][2].value, undefined);
    const encoded = JSON.stringify(calls);
    for (const privateValue of [
      payload.customer.email,
      payload.customer.name,
      payload.items[0].signText,
    ])
      assert.ok(!encoded.includes(privateValue));
    assert.ok(!calls.some((call) => call[1] === "Purchase"));
  } finally {
    globalThis.window = previous;
  }
});
