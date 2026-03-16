import { prisma } from "@/lib/prisma";
import { createHmac, timingSafeEqual } from "crypto";

// ─── Config ─────────────────────────────────────────────────

const WHOP_API_KEY = process.env.WHOP_API_KEY ?? "";
const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET ?? "";
const WHOP_PRO_PLAN_ID = process.env.WHOP_PRO_PLAN_ID ?? "";
const WHOP_SANDBOX = process.env.WHOP_SANDBOX === "true";
const FRONTEND_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

const WHOP_API_BASE = WHOP_SANDBOX
  ? "https://sandbox-api.whop.com/api/v2"
  : "https://api.whop.com/api/v2";

// ─── Webhook Types ──────────────────────────────────────────

export type WhopWebhookEvent = {
  action: string;
  api_version?: string;
  data: {
    id: string;
    user_id?: string;
    email?: string;
    user_email?: string;
    membership_id?: string;
    product_id?: string;
    plan_id?: string;
    product?: { id: string; name: string };
    plan?: { id: string; plan_type: string };
    status: string;
    valid?: boolean;
    metadata?: Record<string, string>;
    membership_metadata?: Record<string, string>;
    created_at: number;
    expires_at?: number;
    renewal_period_start?: number;
    renewal_period_end?: number;
    membership?: {
      id?: string;
      email?: string;
      metadata?: Record<string, string>;
      renewal_period_end?: number;
      expires_at?: number;
    };
    payment?: {
      membership_id?: string;
      membership_metadata?: Record<string, string>;
      user_email?: string;
    };
    user?: { email?: string; id?: string };
  };
};

// ─── Signature Verification ─────────────────────────────────

/**
 * Verify Whop webhook signature.
 * Whop sends: `t=<timestamp>,v1=<hmac>` in the signature header.
 */
export function verifyWhopWebhookSignature(
  payload: string,
  signatureHeader: string
): boolean {
  if (!WHOP_WEBHOOK_SECRET || !signatureHeader) return false;

  try {
    const parts = signatureHeader.split(",");
    const timestampPart = parts.find((p) => p.startsWith("t="));
    const signaturePart = parts.find((p) => p.startsWith("v1="));

    if (!timestampPart || !signaturePart) return false;

    const timestamp = timestampPart.slice(2);
    const signature = signaturePart.slice(3);
    const signedPayload = `${timestamp}.${payload}`;

    const expected = createHmac("sha256", WHOP_WEBHOOK_SECRET)
      .update(signedPayload)
      .digest("hex");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);

    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

/**
 * Fallback: verify direct HMAC (raw body signed with secret).
 */
export function verifyWhopWebhookDirect(
  payload: string,
  signature: string
): boolean {
  if (!WHOP_WEBHOOK_SECRET || !signature) return false;

  try {
    const expected = createHmac("sha256", WHOP_WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);

    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

/**
 * Fallback: direct secret comparison (ws_ prefixed secrets).
 */
export function verifyWhopWebhookSecret(secret: string): boolean {
  if (!WHOP_WEBHOOK_SECRET || !secret) return false;
  try {
    const sigBuf = Buffer.from(secret);
    const expBuf = Buffer.from(WHOP_WEBHOOK_SECRET);
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

// ─── Checkout URL ───────────────────────────────────────────

export async function createCheckoutUrl(userId: string): Promise<string> {
  if (!WHOP_API_KEY || !WHOP_PRO_PLAN_ID) {
    console.error("[Whop] Missing WHOP_API_KEY or WHOP_PRO_PLAN_ID");
    return getFallbackCheckoutUrl(userId);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const body: Record<string, unknown> = {
      plan_id: WHOP_PRO_PLAN_ID,
      metadata: { user_id: userId },
    };

    if (FRONTEND_URL.startsWith("https://")) {
      body.redirect_url = `${FRONTEND_URL}/settings?billing=success`;
    }

    const res = await fetch(`${WHOP_API_BASE}/checkout_sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHOP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = (await res.json()) as {
        checkout_url?: string;
        url?: string;
        purchase_url?: string;
      };
      const url = data.checkout_url || data.url || data.purchase_url;
      if (url) return url;
    } else {
      const err = await res.text();
      console.error("[Whop] Checkout API error:", res.status, err);
    }
  } catch (e) {
    console.error("[Whop] Checkout exception:", e);
  }

  return getFallbackCheckoutUrl(userId);
}

function getFallbackCheckoutUrl(userId: string): string {
  if (WHOP_PRO_PLAN_ID) {
    const baseUrl = WHOP_SANDBOX
      ? "https://sandbox.whop.com"
      : "https://whop.com";
    return `${baseUrl}/checkout/${WHOP_PRO_PLAN_ID}/?metadata[user_id]=${encodeURIComponent(userId)}`;
  }
  return "/settings";
}

// ─── Cancel Subscription ────────────────────────────────────

export async function cancelSubscription(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { whopMembershipId: true },
  });
  if (!user?.whopMembershipId || !WHOP_API_KEY) return false;

  try {
    const res = await fetch(
      `${WHOP_API_BASE}/memberships/${user.whopMembershipId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHOP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cancel" }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[Whop] Cancel error:", err);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[Whop] Cancel exception:", e);
    return false;
  }
}

// ─── Subscription Status ────────────────────────────────────

export async function getSubscriptionStatus(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true, whopMembershipId: true },
  });
  if (!user) return null;

  // NOTE: vibeclod is one-time payment = lifetime. No auto-downgrade.
  // planExpiresAt should always be null for vibeclod.

  return {
    plan: user.plan,
    isActive: user.plan !== "FREE",
    expiresAt: user.planExpiresAt?.toISOString() ?? null,
    membershipId: user.whopMembershipId,
  };
}

// ─── User Lookup from Webhook ───────────────────────────────

async function findUserFromEvent(event: WhopWebhookEvent) {
  const { data } = event;
  const membership = (data as Record<string, unknown>).membership as
    | Record<string, unknown>
    | undefined;
  const metadata = (membership?.metadata ||
    data.membership_metadata ||
    data.metadata ||
    {}) as Record<string, string>;

  console.log("[Whop] findUser — metadata:", JSON.stringify(metadata));
  console.log("[Whop] findUser — user_id:", data.user_id, "| email:", data.email || data.user_email || (membership?.email as string) || data.user?.email);

  // 1) user_id from metadata (our custom field from checkout)
  if (metadata.user_id) {
    const user = await prisma.user.findUnique({
      where: { id: metadata.user_id },
    });
    if (user) {
      console.log("[Whop] Found user by metadata.user_id:", user.id);
      return user;
    }
  }

  // 2) whopUserId from webhook data
  const whopUserId = data.user_id || data.user?.id;
  if (whopUserId) {
    const user = await prisma.user.findFirst({
      where: { whopUserId },
    });
    if (user) {
      console.log("[Whop] Found user by whopUserId:", user.id);
      return user;
    }
  }

  // 3) whopMembershipId
  const membershipId = (membership?.id as string) || data.membership_id || data.id;
  if (membershipId) {
    const user = await prisma.user.findFirst({
      where: { whopMembershipId: membershipId },
    });
    if (user) {
      console.log("[Whop] Found user by whopMembershipId:", user.id);
      return user;
    }
  }

  // 4) email fallback
  const email =
    (membership?.email as string) ||
    data.email ||
    data.user_email ||
    data.user?.email;
  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      console.log("[Whop] Found user by email:", user.id);
      return user;
    }
  }

  console.error("[Whop] findUser — could NOT find user for event:", data.id);
  return null;
}

// ─── Webhook Event Handlers ─────────────────────────────────

/**
 * membership.went_valid — upgrade to PRO.
 * For vibeclod one-time payments: planExpiresAt = null (lifetime).
 */
export async function handleMembershipValid(event: WhopWebhookEvent) {
  const user = await findUserFromEvent(event);
  if (!user) {
    console.error("[Whop] membership.valid — user not found:", event.data.id);
    return;
  }

  const { data } = event;
  const membership = (data as Record<string, unknown>).membership as
    | Record<string, unknown>
    | undefined;

  const membershipId = (membership?.id as string) || data.id;
  const whopUserId = data.user_id || data.user?.id || undefined;

  // Vibeclod = one-time payment = lifetime. No expiration.
  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: "PRO",
      whopMembershipId: membershipId,
      ...(whopUserId ? { whopUserId } : {}),
      planExpiresAt: null, // lifetime — no expiration
      paidAt: new Date(),
    },
  });

  console.log(`[Whop] User ${user.id} (${user.email}) upgraded to PRO (membership.valid)`);
}

/**
 * membership.went_invalid — downgrade to FREE.
 */
export async function handleMembershipInvalid(event: WhopWebhookEvent) {
  const { data } = event;

  let user = data.id
    ? await prisma.user.findFirst({ where: { whopMembershipId: data.id } })
    : null;

  if (!user && data.user_id) {
    user = await prisma.user.findFirst({ where: { whopUserId: data.user_id } });
  }

  if (!user) {
    user = await findUserFromEvent(event);
  }

  if (!user) {
    console.error("[Whop] membership.invalid — user not found:", data.id);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { plan: "FREE", planExpiresAt: null },
  });

  console.log(`[Whop] User ${user.id} (${user.email}) downgraded to FREE (membership.invalid)`);
}

/**
 * payment.succeeded / payment.created — activate PRO.
 * This is the MAIN handler for one-time payments.
 */
export async function handlePaymentSucceeded(event: WhopWebhookEvent) {
  const user = await findUserFromEvent(event);

  if (!user) {
    console.error("[Whop] payment — user not found:", event.data.id, "| Full data:", JSON.stringify(event.data).slice(0, 500));
    return;
  }

  // Already PRO — skip
  if (user.plan === "PRO") {
    console.log(`[Whop] User ${user.id} already PRO — skipping`);
    return;
  }

  const { data } = event;
  const membership = (data as Record<string, unknown>).membership as
    | Record<string, unknown>
    | undefined;

  const membershipId =
    (membership?.id as string) || data.membership_id || data.id;
  const whopUserId = data.user_id || data.user?.id || undefined;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: "PRO",
      whopMembershipId: membershipId,
      ...(whopUserId ? { whopUserId } : {}),
      planExpiresAt: null, // lifetime — no expiration
      paidAt: new Date(),
    },
  });

  console.log(`[Whop] User ${user.id} (${user.email}) activated PRO via payment`);
}

/**
 * refund.created — downgrade to FREE.
 */
export async function handleRefund(event: WhopWebhookEvent) {
  const { data } = event;
  const payment = data.payment || ({} as Record<string, unknown>);
  const metadata = ((payment as Record<string, unknown>).membership_metadata ||
    data.membership_metadata ||
    data.metadata ||
    {}) as Record<string, string>;

  let userId = metadata.user_id;

  // membership ID lookup
  const membershipId =
    ((payment as Record<string, unknown>).membership_id as string) ||
    data.membership_id;
  if (!userId && membershipId) {
    const user = await prisma.user.findFirst({
      where: { whopMembershipId: membershipId },
    });
    if (user) userId = user.id;
  }

  // email lookup
  const email =
    ((payment as Record<string, unknown>).user_email as string) ||
    data.user_email ||
    data.email;
  if (!userId && email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) userId = user.id;
  }

  if (!userId) {
    console.error("[Whop] refund — user not found:", data.id);
    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: "FREE",
      whopMembershipId: null,
      planExpiresAt: null,
    },
  });

  console.log(`[Whop] User ${userId} downgraded to FREE (refund)`);
}
