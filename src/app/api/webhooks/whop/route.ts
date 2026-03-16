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

    // Try multiple header names (Whop sends different ones across versions)
    const signature =
      req.headers.get("whop-signature") ||
      req.headers.get("x-whop-signature") ||
      req.headers.get("webhook-secret") ||
      req.headers.get("signature") ||
      "";

    if (!signature) {
      console.error("[WHOP WEBHOOK] No signature header found");
      return new Response("Unauthorized", { status: 401 });
    }

    // Verify signature — try all known formats
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

    console.log(
      "[WHOP WEBHOOK] Action:", event.action,
      "| ID:", event.data?.id,
      "| User:", event.data?.user_id,
      "| Email:", event.data?.email || event.data?.user_email
    );

    switch (event.action) {
      // ── Plan activation (payment confirmed) ──
      case "membership.went_valid":
      case "membership.experience.went_valid":
      case "membership_went_valid":
      case "membership_experience_went_valid":
        await handleMembershipValid(event);
        break;

      // ── Plan deactivation ──
      case "membership.went_invalid":
      case "membership.experience.went_invalid":
      case "membership_went_invalid":
      case "membership_experience_went_invalid":
        await handleMembershipInvalid(event);
        break;

      // ── Payment confirmed — backup activation ──
      case "payment.succeeded":
      case "payment_succeeded":
      case "payment.completed":
      case "payment_completed":
        await handlePaymentSucceeded(event);
        break;

      // ── Refund — downgrade ──
      case "refund.created":
      case "refund_created":
        await handleRefund(event);
        break;

      // ── Informational only — no action ──
      case "payment.created":
      case "payment_created":
      case "payment.failed":
      case "payment_failed":
        console.log(`[WHOP WEBHOOK] Info event: "${event.action}" — no action taken`);
        break;

      default:
        console.log(`[WHOP WEBHOOK] Unknown event: "${event.action}" — ignored`);
    }

    // Always 200 to prevent Whop retry storms
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("[WHOP WEBHOOK] Error:", e);
    return new Response("OK", { status: 200 });
  }
}
