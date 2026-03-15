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
  try {
    const payload = await req.text();

    // Try multiple header names (Whop inconsistency across versions)
    const signature =
      req.headers.get("whop-signature") ||
      req.headers.get("x-whop-signature") ||
      req.headers.get("webhook-secret") ||
      req.headers.get("signature") ||
      "";

    if (!signature) {
      console.error("[WHOP WEBHOOK] No signature header found");
      return new Response("No signature", { status: 401 });
    }

    // Verify — try all methods: t=,v1= format → raw HMAC → direct secret
    let valid = verifyWhopWebhookSignature(payload, signature);

    if (!valid) {
      valid = verifyWhopWebhookDirect(payload, signature);
    }

    if (!valid && signature.startsWith("ws_")) {
      valid = verifyWhopWebhookSecret(signature);
    }

    if (!valid) {
      console.error("[WHOP WEBHOOK] Invalid signature — rejecting");
      return new Response("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(payload) as WhopWebhookEvent;

    console.log("[WHOP WEBHOOK] Action:", event.action, "ID:", event.data?.id);

    // Normalize action: support both dots and underscores
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
        await handlePaymentSucceeded(event);
        break;

      case "payment.created":
      case "payment_created":
        // No action needed for payment creation
        break;

      case "refund.created":
      case "refund_created":
        await handleRefund(event);
        break;

      default:
        console.log(`[WHOP WEBHOOK] Unhandled event: "${event.action}"`);
    }

    // Always return 200 to prevent Whop retry storms
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[WHOP WEBHOOK] Error:", e);
    // Always 200 to prevent Whop retries even on processing errors
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
