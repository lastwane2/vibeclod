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
    user?: { email?: string };
  };
};

// ─── Plan Mapping ───────────────────────────────────────────

export function planFromWhopId(whopPlanId: string): "FREE" | "PRO" {
  if (whopPlanId && whopPlanId === WHOP_PRO_PLAN_ID) return "PRO";
  // Any valid plan ID means they paid — default to PRO for vibeclod
  if (whopPlanId) return "PRO";
  return "FREE";
}

// ─── Signature Verification ─────────────────────────────────

/**
 * Verify Whop webhook signature.
 * Whop sends: `t=<timestamp>,v1=<hmac>` in the signature header.
 * Signed payload: `{timestamp}.{rawBody}`
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
 * Some Whop versions send just the HMAC hex in the header.
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

/**
 * Create a Whop checkout session via API.
 * Falls back to static checkout URL if API fails.
 */
export async function createCheckoutUrl(userId: string): Promise<string> {
  if (!WHOP_API_KEY) {
    console.error("[Whop] WHOP_API_KEY is not configured");
    return getFallbackCheckoutUrl(userId);
  }

  // Need at least a plan ID for API checkout
  if (!WHOP_PRO_PLAN_ID) {
    console.error("[Whop] WHOP_PRO_PLAN_ID is not configured");
    return getFallbackCheckoutUrl(userId);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const body: Record<string, unknown> = {
      plan_id: WHOP_PRO_PLAN_ID,
      metadata: { user_id: userId },
    };

    // Whop requires HTTPS for redirect URL
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

/**
 * Fallback: static checkout URL with metadata param.
 */
function getFallbackCheckoutUrl(userId: string): string {
  // Try NEXT_PUBLIC_WHOP_CHECKOUT_URL first
  const staticUrl = process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL;
  if (staticUrl) {
    const separator = staticUrl.includes("?") ? "&" : "?";
    return `${staticUrl}${separator}metadata[userId]=${encodeURIComponent(userId)}`;
  }

  // Last resort: direct Whop checkout link
  if (WHOP_PRO_PLAN_ID) {
    const baseUrl = WHOP_SANDBOX
      ? "https://sandbox.whop.com"
      : "https://whop.com";
    return `${baseUrl}/checkout/${WHOP_PRO_PLAN_ID}/?metadata[userId]=${encodeURIComponent(userId)}`;
  }

  return "/pricing";
}

// ─── Cancel Subscription ────────────────────────────────────

export async function cancelSubscription(
  userId: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { whopMembershipId: true },
  });
  if (!user?.whopMembershipId) return false;
  if (!WHOP_API_KEY) throw new Error("WHOP_API_KEY is not configured");

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

  // Auto-downgrade if plan expired
  if (
    user.plan !== "FREE" &&
    user.planExpiresAt &&
    user.planExpiresAt < new Date()
  ) {
    await prisma.user.update({
      where: { id: userId },
      data: { plan: "FREE" },
    });
    console.log(`[Whop] Plan expired for ${userId}, downgraded to FREE`);

    return {
      plan: "FREE" as const,
      isActive: false,
      expiresAt: user.planExpiresAt.toISOString(),
      membershipId: user.whopMembershipId,
    };
  }

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
    data.metadata ||
    {}) as Record<string, string>;

  // 1) user_id from metadata (our custom field from checkout)
  if (metadata.user_id) {
    const user = await prisma.user.findUnique({
      where: { id: metadata.user_id },
    });
    if (user) return user;
  }

  // 2) whopUserId from webhook data
  const whopUserId = data.user_id;
  if (whopUserId) {
    const user = await prisma.user.findFirst({
      where: { whopUserId },
    });
    if (user) return user;
  }

  // 3) email fallback
  const email =
    (membership?.email as string) ||
    data.email ||
    data.user_email ||
    data.user?.email;
  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return user;
  }

  return null;
}

// ─── Webhook Event Handlers ─────────────────────────────────

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

  const planId = (data.plan_id as string) || "";
  const membershipId = (membership?.id as string) || data.id;
  const whopUserId = data.user_id || undefined;

  // Calculate expiration
  let planExpiresAt: Date | null = null;
  const renewalEnd =
    (membership?.renewal_period_end as number) || data.renewal_period_end;
  const expiresAt =
    (membership?.expires_at as number) || data.expires_at;
  if (renewalEnd) {
    planExpiresAt = new Date(renewalEnd * 1000);
  } else if (expiresAt) {
    planExpiresAt = new Date(expiresAt * 1000);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: planFromWhopId(planId),
      whopMembershipId: membershipId,
      ...(whopUserId ? { whopUserId } : {}),
      planExpiresAt,
      paidAt: new Date(),
    },
  });

  console.log(`[Whop] User ${user.id} upgraded to PRO`);
}

export async function handleMembershipInvalid(event: WhopWebhookEvent) {
  const { data } = event;

  // Primary lookup: by membership ID
  let user = data.id
    ? await prisma.user.findFirst({ where: { whopMembershipId: data.id } })
    : null;

  if (!user) {
    // Fallback: by whopUserId
    if (data.user_id) {
      user = await prisma.user.findFirst({ where: { whopUserId: data.user_id } });
    }
  }

  if (!user) {
    // Fallback: metadata / email
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

  console.log(`[Whop] User ${user.id} downgraded to FREE`);
}

export async function handlePaymentSucceeded(event: WhopWebhookEvent) {
  const { data } = event;
  const membership = (data as Record<string, unknown>).membership as
    | Record<string, unknown>
    | undefined;
  const metadata = (membership?.metadata ||
    data.membership_metadata ||
    data.metadata ||
    {}) as Record<string, string>;

  let userId = metadata.user_id;

  // Email fallback
  const email =
    (membership?.email as string) || data.user_email || data.email;
  if (!userId && email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      userId = user.id;
    }
  }

  // whopUserId fallback
  if (!userId && data.user_id) {
    const user = await prisma.user.findFirst({
      where: { whopUserId: data.user_id },
    });
    if (user) {
      userId = user.id;
    }
  }

  if (!userId) {
    console.error("[Whop] payment.succeeded — user not found:", data.id);
    return;
  }

  const membershipId =
    (membership?.id as string) || data.membership_id || data.id;

  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: "PRO",
      whopMembershipId: membershipId,
      paidAt: new Date(),
    },
  });

  console.log(`[Whop] User ${userId} activated via payment`);
}

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
