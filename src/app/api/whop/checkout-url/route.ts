import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutUrl } from "@/lib/whop";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = await createCheckoutUrl(session.user.id);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[Checkout] Failed:", e);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
