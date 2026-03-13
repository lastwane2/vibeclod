import { NextResponse } from "next/server";

// GitHub webhook for push events (optional — for future auto-verify)
export async function POST(req: Request) {
  const event = req.headers.get("x-github-event");

  if (event === "push") {
    // Future: auto-trigger verification when user pushes to connected repo
    // For now, just acknowledge
    const body = await req.json();
    console.log("GitHub push event:", body.repository?.full_name);
  }

  return NextResponse.json({ received: true });
}
