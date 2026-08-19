import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only Sanity client with write access.
 *
 * ⚠️ NEVER import this into a Client Component or anything that ends up in the
 * browser bundle. `SANITY_API_WRITE_TOKEN` deliberately has no `NEXT_PUBLIC_`
 * prefix, so Next.js will not inline it client-side — but an import from a
 * client module would still be a build-time error waiting to happen. The only
 * caller should be a route handler.
 *
 * A leaked write token lets anyone create, edit and delete every document in the
 * dataset. It is not in the same category as the public WhatsApp number.
 */

const token = process.env.SANITY_API_WRITE_TOKEN;

/**
 * False when no token is configured. Callers must check this and degrade
 * gracefully rather than throwing: a missing token should never stop a customer
 * reaching us, it should only mean the lead is not archived.
 */
export const HAS_SANITY_WRITE_ACCESS = Boolean(token);

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  // Writes must never be served from or cached by the CDN.
  useCdn: false,
});
