import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const expected = hmac.digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-whop-signature") ?? "";

  // Verify webhook signature
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (secret && signature) {
    try {
      if (!verifyWebhookSignature(body, signature, secret)) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Signature verification failed" },
        { status: 401 }
      );
    }
  }

  const event = JSON.parse(body);
  const action = event.action as string;

  if (action === "membership.went_valid") {
    const whopUserId = event.data?.user_id as string | undefined;
    const membershipId = event.data?.id as string | undefined;

    if (whopUserId) {
      // Try to find user by whopUserId, or by email from the event
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { whopUserId },
            ...(event.data?.user?.email
              ? [{ email: event.data.user.email }]
              : []),
          ],
        },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: "PRO",
            whopUserId,
            whopMembershipId: membershipId,
            paidAt: new Date(),
          },
        });
      }
    }
  }

  if (action === "membership.went_invalid") {
    const whopUserId = event.data?.user_id as string | undefined;

    if (whopUserId) {
      const user = await prisma.user.findFirst({
        where: { whopUserId },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: "FREE",
          },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
