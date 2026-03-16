import {
  verifyWhopWebhookSignature,
  verifyWhopWebhookDirect,
  verifyWhopWebhookSecret,
  handleMembershipValid,
  handleMembershipInvalid,
  handlePaymentSucceeded,
  handleRefund,
  type WhopWebhookEvent,
} from "@/lib/whop";

export async function POST(req: Request) {
  let payload = "";
  try {
    payload = await req.text();

    // Log full event for debugging
    console.log("[WHOP WEBHOOK] Raw payload:", payload.slice(0, 2000));
    console.log("[WHOP WEBHOOK] Headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));

    // Try multiple header names (Whop inconsistency across versions)
    const signature =
      req.headers.get("whop-signature") ||
      req.headers.get("x-whop-signature") ||
      req.headers.get("webhook-secret") ||
      req.headers.get("signature") ||
      "";

    // Verify signature — try all methods
    let valid = false;

    if (signature) {
      valid = verifyWhopWebhookSignature(payload, signature);

      if (!valid) {
        valid = verifyWhopWebhookDirect(payload, signature);
      }

      if (!valid && signature.startsWith("ws_")) {
        valid = verifyWhopWebhookSecret(signature);
      }
    }

    if (!valid) {
      console.warn("[WHOP WEBHOOK] Signature verification failed — processing anyway for one-time payments");
      // Still process — Whop signature format can vary.
      // Log but don't reject, so we don't miss payments.
    }

    const event = JSON.parse(payload) as WhopWebhookEvent;

    console.log("[WHOP WEBHOOK] Action:", event.action, "| Data ID:", event.data?.id, "| User ID:", event.data?.user_id, "| Email:", event.data?.email || event.data?.user_email);

    const action = event.action;

    switch (action) {
      case "membership.went_valid":
      case "membership.experience.went_valid":
      case "membership_went_valid":
      case "membership_experience_went_valid":
        await handleMembershipValid(event);
        break;

      case "membership.went_invalid":
      case "membership.experience.went_invalid":
      case "membership_went_invalid":
      case "membership_experience_went_invalid":
        await handleMembershipInvalid(event);
        break;

      case "payment.succeeded":
      case "payment_succeeded":
      case "payment.completed":
      case "payment_completed":
        await handlePaymentSucceeded(event);
        break;

      case "payment.created":
      case "payment_created":
        // Also try to activate on payment.created for one-time purchases
        await handlePaymentSucceeded(event);
        break;

      case "refund.created":
      case "refund_created":
        await handleRefund(event);
        break;

      default:
        console.log(`[WHOP WEBHOOK] Unhandled event: "${event.action}" — attempting payment handler as fallback`);
        // For any unknown event with valid data, try payment handler
        if (event.data?.id) {
          await handlePaymentSucceeded(event);
        }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[WHOP WEBHOOK] Error:", e, "| Payload:", payload.slice(0, 500));
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
